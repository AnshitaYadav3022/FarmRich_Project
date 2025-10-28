import React, { useState, useEffect } from "react";
import "./ChatBotWidget.css";

const ChatBotWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [settings, setSettings] = useState(null);

  // ✅ Mock settings instead of API call
  useEffect(() => {
    const mockSettings = {
      theme: "light",
      welcomeMessage: "👋 Hello! I’m your FarmRich Assistant. How can I help you?",
    };
    setSettings(mockSettings);

    // show welcome message
    setMessages([{ sender: "bot", content: mockSettings.welcomeMessage }]);
  }, []);

  const toggleWidget = () => setIsOpen(!isOpen);

  const sendMessage = () => {
    if (!input.trim()) return;

    // add user message
    setMessages((prev) => [...prev, { sender: "user", content: input }]);

    // fake bot reply
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        { sender: "bot", content: `You said: "${input}"` },
      ]);
    }, 600);

    setInput("");
  };

  return (
    <div className="chatbot-widget">
      {isOpen && (
        <div className="chatbot-box">
          <div className="chatbot-header">
            <h4>FarmRich ChatBot</h4>
            <button onClick={toggleWidget}>×</button>
          </div>
          <div className="chatbot-messages">
            {messages.map((msg, i) => (
              <div key={i} className={`msg ${msg.sender}`}>
                <pre>{msg.content}</pre>
              </div>
            ))}
          </div>
          <div className="chatbot-input">
            <input
              type="text"
              value={input}
              placeholder="Type your message..."
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage}>Send</button>
          </div>
        </div>
      )}
      <button className="chatbot-toggle" onClick={toggleWidget}>
        💬
      </button>
    </div>
  );
};

export default ChatBotWidget;
