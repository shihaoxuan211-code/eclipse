import { useEffect, useRef, useCallback, useState } from 'react'
import styles from './GlobalHeader.module.css'

const LETTERS = [
  { char: 'E', special: false },
  { char: 'C', special: true },
  { char: 'L', special: false },
  { char: 'I', special: false },
  { char: 'P', special: false },
  { char: 'S', special: false },
  { char: 'E', special: false },
]

export default function GlobalHeader({ pageLabel, onMenuOpen, onNavigate, light = false }) {
  const [eclipseDone, setEclipseDone] = useState(false)
  const wordmarkRef = useRef(null)
  const tickingRef = useRef(false)

  // ── Eclipse entrance (once per session) ──
  useEffect(() => {
    const played = sessionStorage.getItem('eclipse-intro-played')
    if (played) {
      setEclipseDone(true)
      return
    }
    const timer = setTimeout(() => {
      setEclipseDone(true)
      sessionStorage.setItem('eclipse-intro-played', '1')
    }, 2200)
    return () => clearTimeout(timer)
  }, [])

  // ── Scroll → gradient position ──
  const updateScroll = useCallback(() => {
    if (!wordmarkRef.current) return
    const sh = document.documentElement.scrollHeight - window.innerHeight
    if (sh <= 0) {
      wordmarkRef.current.style.setProperty('--gradient-position', '0%')
      return
    }
    const p = Math.max(0, Math.min(1, window.scrollY / sh))
    // 0 → 0%, 0.5 → 100%, 1 → 200%
    wordmarkRef.current.style.setProperty('--gradient-position', `${p * 200}%`)
  }, [])

  useEffect(() => {
    function onScroll() {
      if (!tickingRef.current) {
        requestAnimationFrame(() => {
          updateScroll()
          tickingRef.current = false
        })
        tickingRef.current = true
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    updateScroll()
    return () => window.removeEventListener('scroll', onScroll)
  }, [updateScroll])

  const reducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches

  return (
    <header className={`${styles.header} ${light ? styles.headerLight : ''}`}>
      <div className={`${styles.side} ${light ? styles.light : ''}`}>{pageLabel}</div>

      {/* ── ECLIPSE brand ── */}
      <button
        className={`${styles.brandWrapper} ${eclipseDone ? styles.eclipseDone : ''} ${reducedMotion ? styles.reducedMotion : ''}`}
        onClick={() => onNavigate?.('Home')}
        type="button"
        aria-label="Return to homepage"
      >
        {/* Red layer (underneath, visible during eclipse entrance) */}
        <span className={styles.redLayer} aria-hidden="true">
          {LETTERS.map((l, i) => (
            <span key={i} className={`${styles.letter} ${l.special ? styles.letterEclipse : ''}`}>
              {l.char}
            </span>
          ))}
        </span>

        {/* Black/gradient layer — visible through background-clip: text */}
        <span
          className={`${styles.gradientLayer} ${reducedMotion ? styles.gradientStatic : ''}`}
          ref={wordmarkRef}
          style={{ '--gradient-position': '0%' }}
        >
          {LETTERS.map((l, i) => (
            <span
              key={i}
              className={`${styles.letter} ${l.special ? styles.letterEclipse : ''}`}
            >
              {l.char}
            </span>
          ))}
        </span>

        <span className={styles.srOnly}>ECLIPSE</span>
      </button>

      <button
        className={`${styles.menuBtn} ${light ? styles.light : ''}`}
        onClick={onMenuOpen}
        type="button"
      >
        MENU
      </button>
    </header>
  )
}