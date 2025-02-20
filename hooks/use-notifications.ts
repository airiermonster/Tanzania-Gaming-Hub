import { useState, useEffect } from "react";

export function useNotifications() {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const ws = new WebSocket("wss://your-websocket-server");

    ws.onmessage = (event) => {
      const notification = JSON.parse(event.data);
      setNotifications((prev) => [notification, ...prev]);
    };

    return () => {
      ws.close();
    };
  }, []);

  return notifications;
}