import React, { useState, useEffect } from "react";
import SockJS from "sockjs-client";
import { Client } from "@stomp/stompjs";
import { useNavigate } from "react-router-dom";
import "./ChatMessage.css";

let stompClient = null;

const ChatMessage = () => {
  const navigate = useNavigate();

  const [connected, setConnected] = useState(false);
  const [username, setUsername] = useState("");

  // ✅ sessionStorage for messages
  const [messages, setMessages] = useState(() => {
    const saved = sessionStorage.getItem("chatMessages");
    return saved ? JSON.parse(saved) : [];
  });

  const [input, setInput] = useState("");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  // ✅ Save messages to sessionStorage
  useEffect(() => {
    sessionStorage.setItem("chatMessages", JSON.stringify(messages));
  }, [messages]);

  // ✅ Get username from sessionStorage or prompt
  useEffect(() => {
    let name = sessionStorage.getItem("chatUsername");

    if (!name) {
      name = prompt("Enter your chat username:");
      if (!name || !name.trim()) {
        alert("Username is required");
        return;
      }
      sessionStorage.setItem("chatUsername", name);
    }

    setUsername(name);
    connect(name);
    setLoading(false);

    return () => {
      if (stompClient) {
        stompClient.deactivate();
        stompClient = null;
      }
    };
  }, []);

  // ✅ WebSocket connection
  const connect = (autoName) => {
    if (!autoName?.trim()) return;
    if (stompClient && stompClient.active) return;

    const socket = new SockJS("http://localhost:9595/lostfound/ws");

    stompClient = new Client({
      webSocketFactory: () => socket,
      reconnectDelay: 5000,

      onConnect: () => {
        setConnected(true);

        stompClient.publish({
          destination: "/app/register",
          body: JSON.stringify({ sender: autoName }),
        });

        stompClient.subscribe("/topic/messages", (payload) => {
          const msg = JSON.parse(payload.body);
          setMessages((prev) => [...prev, msg]);
        });

        stompClient.subscribe("/topic/users", (payload) => {
          setUsers(JSON.parse(payload.body));
        });
      },

      onStompError: (frame) => {
        console.error("Broker error:", frame.headers["message"]);
      },
    });

    stompClient.activate();
  };

  // ✅ Send message
  const sendMessage = () => {
    if (!stompClient || !stompClient.connected) return;
    if (!input.trim()) return;

    stompClient.publish({
      destination: "/app/sendMessage",
      body: JSON.stringify({ sender: username, content: input }),
    });

    setInput("");
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <h3>Loading chat...</h3>
      </div>
    );
  }

  return (
    <div className="chat-container">
      {!connected ? (
        <div className="login-screen">
          <h2>Connecting to Chat...</h2>
        </div>
      ) : (
        <div className="chat-room">
          <div className="sidebar">
            <h3>👥 Online Users</h3>
            <ul>
              {users.map((u, i) => (
                <li key={i}>🟢 {u}</li>
              ))}
              {users.length === 0 && <li>No users online</li>}
            </ul>
          </div>

          <div className="chat-content">
            <div className="chat-header">
              <h3>💬 General Chat</h3>
              <span>{username}</span>
              <button
                className="btn btn-warning"
                onClick={() => {
                  // ✅ Clear ONLY on return
                  sessionStorage.removeItem("chatMessages");
                  sessionStorage.removeItem("chatUsername");
                  navigate("/StudentMenu");
                }}
              >
                Return
              </button>
            </div>

            <div className="messages">
              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`message ${
                    msg.sender === username ? "self" : "other"
                  }`}
                >
                  <b>{msg.sender}:</b> {msg.content}
                </div>
              ))}
            </div>

            <div className="input-area">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                placeholder="Type a message..."
              />
              <button onClick={sendMessage}>Send</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatMessage;
