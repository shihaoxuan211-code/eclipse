import { useEffect, useRef, useState } from 'react'
import styles from './LoadingScreen.module.css'

const ENTER_MS = 500
const HOLD_MS = 1000
const EXIT_MS = 500

export default function LoadingScreen({ onComplete }) {
  const [stage, setStage] = useState('entering')
  const onCompleteRef = useRef(onComplete)

  useEffect(() => {
    onCompleteRef.current = onComplete
  }, [onComplete])

  useEffect(() => {
    // Stage 0: remove entering class → CSS fades from opacity 0→1 over ENTER_MS
    const t0 = setTimeout(() => setStage('holding'), 0)

    // Stage 1: hold for ENTER_MS + HOLD_MS, then begin exit
    const t1 = setTimeout(() => setStage('fadingOut'), ENTER_MS + HOLD_MS)

    // Stage 2: exit finishes after EXIT_MS, call onComplete via timer (not transitionend)
    const t2 = setTimeout(() => {
      if (onCompleteRef.current) onCompleteRef.current()
    }, ENTER_MS + HOLD_MS + EXIT_MS)

    return () => { clearTimeout(t0); clearTimeout(t1); clearTimeout(t2) }
  }, [])

  return (
    <div
      className={`${styles.overlay} ${stage === 'fadingOut' ? styles.overlayHidden : ''} ${stage === 'entering' ? styles.entering : ''}`}
    >
      <span className={styles.brand}>ECLIPSE</span>
      <p className={styles.subtitle}>Photography 2026</p>
    </div>
  )
}