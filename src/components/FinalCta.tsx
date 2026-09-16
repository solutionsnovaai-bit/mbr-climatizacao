import { motion } from 'framer-motion'
import { IMG, SITE } from '../config/site'
import { waLink } from '../lib/whatsapp'
import { WhatsAppIcon } from './icons/WhatsAppIcon'
import { Snowfall } from './Snowfall'

export function FinalCta() {
  return (
    <section
      id="contato"
      className="relative overflow-hidden text-white"
      style={{ background: 'linear-gradient(180deg, #EAF3FA 0px, #8FB6DC 110px, #1B4C86 240px, #061C42 380px, #04132E 520px)' }}
    >
      <Snowfall count={30} className="opacity-60" />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[520px] h-[620px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: 'radial-gradient(closest-side, rgba(30,140,245,0.35), rgba(30,140,245,0))' }}
      />
      <div className="relative mx-auto flex max-w-4xl flex-col items-center px-5 pb-24 pt-[240px] text-center sm:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, filter: 'blur(12px)' }}
          whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-[min(62vw,300px)]"
        >
          <div className="drift">
          <img
            src={IMG.logoFrost}
            alt="MBR Climatização"
            className="aspect-square w-full rounded-[40px] shadow-[0_40px_90px_-30px_rgba(30,140,245,0.65)] ring-1 ring-white/30"
            loading="lazy"
          />
          </div>
        </motion.div>

        <h2 className="wide mt-12 text-[2.2rem] font-extrabold leading-[1.02] tracking-[-0.02em] sm:text-[3.6rem]">
          Conta pra gente o que está acontecendo.
        </h2>
        <p className="mt-5 max-w-xl text-[1.05rem] leading-relaxed text-white/70">
          Mande uma mensagem com o equipamento e o problema. A MBR responde pelo WhatsApp com os próximos passos.
        </p>
        <a
          href={waLink()}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-frio mt-9 h-[3.75rem] px-8 text-[1.05rem]"
        >
          <WhatsAppIcon className="size-6" />
          Chamar no WhatsApp
        </a>
        <a href={`tel:+${SITE.phoneDigits}`} className="tabular mt-4 text-sm font-semibold text-white/60 transition hover:text-white">
          ou ligue {SITE.phoneLabel}
        </a>
      </div>
    </section>
  )
}
