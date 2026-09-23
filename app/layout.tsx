import type { Metadata, Viewport } from "next";
import { Hanken_Grotesk } from "next/font/google";
import { site } from "@/lib/site";
import "./globals.css";

// Hanken Grotesk variável: uma família só. Peso leve para o logo,
// médio para títulos, regular para o texto corrido.
const hanken = Hanken_Grotesk({
  subsets: ["latin"],
  variable: "--fonte-hanken",
  display: "swap",
});

const titulo = `${site.nome} | Oftalmologia em ${site.cidade}`;

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: { default: titulo, template: `%s | ${site.nome}` },
  description: site.descricao,
  keywords: [
    "oftalmologista São José dos Campos",
    "clínica oftalmológica Vila Adyana",
    "consulta oftalmológica",
    "exames oftalmológicos",
    "Dr. Ruy dos Santos Filho",
  ],
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "pt_BR",
    url: site.url,
    siteName: site.nome,
    title: titulo,
    description: site.descricao,
    images: [{ url: "/og.jpg", width: 1200, height: 630, alt: "Sala de exames da clínica Visão" }],
  },
  twitter: { card: "summary_large_image", title: titulo, description: site.descricao, images: ["/og.jpg"] },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#0d3b55",
  colorScheme: "light",
};

/**
 * Dados estruturados com o que está confirmado: nome, médico, endereço,
 * telefone, horário, nota e total de avaliações (da ficha pública). Sem preços.
 */
const diasSchema = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const dadosEstruturados = {
  "@context": "https://schema.org",
  "@type": "MedicalClinic",
  "@id": `${site.url}/#clinica`,
  name: site.nome,
  description: site.descricao,
  url: site.url,
  telephone: site.telefone.tel,
  medicalSpecialty: "Ophthalmologic",
  image: `${site.url}/og.jpg`,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.endereco.rua,
    addressLocality: site.endereco.cidade,
    addressRegion: site.endereco.uf,
    postalCode: site.endereco.cep,
    addressCountry: "BR",
  },
  geo: { "@type": "GeoCoordinates", latitude: site.endereco.lat, longitude: site.endereco.lng },
  openingHoursSpecification: site.horario.semana.flatMap((turnos, dia) =>
    turnos.map(([opens, closes]) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: diasSchema[dia],
      opens,
      closes,
    })),
  ),
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: site.avaliacoes.notaNumero,
    reviewCount: site.avaliacoes.total,
    bestRating: 5,
  },
  employee: {
    "@type": "Physician",
    name: site.medico,
    medicalSpecialty: "Ophthalmologic",
    sameAs: [site.instagram.url],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={hanken.variable}>
      <body>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(dadosEstruturados) }} />
        {children}
      </body>
    </html>
  );
}
