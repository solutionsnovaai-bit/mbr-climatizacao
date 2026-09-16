import type { ReactNode } from 'react'
import { Fragment } from 'react'

type Props = {
  items: ReactNode[]
  separator?: ReactNode
  speed?: number
  reverse?: boolean
  className?: string
  trackClassName?: string
  repeat?: number
}

// Faixa infinita. O conteúdo é duplicado para o loop não ter emenda.
export function Marquee({ items, separator, speed = 38, reverse = false, className = '', trackClassName = '', repeat = 3 }: Props) {
  const half = Array.from({ length: repeat }, () => items).flat()
  const renderHalf = (hidden: boolean) => (
    <div className={`flex shrink-0 items-center ${trackClassName}`} data-copy={hidden ? '2' : '1'}>
      {half.map((it, i) => (
        <Fragment key={i}>
          <span className="shrink-0">{it}</span>
          {separator ? <span className="shrink-0">{separator}</span> : null}
        </Fragment>
      ))}
    </div>
  )
  return (
    <div aria-hidden className={`marquee relative overflow-hidden ${className}`}>
      <div className={`marquee-track ${reverse ? 'reverse' : ''}`} style={{ ['--marquee-speed' as string]: `${speed}s` }}>
        {renderHalf(false)}
        {renderHalf(true)}
      </div>
    </div>
  )
}
