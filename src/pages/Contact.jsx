import { useState } from 'react'
import styles from './Contact.module.css'

export default function Contact({ onNavigate }) {
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e) {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className={styles.page}>
      {/* ── Hero ────────────────────────── */}
      <section className={styles.hero}>
        <p className={styles.label}>Contact</p>
        <h1 className={styles.heroHeading}>
          Let's create
          <br />
          something worth
          <br />
          remembering.
        </h1>
      </section>

      {/* ── Details ─────────────────────── */}
      <section className={styles.details}>
        <span className={styles.detailsLabel}>Details</span>
        <div className={styles.contactRows}>
          <div className={styles.row}>
            <span className={styles.rowLabel}>Email</span>
            <a className={styles.rowValue} href="mailto:hello@example.com">
              hello@example.com
            </a>
          </div>
          <div className={styles.row}>
            <span className={styles.rowLabel}>Instagram</span>
            <a
              className={styles.rowValue}
              href="https://instagram.com/photographer"
              target="_blank"
              rel="noopener noreferrer"
            >
              @photographer
            </a>
          </div>
          <div className={styles.row}>
            <span className={styles.rowLabel}>Xiaohongshu</span>
            <a
              className={styles.rowValue}
              href="https://xiaohongshu.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              @photographer
            </a>
          </div>
          <div className={styles.row}>
            <span className={styles.rowLabel}>Location</span>
            <p className={styles.rowValue}>[City, Country]</p>
          </div>
        </div>
      </section>

      {/* ── Inquiry ─────────────────────── */}
      <section className={styles.inquiry}>
        <span className={styles.inquiryLabel}>Inquiry</span>
        {submitted ? (
          <p className={styles.thankYou}>
            Thank you.
            <br />
            This portfolio currently uses a demonstration contact form.
            <br />
            Do not attempt to send email.
          </p>
        ) : (
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.field}>
              <label className={styles.fieldLabel}>Name</label>
              <input className={styles.input} type="text" required />
            </div>
            <div className={styles.field}>
              <label className={styles.fieldLabel}>Email</label>
              <input className={styles.input} type="email" required />
            </div>
            <div className={styles.field}>
              <label className={styles.fieldLabel}>Project</label>
              <input className={styles.input} type="text" />
            </div>
            <div className={styles.field}>
              <label className={styles.fieldLabel}>Message</label>
              <textarea className={styles.textarea} rows={4} />
            </div>
            <button className={styles.submit} type="submit">
              Send
            </button>
          </form>
        )}
      </section>

      {/* ── Availability ────────────────── */}
      <section className={styles.availability}>
        <span className={styles.availabilityLabel}>Available for</span>
        <div className={styles.availabilityList}>
          <p className={styles.availabilityItem}>Portraits</p>
          <p className={styles.availabilityItem}>Commercial</p>
          <p className={styles.availabilityItem}>Editorial</p>
          <p className={styles.availabilityItem}>Travel</p>
        </div>
      </section>
    </div>
  )
}