import { ArrowRight, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { cirurgias } from "@/lib/cirurgias";
import { fotos } from "@/lib/fotos";
import { linkWhatsApp, site } from "@/lib/site";
import { Botao } from "./Botao";
import { Foto } from "./Foto";
import { Revelar } from "./Revelar";

/**
 * Cirurgias e procedimentos de destaque do Dr. Ruy, pedidos explicitamente
 * pela clínica: blefaroplastia, catarata premium, refrativa, ceratocone e retina.
 * Cada card é uma foto com o nome por cima e leva à página do procedimento.
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
            Do consultório ao centro cirúrgico, o mesmo médico acompanha cada etapa do tratamento. Toque em um
            procedimento para saber como ele funciona.
          </p>
        </Revelar>

        <ul className="mt-10 flex flex-wrap justify-center gap-5">
          {cirurgias.map((c, i) => (
            <Revelar
              as="li"
              key={c.id}
              ordem={i}
              className="w-full sm:w-[calc((100%-1.25rem)/2)] lg:w-[calc((100%-2.5rem)/3)]"
            >
              <a
                href={`/cirurgias/${c.id}`}
                className="group relative block aspect-[4/3] overflow-hidden rounded-[var(--radius-quadro)] shadow-quadro focus-visible:outline-offset-4"
              >
                <Foto
                  foto={fotos[c.foto]}
                  sizes="(min-width: 1024px) 460px, (min-width: 640px) 50vw, 100vw"
                  preencher
                  posicao={c.posicao ?? "center"}
                  className="transition-transform duration-[1200ms] [transition-timing-function:var(--ease-saida)] group-hover:scale-105 motion-reduce:transition-none"
                />
                <span
                  aria-hidden="true"
                  className="absolute inset-0 bg-petroleo/50 transition-colors duration-500 group-hover:bg-petroleo/70"
                />
                <span className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-branco">
                  <span className="text-[1.625rem] font-semibold leading-tight tracking-[-0.01em] [text-shadow:0_2px_12px_rgb(0_0_0/0.35)] sm:text-[1.875rem]">
                    {c.titulo}
                  </span>
                  <span className="mt-3 inline-flex items-center gap-1.5 text-[0.9375rem] font-semibold opacity-90 transition-[opacity,transform] duration-500 group-hover:translate-x-0.5 group-hover:opacity-100">
                    Saiba mais
                    <ArrowRight size={18} weight="bold" aria-hidden="true" />
                  </span>
                </span>
              </a>
            </Revelar>
          ))}
        </ul>

        <Revelar ordem={cirurgias.length} className="mt-10 flex justify-center">
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
