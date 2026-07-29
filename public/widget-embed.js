/*
  widget-embed.js — Sabka Saathi AI Chatbot (universal embed)

  USAGE on ANY website (plain HTML, WordPress, Shopify, client sites, etc.):

  <script
    src="https://YOUR-DOMAIN.com/widget-embed.js"
    data-api-url="https://YOUR-DOMAIN.com/api/chat"
    data-brand="Client Business Name"
    data-color="#2563eb"
  ></script>

  Put this just before </body>. No React/build step needed — pure vanilla JS.
  Change data-api-url / data-brand / data-color per client to reuse this
  same script for every project you deploy.
*/
(function () {
  const scriptTag = document.currentScript;
  const API_URL = scriptTag.getAttribute("data-api-url") || "/api/chat";
  const BRAND = scriptTag.getAttribute("data-brand") || "AI Assistant";
  const COLOR = scriptTag.getAttribute("data-color") || "#2563eb";
  const REQUEST_TIMEOUT_MS = 20000;

  let messages = [
    { role: "assistant", content: `Hi! I'm the ${BRAND} assistant. How can I help you today?` },
  ];
  let open = false;
  let loading = false;
  let lastHadError = false;

  // --- Build DOM ---
  const container = document.createElement("div");
  container.style.cssText = "position:fixed;bottom:20px;right:20px;z-index:999999;font-family:sans-serif;";

  const panel = document.createElement("div");
  panel.style.cssText = `width:340px;height:460px;max-width:calc(100vw - 40px);background:#fff;border-radius:16px;
    box-shadow:0 12px 32px rgba(0,0,0,0.2);display:none;flex-direction:column;
    overflow:hidden;margin-bottom:12px;`;

  const header = document.createElement("div");
  header.style.cssText = `background:#111827;color:#fff;padding:14px 16px;font-weight:600;
    display:flex;justify-content:space-between;align-items:center;`;
  const headerTitle = document.createElement("span");
  headerTitle.textContent = BRAND + " Assistant";
  const closeBtn = document.createElement("button");
  closeBtn.textContent = "×";
  closeBtn.setAttribute("aria-label", "Close chat");
  closeBtn.style.cssText = "background:none;border:none;color:#fff;font-size:18px;cursor:pointer;";
  header.appendChild(headerTitle);
  header.appendChild(closeBtn);

  const body = document.createElement("div");
  body.style.cssText = "flex:1;overflow-y:auto;padding:12px;background:#f9fafb;";

  const inputRow = document.createElement("div");
  inputRow.style.cssText = "display:flex;border-top:1px solid #e5e7eb;";

  const input = document.createElement("input");
  input.placeholder = "Type your question…";
  input.style.cssText = "flex:1;border:none;padding:12px;font-size:14px;outline:none;min-width:0;";

  const sendBtn = document.createElement("button");
  sendBtn.textContent = "Send";
  sendBtn.style.cssText = `background:${COLOR};color:#fff;border:none;padding:0 18px;cursor:pointer;`;

  const toggleBtn = document.createElement("button");
  toggleBtn.textContent = "💬";
  toggleBtn.setAttribute("aria-label", "Open chat");
  toggleBtn.style.cssText = `width:56px;height:56px;border-radius:50%;background:${COLOR};
    color:#fff;border:none;font-size:24px;cursor:pointer;box-shadow:0 8px 20px rgba(37,99,235,0.4);`;

  inputRow.appendChild(input);
  inputRow.appendChild(sendBtn);
  panel.appendChild(header);
  panel.appendChild(body);
  panel.appendChild(inputRow);
  container.appendChild(panel);
  container.appendChild(toggleBtn);

  function mount() {
    if (document.body) {
      document.body.appendChild(container);
    } else {
      document.addEventListener("DOMContentLoaded", () => document.body.appendChild(container));
    }
  }

  function renderMessages() {
    body.innerHTML = "";
    messages.forEach((m) => {
      const row = document.createElement("div");
      row.style.cssText = `display:flex;justify-content:${m.role === "user" ? "flex-end" : "flex-start"};margin-bottom:8px;`;
      const bubble = document.createElement("div");
      const isError = !!m.error;
      bubble.style.cssText = `max-width:80%;padding:8px 12px;border-radius:12px;font-size:14px;line-height:1.4;
        background:${isError ? "#fee2e2" : m.role === "user" ? COLOR : "#e5e7eb"};
        color:${isError ? "#991b1b" : m.role === "user" ? "#fff" : "#111827"};white-space:pre-wrap;`;
      bubble.textContent = m.content;
      row.appendChild(bubble);
      body.appendChild(row);
    });

    if (loading) {
      const l = document.createElement("div");
      l.style.cssText = "font-size:13px;color:#6b7280;padding:4px 0;";
      l.textContent = "Typing…";
      body.appendChild(l);
    }

    if (!loading && lastHadError) {
      const retryBtn = document.createElement("button");
      retryBtn.textContent = "Retry";
      retryBtn.style.cssText = `font-size:13px;color:${COLOR};background:none;border:none;
        cursor:pointer;padding:0;text-decoration:underline;`;
      retryBtn.addEventListener("click", retryLast);
      body.appendChild(retryBtn);
    }

    body.scrollTop = body.scrollHeight;
  }

  function withTimeout(promise, ms) {
    return Promise.race([
      promise,
      new Promise((_, reject) => setTimeout(() => reject(new Error("timeout")), ms)),
    ]);
  }

  async function callApi(history) {
    loading = true;
    lastHadError = false;
    renderMessages();

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

      const res = await withTimeout(
        fetch(API_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ messages: history.map(({ role, content }) => ({ role, content })) }),
          signal: controller.signal,
        }),
        REQUEST_TIMEOUT_MS + 2000
      );
      clearTimeout(timeoutId);

      let data = {};
      try {
        data = await res.json();
      } catch (_) {
        // non-JSON response, fall through to error handling below
      }

      if (!res.ok) {
        const friendly =
          res.status === 429
            ? "I'm a bit busy right now — please try again shortly."
            : "Something went wrong. Please try again in a moment.";
        messages.push({ role: "assistant", content: friendly, error: true });
        lastHadError = true;
        return;
      }

      messages.push({ role: "assistant", content: data.reply || "Sorry, I didn't get a response. Try again?" });
    } catch (e) {
      const isAbort = e && (e.name === "AbortError" || e.message === "timeout");
      messages.push({
        role: "assistant",
        content: isAbort
          ? "That took too long to respond. Please try again."
          : "Connection error. Please check your internet and try again.",
        error: true,
      });
      lastHadError = true;
    } finally {
      loading = false;
      renderMessages();
    }
  }

  function sendMessage() {
    const text = input.value.trim();
    if (!text || loading) return;
    messages.push({ role: "user", content: text });
    input.value = "";
    callApi(messages);
  }

  function retryLast() {
    if (loading) return;
    messages = messages.filter((m) => !m.error);
    callApi(messages);
  }

  toggleBtn.addEventListener("click", () => {
    open = !open;
    panel.style.display = open ? "flex" : "none";
    toggleBtn.textContent = open ? "×" : "💬";
    if (open) input.focus();
  });
  closeBtn.addEventListener("click", () => {
    open = false;
    panel.style.display = "none";
    toggleBtn.textContent = "💬";
  });
  sendBtn.addEventListener("click", sendMessage);
  input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") sendMessage();
  });

  mount();
  renderMessages();
})();