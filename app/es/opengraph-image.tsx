import { renderSharingImage, sharingImageSize } from "../sharing-image";

export const alt = "Morgana Petterle da Cunha — CS Operations, datos, automatización y desarrollo";
export const size = sharingImageSize;
export const contentType = "image/png";

export default function OpenGraphImage() {
  return renderSharingImage("es");
}
