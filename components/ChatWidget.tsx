"use client";
// components/ChatWidget.tsx
// The site's chat assistant — "Saathi".
//
// Usage in app/layout.tsx:
//   import ChatWidget from "@/components/ChatWidget";
//   <ChatWidget /> inside <body>
//
// Sits in the bottom-RIGHT corner. <FloatingContact /> shares that edge, so its
// stylesheet raises its own stack to clear this launcher — if you move the
// widget with `side="left"`, that offset in FloatingContact.tsx can come back
// down to its original 1.6rem/1.1rem.
//
// Shape: a small, quiet panel — 336×512 — with a single-line header. The
// restraint is the point; the premium reading comes from the espresso header,
// the hairline borders and the type, not from size or gradient drama.
//
// First run asks which language the visitor wants. Everything after that —
// greeting, starter chips, every reply — is in that language. The chips and
// greeting are generated per language by the model rather than shipped as 54
// hand-written translations nobody here could proofread; see /api/chat's
// opener mode.
//
// Styling lives in one injected stylesheet rather than inline `style` objects:
// hover, focus-visible, media queries and keyframes all need real selectors.

import { useState, useRef, useEffect, useCallback, useMemo, Fragment } from "react";
import {
  LANGUAGES,
  POPULAR_LANGUAGES,
  PICKER_PROMPTS,
  FALLBACK_GREETING,
  FALLBACK_SUGGESTIONS,
  findLanguage,
  type Language,
} from "@/lib/languages";

type Role = "user" | "assistant";

interface Message {
  role: Role;
  content: string;
  error?: boolean;
  streaming?: boolean;
  ts?: number;
}

interface ChatWidgetProps {
  apiUrl?: string;
  side?: "left" | "right";
  /** International format, no + or spaces. */
  whatsappNumber?: string;
  phoneNumber?: string;
  logoUrl?: string;
  /** Seconds before the launcher nudges a first-time visitor. 0 disables it. */
  teaserDelay?: number;
}

const STORAGE_KEY = "ss-chat-v3";
const TEASER_KEY = "ss-chat-teaser-v3";
const MAX_INPUT = 2000;

interface Saved {
  lang?: string;
  messages?: Message[];
  suggestions?: string[];
}

