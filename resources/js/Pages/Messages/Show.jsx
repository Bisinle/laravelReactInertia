import "../../echo";
import React, { useState, useEffect } from "react";
import axios from "axios";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

const Show = ({ auth, user, messages: initialMessages }) => {
  const [messages, setMessages] = useState(initialMessages);
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
 
    const channel = window.Echo.private(`chat.${auth.user.id}`);
    channel.listen(".MessageSent", (event) => {
      console.log("Received message:", event.message);
      addMessageToChat(event.message);
    });

    return () => {
      channel.stopListening(".MessageSent");
    };
  }, [auth.user.id]);

  const addMessageToChat = (newMessage) => {
    setMessages((prevMessages) => {
      if (!prevMessages.some(msg => msg.id === newMessage.id)) {
        return [...prevMessages, newMessage];
      }
      return prevMessages;
    });
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!content.trim()) return;

    setIsSubmitting(true);

    try {
      const response = await axios.post(route("messages.store", user.id), {
        content: content,
      });

      console.log("Message sent successfully");
      
      addMessageToChat(response.data.message);
      
      setContent("");
    } catch (error) {
      console.error("Error sending message:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <AuthenticatedLayout>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold mb-4">Chat</h1>
        <div className="bg-white shadow-sm rounded-lg p-6 mb-6 h-96 overflow-y-auto">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`mb-4 ${
                message.sender_id === auth.user.id ? "text-right" : "text-left"
              }`}
            >
              <p className="bg-gray-200 inline-block rounded px-4 py-2 max-w-xs break-words">
                {message.content}
              </p>
            </div>
          ))}
        </div>
        <form onSubmit={submit}>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border rounded"
            rows="3"
            placeholder="Type your message..."
          ></textarea>
          <button
            type="submit"
            disabled={isSubmitting}
            className="mt-2 bg-blue-500 text-white px-4 py-2 rounded"
          >
            Send
          </button>
        </form>
      </div>
    </AuthenticatedLayout>
  );
};

export default Show;