import { Mail, MapPin } from 'lucide-react'
import { IMG, NAV, SITE } from '../config/site'
import { waLink } from '../lib/whatsapp'
import { WhatsAppIcon } from './icons/WhatsAppIcon'

export function Footer() {
  const year = new Date().getFullYear()
  const { street, postalCode, city, state } = SITE.address
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${street}, ${postalCode}, ${city} - ${state}`)}`
  return (
    <footer className="relative bg-navy-900 text-white/70">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 border-t border-white/10 py-14 md:grid-cols-[1.2fr_1fr_1fr]">
          <div className="flex items-start gap-4">
            <img src={IMG.logoFrost} alt="MBR Climatização" className="size-20 shrink-0 rounded-2xl ring-1 ring-white/15" loading="lazy" width={80} height={80} />
            <div>
              <p className="wide text-lg font-extrabold text-white">MBR Climatização</p>
              <p className="mt-1 max-w-xs text-sm leading-relaxed">
                Instalação, higienização, manutenção e reparo de ar-condicionado e refrigeração. {SITE.region}.
              </p>
              <p className="mt-3 text-sm font-semibold text-azul-glow">{SITE.tagline}</p>
            </div>
          </div>

          <nav aria-label="Rodapé">
            <p className="text-sm font-bold text-white">Navegue</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {NAV.map((n) => (
                <li key={n.id}>
                  <a href={`#${n.id}`} className="transition hover:text-white">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-sm font-bold text-white">Atendimento</p>
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2.5 text-sm font-semibold text-white transition hover:text-azul-glow"
            >
              <WhatsAppIcon className="size-4" />
              {SITE.phoneLabel}
            </a>
            <a
              href={`mailto:${SITE.email}`}
              className="mt-3 flex items-start gap-2.5 break-all text-sm transition hover:text-white"
            >
              <Mail className="mt-0.5 size-4 shrink-0" />
              {SITE.email}
            </a>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex items-start gap-2.5 text-sm transition hover:text-white"
            >
              <MapPin className="mt-0.5 size-4 shrink-0" />
              <span>
                {street}
                <br />
                {postalCode}, {city} - {state}
              </span>
            </a>
            {SITE.facebook && (
              <a
                href={SITE.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 block text-sm transition hover:text-white"
              >
                Facebook
              </a>
            )}
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-white/10 py-6 text-xs sm:flex-row">
          <p>© {year} MBR Climatização. Todos os direitos reservados.</p>
          <p>
            Desenvolvido por{' '}
            {SITE.agency.url ? (
              <a href={SITE.agency.url} target="_blank" rel="noopener noreferrer" className="wide font-extrabold text-white transition hover:text-azul-glow">
                {SITE.agency.name}
              </a>
            ) : (
              <span className="wide font-extrabold text-white">{SITE.agency.name}</span>
            )}
          </p>
        </div>
      </div>
    </footer>
  )
}
