import { site } from "@/lib/site";

type Props = {
  /** Sobre fundo escuro (rodapé). */
  claro?: boolean;
  className?: string;
};

/**
 * Logo textual, como pede o briefing. O registro vem da marca atual da clínica:
 * VISÃO em caixa alta, peso leve e tracking largo; o descritivo pequeno embaixo.
 */
export function Logo({ claro = false, className = "" }: Props) {
  return (
    <span className={`inline-flex flex-col leading-none ${className}`}>
      <span
        className={`text-[1.375rem] font-light tracking-[0.3em] ${claro ? "text-branco" : "text-petroleo"}`}
        aria-hidden="true"
      >
        VISÃO
      </span>
      <span
        className={`mt-1 text-[0.6875rem] font-medium uppercase tracking-[0.14em] ${claro ? "text-azul-claro" : "text-suave"}`}
        aria-hidden="true"
      >
        Assistência Oftalmológica
      </span>
      <span className="sr-only">{site.nome}</span>
    </span>
  );
}
