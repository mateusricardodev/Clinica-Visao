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
          style={tamanho(c.proporcao)}
          className="max-h-20 max-w-full object-contain"
        />
      ) : (
        <span className="text-center text-[1.25rem] font-semibold leading-tight text-petroleo sm:text-[1.375rem]">
          {c.nome}
        </span>
      )}
    </li>
  ));
}

/**
 * Faixa de logos passando em loop. A lista vai duas vezes (a segunda escondida
 * de leitores de tela) e anda metade da largura, então a emenda não aparece.
 * Para ao passar o mouse; com reduced-motion vira uma grade parada.
 */
export function CarrosselConvenios({ itens }: { itens: Convenio[] }) {
  return (
    <div className="letreiro overflow-hidden">
      <ul aria-label="Convênios atendidos" className="letreiro-faixa flex w-max">
        <Itens itens={itens} />
        <Itens itens={itens} copia />
      </ul>
    </div>
  );
}
