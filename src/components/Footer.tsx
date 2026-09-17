import { Mail, MapPin } from 'lucide-react'
import { IMG, NAV, SITE } from '../config/site'
import { waLink } from '../lib/whatsapp'
import { WhatsAppIcon } from './icons/WhatsAppIcon'

export function Footer() {
  const year = new Date().getFullYear()
  const { street, postalCode, city, state } = SITE.address
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${street}, ${postalCode}, ${city} - ${state}`)}`
  return (
    <footer className="relative bg-[#E4F7FE] text-tinta/75">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid gap-10 border-t border-navy/10 py-14 md:grid-cols-[1.2fr_1fr_1fr]">
          <div className="flex items-start gap-4">
            <img src={IMG.logoFrost} alt="MBR Climatização" className="size-20 shrink-0 rounded-2xl ring-1 ring-navy/10 shadow-[0_14px_30px_-16px_rgba(22,182,238,0.8)]" loading="lazy" width={80} height={80} />
            <div>
              <p className="wide text-lg font-extrabold text-navy">MBR Climatização</p>
              <p className="mt-1 max-w-xs text-sm leading-relaxed">
                Instalação, higienização, manutenção e reparo de ar-condicionado. {SITE.region}.
              </p>
              <p className="mt-3 text-sm font-semibold text-ciano-ink">{SITE.tagline}</p>
            </div>
          </div>

          <nav aria-label="Rodapé">
            <p className="text-sm font-bold text-navy">Navegue</p>
            <ul className="mt-4 space-y-2.5 text-sm">
              {NAV.map((n) => (
                <li key={n.id}>
                  <a href={`#${n.id}`} className="transition hover:text-ciano-ink">
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div>
            <p className="text-sm font-bold text-navy">Atendimento</p>
            <a
              href={waLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 inline-flex items-center gap-2.5 text-sm font-semibold text-navy transition hover:text-ciano-ink"
            >
              <WhatsAppIcon className="size-4" />
              {SITE.phoneLabel}
            </a>
            <a
              href={`mailto:${SITE.email}`}
              className="mt-3 flex items-start gap-2.5 break-all text-sm transition hover:text-ciano-ink"
            >
              <Mail className="mt-0.5 size-4 shrink-0" />
              {SITE.email}
            </a>
            <a
              href={mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 flex items-start gap-2.5 text-sm transition hover:text-ciano-ink"
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
                className="mt-3 block text-sm transition hover:text-ciano-ink"
              >
                Facebook
              </a>
            )}
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 border-t border-navy/10 py-6 text-xs sm:flex-row">
          <p>© {year} MBR Climatização. Todos os direitos reservados.</p>
          <p>
            Desenvolvido por{' '}
            {SITE.agency.url ? (
              <a href={SITE.agency.url} target="_blank" rel="noopener noreferrer" className="wide font-extrabold text-navy transition hover:text-ciano-ink">
                {SITE.agency.name}
              </a>
            ) : (
              <span className="wide font-extrabold text-navy">{SITE.agency.name}</span>
            )}
          </p>
        </div>
      </div>
    </footer>
  )
}
