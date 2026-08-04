// app/api/chat/route.ts
// Backend for the site chat assistant — calls OpenRouter server-side so the
// key never reaches the browser, and streams the reply back token by token.
//
// SETUP:
//   1. Get a key: https://openrouter.ai/keys
//   2. Put it in .env.local (never commit, never paste in chat):
//        OPENROUTER_API_KEY=sk-or-v1-...
//        OPENROUTER_MODEL=openai/gpt-4o        # optional, this is the default
//   3. In production it comes from Secret Manager — see apphosting.yaml.

import { NextRequest } from "next/server";
import {
  CHAT_SYSTEM_PROMPT,
  COMPANY,
  SITE_URL,
  languageDirective,
  openerPrompt,
} from "@/lib/chatKnowledge";
import { findLanguage } from "@/lib/languages";

type ChatRole = "user" | "assistant" | "system";

interface ChatMessage {
  role: ChatRole;
  content: string;
}

/* The system prompt is generated in lib/chatKnowledge.ts from the same modules
   the site renders from — the service catalog, industry list, geo tree, process
   and expertise copy, the published FAQ. It is built once at module load, so the
   visitor pays no per-request cost for assembling it, and it cannot drift out of
   date the way a hand-written prompt does. */

const OPENROUTER_URL = "https://openrouter.ai/api/v1/chat/completions";
const MODEL = process.env.OPENROUTER_MODEL || "openai/gpt-4o";

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

/** Keep the last N turns so a long session can't balloon the token bill. */
const MAX_HISTORY = 20;
/** Cap a single message — the widget limits this too, but never trust the client. */
const MAX_CHARS_PER_MESSAGE = 2000;
/** Time allowed for OpenRouter to send its first byte. */
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
function callOpenRouter(apiKey: string, body: Record<string, unknown>, signal: AbortSignal) {
  return fetch(OPENROUTER_URL, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
      // OpenRouter uses these for attribution on its dashboard/leaderboards.
      "HTTP-Referer": SITE_URL,
      "X-Title": COMPANY.name,
    },
    body: JSON.stringify({ model: MODEL, ...body }),
    signal,
  });
}

export async function POST(request: NextRequest) {
  // 1. Key must be configured
  const apiKey = process.env.OPENROUTER_API_KEY;
  if (!apiKey) {
    console.error("OPENROUTER_API_KEY is missing from environment variables");
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
      const res = await callOpenRouter(
        apiKey,
        {
          max_tokens: 320,
          temperature: 0.6,
          response_format: { type: "json_object" },
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: openerPrompt(language) },
          ],
        },
        controller.signal
      );
      clearTimeout(timeout);

      if (!res.ok) {
        console.error(`OpenRouter opener error (${res.status}):`, await res.text().catch(() => ""));
        return jsonError("Could not prepare the opening message", 502);
      }

      const data = await res.json();
      const raw: string = data?.choices?.[0]?.message?.content ?? "";
      // Some models still wrap JSON in a fence despite response_format.
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
    .map((m) => ({ role: m.role, content: m.content.slice(0, MAX_CHARS_PER_MESSAGE) }));

  if (cleanMessages.length === 0) {
    return jsonError("No valid messages found", 400);
  }

  const payloadMessages: ChatMessage[] = [
    { role: "system", content: systemPrompt },
    ...cleanMessages,
  ];

  // 4. Call OpenRouter. The abort only guards the connection: it is cleared as
  //    soon as headers arrive, so a long streamed answer is never cut short.
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), FIRST_BYTE_TIMEOUT_MS);

  let upstream: Response;
  try {
    upstream = await callOpenRouter(
      apiKey,
      {
        stream: true,
        // The assistant answers from a real catalog; list questions ("what
        // services do you offer") were being truncated at anything lower.
        // Non-Latin scripts also cost more tokens per sentence.
        max_tokens: 800,
        // The prompt carries real prices and timelines, so the model should
        // recite them rather than improvise around them. Enough headroom is
        // left for the conversational tone the persona asks for.
        temperature: 0.5,
        // Discourages the model from re-opening every reply the same way.
        presence_penalty: 0.3,
        frequency_penalty: 0.2,
        messages: payloadMessages,
      },
      controller.signal
    );
  } catch (err: unknown) {
    clearTimeout(timeout);
    if ((err as { name?: string })?.name === "AbortError") {
      console.error("OpenRouter request timed out before first byte");
      return jsonError("The assistant took too long to respond. Please try again.", 504);
    }
    console.error("Unexpected error calling OpenRouter:", err);
    return jsonError("Internal server error", 500);
  }

  clearTimeout(timeout);

  if (!upstream.ok || !upstream.body) {
    const errText = await upstream.text().catch(() => "");
    console.error(`OpenRouter API error (${upstream.status}):`, errText);

    if (upstream.status === 401) return jsonError("Invalid or expired API key", 500);
    if (upstream.status === 402) return jsonError("The assistant is out of credits right now.", 502);
    if (upstream.status === 429) {
      return jsonError("Rate limit reached. Please try again in a moment.", 429);
    }
    return jsonError("Assistant is temporarily unavailable", 502);
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

      try {
        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;

          buffer += decoder.decode(value, { stream: true });

          // SSE events are separated by a blank line; keep the trailing partial.
          const events = buffer.split("\n\n");
          buffer = events.pop() ?? "";

          for (const event of events) {
            for (const line of event.split("\n")) {
              const trimmed = line.trim();
              // OpenRouter sends `: OPENROUTER PROCESSING` keep-alive comments.
              if (!trimmed.startsWith("data:")) continue;

              const data = trimmed.slice(5).trim();
              if (data === "[DONE]") {
                streamController.close();
                return;
              }

              try {
                const parsed = JSON.parse(data);
                const delta: string | undefined = parsed?.choices?.[0]?.delta?.content;
                if (delta) {
                  emittedAnything = true;
                  streamController.enqueue(encoder.encode(delta));
                }
              } catch {
                // A malformed chunk shouldn't kill an otherwise good answer.
              }
            }
          }
        }

        if (!emittedAnything) {
          streamController.enqueue(
            encoder.encode("Sorry, I couldn't put an answer together just then. Mind trying again?")
          );
        }
        streamController.close();
      } catch (err) {
        console.error("Error while streaming from OpenRouter:", err);
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
