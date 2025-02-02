import React, { useState } from "react";
import "./ChatPage.css";

const ChatPage = () => {
  const [messages, setMessages] = useState([
    { text: "Hello! How can I help you?", type: "received" },
    { text: "Hey! I wanted to ask about React.", type: "sent" }
  ]);

  const [newMessage, setNewMessage] = useState("");

  const sendMessage = () => {
    if (newMessage.trim() !== "") {
      setMessages([...messages, { text: newMessage, type: "sent" }]);
      setNewMessage("");

      // Авто-ответ для демонстрации
      setTimeout(() => {
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: "I see! React is great for building UI.", type: "received" }
        ]);
      }, 1000);
    }
  };

  return (
    <div className="chat-container">
      {/* Ліва панель */}
      <div className="sidebar">
        <div className="tabs">
          <button className="active">Chat History</button>
          <button>Requests</button>
        </div>
        <div className="chat-list">
          <div className="chat-item">John Doe</div>
          <div className="chat-item">Jane Smith</div>
          <div className="chat-item">Michael Johnson</div>
        </div>
      </div>

      {/* Основний чат */}
      <div className="chat-box">
        <div className="messages-container">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.type}`}>
              {msg.text}
            </div>
          ))}
        </div>
        <div className="chat-input-container">
          <input
            type="text"
            placeholder="Type a message..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
          />
          <button onClick={sendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
