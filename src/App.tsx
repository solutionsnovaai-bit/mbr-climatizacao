import { AnimatePresence } from 'framer-motion'
import { useCallback, useEffect, useState } from 'react'
import { BandCross } from './components/BandCross'
import { BrandMoment } from './components/BrandMoment'
import { BtuCalculator } from './components/BtuCalculator'
import { Diagnostic } from './components/Diagnostic'
import { Faq } from './components/Faq'
import { FinalCta } from './components/FinalCta'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Navbar } from './components/Navbar'
import { Preloader } from './components/Preloader'
import { Process } from './components/Process'
import { Seo } from './components/Seo'
import { Services } from './components/Services'
import { WhatsAppFab } from './components/WhatsAppFab'
import { usePrefersReducedMotion } from './hooks/useReducedMotion'

export default function App() {
  const reduced = usePrefersReducedMotion()
  const [loading, setLoading] = useState(true)
  const [ready, setReady] = useState(false)

  useEffect(() => {
    document.body.classList.toggle('is-locked', loading)
    if (loading) window.scrollTo(0, 0)
  }, [loading])

  const finish = useCallback(() => {
    setLoading(false)
    // o conteúdo entra enquanto a tela de load se dissolve
    setTimeout(() => setReady(true), reduced ? 0 : 260)
  }, [reduced])

  return (
    <>
      <Seo />
      <AnimatePresence>{loading && <Preloader key="loader" onFinish={finish} reduced={reduced} />}</AnimatePresence>

      <Navbar ready={ready} />
      <main>
        <Hero ready={ready} />
        <BandCross />
        <Services />
        <BtuCalculator />
        <Diagnostic />
        <Process />
        <BrandMoment />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <WhatsAppFab ready={ready} />
    </>
  )
}
