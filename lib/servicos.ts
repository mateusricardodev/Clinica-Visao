import type { FotoId } from "./fotos";

export type Servico = {
  id: string;
  titulo: string;
  texto: string;
  /** Lista publicada pela própria clínica; entra como texto discreto. */
  itens?: string[];
  foto?: FotoId;
};

export const servicos: Servico[] = [
  {
    id: "consulta",
    titulo: "Consulta oftalmológica completa",
    texto:
      "Avaliação da visão e da saúde dos olhos com tempo para ouvir, examinar e explicar cada resultado.",
  },
  {
    id: "exames",
    titulo: "Exames oftalmológicos",
    texto: "Exames realizados na própria clínica, com equipamentos próprios.",
    itens: [
      "Topografia",
      "Microscopia especular da córnea",
      "Paquimetria",
      "Campimetria computadorizada",
      "Retinografia",
      "Laser de argônio",
      "Yag laser",
      "Tomografia ocular",
    ],
    foto: "lampada-fenda",
  },
  {
    id: "prevencao",
    titulo: "Prevenção e acompanhamento da saúde visual",
    texto:
      "Consultas de rotina e retornos programados para acompanhar a visão ao longo dos anos.",
  },
  {
    id: "familia",
    titulo: "Atendimento para toda a família",
    texto: "Crianças, adultos e idosos atendidos com o mesmo cuidado, no mesmo lugar.",
  },
];
