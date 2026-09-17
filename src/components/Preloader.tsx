import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { IMG } from '../config/site'
import { preloadImage, wait } from '../lib/preload'
import { FrostCorners } from './FrostCorners'
import { Snowfall } from './Snowfall'

const START_TEMP = 32
const END_TEMP = 18
const MIN_TIME = 2800
const MAX_TIME = 7000

function heroSrc() {
  const desktop = window.matchMedia('(min-width: 900px) and (min-aspect-ratio: 6/5)').matches
  return desktop ? IMG.heroDesktop : IMG.heroMobile
}

export function Preloader({ onFinish, reduced }: { onFinish: () => void; reduced: boolean }) {
  const [progress, setProgress] = useState(0)
  const [ready, setReady] = useState(false)
  const readyRef = useRef(false)
  const finished = useRef(false)

  // espera logo, hero e fontes (com teto de tempo)
  useEffect(() => {
    const minTime = reduced ? 500 : MIN_TIME
    const assets = Promise.all([
      preloadImage(IMG.logo),
      preloadImage(heroSrc()),
      document.fonts ? document.fonts.ready.then(() => undefined) : Promise.resolve(),
    ])
    Promise.race([Promise.all([assets, wait(minTime)]), wait(MAX_TIME)]).then(() => {
      readyRef.current = true
      setReady(true)
    })
  }, [reduced])

  // termômetro: desce de 32 °C até 18 °C
  useEffect(() => {
    let raf = 0
    const t0 = performance.now()
    const dur = reduced ? 450 : MIN_TIME - 350
    const loop = (now: number) => {
      const raw = Math.min((now - t0) / dur, 1)
      const eased = 1 - Math.pow(1 - raw, 3)
      const cap = readyRef.current ? 1 : 0.94
      setProgress((p) => {
        const target = Math.min(eased, cap)
        return readyRef.current && raw >= 1 ? Math.min(1, p + 0.04) : Math.max(p, target)
      })
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [reduced])

  useEffect(() => {
    if (ready && progress >= 1 && !finished.current) {
      finished.current = true
      const t = setTimeout(onFinish, reduced ? 50 : 420)
      return () => clearTimeout(t)
    }
  }, [ready, progress, onFinish, reduced])

  const temp = Math.round(START_TEMP - (START_TEMP - END_TEMP) * progress)
  const done = progress >= 1

  return (
    <motion.div
      role="status"
      aria-live="polite"
      aria-label="Carregando o site da MBR Climatização"
      className="fixed inset-0 z-[100] grid place-items-center overflow-hidden"
      style={{
        background:
          'radial-gradient(120% 80% at 50% 42%, #f8fcfe 0%, #e2f4fc 45%, #c6e6f6 100%)',
      }}
      exit={
        reduced
          ? { opacity: 0, transition: { duration: 0.2 } }
          : {
              opacity: 0,
              scale: 1.06,
              filter: 'blur(18px)',
              transition: { duration: 0.9, ease: [0.65, 0, 0.35, 1] },
            }
      }
    >
      <FrostCorners animate={!reduced} size="clamp(180px, 34vw, 460px)" />
      {!reduced && <Snowfall count={42} />}
      <div className="grain absolute inset-0" />

      <div className="relative flex flex-col items-center px-6">
        {/* halo frio atrás do logo */}
        <motion.div
          aria-hidden
          className="absolute left-1/2 top-[38%] h-[70%] w-[120%] -translate-x-1/2 -translate-y-1/2 rounded-full"
          style={{ background: 'radial-gradient(closest-side, rgba(22,182,238,0.28), rgba(22,182,238,0))' }}
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, ease: [0.22, 1, 0.36, 1] }}
        />

        <div className="relative w-[min(70vw,380px)]" style={{ aspectRatio: '1063 / 943' }}>
          <motion.img
            src={IMG.logo}
            alt="MBR Climatização"
            draggable={false}
            className="absolute inset-0 h-full w-full select-none drop-shadow-[0_30px_40px_rgba(11,58,110,0.18)]"
            initial={reduced ? false : { opacity: 0, scale: 1.08, filter: 'blur(16px)', clipPath: 'inset(100% 0% 0% 0%)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)', clipPath: 'inset(0% 0% 0% 0%)' }}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          />
          {!reduced && (
            <motion.div
              aria-hidden
              className="logo-shine absolute inset-0"
              initial={{ backgroundPosition: '100% 0%' }}
              animate={{ backgroundPosition: ['100% 0%', '0% 0%'] }}
              transition={{ duration: 1.3, delay: 1.25, ease: [0.45, 0, 0.2, 1], repeat: 1, repeatDelay: 0.6 }}
            />
          )}
        </div>

        <motion.div
          className="mt-8 flex flex-col items-center"
          initial={reduced ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="wide tabular flex items-start font-extrabold leading-none text-navy">
            <span className="text-[44px] sm:text-[52px]">{temp}</span>
            <span className="ml-1 mt-1 text-lg text-ciano-ink sm:text-xl">°C</span>
          </div>
          <div className="mt-4 h-[3px] w-[min(62vw,240px)] overflow-hidden rounded-full bg-navy/10">
            <div
              className="frost-line h-full origin-left rounded-full"
              style={{ transform: `scaleX(${progress})` }}
            />
          </div>
          <p className="mt-3 text-sm font-medium text-tinta/70">
            {done ? 'Temperatura ideal' : 'Ajustando o clima'}
          </p>
        </motion.div>
      </div>
    </motion.div>
  )
}
