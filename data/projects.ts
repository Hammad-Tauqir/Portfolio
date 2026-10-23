export const categories = [
  "All",
  "Full Stack",
  "Frontend",
  "Mobile",
  "AI Automation",
] as const;
export type Category = Exclude<(typeof categories)[number], "All">;
export type Project = {
  slug: string;
  name: string;
  categories: Category[];
  context: string;
  status: "Completed" | "In Progress";
  featured: boolean;
  professional?: boolean;
  summary: string;
  stack: string[];
  problem: string;
  solution: string;
  features: string[];
  visual:
    | "receptionist"
    | "devlog"
    | "polymath"
    | "metaviz"
    | "banking"
    | "automation";
  image: string;
  screenshots: { src: string; alt: string }[];
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
    categories: ["AI Automation"],
    context: "Invite-only portfolio demo",
    featured: true,
    summary:
      "A website assistant that answers service questions, captures leads, and manages appointments across Google Calendar and Sheets.",
    stack: ["n8n", "Google Calendar", "Google Sheets", "Email", "Web Voice"],
    problem:
      "Service businesses lose time answering repeat questions and moving booking details between disconnected tools.",
    solution:
      "An invite-only website demo that connects guided conversations with lead capture, calendar availability, booking notifications, and verified booking changes.",
    features: [
      "Business services and FAQ answers",
      "Lead capture into Google Sheets",
      "Google Calendar availability checks and appointment booking",
      "Booking notification emails",
      "Email-code verification for rescheduling and cancellation",
      "Website voice input and reply read-aloud",
      "Invite-only access",
    ],
    visual: "receptionist",
    challenges:
      "The workflow coordinates several business tools while keeping booking changes protected by email-code verification.",
    learned:
      "A useful assistant needs clear boundaries, transparent access rules, and dependable hand-offs between conversation and business systems.",
  },
  {
    ...defaults,
    slug: "devlog",
    name: "DevLog",
    categories: ["Full Stack"],
    context: "Personal project",
    featured: true,
    summary:
      "A focused space for developers to record progress, track consistency, and turn daily work into meaningful AI-powered reports.",
    stack: ["Next.js", "TypeScript", "Prisma", "MySQL", "JWT", "Tailwind CSS"],
    problem:
      "Daily development work is easy to forget and difficult to summarize after weeks of progress.",
    solution:
      "DevLog brings logs, streaks, dashboard totals, and AI-generated reports into one clear workflow.",
    features: [
      "Secure JWT and cookie-based authentication",
      "Daily development logs with CRUD operations",
      "Streak and activity tracking",
      "Dashboard statistics",
      "AI-generated progress reports",
      "Pagination",
      "Resource-based authorization",
    ],
    visual: "devlog",
  },
  {
    ...defaults,
    slug: "polymath-kids",
    name: "Polymath Kids",
    categories: ["Full Stack"],
    context: "Final-year project",
    featured: true,
    summary:
      "An e-learning platform connecting educational content, student journeys, and business operations. Built as my final-year project.",
    stack: ["React.js", "Node.js", "Express.js", "MySQL"],
    problem:
      "Managing educational content, students, and payments across separate systems creates extra work.",
    solution:
      "A unified e-learning experience with course management, CRM integration, and local payment flows.",
    features: [
      "Course and student management",
      "CRM integration",
      "EasyPaisa integration",
      "JazzCash integration",
      "Responsive learning interface",
    ],
    visual: "polymath",
  },
  {
    ...defaults,
    slug: "metaviz-landing",
    name: "Mobile App Lead Platform",
    categories: ["Frontend", "Full Stack"],
    context: "MetaViz Studio work",
    featured: true,
    professional: true,
    privateRepo: true,
    summary:
      "A responsive mobile app landing and lead-generation platform connecting appointments, CRM, and conversion tracking at MetaViz Studio.",
    stack: [
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "GoHighLevel",
      "Meta Pixel",
    ],
    problem:
      "Campaign visitors need a clear path from discovery to inquiry and appointment booking.",
    solution:
      "A landing and lead-generation platform with connected booking, CRM, and conversion tracking.",
    features: [
      "Responsive landing pages",
      "GoHighLevel CRM integration",
      "Appointment booking",
      "Lead-generation workflow",
      "Meta Pixel conversion tracking",
    ],
    visual: "metaviz",
  },
  {
    ...defaults,
    slug: "banking-app",
    name: "Banking Management App",
    categories: ["Mobile"],
    context: "Android application",
    featured: false,
    summary:
      "An Android application for user account management and transaction workflows.",
    stack: ["Java", "XML", "Android Studio", "Firebase"],
    problem:
      "Users need a straightforward mobile interface for essential account and transaction actions.",
    solution:
      "A native Android interface connected to Firebase for account and transaction data.",
    features: [
      "User authentication",
      "Account management",
      "Transaction management",
      "Firebase data storage",
    ],
    visual: "banking",
  },
  {
    ...defaults,
    slug: "email-automation",
    name: "Smart Email Workflow",
    categories: ["AI Automation"],
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
    categories: ["AI Automation"],
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
