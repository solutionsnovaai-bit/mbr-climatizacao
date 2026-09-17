import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { waLink } from '../lib/whatsapp'
import { WhatsAppIcon } from './icons/WhatsAppIcon'

export function WhatsAppFab({ ready }: { ready: boolean }) {
  const [hint, setHint] = useState(false)

  useEffect(() => {
    if (!ready) return
    const show = setTimeout(() => setHint(true), 5000)
    const hide = setTimeout(() => setHint(false), 11000)
    return () => {
      clearTimeout(show)
      clearTimeout(hide)
    }
  }, [ready])

  return (
    <AnimatePresence>
      {ready && (
        <motion.div
          className="fixed bottom-[max(18px,env(safe-area-inset-bottom))] right-[18px] z-40 flex items-center gap-3 sm:bottom-7 sm:right-7"
          initial={{ opacity: 0, scale: 0.4, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 1 }}
        >
          <AnimatePresence>
            {hint && (
              <motion.span
                className="glass glass-strong hidden rounded-full px-4 py-2 text-sm font-semibold text-navy sm:block"
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
              >
                Fale com a MBR
              </motion.span>
            )}
          </AnimatePresence>
          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Conversar com a MBR Climatização no WhatsApp"
            className="group relative grid size-[62px] place-items-center rounded-full text-white"
            onMouseEnter={() => setHint(true)}
            onMouseLeave={() => setHint(false)}
          >
            <span aria-hidden className="pulse-ring absolute inset-0 rounded-full bg-ciano-glow/50" />
            <span
              aria-hidden
              className="absolute inset-0 rounded-full transition-transform duration-500 group-hover:scale-105"
              style={{
                background: 'linear-gradient(145deg, #7ae2ff 0%, #1cb8f0 45%, #0a94d6 100%)',
                boxShadow:
                  'inset 0 2px 0 rgba(255,255,255,0.6), inset 0 -10px 18px -8px rgba(0,80,140,0.35), 0 18px 36px -12px rgba(22,182,238,0.9), 0 0 0 4px rgba(234,249,254,0.7)',
              }}
            />
            <span aria-hidden className="absolute inset-x-3 top-1.5 h-5 rounded-full bg-gradient-to-b from-white/45 to-white/0" />
            <WhatsAppIcon className="relative size-[30px] drop-shadow-[0_2px_4px_rgba(0,70,120,0.35)]" />
          </a>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
