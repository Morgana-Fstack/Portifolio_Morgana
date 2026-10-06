import type { Metadata } from "next";
import "./globals.css";
import "./brand.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://morgana-petterle-portfolio.vercel.app"),
  title: "Morgana Petterle da Cunha | CS, Automação, Dados & Desenvolvimento",
  description: "Portfólio de Morgana Petterle da Cunha: soluções digitais que conectam Customer Success, automação, dados, IA aplicada e desenvolvimento.",
  openGraph: {
    title: "Morgana Petterle da Cunha | Visão de cliente. Execução técnica.",
    description: "Case real, demonstrações interativas e serviços em dados, automação e tecnologia.",
    url: "https://morgana-petterle-portfolio.vercel.app",
    siteName: "Portfólio Morgana Petterle da Cunha",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Morgana Petterle da Cunha | Visão de cliente. Execução técnica.",
    description: "Case real, demonstrações interativas e serviços em dados, automação e tecnologia.",
  },
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
