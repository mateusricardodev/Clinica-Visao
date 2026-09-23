import type { ComponentProps, ReactNode } from "react";

type Variante = "primario" | "secundario" | "claro" | "contorno-claro";
type Tamanho = "normal" | "compacto";

const base =
  "inline-flex items-center justify-center gap-2.5 whitespace-nowrap rounded-[var(--radius-controle)] font-semibold transition-[transform,box-shadow,background-color,border-color,color] duration-300 [transition-timing-function:var(--ease-saida)] active:translate-y-px active:scale-[0.985] motion-reduce:transition-none";

const variantes: Record<Variante, string> = {
  primario:
    "bg-petroleo text-branco shadow-controle hover:bg-agua-tinta hover:-translate-y-0.5 hover:shadow-quadro",
  secundario:
    "bg-branco text-petroleo border border-petroleo/35 hover:border-petroleo hover:bg-petroleo hover:text-branco hover:-translate-y-0.5 hover:shadow-controle",
  claro: "bg-branco text-petroleo hover:bg-agua-claro hover:text-agua-tinta hover:-translate-y-0.5 hover:shadow-controle",
  "contorno-claro":
    "bg-transparent text-branco border border-branco/45 hover:border-branco hover:bg-branco hover:text-petroleo hover:-translate-y-0.5",
};

const tamanhos: Record<Tamanho, string> = {
  normal: "h-13 px-6 text-[1.0625rem]",
  compacto: "h-11 px-4 text-[0.9375rem]",
};

type Comum = {
  variante?: Variante;
  tamanho?: Tamanho;
  icone?: ReactNode;
  className?: string;
  children: ReactNode;
};

type PropsLink = Comum & { href: string } & Omit<ComponentProps<"a">, "href" | "className" | "children">;
type PropsBotao = Comum & { href?: undefined } & Omit<ComponentProps<"button">, "className" | "children">;

/** Botão ou link nas variantes da marca. Com `href`, vira um link. */
export function Botao(props: PropsLink | PropsBotao) {
  const { variante = "primario", tamanho = "normal", icone, className = "", children } = props;
  const classes = `${base} ${variantes[variante]} ${tamanhos[tamanho]} ${className}`;

  if (props.href !== undefined) {
    const { href, variante: _v, tamanho: _t, icone: _i, className: _c, children: _ch, ...resto } = props;
    return (
      <a href={href} className={classes} {...resto}>
        {icone}
        <span>{children}</span>
      </a>
    );
  }

  const { variante: _v, tamanho: _t, icone: _i, className: _c, children: _ch, href: _h, ...resto } = props;
  return (
    <button type="button" className={classes} {...resto}>
      {icone}
      <span>{children}</span>
    </button>
  );
}
