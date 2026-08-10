// app/api/chat/route.ts
// Backend for the site chat assistant — calls the Gemini API server-side so the
// key never reaches the browser, and streams the reply back token by token.
//
// SETUP:
//   1. Get a key: https://aistudio.google.com/apikey
//   2. Put it in .env (gitignored — never commit, never paste in chat):
//        GEMINI_API_KEY=...
//        GEMINI_MODEL=gemini-3.6-flash        # optional, this is the default
//   3. In production it comes from Secret Manager — see apphosting.yaml.

import { NextRequest } from "next/server";
import {
  CHAT_SYSTEM_PROMPT,
  languageDirective,
  openerPrompt,
} from "@/lib/chatKnowledge";
import { findLanguage } from "@/lib/languages";

type ChatRole = "user" | "assistant" | "system";

interface ChatMessage {
  role: ChatRole;
  content: string;
}

/** Gemini's own role names: "assistant" is spelled "model". */
type GeminiContent = { role: "user" | "model"; parts: { text: string }[] };

/* The system prompt is generated in lib/chatKnowledge.ts from the same modules
   the site renders from — the service catalog, industry list, geo tree, process
   and expertise copy, the published FAQ. It is built once at module load, so the
   visitor pays no per-request cost for assembling it, and it cannot drift out of
   date the way a hand-written prompt does. */

const GEMINI_BASE = "https://generativelanguage.googleapis.com/v1beta/models";
const MODEL = process.env.GEMINI_MODEL || "gemini-3.6-flash";

/* Gemini 3 reasons before it answers, and bills the thinking to latency as
   much as to tokens. Measured on this prompt: "low" costs ~275 thinking tokens
   and about 4 seconds before the first word; "minimal" costs none and answers
   in ~1.5s, with no loss of quality on questions this bot actually gets — the
   answers are recited from the catalog in the system prompt, not worked out.
   A chat bubble that sits empty for four seconds reads as broken.

   Only Gemini 3 takes `thinkingLevel`; 2.x models reject the field outright,
   so it is attached by model family rather than unconditionally. */
const THINKING_LEVEL = "minimal";
const supportsThinkingLevel = (model: string) => model.includes("gemini-3");

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

/** Keep the last N turns so a long session can't balloon the token bill. */
const MAX_HISTORY = 20;
/** Cap a single message — the widget limits this too, but never trust the client. */
const MAX_CHARS_PER_MESSAGE = 2000;
/** Time allowed for Gemini to send its first byte. */
const FIRST_BYTE_TIMEOUT_MS = 25_000;

/* ── Rate limit ────────────────────────────────────────────────────────────
   The route is CORS-open so the widget can be embedded on other domains, which
   also means anyone can point a script at it and spend the key. This is a
   deliberately simple in-memory sliding window: it resets on redeploy and is
   per-instance, so it is a speed bump rather than a wall — but it turns a
   trivially cheap abuse loop into an expensive one. */
const RATE_LIMIT = { windowMs: 60_000, maxRequests: 15 };
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT.windowMs);
  recent.push(now);
  hits.set(ip, recent);

  // Opportunistic sweep so the map can't grow without bound.
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= RATE_LIMIT.windowMs)) hits.delete(key);
    }
  }
  return recent.length > RATE_LIMIT.maxRequests;
}

function clientIp(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  if (forwarded) return forwarded.split(",")[0].trim();
  return request.headers.get("x-real-ip") ?? "unknown";
}

function jsonError(message: string, status: number) {
  return Response.json({ error: message }, { status, headers: CORS_HEADERS });
}

/** Shared request builder — the opener and the conversation differ only in body. */
function callGemini(
  apiKey: string,
  method: "generateContent" | "streamGenerateContent",
  body: {
    systemInstruction: string;
    contents: GeminiContent[];
    generationConfig: Record<string, unknown>;
  },
  signal: AbortSignal
) {
  // `?alt=sse` is what makes the streaming endpoint emit Server-Sent Events;
  // without it Gemini streams a JSON array instead, which cannot be parsed
  // incrementally.
  const url = `${GEMINI_BASE}/${MODEL}:${method}${method === "streamGenerateContent" ? "?alt=sse" : ""}`;

  return fetch(url, {
    method: "POST",
    headers: {
      // Header rather than ?key= so the key never lands in a URL, where proxies
      // and access logs would keep a copy of it.
      "x-goog-api-key": apiKey,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      systemInstruction: { parts: [{ text: body.systemInstruction }] },
      contents: body.contents,
      generationConfig: {
        ...body.generationConfig,
        ...(supportsThinkingLevel(MODEL)
          ? { thinkingConfig: { thinkingLevel: THINKING_LEVEL } }
          : {}),
      },
    }),
    signal,
  });
}

/**
 * Turns the widget's transcript into Gemini's `contents`.
 *
 * Three things have to be fixed on the way:
 *  - "assistant" is called "model" here;
 *  - the transcript opens with Saathi's greeting, and Gemini wants the first
 *    turn to be the user's, so leading model turns are dropped;
 *  - consecutive turns from the same speaker are merged, because the API
 *    expects the two roles to alternate.
 */
