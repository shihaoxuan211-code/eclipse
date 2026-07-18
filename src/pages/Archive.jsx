import { useState } from 'react'
import styles from './Archive.module.css'
import { ARCHIVE_CHAPTERS } from '../data/archive'
import ProjectQuickPreview from '../components/ProjectQuickPreview'
import LocalImage from '../components/LocalImage'

const FILE_METADATA = {
  'imagined-worlds': { category: 'Fantasy', code: 'IW-001' },
  'quiet-encounters': { category: 'Portrait', code: 'QE-002' },
  'beyond-the-horizon': { category: 'Travel', code: 'BH-003' },
  'fragments-of-time': { category: 'Experimental', code: 'FT-004' },
}

export default function Archive({ onNavigate }) {
  const [previewChapter, setPreviewChapter] = useState(null)
  const [hoveredSlug, setHoveredSlug] = useState(null)

  return (
    <>
      <div className={styles.page}>
        <div className={styles.container}>

          {/* ── Introduction ───────────── */}
          <div className={styles.pageLabel}>ARCHIVE / 01—04</div>

          <h2 className={styles.introHeading}>
            Visual chapters exploring memory, identity,
            landscape and imagined worlds.
          </h2>

          <p className={styles.introText}>
            A curated archive of photographic series.
            Each project forms part of a wider visual story.
          </p>

          {/* ── Project List ───────────── */}
          <div className={styles.projectList}>
            {ARCHIVE_CHAPTERS.map((chapter) => {
              const meta = FILE_METADATA[chapter.slug] || {}
              const isHovered = hoveredSlug === chapter.slug
              const isInactive = hoveredSlug && !isHovered

              return (
                <div
                  key={chapter.slug}
                  className={`${styles.projectRow} ${isHovered ? styles.projectRowActive : ''} ${isInactive ? styles.projectRowInactive : ''}`}
                  role="button"
                  tabIndex={0}
                  aria-label={`${chapter.number} — ${chapter.title}`}
                  onClick={() => setPreviewChapter(chapter)}
                  onMouseEnter={() => setHoveredSlug(chapter.slug)}
                  onMouseLeave={() => setHoveredSlug(null)}
                  onFocus={() => setHoveredSlug(chapter.slug)}
                  onBlur={() => setHoveredSlug(null)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      setPreviewChapter(chapter)
                    }
                  }}
                >
                  {/* Header row */}
                  <div className={styles.projectRowHeader}>
                    <span className={styles.projectNumber}>{chapter.number}</span>
                    <span className={styles.projectTitle}>{chapter.title}</span>
                    <span className={styles.projectCategory}>{meta.category}</span>
                    <span className={styles.projectYear}>{chapter.year}</span>
                    <span className={styles.projectArrow} aria-hidden="true">→</span>
                  </div>

                  {/* Drawer */}
                  <div className={styles.drawer}>
                    <div className={styles.drawerContent}>
                      <div className={styles.drawerImage}>
                        <LocalImage
                          src={chapter.cover}
                          fallbackSrc={chapter.fallbackCover}
                          alt={chapter.title}
                        />
                      </div>
                      <div className={styles.drawerInfo}>
                        <p className={styles.drawerDescription}>{chapter.description}</p>
                        <button
                          className={styles.drawerPreviewBtn}
                          onClick={(e) => {
                            e.stopPropagation()
                            setPreviewChapter(chapter)
                          }}
                          type="button"
                        >
                          Preview →
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>

      <ProjectQuickPreview
        chapter={previewChapter}
        onClose={() => setPreviewChapter(null)}
        onViewFull={(slug) => {
          setPreviewChapter(null)
          onNavigate?.(`/archive/${slug}`)
        }}
      />
    </>
  )
}