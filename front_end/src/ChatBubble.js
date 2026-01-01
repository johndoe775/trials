
import React from "react";
import "./index.css";

export default function ChatBubble({ sender, text }) {
  return (
    <div className={`bubble ${sender}`}>
      <div className="bubble-text">{text}</div>
    </div>
  );
}
