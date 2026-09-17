import { AnimatePresence, motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { useMemo, useState, type ReactNode } from 'react'
import { EQUIPMENTS, IMG, SYMPTOMS } from '../config/site'
import { waLink } from '../lib/whatsapp'
import { WhatsAppIcon } from './icons/WhatsAppIcon'

function Chip({ on, children, onClick }: { on: boolean; children: ReactNode; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
      className={`relative inline-flex h-11 items-center gap-2 rounded-full px-4 text-[0.92rem] font-semibold transition-all duration-300 ${
        on
          ? 'bg-gradient-to-br from-ciano-glow via-ciano to-ciano-600 text-white shadow-[0_12px_26px_-12px_rgba(22,182,238,0.95)]'
          : 'bg-white/70 text-navy/80 ring-1 ring-navy/10 hover:bg-white hover:text-navy'
      }`}
    >
      <AnimatePresence initial={false}>
        {on && (
          <motion.span
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 16, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="grid place-items-center overflow-hidden"
          >
            <Check className="size-4 text-white" strokeWidth={3} />
          </motion.span>
        )}
      </AnimatePresence>
      {children}
    </button>
  )
}

export function Diagnostic() {
  const [equip, setEquip] = useState(EQUIPMENTS[0])
  const [symptoms, setSymptoms] = useState<string[]>([])
  const [place, setPlace] = useState('')

  const toggle = (s: string) =>
    setSymptoms((cur) => (cur.includes(s) ? cur.filter((x) => x !== s) : [...cur, s]))

  const message = useMemo(() => {
    const lines = ['Olá, MBR! Vim pelo site.', `Ar-condicionado: ${equip}.`]
    if (symptoms.length) lines.push(`O que está acontecendo: ${symptoms.join(', ').toLowerCase()}.`)
    if (place.trim()) lines.push(`Bairro/cidade: ${place.trim()}.`)
    lines.push('Podem me ajudar?')
    return lines.join('\n')
  }, [equip, symptoms, place])

  return (
    <section id="diagnostico" className="relative overflow-hidden bg-gelo-100 pb-28 pt-16 sm:pt-20">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">
        <div>
          <h2 className="wide text-[2.1rem] font-extrabold leading-[1.02] tracking-[-0.02em] text-navy sm:text-[3rem]">
            O que o seu <span className="whitespace-nowrap">ar-condicionado</span> está fazendo?
          </h2>
          <p className="mt-5 max-w-lg text-[1.05rem] leading-relaxed text-tinta/80">
            Marque o que você está percebendo. A mensagem fica pronta para mandar no WhatsApp e o técnico já chega sabendo do caso.
          </p>

          <fieldset className="mt-10">
            <legend className="text-[0.95rem] font-bold text-navy">Qual o tipo do aparelho?</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {EQUIPMENTS.map((e) => (
                <Chip key={e} on={equip === e} onClick={() => setEquip(e)}>
                  {e}
                </Chip>
              ))}
            </div>
          </fieldset>

          <fieldset className="mt-8">
            <legend className="text-[0.95rem] font-bold text-navy">O que está acontecendo?</legend>
            <div className="mt-3 flex flex-wrap gap-2">
              {SYMPTOMS.map((s) => (
                <Chip key={s} on={symptoms.includes(s)} onClick={() => toggle(s)}>
                  {s}
                </Chip>
              ))}
            </div>
          </fieldset>

          <label className="mt-8 block max-w-md">
            <span className="text-[0.95rem] font-bold text-navy">Bairro ou cidade</span>
            <input
              value={place}
              onChange={(e) => setPlace(e.target.value)}
              placeholder="Opcional"
              maxLength={60}
              className="mt-3 h-12 w-full rounded-2xl bg-white/80 px-4 text-[0.98rem] text-navy ring-1 ring-navy/10 placeholder:text-tinta/40 focus:outline-none focus:ring-2 focus:ring-ciano"
            />
          </label>
        </div>

        {/* prévia da mensagem */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="glass glass-strong relative overflow-hidden rounded-[32px] p-5 sm:p-7">
            <div className="flex items-center gap-3 border-b border-navy/10 pb-4">
              <span className="grid size-12 place-items-center overflow-hidden rounded-full bg-white ring-1 ring-navy/10">
                <img src={IMG.logo} alt="" className="w-[88%]" />
              </span>
              <div>
                <p className="font-bold text-navy">MBR Climatização</p>
                <p className="text-sm text-tinta/60">Sua mensagem</p>
              </div>
            </div>

            <div
              className="relative mt-5 min-h-[210px] rounded-3xl p-4"
              style={{ background: 'linear-gradient(160deg, rgba(211,242,253,0.8), rgba(234,249,254,0.5))' }}
            >
              <motion.div
                layout
                className="ml-auto max-w-[92%] whitespace-pre-line rounded-[20px] rounded-br-md bg-gradient-to-br from-ciano-glow via-ciano to-ciano-600 px-4 py-3 text-[0.95rem] leading-relaxed text-white shadow-[0_16px_30px_-16px_rgba(22,182,238,0.95)] [text-shadow:0_1px_2px_rgba(0,70,120,0.3)]"
                transition={{ type: 'spring', stiffness: 260, damping: 30 }}
              >
                {message}
              </motion.div>
            </div>

            <a
              href={waLink(message)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-frio mt-5 h-14 w-full text-base"
            >
              <WhatsAppIcon className="size-5" />
              Enviar para a MBR
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
