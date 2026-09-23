# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

delegated: Next.js 15 (App Router) + React 19 + Tailwind CSS v4 + TypeScript, o mesmo conjunto usado na landing da KS Estética Automotiva, a pedido do usuário ("assim como foi feito na KS Estetica"). Página 100% estática, sem backend; o formulário simula o envio.

## Users

Pacientes e famílias de São José dos Campos (SP) procurando atendimento oftalmológico. Cena típica: a pessoa chega pelo Google (busca ou ficha do Maps), quase sempre pelo celular, e quer decidir em segundos se confia na clínica e como marcar uma consulta. Inclui pacientes antigos (há depoimentos de mais de 20 anos de acompanhamento) e famílias que levam crianças e idosos.

## Product Purpose

Landing page única, em português do Brasil, da clínica Visão Assistência Oftalmológica e do Dr. Ruy dos Santos Filho. Apresenta a clínica, facilita o agendamento (WhatsApp, telefone e formulário) e transmite credibilidade por meio das avaliações e de informações claras. Sucesso: a pessoa entende o que é, confia e inicia um contato.

## Positioning

Clínica de bairro consolidada (Vila Adyana), com médico que atende os mesmos pacientes há décadas, estrutura recém-reformada (fachada e interiores atuais nas fotos do Maps) e equipamentos de exame no próprio consultório. O ativo que um concorrente não copia: a relação longa com os pacientes, evidenciada nas avaliações reais (4,9 de 5 em 118 avaliações).

## Operating Context

- Endereço: Rua Engenheiro João Fonseca, 49, Vila Adyana, São José dos Campos - SP, 12243-620.
- Telefone fixo: (12) 3942-4782, só para ligações. WhatsApp para agendar, informado pelo usuário: (12) 98209-8960 (wa.me/5512982098960). Todos os botões de WhatsApp e o formulário de agendamento vão para ele.
- Horário: o briefing pede o status "Aberto · fecha às 18:00" como informação editável; a ficha do Maps mostra abertura às 08:00 em dia útil. Tratar como dado editável em um único lugar do código, não como verdade confirmada.
- Site atual listado no Maps: intermedicos.com.br (não respondeu ao acesso; não usado como fonte).
- Ficha do Google Maps: https://maps.app.goo.gl/mxtThmv9pPowLzfJ9 (fonte das fotos e das avaliações).

## Capabilities and Constraints

- Apenas front-end funcional com dados mockados. CTAs simulam ações; o formulário mostra mensagem de sucesso fictícia após o envio.
- Seções obrigatórias e na ordem do briefing: header fixo, hero, sobre a clínica, especialista, serviços, avaliações, contato e localização, formulário de agendamento, footer.
- Textos pinados pelo briefing (usar literalmente): título do hero "Cuidado especializado para a sua visão"; subtítulo "Atendimento oftalmológico completo, com experiência, atenção e tecnologia para cuidar da saúde dos seus olhos."; destaques "Atendimento humanizado", "Equipamentos modernos", "Consultas completas"; título do sobre "Uma clínica feita para cuidar de você"; card do especialista "Dr. Ruy dos Santos Filho" / "Oftalmologia" / "Experiência, escuta atenta e cuidado individualizado em cada consulta." / botão "Conheça o especialista"; botões "Agendar consulta", "Falar no WhatsApp", "Como chegar", "Agendar pelo WhatsApp", "Solicitar agendamento"; menu Início, Clínica, Especialistas, Avaliações, Contato; rodapé "© 2026 Visão Assistência Oftalmológica. Todos os direitos reservados."
- Serviços: quatro cards fixos (Consulta oftalmológica completa; Exames oftalmológicos; Prevenção e acompanhamento da saúde visual; Atendimento para toda a família). Não inventar procedimentos nem certificações.
- Confirmado pelo usuário: incluir a lista de exames que a própria clínica publica no Maps (topografia, microscopia especular da córnea, paquimetria, campimetria computadorizada, retinografia, laser de argônio, yag laser, tomografia ocular) como texto discreto no card "Exames oftalmológicos", e os convênios que a clínica anuncia (Mediservice, Unimed, NotreDame Intermédica, SulAmérica, Petrobras AMS, Sabesprev, Bradesco Saúde, Postal Saúde). Atualização pedida pelo usuário: convênios num carrossel de logos, lidas de `public/convenios/<id>.svg|png|webp`; sem arquivo, aparece o nome.
- Avaliações: nota "4,9 / 5" e "118 avaliações", com três depoimentos fornecidos no briefing. Indicar que são avaliações de pacientes; não usar logos de plataformas.
- Formulário: nome, telefone, e-mail, melhor horário e mensagem.
- Sem emoji em lugar nenhum. Ícones minimalistas de biblioteca.
- Restrição visual pinada pelo briefing (registrada, não expandida): paleta branco, azul profundo/petróleo, azul claro e detalhes sutis em verde-água; tipografia limpa e premium; muito espaço em branco; bordas arredondadas discretas e sombras leves; fotos grandes e reais; animações suaves de entrada e hover; evitar visual genérico de hospital.
- Área para incorporar mapa na seção de contato.

