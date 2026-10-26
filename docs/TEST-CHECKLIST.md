# Checklist de testes

## Testado automaticamente no pacote local

- [x] três páginas presentes;
- [x] H1 único em cada página;
- [x] title e meta description em cada página;
- [x] `noindex,nofollow` ativo na homologação;
- [x] `robots.txt` bloqueando indexação da homologação;
- [x] rotas internas principais existentes;
- [x] âncoras locais existentes;
- [x] assets principais armazenados localmente;
- [x] imagens com `alt`;
- [x] ausência de conteúdo fictício/Lorem Ipsum;
- [x] JavaScript com sintaxe válida;
- [x] build concluído sem dependências externas;
- [x] gerador do pré-diagnóstico produz URL oficial do WhatsApp com os dados esperados;
- [x] `prefers-reduced-motion` previsto no CSS;
- [x] foco visível em elementos interativos previsto no CSS.

## Validação visual

O runtime de navegador disponível neste ambiente bloqueou navegação para `localhost`, `file:` e `data:` por política administrativa. Por isso não foi possível executar uma nova captura automatizada diretamente destes arquivos. A direção visual foi construída a partir dos wireframes aprovados e do protótipo estático anterior já renderizado; a validação final de viewport deve ser repetida na URL pública da Vercel assim que o deploy estiver conectado.

## Pendente de ambiente externo

- [ ] URL pública Vercel confirmada e testada em navegador;
- [ ] menu mobile testado na URL pública;
- [ ] integração GitHub → Vercel com auto deploy;
- [ ] integração CRM definitiva do formulário;
- [ ] analytics/pixels oficiais;
- [ ] substituição de imagens/logotipo por arquivos master oficiais, se disponibilizados;
- [ ] publicação/migração no Wix após aprovação.
