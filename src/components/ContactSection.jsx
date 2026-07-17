import { forwardRef } from 'react'
import styles from './ContactSection.module.css'

const ContactSection = forwardRef(function ContactSection(_props, ref) {
  return (
    <section ref={ref} className={styles.section}>
      <p className={styles.sectionLabel}>Contact</p>
      <h2 className={styles.heading}>
        Let's create something
        <br />
        worth remembering.
      </h2>
      <p className={styles.supportingText}>
        For commissions, collaborations
        <br />
        and selected creative projects.
      </p>
      <div className={styles.contactRows}>
        <div className={styles.row}>
          <span className={styles.label}>Email</span>
          <a className={styles.value} href="mailto:hello@example.com">
            hello@example.com
          </a>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>Instagram</span>
          <a
            className={styles.value}
            href="https://instagram.com/photographer"
            target="_blank"
            rel="noopener noreferrer"
          >
            @photographer
          </a>
        </div>
        <div className={styles.row}>
          <span className={styles.label}>Xiaohongshu</span>
          <a
            className={styles.value}
            href="https://xiaohongshu.com"
            target="_blank"
            rel="noopener noreferrer"
          >
            @photographer
          </a>
        </div>
      </div>
    </section>
  )
})

export default ContactSection