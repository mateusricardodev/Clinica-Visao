# Visão Assistência Oftalmológica

Landing page da clínica Visão Assistência Oftalmológica e do Dr. Ruy dos Santos Filho,
em São José dos Campos/SP. Objetivo da página: apresentar a clínica, facilitar o
agendamento (WhatsApp, telefone e formulário) e passar credibilidade com as avaliações.

Next.js 15 (App Router) + React 19 + Tailwind CSS v4 + TypeScript. Só front-end: os
dados são mockados e o formulário simula o envio.

## Rodar o projeto

Precisa de Node.js 18.18 ou mais novo.

```bash
npm install
```

Ambiente de desenvolvimento em http://localhost:3000:

```bash
npm run dev
```

Build de produção e execução local:

```bash
npm run build && npm run start
```

## Publicar

A página é 100% estática e funciona em qualquer host.

- **Vercel**: importar o repositório e publicar, sem configuração extra.
- **Netlify / Cloudflare Pages**: comando `npm run build`, pasta `.next`.
- **Host estático simples** (GitHub Pages, Hostinger, etc.): adicione
  `output: "export"` no `next.config.mjs`, rode `npm run build` e publique a
  pasta `out/`. As fotos já são servidas direto, sem servidor de imagens.

Antes de publicar, troque `site.url` em `lib/site.ts` pelo domínio real. Esse valor
alimenta a tag canonical, o Open Graph e o `sitemap.xml`.

## Onde mexer

Quase toda alteração de conteúdo acontece em quatro arquivos:

| Arquivo | O que controla |
| --- | --- |
| `lib/site.ts` | Nome, médico, telefone, WhatsApp, endereço, horário, links do mapa, nota e total de avaliações, convênios, itens do menu |
| `lib/servicos.ts` | Os quatro serviços e a lista de exames |
| `lib/avaliacoes.ts` | Os três depoimentos |
| `lib/fotos.ts` | Catálogo de fotos (gerado por `scripts/fotos.py`, não editar à mão) |

### Horário de funcionamento

O briefing pediu o status "Aberto · fecha às 18:00" como informação editável. Ele fica
em `lib/site.ts`, no bloco `horario`. A página não calcula o horário sozinha; ajuste
o texto conforme o funcionamento real.

### WhatsApp e telefone

Em `lib/site.ts`. O WhatsApp usa o mesmo número do fixo, (12) 3942-4782, como
confirmado pelo cliente. Todos os botões derivam de `whatsapp.base` e das mensagens
pré-preenchidas em `whatsapp.mensagens`.

### Foto do Dr. Ruy

A única versão disponível tem 530 x 530 px e está em `public/fotos/dr-ruy-*.webp`.
Para trocar por uma maior, substitua o arquivo original em `_raw/user/user-1.png`
(fora do repositório) e rode o script de fotos, ou gere os WebP à mão com o mesmo
padrão de nome e ajuste `lib/fotos.ts`.

### Trocar as cores

Os tokens ficam em `app/globals.css`, no bloco `@theme`. A paleta do briefing:

```css
--color-petroleo: #0d3b55;   /* tinta forte, botão principal, a tira de filme */
--color-azul-claro: #c9e0ea; /* perfurações, placas, campos */
--color-agua: #39a99a;       /* brilho do quadro em foco e anel de foco */
```

O verde-água tem três versões porque o contraste muda com o fundo: `--color-agua`
(brilho e linhas, nunca texto sobre branco), `--color-agua-luz` (texto sobre a tira)
e `--color-agua-tinta` (texto sobre branco).

### Adicionar fotos

1. Coloque o original em `_raw/` e acrescente a entrada em `scripts/fotos.py`
   (id, arquivo, texto alternativo, proporção, larguras, ponto focal).
2. Rode `python scripts/fotos.py <pasta-do-workspace>` (precisa de Pillow).
3. Use o `id` nos componentes. Toda foto do site é um "fotograma": cantos de 12px,
   legenda numerada em versaletes ao lado ou abaixo.

## Estrutura

