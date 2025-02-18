import React, { useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

const SERVER_URL = "http://localhost:3000"; // Update with your backend URL

interface Message {
  sender: string;
  receiver: string;
  content: string;
}

const Chat: React.FC = () => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [message, setMessage] = useState("");
  const [receiver, setReceiver] = useState(""); // Receiver ID (dynamic in real apps)

  useEffect(() => {
    const newSocket = io(SERVER_URL, {
      auth: { token: "YOUR_JWT_TOKEN_HERE" }, // Replace with actual token
    });

    newSocket.on("connect", () => {
      console.log("Connected to WebSocket server");
    });

    newSocket.on("message", (msg: Message) => {
      setMessages((prev) => [...prev, msg]); // Add new message to chat
    });

    newSocket.on("disconnect", () => {
      console.log("Disconnected from server");
    });

    setSocket(newSocket);

    return () => {
      newSocket.disconnect(); // Clean up on component unmount
    };
  }, []);

  const sendMessage = () => {
    if (socket && message.trim() && receiver) {
      const msg: Message = { sender: "yourUserId", receiver, content: message };
      socket.emit("message", msg);
      setMessages((prev) => [...prev, msg]); // Update chat history
      setMessage(""); // Clear input field
    }
  };

  return (
    <div className="chat-container">
      <h2>Chat</h2>
      <input
        type="text"
        placeholder="Receiver ID"
        value={receiver}
        onChange={(e) => setReceiver(e.target.value)}
      />
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={`message ${msg.sender === "yourUserId" ? "sent" : "received"}`}>
            <strong>{msg.sender}:</strong> {msg.content}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
};

export default Chat;
