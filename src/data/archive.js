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
    location: 'Wellington, New Zealand',
    category: 'Fantasy',
    imageCount: 6,
    cover: '/images/archive/imagined-worlds.jpg',
    fallbackCover: '/images/hero-home.jpg',
    imageRight: false,
    nextSlug: 'quiet-encounters',
    introduction:
      'This series explores constructed realities — places that exist primarily in the imagination, yet feel strangely familiar. The images are drawn from costume studies, set design experiments and location scouting trips where the ordinary landscape was temporarily transformed into something otherworldly.\n\nThe work does not attempt to document a literal fantasy world. Instead, it uses light, distance and texture to suggest that another layer of meaning exists just beneath the surface of what the camera records.',
    essay:
      'There is a particular quality of light that makes the familiar feel unfamiliar. In early morning fog, an ordinary field becomes the threshold of another world. A costume worn in the wrong context — a Victorian sleeve against a brutalist staircase — generates more meaning than either element could produce alone.\n\nThese photographs were made across eighteen months, often in the hour before sunrise. The palette is deliberately restrained: muted greens, cold blues, the occasional warmth of gold leaf or rust. The intention was never to escape reality but to look at it more carefully — to see the fiction already present in the everyday.',
    afterword:
      'This chapter began with a question about what photography can preserve that the eye cannot. Fantasy, in this context, is not escapism but a form of attention. The imagined worlds in these frames are not elsewhere; they are here, waiting to be seen.',
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
    location: 'Auckland, New Zealand',
    category: 'Portrait',
    imageCount: 8,
    cover: '/images/archive/quiet-encounters.jpg',
    fallbackCover: '/images/hero-home.jpg',
    imageRight: true,
    nextSlug: 'beyond-the-horizon',
    introduction:
      'Portraits made without direction. The people in these images were not posed or asked to perform. Each frame captures a moment of genuine stillness — a pause in conversation, a glance toward a window, the weight of someone sitting alone in a half-empty room.\n\nThe project began as a personal exercise in observation and gradually became a more formal study of presence. The question at the centre of the work is simple: What does it mean to be present in a photograph?',
    essay:
      'Most portraits announce themselves as portraits. The subject faces the camera, the photographer is acknowledged, the frame declares its purpose. These images do the opposite. The camera is incidental — a witness rather than a participant.\n\nThe resulting photographs are quiet and unguarded. A woman reading in a café at dusk. A child sitting on the edge of a fountain, not smiling. An elderly man waiting at a train platform, his expression suspended somewhere between patience and memory.\n\nTechnically, the series relies almost entirely on available light. Flash was never used. The grain in several images is intentional — a reminder that these are physical, imperfect records of time.',
    afterword:
      'Quiet Encounters is an argument for looking more slowly. Each person in this series was photographed only once, and no retakes were requested. The project exists as a document of what was, rather than what could have been arranged.',
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
    location: 'South Island, New Zealand',
    category: 'Travel',
    imageCount: 7,
    cover: '/images/archive/beyond-the-horizon.jpg',
    fallbackCover: '/images/hero-home.jpg',
    imageRight: false,
    nextSlug: 'fragments-of-time',
    introduction:
      'A photographic journey through the remote landscapes of the South Island. These images document the transition from familiar terrain to wilderness — the point where the road ends and the land continues without human presence.\n\nThe work is structured as a visual diary of distance. Each image marks a step further from the known world, and with each step the light changes, the colours shift, and the horizon redefines itself.',
    essay:
      'Landscape photography often aspires to grandeur — sweeping vistas, dramatic light, the sublime. These images resist that tradition. They are interested instead in what happens at the edges of grand places: the texture of wet tussock, the precise grey of a lake under cloud, the way a gravel road disappears into rain.\n\nShot over twenty-one days of continuous travel, the series follows a route from the Canterbury plains to the West Coast and south toward Fiordland. The camera was a digital medium-format body paired with a single fixed lens. The constraint was deliberate — one focal length, one perspective, one way of seeing.',
    afterword:
      'The horizon is a promise that the world continues. Beyond the Horizon does not attempt to capture everything the journey contained — only the moments when distance felt like a companion rather than an absence.',
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
    location: 'Various, New Zealand',
    category: 'Experimental',
    imageCount: 5,
    cover: '/images/archive/fragments-of-time.jpg',
    fallbackCover: '/images/hero-home.jpg',
    imageRight: true,
    nextSlug: 'imagined-worlds',
    introduction:
      'This chapter collects images that were never intended for publication. They are outtakes, experiments, double exposures and photographs made without a specific destination in mind.\n\nThe value of these fragments lies in their incompleteness. Each image gestures toward a story but refuses to provide one. Together they form a kind of visual diary — not chronological, not thematic, simply gathered.',
    essay:
      'Most photographic projects are defined by what they exclude. Fragments of Time is defined by what it refuses to exclude. The images in this series were chosen not for their coherence but for their resistance to interpretation.\n\nSome frames are technically imperfect — a missed focus, an accidental double exposure, an image made while the camera was being carried rather than raised to the eye. Others are deliberately ambiguous, refusing to distinguish between foreground and background, subject and context.\n\nThe sequence is arranged to resist narrative logic. Similarities in colour, texture and light provide the only structure. The result is not a story but a mood — the feeling of remembering something that was never fully experienced.',
    afterword:
      'These fragments belong to no single place or year. They are the photographs I made between projects, the moments I noticed because I had nowhere else to be. They remind me that attention does not always require intention.',
    images: [],
  },
]

export function getArchiveChapter(slug) {
  return ARCHIVE_CHAPTERS.find((chapter) => chapter.slug === slug)
}