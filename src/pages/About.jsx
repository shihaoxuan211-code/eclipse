import { useState } from 'react'
import styles from './About.module.css'

export default function About({ onNavigate }) {
  const [expanded, setExpanded] = useState(false)

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

          <button
            className={styles.readMore}
            onClick={() => setExpanded((prev) => !prev)}
            type="button"
            aria-expanded={expanded}
          >
            {expanded ? 'Read Less' : 'Read More'}
          </button>
        </div>
      </section>

      {/* ── Expanded content ── */}
      <div className={`${styles.expandedContent} ${expanded ? styles.expanded : ''}`}>
        <div className={styles.expandedInner}>
          <div className={styles.expandedGrid}>
            <div className={styles.expandedLeft} />
            <div className={styles.expandedRight}>
              <p className={styles.paragraph}>
                My work moves between constructed characters, quiet encounters and places that seem to exist between memory and imagination.
              </p>
              <p className={styles.paragraph}>
                I am interested in the moment when an image stops documenting reality and begins creating its own world. Costumes, landscapes, gestures and silence become part of the same visual language.
              </p>
              <p className={styles.paragraph}>
                Rather than explaining every photograph, I prefer to leave space for uncertainty. Each series is built as a fragment of a larger story—something remembered, imagined or almost forgotten.
              </p>

              <div className={styles.infoBlock}>
                <p className={styles.infoItem}>Based in New Zealand</p>
                <p className={styles.infoItem}>Editorial Portraiture</p>
                <p className={styles.infoItem}>Conceptual Photography</p>
                <p className={styles.infoItem}>Visual Storytelling</p>
                <p className={styles.infoItem}>Art and Photography Essays</p>
              </div>

              <button
                className={styles.infoContact}
                onClick={() => onNavigate?.('Contact')}
                type="button"
              >
                Contact →
              </button>
            </div>
          </div>
        </div>
      </div>

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