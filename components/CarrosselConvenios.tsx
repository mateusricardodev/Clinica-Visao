"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";

export type Convenio = {
  nome: string;
  /** Caminho da logo em /public; sem logo, mostra o nome. */
  logo?: string;
};

const seta =
  "inline-flex size-11 shrink-0 items-center justify-center rounded-full text-petroleo transition-[background-color,opacity] duration-300 hover:bg-azul-claro-2 disabled:pointer-events-none disabled:opacity-25";

/** Faixa de logos com setas: 2 por vez no celular, 3 no tablet, 4 no desktop. */
export function CarrosselConvenios({ itens }: { itens: Convenio[] }) {
  const trilho = useRef<HTMLUListElement>(null);
  const [inicio, setInicio] = useState(true);
  const [fim, setFim] = useState(false);

  useEffect(() => {
    const el = trilho.current;
    if (!el) return;
    const medir = () => {
      setInicio(el.scrollLeft < 4);
      setFim(el.scrollLeft + el.clientWidth >= el.scrollWidth - 4);
    };
    medir();
    el.addEventListener("scroll", medir, { passive: true });
    const ro = new ResizeObserver(medir);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", medir);
      ro.disconnect();
    };
  }, []);

  const passar = useCallback((sentido: 1 | -1) => {
    const el = trilho.current;
    if (!el) return;
    const reduzir = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    el.scrollBy({ left: sentido * el.clientWidth, behavior: reduzir ? "auto" : "smooth" });
  }, []);

  return (
    <div className="flex items-center gap-2 sm:gap-4">
      <button type="button" onClick={() => passar(-1)} disabled={inicio} aria-label="Convênios anteriores" className={seta}>
        <CaretLeft size={28} weight="light" />
      </button>

      <ul
        ref={trilho}
        tabIndex={0}
        aria-label="Convênios atendidos"
        className="flex min-w-0 flex-1 snap-x snap-mandatory overflow-x-auto [scrollbar-width:none] focus-visible:outline-none [&::-webkit-scrollbar]:hidden"
      >
        {itens.map((c) => (
          <li
            key={c.nome}
            className="flex h-28 w-1/2 shrink-0 snap-start items-center justify-center px-4 sm:w-1/3 sm:px-6 lg:w-1/4"
          >
            {c.logo ? (
              // eslint-disable-next-line @next/next/no-img-element -- logos pequenas e vetoriais, sem otimização
              <img src={c.logo} alt={c.nome} loading="lazy" className="max-h-20 w-auto max-w-full object-contain" />
            ) : (
              <span className="text-center text-[1.25rem] font-semibold leading-tight text-petroleo sm:text-[1.375rem]">
                {c.nome}
              </span>
            )}
          </li>
        ))}
      </ul>

      <button type="button" onClick={() => passar(1)} disabled={fim} aria-label="Próximos convênios" className={seta}>
        <CaretRight size={28} weight="light" />
      </button>
    </div>
  );
}
