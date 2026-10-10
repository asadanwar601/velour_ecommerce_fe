"use client";

import { useEffect, useRef } from "react";
import "chat_n8n/style.css";
import { createChat } from "chat_n8n";
import { useAuth, useCart } from "@/lib/store";
import { getOrCreateDeviceId, getStoredToken } from "@/lib/axios";
import { STORAGE_KEYS } from "@/lib/config";

function decodeJwtPayload(token: string): Record<string, any> | null {
  try {
    const parts = token.split(".");
    if (parts.length !== 3) return null;
    const base64 = parts[1].replace(/-/g, "+").replace(/_/g, "/");
    const padded = base64 + "=".repeat((4 - (base64.length % 4)) % 4);
    return JSON.parse(atob(padded));
  } catch {
    return null;
  }
}

export default function SupportChat() {
  const { user, token } = useAuth();
  const { syncCart } = useCart();

  const authRef = useRef({ user, token, syncCart });
  useEffect(() => {
    authRef.current = { user, token, syncCart };
  }, [user, token, syncCart]);

  useEffect(() => {
    const apiUrl: string = (
      process.env.NEXT_PUBLIC_CHAT_API_URL ||
      "https://n8n-saas-host.onrender.com/v1/chat"
    ).replace(/\/+$/, "");
    const botId: string =
      process.env.NEXT_PUBLIC_CHAT_BOT_ID || "baveha_support";

    const buildAuthMetadata = () => {
      const currentToken = authRef.current.token || getStoredToken();
      const currentUser = authRef.current.user;
      const deviceId = getOrCreateDeviceId();
      const jwtPayload = currentToken ? decodeJwtPayload(currentToken) : null;

      const rawRole = (
        currentUser?.role ||
        jwtPayload?.role ||
        ""
      )
        .toString()
        .toLowerCase();

      const role =
        rawRole === "admin" || rawRole === "superadmin"
          ? "admin"
          : rawRole === "customer" || rawRole === "user" || Boolean(currentToken)
            ? "customer"
            : "public";

      const fullName = [currentUser?.firstName, currentUser?.lastName]
        .filter(Boolean)
        .join(" ")
        .trim();

      return {
        bot_id: botId,
        role,
        deviceId,
        ...(currentToken ? { token: currentToken } : {}),
        ...(currentUser?.id || jwtPayload?.sub
          ? { userId: currentUser?.id || jwtPayload?.sub }
          : {}),
        ...(currentUser?.email || jwtPayload?.email
          ? { email: currentUser?.email || jwtPayload?.email }
          : {}),
        ...(fullName ? { name: fullName } : {}),
      };
    };

    // Guarantee metadata injection at the fetch layer even if Vercel caches node_modules/chat_n8n
    const originalFetch = window.fetch.bind(window);
    window.fetch = async (input: RequestInfo | URL, init?: RequestInit) => {
      try {
        const url =
          typeof input === "string"
            ? input
            : input instanceof URL
              ? input.toString()
              : input.url;

        if (
          url &&
          url.replace(/\/+$/, "") === apiUrl &&
          init?.method?.toUpperCase() === "POST" &&
          typeof init.body === "string"
        ) {
          const parsed = JSON.parse(init.body);
          parsed.metadata = {
            ...(parsed.metadata || {}),
            ...buildAuthMetadata(),
          };
          init = {
            ...init,
            body: JSON.stringify(parsed),
          };
        }
      } catch {
        // Ignore parse errors and proceed with original fetch
      }

      const response = await originalFetch(input, init);

      try {
        const url =
          typeof input === "string"
            ? input
            : input instanceof URL
              ? input.toString()
              : input.url;
        if (
          url &&
          url.replace(/\/+$/, "") === apiUrl &&
          init?.method?.toUpperCase() === "POST" &&
          response.ok
        ) {
          authRef.current.syncCart?.().catch(() => {});
        }
      } catch {}

      return response;
    };

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
      metadata: buildAuthMetadata,
      onMessageReceived: () => {
        authRef.current.syncCart?.().catch(() => {});
      },
    });

    return () => {
      window.fetch = originalFetch;
      chat?.destroy?.();
    };
  }, []);

  return null;
}
