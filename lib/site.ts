// Dados da clínica. Tudo o que aparece na página sai daqui.
// Troque aqui e a alteração vale para o site inteiro.

const telefoneNumeros = "551239424782";

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

  whatsapp: {
    // Confirmado pelo cliente: o WhatsApp usa o mesmo número do fixo.
    base: `https://wa.me/${telefoneNumeros}`,
    mensagens: {
      geral: "Olá! Gostaria de agendar uma consulta na Visão Assistência Oftalmológica.",
      especialista: "Olá! Gostaria de agendar uma consulta com o Dr. Ruy dos Santos Filho.",
    },
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

  // Informação editável. O briefing pede este texto como status visual;
  // ajuste conforme o horário real de funcionamento.
  horario: {
    status: "Aberto",
    detalhe: "fecha às 18:00",
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
  // A logo de cada um é lida de public/convenios/<id>.svg (ou .png/.webp);
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
