import { existsSync, readFileSync } from "node:fs";
import path from "node:path";
import { site } from "@/lib/site";
import { Botao } from "./Botao";
import { CarrosselConvenios, type Convenio } from "./CarrosselConvenios";
import { Revelar } from "./Revelar";

const extensoes = ["svg", "png", "webp", "jpg"];

/** Largura ÷ altura lida do próprio arquivo, para dar a todas as logos o mesmo peso visual. */
function proporcaoDe(arquivo: string, ext: string): number | undefined {
  const b = readFileSync(arquivo);
  let l = 0;
  let a = 0;
  if (ext === "svg") {
    const vb = /viewBox="\s*[\d.-]+[\s,]+[\d.-]+[\s,]+([\d.]+)[\s,]+([\d.]+)/.exec(b.toString("utf8"));
    if (vb) [l, a] = [Number(vb[1]), Number(vb[2])];
  } else if (ext === "png") {
    [l, a] = [b.readUInt32BE(16), b.readUInt32BE(20)];
  } else if (ext === "webp") {
    const tipo = b.toString("ascii", 12, 16);
    if (tipo === "VP8X") [l, a] = [b.readUIntLE(24, 3) + 1, b.readUIntLE(27, 3) + 1];
    else if (tipo === "VP8L") {
      const bits = b.readUInt32LE(21);
      [l, a] = [(bits & 0x3fff) + 1, ((bits >> 14) & 0x3fff) + 1];
    } else if (tipo === "VP8 ") [l, a] = [b.readUInt16LE(26) & 0x3fff, b.readUInt16LE(28) & 0x3fff];
  }
  return l > 0 && a > 0 ? l / a : undefined;
}

// Procura a logo em public/convenios/ na hora do build; sem arquivo, fica o nome.
function logoDe(id: string): Pick<Convenio, "logo" | "proporcao"> {
  for (const ext of extensoes) {
    const arquivo = path.join(process.cwd(), "public", "convenios", `${id}.${ext}`);
    if (existsSync(arquivo)) return { logo: `/convenios/${id}.${ext}`, proporcao: proporcaoDe(arquivo, ext) };
  }
  return {};
}

export function Convenios() {
  const itens: Convenio[] = site.convenios.map((c) => ({ nome: c.nome, ...logoDe(c.id) }));
  return (
    <div className="mt-20 border-t border-linha pt-16 sm:mt-24 sm:pt-20">
      <Revelar className="mx-auto max-w-[40rem] text-center">
        <h3 id="titulo-convenios" className="display-2">
          Convênios
        </h3>
        <p className="mt-4 text-[1.0625rem] leading-relaxed text-suave">
          Confira os planos atendidos e confirme a cobertura do seu na recepção.
        </p>
      </Revelar>

      <Revelar ordem={1} className="mt-12">
        <CarrosselConvenios itens={itens} />
      </Revelar>

      <div className="mt-12 flex justify-center">
        <Botao href="#agendar" variante="secundario">
          Agendar consulta
        </Botao>
      </div>
    </div>
  );
}
