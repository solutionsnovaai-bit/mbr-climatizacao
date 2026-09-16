# MBR Climatização — site

Landing page da MBR Climatização (ar-condicionado e refrigeração, São Paulo e região).

Stack: Vite + React + TypeScript + Tailwind CSS v4 + Framer Motion + React Helmet Async.

## Rodar local

```bash
npm install
npm run dev
```

## Publicar na Vercel

1. Suba esta pasta para um repositório no GitHub.
2. Na Vercel, importe o repositório (Framework: Vite, build `npm run build`, saída `dist`).
3. Quando tiver o domínio final, troque `VITE_SITE_URL` no arquivo `.env` (ou crie a variável em Settings → Environment Variables) e faça um novo deploy. É esse valor que monta os links do card de compartilhamento (OG).

## Onde mexer

- `src/config/site.ts`: telefone, e-mail, endereço, textos de serviços, FAQ, palavras do carrossel.
- `index.html`: título, descrição e tags do card de compartilhamento (OG), que precisam ficar no HTML estático para o WhatsApp e o Facebook lerem.
- `public/og-image.jpg`: imagem do card (1200x630).
- `public/images/`: logo, heros e texturas de geada.

## Assets

| Arquivo | Uso |
| --- | --- |
| `images/brand/mbr-logo.webp` | Logo exato com fundo transparente (tela de load, faixa, menu) |
| `images/brand/mbr-wordmark.webp` | Recorte MBR + CLIMATIZAÇÃO (navbar) |
| `images/brand/mbr-snowflake.webp` | Floco do logo (favicon, separadores) |
| `images/brand/mbr-logo-frost.webp` | Logo em vidro com geada (cards e rodapé) |
| `images/hero/hero-desktop.webp` | Hero 16:9 |
| `images/hero/hero-mobile.webp` | Hero 9:16 |
| `images/frost/frost-*.webp` | Cantos de geada |

Desenvolvido por NOVA AI SOLUTIONS.
