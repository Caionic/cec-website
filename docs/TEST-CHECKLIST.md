# Checklist de testes — feedback Carol

## Estrutura

- [x] Home curta preservada como roteador B2B/B2C
- [x] Blog preservado na Home com três artigos e acesso ao blog completo
- [x] Página `/comunidade/` adicionada
- [x] Header e footer compartilhados
- [x] Links legais preservados no footer

## B2C

- [x] Título e foco em “Formações para alunos”
- [x] Trilha visual do Pré-Vendas à liderança
- [x] Sete formações representadas
- [x] Persona 50+ / imagem criticada removida da nova versão
- [x] Prática supervisionada com imagem
- [x] Nota obrigatória isolada em callout
- [x] Quiz de 5 perguntas implementado
- [x] Workshop removido
- [x] Formação = R$ 897 / 1 ano
- [x] Premium Formação = R$ 1.499 / 1 ano
- [x] Soluções B2B = sob consulta

## B2B

- [x] Formulário reduzido e dividido em 3 etapas
- [x] Diagnóstico inicial gerado a partir das respostas
- [x] Diagnóstico pode ser impresso/salvo em PDF pelo navegador
- [x] Payload estruturado para webhook do CRM
- [ ] CRM real configurado na Vercel
- [ ] Automação real de e-mail/PDF configurada no CRM/Make/Zapier/n8n

## Comunidade

- [x] Parceria CEC + Plura Community explicitada
- [x] White label destacado
- [x] Papéis de CEC e Plura separados
- [ ] Substituir o lockup textual pelo arquivo oficial do logo Plura, caso a CEC forneça o asset homologado

## QA técnico realizado antes do merge

- [x] `node --check app.js`
- [x] `node --check api/lead.js`
- [x] HTML das quatro páginas inspecionado: um H1 por página
- [x] `noindex,nofollow` preservado nas páginas de homologação
- [x] referências de assets locais principais conferidas
- [x] âncoras internas conferidas
- [x] diagnóstico B2C testado com cenário de entrada / prospecção
- [x] diagnóstico B2B testado com cenário de contratação / Bootcamp

## QA após deploy Vercel

- [ ] desktop 1440 px
- [ ] laptop 1024 px
- [ ] tablet 768 px
- [ ] mobile 390 px
- [ ] mobile 360 px
- [ ] menu mobile
- [ ] quiz B2C no ambiente publicado
- [ ] formulário B2B no ambiente publicado
- [ ] print/PDF do diagnóstico no ambiente publicado
- [ ] webhook CRM com lead real de teste
- [ ] e-mail/automação de diagnóstico
- [ ] links legais oficiais
- [ ] links de checkout
