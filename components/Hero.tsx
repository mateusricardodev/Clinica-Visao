import type { CSSProperties } from "react";
import { WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { linkWhatsApp } from "@/lib/site";
import { Botao } from "./Botao";
import { TiraDeFilme, type Quadro } from "./TiraDeFilme";

// Os três destaques do briefing são a legenda dos três quadros da tira.
const quadros: Quadro[] = [
  { foto: "recepcao-1", legenda: "Atendimento humanizado" },
  { foto: "sala-exames-1", legenda: "Equipamentos modernos" },
  { foto: "consultorio-1", legenda: "Consultas completas" },
];

export function Hero() {
  return (
    <section id="inicio" className="pt-[72px]" aria-labelledby="titulo-hero">
      <div className="pt-10 sm:pt-12 lg:pt-14">
        <TiraDeFilme quadros={quadros} codigoDeBorda={
            <>
              <span className="hidden sm:inline">Oftalmologia · </span>Vila Adyana, São José dos Campos
            </>
          }>
          <h1 id="titulo-hero" className="display abertura max-w-[21ch]" style={{ "--ordem": 0 } as CSSProperties}>
            Cuidado especializado para a sua visão
          </h1>
          <p
            className="abertura medida mt-5 text-[1.125rem] leading-relaxed text-suave sm:text-[1.1875rem]"
            style={{ "--ordem": 1 } as CSSProperties}
          >
            Atendimento oftalmológico completo, com experiência, atenção e tecnologia para cuidar da
            saúde dos seus olhos.
          </p>
          <div
            className="abertura mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
            style={{ "--ordem": 2 } as CSSProperties}
          >
            <Botao href="#agendar">Agendar consulta</Botao>
            <Botao
              href={linkWhatsApp()}
              variante="secundario"
              icone={<WhatsappLogo size={22} weight="regular" aria-hidden="true" />}
              target="_blank"
              rel="noopener"
            >
              Falar no WhatsApp
            </Botao>
          </div>
        </TiraDeFilme>
      </div>
    </section>
  );
}
