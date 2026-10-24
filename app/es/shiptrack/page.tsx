import type { Metadata } from "next";
import { ShipTrackDemo } from "../../shiptrack/shiptrack";
export const metadata: Metadata = {
  title: "ShipTrack API | Morgana Petterle da Cunha",
  description: "Demostración visual de una API REST de seguimiento de envíos, con registros persistentes, actualizaciones de estado y pruebas automatizadas.",
  alternates: { canonical: "/es/shiptrack", languages: { "pt-BR": "/shiptrack", en: "/en/shiptrack", es: "/es/shiptrack" } },
};
export default function ShipTrackSpanishPage(){return <ShipTrackDemo locale="es"/>}
