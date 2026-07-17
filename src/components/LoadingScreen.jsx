import { useState, useEffect, useCallback, useRef } from 'react'
import styles from './LoadingScreen.module.css'

export default function LoadingScreen({ onComplete }) {
  const [fadingOut, setFadingOut] = useState(false)
  const onCompleteRef = useRef(onComplete)

  useEffect(() => {
    onCompleteRef.current = onComplete
  }, [onComplete])

  const handleTransitionEnd = useCallback(() => {
    if (fadingOut && onCompleteRef.current) {
      onCompleteRef.current()
    }
  }, [fadingOut])

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadingOut(true)
    }, 1800)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div
      className={`${styles.overlay} ${fadingOut ? styles.overlayHidden : ''}`}
      onTransitionEnd={handleTransitionEnd}
    >
      <div className={styles.logoPlaceholder}>Logo</div>
      <p className={styles.subtitle}>Photography 2026</p>
    </div>
  )
}
