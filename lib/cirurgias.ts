import type { FotoId } from "./fotos";

// Cirurgias e procedimentos de destaque do Dr. Ruy. Cada um vira um card com foto
// na página inicial e uma página própria em /cirurgias/<id>.
// Os textos são informação geral sobre o procedimento, sem promessa de resultado:
// a indicação depende sempre da avaliação na consulta.
// Fotos "un-*": Unsplash (licença livre para uso comercial), escolhidas para os cards:
// unsplash.com/photos/B0zAPSrEcFw (ceratocone), unsplash.com/photos/QRawWgV6gmo (refrativa),
// unsplash.com/photos/bfcPP-LlZMI (retina). As fotos da própria clínica ficam na galeria.

export type Secao = {
  titulo: string;
  texto?: string;
  itens?: string[];
};

export type Cirurgia = {
  id: string;
  titulo: string;
  /** Uma frase: aparece no card e como descrição da página. */
  texto: string;
  /** Foto do card e do topo da página. */
  foto: FotoId;
  posicao?: string;
  /** Fotos extras mostradas na página, quando houver. */
  galeria?: FotoId[];
  /** Abertura da página, logo abaixo do título. */
  introducao: string;
  secoes: Secao[];
};

export const cirurgias: Cirurgia[] = [
  {
    id: "blefaroplastia",
    titulo: "Blefaroplastia",
    texto: "Cirurgia das pálpebras para corrigir excesso de pele e bolsas, devolvendo um olhar mais descansado.",
    foto: "cir-blefaro-marcacao",
    posicao: "center 35%",
    galeria: ["cir-maos-bisturi"],
    introducao:
      "A blefaroplastia retira o excesso de pele e, quando necessário, de gordura das pálpebras. Além do efeito estético, pode liberar o campo de visão quando a pálpebra superior pesa sobre os cílios.",
    secoes: [
      {
        titulo: "Para quem é indicada",
        itens: [
          "Excesso de pele na pálpebra superior, que deixa o olhar pesado ou cansado",
          "Bolsas de gordura na pálpebra inferior",
          "Pele da pálpebra que chega a atrapalhar a visão lateral ou superior",
        ],
      },
      {
        titulo: "Como é feita",
        texto:
          "Geralmente com anestesia local, com ou sem sedação. Na pálpebra superior, o corte fica escondido na dobra natural; na inferior, rente aos cílios ou por dentro da pálpebra. Antes da cirurgia, o médico marca na pele exatamente o que vai ser retirado.",
      },
      {
        titulo: "Recuperação",
        itens: [
          "Inchaço e manchas roxas são esperados nos primeiros dias e diminuem em uma a duas semanas",
          "Compressas frias e os cuidados orientados pelo médico ajudam a desinchar",
          "Os pontos costumam ser retirados cerca de uma semana depois",
        ],
      },
    ],
  },
  {
    id: "catarata",
    titulo: "Catarata com lentes premium",
    texto: "Cirurgia de catarata com lentes intraoculares premium, buscando a independência dos óculos após a cirurgia.",
    foto: "cir-dr-ruy-foco",
    posicao: "center 30%",
    galeria: ["cir-cirurgiao-pb"],
    introducao:
      "Na catarata, o cristalino, a lente natural do olho, fica opaco e a visão embaça. A cirurgia troca esse cristalino por uma lente intraocular transparente. As lentes premium vão além de devolver a nitidez: podem corrigir também o grau de perto, de longe ou o astigmatismo.",
    secoes: [
      {
        titulo: "Tipos de lente premium",
        itens: [
          "Multifocais e trifocais: visão para longe, meia distância e perto, reduzindo a dependência dos óculos",
          "De foco estendido (EDOF): boa visão de longe e intermediária, com menos halos",
          "Tóricas: corrigem o astigmatismo junto com a catarata",
        ],
      },
      {
        titulo: "Como é feita",
        texto:
          "Pela facoemulsificação: por uma incisão de poucos milímetros, o cristalino opaco é fragmentado e aspirado, e a lente nova é colocada no lugar. A anestesia costuma ser com colírio e sedação leve, e o paciente vai para casa no mesmo dia.",
      },
      {
        titulo: "Recuperação",
        itens: [
          "A visão costuma melhorar já nos primeiros dias",
          "Colírios por algumas semanas, conforme a orientação médica",
          "Evitar coçar o olho e esforço físico no início",
          "Se, com o tempo, a visão voltar a embaçar por opacidade da cápsula, o tratamento é feito com Yag laser, também disponível na clínica",
        ],
      },
    ],
  },
  {
    id: "refrativa",
    titulo: "Cirurgias refrativas",
    texto: "Correção de miopia, hipermetropia e astigmatismo para reduzir ou eliminar o uso de óculos e lentes de contato.",
    foto: "un-refrativa-olho",
    galeria: ["cir-refrativa-laser"],
    introducao:
      "A cirurgia refrativa usa o laser para remodelar a córnea e corrigir o grau. O objetivo é reduzir ou eliminar a necessidade de óculos e lentes de contato.",
    secoes: [
      {
        titulo: "Para quem é indicada",
        itens: [
          "Miopia, hipermetropia e astigmatismo",
          "Maiores de 18 anos, com o grau estável há pelo menos um ano",
          "Córnea com espessura e formato adequados, o que é confirmado nos exames pré-operatórios",
        ],
      },
      {
        titulo: "Exames antes da cirurgia",
        texto:
          "Topografia, paquimetria e tomografia da córnea mostram se o olho é candidato e qual técnica é mais segura. Esses exames são feitos na própria clínica.",
      },
      {
        titulo: "Como é feita",
        texto:
          "Com anestesia em colírio, leva poucos minutos por olho. No LASIK, o laser age sob uma fina camada da córnea; no PRK, na superfície. A escolha depende dos exames e do estilo de vida de cada paciente.",
      },
      {
        titulo: "Recuperação",
        itens: [
          "No LASIK, a visão costuma estar boa em um a dois dias",
          "No PRK, os primeiros dias trazem mais desconforto e a visão se estabiliza em algumas semanas",
          "Colírios e retornos conforme a orientação médica",
        ],
      },
    ],
  },
  {
    id: "ceratocone",
    titulo: "Cirurgias de ceratocone",
    texto: "Tratamento cirúrgico do ceratocone, incluindo crosslinking e outras técnicas para estabilizar a córnea.",
    foto: "un-ceratocone-olho",
    galeria: ["cir-olho-anel-1", "cir-olho-anel-2"],
    introducao:
      "O ceratocone deixa a córnea mais fina e com formato de cone, o que distorce a visão e aumenta o astigmatismo. Costuma aparecer na adolescência e pode progredir. O tratamento busca frear essa progressão e melhorar a qualidade da visão.",
    secoes: [
      {
        titulo: "Tratamentos",
        itens: [
          "Crosslinking: colírio de riboflavina ativado por luz ultravioleta, que fortalece a córnea e ajuda a frear a progressão",
          "Anel intraestromal: pequenos segmentos implantados na córnea para regularizar a curvatura e melhorar a visão",
          "Transplante de córnea, reservado aos casos mais avançados",
        ],
      },
      {
        titulo: "Diagnóstico e acompanhamento",
        texto:
          "Topografia, tomografia e paquimetria da córnea mostram o formato e a espessura da córnea e se o ceratocone está avançando. Os exames são feitos na clínica e repetidos ao longo do acompanhamento.",
      },
      {
        titulo: "Recuperação",
        itens: [
          "Após o crosslinking, uma lente de contato de proteção fica nos primeiros dias, com algum desconforto",
          "Colírios e retornos para acompanhar a cicatrização",
          "Evitar coçar os olhos, que piora o ceratocone",
        ],
      },
    ],
  },
  {
    id: "retina",
    titulo: "Retina clínica",
    texto: "Acompanhamento e tratamento clínico das doenças da retina, com equipamentos próprios da clínica.",
    foto: "un-retina-exame",
    galeria: ["lampada-fenda"],
    introducao:
      "A retina é o tecido do fundo do olho que capta as imagens. Muitas das doenças que a atingem não dão sintomas no início, por isso o acompanhamento regular é o que permite tratar cedo.",
    secoes: [
      {
        titulo: "O que acompanhamos",
        itens: [
          "Retinopatia diabética",
          "Degeneração macular relacionada à idade",
          "Alterações da retina ligadas à pressão alta e outras doenças",
          "Rupturas e lesões da retina periférica",
        ],
      },
      {
        titulo: "Exames",
        texto:
          "Retinografia e tomografia ocular mostram o fundo do olho em detalhe e ajudam a acompanhar a evolução de cada caso. Os dois são feitos na clínica.",
      },
      {
        titulo: "Tratamento",
        texto:
          "Quando indicado, o laser de argônio trata áreas doentes da retina e ajuda a prevenir complicações. O controle da doença de base, como o diabetes, faz parte do cuidado.",
      },
    ],
  },
];
