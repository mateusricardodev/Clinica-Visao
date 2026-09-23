import { existsSync } from "node:fs";
import path from "node:path";
import { site } from "@/lib/site";
import { Botao } from "./Botao";
import { CarrosselConvenios, type Convenio } from "./CarrosselConvenios";
import { Revelar } from "./Revelar";

const extensoes = ["svg", "png", "webp"];

// Procura a logo em public/convenios/ na hora do build; sem arquivo, fica o nome.
function logoDe(id: string) {
  for (const ext of extensoes) {
    if (existsSync(path.join(process.cwd(), "public", "convenios", `${id}.${ext}`))) {
      return `/convenios/${id}.${ext}`;
    }
  }
  return undefined;
}

export function Convenios() {
  const itens: Convenio[] = site.convenios.map((c) => ({ nome: c.nome, logo: logoDe(c.id) }));
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
