import type { Metadata } from "next";
import { Portfolio } from "../portfolio";
export const metadata: Metadata = {
  title: "Morgana Petterle da Cunha | CS Operations, Automatización y Desarrollo",
  description: "Portafolio de Morgana Petterle da Cunha: CS Operations, datos, automatización y desarrollo Full Stack. Disponible para trasladarse a España y trabajar en remoto.",
  alternates: { canonical: "/es", languages: { "pt-BR": "/", en: "/en", es: "/es" } },
  openGraph: { title: "Morgana Petterle da Cunha | Visión del cliente. Ejecución técnica.", description: "Proyectos, datos y automatización. CV en español disponible.", locale: "es_ES", url: "/es" },
};
export default function SpanishPortfolio() { return <Portfolio locale="es" />; }
