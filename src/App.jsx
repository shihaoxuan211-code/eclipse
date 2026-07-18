import { useState, useCallback, useRef } from 'react'
import './App.css'
import styles from './App.module.css'
import Home from './pages/Home'
import Archive from './pages/Archive'
import ChapterDetail from './pages/ChapterDetail'
import About from './pages/About'
import Contact from './pages/Contact'
import LoadingScreen from './components/LoadingScreen'
import FullscreenMenu from './components/FullscreenMenu'
import GlobalHeader from './components/GlobalHeader'
import CustomCursor from './components/CustomCursor'
import PageTransition from './components/PageTransition'

const PHASE_ENTERING_MS = 550
const PHASE_VISIBLE_MS = 1000
const PHASE_EXITING_MS = 550
const PREPARE_DELAY_MS = 0

function App() {
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState('home')
  const [activeChapterSlug, setActiveChapterSlug] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [phase, setPhase] = useState('idle')
  const [contentState, setContentState] = useState('visible')
  const pendingPageRef = useRef(null)

  const switchPage = useCallback((target) => {
    if (target.startsWith('/archive/')) {
      const slug = target.replace('/archive/', '')
      setActiveChapterSlug(slug)
      setPage('archive-detail')
      return
    }
    switch (target) {
      case 'Home': setPage('home'); break
      case 'Archive': setPage('archive'); break
      case 'About': setPage('about'); break
      case 'Contact': setPage('contact'); break
    }
  }, [])

  const navigate = useCallback((target) => {
    if (typeof target !== 'string') return
    if (phase !== 'idle') return

    pendingPageRef.current = target

    setPhase('preparing')
    setContentState('fading')

    setTimeout(() => { setPhase('entering') }, PREPARE_DELAY_MS)

    setTimeout(() => {
      setPhase('visible')

      // Switch destination page now, behind the opaque panel
      const t = pendingPageRef.current
      if (t) {
        switchPage(t)
        // Allow React to commit the new page layout
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            // Destination has rendered behind the overlay
          })
        })
      }
    }, PREPARE_DELAY_MS + PHASE_ENTERING_MS)

    setTimeout(() => {
      setPhase('exiting')
      setContentState('revealing')
      requestAnimationFrame(() => {
        requestAnimationFrame(() => { setContentState('visible') })
      })
    }, PREPARE_DELAY_MS + PHASE_ENTERING_MS + PHASE_VISIBLE_MS)

    setTimeout(() => {
      setPhase('idle')
      setContentState('visible')
    }, PREPARE_DELAY_MS + PHASE_ENTERING_MS + PHASE_VISIBLE_MS + PHASE_EXITING_MS)
  }, [phase, switchPage])

  const toggleMenu = useCallback(() => setMenuOpen((prev) => !prev), [])
  const closeMenu = useCallback(() => setMenuOpen(false), [])

  const handleEclipseClick = useCallback(() => {
    if (menuOpen) closeMenu()
    navigate('Home')
  }, [menuOpen, closeMenu, navigate])

  // ── All hooks declared before any conditional returns ──

  if (loading) {
    return (
      <>
        <LoadingScreen onComplete={() => setLoading(false)} />
        <CustomCursor />
      </>
    )
  }

  const wrapperClass = [
    styles.content,
    contentState === 'fading' ? styles.fading : '',
    contentState === 'revealing' ? styles.revealing : '',
  ].filter(Boolean).join(' ')

  if (page === 'home') {
    return (
      <>
        <GlobalHeader pageLabel="" onMenuOpen={toggleMenu} onNavigate={handleEclipseClick} />
        <div className={wrapperClass}>
          <Home onNavigate={navigate} />
        </div>
        <PageTransition phase={phase} />
        <CustomCursor />
      </>
    )
  }

  const pageLabel =
    page === 'archive' ? 'Archive'
    : page === 'archive-detail' ? 'Archive'
    : page === 'about' ? 'About'
    : page === 'contact' ? 'Contact'
    : ''

  return (
    <>
      <GlobalHeader pageLabel={pageLabel} onMenuOpen={toggleMenu} onNavigate={handleEclipseClick} />

      <FullscreenMenu isOpen={menuOpen} onClose={closeMenu} onNavigate={(item) => { navigate(item); closeMenu() }} />

      <div className={wrapperClass}>
        {page === 'archive' && <Archive onNavigate={navigate} />}
        {page === 'archive-detail' && (
          <ChapterDetail slug={activeChapterSlug} onNavigate={navigate} />
        )}
        {page === 'about' && <About onNavigate={navigate} />}
        {page === 'contact' && <Contact onNavigate={navigate} />}
      </div>

      <CustomCursor />
      <PageTransition phase={phase} />
    </>
  )
}

export default App