import { useState, forwardRef } from 'react'
import styles from './SelectedProjects.module.css'
import { ARCHIVE_CHAPTERS } from '../data/archive'
import ProjectQuickPreview from './ProjectQuickPreview'
import LocalImage from './LocalImage'

const SelectedProjects = forwardRef(function SelectedProjects({ onNavigate }, ref) {
  const [previewChapter, setPreviewChapter] = useState(null)

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

      {ARCHIVE_CHAPTERS.map((chapter) => {
        const isImageRight = chapter.imageRight
        return (
          <article
            key={chapter.slug}
            className={`${styles.chapterRow} ${isImageRight ? styles.imageRight : ''}`}
          >
            {/* Image */}
            <div
              className={styles.imageCol}
              onClick={() => setPreviewChapter(chapter)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setPreviewChapter(chapter)
                }
              }}
            >
              <div className={styles.imageWrapper}>
                <LocalImage
                  src={chapter.cover}
                  fallbackSrc={chapter.fallbackCover}
                  alt={chapter.title}
                />
              </div>
            </div>

            {/* Text */}
            <div className={styles.textCol}>
              <span className={styles.number}>{chapter.number}</span>
              <h3 className={styles.title}>{chapter.title}</h3>
              <p className={styles.year}>{chapter.year}</p>
              <p className={styles.description}>{chapter.description}</p>
              <button
                className={styles.previewLink}
                onClick={(e) => {
                  e.stopPropagation()
                  setPreviewChapter(chapter)
                }}
                type="button"
              >
                Preview →
              </button>
            </div>
          </article>
        )
      })}

      <ProjectQuickPreview
        chapter={previewChapter}
        onClose={() => setPreviewChapter(null)}
        onViewFull={(slug) => {
          setPreviewChapter(null)
          onNavigate?.(`/archive/${slug}`)
        }}
      />
    </section>
  )
})

export default SelectedProjects