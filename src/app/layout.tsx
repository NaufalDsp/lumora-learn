import type { Metadata } from "next";
import { NotificationProvider } from "@/src/components/notifications/NotificationProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Lumora Learn",
  description: "A premium futuristic e-learning platform prototype."
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <body>
        <NotificationProvider>{children}</NotificationProvider>
      </body>
    </html>
  );
}
