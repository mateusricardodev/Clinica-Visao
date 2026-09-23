import { ArrowUpRight, Star, User } from "@phosphor-icons/react/dist/ssr";
import { avaliacoes } from "@/lib/avaliacoes";
import { site } from "@/lib/site";
import { Botao } from "./Botao";
import { Revelar } from "./Revelar";

// Cor do selo de cada depoimento, em rodízio, como os avatares de e-mail.
const selos = ["bg-petroleo", "bg-agua-tinta", "bg-[#3d6f8e]"];

/** "Mislene Goulart" → "MG": primeira letra do primeiro e do último nome. */
function iniciais(nome: string) {
  const partes = nome.trim().split(/\s+/);
  const primeira = partes[0]?.[0] ?? "";
  const ultima = partes.length > 1 ? partes[partes.length - 1][0] : "";
  return (primeira + ultima).toUpperCase();
}

function Estrelas({ tamanho = 18 }: { tamanho?: number }) {
  return (
    <span className="flex gap-0.5 text-agua" aria-hidden="true">
      {Array.from({ length: 5 }, (_, i) => (
        <Star key={i} size={tamanho} weight="fill" />
      ))}
    </span>
  );
}

export function Avaliacoes() {
  const { nota, total } = site.avaliacoes;
  return (
    <section id="avaliacoes" className="scroll-mt-[72px] bg-papel py-20 sm:py-28" aria-labelledby="titulo-avaliacoes">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
        <Revelar className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <h2 id="titulo-avaliacoes" className="display-2">
            O que os pacientes dizem
          </h2>
          <div className="md:text-right">
            <p className="flex items-center gap-4 md:justify-end" aria-label={`Nota ${nota} de 5`}>
              <span className="tabular text-[2.75rem] font-medium leading-none tracking-[-0.03em] text-petroleo">
                {nota}
                <span className="ml-1.5 text-[1.5rem] text-suave">/ 5</span>
              </span>
              <Estrelas tamanho={22} />
            </p>
            <p className="mt-2 text-[0.9375rem] text-suave">
              <span className="tabular font-semibold text-tinta">{total}</span> avaliações no Google ·{" "}
              <a
                href={site.mapa.ficha}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-1 rounded-md font-semibold text-petroleo underline decoration-azul-claro decoration-2 underline-offset-[5px] transition-colors hover:decoration-agua"
              >
                ver todas
                <ArrowUpRight size={16} weight="bold" aria-hidden="true" />
              </a>
            </p>
          </div>
        </Revelar>

        <ul className="mt-12 grid gap-5 md:grid-cols-3">
          {avaliacoes.map((a, i) => (
            <Revelar
              as="li"
              key={a.id}
              ordem={i}
              className="flex flex-col rounded-[var(--radius-quadro)] bg-branco p-7 shadow-quadro"
            >
              <figure className="flex h-full flex-col">
                <figcaption className="flex items-center gap-3.5">
                  <span
                    aria-hidden="true"
                    className={`flex size-12 shrink-0 items-center justify-center rounded-full text-[1.0625rem] font-semibold tracking-wide text-branco ${selos[i % selos.length]}`}
                  >
                    {a.nome ? iniciais(a.nome) : <User size={22} weight="bold" />}
                  </span>
                  <span className="min-w-0">
                    <span className="block truncate font-semibold text-tinta">{a.nome ?? "Paciente da clínica"}</span>
                    <span className="mt-1 flex items-center gap-2">
                      <Estrelas />
                      <span className="sr-only">5 de 5 estrelas</span>
                    </span>
                  </span>
                </figcaption>
                <blockquote className="mt-5 flex-1">
                  <p className="text-[1.0625rem] leading-relaxed text-tinta">“{a.texto}”</p>
                </blockquote>
              </figure>
            </Revelar>
          ))}
        </ul>

        <Revelar className="mt-12 flex justify-center">
          <Botao
            href={site.mapa.ficha}
            variante="secundario"
            tamanho="compacto"
            icone={<Star size={18} weight="fill" aria-hidden="true" />}
            target="_blank"
            rel="noopener"
          >
            Avalie sua consulta
          </Botao>
        </Revelar>
      </div>
    </section>
  );
}
