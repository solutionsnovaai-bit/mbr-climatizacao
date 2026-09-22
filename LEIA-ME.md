# NOVA AI Solutions · Página de suspensão de projeto

Página única, sem rolagem, com o personagem 3D na frente de um 404 tipográfico que se transforma em PAGAMENTO PENDENTE.

## O que vai para o servidor

```
index.html
assets/
  nova-character-stack.webm   2,5 MB  vídeo usado no Chrome, Edge, Firefox e Android
  nova-character-stack.mp4    4,9 MB  vídeo usado no Safari e iOS (e reserva geral)
  nova-character-still.jpg    89 KB   imagem de segurança se o vídeo não carregar
  nova-character-master.mp4   5,9 MB  master limpo da animação (não é carregado pela página)
  fonts/archivo-var-latin.woff2
```

A pasta `_originais/` guarda os cinco clipes intocados, como backup. Ela não precisa ir para o servidor.

## Como publicar

1. Faça backup do `index.html` atual do site do cliente.
2. Suba este `index.html` e a pasta `assets/` para a raiz do site, no lugar do arquivo de entrada atual.
3. Para reativar o site depois do pagamento, basta restaurar o `index.html` original.

Funciona em qualquer hospedagem estática: Vercel, Netlify (arrastar a pasta), Hostinger, cPanel ou GitHub Pages.

Para testar no computador, rode `npx serve .` dentro da pasta e abra o endereço que aparecer. Abrindo o arquivo com dois cliques (file://), o navegador bloqueia o recorte do personagem por segurança e a página cai no modo simplificado.

Se os vídeos forem hospedados em outro domínio (CDN), esse domínio precisa liberar CORS. O mais simples é mantê-los na mesma pasta `assets/`.

## Onde editar

- **Textos:** no HTML, bloco `<section class="copy">`. Cada `.beat` é uma fase da animação.
- **Cores:** no CSS, bloco `PALETA`.
- **Tamanho e posição do personagem:** `--ch` (altura), `--cx` (centro horizontal) e `--cb` (distância da base). Cada formato de tela tem seu bloco `@media`: ultrawide, tablet deitado, celular deitado, retrato, retrato baixo e tablet em pé.
- **Tamanho do 404:** `--g404-size`, `--g404-wdth` (largura da fonte) e `--g404-gap`.
- **Tamanho de PAGAMENTO PENDENTE:** `--gpay-size`.
- **Tempos da animação:** no script, constantes `CUES` (fases) e `PAY` (quando o 404 vira PAGAMENTO PENDENTE).
- **Logo oficial:** há um comentário no HTML mostrando onde trocar o texto "NOVA AI Solutions" por um `<img>`.

## Sequência dos clipes

1. `Man_scanning_empty_space` — procura no ambiente (0 a 5,6 s)
2. `Man_shrugs_with_confused_expression` — "cadê?" com as mãos (5,6 a 11,6 s)
3. `Man_checking_watch` — baixa as mãos e olha o relógio (11,6 a 17,6 s)
4. `Man_checking_watch_turning_away` — vira de costas e coça a cabeça (17,6 a 25,6 s)
5. `Character_turning_toward_camera` — volta de frente (25,6 a 29,6 s)

Cortes secos entre os clipes, porque as poses já casam. Só o ponto de loop (5 → 1) tem uma fusão de 10 frames. Áudio removido.

## Como funciona

O vídeo `stack` tem duas partes lado a lado: a imagem colorida e a máscara do personagem, gerada frame a frame. A página desenha três camadas a partir do mesmo frame, então nunca saem de sincronia:

- o palco inteiro, com as bordas bem esfumadas;
- o personagem recortado (WebGL), na frente do 404;
- o fundo, que estende as cores reais da borda do vídeo até os cantos da tela e depois desfoca.

A página tem `noindex`, não aparece no Google. Movimento reduzido, falta de JavaScript e falha de vídeo mostram uma composição estática com a mensagem completa.
