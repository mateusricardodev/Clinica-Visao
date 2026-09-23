import { Avaliacoes } from "@/components/Avaliacoes";
import { Cabecalho } from "@/components/Cabecalho";
import { Clinica } from "@/components/Clinica";
import { Contato } from "@/components/Contato";
import { Especialista } from "@/components/Especialista";
import { Formulario } from "@/components/Formulario";
import { Hero } from "@/components/Hero";
import { Rodape } from "@/components/Rodape";
import { Servicos } from "@/components/Servicos";

export default function Pagina() {
  return (
    <>
      <a
        href="#conteudo"
        className="sr-only z-50 rounded-[var(--radius-controle)] bg-petroleo px-4 py-3 font-semibold text-branco focus:not-sr-only focus:fixed focus:left-4 focus:top-4"
      >
        Pular para o conteúdo
      </a>
      {/* Sentinela do cabeçalho: quando sai da tela, o cabeçalho ganha fundo. */}
      <div id="sentinela-topo" aria-hidden="true" className="absolute top-0 h-2 w-px" />
      <Cabecalho />
      <main id="conteudo">
        <Hero />
        <Servicos />
        <Clinica />
        <Especialista />
        <Avaliacoes />
        <Contato />
        <Formulario />
      </main>
      <Rodape />
    </>
  );
}
