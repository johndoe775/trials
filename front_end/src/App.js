import React, { useState } from "react";
import ChatBubble from "./ChatBubble";
import "./index.css";

function App() {
  const [messages, setMessages] = useState([
    { sender: "assistant", text: "Hello! Paste a YouTube URL and choose a target language to translate." }
  ]);

  const [input, setInput] = useState("");
  const [targetLang, setTargetLang] = useState("en");
  const [loading, setLoading] = useState(false);

  // New state for summary
  const [latestSummary, setLatestSummary] = useState("");
  const [showSummary, setShowSummary] = useState(false);

  async function sendMessage() {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: `URL: ${input}\nLanguage: ${targetLang}` };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);
    // Reset summary when new request starts
    setLatestSummary("");

    try {
      const response = await fetch("http://127.0.0.1:8000/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          url: input,
          target_lang: targetLang
        })
      });

      const data = await response.json();

      const botMsg = {
        sender: "assistant",
        text: data.translated_text || "No transcript found."
      };

      setMessages((prev) => [...prev, botMsg]);

      if (data.summary) {
        setLatestSummary(data.summary);
      }

    } catch (err) {
      const errMsg = { sender: "assistant", text: "❌ Error: " + err.message };
      setMessages((prev) => [...prev, errMsg]);
    }

    setLoading(false);
    setInput("");
  }

  return (
    <div className="app-container">
      {/* Left Pane: Chat Interface */}
      <div className={`chat-pane ${showSummary ? "split" : ""}`}>
        <div className="chat-window">
          {messages.map((msg, i) => (
            <ChatBubble key={i} sender={msg.sender} text={msg.text} />
          ))}
          {loading && <ChatBubble sender="assistant" text="Translating... ⏳" />}
        </div>

        <div className="input-bar">
          <select
            value={targetLang}
            onChange={(e) => setTargetLang(e.target.value)}
            className="lang-select"
          >
            <option value="en">English</option>
            <option value="hi">Hindi</option>
            <option value="te">Telugu</option>
            <option value="ta">Tamil</option>
            <option value="ml">Malayalam</option>
            <option value="kn">Kannada</option>
            <option value="mr">Marathi</option>
            <option value="gu">Gujarati</option>
            <option value="es">Spanish</option>
            <option value="fr">French</option>
          </select>

          <input
            placeholder="Paste YouTube URL here…"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />

          <button onClick={sendMessage}>Send</button>

          {/* Summary Toggle Button */}
          {latestSummary && (
            <button
              className="summary-btn"
              onClick={() => setShowSummary(!showSummary)}
              style={{ marginLeft: "10px", background: "#ff9800" }}
            >
              {showSummary ? "Hide Summary" : "Summary"}
            </button>
          )}
        </div>
      </div>

      {/* Right Pane: Summary View */}
      {showSummary && (
        <div className="summary-pane">
          <div className="chat-window" style={{ padding: '20px', height: '100%' }}>
            <h3 style={{ color: 'white', marginTop: 0, marginBottom: '20px', borderBottom: '1px solid #334155', paddingBottom: '10px' }}>
              Video Summary
            </h3>
            <ChatBubble sender="assistant" text={latestSummary} />
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
