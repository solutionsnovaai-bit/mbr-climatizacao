import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export function WordRotator({
  words,
  interval = 2400,
  className = '',
  paused = false,
}: {
  words: string[]
  interval?: number
  className?: string
  paused?: boolean
}) {
  const [i, setI] = useState(0)

  useEffect(() => {
    if (paused) return
    const id = setInterval(() => setI((v) => (v + 1) % words.length), interval)
    return () => clearInterval(id)
  }, [words.length, interval, paused])

  return (
    <span className={`relative inline-grid overflow-hidden align-bottom ${className}`}>
      {/* reserva a largura da maior palavra para o layout não pular */}
      <span aria-hidden className="invisible col-start-1 row-start-1 whitespace-nowrap">
        {words.reduce((a, b) => (b.length > a.length ? b : a), '')}
      </span>
      <span className="sr-only">{words.join(', ')}</span>
      <AnimatePresence mode="popLayout" initial={false}>
        <motion.span
          key={words[i]}
          aria-hidden
          className="col-start-1 row-start-1 whitespace-nowrap"
          initial={{ y: '85%', opacity: 0, filter: 'blur(10px)' }}
          animate={{ y: '0%', opacity: 1, filter: 'blur(0px)' }}
          exit={{ y: '-85%', opacity: 0, filter: 'blur(10px)' }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
