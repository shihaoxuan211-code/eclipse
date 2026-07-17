import { useState, useCallback, useEffect, useRef } from 'react'
import Hero from '../components/Hero'
import FullscreenMenu from '../components/FullscreenMenu'
import SelectedProjects from '../components/SelectedProjects'
import AboutSection from '../components/AboutSection'
import ContactSection from '../components/ContactSection'
import Footer from '../components/Footer'
import menuStyles from '../components/PersistentMenuButton.module.css'

const WHEEL_THRESHOLD = 40

function Home({ onNavigate }) {
  const [menuOpen, setMenuOpen] = useState(false)
  const [menuDark, setMenuDark] = useState(false)
  const heroRef = useRef(null)
  const projectsRef = useRef(null)
  const aboutRef = useRef(null)
  const contactRef = useRef(null)
  const footerRef = useRef(null)
  const scrollingLocked = useRef(false)

  const openMenu = useCallback(() => setMenuOpen(true), [])
  const closeMenu = useCallback(() => setMenuOpen(false), [])

  // ── Helpers ──────────────────────────────────────────────

  function snapTo(ref) {
    if (!ref.current) return
    scrollingLocked.current = true
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    ref.current.scrollIntoView({
      behavior: prefersReduced.matches ? 'instant' : 'smooth',
      block: 'start',
    })
    const delay = prefersReduced.matches ? 100 : 900
    setTimeout(() => {
      scrollingLocked.current = false
    }, delay)
  }

  /** Section whose visible area inside the viewport is largest. */
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

  // IntersectionObserver to track whether Hero is in view for menu color
  useEffect(() => {
    const heroEl = heroRef.current
    if (!heroEl) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setMenuDark(entry.intersectionRatio < 0.9)
      },
      { threshold: [0, 0.9] }
    )

    observer.observe(heroEl)
    return () => observer.disconnect()
  }, [])

  // ── Snap-scroll wheel handler (single listener) ──────────
  useEffect(() => {
    function handleWheel(event) {
      if (scrollingLocked.current) return

      const delta = event.deltaY
      if (Math.abs(delta) < WHEEL_THRESHOLD) return

      const section = getVisibleSection()
      if (!section) return

      // ── Downward ──────────────────────────────────────────
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
            // else: normal scroll inside chapters
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
            // normal scroll (no preventDefault)
            break
        }
        return
      }

      // ── Upward ────────────────────────────────────────────
      if (delta < 0) {
        switch (section.name) {
          case 'hero':
            // do nothing — already at top
            break

          case 'chapters':
            if (isNearTopOfSection(projectsRef)) {
              event.preventDefault()
              snapTo(heroRef)
            }
            // else: normal scroll inside chapters
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
      <button
        className={`${menuStyles.button} ${menuDark ? menuStyles.dark : ''}`}
        onClick={openMenu}
        type="button"
      >
        Menu
      </button>
      <Hero ref={heroRef} />
      <SelectedProjects ref={projectsRef} />
      <AboutSection ref={aboutRef} />
      <ContactSection ref={contactRef} />
      <Footer ref={footerRef} />
      <FullscreenMenu isOpen={menuOpen} onClose={closeMenu} onNavigate={onNavigate} />
    </main>
  )
}

export default Home