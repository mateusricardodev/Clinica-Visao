import os, io, base64, json, sys
from PIL import Image, ImageOps
W = sys.argv[1]; P = os.path.join(W, "Clinica-Visao"); RAW = os.path.join(W, "_raw")
OUT = os.path.join(P, "public", "fotos")
os.makedirs(OUT, exist_ok=True)

# id, source, alt, aspect (w,h) or None, widths, focal (x,y in 0..1) for the crop
FOTOS = [
  ("recepcao-1", "all/g01.jpg", "Recepção da clínica Visão: balcão à esquerda, poltronas cinza, mesa de centro branca, planta e piso de madeira", (4,3), [480,800,1200,1600], (0.5,0.55)),
  ("sala-exames-1", "all/g16.jpg", "Sala de exames com lâmpada de fenda, mesa branca, cadeiras e a porta aberta para o consultório", (4,3), [480,800,1200,1600], (0.5,0.5)),
  ("consultorio-1", "all/g07.jpg", "Consultório do Dr. Ruy: mesa branca com computador, estante com livros e diplomas emoldurados na parede", (4,3), [480,800,1200,1600], (0.5,0.5)),
  ("recepcao-2", "all/g05.jpg", "Sala de espera com luminárias em anel na parede, poltrona de veludo azul-petróleo e piso de madeira", (4,3), [480,800,1200,1600], (0.5,0.5)),
  ("poltronas", "all/g09.jpg", "Poltronas de couro e sofá azul-petróleo sob uma luminária em anel", (3,4), [400,640,900], (0.5,0.55)),
  ("corredor", "all/g14.jpg", "Corredor claro da clínica levando às salas de exame", (3,4), [400,640,900], (0.5,0.5)),
  ("lampada-fenda", "all/g02.jpg", "Lâmpada de fenda e equipamentos de exame sobre a mesa branca da sala de exames", (4,3), [480,800,1200,1600], (0.5,0.5)),
  ("fachada", "all/g15.jpg", "Fachada branca da clínica Visão com o letreiro em relevo e vagas de estacionamento na frente", (4,3), [480,800,1200,1600], (0.5,0.5)),
  ("sala-exames-2", "all/g03.jpg", "Sala de exames vista da porta: equipamentos, cadeiras brancas e piso de madeira", (3,4), [400,640,900], (0.5,0.5)),
  ("dr-ruy", "user/user-1.png", "Dr. Ruy dos Santos Filho de jaleco branco, sorrindo, na sala de exames da clínica", (1,1), [360,530], (0.5,0.5)),
]

def crop_to(im, aspect, focal):
  if not aspect: return im
  aw, ah = aspect; w, h = im.size
  target = aw/ah
  if w/h > target:
    nw = int(h*target); x = int((w-nw)*focal[0]); return im.crop((x,0,x+nw,h))
  else:
    nh = int(w/target); y = int((h-nh)*focal[1]); return im.crop((0,y,w,y+nh))

entries = {}
total = 0
for fid, src, alt, aspect, widths, focal in FOTOS:
  im = Image.open(os.path.join(RAW, src)); im = ImageOps.exif_transpose(im).convert("RGB")
  im = crop_to(im, aspect, focal)
  w, h = im.size
  sizes = []
  for tw in widths:
    if tw > w: tw = w
    r = im.resize((tw, round(h*tw/w)), Image.LANCZOS)
    name = f"{fid}-{tw}.webp"; path = os.path.join(OUT, name)
    r.save(path, "WEBP", quality=80, method=6)
    total += os.path.getsize(path)
    sizes.append((tw, f"/fotos/{name}"))
  # LQIP: 16px wide, heavy blur via downscale
  tiny = im.resize((16, max(1, round(16*h/w))), Image.LANCZOS)
  buf = io.BytesIO(); tiny.save(buf, "WEBP", quality=30, method=6)
  lqip = "data:image/webp;base64," + base64.b64encode(buf.getvalue()).decode()
  big = sizes[-1]
  entries[fid] = dict(id=fid, alt=alt, largura=big[0], altura=round(h*big[0]/w), src=big[1],
                      srcSet=", ".join(f"{s[1]} {s[0]}w" for s in sizes), lqip=lqip)
  print(fid, (w,h), "->", [s[0] for s in sizes])

lines = ["// Gerado por scripts/fotos.py a partir das fotos originais da clínica (ficha do Google Maps",
         "// e foto do médico enviada pelo cliente). Cada foto é servida em WebP em várias larguras",
         "// e carrega um placeholder borrado embutido (LQIP). Não editar à mão: rode o script.",
         "", "export type Foto = {", "  id: string;", "  alt: string;", "  largura: number;", "  altura: number;",
         "  src: string;", "  srcSet: string;", "  lqip: string;", "};", "", "export const fotos = {"]
for fid, e in entries.items():
  lines.append(f'  "{fid}": {{')
  lines.append(f'    id: "{fid}",')
  lines.append(f'    alt: {json.dumps(e["alt"], ensure_ascii=False)},')
  lines.append(f'    largura: {e["largura"]},')
  lines.append(f'    altura: {e["altura"]},')
  lines.append(f'    src: "{e["src"]}",')
  lines.append(f'    srcSet: "{e["srcSet"]}",')
  lines.append(f'    lqip: "{e["lqip"]}",')
  lines.append("  },")
lines += ["} as const satisfies Record<string, Foto>;", "", "export type FotoId = keyof typeof fotos;", ""]
open(os.path.join(P, "lib", "fotos.ts"), "w", encoding="utf-8").write("\n".join(lines))
print("total webp KB:", total//1024)

# Open Graph 1200x630 from the exam room
im = ImageOps.exif_transpose(Image.open(os.path.join(RAW, "all/g16.jpg"))).convert("RGB")
og = crop_to(im, (1200,630), (0.5,0.5)).resize((1200,630), Image.LANCZOS)
og.save(os.path.join(P, "public", "og.jpg"), "JPEG", quality=82, optimize=True)
print("og ok")
