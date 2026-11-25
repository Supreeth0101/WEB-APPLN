import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Web App",
  description: "Next.js + PostgreSQL registration and login",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
