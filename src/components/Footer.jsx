import { forwardRef } from 'react'
import styles from './Footer.module.css'

const Footer = forwardRef(function Footer(_props, ref) {
  return (
    <footer ref={ref} className={styles.footer}>
      <div className={styles.brand}>ECLIPSE</div>
      <div className={styles.year}>2026</div>
    </footer>
  )
})

export default Footer