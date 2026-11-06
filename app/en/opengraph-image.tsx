import { renderSharingImage, sharingImageSize } from "../sharing-image";

export const alt = "Morgana Petterle da Cunha — CS Operations, data, automation and development";
export const size = sharingImageSize;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return renderSharingImage("en");
}
