import { motion, useScroll, useSpring } from 'framer-motion'
import { useRef } from 'react'
import { STEPS } from '../config/site'

export function Process() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 80%', 'end 60%'] })
  const fill = useSpring(scrollYProgress, { stiffness: 120, damping: 30 })

  return (
    <section id="como-funciona" className="relative bg-gelo-100 pb-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="glass relative overflow-hidden rounded-[40px] px-6 py-14 sm:px-12 sm:py-16">
          <h2 className="wide max-w-2xl text-[2.1rem] font-extrabold leading-[1.02] tracking-[-0.02em] text-navy sm:text-[3rem]">
            Do primeiro oi ao frio de volta.
          </h2>

          <div ref={ref} className="relative mt-14">
            {/* trilho que "congela" conforme a rolagem */}
            <div aria-hidden className="absolute left-[22px] top-0 h-full w-[3px] rounded-full bg-navy/10 lg:left-0 lg:top-[22px] lg:h-[3px] lg:w-full">
              <motion.div
                className="frost-line h-full w-full origin-top rounded-full lg:hidden"
                style={{ scaleY: fill }}
              />
              <motion.div
                className="frost-line hidden h-full w-full origin-left rounded-full lg:block"
                style={{ scaleX: fill }}
              />
            </div>

            <ol className="grid gap-10 lg:grid-cols-4 lg:gap-8">
              {STEPS.map((s, i) => (
                <li key={s.title} className="relative flex gap-5 lg:block">
                  <span className="wide relative z-10 grid size-[46px] shrink-0 place-items-center rounded-full bg-navy text-[1.05rem] font-extrabold text-white shadow-[0_0_0_6px_rgba(241,247,252,1)]">
                    {i + 1}
                  </span>
                  <div className="lg:mt-7">
                    <h3 className="semi-wide text-[1.25rem] font-bold text-navy">{s.title}</h3>
                    <p className="mt-2 leading-relaxed text-tinta/75">{s.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  )
}
