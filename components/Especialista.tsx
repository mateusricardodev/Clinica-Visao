"use client";

import { useId, useState } from "react";
import { ArrowDown, InstagramLogo, WhatsappLogo } from "@phosphor-icons/react";
import { fotos } from "@/lib/fotos";
import { servicos } from "@/lib/servicos";
import { linkWhatsApp, site } from "@/lib/site";
import { Botao } from "./Botao";
import { Foto } from "./Foto";
import { Revelar } from "./Revelar";

const exames = servicos.find((s) => s.id === "exames")?.itens ?? [];

/**
 * Card do especialista. "Conheça o especialista" abre um painel na própria
 * página com o que se sabe do médico; não existe página separada.
 */
export function Especialista() {
  const [aberto, setAberto] = useState(false);
  const idPainel = useId();

  return (
    <section id="especialistas" className="scroll-mt-[72px] py-20 sm:py-28" aria-labelledby="titulo-especialista">
      <div className="mx-auto max-w-[1280px] px-5 sm:px-8">
        <Revelar>
          <h2 id="titulo-especialista" className="display-2">
            Quem cuida da sua visão
          </h2>
        </Revelar>

        <Revelar as="article" ordem={1} className="mt-10 overflow-hidden rounded-[var(--radius-quadro)] bg-branco shadow-quadro ring-1 ring-linha">
          <div className="grid md:grid-cols-[minmax(0,360px)_1fr]">
            <figure className="flex flex-col bg-azul-claro-2">
              <div className="mx-auto w-full max-w-[360px] md:max-w-none">
                <Foto foto={fotos["dr-ruy"]} sizes="(min-width: 768px) 360px, 100vw" aspecto="1 / 1" posicao="center 30%" />
              </div>
              <figcaption className="codigo flex flex-1 items-baseline gap-3 px-5 py-4 text-suave">
                Dr. Ruy, sala de exames
              </figcaption>
            </figure>

            <div className="p-7 sm:p-10 md:flex md:flex-col md:justify-center lg:p-12">
              <h3 className="display-3 text-[1.5rem] sm:text-[1.75rem]">{site.medico}</h3>
              <p className="mt-1 text-[0.9375rem] font-medium text-suave">{site.especialidade}</p>
              <p className="medida mt-5 text-[1.125rem] leading-relaxed text-tinta">
                Experiência, escuta atenta e cuidado individualizado em cada consulta.
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <Botao
                  variante="secundario"
                  aria-expanded={aberto}
                  aria-controls={idPainel}
                  onClick={() => setAberto((v) => !v)}
                  icone={
                    <ArrowDown
                      size={20}
                      weight="bold"
                      aria-hidden="true"
                      className={`transition-transform duration-500 [transition-timing-function:var(--ease-saida)] ${aberto ? "rotate-180" : ""}`}
                    />
                  }
                >
                  Conheça o especialista
                </Botao>
                <a
                  href={site.instagram.url}
                  target="_blank"
                  rel="noopener"
                  aria-label={`Instagram do ${site.medico} (${site.instagram.usuario})`}
                  className="inline-flex h-13 items-center justify-center gap-2.5 rounded-[var(--radius-controle)] border border-petroleo/35 px-5 font-semibold text-petroleo transition-[transform,box-shadow,background-color,border-color,color] duration-300 [transition-timing-function:var(--ease-saida)] hover:-translate-y-0.5 hover:border-petroleo hover:bg-petroleo hover:text-branco hover:shadow-controle active:translate-y-px motion-reduce:transition-none"
                >
                  <InstagramLogo size={24} weight="regular" aria-hidden="true" />
                  <span className="text-[1.0625rem]">{site.instagram.usuario}</span>
                </a>
              </div>

              <div
                id={idPainel}
                hidden={!aberto}
                className="mt-8 border-t border-linha pt-7"
              >
                <p className="medida text-suave">
                  Oftalmologista responsável pela {site.nome}, na Vila Adyana, em {site.cidade}. Consultas e
                  exames acontecem na própria clínica, com equipamentos próprios, e os retornos são
                  acompanhados pelo mesmo médico. Há pacientes que relatam mais de vinte anos de
                  acompanhamento com o Dr. Ruy.
                </p>
                <p className="mt-5 text-[0.9375rem] font-semibold text-petroleo">Exames realizados na clínica</p>
                <ul className="mt-2 flex flex-wrap gap-x-2 gap-y-1.5 text-[0.9375rem] text-suave">
                  {exames.map((e) => (
                    <li key={e} className="after:ml-2 after:text-linha after:content-['/'] last:after:content-none">
                      {e}
                    </li>
                  ))}
                </ul>
                <div className="mt-7">
                  <Botao
                    href={linkWhatsApp(site.whatsapp.mensagens.especialista)}
                    icone={<WhatsappLogo size={22} weight="regular" aria-hidden="true" />}
                    target="_blank"
                    rel="noopener"
                  >
                    Agendar consulta
                  </Botao>
                </div>
              </div>
            </div>
          </div>
        </Revelar>
      </div>
    </section>
  );
}
