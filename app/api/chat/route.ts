// app/api/chat/route.ts
// Backend API route — calls Groq (Llama 3.3 70B) securely.
//
// SETUP:
// 1. Get/regenerate a Groq API key: https://console.groq.com/keys
// 2. Add to .env.local (NEVER commit this file, NEVER paste key in chat):


import { NextRequest } from "next/server";
import { CHAT_SYSTEM_PROMPT } from "@/lib/chatKnowledge";

type ChatRole = "user" | "assistant" | "system";

interface ChatMessage {
  role: ChatRole;
  content: string;
}

/* The system prompt is generated in lib/chatKnowledge.ts from the same modules
   the site renders from — the service catalog, industry list, geo tree, process
   and expertise copy. It is built once at module load, so the visitor pays no
   per-request cost for assembling it, and it cannot drift out of date the way a
   hand-written prompt does. */

const CORS_HEADERS = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type",
};

function jsonError(message: string, status: number) {
  return Response.json({ error: message }, { status, headers: CORS_HEADERS });
}

export async function POST(request: NextRequest) {
  // 1. Check API key is configured
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    console.error("GROQ_API_KEY is missing from environment variables");
    return jsonError("Server misconfiguration: missing API key", 500);
  }

  // 2. Parse and validate request body
  let messages: ChatMessage[];
  try {
    const body = await request.json();
    messages = body?.messages;
  } catch {
    return jsonError("Invalid JSON in request body", 400);
  }

  if (!Array.isArray(messages) || messages.length === 0) {
    return jsonError("`messages` must be a non-empty array", 400);
  }

  // Basic sanity check on each message + trim oversized history
  const MAX_HISTORY = 20; // keep last 20 turns to control token cost
  const cleanMessages = messages
    .filter(
      (m) =>
        m &&
        (m.role === "user" || m.role === "assistant") &&
        typeof m.content === "string" &&
        m.content.trim().length > 0
    )
    .slice(-MAX_HISTORY);

  if (cleanMessages.length === 0) {
    return jsonError("No valid messages found", 400);
  }

  const groqMessages: ChatMessage[] = [{ role: "system", content: CHAT_SYSTEM_PROMPT }, ...cleanMessages];

  // 3. Call Groq with timeout protection
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 20000); // 20s timeout

  try {
    const apiResponse = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "llama-3.3-70b-versatile",
        // Raised from 400: the assistant now answers from a real catalog, and
        // list questions ("what services do you offer") were being truncated.
        max_tokens: 700,
        // Lowered from 0.7: the prompt carries real prices and timelines, so
        // the model should recite them rather than improvise around them.
        temperature: 0.4,
        messages: groqMessages,
      }),
      signal: controller.signal,
    });

    clearTimeout(timeout);

    // Handle specific HTTP error codes from Groq
    if (!apiResponse.ok) {
      const errText = await apiResponse.text();
      console.error(`Groq API error (${apiResponse.status}):`, errText);

      if (apiResponse.status === 401) {
        return jsonError("Invalid or expired API key", 500);
      }
      if (apiResponse.status === 429) {
        return jsonError("Rate limit reached. Please try again in a moment.", 429);
      }
      return jsonError("AI service is temporarily unavailable", 502);
    }

    const data = await apiResponse.json();
    const reply: string | undefined = data?.choices?.[0]?.message?.content;

    if (!reply) {
      console.error("Groq response had no content:", JSON.stringify(data));
      return jsonError("Received an empty response from the AI", 502);
    }

    return Response.json({ reply }, { headers: CORS_HEADERS });
  } catch (err: any) {
    clearTimeout(timeout);

    if (err?.name === "AbortError") {
      console.error("Groq request timed out");
      return jsonError("The AI took too long to respond. Please try again.", 504);
    }

    console.error("Unexpected error calling Groq:", err);
    return jsonError("Internal server error", 500);
  }
}

// Needed so the embed script (running on other domains) can call this route
export async function OPTIONS() {
  return new Response(null, { status: 204, headers: CORS_HEADERS });
}