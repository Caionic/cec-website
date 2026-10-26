# CEC Website — Homologação

Site de homologação do **Centro Excelência Comercial (CEC)**, preparado para GitHub + Vercel e para futura implementação no Wix.

## Páginas

- `/` — Home institucional com direcionamento B2B/B2C
- `/empresas/` — soluções corporativas e pré-diagnóstico
- `/alunos/` — formações, trilhas, planos e FAQ

## Arquitetura

O projeto é estático e sem dependências de framework: HTML semântico, CSS centralizado, JavaScript ES Modules e Web Components nativos para Header/Footer. Isso reduz custo de manutenção e facilita a futura migração para Wix/Velo.

## Rodar localmente

Qualquer servidor estático funciona. Exemplo com Python:

```bash
python -m http.server 4173
```

Abra `http://localhost:4173`.

## Vercel

O repositório está pronto para importação direta na Vercel. Não há etapa de build: a raiz do repositório é o diretório público.

Durante a homologação, as páginas usam `noindex,nofollow` para não competir com o domínio oficial da CEC.

## Formulário B2B

Na homologação, o formulário valida os campos no navegador e abre o WhatsApp oficial da CEC com o pré-diagnóstico preenchido. Ele **não grava os dados em CRM** nesta fase.

## Conteúdo e dados

A copy foi consolidada a partir das páginas públicas da CEC e das referências aprovadas. Não foram adicionados depoimentos, clientes, certificações ou métricas não verificadas.

## Próxima fase

Depois da aprovação visual e funcional na Vercel, a implementação definitiva deve ser feita no Wix, priorizando componentes nativos/Wix Studio + Velo. Evitar iframe como solução final quando houver alternativa nativa.

Consulte também:

- `docs/TEST-CHECKLIST.md`
- `docs/WIX-MIGRATION.md`
