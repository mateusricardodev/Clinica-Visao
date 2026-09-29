import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, CheckCircle, WhatsappLogo } from "@phosphor-icons/react/dist/ssr";
import { BotaoFlutuanteWhatsApp } from "@/components/BotaoFlutuanteWhatsApp";
import { Botao } from "@/components/Botao";
import { Cabecalho } from "@/components/Cabecalho";
import { Foto } from "@/components/Foto";
import { Rodape } from "@/components/Rodape";
import { cirurgias } from "@/lib/cirurgias";
import { fotos } from "@/lib/fotos";
import { linkWhatsApp, site } from "@/lib/site";

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return cirurgias.map((c) => ({ id: c.id }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const c = cirurgias.find((x) => x.id === id);
  if (!c) return {};
  const foto = fotos[c.foto];
  return {
    title: `${c.titulo} com o ${site.medico}`,
    description: c.texto,
    alternates: { canonical: `/cirurgias/${c.id}` },
    openGraph: {
      title: `${c.titulo} | ${site.nome}`,
      description: c.texto,
      url: `${site.url}/cirurgias/${c.id}`,
      images: [{ url: foto.src, width: foto.largura, height: foto.altura, alt: foto.alt }],
    },
  };
}

/** Página de um procedimento: o que é, para quem, como é feito e a recuperação. */
export default async function PaginaCirurgia({ params }: Props) {
  const { id } = await params;
  const c = cirurgias.find((x) => x.id === id);
  if (!c) notFound();

  const whatsapp = linkWhatsApp(`Olá! Gostaria de agendar uma avaliação para ${c.titulo.toLowerCase()} com o ${site.medico}.`);
  const outras = cirurgias.filter((x) => x.id !== c.id);

  return (
    <>
      <div id="sentinela-topo" aria-hidden="true" className="absolute top-0 h-2 w-px" />
      <Cabecalho />
      <main id="conteudo" className="pt-[72px]">
        <section className="bg-azul-claro-2" aria-labelledby="titulo-procedimento">
          <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-12 sm:px-8 sm:py-16 lg:grid-cols-12 lg:items-center lg:gap-16">
            <div className="lg:col-span-6">
              <a
                href="/#cirurgias"
                className="inline-flex items-center gap-2 rounded-md text-[0.9375rem] font-semibold text-petroleo underline decoration-transparent decoration-2 underline-offset-[6px] transition-colors hover:decoration-agua"
              >
                <ArrowLeft size={18} weight="bold" aria-hidden="true" />
                Cirurgias e procedimentos
              </a>
              <h1 id="titulo-procedimento" className="display mt-6">
                {c.titulo}
              </h1>
              <p className="medida mt-5 text-[1.125rem] leading-relaxed text-tinta">{c.introducao}</p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <Botao
                  href={whatsapp}
                  target="_blank"
                  rel="noopener"
                  icone={<WhatsappLogo size={22} weight="regular" aria-hidden="true" />}
                >
                  Agendar avaliação
                </Botao>
              </div>
            </div>
            <figure className="fotograma relative aspect-[4/3] lg:col-span-6">
              <Foto foto={fotos[c.foto]} sizes="(min-width: 1024px) 680px, 100vw" preencher prioridade posicao={c.posicao ?? "center"} />
            </figure>
          </div>
        </section>

        <section className="py-16 sm:py-24" aria-label={`Sobre ${c.titulo.toLowerCase()}`}>
          <div className="mx-auto grid max-w-[1440px] gap-5 px-5 sm:px-8 md:grid-cols-2 lg:grid-cols-3">
            {c.secoes.map((s) => (
              <article key={s.titulo} className="rounded-[var(--radius-quadro)] bg-branco p-7 ring-1 ring-linha sm:p-8">
                <h2 className="display-3">{s.titulo}</h2>
                {s.texto && <p className="mt-3 leading-relaxed text-suave">{s.texto}</p>}
                {s.itens && (
                  <ul className="mt-4 space-y-3">
                    {s.itens.map((item) => (
                      <li key={item} className="flex gap-3 leading-relaxed text-tinta">
                        <CheckCircle size={22} weight="fill" aria-hidden="true" className="mt-0.5 shrink-0 text-agua" />
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            ))}
          </div>

          {c.galeria && (
            <div className="mx-auto mt-5 grid max-w-[1440px] gap-5 px-5 sm:grid-cols-2 sm:px-8">
              {c.galeria.map((g) => (
                <figure key={g} className="fotograma relative aspect-[4/3]">
                  <Foto foto={fotos[g]} sizes="(min-width: 640px) 50vw, 100vw" preencher posicao="center 35%" />
                </figure>
              ))}
            </div>
          )}

          <p className="mx-auto mt-10 max-w-[1440px] px-5 text-[0.9375rem] leading-relaxed text-suave sm:px-8">
            Estas são informações gerais. A indicação, a técnica e os cuidados de cada caso são definidos na
            consulta, depois da avaliação e dos exames.
          </p>
        </section>

        <section className="bg-papel py-16 sm:py-24" aria-labelledby="titulo-medico">
          <div className="mx-auto grid max-w-[1440px] gap-10 px-5 sm:px-8 md:grid-cols-12 md:items-center">
            <figure className="fotograma relative aspect-[3/4] max-w-[420px] md:col-span-5">
              <Foto foto={fotos["dr-ruy-cirurgiao"]} sizes="(min-width: 768px) 420px, 100vw" preencher posicao="center 20%" />
            </figure>
            <div className="md:col-span-7">
              <h2 id="titulo-medico" className="display-2">
                Com o {site.medico}
              </h2>
              <p className="medida mt-5 text-[1.0625rem] leading-relaxed text-suave">
                Do consultório ao centro cirúrgico, o mesmo médico acompanha cada etapa: a avaliação, os exames, a
                cirurgia e os retornos. Os exames pré-operatórios são feitos na própria clínica, na Vila Adyana, em{" "}
                {site.cidade}.
              </p>
              <div className="mt-8">
                <Botao
                  href={whatsapp}
                  target="_blank"
                  rel="noopener"
                  icone={<WhatsappLogo size={22} weight="regular" aria-hidden="true" />}
                >
                  Falar no WhatsApp
                </Botao>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-24" aria-labelledby="titulo-outras">
          <div className="mx-auto max-w-[1440px] px-5 sm:px-8">
            <h2 id="titulo-outras" className="display-3 text-[1.5rem]">
              Outros procedimentos
            </h2>
            <ul className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {outras.map((o) => (
                <li key={o.id}>
                  <a
                    href={`/cirurgias/${o.id}`}
                    className="group relative block aspect-[4/3] overflow-hidden rounded-[var(--radius-quadro)] shadow-quadro focus-visible:outline-offset-4"
                  >
                    <Foto
                      foto={fotos[o.foto]}
                      sizes="(min-width: 1024px) 340px, (min-width: 640px) 50vw, 100vw"
                      preencher
                      posicao={o.posicao ?? "center"}
                      className="transition-transform duration-[1200ms] [transition-timing-function:var(--ease-saida)] group-hover:scale-105 motion-reduce:transition-none"
                    />
                    <span aria-hidden="true" className="absolute inset-0 bg-petroleo/50 transition-colors duration-500 group-hover:bg-petroleo/70" />
                    <span className="absolute inset-0 flex items-center justify-center gap-1.5 p-5 text-center text-[1.25rem] font-semibold leading-tight text-branco [text-shadow:0_2px_12px_rgb(0_0_0/0.35)]">
                      {o.titulo}
                      <ArrowUpRight size={18} weight="bold" aria-hidden="true" className="shrink-0" />
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Rodape />
      <BotaoFlutuanteWhatsApp />
    </>
  );
}
