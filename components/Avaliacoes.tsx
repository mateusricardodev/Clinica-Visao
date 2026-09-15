import { ArrowUpRight, Quotes } from "@phosphor-icons/react/dist/ssr";
import { avaliacoes } from "@/lib/avaliacoes";
import { site } from "@/lib/site";
import { Revelar } from "./Revelar";

export function Avaliacoes() {
  const { nota, total } = site.avaliacoes;
  return (
    <section id="avaliacoes" className="scroll-mt-[72px] bg-papel py-20 sm:py-28" aria-labelledby="titulo-avaliacoes">
      <div className="mx-auto grid max-w-[1280px] gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16">
        <Revelar className="lg:col-span-4">
          <h2 id="titulo-avaliacoes" className="display-2">
            O que os pacientes dizem
          </h2>
          <p className="mt-8 flex items-end gap-2" aria-label={`Nota ${nota} de 5`}>
            <span className="tabular text-[5rem] font-medium leading-none tracking-[-0.04em] text-petroleo sm:text-[6rem]">
              {nota}
            </span>
            <span className="mb-3 text-[1.25rem] font-medium text-suave">/ 5</span>
          </p>
          <p className="mt-3 text-[1.0625rem] text-tinta">
            <span className="tabular font-semibold">{total}</span> avaliações de pacientes
          </p>
          <a
            href={site.mapa.ficha}
            target="_blank"
            rel="noopener"
            className="mt-5 inline-flex items-center gap-1.5 rounded-md text-[0.9375rem] font-semibold text-petroleo underline decoration-azul-claro decoration-2 underline-offset-[6px] transition-colors hover:decoration-agua"
          >
            Ver avaliações públicas
            <ArrowUpRight size={18} weight="bold" aria-hidden="true" />
          </a>
        </Revelar>

        <ul className="grid gap-5 md:grid-cols-3 lg:col-span-8">
          {avaliacoes.map((a, i) => (
            <Revelar
              as="li"
              key={a.id}
              ordem={i}
              className={`flex flex-col rounded-[var(--radius-quadro)] bg-branco p-7 shadow-quadro ${i === 1 ? "md:translate-y-8" : ""}`}
            >
              <Quotes size={26} weight="fill" aria-hidden="true" className="text-azul-claro" />
              <blockquote className="mt-4 flex-1">
                <p className="text-[1.0625rem] leading-relaxed text-tinta">{a.texto}</p>
              </blockquote>
              <p className="mt-6 border-t border-linha pt-4 text-[0.875rem] font-medium text-suave">{a.autor}</p>
            </Revelar>
          ))}
        </ul>
      </div>
    </section>
  );
}
