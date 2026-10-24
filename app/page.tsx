import type { Metadata } from "next";
export const metadata: Metadata = { alternates: { canonical: "/", languages: { "pt-BR": "/", en: "/en", es: "/es" } } };
import { Portfolio } from "./portfolio";
export default function Home() { return <Portfolio locale="pt" />; }
