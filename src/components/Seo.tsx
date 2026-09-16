import { Helmet } from 'react-helmet-async'
import { SITE } from '../config/site'

// As mesmas tags também estão no index.html estático.
// Robôs do WhatsApp/Facebook não rodam JavaScript e leem o HTML direto; o Helmet mantém tudo certo no navegador.
export function Seo() {
  const title = 'MBR Climatização | Ar-condicionado, câmaras frias e refrigeração'
  const description =
    'Instalação, higienização, manutenção e reparo de ar-condicionado, câmaras frias, freezers e refrigeração em São Paulo e região. Orçamento pelo WhatsApp (11) 96030-4369.'
  const image = `${SITE.url}/og-image.jpg`
  return (
    <Helmet prioritizeSeoTags>
      <html lang="pt-BR" />
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={`${SITE.url}/`} />
      <meta property="og:title" content="MBR Climatização | Frio no ponto certo" />
      <meta property="og:description" content="Ar-condicionado, câmaras frias, freezers e refrigeração comercial. Orçamento pelo WhatsApp." />
      <meta property="og:url" content={`${SITE.url}/`} />
      <meta property="og:image" content={image} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:image" content={image} />
    </Helmet>
  )
}
