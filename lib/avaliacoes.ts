// Depoimentos fornecidos no briefing, mantidos no tom original.
// São avaliações públicas de pacientes na ficha do Google Maps. O nome só entra
// quando foi conferido lá; sem nome, o card mostra "Paciente da clínica".

export type Avaliacao = {
  id: string;
  texto: string;
  /** Nome como aparece na avaliação pública do Google. */
  nome?: string;
};

export const avaliacoes: Avaliacao[] = [
  {
    id: "vinte-anos",
    texto:
      "Meu esposo e eu somos pacientes do Dr. Ruy há mais de 20 anos e sempre somos bem atendidos.",
    nome: "Mislene Goulart",
  },
  {
    id: "recepcao",
    texto:
      "As recepcionistas foram muito educadas, o ambiente é limpo e organizado. Dr. Ruy é super educado e faz um trabalho excelente.",
    nome: "Valdineia Dourado",
  },
  {
    id: "nota-dez",
    texto:
      "Nota 10 pelo atendimento, carinho e educação. Dr. Ruy é um médico sem igual.",
    nome: "Elenice Maria",
  },
];
