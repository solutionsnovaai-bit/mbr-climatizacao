import { AnimatePresence, motion } from 'framer-motion'
import { Plus } from 'lucide-react'
import { useId, useState } from 'react'
import { FAQ } from '../config/site'

export function Faq() {
  const [open, setOpen] = useState<number | null>(0)
  const base = useId()

  return (
    <section id="duvidas" className="relative bg-gelo-100 pb-10 pt-20 sm:pt-24">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 sm:px-8 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
        <h2 className="wide text-[2.1rem] font-extrabold leading-[1.02] tracking-[-0.02em] text-navy sm:text-[3rem] lg:sticky lg:top-32 lg:self-start">
          Dúvidas comuns
        </h2>
        <div className="space-y-3">
          {FAQ.map((f, i) => {
            const isOpen = open === i
            const panelId = `${base}-p${i}`
            const btnId = `${base}-b${i}`
            return (
              <div key={f.q} className={`rounded-3xl transition-colors duration-500 ${isOpen ? 'glass glass-strong' : 'bg-white/45'}`}>
                <h3>
                  <button
                    id={btnId}
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-6 px-6 py-5 text-left"
                  >
                    <span className="semi-wide text-[1.05rem] font-bold text-navy sm:text-[1.15rem]">{f.q}</span>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                      className={`grid size-9 shrink-0 place-items-center rounded-full ${isOpen ? 'bg-azul text-white' : 'bg-navy/5 text-navy'}`}
                    >
                      <Plus className="size-4" strokeWidth={2.6} />
                    </motion.span>
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={panelId}
                      role="region"
                      aria-labelledby={btnId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="max-w-2xl px-6 pb-6 leading-relaxed text-tinta/80">{f.a}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
