import type { Metadata } from "next";
import { Portfolio } from "../portfolio";
const sharingTitle = "Morgana Petterle da Cunha | Visión del cliente. Ejecución técnica.";
const sharingDescription = "Proyectos, datos y automatización. CV en español disponible.";

export const metadata: Metadata = {
  title: "Morgana Petterle da Cunha | CS Operations, Automatización y Desarrollo",
  description: "Portafolio de Morgana Petterle da Cunha: CS Operations, datos, automatización y desarrollo Full Stack. Disponible para trasladarse a España y trabajar en remoto.",
  alternates: { canonical: "/es", languages: { "pt-BR": "/", en: "/en", es: "/es" } },
  openGraph: { title: sharingTitle, description: sharingDescription, locale: "es_ES", url: "/es", type: "website" },
  twitter: { card: "summary_large_image", title: sharingTitle, description: sharingDescription, images: ["/es/opengraph-image"] },
};
export default function SpanishPortfolio() { return <Portfolio locale="es" />; }
