import { AnimatePresence, motion } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { IMG, NAV, SITE } from '../config/site'
import { waLink } from '../lib/whatsapp'
import { WhatsAppIcon } from './icons/WhatsAppIcon'

function useActiveSection(ids: string[]) {
  const [active, setActive] = useState<string | null>(null)
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)
        if (visible[0]) setActive(visible[0].target.id)
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.2, 0.5] },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [ids])
  return active
}

const IDS = NAV.map((n) => n.id)

export function Navbar({ ready }: { ready: boolean }) {
  const [scrolled, setScrolled] = useState(false)
  const [pastHero, setPastHero] = useState(false)
  const [open, setOpen] = useState(false)
  const active = useActiveSection(IDS)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 24)
      setPastHero(y > window.innerHeight * 0.55)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.classList.toggle('is-locked', open)
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-50"
        initial={{ y: -30, opacity: 0 }}
        animate={ready ? { y: 0, opacity: 1 } : undefined}
        transition={{ duration: 0.9, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* ---------- desktop: duas cápsulas de vidro, uma de cada lado ---------- */}
        <nav aria-label="Principal" className="hidden items-start justify-between px-[clamp(20px,3vw,48px)] pt-3.5 min-[900px]:flex">
          <div
            className={`glass flex h-[52px] items-center gap-1 rounded-full pl-4 pr-1.5 transition-all duration-500 ${
              scrolled ? 'glass-strong' : ''
            }`}
          >
            <a href="#topo" className="mr-2 flex items-center" aria-label="MBR Climatização, voltar ao início">
              <img src={IMG.wordmark} alt="MBR Climatização" className="h-[26px] w-auto" width={520} height={203} />
            </a>
            <ul className="hidden items-center min-[1180px]:flex">
              {NAV.map((n) => (
                <li key={n.id} className="relative">
                  <a
                    href={`#${n.id}`}
                    className={`relative z-10 block rounded-full px-3.5 py-2 text-[0.84rem] font-semibold transition-colors ${
                      active === n.id ? 'text-white' : 'text-navy/80 hover:text-navy'
                    }`}
                  >
                    {n.label}
                  </a>
                  {active === n.id && (
                    <motion.span
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-full bg-gradient-to-br from-ciano-glow via-ciano to-ciano-600 shadow-[0_8px_20px_-8px_rgba(22,182,238,0.9)]"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                </li>
              ))}
            </ul>
            <button
              type="button"
              onClick={() => setOpen(true)}
              className="grid size-10 place-items-center rounded-full text-navy transition hover:bg-white/70 min-[1180px]:hidden"
              aria-label="Abrir menu"
              aria-expanded={open}
            >
              <Menu className="size-5" />
            </button>
          </div>

          <a
            href={waLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-frio h-[52px] px-5 text-[0.9rem]"
          >
            <WhatsAppIcon className="size-[18px]" />
            <span>{SITE.phoneLabel}</span>
          </a>
        </nav>

        {/* ---------- mobile: só o botão de menu no topo, barra completa depois do hero ---------- */}
        <nav aria-label="Principal" className="flex items-center justify-between px-3 pt-3 min-[900px]:hidden">
          <AnimatePresence>
            {pastHero && (
              <motion.a
                href="#topo"
                aria-label="MBR Climatização, voltar ao início"
                className="glass glass-strong flex h-12 items-center rounded-full px-4"
                initial={{ opacity: 0, x: -12, filter: 'blur(6px)' }}
                animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, x: -12, filter: 'blur(6px)' }}
                transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              >
                <img src={IMG.wordmark} alt="MBR Climatização" className="h-[22px] w-auto" width={520} height={203} />
              </motion.a>
            )}
          </AnimatePresence>
          <button
            type="button"
            onClick={() => setOpen(true)}
            className={`glass ml-auto grid size-12 place-items-center rounded-full text-navy ${pastHero ? 'glass-strong' : ''}`}
            aria-label="Abrir menu"
            aria-expanded={open}
          >
            <Menu className="size-5" />
          </button>
        </nav>
      </motion.header>

      {/* ---------- menu em tela cheia ---------- */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[60] overflow-y-auto"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
          >
            <div
              className="absolute inset-0 backdrop-blur-2xl"
              style={{ background: 'radial-gradient(120% 90% at 50% 0%, rgba(246,250,253,0.96), rgba(201,225,244,0.97))' }}
              onClick={() => setOpen(false)}
            />
            <div className="relative mx-auto flex min-h-full max-w-lg flex-col px-6 pb-10 pt-4">
              <div className="flex items-center justify-between">
                <img src={IMG.wordmark} alt="MBR Climatização" className="h-7 w-auto" width={520} height={203} />
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="glass grid size-12 place-items-center rounded-full text-navy"
                  aria-label="Fechar menu"
                  autoFocus
                >
                  <X className="size-5" />
                </button>
              </div>

              <motion.img
                src={IMG.logo}
                alt=""
                aria-hidden
                className="mx-auto mt-8 w-[min(58vw,230px)]"
                initial={{ opacity: 0, scale: 0.9, filter: 'blur(10px)' }}
                animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
                transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              />

              <ul className="mt-8 space-y-1">
                {NAV.map((n, i) => (
                  <motion.li
                    key={n.id}
                    initial={{ opacity: 0, y: 14 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.08 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <a
                      href={`#${n.id}`}
                      onClick={() => setOpen(false)}
                      className="wide flex items-center justify-between border-b border-navy/10 py-4 text-[1.35rem] font-extrabold text-navy"
                    >
                      {n.label}
                    </a>
                  </motion.li>
                ))}
              </ul>

              <a
                href={waLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-frio mt-auto h-14 w-full text-base"
                style={{ marginTop: 32 }}
              >
                <WhatsAppIcon className="size-5" />
                Chamar no WhatsApp
              </a>
              <p className="mt-3 text-center text-sm text-tinta/70">{SITE.phoneLabel}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
