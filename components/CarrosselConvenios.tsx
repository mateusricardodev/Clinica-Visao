"use client";

import { useEffect, useRef } from "react";

export type Convenio = {
  nome: string;
  /** Caminho da logo em /public; sem logo, mostra o nome. */
  logo?: string;
  /** Largura ÷ altura da logo. */
  proporcao?: number;
};

// Área comum (px²) de cada logo: largas ficam baixas, quadradas ficam altas, e o peso se equilibra.
const AREA = 9000;
const ALTURA_MAX = 80;

function tamanho(proporcao?: number) {
  if (!proporcao) return undefined;
  const altura = Math.min(ALTURA_MAX, Math.sqrt(AREA / proporcao));
  return { width: `${Math.round(altura * proporcao)}px`, height: "auto" };
}

function Itens({ itens, copia = false }: { itens: Convenio[]; copia?: boolean }) {
  return itens.map((c) => (
    <li
      key={`${copia ? "copia-" : ""}${c.nome}`}
      aria-hidden={copia || undefined}
      className={`flex h-28 w-[180px] shrink-0 items-center justify-center px-5 sm:w-[260px] sm:px-8 ${copia ? "copia" : ""}`}
    >
      {c.logo ? (
        // eslint-disable-next-line @next/next/no-img-element -- logos pequenas e vetoriais, sem otimização
        <img
          src={c.logo}
          alt={copia ? "" : c.nome}
          draggable={false}
          style={tamanho(c.proporcao)}
          className="pointer-events-none max-h-20 max-w-full select-none object-contain"
        />
      ) : (
        <span className="text-center text-[1.25rem] font-semibold leading-tight text-petroleo sm:text-[1.375rem]">
          {c.nome}
        </span>
      )}
    </li>
  ));
}

// Velocidade do loop, em px por segundo.
const VELOCIDADE = 45;

/**
 * Faixa de logos passando em loop, que também se arrasta com o mouse ou o dedo.
 * A lista vai duas vezes (a segunda escondida de leitores de tela) e o
 * deslocamento dá a volta a cada lista inteira, então a emenda não aparece.
 * Ao soltar, a faixa segue no embalo do arrasto e volta aos poucos ao ritmo
 * do loop. Com reduced-motion vira uma grade parada.
 */
export function CarrosselConvenios({ itens }: { itens: Convenio[] }) {
  const faixa = useRef<HTMLUListElement>(null);

  useEffect(() => {
    const el = faixa.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let volta = el.scrollWidth / 2; // largura de uma lista
    let x = 0; // deslocamento atual, sempre em (-volta, 0]
    let v = -VELOCIDADE; // velocidade atual, px/s
    let arrastando = false;
    let ultimoX = 0;
    let ultimoT = 0;
    let quadro = 0;
    let antes = performance.now();

    const ro = new ResizeObserver(() => {
      volta = el.scrollWidth / 2;
    });
    ro.observe(el);

    const aplicar = () => {
      if (volta > 0) x = (((x % volta) - volta) % volta);
      el.style.transform = `translate3d(${x}px, 0, 0)`;
    };

    const passo = (agora: number) => {
      const dt = Math.min(0.05, (agora - antes) / 1000);
      antes = agora;
      if (!arrastando) {
        // O embalo do arrasto se desfaz e a faixa volta ao ritmo do loop.
        v += (-VELOCIDADE - v) * Math.min(1, dt * 2.5);
        x += v * dt;
        aplicar();
      }
      quadro = requestAnimationFrame(passo);
    };
    quadro = requestAnimationFrame(passo);

    const pegar = (e: PointerEvent) => {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      arrastando = true;
      ultimoX = e.clientX;
      ultimoT = e.timeStamp;
      v = 0;
      el.setPointerCapture(e.pointerId);
      el.dataset.arrastando = "";
    };
    const mover = (e: PointerEvent) => {
      if (!arrastando) return;
      const dx = e.clientX - ultimoX;
      const dt = (e.timeStamp - ultimoT) / 1000;
      if (dt > 0) v = v * 0.2 + (dx / dt) * 0.8;
      ultimoX = e.clientX;
      ultimoT = e.timeStamp;
      x += dx;
      aplicar();
    };
    const soltar = (e: PointerEvent) => {
      if (!arrastando) return;
      arrastando = false;
      // Parado antes de soltar: sem embalo.
      if (e.timeStamp - ultimoT > 80) v = 0;
      v = Math.max(-2500, Math.min(2500, v));
      delete el.dataset.arrastando;
    };

    el.addEventListener("pointerdown", pegar);
    el.addEventListener("pointermove", mover);
    el.addEventListener("pointerup", soltar);
    el.addEventListener("pointercancel", soltar);
    return () => {
      cancelAnimationFrame(quadro);
      ro.disconnect();
      el.removeEventListener("pointerdown", pegar);
      el.removeEventListener("pointermove", mover);
      el.removeEventListener("pointerup", soltar);
      el.removeEventListener("pointercancel", soltar);
    };
  }, []);

  return (
    <div className="overflow-hidden">
      <ul
        ref={faixa}
        aria-label="Convênios atendidos"
        className="letreiro-faixa flex w-max cursor-grab touch-pan-y select-none will-change-transform data-[arrastando]:cursor-grabbing motion-reduce:cursor-auto"
      >
        <Itens itens={itens} />
        <Itens itens={itens} copia />
      </ul>
    </div>
  );
}
