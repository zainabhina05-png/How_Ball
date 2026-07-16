import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HOW BALL? — 3D Endless Runner",
  description: "Dodge obstacles, collect coins, and beat your high score in HOW BALL?, a fast-paced 3D endless runner built with Next.js and React Three Fiber.",
  openGraph: {
    title: "HOW BALL? — 3D Endless Runner",
    description: "Dodge obstacles, collect coins, and beat your high score in HOW BALL?, a fast-paced 3D endless runner built with Next.js and React Three Fiber.",
    url: "https://how-ball.vercel.app",
    siteName: "HOW BALL?",
    type: "website",
  },
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon.jpg', type: 'image/jpeg' },
    ],
    apple: '/favicon.jpg',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body>{children}</body>
    </html>
  );
}