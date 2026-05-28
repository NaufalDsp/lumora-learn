"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

type NotificationTone = "success" | "error" | "info";

type Notification = {
  id: number;
  message: string;
  tone: NotificationTone;
};

type NotificationContextValue = {
  notify: (message: string, tone?: NotificationTone) => void;
};

const NotificationContext = createContext<NotificationContextValue | null>(null);

export function NotificationProvider({ children }: { children: ReactNode }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const value = useMemo<NotificationContextValue>(
    () => ({
      notify(message, tone = "info") {
        const id = Date.now();
        setNotifications((current) => [...current, { id, message, tone }]);
        window.setTimeout(() => {
          setNotifications((current) => current.filter((item) => item.id !== id));
        }, 3600);
      }
    }),
    []
  );

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <div className="toast-stack" aria-live="polite">
        {notifications.map((notification) => (
          <div className={`toast toast--${notification.tone}`} key={notification.id}>
            {notification.message}
          </div>
        ))}
      </div>
    </NotificationContext.Provider>
  );
}

export function useNotifications() {
  const context = useContext(NotificationContext);

  if (!context) {
    throw new Error("useNotifications must be used inside NotificationProvider");
  }

  return context;
}