export default function ChatWidget({
  apiUrl = "/api/chat",
  // Bottom-right is the corner people reach for. <FloatingContact /> stacks its
  // WhatsApp/call buttons directly above it rather than sharing the spot.
  side = "right",
  whatsappNumber = "919431673018",
  phoneNumber = "919431673018",
  logoUrl = "/logo.png",
  teaserDelay = 10,
}: ChatWidgetProps) {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [lang, setLang] = useState<Language | null>(null);
  const [langLoading, setLangLoading] = useState(false);
  const [pickerOpen, setPickerOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [promptIndex, setPromptIndex] = useState(0);

  const [messages, setMessages] = useState<Message[]>([]);
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [logoFailed, setLogoFailed] = useState(false);
  const [teaser, setTeaser] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [atBottom, setAtBottom] = useState(true);

  const scrollRef = useRef<HTMLDivElement | null>(null);
  const endRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const logoSrc = logoFailed ? null : logoUrl;
  const canSend = input.trim().length > 0 && !loading && !!lang;
  const showPicker = open && (!lang || pickerOpen);

  useEffect(() => setMounted(true), []);

  /* ── Session persistence ─────────────────────────────────────────────────
     sessionStorage, not localStorage: a conversation should survive clicking
     through to /services and back, but a visitor returning next week deserves
     a fresh start rather than a stale half-finished thread. */
  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const saved = JSON.parse(raw) as Saved;
      const savedLang = findLanguage(saved.lang);
      if (savedLang) setLang(savedLang);
      if (Array.isArray(saved.messages) && saved.messages.length) {
        setMessages(saved.messages.map((m) => ({ ...m, streaming: false })));
      }
      if (Array.isArray(saved.suggestions)) setSuggestions(saved.suggestions);
    } catch {
      /* corrupt or unavailable storage — just start fresh */
    }
  }, []);

  useEffect(() => {
    if (messages.some((m) => m.streaming)) return; // don't thrash storage mid-stream
    try {
      const payload: Saved = { lang: lang?.code, messages: messages.slice(-40), suggestions };
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
    } catch {
      /* private mode / quota — persistence is a nicety, not a requirement */
    }
  }, [messages, lang, suggestions]);

  /* Cycles "Choose your language" through scripts, so a speaker of any of them
     sees their own within a few seconds without scrolling. */
  useEffect(() => {
    if (!showPicker) return;
    const id = setInterval(() => setPromptIndex((i) => (i + 1) % PICKER_PROMPTS.length), 2200);
    return () => clearInterval(id);
  }, [showPicker]);

  /* ── First-visit nudge ─────────────────────────────────────────────────── */
  useEffect(() => {
    if (!teaserDelay || open) return;
    try {
      if (sessionStorage.getItem(TEASER_KEY)) return;
    } catch {
      return;
    }
    const t = setTimeout(() => setTeaser(true), teaserDelay * 1000);
    return () => clearTimeout(t);
  }, [teaserDelay, open]);

  const dismissTeaser = useCallback(() => {
    setTeaser(false);
    try {
      sessionStorage.setItem(TEASER_KEY, "1");
    } catch {
      /* ignore */
    }
  }, []);

  /* ── Scrolling ───────────────────────────────────────────────────────────
     Only auto-scroll when the visitor is already at the bottom, so scrolling
     up to re-read an earlier answer isn't yanked away by an incoming token. */
  useEffect(() => {
    if (!open || !atBottom || showPicker) return;
    endRef.current?.scrollIntoView({
      block: "end",
      behavior: messages.some((m) => m.streaming) ? "auto" : "smooth",
    });
  }, [messages, open, loading, atBottom, showPicker]);

  const onScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    setAtBottom(el.scrollHeight - el.scrollTop - el.clientHeight < 60);
  }, []);

  /* ── Open / close ────────────────────────────────────────────────────── */
  useEffect(() => {
    if (!open) return;
    dismissTeaser();
    const t = setTimeout(() => {
      if (!showPicker) inputRef.current?.focus();
    }, 240);
    return () => clearTimeout(t);
  }, [open, showPicker, dismissTeaser]);

  useEffect(() => {
    if (!open) return;
    function onKey(e: KeyboardEvent) {
      if (e.key !== "Escape") return;
      if (menuOpen) return setMenuOpen(false);
      if (pickerOpen && lang) return setPickerOpen(false);
      setOpen(false);
    }
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, menuOpen, pickerOpen, lang]);

  useEffect(() => {
    if (!menuOpen) return;
    function onDown(e: MouseEvent) {
      if (!(e.target as HTMLElement).closest?.(".ss-menu-wrap")) setMenuOpen(false);
    }
    document.addEventListener("mousedown", onDown);
    return () => document.removeEventListener("mousedown", onDown);
  }, [menuOpen]);

  // Stop paying for tokens if the visitor leaves mid-answer.
  useEffect(() => () => abortRef.current?.abort(), []);

  /* ── Auto-growing composer ───────────────────────────────────────────── */
  useEffect(() => {
    const el = inputRef.current;
    if (!el) return;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 104)}px`;
  }, [input, open, showPicker]);

  /* ── Language selection ──────────────────────────────────────────────── */
  const chooseLanguage = useCallback(
    async (choice: Language) => {
      abortRef.current?.abort();
      setLang(choice);
      setPickerOpen(false);
      setQuery("");
      setMessages([]);
      setSuggestions([]);
      setLangLoading(true);

      const controller = new AbortController();
      abortRef.current = controller;

      // The greeting and chips are written by the model in the chosen language.
      // If that call fails the widget still opens — just in English.
      let greeting = FALLBACK_GREETING;
      let chips = FALLBACK_SUGGESTIONS;

      try {
        const res = await fetch(apiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: controller.signal,
          body: JSON.stringify({ mode: "opener", language: choice.code }),
        });
        if (res.ok) {
          const data = await res.json();
          if (typeof data?.greeting === "string" && data.greeting.trim()) greeting = data.greeting.trim();
          if (Array.isArray(data?.suggestions) && data.suggestions.length) chips = data.suggestions;
        }
      } catch (err) {
        if ((err as { name?: string })?.name === "AbortError") return;
      }

      setMessages([{ role: "assistant", content: greeting, ts: Date.now() }]);
      setSuggestions(chips);
      setLangLoading(false);
      abortRef.current = null;
      setTimeout(() => inputRef.current?.focus(), 60);
    },
    [apiUrl]
  );

  /* ── Talking to the API ──────────────────────────────────────────────── */
  const streamReply = useCallback(
    async (history: Message[]) => {
      setLoading(true);
      setAtBottom(true);

      const controller = new AbortController();
      abortRef.current = controller;

      const fail = (content: string) =>
        setMessages((prev) => [...prev, { role: "assistant", content, error: true, ts: Date.now() }]);

      try {
        const res = await fetch(apiUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: controller.signal,
          body: JSON.stringify({
            language: lang?.code,
            messages: history.filter((m) => !m.error).map(({ role, content }) => ({ role, content })),
          }),
        });

        // The happy path streams plain text; every failure comes back as JSON.
        const isStream = res.ok && res.body && (res.headers.get("content-type") ?? "").includes("text/plain");

        if (!isStream) {
          let serverMsg = "";
          try {
            serverMsg = (await res.json())?.error ?? "";
          } catch {
            /* non-JSON error body */
          }
          // Error copy stays English on purpose: it points at WhatsApp, and a
          // machine-translated apology in a language the model just failed at
          // would be the wrong thing to gamble on.
          fail(
            res.status === 429
              ? "I'm getting a lot of messages right now — please try again in a minute, or message us on WhatsApp."
              : serverMsg && res.status < 500
                ? serverMsg
                : "Something went wrong at my end. Please try again, or reach the team on WhatsApp — they reply quickly."
          );
          return;
        }

        // Placeholder bubble that fills in as tokens arrive.
        setMessages((prev) => [...prev, { role: "assistant", content: "", streaming: true, ts: Date.now() }]);

        const reader = res.body!.getReader();
        const decoder = new TextDecoder();
        let acc = "";
        let first = true;

        for (;;) {
          const { done, value } = await reader.read();
          if (done) break;
          acc += decoder.decode(value, { stream: true });
          if (first) {
            first = false;
            setLoading(false); // swap the typing dots for real text
          }
          setMessages((prev) => {
            const next = [...prev];
            next[next.length - 1] = { ...next[next.length - 1], content: acc };
            return next;
          });
        }

        setMessages((prev) => {
          const next = [...prev];
          const last = next[next.length - 1];
          next[next.length - 1] = {
            ...last,
            content: acc.trim() || "That came back empty — could you ask me once more?",
            streaming: false,
          };
          return next;
        });
      } catch (err) {
        if ((err as { name?: string })?.name === "AbortError") return;
        // Drop a half-written bubble before showing the failure.
        setMessages((prev) => (prev[prev.length - 1]?.streaming ? prev.slice(0, -1) : prev));
        fail("Connection error — check your internet, or message us on WhatsApp using the menu above.");
      } finally {
        setLoading(false);
        abortRef.current = null;
      }
    },
    [apiUrl, lang]
  );

  const sendText = useCallback(
    async (text: string) => {
      const trimmed = text.trim().slice(0, MAX_INPUT);
      if (!trimmed || loading || !lang) return;
      setSuggestions([]);
      const next: Message[] = [...messages, { role: "user", content: trimmed, ts: Date.now() }];
      setMessages(next);
      setInput("");
      await streamReply(next);
    },
    [messages, loading, lang, streamReply]
  );

  const retryLast = useCallback(async () => {
    if (loading) return;
    const withoutError = messages.filter((m) => !m.error);
    setMessages(withoutError);
    await streamReply(withoutError);
  }, [messages, loading, streamReply]);

  const resetChat = useCallback(() => {
    abortRef.current?.abort();
    setMenuOpen(false);
    if (lang) chooseLanguage(lang);
  }, [lang, chooseLanguage]);

  /* Hands the conversation to a human with the thread's context pre-filled, so
     the visitor doesn't have to repeat themselves on WhatsApp. */
  const openWhatsApp = useCallback(() => {
    setMenuOpen(false);
    const lastUser = [...messages].reverse().find((m) => m.role === "user")?.content;
    const prefill = lastUser
      ? `Hi Sabka Saathi! I was chatting with Saathi on your website about: "${lastUser.slice(0, 300)}". Can we take it forward?`
      : "Hi Sabka Saathi! I'm interested in your services. Can we talk?";
    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(prefill)}`, "_blank", "noopener,noreferrer");
  }, [messages, whatsappNumber]);

  /* ── Language list filtering ─────────────────────────────────────────── */
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return null;
    return LANGUAGES.filter(
      (l) => l.english.toLowerCase().includes(q) || l.native.toLowerCase().includes(q) || l.code.includes(q)
    );
  }, [query]);

  const rest = useMemo(() => LANGUAGES.filter((l) => !l.popular), []);
  const lastIsError = !loading && messages[messages.length - 1]?.error;

  return (
    <div className={`ss-root ss-${side}`} data-open={open ? "true" : "false"}>
      <style>{STYLES}</style>

      {open && (
        <div className="ss-panel" role="dialog" aria-label="Chat with Saathi" ref={panelRef}>
          {/* ── Header: one line, always ─────────────────────────────── */}
          <header className="ss-head">
            <div className="ss-avatar">
              {logoSrc ? (
                <img src={logoSrc} alt="" onError={() => setLogoFailed(true)} />
              ) : (
                <span className="ss-avatar-fallback">S</span>
              )}
              <span className="ss-avatar-status" aria-hidden="true" />
            </div>

            <div className="ss-head-text">
              <span className="ss-head-name">Saathi</span>
              <span className="ss-head-sub">
                {loading || langLoading ? "typing…" : lang ? lang.native : "Sabka Saathi"}
              </span>
            </div>

            <div className="ss-menu-wrap">
              <button
                className="ss-icon-btn"
                aria-label="Chat options"
                aria-expanded={menuOpen}
                onClick={() => setMenuOpen((v) => !v)}
              >
                <IconDots />
              </button>
              {menuOpen && (
                <div className="ss-menu" role="menu">
                  <button
                    role="menuitem"
                    onClick={() => {
                      setMenuOpen(false);
                      setPickerOpen(true);
                    }}
                  >
                    <IconGlobe /> Change language
                  </button>
                  <button role="menuitem" onClick={resetChat} disabled={!lang}>
                    <IconRefresh /> New chat
                  </button>
                  <button role="menuitem" onClick={openWhatsApp}>
                    <IconWhatsApp /> WhatsApp us
                  </button>
                  <a role="menuitem" href={`tel:+${phoneNumber}`} onClick={() => setMenuOpen(false)}>
                    <IconPhone /> Call the team
                  </a>
                </div>
              )}
            </div>

            <button className="ss-icon-btn" aria-label="Close chat" onClick={() => setOpen(false)}>
              <IconClose />
            </button>
          </header>

          {/* ── Language picker ──────────────────────────────────────── */}
          {showPicker ? (
            <div className="ss-picker">
              <div className="ss-picker-head">
                <div className="ss-picker-title" key={promptIndex}>
                  {PICKER_PROMPTS[promptIndex]}
                </div>
                <p className="ss-picker-note">I&apos;ll reply in whichever you pick.</p>
                <div className="ss-search">
                  <IconSearch />
                  <input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={`Search ${LANGUAGES.length} languages…`}
                    aria-label="Search languages"
                  />
                </div>
              </div>

              <div className="ss-picker-list" data-lenis-prevent="">
                {filtered ? (
                  filtered.length ? (
                    filtered.map((l) => <LangRow key={l.code} lang={l} onPick={chooseLanguage} />)
                  ) : (
                    <p className="ss-empty">No match. Try the English name.</p>
                  )
                ) : (
                  <>
                    <div className="ss-lang-head">Most used</div>
                    <div className="ss-lang-grid">
                      {POPULAR_LANGUAGES.map((l) => (
                        <button key={l.code} className="ss-lang-tile" onClick={() => chooseLanguage(l)}>
                          <span className="ss-lang-native">{l.native}</span>
                          {l.native !== l.english && <span className="ss-lang-en">{l.english}</span>}
                        </button>
                      ))}
                    </div>
                    <div className="ss-lang-head">All languages</div>
                    {rest.map((l) => (
                      <LangRow key={l.code} lang={l} onPick={chooseLanguage} />
                    ))}
                  </>
                )}
              </div>

              {lang && (
                <button className="ss-picker-cancel" onClick={() => setPickerOpen(false)}>
                  Keep {lang.native}
                </button>
              )}
            </div>
          ) : (
            <>
              {/* ── Transcript ───────────────────────────────────────
                  data-lenis-prevent keeps this scrolling natively — the
                  site-wide smooth-scroll instance would otherwise take the
                  wheel gesture and pan the page behind the widget. */}
              <div
                className="ss-scroll"
                ref={scrollRef}
                onScroll={onScroll}
                data-lenis-prevent=""
              >
                {langLoading && (
                  <div className="ss-warming">
                    <span className="ss-spin" aria-hidden="true" />
                    Getting ready in {lang?.english}…
                  </div>
                )}

                {messages.map((m, i) => {
                  const prev = messages[i - 1];
                  const grouped = prev?.role === m.role && !prev?.error && !m.error;
                  return (
                    <div
                      key={i}
                      data-last={i === messages.length - 1 ? "true" : undefined}
                      className={`ss-row ss-${m.role}${m.error ? " ss-row-error" : ""}${grouped ? " ss-grouped" : ""}`}
                    >
                      <div className="ss-bubble">
                        <RichText text={m.content} />
                        {m.streaming && <span className="ss-caret" aria-hidden="true" />}
                      </div>
                      {mounted && m.ts && !m.streaming && <time className="ss-time">{formatTime(m.ts)}</time>}
                    </div>
                  );
                })}

                {loading && (
                  <div className="ss-row ss-assistant">
                    <div className="ss-bubble ss-bubble-typing" aria-label="Saathi is typing">
                      <span className="ss-dot" />
                      <span className="ss-dot" />
                      <span className="ss-dot" />
                    </div>
                  </div>
                )}

                {lastIsError && (
                  <button className="ss-retry" onClick={retryLast}>
                    <IconRefresh /> Try again
                  </button>
                )}

                {!loading && !langLoading && suggestions.length > 0 && (
                  <div className="ss-chips">
                    {suggestions.map((q, i) => (
                      <button
                        key={`${q}-${i}`}
                        className="ss-chip"
                        style={{ animationDelay: `${i * 55}ms` }}
                        onClick={() => sendText(q)}
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                )}

                <div ref={endRef} />
              </div>

              {/* Announces finished replies only. Putting aria-live on the
                  transcript itself would make a screen reader re-read the
                  bubble on every streamed token. */}
              <div className="ss-sr" role="status" aria-live="polite">
                {(() => {
                  const last = messages[messages.length - 1];
                  return last && last.role === "assistant" && !last.streaming ? last.content : "";
                })()}
              </div>

              {!atBottom && (
                <button
                  className="ss-jump"
                  aria-label="Jump to latest message"
                  onClick={() => {
                    setAtBottom(true);
                    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
                  }}
                >
                  <IconChevronDown />
                </button>
              )}

              {/* ── Composer ─────────────────────────────────────────── */}
              <div className="ss-composer">
                <textarea
                  ref={inputRef}
                  className="ss-input"
                  rows={1}
                  value={input}
                  maxLength={MAX_INPUT}
                  disabled={langLoading}
                  placeholder={langLoading ? "One moment…" : "Type your message…"}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      sendText(input);
                    }
                  }}
                />
                <button
                  className="ss-send"
                  onClick={() => sendText(input)}
                  disabled={!canSend}
                  aria-label="Send message"
                  data-active={canSend ? "true" : "false"}
                >
                  <IconSend />
                </button>
              </div>
            </>
          )}
        </div>
      )}

      {/* ── Teaser ────────────────────────────────────────────────────── */}
      {teaser && !open && (
        <div className="ss-teaser" role="status">
          <button className="ss-teaser-x" aria-label="Dismiss" onClick={dismissTeaser}>
            <IconClose />
          </button>
          <p onClick={() => setOpen(true)}>
            <strong>Saathi</strong>
            Namaste! 👋 Website, app or software — ask me anything, in your own language.
          </p>
        </div>
      )}

      {/* ── Launcher ──────────────────────────────────────────────────── */}
      <button
        className="ss-launcher"
        onClick={() => {
          setOpen((o) => !o);
          dismissTeaser();
        }}
        aria-label={open ? "Close chat" : "Open chat with Saathi"}
        aria-expanded={open}
      >
        <span className="ss-launcher-ring" aria-hidden="true" />
        <span className="ss-launcher-face">
          {open ? (
            <IconClose />
          ) : logoSrc ? (
            <img src={logoSrc} alt="" onError={() => setLogoFailed(true)} />
          ) : (
            <IconChat />
          )}
        </span>
      </button>
    </div>
  );
}

