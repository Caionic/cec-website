# CEC Website — Homologação

Nova versão do site do **Centro Excelência Comercial (CEC)**, preparada para GitHub + Vercel e para futura implementação no Wix.

## Páginas

- `/` — Home curta, com direcionamento B2C/B2B e bloco de conteúdo do blog
- `/alunos/` — Formações para alunos, trilha de carreira, prática supervisionada, quiz de 5 perguntas e planos
- `/empresas/` — Soluções B2B e diagnóstico comercial em formulário multi-step
- `/comunidade/` — Parceria CEC + Plura Community e proposta de tecnologia white label
- `/api/lead` — função serverless para diagnóstico e encaminhamento de leads ao CRM

## Feedback da Carol incorporado

- Home mais visual e com menor carga de texto;
- blog preservado e destacado;
- retirada de imagens/perfis que destoavam do posicionamento comercial;
- página de Alunos reorganizada como trilha de carreira;
- prática supervisionada com bloco visual e nota obrigatória destacada;
- diagnóstico B2C de 5 perguntas;
- Workshop removido;
- Formação: R$ 897 com 1 ano de acesso;
- Premium Formação: R$ 1.499 com 1 ano de acesso;
- soluções para empresas: sob consulta;
- B2B com formulário mais curto, multi-step e diagnóstico inicial;
- página de comunidade com parceria CEC + Plura Community e tecnologia white label;
- rodapé com privacidade, cookies, termos e contato do encarregado de dados.

## CRM / automação

Os formulários chamam `/api/lead`. A função gera o diagnóstico localmente e pode encaminhar os dados para um webhook externo.

Configure na Vercel uma das opções:

```text
CEC_CRM_WEBHOOK_URL=https://seu-webhook-geral
```

ou webhooks separados:

```text
CEC_B2C_WEBHOOK_URL=https://seu-webhook-b2c
CEC_B2B_WEBHOOK_URL=https://seu-webhook-b2b
```

O webhook recebe JSON contendo os dados do formulário, o tipo (`b2c` ou `b2b`), a origem, o diagnóstico gerado e o timestamp.

**Importante:** enquanto nenhuma variável estiver configurada, o diagnóstico continua funcionando, mas o lead não é gravado automaticamente no CRM. A interface de homologação deixa essa condição explícita.

Para o fluxo solicitado pela Carol — lead no CRM + e-mail automático com PDF/relatório — o webhook deve acionar a automação no CRM, Make, Zapier, n8n ou ferramenta equivalente. O site já envia o diagnóstico estruturado para essa automação. No B2B também há opção de imprimir/salvar o diagnóstico em PDF pelo navegador.

## Blog

A Home mostra os três artigos recentes validados na versão pública da CEC. Na homologação, os artigos e o link “Ver todos” apontam para o blog oficial atual. Na migração definitiva para o Wix, substituir essa lista estática pela coleção/CMS do Blog Wix.

## Conteúdo legal

Durante a homologação, os links legais apontam para as páginas oficiais do domínio atual da CEC, evitando duplicar textos jurídicos em duas fontes distintas.

## Vercel

O projeto não exige etapa de build. O diretório raiz é publicado diretamente. A pasta `/api` é reconhecida pela Vercel como Functions.

Durante a homologação, as páginas usam `noindex,nofollow` e o `robots.txt` bloqueia indexação para não competir com o site oficial.

## Wix

Após aprovação visual e funcional, a versão definitiva deve ser recriada no Wix Studio, usando componentes nativos e Velo onde houver integração. Evitar iframe como solução final quando houver alternativa nativa.

Consulte também:

- `docs/TEST-CHECKLIST.md`
- `docs/WIX-MIGRATION.md`
