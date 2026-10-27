/** All personal placeholders live here. Empty strings never render as fake links. */
export const site = {
  name: "Hammad Tauqir",
  title: "Full-Stack Developer | Automation Builder",
  location: "Lahore, Pakistan",
  availability: "Open to Opportunities",
  intro:
    "Full-stack developer building polished websites, practical applications, and useful business automations.",
  heroIntro:
    "I’m Hammad, a full-stack developer in Lahore. I design and build clear web experiences, connected business tools, and practical automations—from the first screen to the systems behind it.",
  about: [
    "I'm a Computer Science graduate from FAST-NUCES with hands-on experience building full-stack applications. At MetaViz Studio, I worked on responsive Next.js experiences and connected marketing tools with booking and lead workflows.",
    "I work with Next.js, React, Node.js, Django, Prisma and relational databases. My interests also include automation: finding repetitive business tasks and turning them into clear, reviewable workflows. I am interested in full-stack, backend and automation opportunities.",
  ],
  email: "", // TODO: Add professional email
  github: "https://github.com/Hammad-Tauqir",
  linkedin: "", // TODO: Add LinkedIn URL
  upwork: "", // TODO: Add Upwork URL
  cv: "", // TODO: Add CV file to public/documents/hammad-tauqir-cv.pdf, then set '/documents/hammad-tauqir-cv.pdf'
  profileImage: "", // TODO: Add public/images/profile/hammad-tauqir.webp, then set '/images/profile/hammad-tauqir.webp'
  url: (process.env.NEXT_PUBLIC_SITE_URL || "").replace(/\/$/, ""),
  formEndpoint: process.env.NEXT_PUBLIC_CONTACT_ENDPOINT || "",
  education: {
    degree: "BS Computer Science",
    school: "FAST National University of Computer and Emerging Sciences",
    shortSchool: "FAST-NUCES",
    graduated: "January 2026",
  },
  // TODO: Add verified statistics. Unknown values are deliberately not rendered.
  stats: [
    { label: "Projects completed", value: null },
    { label: "Technologies used", value: null },
    { label: "Professional experience", value: null },
  ] as { label: string; value: string | null }[],
};
