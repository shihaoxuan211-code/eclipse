import { forwardRef } from 'react'
import styles from './SelectedProjects.module.css'

const CHAPTERS = [
  {
    number: '01',
    title: 'Imagined Worlds',
    description:
      'Stories shaped by fantasy, costumes and imagined identities, where reality quietly gives way to another world.',
    image: 'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=800&h=600&fit=crop',
    imageRight: false,
  },
  {
    number: '02',
    title: 'Quiet Encounters',
    description:
      'Small moments between people, cities and light, collected before they disappear.',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=800&h=600&fit=crop',
    imageRight: true,
  },
  {
    number: '03',
    title: 'Beyond the Horizon',
    description:
      'Journeys, landscapes and distant places that continue to exist long after the road ends.',
    image: 'https://images.unsplash.com/photo-1494500764479-0c8f2919a3d8?w=800&h=600&fit=crop',
    imageRight: false,
  },
  {
    number: '04',
    title: 'Fragments of Time',
    description:
      'Personal experiments, unfinished thoughts and photographs that simply preserve a passing feeling.',
    image: 'https://images.unsplash.com/photo-1518644730709-0835105d9da3?w=800&h=600&fit=crop',
    imageRight: true,
  },
]

const SelectedProjects = forwardRef(function SelectedProjects(_props, ref) {
  return (
    <section ref={ref} className={styles.section}>
      <div className={styles.intro}>
        <p className={styles.sectionLabel}>Acts of Memory</p>
        <h2 className={styles.heading}>
          Four worlds,
          <br />
          unfolding one frame at a time.
        </h2>
      </div>
      {CHAPTERS.map((chapter) => {
        const imageColClass = chapter.imageRight ? styles.imageRight : styles.imageLeft
        return (
          <div key={chapter.number} className={styles.chapterRow}>
            <div className={imageColClass}>
              <div className={styles.imageWrapper}>
                <img
                  className={styles.image}
                  src={chapter.image}
                  alt={chapter.title}
                />
              </div>
            </div>
            <div className={styles.textCol}>
              <div className={styles.chapterText}>
                <p className={styles.chapterNumber}>{chapter.number}</p>
                <h3 className={styles.chapterTitle}>{chapter.title}</h3>
                <p className={styles.chapterDescription}>{chapter.description}</p>
              </div>
            </div>
          </div>
        )
      })}
    </section>
  )
})

export default SelectedProjects