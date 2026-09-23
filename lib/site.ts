// Dados da clínica. Tudo o que aparece na página sai daqui.
// Troque aqui e a alteração vale para o site inteiro.

export const site = {
  nome: "Visão Assistência Oftalmológica",
  nomeCurto: "Visão",
  medico: "Dr. Ruy dos Santos Filho",
  especialidade: "Oftalmologia",
  cidade: "São José dos Campos",
  // Troque pelo domínio real antes de publicar. Alimenta canonical, Open Graph e sitemap.
  url: "https://clinicavisao.com.br",
  descricao:
    "Atendimento oftalmológico completo em São José dos Campos, com experiência, atenção e tecnologia para cuidar da saúde dos seus olhos.",

  telefone: {
    exibicao: "(12) 3942-4782",
    tel: "+551239424782",
  },

  // Celular para agendar: todos os botões de WhatsApp e o formulário vão para ele.
  // O fixo acima fica para ligações.
  whatsapp: {
    exibicao: "(12) 98209-8960",
    base: "https://wa.me/5512982098960",
    mensagens: {
      geral: "Olá! Gostaria de agendar uma consulta na Visão Assistência Oftalmológica.",
      especialista: "Olá! Gostaria de agendar uma consulta com o Dr. Ruy dos Santos Filho.",
    },
  },

  instagram: {
    usuario: "@drruysfilho",
    url: "https://www.instagram.com/drruysfilho/",
  },

  endereco: {
    rua: "Rua Engenheiro João Fonseca, 49",
    bairro: "Vila Adyana",
    cidade: "São José dos Campos",
    uf: "SP",
    cep: "12243-620",
    // Coordenadas da ficha do Google Maps.
    lat: -23.1943649,
    lng: -45.8912142,
  },

  // Horário da ficha do Google Maps. Índice = dia da semana (0 = domingo).
  // Cada dia é uma lista de turnos [abre, fecha]; lista vazia = fechado.
  // O status "Aberto / Fechado" do site é calculado a partir daqui, no fuso da clínica.
  horario: {
    fuso: "America/Sao_Paulo",
    semana: [
      [],
      [["08:00", "12:30"], ["13:30", "18:00"]],
      [["08:00", "12:30"], ["13:30", "18:00"]],
      [["08:00", "12:30"], ["13:30", "18:00"]],
      [["08:00", "12:30"], ["13:30", "18:00"]],
      [["08:00", "12:00"], ["13:30", "16:45"]],
      [],
    ],
  },

  mapa: {
    ficha: "https://maps.app.goo.gl/mxtThmv9pPowLzfJ9",
    comoChegar:
      "https://www.google.com/maps/dir/?api=1&destination=Vis%C3%A3o+Assist%C3%AAncia+Oftalmol%C3%B3gica+%26+Dr+Ruy+dos+Santos+Filho%2C+Rua+Engenheiro+Jo%C3%A3o+Fonseca%2C+49+-+Vila+Adyana%2C+S%C3%A3o+Jos%C3%A9+dos+Campos+-+SP",
    embed:
      "https://www.google.com/maps?q=Rua+Engenheiro+Jo%C3%A3o+Fonseca%2C+49+-+Vila+Adyana%2C+S%C3%A3o+Jos%C3%A9+dos+Campos+-+SP%2C+12243-620&z=16&output=embed",
  },

  avaliacoes: {
    nota: "4,9",
    notaNumero: 4.9,
    total: 118,
  },

  // Lista publicada pela própria clínica na ficha do Maps.
  // A logo de cada um é lida de public/convenios/<id>.svg (ou .png/.webp/.jpg; `npm run logos` baixa);
  // sem arquivo, o carrossel mostra o nome.
  convenios: [
    { id: "mediservice", nome: "Mediservice" },
    { id: "unimed", nome: "Unimed" },
    { id: "notredame-intermedica", nome: "NotreDame Intermédica" },
    { id: "sulamerica", nome: "SulAmérica" },
    { id: "petrobras-ams", nome: "Petrobras AMS" },
    { id: "sabesprev", nome: "Sabesprev" },
    { id: "bradesco-saude", nome: "Bradesco Saúde" },
    { id: "postal-saude", nome: "Postal Saúde" },
  ],

  menu: [
    { rotulo: "Início", href: "#inicio" },
    { rotulo: "Serviços", href: "#servicos" },
    { rotulo: "Clínica", href: "#clinica" },
    { rotulo: "Especialistas", href: "#especialistas" },
    { rotulo: "Avaliações", href: "#avaliacoes" },
    { rotulo: "Contato", href: "#contato" },
  ],
} as const;

export function linkWhatsApp(mensagem: string = site.whatsapp.mensagens.geral) {
  return `${site.whatsapp.base}?text=${encodeURIComponent(mensagem)}`;
}

export const enderecoLinha = `${site.endereco.rua}, ${site.endereco.bairro}, ${site.endereco.cidade} - ${site.endereco.uf}, ${site.endereco.cep}`;
