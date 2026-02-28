import { useState } from "react";
import { apiClient } from "../api/client";

function Chat() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState("");

  const sendMessage = async () => {

    if(!message) return;
    setError("");
    const newMessages = [...messages, { role:"user", text:message }];
    setMessages(newMessages);

    try {
      const data = await apiClient.sendChat(message);
      setMessages([
        ...newMessages,
        { role:"ai", text:data.response }
      ]);
    } catch (err) {
      setError(err.message || "Unable to send message.");
      setMessages(newMessages);
    }

    setMessage("");
  };

  const onKeyDown = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-3xl font-bold">Virtual Gym Buddy</h2>
        <p className="mt-1 text-sm text-slate-400">Ask workouts, nutrition, and recovery questions.</p>
      </div>

      <div className="panel h-[470px] overflow-y-auto p-5">
        {messages.length === 0 && (
          <p className="text-sm text-slate-400">Start a conversation with your assistant.</p>
        )}

        {messages.map((msg, i) => (
          <div
            key={i}
            className={msg.role === "user" ? "mb-3 text-right" : "mb-3 text-left"}
          >
            <span
              className={`inline-block max-w-[85%] rounded-xl px-3 py-2 text-sm ${
                msg.role === "user"
                  ? "bg-blue-600 text-white"
                  : "bg-slate-800 text-slate-100"
              }`}
            >
              {msg.text}
            </span>
          </div>
        ))}
      </div>

      <div className="panel p-3">
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            className="input-dark"
            placeholder="Type your question..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={onKeyDown}
          />

          <button className="btn-primary sm:w-32" onClick={sendMessage}>
            Send
          </button>
        </div>
      </div>

      {error && <p className="text-red-400 mt-3">{error}</p>}
    </div>
  );
}

export default Chat;