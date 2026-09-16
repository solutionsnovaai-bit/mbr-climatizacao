import { ArrowUpRight } from 'lucide-react'
import { IMG, SERVICES } from '../config/site'
import { waLink } from '../lib/whatsapp'
import { WhatsAppIcon } from './icons/WhatsAppIcon'

export function Services() {
  return (
    <section
      id="servicos"
      className="relative overflow-hidden pb-28 pt-20 sm:pt-28"
      style={{ background: 'linear-gradient(#C9DEF0 0%, #EAF3FA 260px, #EAF3FA 100%)' }}
    >
      <img
        src={IMG.snowflake}
        alt=""
        aria-hidden
        className="drift pointer-events-none absolute -right-16 top-24 w-[340px] opacity-[0.06] blur-[1px]"
      />
      <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <h2 className="wide text-[2.1rem] font-extrabold leading-[1.02] tracking-[-0.02em] text-navy sm:text-[3rem]">
            Ar-condicionado funcionando como deve.
          </h2>
          <p className="mt-5 max-w-md text-[1.05rem] leading-relaxed text-tinta/80">
            Da instalação nova à manutenção de rotina. Aparelho limpo gela melhor, gasta menos energia e dura mais.
          </p>
          <a
            href={waLink('Olá, MBR! Quero falar sobre o meu ar-condicionado.')}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-frio mt-8 h-14 px-6"
          >
            <WhatsAppIcon className="size-5" />
            Falar sobre meu ar-condicionado
          </a>
        </div>

        <ul className="border-t border-navy/12">
          {SERVICES.map((s) => (
            <li key={s.title} className="border-b border-navy/12">
              <a
                href={waLink(`Olá, MBR! ${s.msg}`)}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative -mx-4 flex items-start gap-6 rounded-3xl px-4 py-7 transition-colors duration-500 hover:bg-white/60 sm:py-8"
              >
                <div className="min-w-0 flex-1">
                  <h3 className="semi-wide text-[1.35rem] font-bold text-navy sm:text-[1.6rem]">{s.title}</h3>
                  <p className="mt-2 max-w-xl text-[0.98rem] leading-relaxed text-tinta/75">{s.text}</p>
                </div>
                <span className="mt-1 grid size-11 shrink-0 place-items-center rounded-full border border-navy/15 text-navy transition-all duration-500 group-hover:border-transparent group-hover:bg-azul group-hover:text-white">
                  <ArrowUpRight className="size-5 transition-transform duration-500 group-hover:rotate-45" />
                  <span className="sr-only">Pedir orçamento de {s.title.toLowerCase()} no WhatsApp</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
