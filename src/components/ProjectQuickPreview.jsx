import { useEffect, useRef, useCallback } from 'react'
import styles from './ProjectQuickPreview.module.css'
import LocalImage from './LocalImage'

export default function ProjectQuickPreview({ chapter, onClose, onViewFull }) {
  const dialogRef = useRef(null)
  const previousFocusRef = useRef(null)

  // Lock body scroll
  useEffect(() => {
    if (chapter) {
      previousFocusRef.current = document.activeElement
      document.body.style.overflow = 'hidden'
      dialogRef.current?.focus()
    } else {
      document.body.style.overflow = ''
      previousFocusRef.current?.focus?.()
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [chapter])

  // Escape key
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape') {
        onClose()
        e.preventDefault()
      }
      // Trap focus
      if (e.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])',
        )
        if (!focusable.length) return
        const first = focusable[0]
        const last = focusable[focusable.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          last.focus()
          e.preventDefault()
        } else if (!e.shiftKey && document.activeElement === last) {
          first.focus()
          e.preventDefault()
        }
      }
    },
    [onClose],
  )

  if (!chapter) return null

  const imageCount = chapter.images?.length || chapter.imageCount || 0

  return (
    <div
      className={`${styles.backdrop} ${chapter ? styles.visible : ''}`}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose()
      }}
      onKeyDown={handleKeyDown}
      role="dialog"
      aria-modal="true"
      aria-label={`Preview: ${chapter.title}`}
      ref={dialogRef}
      tabIndex={-1}
    >
      <div className={styles.panel}>
        {/* ── Left: Image ──────────── */}
        <div className={styles.imageCol}>
          <div className={styles.imageFrame}>
            <LocalImage
              src={chapter.cover}
              fallbackSrc={chapter.fallbackCover}
              alt={chapter.title}
            />
          </div>
        </div>

        {/* ── Right: Info ──────────── */}
        <div className={styles.infoCol}>
          <div className={styles.infoInner}>
            <span className={styles.number}>{chapter.number}</span>
            <h2 className={styles.title}>{chapter.title}</h2>
            <p className={styles.meta}>
              {chapter.year}{imageCount > 0 ? ` · ${imageCount} Images` : ''}
            </p>
            <p className={styles.description}>{chapter.description}</p>

            <div className={styles.actions}>
              <button
                className={styles.viewFull}
                onClick={() => onViewFull?.(chapter.slug)}
                type="button"
              >
                View Full Project →
              </button>
              <button
                className={styles.closeBtn}
                onClick={onClose}
                type="button"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Close × in top-right */}
      <button
        className={styles.closeX}
        onClick={onClose}
        type="button"
        aria-label="Close preview"
      >
        ×
      </button>
    </div>
  )
}