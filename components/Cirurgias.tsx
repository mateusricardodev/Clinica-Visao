import { Drop, CircleHalf, Scissors, Sparkle, Target, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { cirurgias } from "@/lib/cirurgias";
import { fotos } from "@/lib/fotos";
import { linkWhatsApp, site } from "@/lib/site";
import { Botao } from "./Botao";
import { Foto } from "./Foto";
import { Revelar } from "./Revelar";

const icones: Record<string, React.ReactNode> = {
  blefaroplastia: <Scissors size={28} weight="regular" aria-hidden="true" />,
  catarata: <Sparkle size={28} weight="regular" aria-hidden="true" />,
  refrativa: <Target size={28} weight="regular" aria-hidden="true" />,
  ceratocone: <Drop size={28} weight="regular" aria-hidden="true" />,
  retina: <CircleHalf size={28} weight="regular" aria-hidden="true" />,
};

/**
 * Cirurgias e procedimentos de destaque do Dr. Ruy, pedidos explicitamente
 * pela clínica: blefaroplastia, catarata premium, refrativa, ceratocone e retina.
 */
export function Cirurgias() {
  return (
    <section id="cirurgias" className="scroll-mt-[72px] bg-azul-claro-2 py-20 sm:py-28" aria-labelledby="titulo-cirurgias">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
        <Revelar>
          <h2 id="titulo-cirurgias" className="display-2 max-w-[28ch]">
            Cirurgias e procedimentos com o Dr. Ruy
          </h2>
          <p className="medida mt-4 text-[1.0625rem] leading-relaxed text-suave">
            Do consultório ao centro cirúrgico, o mesmo médico acompanha cada etapa do tratamento.
          </p>
        </Revelar>

        <div className="mt-10 grid gap-5 lg:grid-cols-12">
          <div className="grid gap-5 sm:grid-cols-2 lg:col-span-4 lg:grid-cols-1">
            <Revelar as="figure" className="overflow-hidden rounded-[var(--radius-quadro)] ring-1 ring-linha">
              <div className="relative min-h-[280px] sm:min-h-[340px] lg:min-h-[260px]">
                <Foto
                  foto={fotos["dr-ruy-cirurgiao"]}
                  sizes="(min-width: 1024px) 420px, 50vw"
                  preencher
                  posicao="center 20%"
                  className="absolute inset-0"
                />
              </div>
            </Revelar>
            <Revelar as="figure" ordem={1} className="overflow-hidden rounded-[var(--radius-quadro)] ring-1 ring-linha">
              <div className="relative min-h-[280px] sm:min-h-[340px] lg:min-h-[260px]">
                <Foto
                  foto={fotos["cirurgia-equipe"]}
                  sizes="(min-width: 1024px) 420px, 50vw"
                  preencher
                  posicao="center 30%"
                  className="absolute inset-0"
                />
              </div>
            </Revelar>
          </div>

          <ul className="grid gap-5 sm:grid-cols-2 lg:col-span-8">
            {cirurgias.map((c, i) => (
              <Revelar
                as="li"
                key={c.id}
                ordem={i + 1}
                className="rounded-[var(--radius-quadro)] bg-branco p-7 ring-1 ring-linha transition-[transform,box-shadow] duration-500 [transition-timing-function:var(--ease-saida)] hover:-translate-y-1 hover:shadow-quadro motion-reduce:transition-none"
              >
                <span className="text-petroleo">{icones[c.id]}</span>
                <h3 className="display-3 mt-5 text-[1.25rem]">{c.titulo}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed text-suave">{c.texto}</p>
              </Revelar>
            ))}
          </ul>
        </div>

        <Revelar ordem={cirurgias.length + 1} className="mt-8">
          <Botao
            href={linkWhatsApp(site.whatsapp.mensagens.cirurgias)}
            icone={<WhatsappLogo size={22} weight="regular" aria-hidden="true" />}
            target="_blank"
            rel="noopener"
          >
            Falar sobre cirurgias
          </Botao>
        </Revelar>
      </div>
    </section>
  );
}
