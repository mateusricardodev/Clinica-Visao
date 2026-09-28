export type Cirurgia = {
  id: string;
  titulo: string;
  texto: string;
};

export const cirurgias: Cirurgia[] = [
  {
    id: "blefaroplastia",
    titulo: "Blefaroplastia",
    texto: "Cirurgia das pálpebras para corrigir excesso de pele e bolsas, devolvendo um olhar mais descansado.",
  },
  {
    id: "catarata",
    titulo: "Catarata com lentes premium",
    texto: "Cirurgia de catarata com lentes intraoculares premium, buscando a independência dos óculos após a cirurgia.",
  },
  {
    id: "refrativa",
    titulo: "Cirurgias refrativas",
    texto: "Correção de miopia, hipermetropia e astigmatismo para reduzir ou eliminar o uso de óculos e lentes de contato.",
  },
  {
    id: "ceratocone",
    titulo: "Cirurgias de ceratocone",
    texto: "Tratamento cirúrgico do ceratocone, incluindo crosslinking e outras técnicas para estabilizar a córnea.",
  },
  {
    id: "retina",
    titulo: "Retina clínica",
    texto: "Acompanhamento e tratamento clínico das doenças da retina, com equipamentos próprios da clínica.",
  },
];