## Brand Commitments

- Nome: Visão Assistência Oftalmológica. Logo textual no site (pedido do briefing). A identidade atual da clínica, vista na foto do médico, é uma marca circular de íris (metade esquerda em pontos azuis, metade direita em linhas finas verde-água) com "VISÃO" em caixa alta, peso leve e tracking largo, e "Assistência Oftalmológica" pequeno embaixo. Serve de referência de cor e tom; não reproduzir o desenho como imagem.
- Médico: Dr. Ruy dos Santos Filho, Oftalmologia. Nenhum outro dado profissional (CRM, formação, tempo de carreira) foi informado; não inventar.
- Tom: cuidado, precisão, acolhimento e excelência médica. Sem hype.

## Evidence on Hand

- Fotos reais em `_raw/` (fora do repositório) baixadas da ficha do Maps em resolução original (até 4032 px): fachada com letreiro VISÃO, recepção e sala de espera atuais, consultório com mesa e biblioteca, salas de exame com equipamentos, corredor. Também três artes da própria clínica (banner com logo antigo, convênios, lista de exames) e fotos de uma fase anterior da decoração (piso claro, paredes verde-oliva) que não devem representar a clínica hoje.
- Foto do Dr. Ruy: única versão disponível tem 530 x 530 px (enviada pelo usuário). Confirmado: usar assim mesmo, em tamanho contido; trocar depois se houver versão maior.
- Foto de olho azul em close (750 x 500) enviada pelo usuário: imagem de banco genérica; o próprio briefing veta imagens genéricas de banco, então não usar.
- Avaliações: nota 4,9 e 118 avaliações visíveis na ficha do Maps em 14/09/2026; três depoimentos textuais no briefing, sem nomes dos autores.
- Não existe: foto da equipe de recepção, e-mail da clínica, CRM do médico, preços, lista de convênios atualizada além da arte antiga.

## Product Principles

1. Confiança antes de conversão: tudo o que a página afirma tem origem no briefing, na ficha do Maps ou na confirmação do usuário.
2. Uma ação principal, repetida com o mesmo rótulo: agendar consulta. WhatsApp é o caminho de menor atrito.
3. As fotos reais carregam a página; texto curto, sem jargão médico.
4. Celular primeiro: a cena de uso é a busca no Google pelo telefone, muitas vezes por um familiar.
5. Nada que pareça hospital genérico ou template de clínica.

## Accessibility & Inclusion

Público inclui idosos e famílias: contraste alto, fontes legíveis em tamanho generoso, botões grandes, foco visível, e todas as ações também acessíveis por telefone (link tel:). Respeitar prefers-reduced-motion.
