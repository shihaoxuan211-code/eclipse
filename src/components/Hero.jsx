import { forwardRef } from 'react'
import styles from './Hero.module.css'

const HERO_IMAGE = '/images/hero-home.jpg'

const Hero = forwardRef(function Hero(_props, ref) {
  return (
    <section ref={ref} className={styles.hero}>
      <div className={styles.imageWrapper}>
        <img
          className={styles.image}
          src={HERO_IMAGE}
          alt="Editorial photography"
        />
      </div>

      <div className={styles.overlay} />

      <div className={styles.photographerInfo}>
        <h1 className={styles.photographerName}>Photographer Name</h1>
        <p className={styles.photographerTagline}>
          Editorial & Fine Art Photography
        </p>
      </div>

      <span className={styles.scrollLabel}>Scroll</span>
    </section>
  )
})

export default Hero
