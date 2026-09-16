import { motion } from 'framer-motion'
import { Building2, MessagesSquare, Snowflake } from 'lucide-react'
import { HERO_WORDS, IMG } from '../config/site'
import { waLink } from '../lib/whatsapp'
import { WhatsAppIcon } from './icons/WhatsAppIcon'
import { WordRotator } from './WordRotator'

const HERO_BASE = '#B8D3EA' // cor da base das artes, para fundir com a página

const TRUST = [
  { icon: Building2, text: 'Residencial e comercial' },
  { icon: Snowflake, text: 'Câmaras frias e freezers' },
  { icon: MessagesSquare, text: 'Orçamento pelo WhatsApp' },
]

function HeroCopy({ ready, variant }: { ready: boolean; variant: 'desktop' | 'mobile' }) {
  const isDesk = variant === 'desktop'
  const item = (d: number) => ({
    initial: { opacity: 0, y: 22, filter: 'blur(8px)' },
    animate: ready ? { opacity: 1, y: 0, filter: 'blur(0px)' } : undefined,
    transition: { duration: 0.9, delay: d, ease: [0.22, 1, 0.36, 1] as const },
  })

  return (
    <div className={isDesk ? 'text-left' : 'mx-auto max-w-[34rem] text-center'}>
      <motion.h1
        {...item(0.05)}
        className={`wide font-extrabold tracking-[-0.02em] text-navy ${
          isDesk ? 'hero-title' : 'text-[1.72rem] leading-[1.06] min-[420px]:text-[2rem] sm:text-[2.5rem]'
        }`}
      >
        <span className="block text-balance">Frio no ponto certo para</span>
        <span className="semi-wide block pt-[0.08em] text-azul" style={{ fontStretch: '100%' }}>
          <WordRotator words={HERO_WORDS} paused={!ready} />
        </span>
      </motion.h1>

      <motion.p
        {...item(0.18)}
        className={`mt-5 max-w-[34rem] text-tinta/80 ${isDesk ? 'hero-lead' : 'mx-auto text-[0.98rem] leading-relaxed'}`}
      >
        Instalação, manutenção e conserto de ar-condicionado e refrigeração. Do split do quarto à câmara fria do seu negócio.
      </motion.p>

      <motion.div
        {...item(0.3)}
        className={`mt-7 flex flex-wrap gap-3 ${isDesk ? '' : 'justify-center'}`}
      >
        <a
          href={waLink('Olá, MBR! Vim pelo site e quero um orçamento.')}
          target="_blank"
          rel="noopener noreferrer"
          className={`btn-frio ${isDesk ? 'h-[3.4rem] px-[clamp(1.1rem,1.4vw,1.6rem)] text-[clamp(0.84rem,1vw,1.05rem)]' : 'h-14 w-full px-6 text-base min-[420px]:w-auto'}`}
        >
          <WhatsAppIcon className="size-5" />
          Pedir orçamento no WhatsApp
        </a>
        <a
          href="#servicos"
          className={`btn-gelo glass ${isDesk ? 'h-[3.4rem] px-[clamp(1.1rem,1.4vw,1.6rem)] text-[clamp(0.84rem,1vw,1.05rem)]' : 'h-14 w-full px-6 text-base min-[420px]:w-auto'}`}
        >
          Ver serviços
        </a>
      </motion.div>

      <motion.ul
        {...item(0.42)}
        className={`mt-8 flex flex-wrap gap-x-5 gap-y-2.5 text-[0.86rem] font-medium text-tinta/80 ${isDesk ? '' : 'justify-center'}`}
      >
        {TRUST.map(({ icon: Icon, text }) => (
          <li key={text} className="flex items-center gap-2">
            <span className="grid size-7 place-items-center rounded-full bg-white/70 text-azul shadow-[0_4px_14px_-6px_rgba(1,38,90,0.35)]">
              <Icon className="size-3.5" strokeWidth={2.4} />
            </span>
            {text}
          </li>
        ))}
      </motion.ul>
    </div>
  )
}

export function Hero({ ready }: { ready: boolean }) {
  const imgAnim = {
    initial: { opacity: 0, scale: 1.04 },
    animate: ready ? { opacity: 1, scale: 1 } : undefined,
    transition: { duration: 1.6, ease: [0.22, 1, 0.36, 1] as const },
  }

  return (
    <section id="topo" className="relative" style={{ backgroundColor: HERO_BASE }} aria-label="Início">
      {/* DESKTOP: a arte ocupa a largura toda na proporção original, então o logo nunca é cortado */}
      <div className="hero-desktop hero-desktop-frame relative overflow-hidden">
        <motion.img
          {...imgAnim}
          src={IMG.heroDesktop}
          alt="Logo da MBR Climatização em relevo sobre vidro com geada"
          width={1672}
          height={941}
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 h-full w-full select-none"
          draggable={false}
        />
        <div
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-[9%]"
          style={{ background: `linear-gradient(to bottom, rgba(184,211,234,0), ${HERO_BASE})` }}
        />
        <div aria-hidden className="absolute inset-y-0 left-0 w-[46%] bg-[radial-gradient(70%_60%_at_30%_55%,rgba(255,255,255,0.35),rgba(255,255,255,0))]" />
        <div className="hero-copy-desktop absolute top-[calc(50%+26px)] -translate-y-1/2">
          <HeroCopy ready={ready} variant="desktop" />
        </div>
      </div>

      {/* MOBILE: arte no topo em largura total, copy no espaço livre logo abaixo do logo */}
      <div className="hero-mobile relative overflow-hidden">
        <motion.img
          {...imgAnim}
          src={IMG.heroMobile}
          alt="Logo da MBR Climatização em relevo sobre vidro com geada"
          width={941}
          height={1672}
          fetchPriority="high"
          decoding="async"
          className="absolute left-0 top-0 h-auto w-full select-none"
          draggable={false}
        />
        <div
          aria-hidden
          className="absolute inset-x-0"
          style={{
            top: 'calc(100vw * 1672 / 941 * 0.9)',
            height: 'calc(100vw * 1672 / 941 * 0.1 + 2px)',
            background: `linear-gradient(to bottom, rgba(184,211,234,0), ${HERO_BASE})`,
          }}
        />
        <div className="hero-mobile-copy relative px-5 pb-16">
          <HeroCopy ready={ready} variant="mobile" />
        </div>
      </div>
    </section>
  )
}
