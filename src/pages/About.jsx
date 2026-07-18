import styles from './About.module.css'

export default function About({ onNavigate }) {
  return (
    <div className={styles.page}>
      {/* ── Header ── */}
      <section className={styles.header}>
        <span className={styles.label}>About</span>
      </section>

      {/* ── Philosophy ── */}
      <section className={styles.philosophy}>
        <div className={styles.philosophyLeft} />
        <div className={styles.philosophyRight}>
          <p className={styles.paragraph}>
            I photograph the space between presence and disappearance.
          </p>
          <p className={styles.paragraph}>
            Light, distance and silence become part of the subject.
          </p>
          <p className={styles.paragraph}>
            Each image is treated as a fragment rather than an explanation.
          </p>
        </div>
      </section>

      {/* ── Location ── */}
      <section className={styles.location}>
        <div className={styles.locationDivider} />
        <p className={styles.locationItem}>Based in New Zealand.</p>
        <p className={styles.locationItem}>Portrait</p>
        <p className={styles.locationItem}>Fashion</p>
        <p className={styles.locationItem}>Visual Storytelling</p>
      </section>

      {/* ── CTA ── */}
      <section className={styles.cta}>
        <p className={styles.ctaText}>Interested in working together?</p>
        <button
          className={styles.ctaLink}
          onClick={() => onNavigate?.('Contact')}
          type="button"
        >
          Contact →
        </button>
      </section>
    </div>
  )
}