import styles from './PageTransition.module.css'

const phaseClass = {
  entering: styles.entering,
  visible: styles.visible,
  exiting: styles.exiting,
}

export default function PageTransition({ phase, showBrand = true }) {
  if (phase === 'idle' || !phase) return null

  return (
    <div className={`${styles.overlay} ${phaseClass[phase] || ''}`}>
      {showBrand && (
        <span className={`${styles.brand} ${phase === 'visible' ? styles.brandVisible : ''}`}>
          ECLIPSE
        </span>
      )}
    </div>
  )
}