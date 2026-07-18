import { useEffect } from 'react'
import { getArchiveChapter, ARCHIVE_CHAPTERS } from '../data/archive'
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
  const chapter = getArchiveChapter(slug)
  const nextChapter = getArchiveChapter(chapter?.nextSlug)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' })
  }, [slug])

  if (!chapter) {
    return (
      <div className={styles.notFound}>
        <p className={styles.notFoundLabel}>Chapter Not Found</p>
        <h1 className={styles.notFoundTitle}>No chapter exists for this slug.</h1>
        <button className={styles.backLink} onClick={() => onNavigate?.('Archive')} type="button">Back to Archive</button>
      </div>
    )
  }

  const displayImages =
    chapter.images?.length > 0 ? chapter.images : buildFallbackImages(chapter)
  const essayParagraphs = chapter.essay?.split('\n\n') || []
  const related = ARCHIVE_CHAPTERS.filter((c) => c.slug !== chapter.slug)

  // Build a mixed content sequence for rhythm
  const body = []
  essayParagraphs.forEach((para, i) => {
    body.push({ type: 'paragraph', key: `p-${i}`, text: para })
    // Interleave images between paragraphs
    if (displayImages[i] && i < displayImages.length) {
      body.push({ type: 'image', key: `img-${i}`, image: displayImages[i] })
    }
  })
  // Add remaining images at the end
  for (let i = essayParagraphs.length; i < displayImages.length; i++) {
    body.push({ type: 'image', key: `img-${i}`, image: displayImages[i] })
  }

  return (
    <div className={styles.page}>
      {/* ── Three-column editorial grid ── */}
      <div className={styles.grid}>

        {/* ── Left: Meta ── */}
        <aside className={styles.leftCol}>
          <span className={styles.category}>{chapter.category}</span>
          <h1 className={styles.title}>{chapter.title}</h1>
          <div className={styles.meta}>
            <p className={styles.metaDate}>{chapter.year} &nbsp;·&nbsp; {chapter.location}</p>
            <p className={styles.metaAuthor}>Words: Photographer Name</p>
            <p className={styles.metaReading}>{chapter.imageCount} Images</p>
          </div>
        </aside>

        {/* ── Centre: Article ── */}
        <main className={styles.mainCol}>
          {/* Opening paragraph */}
          <p className={styles.opening}>{chapter.introduction.split('\n\n')[0]}</p>

          {/* Mixed content sequence */}
          {body.map((block) => {
            if (block.type === 'paragraph') {
              return (
                <p key={block.key} className={styles.paragraph}>
                  {block.text}
                </p>
              )
            }
            if (block.type === 'image') {
              const img = block.image
              const sizeClass = styles[img.size] || styles.medium
              const alignClass =
                img.align === 'left' ? styles.alignLeft
                : img.align === 'right' ? styles.alignRight
                : styles.alignCenter
              return (
                <figure key={block.key} className={`${styles.figure} ${alignClass}`}>
                  <LocalImage
                    className={`${styles.figureImage} ${sizeClass}`}
                    src={img.src}
                    fallbackSrc={img.fallbackSrc}
                    alt={img.alt || chapter.title}
                  />
                  <figcaption className={styles.caption}>
                    From {chapter.title}, {chapter.location}, {chapter.year}
                  </figcaption>
                </figure>
              )
            }
            return null
          })}

          {/* Quote interlude */}
          {chapter.quote && (
            <blockquote className={styles.pullQuote}>
              {chapter.quote}
            </blockquote>
          )}

          {/* Afterword */}
          {chapter.afterword && (
            <section className={styles.afterword}>
              <span className={styles.afterwordLabel}>Afterword</span>
              <p className={styles.afterwordText}>{chapter.afterword}</p>
            </section>
          )}

          {/* Navigation */}
          <div className={styles.bottomNav}>
            {nextChapter && (
              <button className={styles.nextBtn} onClick={() => onNavigate?.(`/archive/${nextChapter.slug}`)} type="button">
                <span className={styles.nextLabel}>Next Project</span>
                <span className={styles.nextTitle}>{nextChapter.title} →</span>
              </button>
            )}
            <button className={styles.backBtn} onClick={() => onNavigate?.('Archive')} type="button">Back to Archive</button>
          </div>
        </main>

        {/* ── Right: Related index ── */}
        <aside className={styles.rightCol}>
          <span className={styles.indexLabel}>Archive</span>
          <div className={styles.indexList}>
            {related.map((r) => (
              <button
                key={r.slug}
                className={styles.indexItem}
                onClick={() => onNavigate?.(`/archive/${r.slug}`)}
                type="button"
              >
                <span className={styles.indexCategory}>{r.category} — {r.year}</span>
                <span className={styles.indexTitle}>{r.title}</span>
              </button>
            ))}
          </div>
        </aside>
      </div>
    </div>
  )
}