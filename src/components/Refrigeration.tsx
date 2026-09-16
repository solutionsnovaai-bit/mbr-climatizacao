import { AnimatePresence, animate, motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { COLD, IMG, SEGMENTS } from '../config/site'
import { waLink } from '../lib/whatsapp'
import { FrostCorners } from './FrostCorners'
import { WhatsAppIcon } from './icons/WhatsAppIcon'
import { Marquee } from './Marquee'

function TempNumber({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const prev = useRef(value)
  useEffect(() => {
    const node = ref.current
    if (!node) return
    const controls = animate(prev.current, value, {
      duration: 0.9,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => {
        const n = Math.round(v)
        node.textContent = n < 0 ? `−${Math.abs(n)}` : `${n}`
      },
    })
    prev.current = value
    return () => controls.stop()
  }, [value])
  return (
    <span ref={ref} className="tabular">
      {value < 0 ? `−${Math.abs(value)}` : value}
    </span>
  )
}

export function Refrigeration() {
  const [idx, setIdx] = useState(0)
  const [touched, setTouched] = useState(false)
  const boxRef = useRef<HTMLDivElement>(null)
  const inView = useInView(boxRef, { amount: 0.4 })
  const item = COLD[idx]

  // troca sozinho enquanto a pessoa não escolhe
  useEffect(() => {
    if (touched || !inView) return
    const id = setInterval(() => setIdx((v) => (v + 1) % COLD.length), 3800)
    return () => clearInterval(id)
  }, [touched, inView])

  return (
    <section
      id="refrigeracao"
      className="relative overflow-hidden text-white"
      style={{
        background:
          'linear-gradient(180deg, #EAF3FA 0px, #9FC2E2 90px, #1B4C86 220px, #061C42 360px, #04132E 520px, #04132E calc(100% - 250px), #0B2A58 calc(100% - 170px), #7FA9D3 calc(100% - 70px), #EAF3FA 100%)',
      }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[420px] h-[700px] w-[1100px] -translate-x-1/2 rounded-full opacity-60"
        style={{ background: 'radial-gradient(closest-side, rgba(30,140,245,0.28), rgba(30,140,245,0))' }}
      />

      <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-[280px] sm:px-8 sm:pt-[320px]">
        <div className="max-w-3xl">
          <h2 className="wide text-[2.1rem] font-extrabold leading-[1.02] tracking-[-0.02em] sm:text-[3.2rem]">
            Refrigeração que segura o seu estoque.
          </h2>
          <p className="mt-5 max-w-xl text-[1.05rem] leading-relaxed text-white/70">
            Câmara fria, freezer ou balcão parado é produto perdido. A MBR cuida do frio de quem vende, produz e armazena.
          </p>
        </div>

        <div ref={boxRef} className="mt-14 grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10">
          <ul className="flex flex-col gap-2" role="tablist" aria-label="Equipamentos de refrigeração">
            {COLD.map((c, i) => {
              const on = i === idx
              return (
                <li key={c.key}>
                  <button
                    type="button"
                    role="tab"
                    aria-selected={on}
                    aria-controls="painel-frio"
                    onClick={() => {
                      setIdx(i)
                      setTouched(true)
                    }}
                    className={`relative w-full overflow-hidden rounded-2xl px-5 py-4 text-left transition-colors duration-500 ${
                      on ? 'text-white' : 'text-white/55 hover:text-white/85'
                    }`}
                  >
                    {on && (
                      <motion.span
                        layoutId="cold-active"
                        className="glass-dark absolute inset-0 rounded-2xl"
                        transition={{ type: 'spring', stiffness: 300, damping: 34 }}
                      />
                    )}
                    <span className="relative flex items-center justify-between gap-4">
                      <span className="semi-wide text-[1.2rem] font-bold sm:text-[1.4rem]">{c.title}</span>
                      <span className={`tabular text-sm font-semibold ${on ? 'text-azul-glow' : 'text-white/35'}`}>
                        {c.temp < 0 ? `−${Math.abs(c.temp)}` : c.temp} °C
                      </span>
                    </span>
                  </button>
                </li>
              )
            })}
          </ul>

          <div
            id="painel-frio"
            role="tabpanel"
            className="glass-dark relative isolate overflow-hidden rounded-[32px] p-7 sm:p-10"
          >
            <FrostCorners size="clamp(120px, 18vw, 220px)" corners={['tr', 'bl']} className="opacity-25 mix-blend-screen" />
            <div className="relative">
              <p className="text-sm font-medium text-white/60">Temperatura típica de conservação</p>
              <div className="wide mt-2 flex items-start font-extrabold leading-[0.85] tracking-[-0.04em]">
                <span className="text-[clamp(5.5rem,14vw,10rem)]">
                  <TempNumber value={item.temp} />
                </span>
                <span className="ml-2 mt-3 text-[clamp(1.6rem,3vw,2.6rem)] text-azul-glow">°C</span>
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={item.key}
                  initial={{ opacity: 0, y: 10, filter: 'blur(6px)' }}
                  animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                  exit={{ opacity: 0, y: -10, filter: 'blur(6px)' }}
                  transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="mt-2 text-sm text-white/50">Referência para {item.tempLabel}</p>
                  <h3 className="semi-wide mt-8 text-[1.6rem] font-bold">{item.title}</h3>
                  <p className="mt-2 max-w-md leading-relaxed text-white/75">{item.text}</p>
                  <a
                    href={waLink(`Olá, MBR! Preciso de atendimento para ${item.title.toLowerCase()}.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-frio mt-8 h-14 px-6"
                  >
                    <WhatsAppIcon className="size-5" />
                    Orçar {item.title.toLowerCase()}
                  </a>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>

      {/* faixa de segmentos */}
      <div className="relative -rotate-[1.5deg] border-y border-white/10 bg-white/[0.04] backdrop-blur-md">
        <Marquee
          speed={48}
          className="py-5"
          trackClassName="gap-8 pr-8"
          items={SEGMENTS.map((s) => (
            <span key={s} className="wide text-[1.4rem] font-extrabold text-white/90 sm:text-[1.8rem]">
              {s}
            </span>
          ))}
          separator={<img src={IMG.snowflake} alt="" className="h-6 w-auto opacity-80 brightness-0 invert sm:h-7" />}
        />
      </div>
      <div className="h-[230px]" />
    </section>
  )
}
