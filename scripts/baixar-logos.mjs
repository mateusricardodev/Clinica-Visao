// Baixa as logos dos convênios para public/convenios/<id>.<ext>.
// Uso: node scripts/baixar-logos.mjs   (Node 18+)
// Os ids batem com site.convenios em lib/site.ts. Os arquivos vêm no tamanho original:
// recorte as margens e reduza (até ~720×240) antes de commitar, como nas logos atuais.
// Atrás do proxy do Claude Code na nuvem, rode com NODE_USE_ENV_PROXY=1.

import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

const logos = {
  unimed: "https://logodownload.org/wp-content/uploads/2014/05/unimed-logo-1.png",
  "notredame-intermedica":
    "https://vectorseek.com/wp-content/uploads/2023/09/Grupo-Notredame-Intermedica-Logo-Vector.svg-.png",
  sulamerica: "https://logodownload.org/wp-content/uploads/2020/12/sulamerica-saude-logo.png",
  mediservice: "https://images.seeklogo.com/logo-png/48/1/mediservice-logo-png_seeklogo-489488.png",
  // Logo oficial da Saúde Petrobras (antiga AMS), direto do site do plano.
  "petrobras-ams": "https://www.saudepetrobras.com.br/data/files/5F/D3/80/3D/FDFEB7108831CAB7004CF9C2/logo_desktop.svg",
  sabesprev: "https://www.sabesprev.com.br/sites/default/files/LOGO_AZUL_0.png",
  "bradesco-saude": "https://logodownload.org/wp-content/uploads/2018/10/bradesco-saude-logo-16.png",
  "postal-saude": "https://images.seeklogo.com/logo-png/35/1/postal-saude-logo-png_seeklogo-359191.png",
};

const porTipo = { "image/png": "png", "image/jpeg": "jpg", "image/webp": "webp", "image/svg+xml": "svg" };

const destino = path.join(process.cwd(), "public", "convenios");
await mkdir(destino, { recursive: true });

let falhas = 0;
for (const [id, url] of Object.entries(logos)) {
  try {
    const resp = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
    if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
    const tipo = (resp.headers.get("content-type") ?? "").split(";")[0].trim();
    const ext = porTipo[tipo];
    if (!ext) throw new Error(`tipo inesperado: ${tipo || "desconhecido"}`);
    await writeFile(path.join(destino, `${id}.${ext}`), Buffer.from(await resp.arrayBuffer()));
    console.log(`ok     ${id}.${ext}`);
  } catch (erro) {
    falhas++;
    console.error(`falhou ${id}: ${erro.message}  (${url})`);
  }
}
process.exitCode = falhas ? 1 : 0;
