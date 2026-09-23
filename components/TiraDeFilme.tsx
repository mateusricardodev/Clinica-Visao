"use client";

import { useCallback, useEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { fotos, type FotoId } from "@/lib/fotos";
import { Foto } from "./Foto";

export type Quadro = {
  foto: FotoId;
  legenda: string;
};

type Props = {
  quadros: Quadro[];
  /** Código de borda carimbado na tira: o lugar e a especialidade, em versaletes. */
  codigoDeBorda: ReactNode;
  /** Conteúdo que fica acima da tira, à esquerda dos controles (o texto do hero). */
  children: ReactNode;
};

const recuo = "max(var(--gutter), calc((100% - 1280px) / 2 + 2rem))";

/**
 * A faixa de fotos: azul-petróleo de ponta a ponta, com as fotos reais da clínica.
 * Rola na horizontal com encaixe por quadro; nunca sequestra a rolagem da página.
 */
export function TiraDeFilme({ quadros, codigoDeBorda, children }: Props) {
  const scroller = useRef<HTMLDivElement>(null);
  const [ativo, setAtivo] = useState(0);
  const [rolavel, setRolavel] = useState(true);
  const razoes = useRef<number[]>(quadros.map(() => 0));

  useEffect(() => {
    const raiz = scroller.current;
    if (!raiz) return;
    const figuras = Array.from(raiz.querySelectorAll<HTMLElement>("[data-quadro]"));
    const obs = new IntersectionObserver(
      (entradas) => {
        for (const e of entradas) {
          const i = Number((e.target as HTMLElement).dataset.quadro);
          razoes.current[i] = e.isIntersecting ? e.intersectionRatio : 0;
        }
        let melhor = 0;
        razoes.current.forEach((r, i) => {
          if (r > razoes.current[melhor]) melhor = i;
        });
        setAtivo(melhor);
      },
      // Só a metade esquerda da tira conta: o quadro encaixado na esquerda é o ativo.
      { root: raiz, rootMargin: "0px -50% 0px 0px", threshold: [0, 0.25, 0.5, 0.75, 1] },
    );
    figuras.forEach((f) => obs.observe(f));
    // No desktop os três quadros cabem inteiros; aí os controles não têm o que fazer.
    const medir = () => setRolavel(raiz.scrollWidth - raiz.clientWidth > 8);
    medir();
    const ro = new ResizeObserver(medir);
    ro.observe(raiz);
    return () => {
      obs.disconnect();
      ro.disconnect();
    };
  }, [quadros.length]);

  const irPara = useCallback(
    (indice: number) => {
      const raiz = scroller.current;
      if (!raiz) return;
      const alvo = Math.max(0, Math.min(quadros.length - 1, indice));
      const fig = raiz.querySelector<HTMLElement>(`[data-quadro="${alvo}"]`);
      if (!fig) return;
      const reduzir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const margem = parseFloat(getComputedStyle(raiz).scrollPaddingLeft) || 0;
      raiz.scrollTo({ left: fig.offsetLeft - margem, behavior: reduzir ? "auto" : "smooth" });
    },
    [quadros.length],
  );

  const botao =
    "inline-flex size-11 items-center justify-center rounded-[var(--radius-controle)] border border-linha bg-branco text-petroleo transition-[background-color,transform] duration-300 hover:bg-azul-claro-2 active:scale-95 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:bg-branco";

  const controles = (
    <div className="flex items-center gap-4" role="group" aria-label="Navegar pelos quadros">
      <p className="tabular text-[0.9375rem] font-medium text-suave" aria-live="polite">
        <span className="text-petroleo">{String(ativo + 1).padStart(2, "0")}</span>
        <span className="mx-1.5 text-azul-claro" aria-hidden="true">
          /
        </span>
        {String(quadros.length).padStart(2, "0")}
      </p>
      <div className="flex gap-2">
        <button type="button" onClick={() => irPara(ativo - 1)} disabled={ativo === 0} aria-label="Quadro anterior" className={botao}>
          <CaretLeft size={20} weight="bold" />
        </button>
        <button
          type="button"
          onClick={() => irPara(ativo + 1)}
          disabled={ativo === quadros.length - 1}
          aria-label="Próximo quadro"
          className={botao}
        >
          <CaretRight size={20} weight="bold" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="[--gutter:1.25rem] sm:[--gutter:2rem]">
      <div className="mx-auto flex max-w-[1280px] items-end justify-between gap-8 px-5 sm:px-8">
        <div className="min-w-0 flex-1">{children}</div>
        <div className={`abertura shrink-0 pb-1 ${rolavel ? "hidden md:block" : "hidden"}`} style={{ "--ordem": 3 } as CSSProperties}>
          {controles}
        </div>
      </div>

      <div className="relative mt-10 bg-petroleo sm:mt-12">
        {/* O lugar, que o título não diz. */}
        <p
          className="codigo pointer-events-none absolute left-0 right-0 top-8 z-10 truncate text-azul-claro/70"
          style={{ paddingInline: recuo }}
        >
          {codigoDeBorda}
        </p>

        <div
          ref={scroller}
          tabIndex={0}
          role="region"
          aria-label="Fotos da clínica, quadro a quadro"
          className="flex snap-x snap-mandatory gap-6 overflow-x-auto overflow-y-hidden pb-10 pt-16 [scrollbar-width:none] focus-visible:outline-none [&::-webkit-scrollbar]:hidden"
          style={{ paddingInline: recuo, scrollPaddingInline: recuo }}
        >
          {quadros.map((q, i) => {
            const foto = fotos[q.foto];
            const emFoco = i === ativo;
            return (
              <figure
                key={q.foto}
                data-quadro={i}
                data-ativo={emFoco || undefined}
                className="group relative shrink-0 snap-start w-[clamp(272px,82vw,584px)] lg:w-[calc((100%-3rem)/3)]"
              >
                <div
                  className="revelacao fotograma relative aspect-[4/3] shadow-[0_24px_60px_-20px_rgb(0_0_0/0.6)]"
                  style={{ "--ordem": i } as CSSProperties}
                >
                  <Foto
                    foto={foto}
                    sizes="(min-width: 1024px) 390px, (min-width: 768px) 584px, 82vw"
                    aspecto="4 / 3"
                    prioridade={i === 0}
                    className="transition-transform duration-[1200ms] [transition-timing-function:var(--ease-saida)] group-hover:scale-[1.025] motion-reduce:transition-none"
                  />
                </div>
                <figcaption className="codigo relative mt-4 flex items-baseline gap-3">
                  <span className={`transition-colors duration-500 ${emFoco ? "text-branco" : "text-azul-claro/70"}`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className={`transition-colors duration-500 ${emFoco ? "text-branco" : "text-azul-claro/80"}`}>
                    {q.legenda}
                  </span>
                </figcaption>
              </figure>
            );
          })}
        </div>
      </div>

      <div className={`mx-auto max-w-[1280px] justify-end px-5 pt-4 sm:px-8 ${rolavel ? "flex md:hidden" : "hidden"}`}>{controles}</div>
    </div>
  );
}
