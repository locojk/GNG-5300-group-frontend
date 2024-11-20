"use client";

import React, { useState } from "react";
import DefaultLayout from "@/components/Layouts/DefaultLayout";

const AssistantPage: React.FC = () => {
  const [messages, setMessages] = useState<{ user: string; text: string }[]>([]);
  const [input, setInput] = useState("");

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { user: "You", text: input };
    setMessages((prev) => [...prev, userMessage]);

    setInput("");

    // Mock AI response (replace with actual backend API call)
    const response = { reply: `I heard you say: "${input}"` };
    const botMessage = { user: "Assistant", text: response.reply };
    setMessages((prev) => [...prev, botMessage]);
  };

  return (
    <DefaultLayout>
      <div className="flex flex-col items-center justify-center p-4 bg-gray-50 min-h-screen">
        <h1 className="text-2xl font-bold text-blue-600 mb-4">
          Assistant 🤖
        </h1>
        <div
          className="w-full max-w-3xl h-96 overflow-y-auto bg-white border border-gray-300 rounded-lg shadow-md p-4 mb-4"
        >
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-4 ${
                msg.user === "You" ? "text-right" : "text-left"
              }`}
            >
              <strong
                className={`block ${
                  msg.user === "You" ? "text-blue-500" : "text-green-500"
                }`}
              >
                {msg.user}:
              </strong>
              <span className="block text-gray-700">{msg.text}</span>
            </div>
          ))}
        </div>
        <div className="w-full max-w-3xl flex items-center">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a message..."
            className="flex-grow p-2 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={handleSendMessage}
            className="p-2 bg-blue-600 text-white font-bold rounded-r-lg hover:bg-blue-700 transition-all"
          >
            Send
          </button>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default AssistantPage;



