"use client";

import { useEffect } from "react";
import "chat_n8n/style.css";
import { createChat } from "chat_n8n";

export default function SupportChat() {
  useEffect(() => {
    const apiUrl = process.env.NEXT_PUBLIC_CHAT_API_URL;
    const botId = process.env.NEXT_PUBLIC_CHAT_BOT_ID;

    const chat = createChat({
      apiUrl,
      botId,
      title: "Baveha Concierge",
      subtitle: "Bespoke & Order Support 24/7",
      primaryColor: "#0f172a",
      placeholder: "Ask about sizing, tailoring, orders...",
      initialMessages: [
        "Welcome to Baveha Atelier. 👋",
        "How may I assist you with your wardrobe or order today?",
      ],
      footerText: "Powered by Asad Anwar",
    });

    return () => {
      chat?.destroy?.();
    };
  }, []);

  return null;
}
