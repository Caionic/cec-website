# Migração posterior para Wix

## Recomendação

Depois da aprovação visual na Vercel, implementar a versão definitiva de forma nativa no **Wix Studio**, usando Velo apenas onde houver necessidade de lógica ou integração.

### Por que não usar iframe como solução final

Iframe reduz controle sobre SEO, navegação, acessibilidade, altura responsiva e manutenção. Pode servir para demonstração ou módulos isolados, mas não é a recomendação para estas páginas institucionais.

## Caminho recomendado

1. recriar Header/Footer e seções como componentes do Wix Studio;
2. mapear os tokens de `src/styles/tokens.css` para cores, tipografia, espaçamentos e radii do tema Wix;
3. importar os assets master oficiais no Media Manager;
4. reproduzir as seções na mesma ordem e com os mesmos breakpoints;
5. conectar CTAs às páginas nativas e ao WhatsApp;
6. conectar o pré-diagnóstico ao Wix Forms/Wix CRM ou Velo;
7. configurar SEO de cada página no painel Wix;
8. remover `noindex` somente quando a nova versão substituir oficialmente a atual;
9. validar Core Web Vitals, mobile, formulários e redirects antes da troca.

## O que reaproveitar

- copy e arquitetura de informação dos HTMLs;
- design tokens;
- hierarquia e componentes de cards;
- comportamento de menu e CTA móvel como referência;
- lógica de preparação da mensagem de WhatsApp;
- estrutura e opções do formulário B2B.

## Alternativa: Custom Element

É possível portar blocos muito específicos para Custom Elements com Velo. Para o site institucional inteiro, porém, a implementação nativa no Wix Studio tende a ser mais simples de manter pela equipe e oferece melhor controle editorial.
