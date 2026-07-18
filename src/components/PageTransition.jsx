import styles from './PageTransition.module.css'

const phaseClass = {
  entering: styles.entering,
  visible: styles.visible,
  exiting: styles.exiting,
}

export default function PageTransition({ phase }) {
  if (phase === 'idle' || !phase) return null

  return (
    <div className={`${styles.overlay} ${phaseClass[phase] || ''}`}>
      <span className={`${styles.brand} ${phase === 'visible' ? styles.brandVisible : ''}`}>
        ECLIPSE
      </span>
    </div>
  )
}