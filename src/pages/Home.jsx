import { useState, useCallback, useEffect, useRef } from 'react'
import Hero from '../components/Hero'
import FullscreenMenu from '../components/FullscreenMenu'
import GlobalHeader from '../components/GlobalHeader'
import SelectedProjects from '../components/SelectedProjects'
import AboutSection from '../components/AboutSection'
import ContactSection from '../components/ContactSection'
import Footer from '../components/Footer'

const WHEEL_THRESHOLD = 40

function Home({ onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const heroRef = useRef(null)
  const projectsRef = useRef(null)
  const aboutRef = useRef(null)
  const contactRef = useRef(null)
  const footerRef = useRef(null)
  const scrollingLocked = useRef(false)

  const openMenu = useCallback(() => setMenuOpen(true), [])
  const closeMenu = useCallback(() => setMenuOpen(false), [])

  function snapTo(ref) {
    if (!ref.current) return
    scrollingLocked.current = true
    const prefersReduced = window.matchMedia(
      '(prefers-reduced-motion: reduce)',
    )
    ref.current.scrollIntoView({
      behavior: prefersReduced.matches ? 'instant' : 'smooth',
      block: 'start',
    })
    const delay = prefersReduced.matches ? 100 : 900
    setTimeout(() => {
      scrollingLocked.current = false
    }, delay)
  }

  function getVisibleSection() {
    const sections = [
      { name: 'hero', ref: heroRef },
      { name: 'chapters', ref: projectsRef },
      { name: 'about', ref: aboutRef },
      { name: 'contact', ref: contactRef },
      { name: 'footer', ref: footerRef },
    ]

    let best = null
    let bestArea = 0

    for (const s of sections) {
      const el = s.ref.current
      if (!el) continue
      const rect = el.getBoundingClientRect()
      const visibleTop = Math.max(0, rect.top)
      const visibleBottom = Math.min(window.innerHeight, rect.bottom)
      const visibleHeight = Math.max(0, visibleBottom - visibleTop)
      if (visibleHeight > bestArea) {
        bestArea = visibleHeight
        best = s
      }
    }

    return best
  }

  function isNearTopOfSection(ref, tolerance = 24) {
    const el = ref.current
    if (!el) return false
    const rect = el.getBoundingClientRect()
    return rect.top >= -tolerance && rect.top <= tolerance
  }

  function isNearBottomOfSection(ref, tolerance = 24) {
    const el = ref.current
    if (!el) return false
    const rect = el.getBoundingClientRect()
    return rect.bottom <= window.innerHeight + tolerance
  }

  // Track whether hero is in view for header light mode
  const [headerLight, setHeaderLight] = useState(true)

  useEffect(() => {
    const heroEl = heroRef.current
    if (!heroEl) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setHeaderLight(entry.intersectionRatio < 0.9)
      },
      { threshold: [0, 0.9] },
    )

    observer.observe(heroEl)
    return () => observer.disconnect()
  }, [])

  // Snap-scroll wheel handler
  useEffect(() => {
    function handleWheel(event) {
      if (scrollingLocked.current) return

      const delta = event.deltaY
      if (Math.abs(delta) < WHEEL_THRESHOLD) return

      const section = getVisibleSection()
      if (!section) return

      if (delta > 0) {
        switch (section.name) {
          case 'hero':
            event.preventDefault()
            snapTo(projectsRef)
            break
          case 'chapters':
            if (isNearBottomOfSection(projectsRef)) {
              event.preventDefault()
              snapTo(aboutRef)
            }
            break
          case 'about':
            event.preventDefault()
            snapTo(contactRef)
            break
          case 'contact':
            event.preventDefault()
            snapTo(footerRef)
            break
          case 'footer':
            break
        }
        return
      }

      if (delta < 0) {
        switch (section.name) {
          case 'hero':
            break
          case 'chapters':
            if (isNearTopOfSection(projectsRef)) {
              event.preventDefault()
              snapTo(heroRef)
            }
            break
          case 'about':
            event.preventDefault()
            snapTo(projectsRef)
            break
          case 'contact':
            event.preventDefault()
            snapTo(aboutRef)
            break
          case 'footer':
            event.preventDefault()
            snapTo(contactRef)
            break
        }
        return
      }
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    return () => window.removeEventListener('wheel', handleWheel)
  }, [])

  return (
    <main>
      <GlobalHeader
        pageLabel=""
        onMenuOpen={openMenu}
        onNavigate={onNavigate}
        light={headerLight}
      />

      <Hero ref={heroRef} />
      <SelectedProjects ref={projectsRef} onNavigate={onNavigate} />
      <AboutSection ref={aboutRef} />
      <ContactSection ref={contactRef} />
      <Footer ref={footerRef} />
      <FullscreenMenu
        isOpen={menuOpen}
        onClose={closeMenu}
        onNavigate={onNavigate}
      />
    </main>
  )
}

export default Home