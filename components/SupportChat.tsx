"use client";

import { useEffect, useRef } from "react";
import "chat_n8n/style.css";
import { createChat } from "chat_n8n";
import { useAuth, useCart } from "@/lib/store";
import { getOrCreateDeviceId, getStoredToken } from "@/lib/axios";
import { STORAGE_KEYS } from "@/lib/config";

export default function SupportChat() {
  const { user, token } = useAuth();
  const { syncCart } = useCart();

  const authRef = useRef({ user, token, syncCart });
  useEffect(() => {
    authRef.current = { user, token, syncCart };
  }, [user, token, syncCart]);

  useEffect(() => {
    const apiUrl: string =
      process.env.NEXT_PUBLIC_CHAT_API_URL ||
      "https://n8n-saas-host.onrender.com/v1/chat";
    const botId: string =
      process.env.NEXT_PUBLIC_CHAT_BOT_ID || "baveha_support";

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
      authTokenStorageKey: STORAGE_KEYS.authToken,
      deviceIdStorageKey: STORAGE_KEYS.deviceId,
      metadata: () => {
        const currentToken = authRef.current.token || getStoredToken();
        const currentUser = authRef.current.user;
        const deviceId = getOrCreateDeviceId();
        const rawRole = currentUser?.role?.toLowerCase();
        const role =
          rawRole === "admin"
            ? "admin"
            : rawRole === "customer" || currentToken
              ? "customer"
              : "public";

        return {
          ...(currentToken ? { token: currentToken } : {}),
          role,
          deviceId,
          ...(currentUser?.id ? { userId: currentUser.id } : {}),
          ...(currentUser?.email ? { email: currentUser.email } : {}),
        };
      },
      onMessageReceived: () => {
        // Refresh cart state in case the AI Concierge added/updated/removed bag items
        authRef.current.syncCart?.().catch(() => {});
      },
    });

    return () => {
      chat?.destroy?.();
    };
  }, []);

  return null;
}
