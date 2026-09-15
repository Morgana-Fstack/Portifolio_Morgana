import type { Metadata } from "next";
import "./globals.css";
import "./brand.css";

export const metadata: Metadata = {
  title: "Morgana Petterle da Cunha | CS, Automação, Dados & Desenvolvimento",
  description: "Portfólio de Morgana Petterle da Cunha: soluções digitais que conectam Customer Success, automação, dados e desenvolvimento full stack.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="antialiased">{children}</body>
    </html>
  );
}
