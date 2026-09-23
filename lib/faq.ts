// Perguntas frequentes: só com respostas confirmadas (dados já usados no resto do site).
// Não inventar procedimentos, convênios ou horários fora do que está em site.ts.

import { resumoSemana } from "./horario";
import { site } from "./site";

export type PerguntaFrequente = {
  pergunta: string;
  resposta: string;
};

const horarios = resumoSemana()
  .map((h) => (h.horas === "fechado" ? `${h.dias}, fechado` : `${h.dias}, das ${h.horas}`))
  .join(" · ");

export const faq: PerguntaFrequente[] = [
  {
    pergunta: "Como faço para agendar uma consulta?",
    resposta:
      "Pelo WhatsApp, por telefone ou pelo formulário aqui no site. O WhatsApp costuma ser o caminho mais rápido para marcar um horário.",
  },
  {
    pergunta: "Quais convênios a clínica atende?",
    resposta: `${site.convenios.map((c) => c.nome).join(", ")}. Entre em contato para confirmar a cobertura do seu plano.`,
  },
  {
    pergunta: "Quais exames são feitos na própria clínica?",
    resposta:
      "Topografia, microscopia especular da córnea, paquimetria, campimetria computadorizada, retinografia, laser de argônio, yag laser e tomografia ocular, com equipamentos da própria clínica.",
  },
  {
    pergunta: "A clínica atende crianças e idosos?",
    resposta: "Sim. Crianças, adultos e idosos são atendidos com o mesmo cuidado, no mesmo lugar.",
  },
  {
    pergunta: "Qual o horário de atendimento?",
    resposta: `${horarios}.`,
  },
];
