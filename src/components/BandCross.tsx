import { Snowflake } from 'lucide-react'
import { IMG } from '../config/site'
import { Marquee } from './Marquee'

const WORDS = ['Instalação', 'Manutenção', 'Conserto', 'Higienização', 'Câmara fria', 'Freezer', 'Geladeira', 'Carga de gás']

// Duas faixas cruzadas logo abaixo do hero.
export function BandCross() {
  return (
    <div className="relative z-10 -mt-px h-[150px] overflow-hidden sm:h-[170px]" style={{ background: 'linear-gradient(#B8D3EA, #C9DEF0)' }}>
      <div className="absolute inset-x-[-5%] top-1/2 -translate-y-1/2 rotate-[2.2deg]">
        <Marquee
          reverse
          speed={60}
          className="glass glass-strong py-3"
          trackClassName="gap-10 pr-10"
          items={[
            <img key="w" src={IMG.wordmark} alt="" className="h-7 w-auto opacity-90" width={520} height={203} />,
            <span key="t" className="text-[0.95rem] font-semibold text-navy/70">Climatização e refrigeração</span>,
          ]}
        />
      </div>
      <div className="absolute inset-x-[-5%] top-1/2 -translate-y-1/2 -rotate-[2.2deg] shadow-[0_20px_40px_-20px_rgba(1,38,90,0.55)]">
        <Marquee
          speed={42}
          className="py-3.5"
          trackClassName="gap-7 pr-7"
          items={WORDS.map((w) => (
            <span key={w} className="wide text-[1.05rem] font-extrabold uppercase tracking-[0.04em] text-white sm:text-[1.2rem]">
              {w}
            </span>
          ))}
          separator={<Snowflake className="size-4 text-azul-glow" strokeWidth={2.4} />}
        />
        <div aria-hidden className="absolute inset-0 -z-10" style={{ background: 'linear-gradient(90deg, #01265a, #0a4fb0 50%, #01265a)' }} />
      </div>
    </div>
  )
}
