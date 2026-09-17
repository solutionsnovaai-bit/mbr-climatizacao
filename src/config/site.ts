// Tudo que muda de cliente para cliente fica aqui.

export const SITE = {
  name: 'MBR Climatização',
  url: (import.meta.env.VITE_SITE_URL as string | undefined) ?? 'https://mbrclimatizacao.vercel.app',
  phoneDigits: '5511960304369',
  phoneLabel: '(11) 96030-4369',
  region: 'São Paulo e região',
  email: 'mbrrefrigeracaoeclimatizacao@gmail.com',
  address: {
    street: 'Rua da Goiabeira Serrana, 671',
    postalCode: '08081-560',
    city: 'São Paulo',
    state: 'SP',
  },
  tagline: 'Seu conforto é a nossa prioridade.',
  defaultMessage: 'Olá, MBR! Vim pelo site e quero um orçamento.',
  instagram: '',
  facebook: 'https://www.facebook.com/profile.php?id=61594089476085',
  agency: { name: 'NOVA AI SOLUTIONS', url: '' },
}

export const IMG = {
  logo: '/images/brand/mbr-logo.webp',
  logoFrost: '/images/brand/mbr-logo-frost.webp',
  wordmark: '/images/brand/mbr-wordmark.webp',
  snowflake: '/images/brand/mbr-snowflake.webp',
  heroDesktop: '/images/hero/hero-desktop.webp',
  heroMobile: '/images/hero/hero-mobile.webp',
  frost: {
    tl: '/images/frost/frost-tl.webp',
    tr: '/images/frost/frost-tr.webp',
    bl: '/images/frost/frost-bl.webp',
    br: '/images/frost/frost-br.webp',
  },
}

export const NAV = [
  { id: 'servicos', label: 'Serviços' },
  { id: 'calculadora', label: 'Qual BTU?' },
  { id: 'diagnostico', label: 'Diagnóstico' },
  { id: 'como-funciona', label: 'Como funciona' },
  { id: 'duvidas', label: 'Dúvidas' },
]

export const HERO_WORDS = [
  'a sua casa.',
  'o seu quarto.',
  'a sua loja.',
  'o seu escritório.',
  'o seu consultório.',
  'a sua empresa.',
]

export const SERVICES = [
  {
    title: 'Instalação',
    text: 'Split, piso-teto e cassete instalados com tubulação, dreno e elétrica no lugar certo.',
    msg: 'Quero orçamento de instalação de ar-condicionado.',
  },
  {
    title: 'Manutenção preventiva',
    text: 'Limpeza de filtros, serpentinas e dreno, checagem de gás e de funcionamento.',
    msg: 'Quero orçamento de manutenção preventiva.',
  },
  {
    title: 'Conserto',
    text: 'Aparelho que não gela, desliga sozinho, pinga ou faz barulho. Primeiro o diagnóstico.',
    msg: 'Meu ar-condicionado está com defeito e preciso de conserto.',
  },
  {
    title: 'Higienização',
    text: 'Limpeza completa para tirar mofo, poeira e cheiro ruim do ar que você respira.',
    msg: 'Quero orçamento de higienização do ar-condicionado.',
  },
  {
    title: 'Carga de gás e vazamentos',
    text: 'Localização do vazamento, reparo e recarga do fluido na medida do equipamento.',
    msg: 'Preciso verificar vazamento e carga de gás.',
  },
  {
    title: 'Desinstalação e mudança',
    text: 'Retirada segura do aparelho e reinstalação no novo endereço ou cômodo.',
    msg: 'Preciso desinstalar e reinstalar um ar-condicionado.',
  },
]

export const SEGMENTS = [
  'Residências',
  'Apartamentos',
  'Escritórios',
  'Lojas',
  'Restaurantes',
  'Clínicas',
  'Consultórios',
  'Academias',
  'Salões de beleza',
  'Empresas',
]

export const SYMPTOMS = [
  'Não está gelando',
  'Pingando água',
  'Cheiro ruim',
  'Barulho estranho',
  'Desliga sozinho',
  'Gelo na tubulação',
  'Conta de luz subiu',
  'Não liga',
]

export const EQUIPMENTS = ['Split de parede', 'Piso-teto', 'Cassete', 'Janela', 'Não sei o modelo']

export const STEPS = [
  {
    title: 'Você chama no WhatsApp',
    text: 'Conta o que está acontecendo. Foto ou vídeo do aparelho ajuda muito.',
  },
  {
    title: 'A gente entende e agenda',
    text: 'Tiramos as dúvidas iniciais e marcamos a visita no melhor horário para você.',
  },
  {
    title: 'Diagnóstico e orçamento',
    text: 'O técnico avalia o aparelho e explica o que precisa ser feito antes de começar.',
  },
  {
    title: 'Serviço feito e testado',
    text: 'Executamos, testamos o funcionamento e você acompanha o resultado na hora.',
  },
]

export const FAQ = [
  {
    q: 'Quanto custa o serviço?',
    a: 'Depende do aparelho e do que ele precisa. Mande uma mensagem no WhatsApp contando o caso, de preferência com foto, que a MBR responde com as informações para o orçamento.',
  },
  {
    q: 'Qual a potência certa para o meu ambiente?',
    a: 'Depende do tamanho do cômodo, do sol que ele pega, de quantas pessoas ficam nele e dos aparelhos ligados. Use a calculadora de BTU aqui do site para ter uma estimativa e confirme com a MBR na visita.',
  },
  {
    q: 'De quanto em quanto tempo devo fazer manutenção?',
    a: 'Em uso residencial, o mais comum é uma preventiva a cada seis meses. Em comércios e ambientes com muita gente ou poeira, o intervalo costuma ser menor. A gente indica a frequência certa depois de ver o seu caso.',
  },
  {
    q: 'O ar está pingando dentro de casa. O que pode ser?',
    a: 'Na maioria das vezes é dreno entupido, filtro muito sujo ou instalação com caimento errado. Se estiver molhando parede ou móveis, desligue o aparelho e chame a MBR no WhatsApp.',
  },
  {
    q: 'A conta de luz subiu. Pode ser o ar-condicionado?',
    a: 'Pode. Filtro sujo, serpentina obstruída e gás abaixo do ideal fazem o aparelho trabalhar mais para entregar o mesmo frio. Uma manutenção costuma resolver.',
  },
  {
    q: 'Vocês atendem empresas e comércios?',
    a: 'Sim. Além de residências, a MBR atende escritórios, lojas, restaurantes, clínicas e outros espaços comerciais.',
  },
  {
    q: 'Qual região vocês atendem?',
    a: 'São Paulo e região. Mande o seu bairro ou cidade no WhatsApp que a MBR confirma o atendimento e o melhor horário.',
  },
]

export const BTU_SIZES = [7500, 9000, 12000, 18000, 24000, 30000, 36000, 48000, 60000]
