export const ARCHIVE_CHAPTERS = [
  {
    number: '01',
    slug: 'imagined-worlds',
    title: 'Imagined Worlds',
    subtitle: 'Fantasy, costume and cinematic storytelling.',
    description:
      'Stories shaped by fantasy, costumes and imagined identities, where reality quietly gives way to another world.',
    quote: 'Stories shaped by imagination.',
    year: '2026',
    cover: '/images/archive/imagined-worlds.jpg',
    fallbackCover: '/images/hero-home.jpg',
    imageRight: false,
    nextSlug: 'quiet-encounters',
    images: [],
  },
  {
    number: '02',
    slug: 'quiet-encounters',
    title: 'Quiet Encounters',
    subtitle: 'Portraits, people and everyday moments.',
    description:
      'Portraits and passing encounters that preserve the quiet details often missed in everyday life.',
    quote: 'Some moments remain because they were almost unnoticed.',
    year: '2026',
    cover: '/images/archive/quiet-encounters.jpg',
    fallbackCover: '/images/hero-home.jpg',
    imageRight: true,
    nextSlug: 'beyond-the-horizon',
    images: [],
  },
  {
    number: '03',
    slug: 'beyond-the-horizon',
    title: 'Beyond the Horizon',
    subtitle: 'Travel, landscapes and distant places.',
    description:
      'Landscapes, journeys and distant places shaped by space, weather and the feeling of being somewhere unfamiliar.',
    quote: 'Distance changes the way a place is remembered.',
    year: '2026',
    cover: '/images/archive/beyond-the-horizon.jpg',
    fallbackCover: '/images/hero-home.jpg',
    imageRight: false,
    nextSlug: 'fragments-of-time',
    images: [],
  },
  {
    number: '04',
    slug: 'fragments-of-time',
    title: 'Fragments of Time',
    subtitle: 'Personal experiments and unfinished memories.',
    description:
      'Personal studies, visual fragments and unfinished memories that do not belong to a single place or story.',
    quote: 'Not every memory arrives as a complete story.',
    year: '2026',
    cover: '/images/archive/fragments-of-time.jpg',
    fallbackCover: '/images/hero-home.jpg',
    imageRight: true,
    nextSlug: 'imagined-worlds',
    images: [],
  },
]

export function getArchiveChapter(slug) {
  return ARCHIVE_CHAPTERS.find((chapter) => chapter.slug === slug)
}