import { useEffect, useCallback } from 'react'
import styles from './FullscreenMenu.module.css'

const MENU_ITEMS = ['Home', 'Archive', 'About', 'Contact']

export default function FullscreenMenu({ isOpen, onClose, onNavigate }) {
  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose()
      }
    },
    [isOpen, onClose],
  )

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
      document.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      document.body.style.overflow = ''
      document.removeEventListener('keydown', handleKeyDown)
    }
  }, [isOpen, handleKeyDown])

  return (
    <div
      className={`${styles.backdrop} ${isOpen ? styles.backdropOpen : ''}`}
      onClick={onClose}
      aria-hidden={!isOpen}
    >
      <nav className={styles.nav} onClick={(e) => e.stopPropagation()}>
        {MENU_ITEMS.map((item) => (
          <button
            key={item}
            className={styles.navItem}
            type="button"
            tabIndex={isOpen ? 0 : -1}
            onClick={() => {
              if (onNavigate) onNavigate(item)
              onClose()
            }}
          >
            {item}
          </button>
        ))}
      </nav>
    </div>
  )
}