function toGeminiContents(messages: { role: "user" | "assistant"; content: string }[]): GeminiContent[] {
  const contents: GeminiContent[] = [];

  for (const message of messages) {
    const role = message.role === "assistant" ? "model" : "user";
    if (contents.length === 0 && role === "model") continue;

    const last = contents[contents.length - 1];
    if (last?.role === role) {
      last.parts[0].text += `\n\n${message.content}`;
    } else {
      contents.push({ role, parts: [{ text: message.content }] });
    }
  }

  return contents;
}

/** The text of one streamed chunk, minus any thought summaries. */
function textFromChunk(chunk: unknown): string {
  const parts =
    (chunk as { candidates?: { content?: { parts?: { text?: string; thought?: boolean }[] } }[] })
      ?.candidates?.[0]?.content?.parts ?? [];

  return parts
    .filter((part) => typeof part.text === "string" && part.thought !== true)
    .map((part) => part.text)
    .join("");
}

/** Maps Gemini's status codes onto something a visitor can act on. */
function upstreamError(status: number, body: string) {
  // A rejected key is usually 401 UNAUTHENTICATED, but a key that is present
  // and malformed comes back as 400 INVALID_ARGUMENT with "API key not valid" —
  // the message is the only thing separating that from a bad request of ours.
  if (status === 401 || status === 403) return jsonError("Invalid or expired API key", 500);
  if (status === 400 && /API[_ ]key/i.test(body)) return jsonError("Invalid or expired API key", 500);
  if (status === 429) return jsonError("Rate limit reached. Please try again in a moment.", 429);
  return jsonError("Assistant is temporarily unavailable", 502);
}

