import type { Metadata } from "next";
import "./globals.css";
import { ChatbotWidget } from "@/components/chatbot/ChatbotWidget";

export const metadata: Metadata = {
  title: "Visa Navigator",
  description: "Build your O-1 visa case strategy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen">
        {children}
        <ChatbotWidget />
      </body>
    </html>
  );
}
