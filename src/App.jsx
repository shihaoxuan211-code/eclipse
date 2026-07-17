import { useState, useCallback } from 'react'
import './App.css'
import Home from './pages/Home'
import Archive from './pages/Archive'
import ChapterDetail from './pages/ChapterDetail'
import About from './pages/About'
import Contact from './pages/Contact'
import LoadingScreen from './components/LoadingScreen'
import FullscreenMenu from './components/FullscreenMenu'
import menuStyles from './components/PersistentMenuButton.module.css'

function App() {
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState('home')
  const [activeChapterSlug, setActiveChapterSlug] = useState(null)
  const [menuOpen, setMenuOpen] = useState(false)

  const navigate = useCallback((target) => {
    if (typeof target !== 'string') return

    // Archive chapter detail (e.g. "/archive/imagined-worlds")
    if (target.startsWith('/archive/')) {
      const slug = target.replace('/archive/', '')
      setActiveChapterSlug(slug)
      setPage('archive-detail')
      return
    }

    // Menu items
    switch (target) {
      case 'Home':
        setPage('home')
        break
      case 'Archive':
        setPage('archive')
        break
      case 'About':
        setPage('about')
        break
      case 'Contact':
        setPage('contact')
        break
    }
  }, [])

  const openMenu = useCallback(() => setMenuOpen(true), [])
  const closeMenu = useCallback(() => setMenuOpen(false), [])

  if (loading) {
    return <LoadingScreen onComplete={() => setLoading(false)} />
  }

  // Home has its own persistent MENU + FullscreenMenu — let it manage both.
  if (page === 'home') {
    return <Home onNavigate={navigate} />
  }

  // All other pages share one persistent MENU button + one FullscreenMenu.
  return (
    <>
      <button
        className={menuStyles.button}
        onClick={openMenu}
        type="button"
      >
        Menu
      </button>

      <FullscreenMenu
        isOpen={menuOpen}
        onClose={closeMenu}
        onNavigate={(item) => {
          navigate(item)
          closeMenu()
        }}
      />

      {page === 'archive' && <Archive onNavigate={navigate} />}
      {page === 'archive-detail' && (
        <ChapterDetail
          slug={activeChapterSlug}
          onNavigate={navigate}
        />
      )}
      {page === 'about' && <About onNavigate={navigate} />}
      {page === 'contact' && <Contact onNavigate={navigate} />}
    </>
  )
}

export default App