export async function POST(request: NextRequest) {
  // 1. Key must be configured
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("GEMINI_API_KEY is missing from environment variables");
    return jsonError("Server misconfiguration: missing API key", 500);
  }

  // 2. Rate limit before doing any work
  if (isRateLimited(clientIp(request))) {
    return jsonError("Too many messages. Please wait a moment and try again.", 429);
  }

  // 3. Parse and validate the body
  let messages: ChatMessage[];
  let mode: string | undefined;
  let languageCode: string | undefined;
  try {
    const body = await request.json();
    messages = body?.messages;
    mode = typeof body?.mode === "string" ? body.mode : undefined;
    languageCode = typeof body?.language === "string" ? body.language : undefined;
  } catch {
    return jsonError("Invalid JSON in request body", 400);
  }

  // Only a code from our own list is ever accepted — the directive is
  // interpolated into the system prompt, so free text here would be an
  // injection vector straight into the model's instructions.
  const language = findLanguage(languageCode);
  // Repeated at both ends on purpose. With the directive only appended, gpt-4o
  // reliably lost it the moment a Tamil-selecting visitor typed one English
  // sentence — the persona's "mirror the visitor" rule sat earlier in the
  // prompt and won. Front and back, it holds.
  const directive = language ? languageDirective(language) : "";
  const systemPrompt = language
    ? `${directive}\n\n${CHAT_SYSTEM_PROMPT}\n\n${directive}`
    : CHAT_SYSTEM_PROMPT;

  /* ── Opener mode ────────────────────────────────────────────────────────
     Asks for the greeting and the four starter chips in the chosen language,
     as JSON in one short non-streamed call. This is why the widget can offer
     every language on the list without shipping 54 sets of hand-written UI
     copy that nobody on the team could proofread. */
  if (mode === "opener") {
    if (!language) return jsonError("Unknown language", 400);

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 15_000);
    try {
      const res = await callGemini(
        apiKey,
        "generateContent",
        {
          systemInstruction: systemPrompt,
          contents: [{ role: "user", parts: [{ text: openerPrompt(language) }] }],
          generationConfig: {
            maxOutputTokens: 320,
            temperature: 0.6,
            responseMimeType: "application/json",
            // The schema, not just the mime type: it is what guarantees four
            // strings under `suggestions` rather than a paragraph the widget
            // would have to guess at.
            responseSchema: {
              type: "OBJECT",
              properties: {
                greeting: { type: "STRING" },
                suggestions: { type: "ARRAY", items: { type: "STRING" } },
              },
              required: ["greeting", "suggestions"],
            },
          },
        },
        controller.signal
      );
      clearTimeout(timeout);

      if (!res.ok) {
        console.error(`Gemini opener error (${res.status}):`, await res.text().catch(() => ""));
        return jsonError("Could not prepare the opening message", 502);
      }

      const data = await res.json();
      const raw = textFromChunk(data);
      // Belt and braces: the schema should make the fence impossible, but a
      // fenced reply would otherwise take down the whole opener.
      const parsed = JSON.parse(raw.replace(/^```(?:json)?|```$/g, "").trim());

      const suggestions = Array.isArray(parsed?.suggestions)
        ? parsed.suggestions.filter((s: unknown) => typeof s === "string" && s.trim()).slice(0, 4)
        : [];

      if (typeof parsed?.greeting !== "string" || !parsed.greeting.trim()) {
        return jsonError("Could not prepare the opening message", 502);
      }

      return Response.json(
        { greeting: parsed.greeting.trim(), suggestions },
        { headers: CORS_HEADERS }
      );
    } catch (err) {
      clearTimeout(timeout);
      console.error("Opener request failed:", err);
      // The widget falls back to its bundled English opener on this path.
      return jsonError("Could not prepare the opening message", 502);
    }
  }

  if (!Array.isArray(messages) || messages.length === 0) {
    return jsonError("`messages` must be a non-empty array", 400);
  }

  const cleanMessages = messages
    .filter(
      (m) =>
        m &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.trim().length > 0
    )
    .slice(-MAX_HISTORY)
    .map((m) => ({
      role: m.role as "user" | "assistant",
      content: m.content.slice(0, MAX_CHARS_PER_MESSAGE),
    }));

  if (cleanMessages.length === 0) {
    return jsonError("No valid messages found", 400);
  }

  const contents = toGeminiContents(cleanMessages);

  // Everything the visitor sent was an assistant turn — nothing to answer.
  if (contents.length === 0) {
    return jsonError("No valid messages found", 400);
  }

  // 4. Call Gemini. The abort only guards the connection: it is cleared as
  //    soon as headers arrive, so a long streamed answer is never cut short.
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FIRST_BYTE_TIMEOUT_MS);

  let upstream: Response;
  try {
    upstream = await callGemini(
      apiKey,
      "streamGenerateContent",
      {
        systemInstruction: systemPrompt,
        contents,
        generationConfig: {
          // The assistant answers from a real catalog; list questions ("what
          // services do you offer") were being truncated at anything lower.
          // Non-Latin scripts also cost more tokens per sentence.
          maxOutputTokens: 800,
          // The prompt carries real prices and timelines, so the model should
          // recite them rather than improvise around them. Enough headroom is
          // left for the conversational tone the persona asks for.
          temperature: 0.5,
          // No presence/frequency penalties here: Gemini rejects the request
          // outright with "Penalty is not enabled for this model".
        },
      },
      controller.signal
    );
  } catch (err: unknown) {
    clearTimeout(timeout);
    if ((err as { name?: string })?.name === "AbortError") {
      console.error("Gemini request timed out before first byte");
      return jsonError("The assistant took too long to respond. Please try again.", 504);
    }
    console.error("Unexpected error calling Gemini:", err);
    return jsonError("Internal server error", 500);
  }

  clearTimeout(timeout);

  if (!upstream.ok || !upstream.body) {
    const errText = await upstream.text().catch(() => "");
    console.error(`Gemini API error (${upstream.status}):`, errText);
    return upstreamError(upstream.status, errText);
  }

  // 5. Re-emit the upstream SSE as plain text deltas. The widget only ever
  //    needs the text, so unwrapping here keeps the client simple and means
  //    the response format doesn't leak the provider's schema to the browser.
  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  const stream = new ReadableStream<Uint8Array>({
    async start(streamController) {
      const reader = upstream.body!.getReader();
      let buffer = "";
      let emittedAnything = false;

      const emitEvent = (event: string) => {
        for (const line of event.split("\n")) {
          const trimmed = line.trim();
          // Anything else is an SSE comment or a blank keep-alive line.
          if (!trimmed.startsWith("data:")) continue;

          try {
            const delta = textFromChunk(JSON.parse(trimmed.slice(5).trim()));
            if (delta) {
              emittedAnything = true;
              streamController.enqueue(encoder.encode(delta));
            }
          } catch {
            // A malformed chunk shouldn't kill an otherwise good answer.
          }
        }
      };

      try {
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;

          // Gemini separates events with CRLF, so the newlines are normalised
          // before splitting — a parser that only knows "\n\n" holds the whole
          // reply in its buffer and emits nothing at all.
          buffer += decoder.decode(value, { stream: true }).replace(/\r\n/g, "\n");

          // SSE events are separated by a blank line; keep the trailing partial.
          const events = buffer.split("\n\n");
          buffer = events.pop() ?? "";

          for (const event of events) emitEvent(event);
        }

        // Gemini has no `[DONE]` sentinel — it just closes — so the final event
        // is still sitting in the buffer when the read loop ends. Dropping it
        // would cut the last few words off every single answer.
        if (buffer.trim()) emitEvent(buffer);

        if (!emittedAnything) {
          streamController.enqueue(
            encoder.encode("Sorry, I couldn't put an answer together just then. Mind trying again?")
          );
        }
        streamController.close();
      } catch (err) {
        console.error("Error while streaming from Gemini:", err);
        if (!emittedAnything) {
          streamController.enqueue(
            encoder.encode("Sorry — my connection dropped mid-sentence. Could you ask me again?")
          );
        }
        streamController.close();
      } finally {
        reader.releaseLock();
      }
    },

    cancel() {
      // Visitor closed the widget or navigated away — stop paying for tokens.
      upstream.body?.cancel().catch(() => {});
    },
  });

  return new Response(stream, {
    headers: {
      ...CORS_HEADERS,
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache, no-transform",
      // Stops proxies (and Firebase's CDN layer) from buffering the stream.
      "X-Accel-Buffering": "no",
    },
  });
}

// Needed so the embed script (running on other domains) can call this route.
export async function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}
