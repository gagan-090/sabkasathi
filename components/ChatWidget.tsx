"use client";
// components/ChatWidget.tsx
// Floating AI chat widget — Sabka Saathi brand theme.
// Usage in app/layout.tsx:
//   import ChatWidget from "@/components/ChatWidget";
//   <ChatWidget /> just before closing </body>
//
// Positioned bottom-LEFT by default so it doesn't collide with
// <FloatingContact /> (commonly bottom-right). Change `side` prop if needed.

import { useState, useRef, useEffect } from "react";

type Role = "user" | "assistant";

interface Message {
  role: Role;
  content: string;
  error?: boolean;
}

interface ChatWidgetProps {
  apiUrl?: string;
  side?: "left" | "right";
  whatsappNumber?: string; // international format, no + or spaces, e.g. "919431673018"
  logoUrl?: string; // path to your logo, defaults to the site's existing /logo.png
}

const WELCOME_MESSAGE: Message = {
  role: "assistant",
  content:
    "Namaste! 👋 Main Sabka Saathi ka AI assistant hoon. Humari 25 services, pricing, timeline ya aapke business ke liye kya banega — kuch bhi poochiye.",
};

/* Deliberately mapped to what the assistant now actually knows from the site
   catalog — services, real price bands, delivery timelines, city coverage —
   so the first tap lands on a question it can answer well. */
const QUICK_REPLIES = [
  "What services do you offer?",
  "Pricing kya hai?",
  "How long will it take?",
  "Do you work in my city?",
  "Talk to a human",
];

const BRAND_GRADIENT = "linear-gradient(135deg, #4338CA 0%, #7C3AED 100%)";
const FONT = "var(--font-poppins), ui-sans-serif, system-ui, sans-serif";

