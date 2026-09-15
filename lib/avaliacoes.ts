// Depoimentos fornecidos no briefing, mantidos no tom original.
// São avaliações públicas de pacientes; os autores não foram informados,
// então a atribuição fica genérica de propósito.

export type Avaliacao = {
  id: string;
  texto: string;
  autor: string;
};

export const avaliacoes: Avaliacao[] = [
  {
    id: "vinte-anos",
    texto:
      "Meu esposo e eu somos pacientes do Dr. Ruy há mais de 20 anos e sempre somos bem atendidos.",
    autor: "Paciente da clínica",
  },
  {
    id: "recepcao",
    texto:
      "As recepcionistas foram muito educadas, o ambiente é limpo e organizado. Dr. Ruy é super educado e faz um trabalho excelente.",
    autor: "Paciente da clínica",
  },
  {
    id: "nota-dez",
    texto:
      "Nota 10 pelo atendimento, carinho e educação. Dr. Ruy é um médico sem igual.",
    autor: "Paciente da clínica",
  },
];
