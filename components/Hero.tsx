import type { CSSProperties } from "react";
import { CheckCircle, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { fotos } from "@/lib/fotos";
import { linkWhatsApp } from "@/lib/site";
import { Botao } from "./Botao";
import { Foto } from "./Foto";

// Os três destaques do briefing, logo abaixo dos botões.
const destaques = ["Atendimento humanizado", "Equipamentos modernos", "Consultas completas"];

/**
 * Abertura em foto de ponta a ponta, no modelo do eyesorlando.com: o olho fica
 * à direita e o texto em branco à esquerda, sobre o fundo verde-azulado da foto.
 * No celular a foto é cortada no olho e ganha um véu mais forte para o texto ler bem.
 */
export function Hero() {
  return (
    <section id="inicio" className="pt-[72px]" aria-labelledby="titulo-hero">
      <div className="relative isolate flex min-h-[560px] items-center overflow-hidden bg-petroleo sm:min-h-[600px] lg:min-h-[min(680px,calc(100svh-72px))]">
        <Foto
          foto={fotos["hero-olho"]}
          sizes="100vw"
          preencher
          prioridade
          posicao="72% center"
          className="-z-20"
        />
        <span aria-hidden="true" className="absolute inset-0 -z-10 bg-petroleo/60 md:bg-petroleo/25" />

        <div className="mx-auto w-full max-w-[1440px] px-5 py-16 sm:px-8">
          <div className="max-w-[36rem]">
            <h1
              id="titulo-hero"
              className="display abertura text-branco [text-shadow:0_2px_24px_rgb(0_0_0/0.25)]"
              style={{ "--ordem": 0 } as CSSProperties}
            >
              Cuidado especializado para a sua visão
            </h1>
            <p
              className="abertura mt-5 text-[1.125rem] leading-relaxed text-branco/90 sm:text-[1.1875rem]"
              style={{ "--ordem": 1 } as CSSProperties}
            >
              Atendimento oftalmológico completo, com experiência, atenção e tecnologia para cuidar da
              saúde dos seus olhos.
            </p>
            <div
              className="abertura mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
              style={{ "--ordem": 2 } as CSSProperties}
            >
              <Botao href="#agendar" variante="claro">
                Agendar consulta
              </Botao>
              <Botao
                href={linkWhatsApp()}
                variante="contorno-claro"
                icone={<WhatsappLogo size={22} weight="regular" aria-hidden="true" />}
                target="_blank"
                rel="noopener"
              >
                Falar no WhatsApp
              </Botao>
            </div>
            <ul
              className="abertura mt-9 flex flex-wrap gap-x-6 gap-y-2 text-[0.9375rem] font-medium text-branco/90"
              style={{ "--ordem": 3 } as CSSProperties}
            >
              {destaques.map((d) => (
                <li key={d} className="flex items-center gap-2">
                  <CheckCircle size={20} weight="fill" aria-hidden="true" className="text-agua-luz" />
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
