# Hammad Tauqir — Portfolio design reference

This package contains the actual HTML, CSS, and JavaScript used by the portfolio design preview. No access to the private website is needed. These are editable design files, not screenshots or a Next.js implementation.

## Give this folder to Codex

Extract this ZIP into your Next.js project so that Codex can read `design-reference/`. Keep this folder as the visual reference.

Paste this instruction into Codex:

> Read README.md and the files in design-reference/, especially styles.css and app.js. Recreate this portfolio in Next.js App Router with TypeScript and reusable components, following my earlier portfolio requirements. Treat these files as the visual source of truth. Match the colors, typography, spacing, responsive behavior, and page layouts. Implement Home, Projects, each Project Details route, and Contact. Inspect the reference locally at 1440px desktop and 390px mobile widths if browser tools are available. Preserve project filtering and mobile navigation. Keep illustrative project graphics clearly distinguishable from real screenshots. Do not invent contact details, links, achievements, or certificate information. Keep the contact form honest until an endpoint is configured. Do not replace the design with a generic template. Implement the site and run the available checks.

## Files and pages

- `design-reference/styles.css`: complete design system and responsive styling.
- `design-reference/app.js`: all page layouts, project data, filters, and navigation interactions.
- `/`: Home, including About, Expertise, Experience, Education, and credential placeholders.
- `/projects/`: project grid and category filters.
- `/projects/devlog/`: project detail example.
- Other project details: `/projects/polymath-kids/`, `/projects/metaviz-landing/`, `/projects/banking-app/`, `/projects/email-automation/`.
- `/contact/`: contact layout and inactive form preview.

The HTML files share one application script. Do not assess the design from the HTML shell alone.

## Preview locally

Open a terminal in `design-reference` and run:

```sh
python -m http.server 8000
```

Then open http://localhost:8000 in your browser. A local server is required because asset and navigation paths start at `/`. Opening index.html directly from the filesystem will not reproduce the site correctly.

## Design specifications

- Background: #0b1016
- Panels: #111a20 and #17232a
- Text: #f4f4ec
- Secondary text: #a4b1b2
- Accent: #cefa7b
- Borders: #2a383e
- Main typeface: Space Grotesk, with Arial fallback
- Labels/code typeface: DM Mono, with monospace fallback
- Content width: maximum 1400px
- Responsive breakpoints: 1100px, 760px, 450px
- Reference review widths: 1440px desktop and 390px mobile

Google Fonts are loaded online. If offline, system fallback fonts will be used.

## Intentional placeholders

Project visuals are CSS illustrations, not actual product screenshots. Contact submission is disabled until connected. Real profile links, email, CV, certificate titles, and credential URLs were not supplied. Confirm these before making the final portfolio public. A dark/light toggle was in the initial feature brief; this visual concept supplies the dark theme only, so implement a matching light theme if retaining that requirement.

## Verification

JavaScript syntax and the presence of all eight routes were checked. Desktop/mobile CSS is included; browser screenshots and visual browser verification are not included in this package.