function LangRow({ lang, onPick }: { lang: Language; onPick: (l: Language) => void }) {
  return (
    <button className="ss-lang-row" onClick={() => onPick(lang)}>
      <span className="ss-lang-native">{lang.native}</span>
      {lang.native !== lang.english && <span className="ss-lang-en">{lang.english}</span>}
      <IconArrow />
    </button>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   Rich text
   The model replies in light markdown. Rendering it as React elements rather
   than injected HTML means there is no path from model output to executable
   markup — the polish costs nothing in safety.
   ══════════════════════════════════════════════════════════════════════════ */

const SAFE_PROTOCOL = /^(https?:|mailto:|tel:)/i;

function RichText({ text }: { text: string }) {
  const blocks = useMemo(() => parseBlocks(text), [text]);

  return (
    <>
      {blocks.map((block, i) => {
        if (block.type === "ul") {
          return (
            <ul className="ss-list" key={i}>
              {block.items.map((item, j) => (
                <li key={j}>
                  <Inline text={item} />
                </li>
              ))}
            </ul>
          );
        }
        if (block.type === "ol") {
          return (
            <ol className="ss-list ss-list-num" key={i}>
              {block.items.map((item, j) => (
                <li key={j}>
                  <Inline text={item} />
                </li>
              ))}
            </ol>
          );
        }
        return (
          <p className="ss-p" key={i}>
            <Inline text={block.text} />
          </p>
        );
      })}
    </>
  );
}

type Block =
  | { type: "p"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] };

function parseBlocks(text: string): Block[] {
  const blocks: Block[] = [];
  let list: { type: "ul" | "ol"; items: string[] } | null = null;
  let para: string[] = [];

  const flushPara = () => {
    if (para.length) {
      blocks.push({ type: "p", text: para.join("\n") });
      para = [];
    }
  };
  const flushList = () => {
    if (list) {
      blocks.push(list);
      list = null;
    }
  };

  for (const rawLine of text.split("\n")) {
    const line = rawLine.trimEnd();
    const bullet = /^\s*[-*•]\s+(.*)$/.exec(line);
    const numbered = /^\s*\d+[.)]\s+(.*)$/.exec(line);

    if (bullet) {
      flushPara();
      if (list?.type !== "ul") {
        flushList();
        list = { type: "ul", items: [] };
      }
      list.items.push(bullet[1]);
    } else if (numbered) {
      flushPara();
      if (list?.type !== "ol") {
        flushList();
        list = { type: "ol", items: [] };
      }
      list.items.push(numbered[1]);
    } else if (line.trim() === "") {
      flushPara();
      flushList();
    } else {
      flushList();
      // Strip markdown headings — the bubble has one type scale, not six.
      para.push(line.replace(/^#{1,6}\s+/, ""));
    }
  }
  flushPara();
  flushList();

  return blocks.length ? blocks : [{ type: "p", text }];
}

/** Handles **bold**, *italic*, `code`, [label](url), bare URLs and emails. */
function Inline({ text }: { text: string }) {
  const pattern =
    /(\*\*[^*]+\*\*)|(`[^`]+`)|(\*[^*\n]+\*)|(\[[^\]]+\]\([^)\s]+\))|(https?:\/\/[^\s<>()]+)|([\w.+-]+@[\w-]+\.[\w.]+)/g;

  const nodes: React.ReactNode[] = [];
  let last = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > last) nodes.push(<Fragment key={key++}>{text.slice(last, match.index)}</Fragment>);
    const token = match[0];

    if (token.startsWith("**")) {
      nodes.push(<strong key={key++}>{token.slice(2, -2)}</strong>);
    } else if (token.startsWith("`")) {
      nodes.push(
        <code className="ss-code" key={key++}>
          {token.slice(1, -1)}
        </code>
      );
    } else if (token.startsWith("*")) {
      nodes.push(<em key={key++}>{token.slice(1, -1)}</em>);
    } else if (token.startsWith("[")) {
      const linkMatch = /^\[([^\]]+)\]\(([^)\s]+)\)$/.exec(token);
      const href = linkMatch?.[2] ?? "";
      nodes.push(
        SAFE_PROTOCOL.test(href) ? (
          <a className="ss-link" key={key++} href={href} target="_blank" rel="noopener noreferrer nofollow">
            {linkMatch![1]}
          </a>
        ) : (
          <Fragment key={key++}>{linkMatch?.[1] ?? token}</Fragment>
        )
      );
    } else if (token.startsWith("http")) {
      // Trailing sentence punctuation shouldn't end up inside the href.
      const trimmed = token.replace(/[.,;:!?]+$/, "");
      nodes.push(
        <Fragment key={key++}>
          <a className="ss-link" href={trimmed} target="_blank" rel="noopener noreferrer nofollow">
            {trimmed.replace(/^https?:\/\//, "")}
          </a>
          {token.slice(trimmed.length)}
        </Fragment>
      );
    } else {
      nodes.push(
        <a className="ss-link" key={key++} href={`mailto:${token}`}>
          {token}
        </a>
      );
    }
    last = match.index + token.length;
  }

  if (last < text.length) nodes.push(<Fragment key={key++}>{text.slice(last)}</Fragment>);
  return <>{nodes}</>;
}

