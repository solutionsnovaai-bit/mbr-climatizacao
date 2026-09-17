import { motion } from 'framer-motion'
import { IMG, SITE } from '../config/site'
import { waLink } from '../lib/whatsapp'
import { FrostCorners } from './FrostCorners'
import { WhatsAppIcon } from './icons/WhatsAppIcon'

export function FinalCta() {
  return (
    <section
      id="contato"
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #EAF3FA 0%, #D6F3FD 35%, #BDEBFC 70%, #E4F7FE 100%)' }}
    >
      <FrostCorners size="clamp(160px, 26vw, 360px)" corners={['bl', 'br']} className="opacity-90" />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-[260px] h-[560px] w-[860px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{ background: 'radial-gradient(closest-side, rgba(95,214,255,0.55), rgba(95,214,255,0))' }}
      />
      <div className="relative mx-auto flex max-w-4xl flex-col items-center px-5 pb-28 pt-24 text-center sm:px-8">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, filter: 'blur(12px)' }}
          whileInView={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative w-[min(62vw,300px)]"
        >
          <div className="drift">
            <img
              src={IMG.logoFrost}
              alt="MBR Climatização"
              className="aspect-square w-full rounded-[40px] shadow-[0_40px_80px_-30px_rgba(22,182,238,0.75)] ring-1 ring-white/80"
              loading="lazy"
            />
          </div>
        </motion.div>

        <h2 className="wide mt-12 text-[2.2rem] font-extrabold leading-[1.02] tracking-[-0.02em] text-navy sm:text-[3.6rem]">
          Conta pra gente o que está acontecendo.
        </h2>
        <p className="mt-5 max-w-xl text-[1.05rem] leading-relaxed text-tinta/80">
          Mande uma mensagem com o tipo de aparelho e o problema. A MBR responde pelo WhatsApp com os próximos passos.
        </p>
        <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn-frio mt-9 h-[3.75rem] px-8 text-[1.05rem]">
          <WhatsAppIcon className="size-6" />
          Chamar no WhatsApp
        </a>
        <a href={`tel:+${SITE.phoneDigits}`} className="tabular mt-4 text-sm font-semibold text-tinta/65 transition hover:text-navy">
          ou ligue {SITE.phoneLabel}
        </a>
      </div>
    </section>
  )
}
