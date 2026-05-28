import type { Metadata } from "next";
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
      <body>{children}</body>
    </html>
  );
}
