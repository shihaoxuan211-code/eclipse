import { useEffect, useRef } from 'react'
import { getArchiveChapter } from '../data/archive'
import LocalImage from '../components/LocalImage'
import styles from './ChapterDetail.module.css'

function buildFallbackImages(chapter) {
  const orientationStyles = [
    { orientation: 'landscape', size: 'large', align: 'center' },
    { orientation: 'portrait', size: 'medium', align: 'left' },
    { orientation: 'landscape', size: 'medium', align: 'right' },
    { orientation: 'landscape', size: 'full', align: 'center' },
    { orientation: 'portrait', size: 'small', align: 'center' },
  ]

  return orientationStyles.map((style) => ({
    src: chapter.cover,
    fallbackSrc: chapter.fallbackCover,
    alt: `${chapter.title} — photograph`,
    ...style,
  }))
}

export default function ChapterDetail({ slug, onNavigate }) {
  const coverRef = useRef(null)

  const chapter = getArchiveChapter(slug)

  // Scroll to top when slug changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [slug])

  // Not found
  if (!chapter) {
    return (
      <div className={styles.notFound}>
        <p className={styles.notFoundLabel}>Chapter Not Found</p>
        <h1 className={styles.notFoundTitle}>No chapter exists for this slug.</h1>
        <button
          className={styles.backLink}
          onClick={() => onNavigate?.('Archive')}
          type="button"
        >
          Back to Archive
        </button>
      </div>
    )
  }

  const displayImages =
    chapter.images?.length > 0
      ? chapter.images
      : buildFallbackImages(chapter)

  const nextChapter = getArchiveChapter(chapter.nextSlug)

  return (
    <div className={styles.page}>
      {/* Top navigation */}
      <div className={styles.topNav}>
        <button
          className={styles.navLink}
          onClick={() => onNavigate?.('Archive')}
          type="button"
        >
          ← Archive
        </button>
      </div>

      {/* ── Cover ────────────────────────── */}
      <section className={styles.cover} ref={coverRef}>
        <LocalImage
          className={styles.coverImage}
          src={chapter.cover}
          fallbackSrc={chapter.fallbackCover}
          alt={chapter.title}
        />
        <div className={styles.coverOverlay} />
        <div className={styles.coverContent}>
          <p className={styles.coverLabel}>
            Archive / {chapter.number}
          </p>
          <h1 className={styles.coverTitle}>{chapter.title}</h1>
          <p className={styles.coverMeta}>
            {chapter.year} &nbsp;·&nbsp; Photographic Chapter
          </p>
        </div>
        <span className={styles.scrollCue}>Scroll to Enter</span>
      </section>

      {/* ── Introduction ─────────────────── */}
      <section className={styles.intro}>
        <div className={styles.introGrid}>
          <div className={styles.introLeft}>
            <p className={styles.introNumber}>{chapter.number}</p>
            <h2 className={styles.introTitle}>{chapter.title}</h2>
          </div>
          <div className={styles.introRight}>
            <p className={styles.introText}>{chapter.description}</p>
            <p className={styles.introText}>{chapter.subtitle}</p>
            <div className={styles.introMeta}>
              <span>Year — {chapter.year}</span>
              <span>Format — Photographic Series</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── Image sequence ──────────────── */}
      <section className={styles.gallery}>
        {displayImages.map((img, i) => {
          const sizeClass = styles[img.size] || styles.medium
          const alignClass =
            img.align === 'left'
              ? styles.alignLeft
              : img.align === 'right'
                ? styles.alignRight
                : styles.alignCenter

          return (
            <LocalImage
              key={i}
              className={`${styles.galleryImage} ${sizeClass} ${alignClass}`}
              src={img.src}
              fallbackSrc={img.fallbackSrc}
              alt={img.alt || `${chapter.title} — image ${i + 1}`}
            />
          )
        })}

        {/* Quote interlude */}
        <div className={styles.quote}>
          <p className={styles.quoteText}>{chapter.quote}</p>
        </div>
      </section>

      {/* ── End of chapter ──────────────── */}
      <section className={styles.end}>
        <div>
          <p className={styles.endLabel}>
            End of Chapter {chapter.number}
          </p>
          <h2 className={styles.endChapter}>{chapter.title}</h2>
        </div>

        {nextChapter && (
          <div className={styles.nextChapter}>
            <p className={styles.nextLabel}>Next Chapter</p>
            <button
              className={styles.nextButton}
              onClick={() => onNavigate?.(`/archive/${nextChapter.slug}`)}
              type="button"
            >
              <span className={styles.nextNumber}>{nextChapter.number}</span>
              <span className={styles.nextTitle}>
                {nextChapter.title}
                <span className={styles.nextArrow}> →</span>
              </span>
            </button>
          </div>
        )}

        <button
          className={styles.backLink}
          onClick={() => onNavigate?.('Archive')}
          type="button"
        >
          Back to Archive
        </button>
      </section>
    </div>
  )
}