export default function ChatWidget({
  apiUrl = "/api/chat",
  side = "left",
  whatsappNumber = "919431673018",
  logoUrl = "/logo.png",
}: ChatWidgetProps) {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [logoFailed, setLogoFailed] = useState(false);
  const logoSrc = logoFailed ? null : logoUrl;
  const endRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, open, loading]);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  async function callApi(history: Message[]) {
    setLoading(true);
    try {
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: history.map(({ role, content }) => ({ role, content })),
        }),
      });

      let data: { reply?: string } = {};
      try {
        data = await res.json();
      } catch {}

      if (!res.ok) {
        const friendly =
          res.status === 429
            ? "Thoda busy hoon abhi — kripya thodi der baad try karo."
            : "Kuch gadbad ho gayi. Please try again, ya WhatsApp karo neeche button se.";
        setMessages((prev) => [...prev, { role: "assistant", content: friendly, error: true }]);
        return;
      }

      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: data.reply || "Sorry, khaali response mila. Try again?" },
      ]);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Connection error — internet check karo, ya WhatsApp button se message karo.",
          error: true,
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  async function sendText(text: string) {
    const trimmed = text.trim();
    if (!trimmed || loading) return;
    setHasInteracted(true);
    const newMessages: Message[] = [...messages, { role: "user", content: trimmed }];
    setMessages(newMessages);
    setInput("");
    await callApi(newMessages);
  }

  async function retryLast() {
    if (loading) return;
    const withoutError = messages.filter((m) => !m.error);
    setMessages(withoutError);
    await callApi(withoutError);
  }

  // Builds a wa.me link pre-filled with context from the conversation
  // and opens it directly in a new tab when the user clicks the button.
  function openWhatsApp() {
    const lastUserMsg = [...messages].reverse().find((m) => m.role === "user")?.content;
    const prefill = lastUserMsg
      ? `Hi Sabka Saathi! I was chatting with your website AI about: "${lastUserMsg}". Can we talk further?`
      : "Hi Sabka Saathi! I'm interested in your services. Can we talk?";
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(prefill)}`;
    window.open(url, "_blank", "noopener,noreferrer");
  }

  const sidePos = side === "left" ? { left: 20 } : { right: 20 };

  return (
    <div style={{ position: "fixed", bottom: 20, ...sidePos, zIndex: 9999, fontFamily: FONT }}>
      {open && (
        <div
          role="dialog"
          aria-label="AI chat assistant"
          style={{
            width: 350,
            height: 500,
            maxWidth: "calc(100vw - 40px)",
            maxHeight: "calc(100vh - 120px)",
            background: "#fff",
            borderRadius: 20,
            boxShadow: "0 20px 50px rgba(67,56,202,0.25), 0 4px 12px rgba(0,0,0,0.08)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            marginBottom: 14,
            border: "1px solid rgba(67,56,202,0.08)",
          }}
        >
          {/* Header */}
          <div
            style={{
              background: BRAND_GRADIENT,
              color: "#fff",
              padding: "16px 18px",
              display: "flex",
              alignItems: "center",
              gap: 10,
            }}
          >
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.9)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexShrink: 0,
                overflow: "hidden",
                fontWeight: 700,
                fontSize: 13,
                color: "#4338CA",
              }}
            >
              {logoSrc ? (
                <img
                  src={logoSrc}
                  alt="Sabka Saathi"
                  width={34}
                  height={34}
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  onError={() => setLogoFailed(true)}
                />
              ) : (
                "SS"
              )}
            </div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontWeight: 600, fontSize: 15, lineHeight: 1.2 }}>Sabka Saathi Assistant</div>
              <div style={{ fontSize: 12, opacity: 0.85, display: "flex", alignItems: "center", gap: 5 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ADE80", display: "inline-block" }} />
                Online now
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              style={{ background: "none", border: "none", color: "#fff", cursor: "pointer", fontSize: 20, opacity: 0.85, lineHeight: 1, padding: 4 }}
            >
              ×
            </button>
          </div>

          {/* WhatsApp direct-open bar */}
          <button
            onClick={openWhatsApp}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 8,
              padding: "9px 12px",
              background: "#E7FCE9",
              border: "none",
              borderBottom: "1px solid #EEF0F6",
              color: "#128C4A",
              fontSize: 13,
              fontWeight: 600,
              fontFamily: FONT,
              cursor: "pointer",
            }}
          >
            <WhatsAppIcon />
            Chat directly on WhatsApp
          </button>

          {/* Messages. data-lenis-prevent keeps the transcript scrolling
              natively — the site-wide smooth-scroll instance would otherwise
              take the wheel gesture and pan the page behind the widget. */}
          <div data-lenis-prevent="" style={{ flex: 1, overflowY: "auto", padding: 14, background: "#F8F9FC" }}>
            {messages.map((m, i) => (
              <div key={i} style={{ display: "flex", justifyContent: m.role === "user" ? "flex-end" : "flex-start", marginBottom: 10 }}>
                <div
                  style={{
                    maxWidth: "82%",
                    padding: "10px 14px",
                    borderRadius: m.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                    fontSize: 14,
                    lineHeight: 1.5,
                    background: m.error ? "#FEE2E2" : m.role === "user" ? BRAND_GRADIENT : "#fff",
                    color: m.error ? "#991B1B" : m.role === "user" ? "#fff" : "#1E1B2E",
                    boxShadow: m.role === "assistant" && !m.error ? "0 1px 3px rgba(0,0,0,0.06)" : "none",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {m.content}
                </div>
              </div>
            ))}

            {/* Quick reply chips — shown before first user message */}
            {!hasInteracted && !loading && (
              <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 6 }}>
                {QUICK_REPLIES.map((q) => (
                  <button
                    key={q}
                    onClick={() => sendText(q)}
                    style={{
                      fontSize: 12.5,
                      padding: "7px 12px",
                      borderRadius: 999,
                      border: "1px solid #DDD6FE",
                      background: "#F5F3FF",
                      color: "#5B21B6",
                      cursor: "pointer",
                      fontFamily: FONT,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {q}
                  </button>
                ))}
              </div>
            )}

            {loading && (
              <div style={{ display: "flex", gap: 4, padding: "6px 4px" }}>
                <Dot delay={0} />
                <Dot delay={0.15} />
                <Dot delay={0.3} />
              </div>
            )}

            {!loading && messages[messages.length - 1]?.error && (
              <button
                onClick={retryLast}
                style={{ fontSize: 13, color: "#4338CA", background: "none", border: "none", cursor: "pointer", padding: 0, fontWeight: 600, textDecoration: "underline" }}
              >
                Retry
              </button>
            )}
            <div ref={endRef} />
          </div>

          {/* Input row */}
          <div style={{ display: "flex", borderTop: "1px solid #EEF0F6", padding: 8, gap: 6, background: "#fff" }}>
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  sendText(input);
                }
              }}
              placeholder="Type your question…"
              disabled={loading}
              style={{ flex: 1, border: "1px solid #E5E7EB", borderRadius: 12, padding: "10px 14px", fontSize: 14, outline: "none", fontFamily: FONT }}
            />
            <button
              onClick={() => sendText(input)}
              disabled={loading || !input.trim()}
              aria-label="Send message"
              style={{
                background: loading || !input.trim() ? "#D1D5DB" : BRAND_GRADIENT,
                color: "#fff",
                border: "none",
                borderRadius: 12,
                padding: "0 16px",
                cursor: loading || !input.trim() ? "not-allowed" : "pointer",
                fontWeight: 600,
                fontSize: 14,
              }}
            >
              ➤
            </button>
          </div>
        </div>
      )}

      {/* Toggle button */}
      <button
        onClick={() => setOpen((o) => !o)}
        aria-label="Toggle chat"
        style={{
          width: 60,
          height: 60,
          borderRadius: "50%",
          background: BRAND_GRADIENT,
          color: "#fff",
          border: "none",
          fontSize: 26,
          cursor: "pointer",
          boxShadow: "0 10px 30px rgba(67,56,202,0.4)",
          position: "relative",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
          padding: open || logoFailed ? undefined : 10,
        }}
      >
        {!open && (
          <span
            style={{
              position: "absolute",
              inset: 0,
              borderRadius: "50%",
              boxShadow: "0 0 0 0 rgba(124,58,237,0.5)",
              animation: "sschat-pulse 2.2s infinite",
            }}
          />
        )}
        {open ? (
          "×"
        ) : logoSrc ? (
          <img
            src={logoSrc}
            alt="Open chat"
            style={{ width: "100%", height: "100%", objectFit: "contain" }}
            onError={() => setLogoFailed(true)}
          />
        ) : (
          "💬"
        )}
      </button>

      <style>{`
        @keyframes sschat-pulse {
          0% { box-shadow: 0 0 0 0 rgba(124,58,237,0.45); }
          70% { box-shadow: 0 0 0 14px rgba(124,58,237,0); }
          100% { box-shadow: 0 0 0 0 rgba(124,58,237,0); }
        }
        @keyframes sschat-dot {
          0%, 60%, 100% { opacity: 0.3; transform: translateY(0); }
          30% { opacity: 1; transform: translateY(-3px); }
        }
      `}</style>
    </div>
  );
}

function Dot({ delay }: { delay: number }) {
  return (
    <span
      style={{ width: 6, height: 6, borderRadius: "50%", background: "#7C3AED", display: "inline-block", animation: `sschat-dot 1s ${delay}s infinite` }}
    />
  );
}

function WhatsAppIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="#128C4A" xmlns="http://www.w3.org/2000/svg">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm5.8 14.13c-.24.68-1.4 1.3-1.93 1.38-.49.08-1.11.11-1.79-.11-.41-.13-.94-.31-1.62-.6-2.85-1.23-4.7-4.1-4.85-4.29-.14-.19-1.16-1.54-1.16-2.94 0-1.4.73-2.09.99-2.37.26-.28.57-.35.76-.35.19 0 .38 0 .54.01.17.01.41-.06.64.49.24.57.81 1.98.88 2.12.07.14.12.31.02.5-.09.19-.14.31-.28.48-.14.17-.29.37-.42.5-.14.14-.28.29-.12.57.16.28.71 1.17 1.52 1.9 1.05.94 1.93 1.23 2.21 1.37.28.14.44.12.6-.07.16-.19.68-.79.87-1.06.19-.28.37-.23.62-.14.26.09 1.63.77 1.91.91.28.14.47.21.53.33.07.12.07.68-.17 1.35z"/>
    </svg>
  );
}