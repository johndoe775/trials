
import React, { useState } from "react";
import ChatBubble from "./ChatBubble";
import "./index.css";

function App() {
  const [messages, setMessages] = useState([
    { sender: "assistant", text: "Hello! Paste a YouTube URL and I’ll translate its transcript for you." }
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  async function sendMessage() {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMsg]);
    setLoading(true);

    try {
      const response = await fetch("http://127.0.0.1:8000/translate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: input, target_lang: "en" })
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      const botMsg = {
        sender: "assistant",
        text: data.translated_text || "No transcript found."
      };

      setMessages((prev) => [...prev, botMsg]);

    } catch (err) {
      const errMsg = { sender: "assistant", text: "❌ Error: " + err.message };
      setMessages((prev) => [...prev, errMsg]);
    }

    setLoading(false);
    setInput("");
  }

  return (
    <div className="chat-container">
      <div className="chat-window">

        {messages.map((msg, i) => (
          <ChatBubble key={i} sender={msg.sender} text={msg.text} />
        ))}

        {loading && <ChatBubble sender="assistant" text="Translating... ⏳" />}
      </div>

      <div className="input-bar">
        <input
          placeholder="Paste YouTube URL here…"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}

export default App;
