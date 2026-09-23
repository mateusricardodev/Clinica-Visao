"use client";

import { useEffect, useId, useState } from "react";
import { List, WhatsappLogo, X } from "@phosphor-icons/react";
import { linkWhatsApp, site } from "@/lib/site";
import { Botao } from "./Botao";
import { Logo } from "./Logo";

/**
 * Cabeçalho fixo. É o único elemento que não sai do lugar:
 * o botão Agendar consulta fica sempre à vista, no desktop e no celular.
 * Ganha fundo e fio quando a página rola (sentinela + IntersectionObserver).
 */
export function Cabecalho() {
  const [aberto, setAberto] = useState(false);
  const [rolou, setRolou] = useState(false);
  const idMenu = useId();

  useEffect(() => {
    const sentinela = document.getElementById("sentinela-topo");
    if (!sentinela) return;
    const obs = new IntersectionObserver(([entrada]) => setRolou(!entrada.isIntersecting), {
      rootMargin: "0px",
      threshold: 0,
    });
    obs.observe(sentinela);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!aberto) return;
    const fechar = (e: KeyboardEvent) => e.key === "Escape" && setAberto(false);
    const mq = window.matchMedia("(min-width: 1024px)");
    const aoMudar = () => mq.matches && setAberto(false);
    window.addEventListener("keydown", fechar);
    mq.addEventListener("change", aoMudar);
    return () => {
      window.removeEventListener("keydown", fechar);
      mq.removeEventListener("change", aoMudar);
    };
  }, [aberto]);

  const fundo = rolou || aberto ? "bg-branco/88 backdrop-blur-md border-linha shadow-[0_8px_24px_-20px_rgb(13_59_85/0.5)]" : "bg-branco/0 border-transparent";

  return (
    <header className={`fixed inset-x-0 top-0 z-40 border-b transition-[background-color,border-color,box-shadow] duration-500 ${fundo}`}>
      <div className="mx-auto flex h-[72px] max-w-[1440px] items-center justify-between gap-4 px-5 sm:px-8">
        <a href="#inicio" className="shrink-0 rounded-md" aria-label={`${site.nome}, voltar ao início`}>
          <Logo />
        </a>

        <nav aria-label="Principal" className="hidden lg:block">
          <ul className="flex items-center gap-8">
            {site.menu.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="rounded-md py-2 text-[0.9375rem] font-medium text-tinta transition-colors duration-300 hover:text-petroleo [text-underline-offset:6px] hover:underline decoration-agua decoration-2"
                >
                  {item.rotulo}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <Botao href="#agendar" tamanho="compacto">
            <span className="sm:hidden">Agendar</span>
            <span className="hidden sm:inline">Agendar consulta</span>
          </Botao>
          <button
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-[var(--radius-controle)] border border-linha bg-branco text-petroleo transition-colors hover:border-petroleo hover:bg-petroleo hover:text-branco lg:hidden"
            aria-expanded={aberto}
            aria-controls={idMenu}
            aria-label={aberto ? "Fechar menu" : "Abrir menu"}
            onClick={() => setAberto((v) => !v)}
          >
            {aberto ? <X size={22} weight="regular" /> : <List size={22} weight="regular" />}
          </button>
        </div>
      </div>

      <div
        id={idMenu}
        hidden={!aberto}
        className="border-t border-linha bg-branco lg:hidden"
      >
        <nav aria-label="Principal (celular)" className="mx-auto max-w-[1440px] px-5 py-3 sm:px-8">
          <ul className="divide-y divide-linha">
            {site.menu.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setAberto(false)}
                  className="flex h-14 items-center text-[1.0625rem] font-medium text-tinta hover:text-petroleo"
                >
                  {item.rotulo}
                </a>
              </li>
            ))}
          </ul>
          <div className="py-4">
            <Botao
              href={linkWhatsApp()}
              variante="secundario"
              className="w-full"
              icone={<WhatsappLogo size={22} weight="regular" aria-hidden="true" />}
              target="_blank"
              rel="noopener"
            >
              Falar no WhatsApp
            </Botao>
          </div>
        </nav>
      </div>
    </header>
  );
}
