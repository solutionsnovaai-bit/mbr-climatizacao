export function preloadImage(src: string) {
  return new Promise<void>((resolve) => {
    const img = new Image()
    img.decoding = 'async'
    img.onload = () => {
      if ('decode' in img) img.decode().then(() => resolve(), () => resolve())
      else resolve()
    }
    img.onerror = () => resolve()
    img.src = src
  })
}

export function wait(ms: number) {
  return new Promise<void>((r) => setTimeout(r, ms))
}
