import type { Metadata } from "next";
import { Portfolio } from "../portfolio";

const title = "Morgana Petterle da Cunha | CS Operations, Automation & Development";
const description = "Portfolio of Morgana Petterle da Cunha, connecting Customer Success, automation, data and full stack development.";

export const metadata: Metadata = {
  title,
  description,
  alternates: { canonical: "/en", languages: { "pt-BR": "/", en: "/en", es: "/es" } },
  openGraph: { title, description, url: "/en", locale: "en_US", type: "website" },
  twitter: { card: "summary_large_image", title, description, images: ["/en/opengraph-image"] },
};

export default function EnglishPortfolio() {
  return <Portfolio locale="en" />;
}