function formatTime(ts: number): string {
  return new Date(ts).toLocaleTimeString("en-IN", { hour: "numeric", minute: "2-digit", hour12: true });
}

/* ══════════════════════════════════════════════════════════════════════════
   Icons — inline so the widget carries no icon-library dependency.
   ══════════════════════════════════════════════════════════════════════════ */

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.9,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

function IconClose() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" {...stroke} aria-hidden="true">
      <path d="M18 6 6 18M6 6l12 12" />
    </svg>
  );
}
function IconDots() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor" aria-hidden="true">
      <circle cx="5" cy="12" r="1.7" />
      <circle cx="12" cy="12" r="1.7" />
      <circle cx="19" cy="12" r="1.7" />
    </svg>
  );
}
function IconRefresh() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" {...stroke} aria-hidden="true">
      <path d="M3 12a9 9 0 0 1 15.5-6.2L21 8" />
      <path d="M21 3v5h-5" />
      <path d="M21 12a9 9 0 0 1-15.5 6.2L3 16" />
      <path d="M3 21v-5h5" />
    </svg>
  );
}
function IconGlobe() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" {...stroke} aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M3 12h18M12 3a15 15 0 0 1 0 18 15 15 0 0 1 0-18Z" />
    </svg>
  );
}
function IconSearch() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" {...stroke} aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-3.5-3.5" />
    </svg>
  );
}
function IconPhone() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" {...stroke} aria-hidden="true">
      <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2Z" />
    </svg>
  );
}
function IconSend() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" {...stroke} aria-hidden="true">
      <path d="M4.5 12h6" />
      <path d="m3.4 5.1 16.4 6.4a.5.5 0 0 1 0 .94L3.4 18.9a.5.5 0 0 1-.68-.6L4.5 12 2.72 5.7a.5.5 0 0 1 .68-.6Z" />
    </svg>
  );
}
function IconArrow() {
  return (
    <svg viewBox="0 0 24 24" width="13" height="13" {...stroke} aria-hidden="true">
      <path d="M5 12h13M13 6l6 6-6 6" />
    </svg>
  );
}
function IconChevronDown() {
  return (
    <svg viewBox="0 0 24 24" width="15" height="15" {...stroke} aria-hidden="true">
      <path d="m6 9 6 6 6-6" />
    </svg>
  );
}
function IconChat() {
  return (
    <svg viewBox="0 0 24 24" width="24" height="24" {...stroke} strokeWidth={1.7} aria-hidden="true">
      <path d="M21 11.5a8.4 8.4 0 0 1-9 8.4 9.5 9.5 0 0 1-3.4-.6L3 21l1.8-5a8.2 8.2 0 0 1-.8-3.6 8.4 8.4 0 0 1 8.6-8.4h.5A8.4 8.4 0 0 1 21 11.5Z" />
    </svg>
  );
}
function IconWhatsApp() {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true">
      <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21h.01c5.46 0 9.91-4.45 9.91-9.91C21.96 6.45 17.5 2 12.04 2zm5.8 14.13c-.24.68-1.4 1.3-1.93 1.38-.49.08-1.11.11-1.79-.11-.41-.13-.94-.31-1.62-.6-2.85-1.23-4.7-4.1-4.85-4.29-.14-.19-1.16-1.54-1.16-2.94 0-1.4.73-2.09.99-2.37.26-.28.57-.35.76-.35.19 0 .38 0 .54.01.17.01.41-.06.64.49.24.57.81 1.98.88 2.12.07.14.12.31.02.5-.09.19-.14.31-.28.48-.14.17-.29.37-.42.5-.14.14-.28.29-.12.57.16.28.71 1.17 1.52 1.9 1.05.94 1.93 1.23 2.21 1.37.28.14.44.12.6-.07.16-.19.68-.79.87-1.06.19-.28.37-.23.62-.14.26.09 1.63.77 1.91.91.28.14.47.21.53.33.07.12.07.68-.17 1.35z" />
    </svg>
  );
}

