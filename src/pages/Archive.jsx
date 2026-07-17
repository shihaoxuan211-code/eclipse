import { useState } from 'react'
import styles from './Archive.module.css'
import { ARCHIVE_CHAPTERS } from '../data/archive'
import LocalImage from '../components/LocalImage'

const FILE_METADATA = {
  'imagined-worlds': { category: 'Fantasy', code: 'IW-001' },
  'quiet-encounters': { category: 'Portrait', code: 'QE-002' },
  'beyond-the-horizon': { category: 'Travel', code: 'BH-003' },
  'fragments-of-time': { category: 'Experimental', code: 'FT-004' },
}

const CATEGORY_FILTERS = [
  { label: 'All', slug: 'all' },
  { label: 'Fantasy', slug: 'fantasy' },
  { label: 'Portrait', slug: 'portrait' },
  { label: 'Travel', slug: 'travel' },
  { label: 'Experimental', slug: 'experimental' },
]

const FILTER_SLUG_MAP = {
  fantasy: 'imagined-worlds',
  portrait: 'quiet-encounters',
  travel: 'beyond-the-horizon',
  experimental: 'fragments-of-time',
}

// Slightly different rotation per project for the floating preview
const PREVIEW_ROTATIONS = {
  'imagined-worlds': -2.5,
  'quiet-encounters': 1.8,
  'beyond-the-horizon': -1.6,
  'fragments-of-time': 2.2,
}

export default function Archive({ onNavigate }) {
  const [activeFilter, setActiveFilter] = useState('all')
  const [hoveredSlug, setHoveredSlug] = useState(null)
  const [selectedSlug, setSelectedSlug] = useState(null)

  // Determine which chapter's image to show in the floating preview
  const previewChapter =
    ARCHIVE_CHAPTERS.find((c) => c.slug === hoveredSlug) || null

  const filteredChapters =
    activeFilter === 'all'
      ? ARCHIVE_CHAPTERS
      : ARCHIVE_CHAPTERS.filter(
          (c) => c.slug === FILTER_SLUG_MAP[activeFilter],
        )

  return (
    <>
      {/* Opening overlay */}
      <div className={styles.overlay}>
        <span className={styles.overlayLabel}>Archive</span>
        <span className={styles.overlayTitle}>2026</span>
        <span className={styles.overlaySub}>Opening Archive...</span>
      </div>

      <div className={styles.page}>
        <div className={styles.container}>
          {/* ── Header ──────────────────── */}
          <header className={styles.header}>
            <div className={styles.headerTop}>
              <h1 className={styles.headerTitle}>ARCHIVE</h1>
              <div className={styles.headerMeta}>
                <span className={styles.headerMetaLabel}>
                  Selected Works
                </span>
                <span className={styles.headerMetaYears}>
                  2024—2026
                </span>
              </div>
            </div>
            <p className={styles.headerIntro}>
              Four visual chapters exploring memory, identity,
              landscape and imagined worlds.
            </p>
          </header>

          {/* ── Filters ────────────────── */}
          <div className={styles.filters}>
            {CATEGORY_FILTERS.map((f) => (
              <button
                key={f.slug}
                className={`${styles.filterBtn} ${activeFilter === f.slug ? styles.filterBtnActive : ''}`}
                onClick={() => {
                  setActiveFilter(f.slug)
                  setSelectedSlug(null)
                  setHoveredSlug(null)
                }}
                type="button"
                aria-pressed={activeFilter === f.slug}
              >
                {f.label}
              </button>
            ))}
          </div>

          {/* ── Project List ───────────── */}
          <div className={styles.projectList}>
            {ARCHIVE_CHAPTERS.map((chapter) => {
              const meta = FILE_METADATA[chapter.slug] || {}
              const isHovered = hoveredSlug === chapter.slug
              const isSelected = selectedSlug === chapter.slug
              const isFiltered =
                activeFilter !== 'all' &&
                chapter.slug !== FILTER_SLUG_MAP[activeFilter]

              const rowClasses = [
                styles.projectRow,
                isHovered ? styles.projectRowHovered : '',
                isSelected ? styles.projectRowSelected : '',
                isFiltered ? styles.projectRowFiltered : '',
              ]
                .filter(Boolean)
                .join(' ')

              return (
                <div
                  key={chapter.slug}
                  className={rowClasses}
                  role="button"
                  tabIndex={isFiltered ? -1 : 0}
                  aria-label={`${chapter.number} — ${chapter.title}`}
                  aria-pressed={isSelected}
                  onClick={() =>
                    setSelectedSlug(
                      isSelected ? null : chapter.slug,
                    )
                  }
                  onMouseEnter={() => {
                    if (!isFiltered) setHoveredSlug(chapter.slug)
                  }}
                  onMouseLeave={() => setHoveredSlug(null)}
                  onFocus={() => {
                    if (!isFiltered) setHoveredSlug(chapter.slug)
                  }}
                  onBlur={() => setHoveredSlug(null)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault()
                      setSelectedSlug(
                        isSelected ? null : chapter.slug,
                      )
                    }
                  }}
                >
                  <div className={styles.projectRowInner}>
                    <span className={styles.projectNumber}>
                      {chapter.number}
                    </span>
                    <span className={styles.projectTitle}>
                      {chapter.title}
                      {isSelected && (
                        <button
                          className={styles.viewProject}
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation()
                            onNavigate?.(
                              `/archive/${chapter.slug}`,
                            )
                          }}
                        >
                          View Project →
                        </button>
                      )}
                    </span>
                    <span className={styles.projectCategory}>
                      {meta.category}
                    </span>
                    <span className={styles.projectYear}>
                      {chapter.year}
                    </span>
                  </div>
                </div>
              )
            })}

            {/* Bottom border spacer when filtered */}
            {filteredChapters.length === 0 && (
              <p className={styles.emptyState}>
                No projects match this filter.
              </p>
            )}
          </div>
        </div>

        {/* ── Floating Image Preview ───── */}
        <div
          className={`${styles.imagePreview} ${previewChapter ? styles.imagePreviewVisible : ''}`}
          style={{
            '--preview-rotation': previewChapter
              ? `${PREVIEW_ROTATIONS[previewChapter.slug] || 0}deg`
              : '0deg',
          }}
          aria-hidden="true"
        >
          {previewChapter && (
            <div className={styles.imagePreviewInner}>
              <div className={styles.imagePreviewFrame}>
                <LocalImage
                  src={previewChapter.cover}
                  fallbackSrc={previewChapter.fallbackCover}
                  alt={previewChapter.title}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}