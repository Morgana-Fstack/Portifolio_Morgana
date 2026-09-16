import type { Metadata } from "next";
import { ShipTrackDemo } from "../../shiptrack/shiptrack";

export const metadata: Metadata = {
  title: "ShipTrack API | Morgana Petterle da Cunha",
  description: "A visual demonstration of a shipment tracking REST API with persistent records, status updates and automated tests.",
};

export default function ShipTrackEnglishPage(){return <ShipTrackDemo locale="en"/>}
