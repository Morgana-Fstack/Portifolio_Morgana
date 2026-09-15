import type { Metadata } from "next";
import { Portfolio } from "../portfolio";
export const metadata: Metadata = { title:"Morgana Petterle da Cunha | CS Operations, Automation & Development", description:"Portfolio of Morgana Petterle da Cunha, connecting Customer Success, automation, data and full stack development." };
export default function EnglishPortfolio() { return <Portfolio locale="en" />; }
