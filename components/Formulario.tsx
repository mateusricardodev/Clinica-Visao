"use client";

import { useId, useState, type FormEvent } from "react";
import { CheckCircle, Phone, WhatsappLogo } from "@phosphor-icons/react";
import { linkWhatsApp, site } from "@/lib/site";
import { Botao } from "./Botao";
import { Revelar } from "./Revelar";

type Campos = {
  nome: string;
  telefone: string;
  email: string;
  horario: string;
  mensagem: string;
};

type Erros = Partial<Record<keyof Campos, string>>;

const horarios = ["Sem preferência", "Manhã", "Tarde", "Fim do dia"];

const vazio: Campos = { nome: "", telefone: "", email: "", horario: horarios[0], mensagem: "" };

function formatarTelefone(valor: string) {
  const d = valor.replace(/\D/g, "").slice(0, 11);
  if (d.length <= 2) return d;
  if (d.length <= 6) return `(${d.slice(0, 2)}) ${d.slice(2)}`;
  if (d.length <= 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
}

function validar(c: Campos): Erros {
  const erros: Erros = {};
  if (c.nome.trim().length < 3) erros.nome = "Informe seu nome para a equipe saber com quem falar.";
  const digitos = c.telefone.replace(/\D/g, "");
  if (digitos.length < 10) erros.telefone = "Informe um telefone com DDD, com 10 ou 11 dígitos.";
  if (c.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(c.email)) erros.email = "Esse e-mail parece incompleto. Confira o endereço.";
  return erros;
}

const campo =
  "w-full rounded-[var(--radius-controle)] border bg-branco px-4 text-[1.0625rem] text-tinta transition-[border-color,box-shadow] duration-300 hover:border-petroleo/50 focus:border-petroleo focus:outline-none focus:ring-4 focus:ring-agua/25 motion-reduce:transition-none";
const campoOk = "border-linha";
const campoErro = "border-[#b3261e] focus:ring-[#b3261e]/20";

/**
 * Formulário de agendamento. Só front-end: valida, simula o envio e mostra
 * a confirmação fictícia. Diz o que acontece depois antes de a pessoa enviar.
 */
export function Formulario() {
  const [campos, setCampos] = useState<Campos>(vazio);
  const [erros, setErros] = useState<Erros>({});
  const [estado, setEstado] = useState<"pronto" | "enviando" | "enviado">("pronto");
  const id = useId();

  function atualizar<K extends keyof Campos>(chave: K, valor: Campos[K]) {
    setCampos((c) => ({ ...c, [chave]: valor }));
    if (erros[chave]) setErros((e) => ({ ...e, [chave]: undefined }));
  }

  function enviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const encontrados = validar(campos);
    setErros(encontrados);
    const primeiro = Object.keys(encontrados)[0];
    if (primeiro) {
      document.getElementById(`${id}-${primeiro}`)?.focus();
      return;
    }
    setEstado("enviando");
    // Simulação: não há backend. O tempo dá a sensação de envio real.
    window.setTimeout(() => setEstado("enviado"), 1100);
  }

  const rotulo = "mb-2 block text-[0.9375rem] font-semibold text-petroleo";
  const erro = (chave: keyof Campos) =>
    erros[chave] ? (
      <p id={`${id}-${chave}-erro`} className="mt-2 text-[0.875rem] text-[#b3261e]" role="alert">
        {erros[chave]}
      </p>
    ) : null;

  return (
    <section id="agendar" className="scroll-mt-[72px] bg-papel py-20 sm:py-28" aria-labelledby="titulo-agendar">
      <div className="mx-auto grid max-w-[1280px] gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:gap-16">
        <Revelar className="lg:col-span-5">
          <h2 id="titulo-agendar" className="display-2">
            Solicite seu agendamento
          </h2>
          <p className="medida mt-5 text-suave">
            Preencha o pedido e a equipe da clínica retorna para confirmar dia e horário. Se preferir,
            fale direto pelo WhatsApp ou ligue.
          </p>
          <ul className="mt-8 space-y-3">
            <li>
              <a
                href={linkWhatsApp()}
                target="_blank"
                rel="noopener"
                className="inline-flex items-center gap-3 rounded-md font-semibold text-petroleo underline decoration-transparent decoration-2 underline-offset-[6px] transition-colors hover:decoration-agua"
              >
                <WhatsappLogo size={22} weight="regular" aria-hidden="true" />
                WhatsApp {site.telefone.exibicao}
              </a>
            </li>
            <li>
              <a
                href={`tel:${site.telefone.tel}`}
                className="tabular inline-flex items-center gap-3 rounded-md font-semibold text-petroleo underline decoration-transparent decoration-2 underline-offset-[6px] transition-colors hover:decoration-agua"
              >
                <Phone size={22} weight="regular" aria-hidden="true" />
                {site.telefone.exibicao}
              </a>
            </li>
          </ul>
        </Revelar>

        <Revelar ordem={1} className="lg:col-span-7">
          {estado === "enviado" ? (
            <div
              className="rounded-[var(--radius-quadro)] bg-branco p-8 shadow-quadro sm:p-10"
              role="status"
              aria-live="polite"
            >
              <CheckCircle size={44} weight="fill" aria-hidden="true" className="text-agua" />
              <h3 className="display-3 mt-5 text-[1.5rem]">Pedido recebido, {campos.nome.trim().split(" ")[0]}</h3>
              <p className="medida mt-3 text-suave">
                A equipe da Visão entra em contato pelo telefone {campos.telefone} para confirmar o horário.
                Este é um site de demonstração: nenhum dado foi enviado.
              </p>
              <div className="mt-7">
                <Botao
                  variante="secundario"
                  onClick={() => {
                    setCampos(vazio);
                    setErros({});
                    setEstado("pronto");
                  }}
                >
                  Fazer outro pedido
                </Botao>
              </div>
            </div>
          ) : (
            <form
              onSubmit={enviar}
              noValidate
              className="rounded-[var(--radius-quadro)] bg-branco p-6 shadow-quadro sm:p-8 lg:p-10"
              aria-busy={estado === "enviando"}
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor={`${id}-nome`} className={rotulo}>
                    Nome
                  </label>
                  <input
                    id={`${id}-nome`}
                    name="nome"
                    type="text"
                    autoComplete="name"
                    required
                    value={campos.nome}
                    onChange={(e) => atualizar("nome", e.target.value)}
                    aria-invalid={Boolean(erros.nome)}
                    aria-describedby={erros.nome ? `${id}-nome-erro` : undefined}
                    className={`${campo} h-13 ${erros.nome ? campoErro : campoOk}`}
                  />
                  {erro("nome")}
                </div>
                <div>
                  <label htmlFor={`${id}-telefone`} className={rotulo}>
                    Telefone
                  </label>
                  <input
                    id={`${id}-telefone`}
                    name="telefone"
                    type="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    required
                    placeholder="(12) 99999-9999"
                    value={campos.telefone}
                    onChange={(e) => atualizar("telefone", formatarTelefone(e.target.value))}
                    aria-invalid={Boolean(erros.telefone)}
                    aria-describedby={erros.telefone ? `${id}-telefone-erro` : undefined}
                    className={`${campo} tabular h-13 ${erros.telefone ? campoErro : campoOk}`}
                  />
                  {erro("telefone")}
                </div>
                <div>
                  <label htmlFor={`${id}-email`} className={rotulo}>
                    E-mail <span className="font-normal text-suave">(opcional)</span>
                  </label>
                  <input
                    id={`${id}-email`}
                    name="email"
                    type="email"
                    autoComplete="email"
                    value={campos.email}
                    onChange={(e) => atualizar("email", e.target.value)}
                    aria-invalid={Boolean(erros.email)}
                    aria-describedby={erros.email ? `${id}-email-erro` : undefined}
                    className={`${campo} h-13 ${erros.email ? campoErro : campoOk}`}
                  />
                  {erro("email")}
                </div>
                <div>
                  <label htmlFor={`${id}-horario`} className={rotulo}>
                    Melhor horário
                  </label>
                  <select
                    id={`${id}-horario`}
                    name="horario"
                    value={campos.horario}
                    onChange={(e) => atualizar("horario", e.target.value)}
                    className={`${campo} h-13 appearance-none bg-[url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2720%27 height=%2720%27 viewBox=%270 0 256 256%27 fill=%27%230d3b55%27%3E%3Cpath d=%27M213.66 101.66l-80 80a8 8 0 0 1-11.32 0l-80-80a8 8 0 0 1 11.32-11.32L128 164.69l74.34-74.35a8 8 0 0 1 11.32 11.32Z%27/%3E%3C/svg%3E")] bg-[length:20px_20px] bg-[position:right_1rem_center] bg-no-repeat pr-12 ${campoOk}`}
                  >
                    {horarios.map((h) => (
                      <option key={h} value={h}>
                        {h}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor={`${id}-mensagem`} className={rotulo}>
                    Mensagem <span className="font-normal text-suave">(opcional)</span>
                  </label>
                  <textarea
                    id={`${id}-mensagem`}
                    name="mensagem"
                    rows={4}
                    placeholder="Conte o motivo da consulta ou se prefere um dia específico."
                    value={campos.mensagem}
                    onChange={(e) => atualizar("mensagem", e.target.value)}
                    className={`${campo} resize-y py-3 ${campoOk}`}
                  />
                </div>
              </div>

              <div className="mt-7 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-[0.875rem] leading-relaxed text-suave">
                  Sem compromisso. A confirmação vem por telefone ou WhatsApp.
                </p>
                <Botao type="submit" disabled={estado === "enviando"} className="disabled:cursor-wait disabled:opacity-70">
                  {estado === "enviando" ? "Enviando pedido..." : "Solicitar agendamento"}
                </Botao>
              </div>
            </form>
          )}
        </Revelar>
      </div>
    </section>
  );
}
