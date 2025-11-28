// Nutrivus.IA - Layout
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import "@fontsource/inter";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Nutrivus.IA - Seu Assistente Nutricional Inteligente",
  description: "Análise nutricional com IA, jejum intermitente, hidratação e muito mais",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <head>
        <Script src="/lasy-bridge.js" strategy="beforeInteractive" />
      </head>
      <body
        className={`${inter.variable} font-inter antialiased bg-[#00BFFF] text-white`}
      >
        {children}
      </body>
    </html>
  );
}