```
app/
  layout.tsx       Metadados, Open Graph, dados estruturados MedicalClinic, fonte
  page.tsx         Montagem das seções na ordem do briefing
  globals.css      Tokens, escala tipográfica, animações
  icon.png         Favicon e ícone de aplicativo
components/
  Cabecalho.tsx    Header fixo, menu no celular, botão de agendamento sempre visível
  Hero.tsx         Título, subtítulo, botões e os três quadros da tira
  TiraDeFilme.tsx  A tira de filme: faixa, perfurações, quadros, brilho do quadro em foco
  Clinica.tsx      Sobre a clínica, com a composição de duas fotos
  Especialista.tsx Card do Dr. Ruy com painel "Conheça o especialista"
  Servicos.tsx     Quatro cards de serviços, lista de exames e convênios
  Avaliacoes.tsx   Nota, total e três depoimentos
  Contato.tsx      Endereço, telefone, horário, botões e mapa
  MapaEmbutido.tsx Fachada como capa; o mapa do Google carrega ao clicar
  Formulario.tsx   Formulário de agendamento com validação e sucesso fictício
  Rodape.tsx
  Foto.tsx         Imagem responsiva com srcset, placeholder e altura reservada
  Botao.tsx        Botão/link nas variantes da marca
  Revelar.tsx      Revelação na rolagem via IntersectionObserver
  Logo.tsx         Logo textual
lib/
  site.ts  servicos.ts  avaliacoes.ts  fotos.ts
scripts/
  fotos.py         Gera os WebP, os placeholders e o lib/fotos.ts
public/fotos/      WebP em várias larguras; o .json ao lado de cada um registra a origem
DESIGN.md          Sistema visual documentado: tokens, tipografia, a tira, movimento
PRODUCT.md         Contexto do produto: público, restrições, o que não inventar
```

## Decisões que valem saber

**Fotos.** As fotos vêm da ficha pública da clínica no Google Maps, em resolução
original (até 4032 px), mais a foto do médico enviada pelo cliente. Viraram 35
arquivos WebP em várias larguras (1,6 MB no total), cada um com placeholder borrado
embutido e dimensões declaradas, então a página não pula ao carregar. Nenhuma foto
foi gerada por IA; a origem de cada arquivo está registrada no `.json` ao lado dele. A foto de olho
azul em close enviada junto é imagem de banco e ficou de fora, como o próprio
briefing pede.

**A tira de filme.** É o momento autoral da página: uma faixa azul-petróleo com
perfurações, as fotos reais como fotogramas e os três destaques do briefing como
legenda dos quadros. Ao carregar, os quadros se revelam um por vez, do cinza
desfocado à cor nítida; o quadro em foco recebe o único brilho verde-água da página.
No desktop os três quadros cabem inteiros; no celular a tira desliza com encaixe por
quadro e ganha setas e contador. Nada disso sequestra a rolagem.

**Mapa sob demanda.** O mapa do Google só carrega quando a pessoa clica. Antes disso,
a fachada da clínica ocupa o lugar: é o prédio que ela vai procurar na rua.

**Conteúdo extra confirmado.** A lista de exames e a linha de convênios vêm de artes
que a própria clínica publica no Maps e foram incluídas a pedido do cliente, sem logos.

**Nada inventado.** Não há CRM, formação, tempo de carreira, preços ou certificações
na página, porque nada disso foi informado. O horário é texto editável, não dado
confirmado.

## Acessibilidade

- Contraste do texto corrido em 14,9:1 e do secundário em 5,7:1, acima da WCAG AA.
- Verde-água nunca é texto sobre branco; as versões de texto foram medidas.
- Foco visível em todos os elementos interativos, link "Pular para o conteúdo".
- Formulário com rótulos acima dos campos, erros inline e mensagem de sucesso
  anunciada por `role="status"`.
- Animações desligam com `prefers-reduced-motion`.

## Arquivo do Figma

O sistema visual também está no Figma:

https://www.figma.com/design/nx6CXa6XjxVeNswrS5vYjp

O arquivo tem as 13 cores e os 2 raios como variáveis, os sete estilos de texto em
Hanken Grotesk, três estilos de efeito (sombras e o brilho do quadro em foco), o
componente Botão em três variantes, o componente Fotograma em dois estados e uma
página "Landing" com a primeira dobra do desktop. Os valores são os mesmos do
`@theme` em `app/globals.css`. As fotos não puderam ser enviadas ao Figma (limite
de chamadas do plano Starter do Figma); os quadros da primeira dobra estão como
placeholders azul-claro.
