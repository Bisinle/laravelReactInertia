import "../../echo";
import Pusher from "pusher-js";
import React, { useState, useEffect } from "react";
import { useForm, usePage } from "@inertiajs/inertia-react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

const Show = ({ auth, user, messages: initialMessages }) => {
  const [messages, setMessages] = useState(initialMessages);
  const { data, setData, post, processing, reset } = useForm({
    content: "",
  });

  useEffect(() => {
    const channel = window.Echo.private(`chat.${auth.user.id}`);
    channel.listen(".MessageSent", (event) => {
      console.log("Received message:", event.message);
      setMessages((prevMessages) => [...prevMessages, event.message]);
    });

    return () => {
      channel.stopListening("MessageSent");
    };
  }, [auth.user.id]);


  const submit = (e) => {
    e.preventDefault();
    console.log("Submitting form...");
    console.log("Route:", route("messages.store", user.id));

    post(route("messages.store", user.id), {
      preserveState: true,
      preserveScroll: true,
      onSuccess: () => {
        console.log("Message sent successfully");
        reset("content");
      },
      onError: (errors) => {
        console.error("Error sending message:", errors);
      },
    });
  };
  return (
    <AuthenticatedLayout>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <h1 className="text-2xl font-semibold mb-4">Chat with {user.name}</h1>
        <div className="bg-white shadow-sm rounded-lg p-6 mb-6 h-96 overflow-y-auto">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`mb-4 ${
                message.sender_id === auth.user.id ? "text-right" : "text-left"
              }`}
            >
              <p className="bg-gray-200 inline-block rounded px-4 py-2">
                {message.content}
              </p>
            </div>
          ))}
        </div>
        <form onSubmit={submit}>
          <textarea
            value={data.content}
            onChange={(e) => setData("content", e.target.value)}
            className="w-full p-2 border rounded"
            rows="3"
            placeholder="Type your message..."
          ></textarea>
          <button
            type="submit"
            disabled={processing}
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
