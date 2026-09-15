import type { ReactNode } from "react";
import { CalendarCheck, Eye, Microscope, UsersThree } from "@phosphor-icons/react/dist/ssr";
import { fotos } from "@/lib/fotos";
import { servicos } from "@/lib/servicos";
import { site } from "@/lib/site";
import { Foto } from "./Foto";
import { Revelar } from "./Revelar";

const icones: Record<string, ReactNode> = {
  consulta: <Eye size={28} weight="regular" aria-hidden="true" />,
  exames: <Microscope size={28} weight="regular" aria-hidden="true" />,
  prevencao: <CalendarCheck size={28} weight="regular" aria-hidden="true" />,
  familia: <UsersThree size={28} weight="regular" aria-hidden="true" />,
};

/*
 * Quatro cards, quatro superfícies e quatro tamanhos:
 * exames (foto, ocupa as duas linhas da esquerda), consulta (placa azul-clara),
 * família (petróleo) e prevenção (branco com fio, deitado, fechando a grade).
 */
const superficie: Record<string, string> = {
  exames: "bg-branco text-tinta ring-1 ring-linha lg:col-span-7 lg:row-span-2",
  consulta: "bg-azul-claro-2 text-tinta lg:col-span-5",
  familia: "bg-petroleo text-branco lg:col-span-5",
  prevencao: "bg-branco text-tinta ring-1 ring-linha lg:col-span-12",
};

const ordem = ["exames", "consulta", "familia", "prevencao"];

export function Servicos() {
  const lista = ordem.map((id) => servicos.find((s) => s.id === id)!);
  return (
    <section id="servicos" className="scroll-mt-[72px] py-20 sm:py-28" aria-labelledby="titulo-servicos">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <Revelar>
          <h2 id="titulo-servicos" className="display-2 max-w-[28ch]">
            Consulta, exames e acompanhamento no mesmo lugar
          </h2>
        </Revelar>

        <ul className="mt-10 grid gap-5 lg:grid-cols-12">
          {lista.map((s, i) => {
            const escuro = s.id === "familia";
            const deitado = s.id === "prevencao";
            const foto = s.foto ? fotos[s.foto] : null;
            return (
              <Revelar
                as="li"
                key={s.id}
                ordem={i}
                className={`group overflow-hidden rounded-[var(--radius-quadro)] transition-[transform,box-shadow] duration-500 [transition-timing-function:var(--ease-saida)] hover:-translate-y-1 hover:shadow-quadro motion-reduce:transition-none ${superficie[s.id]}`}
              >
                {foto ? (
                  <div className="grid h-full sm:grid-cols-2 lg:grid-cols-1 lg:grid-rows-[minmax(0,1fr)_auto]">
                    <figure className="flex flex-col">
                      <div className="relative min-h-[220px] flex-1 overflow-hidden sm:min-h-[260px]">
                        <Foto
                          foto={foto}
                          sizes="(min-width: 1024px) 700px, (min-width: 640px) 50vw, 100vw"
                          preencher
                          className="transition-transform duration-[1200ms] [transition-timing-function:var(--ease-saida)] group-hover:scale-[1.03] motion-reduce:transition-none"
                        />
                      </div>
                      <figcaption className="codigo flex items-baseline gap-3 border-b border-linha px-7 py-3 text-suave sm:border-b-0 sm:border-r lg:border-b lg:border-r-0 sm:px-8">
                        <span className="text-petroleo">06</span>
                        Lâmpada de fenda
                      </figcaption>
                    </figure>
                    <div className="p-7 sm:p-8">
                      <span className="text-petroleo">{icones[s.id]}</span>
                      <h3 className="display-3 mt-5">{s.titulo}</h3>
                      <p className="mt-2 text-[0.9375rem] leading-relaxed text-suave">{s.texto}</p>
                      {s.itens && (
                        <ul className="mt-5 grid grid-cols-1 gap-x-6 gap-y-1 text-[0.9375rem] text-tinta sm:grid-cols-2">
                          {s.itens.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                ) : (
                  <div className={`flex h-full p-7 sm:p-8 ${deitado ? "flex-col gap-5 sm:flex-row sm:items-start sm:gap-8" : "flex-col"}`}>
                    <span className={`shrink-0 ${escuro ? "text-azul-claro" : "text-petroleo"}`}>{icones[s.id]}</span>
                    <div className={deitado ? "" : "mt-5"}>
                      <h3 className={`display-3 ${escuro ? "text-branco" : ""}`}>{s.titulo}</h3>
                      <p className={`mt-2 max-w-[60ch] text-[0.9375rem] leading-relaxed ${escuro ? "text-azul-claro" : "text-suave"}`}>
                        {s.texto}
                      </p>
                    </div>
                  </div>
                )}
              </Revelar>
            );
          })}
        </ul>

        <Revelar className="mt-8 border-t border-linha pt-6">
          <p className="text-[0.9375rem] leading-relaxed text-suave">
            <span className="font-semibold text-petroleo">Convênios atendidos: </span>
            {site.convenios.join(", ")}. Confirme a cobertura do seu plano na recepção.
          </p>
        </Revelar>
      </div>
    </section>
  );
}
