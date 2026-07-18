import { useEffect, useRef, useState, useCallback } from 'react'
import styles from './CustomCursor.module.css'

const LABEL_MAP = {
  img: 'VIEW',
  video: 'PLAY',
  a: 'ENTER',
  button: 'OPEN',
}

function getLabel(el) {
  while (el && el !== document.body) {
    const tag = el.tagName?.toLowerCase()
    if (tag === 'img') return LABEL_MAP.img
    if (tag === 'video') return LABEL_MAP.video
    if (tag === 'a') return LABEL_MAP.a
    if (tag === 'button') return LABEL_MAP.button
    if (el.dataset?.cursorLabel) return el.dataset.cursorLabel
    el = el.parentElement
  }
  return null
}

export default function CustomCursor() {
  const [visible, setVisible] = useState(false)
  const [label, setLabel] = useState(null)
  const [hover, setHover] = useState(false)
  const posRef = useRef({ x: -100, y: -100 })
  const frameRef = useRef(null)
  const cursorRef = useRef(null)

  const isTouch = typeof window !== 'undefined' && 'ontouchstart' in window

  const animate = useCallback(() => {
    if (cursorRef.current) {
      cursorRef.current.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0)`
    }
    frameRef.current = requestAnimationFrame(animate)
  }, [])

  useEffect(() => {
    if (isTouch) return

    let raf = requestAnimationFrame(animate)

    function onMove(e) {
      posRef.current = { x: e.clientX, y: e.clientY }
      if (!visible) setVisible(true)

      const lbl = getLabel(e.target)
      setLabel(lbl)
      setHover(!!lbl)
    }

    function onLeave() {
      setVisible(false)
    }

    function onEnter() {
      setVisible(true)
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
    }
  }, [animate, visible, isTouch])

  if (isTouch) return null

  return (
    <div
      ref={cursorRef}
      className={`${styles.cursor} ${visible ? styles.visible : ''} ${hover ? styles.hover : ''}`}
      aria-hidden="true"
    >
      <span className={styles.label}>{label}</span>
    </div>
  )
}