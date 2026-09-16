import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { BadgeCheck, HandCoins, Timer, ThermometerSnowflake } from 'lucide-react'
import type { PointerEvent } from 'react'
import { IMG } from '../config/site'
import { FrostCorners } from './FrostCorners'
import { Marquee } from './Marquee'

const REASONS = [
  { icon: ThermometerSnowflake, title: 'Ar e refrigeração no mesmo lugar', text: 'Do split da sala à câmara fria, um só contato resolve.' },
  { icon: BadgeCheck, title: 'Qualidade em cada serviço', text: 'Instalação, higienização e reparo feitos com cuidado, do dreno ao acabamento.' },
  { icon: Timer, title: 'Rapidez no atendimento', text: 'Conversa direta no WhatsApp e agenda que respeita o seu tempo.' },
  { icon: HandCoins, title: 'Preço justo', text: 'Orçamento claro antes de começar, sem surpresa na hora de pagar.' },
]

export function BrandMoment() {
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 140, damping: 18 })
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), { stiffness: 140, damping: 18 })
  const gx = useTransform(mx, [-0.5, 0.5], ['30%', '70%'])
  const gy = useTransform(my, [-0.5, 0.5], ['25%', '75%'])

  const glare = useTransform([gx, gy], ([x, y]) => `radial-gradient(40% 40% at ${x} ${y}, rgba(255,255,255,0.75), rgba(255,255,255,0))`)

  const onMove = (e: PointerEvent<HTMLDivElement>) => {
    if (e.pointerType !== 'mouse') return
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width - 0.5)
    my.set((e.clientY - r.top) / r.height - 0.5)
  }
  const onLeave = () => {
    mx.set(0)
    my.set(0)
  }

  return (
    <section id="marca" className="relative overflow-hidden bg-gelo-100 pb-10" aria-label="Por que a MBR">
      <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-2 lg:gap-16">
        <div
          className="relative order-2 lg:order-1"
          style={{ perspective: 1200 }}
          onPointerMove={onMove}
          onPointerLeave={onLeave}
        >
          <motion.div
            style={{ rotateX: rx, rotateY: ry, transformStyle: 'preserve-3d' }}
            className="relative mx-auto aspect-square w-full max-w-[560px] overflow-hidden rounded-[44px] shadow-[0_50px_90px_-40px_rgba(1,38,90,0.55)]"
          >
            <img src={IMG.logoFrost} alt="Logo da MBR Climatização em vidro com geada" className="absolute inset-0 h-full w-full" loading="lazy" />
            <motion.div
              aria-hidden
              className="absolute inset-0 mix-blend-soft-light"
              style={{ background: glare }}
            />
            <div aria-hidden className="absolute inset-0 rounded-[44px] ring-1 ring-inset ring-white/60" />
          </motion.div>
        </div>

        <div className="order-1 lg:order-2">
          <h2 className="wide text-[2.1rem] font-extrabold leading-[1.02] tracking-[-0.02em] text-navy sm:text-[3rem]">
            Quem entende de frio resolve de primeira.
          </h2>
          <ul className="mt-10 grid gap-x-8 gap-y-8 sm:grid-cols-2">
            {REASONS.map(({ icon: Icon, title, text }) => (
              <li key={title}>
                <span className="grid size-12 place-items-center rounded-2xl bg-gradient-to-br from-azul to-navy text-white shadow-[0_14px_30px_-14px_rgba(10,108,224,0.9)]">
                  <Icon className="size-5" strokeWidth={2.2} />
                </span>
                <h3 className="semi-wide mt-4 text-[1.1rem] font-bold text-navy">{title}</h3>
                <p className="mt-1.5 leading-relaxed text-tinta/75">{text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* faixa com o logotipo */}
      <div className="relative mt-24">
        <FrostCorners size="160px" corners={['tl', 'br']} className="opacity-70" />
        <Marquee
          reverse
          speed={34}
          className="py-6"
          trackClassName="gap-14 pr-14"
          items={[<img key="l" src={IMG.logo} alt="" className="h-24 w-auto sm:h-28" loading="lazy" />]}
          repeat={6}
        />
      </div>
    </section>
  )
}
