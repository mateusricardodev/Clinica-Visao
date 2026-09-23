import { Plus } from "@phosphor-icons/react/dist/ssr";
import { faq } from "@/lib/faq";
import { Revelar } from "./Revelar";

export function Faq() {
  return (
    <section id="duvidas" className="scroll-mt-[72px] py-20 sm:py-28" aria-labelledby="titulo-duvidas">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
        <Revelar>
          <h2 id="titulo-duvidas" className="display-2 max-w-[28ch]">
            Perguntas frequentes
          </h2>
        </Revelar>

        <div className="mt-10 max-w-[52rem] divide-y divide-linha border-y border-linha">
          {faq.map((item, i) => (
            <Revelar key={item.pergunta} ordem={i}>
              <details className="group">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-[1.0625rem] font-semibold text-tinta [&::-webkit-details-marker]:hidden">
                  {item.pergunta}
                  <Plus
                    size={20}
                    weight="bold"
                    aria-hidden="true"
                    className="shrink-0 text-petroleo transition-transform duration-300 group-open:rotate-45 motion-reduce:transition-none"
                  />
                </summary>
                <p className="pb-5 pr-9 text-[0.9375rem] leading-relaxed text-suave">{item.resposta}</p>
              </details>
            </Revelar>
          ))}
        </div>
      </div>
    </section>
  );
}
