import type { Foto as FotoDados } from "@/lib/fotos";

type Props = {
  foto: FotoDados;
  /** Atributo `sizes`: quanto da largura da tela a foto ocupa em cada breakpoint. */
  sizes: string;
  /** Proporção da moldura, ex.: "4 / 3". Sem valor, usa a proporção original. */
  aspecto?: string;
  /** Só para a foto que abre a página (LCP). Desliga o lazy loading. */
  prioridade?: boolean;
  className?: string;
  /** Ajusta o enquadramento quando a foto é cortada. */
  posicao?: string;
  /** Preenche o elemento pai posicionado, em vez de reservar a própria altura. */
  preencher?: boolean;
};

/**
 * Foto responsiva sem servidor de imagens: WebP em várias larguras,
 * espaço reservado antes do carregamento (CLS zero) e placeholder borrado embutido.
 */
export function Foto({
  foto,
  sizes,
  aspecto,
  prioridade = false,
  className = "",
  posicao = "center",
  preencher = false,
}: Props) {
  return (
    <img
      src={foto.src}
      srcSet={foto.srcSet}
      sizes={sizes}
      width={foto.largura}
      height={foto.altura}
      alt={foto.alt}
      loading={prioridade ? "eager" : "lazy"}
      decoding={prioridade ? "sync" : "async"}
      fetchPriority={prioridade ? "high" : "auto"}
      className={`h-full w-full object-cover ${preencher ? "absolute inset-0" : ""} ${className}`}
      style={{
        aspectRatio: preencher ? undefined : aspecto,
        objectPosition: posicao,
        backgroundImage: `url("${foto.lqip}")`,
        backgroundSize: "cover",
        backgroundPosition: posicao,
      }}
    />
  );
}
