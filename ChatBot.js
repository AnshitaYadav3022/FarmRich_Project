import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import "./ChatBot.css";

function ChatBot() {
  // 👋 Welcome message
  const [messages, setMessages] = useState([
    {
      role: "bot",
      content:
        "👋 Hi! I'm PlantPal 🌿 — your smart farming assistant. Ask me anything about crops, soil, or farming tips!",
    },
  ]);

  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (messageText) => {
    const trimmedInput = messageText?.trim() || input.trim();
    if (!trimmedInput) return;

    const newMessage = { role: "user", content: trimmedInput };
    setMessages((prev) => [...prev, newMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:5000/api/chat", {
        message: trimmedInput,
        history: messages.map((m) => ({
          role: m.role === "user" ? "user" : "assistant",
          content: m.content,
        })),
      });

      setMessages((prev) => [
        ...prev,
        { role: "bot", content: response.data.reply },
      ]);
    } catch (err) {
      console.error(err);
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          content:
            "⚠️ Sorry, I couldn’t reach the chatbot server right now. Please try again.",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const suggestions = [
    "🌾 Crop disease detection",
    "💧 Best watering schedule",
    "🪴 Fertilizer recommendations",
    "☀️ Weather-based planting tips",
  ];

  return (
    <div className="chatbot-container">
      <h2 className="chatbot-title">🌱 PlantPal Chatbot</h2>

      <div className="chatbot-messages">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`chatbot-message ${
              msg.role === "user" ? "user-message" : "bot-message"
            }`}
          >
            {msg.content}
          </div>
        ))}

        {/* 🌟 Animated Typing Indicator */}
        {loading && (
          <div className="chatbot-typing">
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="dot"></span>
            <span className="typing-text">✨ PlantPal is thinking...</span>
          </div>
        )}

        <div ref={messagesEndRef}></div>
      </div>

      {messages.length <= 2 && (
        <div className="chatbot-suggestions">
          {suggestions.map((s, idx) => (
            <button
              key={idx}
              className="suggestion-btn"
              onClick={() => handleSend(s)}
            >
              {s}
            </button>
          ))}
        </div>
      )}

      <div className="chatbot-input-area">
        <input
          type="text"
          value={input}
          placeholder="Ask me anything..."
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
          className="chatbot-input"
        />
        <button onClick={() => handleSend()} className="chatbot-button">
          Send
        </button>
      </div>
    </div>
  );
}

export default ChatBot;
