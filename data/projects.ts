export const categories = [
  "All",
  "Full Stack",
  "Frontend",
  "Automation",
] as const;
export type Category = Exclude<(typeof categories)[number], "All">;
export type Project = {
  slug: string;
  name: string;
  subtitle?: string;
  projectType?: string;
  role?: string;
  categories: Category[];
  context: string;
  status: "Completed" | "In Progress";
  statusLabel?: string;
  featured: boolean;
  professional?: boolean;
  summary: string;
  teaser?: string;
  stack: string[];
  problem: string;
  solution: string;
  features: (string | { title: string; description: string })[];
  technicalHighlights?: string[];
  outcome?: string;
  attribution?: string;
  existingIntegrations?: string;
  visual:
    | "receptionist"
    | "academy"
    | "polymath"
    | "metaviz"
    | "design-review"
    | "automation";
  image: string;
  screenshots: { src: string; alt: string; width?: number; height?: number }[];
  imageAlt?: string;
  imageCaption?: string;
  video?: string;
  videoPoster?: string;
  demo: string;
  github: string;
  privateRepo?: boolean;
  challenges: string;
  learned: string;
};
// TODO: Replace project image with a real screenshot path, add screenshots and verified URLs.
// TODO: Add your own challenges and learning notes. Empty notes remain explicit placeholders.
const defaults = {
  status: "Completed" as const,
  featured: false,
  image: "",
  screenshots: [],
  demo: "",
  github: "",
  challenges: "",
  learned: "",
};
export const projects: Project[] = [
  {
    ...defaults,
    slug: "ai-receptionist",
    name: "AI Receptionist",
    subtitle: "Customer Support & Appointment Automation",
    teaser: "A website assistant for service enquiries and appointments. Watch the demo.",
    categories: ["Automation"],
    context: "Invite-only portfolio demo",
    featured: true,
    summary:
      "A protected website assistant that answers service questions, captures leads with permission, and helps visitors book or change appointments.",
    stack: [
      "n8n",
      "OpenAI",
      "Google Sheets",
      "Google Calendar",
      "Gmail",
      "Vercel",
    ],
    problem:
      "Service businesses often handle the same questions repeatedly and coordinate appointments through multiple messages. Customer details, booking requests, and calendar updates can become scattered across conversations and spreadsheets.",
    solution:
      "The website connects visitors to an AI agent powered by n8n. Dedicated tools retrieve service information, save leads, check calendar availability, and book appointments.",
    features: [
      "Business information and FAQs from Google Sheets",
      "Confirmed lead capture into Google Sheets",
      "Google Calendar availability checks and 30-minute discovery calls",
      "Owner email notifications for qualifying new bookings",
      "Email-code verification for rescheduling and cancellation",
      "Website voice input and reply read-aloud",
      "Owner-approved, invite-only access",
    ],
    visual: "receptionist",
    image: "/images/projects/ai-receptionist-demo-poster-4.webp",
    imageAlt:
      "Frame from the Nova Digital AI Receptionist demo showing service information in the chat interface",
    video: "/videos/nova-ai-receptionist-final-4.mp4",
    screenshots: [
      {
        src: "/images/projects/ai-receptionist-full.webp",
        alt: "Existing local QA capture of the Nova Digital receptionist page with example greeting, services and voice controls; backend disconnected",
        width: 1440,
        height: 2315,
      },
    ],
    github: "https://github.com/Hammad-Tauqir/Ai-Receptionist",
    challenges:
      "The workflow coordinates several business tools while keeping booking changes protected by email-code verification.",
    learned:
      "A useful assistant needs clear boundaries, transparent access rules, and dependable hand-offs between conversation and business systems.",
  },
  {
    ...defaults,
    slug: "concept-science-academy",
    name: "Concept Science Academy",
    subtitle: "Student & Fee Management Platform",
    teaser:
      "A staff workspace for student records, fee collection, and reports.",
    categories: ["Full Stack"],
    context: "Academy management project",
    statusLabel: "Built · Staff sign-in required",
    featured: true,
    summary:
      "A private academy workspace that brings student records, monthly fee collection, payment history, and financial reports together for staff.",
    stack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Tailwind CSS"],
    problem:
      "Keeping student details, monthly charges, payments, and outstanding balances in separate records makes it difficult for academy staff to get an accurate view of collections.",
    solution:
      "I built a permission-controlled workspace where staff can maintain student records, generate monthly fees, record payments, and review the resulting balances and reports.",
    features: [
      "Searchable student directory with class, section, and status filters",
      "Monthly fee generation, agreed-fee adjustments, and previous-dues tracking",
      "Payment recording with partial, paid, and pending balances and payment history",
      "Dashboard showing student, fee, and recent payment summaries",
      "Filtered reports with class-wise and student-wise breakdowns and PDF export",
      "Staff accounts with configurable permissions and password recovery",
    ],
    visual: "academy",
    image: "/images/projects/concept-science-academy-logo.png",
    video: "/videos/concept-science-academy-demo.mp4",
    videoPoster: "/images/projects/concept-science-academy-demo-poster.webp",
    imageAlt:
      "Concept Science Academy logo used as the project cover",
    imageCaption: "Academy branding · staff-only application",
    screenshots: [
      {
        src: "/images/projects/academy-dashboard.png",
        alt: "Concept Science Academy dashboard with fictional student counts and monthly fee collection summaries",
        width: 1918,
        height: 833,
      },
      {
        src: "/images/projects/academy-students.png",
        alt: "Academy student directory with search filters and fictional student records",
        width: 1917,
        height: 824,
      },
      {
        src: "/images/projects/academy-fee-collection.png",
        alt: "Academy fee collection view with fictional student payments and balances",
        width: 1914,
        height: 828,
      },
      {
        src: "/images/projects/academy-reports.png",
        alt: "Academy reports view with monthly fee totals, payment statuses, and PDF download",
        width: 1630,
        height: 831,
      },
    ],
    outcome:
      "The application has a staff sign-in and permission-gated pages. The screenshots use fictional student data; real student and payment records are not shown publicly.",
  },
  {
    ...defaults,
    slug: "polymath-kids",
    name: "Polymath Kids",
    teaser: "Online courses and hands-on learning programs for children.",
    categories: ["Full Stack"],
    context: "Final-year project",
    featured: true,
    summary:
      "An education platform helping children build 21st-century skills through online courses, hands-on activities, competitions, and school programs. Built as my final-year project.",
    stack: ["React.js", "Node.js", "Express.js", "MySQL"],
    problem:
      "Families and schools need a clear way to discover age-appropriate learning opportunities that build practical skills beyond the classroom.",
    solution:
      "Polymath Kids presents skill-based courses, seasonal programs, competitions, and school partnerships in one learning experience.",
    features: [
      "STEAM courses with hands-on science, technology, engineering, arts, and math activities",
      "Summer and winter camps with creative learning programs",
      "Competitions that encourage problem-solving and teamwork",
      "Structured 21st-century skills programs for schools",
      "One-on-one and group academic tutoring",
    ],
    visual: "polymath",
    image: "/images/projects/polymath-kids-homepage.webp",
    imageAlt:
      "Polymath Kids homepage showing the 21st-century skills introduction and registration button",
    screenshots: [
      {
        src: "/images/projects/polymath-kids-homepage.webp",
        alt: "Polymath Kids homepage with course introduction, registration button, and student illustrations",
        width: 1440,
        height: 900,
      },
      {
        src: "/images/projects/polymath-kids-offerings.webp",
        alt: "Polymath Kids offerings showing STEAM courses, seasonal camps, competitions, and school programs",
        width: 1440,
        height: 900,
      },
    ],
    demo: "https://www.polymath-kids.com/",
  },
  {
    ...defaults,
    slug: "mobile-app-marketing-lead-capture",
    name: "MetaViz Mobile App Landing Website",
    projectType: "Frontend Development · Team Project",
    role: "Frontend Developer contributing to an existing Next.js application. I extended app showcase components and content, improved lead-form interactions, and preserved campaign context across the booking journey.",
    teaser:
      "A landing site for native Brilliant Directories apps, with app examples and two enquiry paths.",
    categories: ["Frontend"],
    context: "Team project",
    statusLabel: "Implemented · some updates on a feature branch",
    featured: true,
    professional: true,
    summary:
      "MetaViz's marketing site explains its native iOS and Android apps for Brilliant Directories owners, showcases shipped apps and the self-serve portal, and guides visitors toward an app plan or free app design. I contributed selected frontend and lead-capture improvements to the existing team project.",
    stack: ["Next.js 16", "React 19", "TypeScript", "Tailwind CSS v4"],
    problem:
      "Directory owners need to understand how their existing Brilliant Directories site would work as a native app, see real app examples, and choose a clear enquiry path. App showcases, forms, and booking navigation needed to support that journey.",
    solution:
      "I improved app showcase layouts, screenshot and video presentation, store-download sections, lead-form feedback, and campaign-aware navigation within the existing team-built site.",
    features: [
      {
        title: "App screenshot presentation",
        description:
          "Built responsive, optional CSS phone frames for raw screenshots without adding duplicate frames to images that already include device mockups.",
      },
      {
        title: "Demo-video sections",
        description:
          "Added individual video sections with preview images and alternating layouts to make app demonstrations easier to explore.",
      },
      {
        title: "Store download layouts",
        description:
          "Built separate Google Play and App Store blocks with store links and consistently framed listing screenshots.",
      },
      {
        title: "Lead-form experience",
        description:
          "Added accessible per-field validation, aligned frontend email validation with the server, and implemented a dismissible success popup using a portal.",
      },
      {
        title: "Campaign-aware navigation",
        description:
          "Preserved the campaign parameter through application, booking, and confirmation pages so visitors can return to the correct originating page.",
      },
      {
        title: "Project content",
        description:
          "Added and refined project entries, verified app-store links, and extended typed content without directly editing generated files.",
      },
    ],
    technicalHighlights: [
      "Data-driven optional sections support different project layouts through typed content.",
      "Percentage-based CSS phone frames scale across cards and larger screenshot views.",
      "A portal keeps the success overlay outside transformed animation containers.",
      "Consistent image aspect ratios align store screenshots.",
      "Return navigation uses known campaign values.",
    ],
    existingIntegrations:
      "GoHighLevel CRM and Meta Pixel were existing site integrations built by teammates; I did not implement them.",
    outcome:
      "Implemented improvements to project presentation, form feedback, and booking navigation. Some recent content and store-screenshot additions remain on a feature branch, so this project does not imply that every update is merged, deployed, or live.",
    attribution:
      "This was a team project. The original site design, core app showcase system, admin CMS, booking API/calendar, and existing marketing integrations were built by teammates. This page describes only my contribution.",
    visual: "metaviz",
    image: "/images/projects/metaviz-app-screens.webp",
    imageAlt:
      "MetaViz app showcase displaying a range of branded mobile screens",
    screenshots: [
      {
        src: "/images/projects/metaviz-case-studies-cards.webp",
        alt: "MetaViz case studies showing search filters and cards for Splandidebiz, SOIF, and USBusinessOnline",
        width: 1910,
        height: 825,
      },
      {
        src: "/images/projects/metaviz-app-screens.webp",
        alt: "MetaViz app showcase with a fan of branded mobile app screens",
        width: 1910,
        height: 900,
      },
      {
        src: "/images/projects/metaviz-splandidebiz-video.webp",
        alt: "Splandidebiz case study showing the app demonstration video and project details",
        width: 1910,
        height: 650,
      },
    ],
    demo: "https://app.metaviz.io/",
  },
  {
    ...defaults,
    slug: "design-review-client-feedback",
    name: "Design Review & Client Feedback Platform",
    projectType: "Full-Stack Development · Team Project",
    role: "Full-Stack Developer on an existing team-built product. I implemented team access, client analytics, review-canvas interactions, screen updates, and capture improvements across the interface and backend.",
    teaser:
      "Contributed team roles, visitor insights, canvas tools, and screen-update workflows to a design review platform.",
    categories: ["Full Stack"],
    context: "Team project",
    featured: false,
    professional: true,
    summary:
      "MetaViz Studio lets teams upload ZIP or HTML design exports, organize screens into review rounds, and collect client comments on a visual canvas. I contributed full-stack features to the existing product, focusing on team access, visitor insights, screen updates, and canvas usability. The live site requires sign-in to view projects.",
    stack: [
      "Next.js 14",
      "React 18",
      "TypeScript",
      "PostgreSQL",
      "Prisma",
      "Playwright / Chromium",
      "Nodemailer",
      "Docker",
    ],
    problem:
      "Design feedback can become scattered across messages and screenshots. Teams need a central place to review designs, understand visitor engagement, update individual screens, and manage access to projects.",
    solution:
      "I extended the existing product with role-based team access, visitor insights, smoother canvas interactions, screen replacement across review rounds, and more reliable design capture.",
    features: [
      {
        title: "Team accounts & permissions",
        description:
          "Implemented super admin, manager, and member roles; email invitations; a super-admin 'Login as' tool; and transfers of projects between managers' teams.",
      },
      {
        title: "Client visits & heatmaps",
        description:
          "Added name-and-email entry before a shared review opens, then recorded visits, clicks, and time spent on each screen. Built per-screen click heatmaps. Entered email addresses are self-declared, not verified.",
      },
      {
        title: "Review canvas interactions",
        description:
          "Kept comment pins the same visual size while zooming, added hover previews and count badges for grouped pins, improved mouse-wheel zoom and pan, added board-wide Ctrl+F search, and made side panels collapsible for a wider canvas.",
      },
      {
        title: "Screen updates across rounds",
        description:
          "Enabled selected screens to be replaced in the current round or carried into a new one. Wrote a repair script to reconnect comments that had become detached from their original screens.",
      },
      {
        title: "More reliable design capture",
        description:
          "Fixed cut-off phone frames and inaccurate screen bounds, supported artboards with different shapes, and grouped captured screens into sections.",
      },
    ],
    technicalHighlights: [
      "Board-wide Ctrl+F finds text across screen iframes and moves the canvas to a result without disturbing comment anchors.",
      "Comment pins remain readable at different zoom levels and collapse into count badges when crowded.",
      "A repair script restores comment-to-screen associations after screen updates.",
      "Capture sizing accounts for device frames and varied artboard shapes instead of clipping their edges.",
    ],
    outcome:
      "Delivered team-management, visitor-insight, canvas, screen-update, and capture improvements for the existing product. No usage or impact metrics are claimed.",
    attribution:
      "This was a team-built product. My contribution was the features described here; the original platform and its core review infrastructure were built by the team.",
    visual: "design-review",
    image: "/images/projects/hsvs-design-review-demo-poster.webp",
    imageAlt:
      "Frame from the HSVS Design Review demo showing the review canvas, page list, and comments panel",
    video: "/videos/hsvs-design-review-demo-4.mp4",
    screenshots: [
      {
        src: "/images/projects/design-review-dashboard.png",
        alt: "MetaViz Studio dashboard showing the project grid and ZIP or HTML upload area",
        width: 3200,
        height: 2000,
      },
      {
        src: "/images/projects/design-review-canvas.png",
        alt: "MetaViz Studio review canvas with mobile screens, numbered comment pins, an open comment, and the comments sidebar",
        width: 3200,
        height: 2000,
      },
      {
        src: "/images/projects/design-review-analytics.png",
        alt: "MetaViz Studio visitor analytics with visits, clicks, viewing time, and per-screen activity cards",
        width: 3200,
        height: 4450,
      },
    ],
    demo: "https://mockup.metaviz.pro/",
  },
  {
    ...defaults,
    slug: "email-automation",
    name: "Smart Email Workflow",
    categories: ["Automation"],
    context: "Workflow in development",
    status: "In Progress",
    summary:
      "An n8n workflow in development to classify incoming emails and prepare contextual draft responses for human review.",
    stack: ["n8n", "Gmail", "AI model integration", "Workflow automation"],
    problem: "Sorting repetitive inquiries and preparing replies takes time.",
    solution:
      "A proposed review-first workflow that identifies email type and prepares a contextual draft.",
    features: [
      "Planned: email classification",
      "Planned: AI-assisted contextual drafting",
      "Planned: human review before sending",
    ],
    visual: "automation",
  },
  {
    ...defaults,
    slug: "order-management",
    name: "Google Sheets Order Management",
    categories: ["Automation"],
    context: "Workflow in development",
    status: "In Progress",
    summary:
      "An automation workflow in development to capture customer orders and store and update records in Google Sheets.",
    stack: ["n8n", "Google Sheets", "Webhooks", "Workflow automation"],
    problem:
      "Manually transferring customer order information into spreadsheets introduces repetitive steps.",
    solution:
      "A proposed webhook workflow that captures order information and creates or updates Google Sheets records.",
    features: [
      "Planned: webhook-based order capture",
      "Planned: Google Sheets record creation",
      "Planned: order record updates",
    ],
    visual: "automation",
  },
];
