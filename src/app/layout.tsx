import type { Metadata } from "next";
import "./globals.css";
import { ChatbotWidget } from "@/components/chatbot/ChatbotWidget";
import { ThemeProvider } from "@/components/ThemeProvider";
import { ThemeToggle } from "@/components/ThemeToggle";

export const metadata: Metadata = {
  title: "O-1 Visa Case Builder",
  description: "Build your O-1 visa case strategy",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased min-h-screen">
        <ThemeProvider>
          <ThemeToggle />
          {children}
          <ChatbotWidget />
        </ThemeProvider>
      </body>
    </html>
  );
}
