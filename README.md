# Visão Assistência Oftalmológica

Landing page institucional da **Visão Assistência Oftalmológica** e do **Dr. Ruy dos Santos Filho**, em São José dos Campos/SP.

O projeto apresenta a clínica com clareza, fortalece a credibilidade da marca e reduz o caminho entre a busca do paciente e o agendamento pelo WhatsApp.

## Funcionalidades

- Layout responsivo para celular, tablet e desktop.
- Chamadas de ação para WhatsApp, telefone e rota no Google Maps.
- Seções de clínica, especialista, serviços, exames, convênios e avaliações.
- Formulário de solicitação de consulta com validação no navegador.
- SEO técnico com metadata, canonical, Open Graph, sitemap e dados estruturados `MedicalClinic`.
- Mapa carregado sob demanda e imagens WebP responsivas com placeholder.
- Recursos de acessibilidade: contraste, foco visível, rótulos de formulário, link de salto e `prefers-reduced-motion`.

> [!IMPORTANT]
> Este projeto é apenas front-end. O formulário de agendamento não guarda dados: ao enviar, abre o WhatsApp da clínica com o pedido já escrito, e a pessoa confirma o envio por lá.

## Stack

- [Next.js 15](https://nextjs.org/) com App Router
- [React 19](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS v4](https://tailwindcss.com/)
- [Phosphor Icons](https://phosphoricons.com/)

## Executar localmente

**Pré-requisito:** Node.js 18.18 ou superior.

```bash
git clone https://github.com/mateusricardodev/Clinica-Visao.git
cd Clinica-Visao
npm install
npm run dev
```

Abra [http://localhost:3000](http://localhost:3000).

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Inicia o ambiente de desenvolvimento. |
| `npm run build` | Gera o build de produção. |
| `npm run start` | Executa localmente o build de produção. |
| `npm run lint` | Executa o lint configurado no projeto. |

## Conteúdo e configurações

| Arquivo | Responsabilidade |
| --- | --- |
| [`lib/site.ts`](./lib/site.ts) | Nome, médico, telefone, WhatsApp, endereço, horário, mapas, convênios, avaliações e menu. |
| [`lib/servicos.ts`](./lib/servicos.ts) | Serviços e exames exibidos. |
| [`lib/avaliacoes.ts`](./lib/avaliacoes.ts) | Depoimentos apresentados na página. |
| [`lib/fotos.ts`](./lib/fotos.ts) | Catálogo gerado de imagens e metadados. Não editar manualmente. |
| [`app/globals.css`](./app/globals.css) | Tokens visuais, tipografia, cores e animações. |

Antes de publicar, altere `site.url` em [`lib/site.ts`](./lib/site.ts) para o domínio definitivo. Esse valor é usado na canonical, Open Graph, sitemap e dados estruturados.

## Publicação

O projeto pode ser publicado na Vercel, Netlify ou Cloudflare Pages.

### Vercel

Importe o repositório no painel da Vercel e mantenha as configurações padrão do Next.js.

### Netlify ou Cloudflare Pages

```text
Build command: npm run build
Publish directory: .next
```

Confirme que o adaptador/framework de Next.js está habilitado na plataforma. Para hospedagem estritamente estática, adicione `output: "export"` ao `next.config.mjs`, execute `npm run build` e publique a pasta `out/`.

## Estrutura

```text
app/                    # Página, metadados globais e estilos
components/             # Seções, UI reutilizável e interações
lib/                    # Conteúdo e dados centralizados
public/fotos/           # Imagens WebP responsivas e metadados de origem
public/convenios/       # Logos dos convênios: <id>.svg, .png, .webp ou .jpg (ids em lib/site.ts)
scripts/baixar-logos.mjs # npm run logos: baixa as logos dos convênios para public/convenios/
scripts/fotos.py        # Geração de imagens, placeholders e lib/fotos.ts
PRODUCT.md              # Contexto do produto e restrições de conteúdo
```

## Fotos

As imagens são entregues em WebP, em múltiplas larguras, com placeholder e dimensões declaradas para evitar salto de layout. Para adicionar uma foto:

1. Inclua o original em `_raw/`.
2. Cadastre a imagem em `scripts/fotos.py`.
3. Execute `python scripts/fotos.py <pasta-do-workspace>` (requer Pillow).
4. Use o identificador gerado no componente correspondente.

## Checklist antes do lançamento

- [ ] Confirmar endereço, horários, telefones e link do WhatsApp.
- [ ] Confirmar serviços, convênios, exames, avaliações e depoimentos.
- [ ] Trocar o domínio de demonstração em `site.url`.
- [ ] Conectar o formulário a um canal seguro de atendimento.
- [ ] Criar a política de privacidade se houver coleta de dados pessoais.
- [ ] Testar os fluxos em celular: WhatsApp, telefone, mapa e formulário.

## Saúde e privacidade

O conteúdo é informativo e não substitui consulta, diagnóstico ou orientação médica. Evite coletar dados clínicos sensíveis no formulário. Caso a página passe a coletar dados pessoais, implemente política de privacidade e fluxos compatíveis com a LGPD.

---

Desenvolvido para a Visão Assistência Oftalmológica.
