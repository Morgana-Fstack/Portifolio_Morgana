import { ImageResponse } from "next/og";

export const sharingImageSize = { width: 1200, height: 630 };

const previewCopy = {
  pt: ["Visão de cliente.", "Execução técnica.", "Dados, automação, IA aplicada e soluções digitais.", "Case real · Demo interativa · Serviços"],
  en: ["Customer insight.", "Technical execution.", "Data, automation, applied AI and digital solutions.", "Case study · Interactive demo · Services"],
  es: ["Visión del cliente.", "Ejecución técnica.", "Datos, automatización, IA aplicada y soluciones digitales.", "Caso real · Demo interactiva · Servicios"],
} as const;

export function renderSharingImage(locale: keyof typeof previewCopy) {
  const [headline, subtitle, description, footer] = previewCopy[locale];
  return new ImageResponse(
    <div style={{width:"100%",height:"100%",display:"flex",flexDirection:"column",justifyContent:"space-between",padding:"64px 70px",background:"#0a0809",color:"#f8f4f3",fontFamily:"Arial"}}>
      <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
        <div style={{display:"flex",alignItems:"center",gap:"18px",fontSize:"24px",fontWeight:800}}>
          <span style={{width:"54px",height:"54px",borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",background:"#e73c4e",color:"#170608"}}>M</span>
          <span>Morgana Petterle da Cunha</span>
        </div>
        <span style={{fontSize:"17px",letterSpacing:"2px",color:"#ffb4ac"}}>CS OPS · DATA · AUTOMATION</span>
      </div>
      <div style={{display:"flex",flexDirection:"column",gap:"18px"}}>
        <div style={{fontSize:"76px",lineHeight:.95,fontWeight:800,letterSpacing:"-4px"}}>{headline}</div>
        <div style={{fontSize:"76px",lineHeight:.95,fontWeight:800,letterSpacing:"-4px",color:"#e73c4e"}}>{subtitle}</div>
        <div style={{marginTop:"18px",fontSize:"25px",color:"#c9c0c1"}}>{description}</div>
      </div>
      <div style={{display:"flex",justifyContent:"space-between",fontSize:"17px",color:"#a79c9e"}}>
        <span>{footer}</span>
        <span>morgana-petterle-portfolio.vercel.app</span>
      </div>
    </div>,
    sharingImageSize
  );
}
