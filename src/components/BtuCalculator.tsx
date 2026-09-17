import { animate } from 'framer-motion'
import { Minus, Plus, Sun, SunDim } from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { BTU_SIZES, IMG, SEGMENTS } from '../config/site'
import { waLink } from '../lib/whatsapp'
import { FrostCorners } from './FrostCorners'
import { WhatsAppIcon } from './icons/WhatsAppIcon'
import { Marquee } from './Marquee'

const fmt = (n: number) => n.toLocaleString('pt-BR')

// Regra prática usada no mercado: 600 BTU/m² (pouco sol) ou 800 BTU/m² (sol da tarde),
// mais 600 BTU por pessoa além da primeira e 600 BTU por aparelho eletrônico.
function estimate(area: number, sunny: boolean, people: number, devices: number) {
  return area * (sunny ? 800 : 600) + Math.max(0, people - 1) * 600 + devices * 600
}

function AnimatedNumber({ value }: { value: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const prev = useRef(value)
  useEffect(() => {
    const node = ref.current
    if (!node) return
    const c = animate(prev.current, value, {
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => (node.textContent = fmt(Math.round(v / 100) * 100)),
    })
    prev.current = value
    return () => c.stop()
  }, [value])
  return (
    <span ref={ref} className="tabular">
      {fmt(value)}
    </span>
  )
}

function Stepper({ label, value, min, max, onChange }: { label: string; value: number; min: number; max: number; onChange: (v: number) => void }) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-2xl bg-white/70 px-4 py-3 ring-1 ring-navy/8">
      <span className="text-[0.95rem] font-semibold text-navy">{label}</span>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          aria-label={`Diminuir ${label.toLowerCase()}`}
          className="grid size-9 place-items-center rounded-full bg-ciano-50 text-ciano-ink ring-1 ring-ciano/20 transition hover:bg-ciano-100 disabled:opacity-40"
        >
          <Minus className="size-4" strokeWidth={2.6} />
        </button>
        <span className="wide tabular w-6 text-center text-lg font-extrabold text-navy" aria-live="polite">
          {value}
        </span>
        <button
          type="button"
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          aria-label={`Aumentar ${label.toLowerCase()}`}
          className="grid size-9 place-items-center rounded-full bg-ciano-50 text-ciano-ink ring-1 ring-ciano/20 transition hover:bg-ciano-100 disabled:opacity-40"
        >
          <Plus className="size-4" strokeWidth={2.6} />
        </button>
      </div>
    </div>
  )
}

const AREA_MIN = 6
const AREA_MAX = 70

