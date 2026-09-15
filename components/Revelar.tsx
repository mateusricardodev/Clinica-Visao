"use client";

import { useEffect, useRef, type ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  /** Ordem no escalonamento (multiplica o atraso). */
  ordem?: number;
  direcao?: "cima" | "esquerda" | "direita";
  as?: "div" | "li" | "figure" | "article";
};

/**
 * Revela o conteúdo quando entra na tela.
 * Nasce visível no HTML; só é escondido depois de hidratar e só se o
 * navegador puder animar. Sem JS ou com reduced-motion, nada muda.
 */
export function Revelar({ children, className = "", ordem = 0, direcao = "cima", as = "div" }: Props) {
  const ref = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (!("IntersectionObserver" in window)) return;

    const alturaVisivel = window.innerHeight || 0;
    const rect = el.getBoundingClientRect();
    // O que já está na tela ao carregar não pisca: só anima o que vem depois.
    if (rect.top < alturaVisivel * 0.92) return;

    el.dataset.estado = "oculto";
    const obs = new IntersectionObserver(
      (entradas) => {
        for (const entrada of entradas) {
          if (entrada.isIntersecting) {
            el.dataset.estado = "visivel";
            obs.disconnect();
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const Tag = as;
  return (
    <Tag
      ref={ref as never}
      className={`revelar ${className}`}
      data-direcao={direcao}
      style={{ "--ordem": ordem } as React.CSSProperties}
    >
      {children}
    </Tag>
  );
}
