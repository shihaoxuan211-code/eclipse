import { forwardRef } from 'react'
import styles from './Footer.module.css'

const Footer = forwardRef(function Footer(_props, ref) {
  function handleBackToTop() {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)')
    const behavior = prefersReduced.matches ? 'instant' : 'smooth'
    window.scrollTo({ top: 0, behavior })
  }

  return (
    <footer ref={ref} className={styles.footer}>
      <div className={styles.row}>
        <span className={styles.left}>Photographer Name</span>
        <span className={styles.center}>End of Archive</span>
        <span className={styles.right}>2026</span>
      </div>
      <button
        className={styles.backToTop}
        onClick={handleBackToTop}
        type="button"
      >
        Back to Top
      </button>
    </footer>
  )
})

export default Footer