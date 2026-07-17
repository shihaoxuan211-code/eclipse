import LocalImage from '../components/LocalImage'
import styles from './About.module.css'

export default function About({ onNavigate }) {
  return (
    <div className={styles.page}>
      {/* ── Hero ────────────────────────── */}
      <section className={styles.hero}>
        <div className={styles.heroLeft}>
          <p className={styles.label}>About</p>
          <h1 className={styles.heroHeading}>
            Photography is not
            <br />
            about perfect moments.
            <br />
            <br />
            It is about
            <br />
            remembering them.
          </h1>
        </div>
        <LocalImage
          className={styles.heroImage}
          src="/images/hero-home.jpg"
          fallbackSrc="/images/hero-home.jpg"
          alt="Photographer portrait"
        />
      </section>

      {/* ── Story ──────────────────────── */}
      <section className={styles.story}>
        <span className={styles.storyLabel}>Background</span>
        <div className={styles.storyText}>
          <p className={styles.storyParagraph}>
            [This biography will be replaced with the photographer's
            personal story — their background, influences, and the
            experiences that shaped their approach to photography.]
          </p>
          <p className={styles.storyParagraph}>
            [The second paragraph should describe the photographer's
            creative process, how they approach a project, and what
            they look for in the moments they choose to preserve.]
          </p>
          <p className={styles.storyParagraph}>
            [The third paragraph can speak about their philosophy,
            what photography means to them personally, and the kind
            of work they hope to continue creating in the years ahead.]
          </p>
        </div>
      </section>

      {/* ── Philosophy ─────────────────── */}
      <section className={styles.philosophy}>
        <p className={styles.quoteText}>
          Every photograph
          <br />
          is a conversation
          <br />
          between memory
          <br />
          and light.
        </p>
      </section>

      {/* ── Equipment ──────────────────── */}
      <section className={styles.equipment}>
        <span className={styles.equipmentLabel}>Equipment</span>
        <div className={styles.equipmentList}>
          <div className={styles.equipmentItem}>
            <span className={styles.equipmentKey}>Camera</span>
            <p className={styles.equipmentValue}>[Camera brand & model]</p>
          </div>
          <div className={styles.equipmentItem}>
            <span className={styles.equipmentKey}>Lens</span>
            <p className={styles.equipmentValue}>[Primary lens setup]</p>
          </div>
          <div className={styles.equipmentItem}>
            <span className={styles.equipmentKey}>Location</span>
            <p className={styles.equipmentValue}>[City / Country]</p>
          </div>
          <div className={styles.equipmentItem}>
            <span className={styles.equipmentKey}>Availability</span>
            <p className={styles.equipmentValue}>Available worldwide</p>
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────── */}
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