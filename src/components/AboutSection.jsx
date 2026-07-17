import { forwardRef } from 'react'
import styles from './AboutSection.module.css'

const AboutSection = forwardRef(function AboutSection(_props, ref) {
  return (
    <section ref={ref} className={styles.section}>
      <p className={styles.sectionLabel}>About</p>
      <div className={styles.content}>
        <p className={styles.statement}>
          Photography, for me,
          <br />
          has never been about
          <br />
          capturing reality.
          <br />
          <br />
          It is about preserving
          <br />
          what memory refuses
          <br />
          to forget.
        </p>
        <div className={styles.rightColumn}>
          <div className={styles.portraitPlaceholder}>
            <span className={styles.portraitLabel}>Photographer Portrait</span>
          </div>
          <p className={styles.bodyText}>
            I work across editorial portraiture, imagined characters,
            city encounters and personal visual studies.
            <br />
            <br />
            Each series begins with atmosphere, emotion and a desire
            to hold on to something that would otherwise disappear.
          </p>
          <button className={styles.readMore} type="button">
            Read More
          </button>
        </div>
      </div>
    </section>
  )
})

export default AboutSection