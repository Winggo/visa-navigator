import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "O-1 Visa Case Builder",
  description: "Collect and organize your O-1 visa evidence",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased min-h-screen bg-gray-50">
        {children}
      </body>
    </html>
  );
}
