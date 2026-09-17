import { useEffect, useRef } from 'react'

// Flocos finos desenhados em canvas. Leve e sem dependências.
export function Snowfall({ count = 46, className = '' }: { count?: number; className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return
    let raf = 0
    let w = 0
    let h = 0
    const dpr = Math.min(window.devicePixelRatio || 1, 2)

    const resize = () => {
      w = canvas.clientWidth
      h = canvas.clientHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    const flakes = Array.from({ length: count }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 0.6 + Math.random() * 2.2,
      vy: 0.15 + Math.random() * 0.5,
      phase: Math.random() * Math.PI * 2,
      a: 0.25 + Math.random() * 0.55,
    }))

    const tick = (t: number) => {
      ctx.clearRect(0, 0, w, h)
      for (const f of flakes) {
        f.y += f.vy
        const x = f.x + Math.sin(t / 1600 + f.phase) * 10
        if (f.y > h + 6) {
          f.y = -6
          f.x = Math.random() * w
        }
        ctx.beginPath()
        ctx.fillStyle = `rgba(255,255,255,${f.a})`
        ctx.shadowColor = 'rgba(150,200,255,0.8)'
        ctx.shadowBlur = 6
        ctx.arc(x, f.y, f.r, 0, Math.PI * 2)
        ctx.fill()
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [count])

  return <canvas ref={ref} aria-hidden className={`pointer-events-none absolute inset-0 h-full w-full ${className}`} />
}