/* ══════════════════════════════════════════════════════════════════════════
   Styles

   Classic reading: an espresso header rather than a bright gradient bar, warm
   paper behind the transcript, hairline borders, and the amber brand kept for
   the two places it earns attention — the visitor's own bubbles and the send
   button. Small panel, quiet surfaces, generous type.
   ══════════════════════════════════════════════════════════════════════════ */

const STYLES = `
.ss-root {
  /* Site tokens with fallbacks, so the widget is on-brand here and still
     correct anywhere the palette isn't defined. */
  --ss-brand: var(--brand, #ff9500);
  --ss-brand-deep: var(--brand-deep, #c2560a);
  --ss-brand-soft: var(--brand-soft, #ffd200);
  --ss-ink: var(--ink, #1f1408);
  --ss-ink-2: var(--ink-2, #402b16);
  --ss-muted: var(--muted, #7c6552);
  --ss-faint: var(--faint, #a28b76);
  --ss-paper: var(--paper, #fffdf9);
  --ss-paper-tint: var(--paper-tint, #fff6ea);
  --ss-hair: var(--hair, rgba(255,149,0,0.16));
  --ss-grad: var(--grad-brand, linear-gradient(135deg,#ffd200 0%,#ffab2e 34%,#ff9500 68%,#e06600 100%));
  --ss-ease: var(--ease-out-quint, cubic-bezier(0.16,1,0.3,1));
  --ss-font: var(--font-dm-sans), var(--font-poppins), ui-sans-serif, system-ui, sans-serif;
  --ss-display: var(--font-instrument-serif), Georgia, serif;
  --ss-espresso: linear-gradient(168deg, #2c1d0e 0%, #1a1108 100%);

  position: fixed;
  bottom: 1.5rem;
  /* Below <FloatingContact /> (9999) while closed so its tooltips still work;
     above it once open, so the mobile full-screen sheet isn't pierced by the
     floating WhatsApp/call buttons. */
  z-index: 9998;
  font-family: var(--ss-font);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.7rem;
  color: var(--ss-ink);
}
.ss-root.ss-left { left: 1.5rem; }
.ss-root.ss-right { right: 1.5rem; align-items: flex-end; }
.ss-root[data-open="true"] { z-index: 10000; }
.ss-root *, .ss-root *::before, .ss-root *::after { box-sizing: border-box; }
.ss-root button { font-family: inherit; }

.ss-sr {
  position: absolute;
  width: 1px; height: 1px;
  padding: 0; margin: -1px;
  overflow: hidden;
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  white-space: nowrap;
}

/* ── Panel ──────────────────────────────────────────────────────────────── */
.ss-panel {
  width: 336px;
  height: min(512px, calc(100vh - 7.5rem));
  background: var(--ss-paper);
  border: 1px solid rgba(44,29,14,0.1);
  border-radius: 18px;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  position: relative;
  transform-origin: bottom left;
  animation: ss-in 0.4s var(--ss-ease) both;
  box-shadow:
    0 1px 2px rgba(44,29,14,0.05),
    0 10px 24px -10px rgba(44,29,14,0.22),
    0 30px 60px -24px rgba(44,29,14,0.3);
}
.ss-right .ss-panel { transform-origin: bottom right; }

@keyframes ss-in {
  from { opacity: 0; transform: translateY(14px) scale(0.96); }
  to   { opacity: 1; transform: none; }
}

/* ── Header — one compact line ──────────────────────────────────────────── */
.ss-head {
  display: flex;
  align-items: center;
  gap: 0.55rem;
  padding: 0 0.5rem 0 0.7rem;
  height: 50px;
  flex-shrink: 0;
  background: var(--ss-espresso);
  color: #f7ede0;
  border-bottom: 1px solid rgba(255,210,0,0.22);
}

.ss-avatar {
  position: relative;
  width: 27px; height: 27px;
  border-radius: 50%;
  flex-shrink: 0;
  display: grid;
  place-items: center;
  background: #fff;
  box-shadow: 0 0 0 1px rgba(255,210,0,0.3);
}
.ss-avatar img { width: 100%; height: 100%; object-fit: cover; border-radius: 50%; display: block; }
.ss-avatar-fallback {
  font-family: var(--ss-display);
  font-size: 0.85rem;
  line-height: 1;
  color: var(--ss-brand-deep);
}
.ss-avatar-status {
  position: absolute;
  right: -1px; bottom: -1px;
  width: 8px; height: 8px;
  border-radius: 50%;
  background: #34d058;
  border: 1.5px solid #22160b;
}

.ss-head-text { flex: 1; min-width: 0; display: flex; align-items: baseline; gap: 0.4rem; }
.ss-head-name {
  font-family: var(--ss-display);
  font-size: 1.02rem;
  letter-spacing: 0.015em;
  color: #fff6e6;
}
.ss-head-sub {
  font-size: 0.66rem;
  font-weight: 500;
  letter-spacing: 0.03em;
  color: rgba(247,237,224,0.62);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.ss-icon-btn {
  width: 27px; height: 27px;
  display: grid; place-items: center;
  border: none; border-radius: 7px;
  background: transparent;
  color: rgba(247,237,224,0.72);
  cursor: pointer;
  transition: background 0.18s, color 0.18s;
  flex-shrink: 0;
}
.ss-icon-btn:hover { background: rgba(255,255,255,0.1); color: #fff6e6; }
.ss-icon-btn:focus-visible { outline: 2px solid var(--ss-brand-soft); outline-offset: 1px; }

.ss-menu-wrap { position: relative; }
.ss-menu {
  position: absolute;
  top: calc(100% + 7px);
  right: 0;
  min-width: 168px;
  background: #fff;
  border: 1px solid rgba(44,29,14,0.1);
  border-radius: 11px;
  padding: 4px;
  box-shadow: 0 14px 30px -12px rgba(44,29,14,0.34);
  animation: ss-pop 0.18s var(--ss-ease) both;
  z-index: 4;
}
@keyframes ss-pop { from { opacity: 0; transform: translateY(-5px) scale(0.97); } to { opacity: 1; transform: none; } }
.ss-menu button, .ss-menu a {
  display: flex; align-items: center; gap: 0.5rem;
  width: 100%;
  padding: 0.44rem 0.55rem;
  border: none; background: none;
  border-radius: 7px;
  font-size: 0.78rem;
  font-weight: 500;
  color: var(--ss-ink-2);
  text-decoration: none;
  cursor: pointer;
  text-align: left;
  transition: background 0.15s, color 0.15s;
}
.ss-menu button:hover, .ss-menu a:hover { background: var(--ss-paper-tint); color: var(--ss-brand-deep); }
.ss-menu button:disabled { opacity: 0.4; cursor: default; background: none; color: var(--ss-ink-2); }

/* ── Language picker ────────────────────────────────────────────────────── */
.ss-picker { display: flex; flex-direction: column; flex: 1; min-height: 0; background: var(--ss-paper); }
.ss-picker-head { padding: 0.9rem 0.9rem 0.65rem; border-bottom: 1px solid var(--ss-hair); flex-shrink: 0; }
.ss-picker-title {
  font-family: var(--ss-display);
  font-size: 1.18rem;
  line-height: 1.25;
  color: var(--ss-ink);
  min-height: 1.5em;
  animation: ss-fade 0.5s var(--ss-ease) both;
}
@keyframes ss-fade { from { opacity: 0; transform: translateY(4px); } to { opacity: 1; transform: none; } }
.ss-picker-note { margin: 0.1rem 0 0.65rem; font-size: 0.72rem; color: var(--ss-muted); }

.ss-search {
  display: flex; align-items: center; gap: 0.42rem;
  padding: 0.4rem 0.6rem;
  border: 1px solid var(--ss-hair);
  border-radius: 9px;
  background: #fff;
  color: var(--ss-faint);
  transition: border-color 0.18s, box-shadow 0.18s;
}
.ss-search:focus-within { border-color: var(--ss-brand); box-shadow: 0 0 0 3px rgba(255,149,0,0.13); }
.ss-search input {
  flex: 1; min-width: 0;
  border: none; outline: none; background: none;
  font-family: inherit; font-size: 0.79rem;
  color: var(--ss-ink);
}
.ss-search input::placeholder { color: var(--ss-faint); }

.ss-picker-list {
  flex: 1;
  overflow-y: auto;
  overscroll-behavior: contain;
  padding: 0.5rem 0.6rem 0.8rem;
  scrollbar-width: thin;
  scrollbar-color: rgba(194,86,10,0.22) transparent;
}
.ss-picker-list::-webkit-scrollbar { width: 5px; }
.ss-picker-list::-webkit-scrollbar-thumb { background: rgba(194,86,10,0.2); border-radius: 99px; }

.ss-lang-head {
  font-size: 0.6rem;
  font-weight: 600;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--ss-faint);
  margin: 0.55rem 0.25rem 0.4rem;
}
.ss-lang-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 0.35rem; }
.ss-lang-tile {
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  gap: 0.08rem;
  padding: 0.5rem 0.3rem;
  min-height: 52px;
  border: 1px solid var(--ss-hair);
  border-radius: 10px;
  background: #fff;
  cursor: pointer;
  transition: border-color 0.18s, transform 0.18s var(--ss-ease), box-shadow 0.18s;
}
.ss-lang-tile:hover {
  border-color: var(--ss-brand);
  transform: translateY(-1px);
  box-shadow: 0 5px 12px -6px rgba(224,102,0,0.45);
}

.ss-lang-row {
  display: flex; align-items: center; gap: 0.5rem;
  width: 100%;
  padding: 0.5rem 0.55rem;
  border: none;
  border-radius: 9px;
  background: none;
  cursor: pointer;
  text-align: left;
  transition: background 0.15s;
}
.ss-lang-row:hover { background: var(--ss-paper-tint); }
.ss-lang-row svg { margin-left: auto; color: var(--ss-faint); opacity: 0; transition: opacity 0.15s, transform 0.2s; flex-shrink: 0; }
.ss-lang-row:hover svg { opacity: 1; transform: translateX(2px); color: var(--ss-brand-deep); }

.ss-lang-native { font-size: 0.85rem; font-weight: 500; color: var(--ss-ink); line-height: 1.25; }
.ss-lang-tile .ss-lang-native { font-size: 0.8rem; text-align: center; }
.ss-lang-en { font-size: 0.68rem; color: var(--ss-faint); }
.ss-lang-tile .ss-lang-en { font-size: 0.6rem; }

.ss-empty { font-size: 0.78rem; color: var(--ss-muted); text-align: center; padding: 1.4rem 0; }

.ss-picker-cancel {
  flex-shrink: 0;
  padding: 0.62rem;
  border: none;
  border-top: 1px solid var(--ss-hair);
  background: #fff;
  color: var(--ss-brand-deep);
  font-size: 0.78rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.18s;
}
.ss-picker-cancel:hover { background: var(--ss-paper-tint); }

/* ── Transcript ─────────────────────────────────────────────────────────── */
.ss-scroll {
  flex: 1;
  overflow-y: auto;
  overscroll-behavior: contain;
  padding: 0.85rem 0.8rem 1rem;
  background: var(--ss-paper);
  scrollbar-width: thin;
  scrollbar-color: rgba(194,86,10,0.22) transparent;
}
.ss-scroll::-webkit-scrollbar { width: 5px; }
.ss-scroll::-webkit-scrollbar-thumb { background: rgba(194,86,10,0.2); border-radius: 99px; }
.ss-scroll::-webkit-scrollbar-thumb:hover { background: rgba(194,86,10,0.36); }

.ss-warming {
  display: flex; align-items: center; justify-content: center; gap: 0.45rem;
  padding: 1.6rem 0;
  font-size: 0.76rem;
  color: var(--ss-muted);
}
.ss-spin {
  width: 12px; height: 12px;
  border: 1.6px solid var(--ss-hair);
  border-top-color: var(--ss-brand);
  border-radius: 50%;
  animation: ss-spin 0.75s linear infinite;
}
@keyframes ss-spin { to { transform: rotate(360deg); } }

.ss-row {
  display: flex;
  flex-direction: column;
  max-width: 86%;
  margin-bottom: 0.62rem;
  animation: ss-msg 0.3s var(--ss-ease) both;
}
.ss-row.ss-user { margin-left: auto; align-items: flex-end; }
.ss-row.ss-grouped { margin-top: -0.36rem; }
@keyframes ss-msg { from { opacity: 0; transform: translateY(7px); } to { opacity: 1; transform: none; } }

.ss-bubble {
  padding: 0.55rem 0.78rem;
  border-radius: 14px 14px 14px 4px;
  font-size: 0.835rem;
  line-height: 1.6;
  background: #fff;
  color: var(--ss-ink);
  border: 1px solid rgba(44,29,14,0.08);
  box-shadow: 0 1px 2px rgba(44,29,14,0.04);
  word-break: break-word;
  overflow-wrap: anywhere;
}
.ss-grouped .ss-bubble { border-radius: 14px 14px 14px 10px; }
.ss-user .ss-bubble {
  background: var(--ss-grad);
  color: #fff;
  border-color: transparent;
  border-radius: 14px 14px 4px 14px;
  box-shadow: 0 2px 8px -3px rgba(224,102,0,0.5);
}
.ss-user.ss-grouped .ss-bubble { border-radius: 14px 14px 10px 14px; }
.ss-row-error .ss-bubble {
  background: #fff4f1;
  border-color: rgba(200,60,30,0.2);
  color: #9c2a12;
  box-shadow: none;
}

.ss-bubble .ss-p { margin: 0; }
.ss-bubble .ss-p + .ss-p, .ss-bubble .ss-list { margin-top: 0.45rem; }
.ss-bubble .ss-list { padding-left: 1rem; margin-bottom: 0; }
.ss-bubble .ss-list li { margin: 0.16rem 0; }
.ss-bubble .ss-list li::marker { color: var(--ss-brand); font-weight: 700; }
.ss-user .ss-bubble .ss-list li::marker { color: rgba(255,255,255,0.82); }
.ss-bubble strong { font-weight: 600; }
.ss-code {
  font-family: ui-monospace, "SF Mono", Menlo, monospace;
  font-size: 0.82em;
  padding: 0.06em 0.32em;
  border-radius: 4px;
  background: rgba(194,86,10,0.1);
}
.ss-user .ss-code { background: rgba(255,255,255,0.24); }
.ss-link {
  color: var(--ss-brand-deep);
  font-weight: 600;
  text-decoration: none;
  border-bottom: 1px solid rgba(194,86,10,0.38);
  transition: border-color 0.15s;
}
.ss-link:hover { border-bottom-color: var(--ss-brand-deep); }
.ss-user .ss-link { color: #fff; border-bottom-color: rgba(255,255,255,0.6); }

/* Streaming caret — the small tell that the answer is still being written. */
.ss-caret {
  display: inline-block;
  width: 2px; height: 0.9em;
  margin-left: 2px;
  vertical-align: -0.12em;
  background: var(--ss-brand-deep);
  border-radius: 1px;
  animation: ss-caret 1s steps(2) infinite;
}
@keyframes ss-caret { 0%,49% { opacity: 1; } 50%,100% { opacity: 0; } }

.ss-time {
  font-size: 0.6rem;
  color: var(--ss-faint);
  margin: 0.2rem 0.25rem 0;
  opacity: 0;
  transition: opacity 0.22s;
}
.ss-row:hover .ss-time, .ss-row[data-last="true"] .ss-time { opacity: 1; }

.ss-bubble-typing { display: flex; align-items: center; gap: 4px; padding: 0.65rem 0.85rem; }
.ss-dot {
  width: 5px; height: 5px;
  border-radius: 50%;
  background: var(--ss-brand);
  animation: ss-bounce 1.3s ease-in-out infinite;
}
.ss-dot:nth-child(2) { animation-delay: 0.16s; }
.ss-dot:nth-child(3) { animation-delay: 0.32s; }
@keyframes ss-bounce {
  0%, 60%, 100% { transform: translateY(0); opacity: 0.32; }
  30% { transform: translateY(-3.5px); opacity: 1; }
}

.ss-retry {
  display: inline-flex; align-items: center; gap: 0.3rem;
  margin-bottom: 0.6rem;
  padding: 0.3rem 0.66rem;
  border: 1px solid var(--ss-hair);
  border-radius: 99px;
  background: #fff;
  color: var(--ss-brand-deep);
  font-size: 0.73rem; font-weight: 600;
  cursor: pointer;
  transition: background 0.18s;
}
.ss-retry:hover { background: var(--ss-paper-tint); }

/* ── Starter chips ──────────────────────────────────────────────────────── */
.ss-chips { display: flex; flex-wrap: wrap; gap: 0.34rem; margin-top: 0.45rem; }
.ss-chip {
  padding: 0.36rem 0.68rem;
  border: 1px solid rgba(194,86,10,0.22);
  border-radius: 99px;
  background: #fff;
  color: var(--ss-brand-deep);
  font-size: 0.755rem;
  font-weight: 500;
  cursor: pointer;
  transition: border-color 0.18s, transform 0.18s var(--ss-ease), box-shadow 0.18s;
  animation: ss-chip-in 0.35s var(--ss-ease) both;
}
@keyframes ss-chip-in { from { opacity: 0; transform: translateY(6px); } to { opacity: 1; transform: none; } }
.ss-chip:hover {
  border-color: var(--ss-brand);
  transform: translateY(-1px);
  box-shadow: 0 5px 12px -6px rgba(224,102,0,0.45);
}

/* ── Jump-to-latest ─────────────────────────────────────────────────────── */
.ss-jump {
  position: absolute;
  bottom: 4.2rem;
  left: 50%;
  transform: translateX(-50%);
  width: 27px; height: 27px;
  display: grid; place-items: center;
  border: 1px solid var(--ss-hair);
  border-radius: 50%;
  background: #fff;
  color: var(--ss-brand-deep);
  cursor: pointer;
  box-shadow: 0 5px 14px -6px rgba(44,29,14,0.4);
  animation: ss-pop 0.2s var(--ss-ease) both;
  z-index: 2;
}
.ss-jump:hover { background: var(--ss-paper-tint); }

/* ── Composer ───────────────────────────────────────────────────────────── */
.ss-composer {
  display: flex;
  align-items: flex-end;
  gap: 0.42rem;
  padding: 0.5rem 0.55rem;
  background: #fff;
  border-top: 1px solid var(--ss-hair);
  flex-shrink: 0;
}
.ss-input {
  flex: 1;
  resize: none;
  border: 1px solid var(--ss-hair);
  border-radius: 11px;
  padding: 0.5rem 0.7rem;
  font-size: 0.835rem;
  line-height: 1.5;
  font-family: inherit;
  color: var(--ss-ink);
  background: var(--ss-paper);
  outline: none;
  max-height: 104px;
  transition: border-color 0.18s, box-shadow 0.18s, background 0.18s;
}
.ss-input::placeholder { color: var(--ss-faint); }
.ss-input:focus { border-color: var(--ss-brand); background: #fff; box-shadow: 0 0 0 3px rgba(255,149,0,0.13); }
.ss-input:disabled { opacity: 0.6; }

.ss-send {
  width: 34px; height: 34px;
  display: grid; place-items: center;
  border: none;
  border-radius: 10px;
  background: var(--ss-paper-tint);
  color: var(--ss-faint);
  cursor: not-allowed;
  flex-shrink: 0;
  transition: background 0.22s, color 0.22s, transform 0.18s var(--ss-ease), box-shadow 0.22s;
}
.ss-send[data-active="true"] {
  background: var(--ss-grad);
  color: #fff;
  cursor: pointer;
  box-shadow: 0 4px 11px -4px rgba(224,102,0,0.6);
}
.ss-send[data-active="true"]:hover { transform: translateY(-1px); }
.ss-send[data-active="true"]:active { transform: scale(0.95); }

/* ── Teaser ─────────────────────────────────────────────────────────────── */
.ss-teaser {
  position: relative;
  max-width: 250px;
  padding: 0.62rem 0.8rem 0.68rem;
  background: #fff;
  border: 1px solid rgba(44,29,14,0.1);
  border-radius: 14px 14px 14px 4px;
  box-shadow: 0 12px 28px -14px rgba(44,29,14,0.42);
  animation: ss-msg 0.45s var(--ss-ease) both;
  cursor: pointer;
}
.ss-right .ss-teaser { border-radius: 14px 14px 4px 14px; }
.ss-teaser p { margin: 0; font-size: 0.775rem; line-height: 1.5; color: var(--ss-ink-2); }
.ss-teaser strong {
  display: block;
  font-family: var(--ss-display);
  font-weight: 400;
  font-size: 0.92rem;
  color: var(--ss-brand-deep);
  margin-bottom: 0.08rem;
}
.ss-teaser-x {
  position: absolute;
  top: 4px; right: 4px;
  width: 18px; height: 18px;
  display: grid; place-items: center;
  border: none; border-radius: 50%;
  background: transparent;
  color: var(--ss-faint);
  cursor: pointer;
  transition: background 0.18s, color 0.18s;
}
.ss-teaser-x svg { width: 12px; height: 12px; }
.ss-teaser-x:hover { background: var(--ss-paper-tint); color: var(--ss-ink); }

/* ── Launcher ───────────────────────────────────────────────────────────── */
.ss-launcher {
  position: relative;
  width: 54px; height: 54px;
  border: none;
  border-radius: 50%;
  padding: 0;
  background: var(--ss-espresso);
  color: var(--ss-brand-soft);
  cursor: pointer;
  display: grid;
  place-items: center;
  box-shadow: 0 4px 12px -3px rgba(44,29,14,0.4), 0 14px 32px -12px rgba(44,29,14,0.5);
  transition: transform 0.28s var(--ss-ease), box-shadow 0.28s;
}
.ss-launcher:hover { transform: translateY(-2px); box-shadow: 0 8px 20px -5px rgba(44,29,14,0.45), 0 20px 42px -14px rgba(44,29,14,0.55); }
.ss-launcher:active { transform: scale(0.96); }
.ss-launcher:focus-visible { outline: 2px solid var(--ss-brand); outline-offset: 3px; }

.ss-launcher-face {
  position: relative;
  z-index: 1;
  width: 34px; height: 34px;
  display: grid;
  place-items: center;
  border-radius: 50%;
  overflow: hidden;
}
.ss-launcher-face img { width: 100%; height: 100%; object-fit: contain; }

/* An expanding halo, not a shadow-flash — reads as presence, not an alarm. */
.ss-launcher-ring {
  position: absolute;
  inset: 0;
  border-radius: 50%;
  border: 1.5px solid var(--ss-brand);
  animation: ss-halo 3s var(--ss-ease) infinite;
}
.ss-root[data-open="true"] .ss-launcher-ring { display: none; }
@keyframes ss-halo {
  0%   { transform: scale(1); opacity: 0.5; }
  70%  { transform: scale(1.5); opacity: 0; }
  100% { transform: scale(1.5); opacity: 0; }
}

/* ── Mobile: a full-height sheet, the way a native chat behaves ─────────── */
@media (max-width: 560px) {
  .ss-root { bottom: 1rem; }
  .ss-root.ss-left { left: 1rem; }
  .ss-root.ss-right { right: 1rem; }
  .ss-panel {
    position: fixed;
    inset: 0;
    width: 100vw;
    height: 100dvh;
    max-height: none;
    border-radius: 0;
    border: none;
    transform-origin: bottom center;
    animation: ss-sheet 0.32s var(--ss-ease) both;
  }
  @keyframes ss-sheet {
    from { opacity: 0; transform: translateY(22px); }
    to   { opacity: 1; transform: none; }
  }
  .ss-head { height: auto; padding-top: max(0.55rem, env(safe-area-inset-top)); padding-bottom: 0.55rem; }
  .ss-composer { padding-bottom: max(0.5rem, env(safe-area-inset-bottom)); }
  .ss-row { max-width: 90%; }
  .ss-lang-grid { grid-template-columns: repeat(4, 1fr); }
  .ss-teaser { max-width: min(250px, calc(100vw - 2rem)); }
  /* The header's × is the close affordance on mobile. */
  .ss-root[data-open="true"] .ss-launcher { display: none; }
}

/* ── Reduced motion ─────────────────────────────────────────────────────── */
@media (prefers-reduced-motion: reduce) {
  .ss-root *, .ss-root *::before, .ss-root *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
  }
  .ss-launcher-ring { display: none; }
  .ss-launcher:hover, .ss-chip:hover, .ss-lang-tile:hover, .ss-send[data-active="true"]:hover { transform: none; }
  .ss-spin { animation-duration: 0.9s !important; animation-iteration-count: infinite !important; }
}
`;
