import { motion } from 'framer-motion'
import { IMG } from '../config/site'

type Props = {
  className?: string
  size?: string
  animate?: boolean
  delay?: number
  corners?: Array<'tl' | 'tr' | 'bl' | 'br'>
}

const POS = {
  tl: 'left-0 top-0',
  tr: 'right-0 top-0',
  bl: 'left-0 bottom-0',
  br: 'right-0 bottom-0',
} as const

const ORIGIN = { tl: '0% 0%', tr: '100% 0%', bl: '0% 100%', br: '100% 100%' } as const

// Geada real recortada da arte da marca, aplicada nos cantos.
export function FrostCorners({ className = '', size = 'clamp(160px, 30vw, 420px)', animate = false, delay = 0, corners = ['tl', 'tr', 'bl', 'br'] }: Props) {
  return (
    <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      {corners.map((c, i) => (
        <motion.img
          key={c}
          src={IMG.frost[c]}
          alt=""
          draggable={false}
          className={`absolute ${POS[c]} select-none`}
          style={{ width: size, height: size, transformOrigin: ORIGIN[c] }}
          initial={animate ? { opacity: 0, scale: 0.6, filter: 'blur(8px)' } : false}
          animate={animate ? { opacity: 1, scale: 1, filter: 'blur(0px)' } : undefined}
          transition={{ duration: 1.6, delay: delay + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
        />
      ))}
    </div>
  )
}