export function BtuCalculator() {
  const [area, setArea] = useState(15)
  const [sunny, setSunny] = useState(false)
  const [people, setPeople] = useState(2)
  const [devices, setDevices] = useState(1)

  const raw = estimate(area, sunny, people, devices)
  const size = useMemo(() => BTU_SIZES.find((s) => s >= raw) ?? null, [raw])
  const fill = ((area - AREA_MIN) / (AREA_MAX - AREA_MIN)) * 100

  const message = size
    ? `Olá, MBR! Fiz a simulação no site: ambiente de ${area} m², ${sunny ? 'sol da tarde' : 'pouco sol'}, ${people} ${people === 1 ? 'pessoa' : 'pessoas'} e ${devices} ${devices === 1 ? 'eletrônico' : 'eletrônicos'}. Deu ${fmt(size)} BTUs. Quero um orçamento de instalação.`
    : `Olá, MBR! Fiz a simulação no site para um ambiente de ${area} m² e deu acima de 60.000 BTUs. Quero conversar sobre a climatização desse espaço.`

  return (
    <section
      id="calculadora"
      className="relative overflow-hidden pb-10 pt-24 sm:pt-28"
      style={{ background: 'linear-gradient(180deg, #EAF3FA 0%, #DDF4FD 30%, #D3F0FC 70%, #EAF3FA 100%)' }}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute right-[-10%] top-10 h-[620px] w-[620px] rounded-full"
        style={{ background: 'radial-gradient(closest-side, rgba(95,214,255,0.45), rgba(95,214,255,0))' }}
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-3xl">
          <h2 className="wide text-[2.1rem] font-extrabold leading-[1.02] tracking-[-0.02em] text-navy sm:text-[3.2rem]">
            Qual BTU o seu ambiente precisa?
          </h2>
          <p className="mt-5 max-w-xl text-[1.05rem] leading-relaxed text-tinta/80">
            Uma estimativa rápida para você pedir o orçamento sabendo o que precisa. A medida final a MBR confirma na visita.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1fr_1fr] lg:gap-10">
          {/* controles */}
          <div className="glass relative rounded-[32px] p-5 sm:p-8">
            <div className="flex items-end justify-between">
              <label htmlFor="area" className="text-[0.95rem] font-bold text-navy">
                Tamanho do ambiente
              </label>
              <span className="wide tabular text-[1.8rem] font-extrabold leading-none text-navy">
                {area}
                <span className="ml-1 text-base text-ciano-ink">m²</span>
              </span>
            </div>
            <input
              id="area"
              type="range"
              min={AREA_MIN}
              max={AREA_MAX}
              step={1}
              value={area}
              onChange={(e) => setArea(Number(e.target.value))}
              className="range-frio mt-5"
              style={{ ['--fill' as string]: `${fill}%` }}
            />
            <div className="mt-2 flex justify-between text-xs font-medium text-tinta/55">
              <span>{AREA_MIN} m²</span>
              <span>{AREA_MAX} m²</span>
            </div>

            <fieldset className="mt-8">
              <legend className="text-[0.95rem] font-bold text-navy">Quanto sol o ambiente pega?</legend>
              <div className="mt-3 grid grid-cols-2 gap-2 rounded-2xl bg-white/60 p-1.5 ring-1 ring-navy/8">
                {[
                  { v: false, label: 'Pouco sol', icon: SunDim },
                  { v: true, label: 'Sol da tarde', icon: Sun },
                ].map(({ v, label, icon: Icon }) => {
                  const on = sunny === v
                  return (
                    <button
                      key={label}
                      type="button"
                      aria-pressed={on}
                      onClick={() => setSunny(v)}
                      className={`flex h-12 items-center justify-center gap-2 rounded-xl text-[0.92rem] font-semibold transition-all duration-300 ${
                        on
                          ? 'bg-gradient-to-br from-ciano-glow via-ciano to-ciano-600 text-white shadow-[0_10px_24px_-10px_rgba(22,182,238,0.95)]'
                          : 'text-navy/70 hover:bg-white hover:text-navy'
                      }`}
                    >
                      <Icon className="size-4" strokeWidth={2.4} />
                      {label}
                    </button>
                  )
                })}
              </div>
            </fieldset>

            <div className="mt-8 grid gap-3">
              <Stepper label="Pessoas" value={people} min={1} max={12} onChange={setPeople} />
              <Stepper label="Eletrônicos" value={devices} min={0} max={8} onChange={setDevices} />
            </div>
          </div>

          {/* resultado */}
          <div className="glass glass-strong relative isolate overflow-hidden rounded-[32px] p-6 sm:p-10">
            <FrostCorners size="clamp(120px, 16vw, 200px)" corners={['tr', 'bl']} className="-z-10 opacity-80" />
            <p className="text-sm font-semibold text-tinta/65">Recomendado para o seu ambiente</p>
            {size ? (
              <div className="wide mt-2 flex flex-wrap items-baseline gap-x-3 font-extrabold leading-[0.9] tracking-[-0.03em] text-navy">
                <span className="text-[clamp(3.6rem,8vw,6.2rem)]">
                  <AnimatedNumber value={size} />
                </span>
                <span className="text-[clamp(1.3rem,2.4vw,2rem)] text-ciano-ink">BTUs</span>
              </div>
            ) : (
              <p className="wide mt-3 text-[clamp(2rem,5vw,3.4rem)] font-extrabold leading-[1] text-navy">Acima de 60.000 BTUs</p>
            )}
            <p className="mt-3 text-sm text-tinta/60">
              Cálculo estimado: <span className="tabular font-semibold text-tinta/80">{fmt(raw)} BTU/h</span>
            </p>

            <ul className="mt-8 flex flex-wrap gap-2" aria-label="Potências comerciais">
              {BTU_SIZES.map((s) => {
                const on = s === size
                return (
                  <li
                    key={s}
                    className={`tabular rounded-full px-3 py-1.5 text-[0.8rem] font-bold transition-all duration-500 ${
                      on
                        ? 'scale-105 bg-gradient-to-br from-ciano-glow via-ciano to-ciano-600 text-white shadow-[0_8px_20px_-8px_rgba(22,182,238,0.95)]'
                        : 'bg-white/70 text-navy/45 ring-1 ring-navy/8'
                    }`}
                  >
                    {fmt(s)}
                  </li>
                )
              })}
            </ul>

            <a href={waLink(message)} target="_blank" rel="noopener noreferrer" className="btn-frio mt-9 h-14 w-full px-6 text-base sm:w-auto">
              <WhatsAppIcon className="size-5" />
              {size ? `Orçar instalação de ${fmt(size)} BTUs` : 'Falar com a MBR sobre o projeto'}
            </a>
            <p className="mt-5 max-w-md text-xs leading-relaxed text-tinta/55">
              Estimativa pela regra prática de 600 a 800 BTU por m², mais 600 por pessoa extra e por aparelho eletrônico. Pé-direito alto, vidro e cozinha mudam a conta.
            </p>
          </div>
        </div>
      </div>

      {/* faixa de segmentos */}
      <div className="relative mt-20 -rotate-[1.5deg] border-y border-white/80 bg-white/55 backdrop-blur-md">
        <Marquee
          speed={48}
          className="py-5"
          trackClassName="gap-8 pr-8"
          items={SEGMENTS.map((s) => (
            <span key={s} className="wide text-[1.4rem] font-extrabold text-navy sm:text-[1.8rem]">
              {s}
            </span>
          ))}
          separator={<img src={IMG.snowflake} alt="" className="h-6 w-auto sm:h-7" />}
        />
      </div>
      <div className="h-10" />
    </section>
  )
}
