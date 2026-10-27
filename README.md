# Hammad Tauqir — portfolio

A responsive Next.js App Router portfolio built from the supplied `Portfolio-Design-Files/design-reference/app.js` and `styles.css`. The reference folder is preserved unchanged. The original charcoal/lime palette, Space Grotesk and DM Mono typefaces, illustrated cards, four page layouts, and 1100px / 760px / 450px breakpoints are retained. A matching light theme and the additional sections in the brief are included.

## Stack and routes

Next.js, React, TypeScript, Tailwind CSS, Framer Motion, and Lucide React. Fonts are self-hosted through Fontsource; no runtime Google Fonts request is required. Most components render on the server. Client components handle navigation, theme, project filtering, the contact form, and the subtle hero entrance.

- `/`: hero, featured work, about, skills, experience, education, services, certificates, contact.
- `/projects`: all six projects, with All / Full Stack / Frontend / Mobile / AI Automation filters.
- `/projects/[slug]`: statically generated, data-driven case studies with previous/next navigation.
- `/contact`: contact information and validated form.
- Custom not-found, loading, and error states; generated Open Graph image, robots and sitemap.

There is no database, admin dashboard, authentication, or unnecessary API route.

## Install and run

Use Node.js 22 LTS or newer and npm.

```sh
npm ci
```

Copy `.env.example` to `.env.local` (PowerShell: `Copy-Item .env.example .env.local`). The site runs without environment variables.

```sh
npm run dev
```

Open `http://localhost:3000`. For a production preview:

```sh
npm run build
npm start
```

If your environment globally forces npm offline, use `npm ci --offline=false` with network access.

## Editable content

| File                     | Content                                                                                                                         |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------- |
| `config/site.ts`         | Name, title, introduction, about copy, location, availability, social URLs, email, CV, portrait, education, optional statistics |
| `data/projects.ts`       | All projects, filters, technology tags, statuses, links, images, detailed case-study copy                                       |
| `data/skills.ts`         | Skills and categories                                                                                                           |
| `data/experience.ts`     | Employment descriptions and dates                                                                                               |
| `data/services.ts`       | Service names and descriptions                                                                                                  |
| `data/certifications.ts` | Issuer, verified certificate title, date, image, credential URL                                                                 |

Missing social profiles and CV are labeled as unavailable, rather than rendered as broken links. Missing project demo and repository links are hidden. The MetaViz repository is marked private and cannot render a GitHub link unless `privateRepo` is changed. Both automation projects remain **In Progress** and their features are marked as planned. Statistics with a `null` value are hidden; enter only values you have verified. Employment dates, certificate details, implementation challenges and learning notes are explicitly pending.

### Add a project

Add a typed object to `projects` in `data/projects.ts`, using a unique URL-safe `slug`. Set `categories`, `status`, `featured`, `summary`, `stack`, `problem`, `solution`, and `features`. Supply real `challenges` and `learned` notes when ready. Add verified `demo` and `github` URLs, or keep them empty. Use `privateRepo: true` for private work. The card, filter results, detail page, navigation, and sitemap update automatically. Build again after changes.

`featured: true` includes a project on Home. A project can have multiple categories, so the MetaViz project appears in both Frontend and Full Stack.

### Add a certificate

Edit or add an entry in `data/certifications.ts`. Supply the exact verified title, issuer, issue date, credential URL, and image path. Empty fields remain clearly labeled placeholders. No certificate completion or credential has been invented.

## Replace assets

Paths in code begin with `/`; files live under `public/`.

| Asset                    | File location                                                        | Configuration                                                                                                                                                                                           |
| ------------------------ | -------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Profile photo (optional) | `public/images/profile/hammad-tauqir.webp`                           | Set `site.profileImage` to `/images/profile/hammad-tauqir.webp`. Replaces the developer illustration.                                                                                                   |
| CV PDF                   | `public/documents/hammad-tauqir-cv.pdf`                              | Set `site.cv` to `/documents/hammad-tauqir-cv.pdf`. Enables the download links.                                                                                                                         |
| Project cover            | `public/images/projects/devlog.webp`, or another meaningful filename | Set the project's `image` path.                                                                                                                                                                         |
| More screenshots         | `public/images/projects/devlog-dashboard.webp`, etc.                 | Add `{ src, alt }` objects to the project's `screenshots`. Use descriptive alt text.                                                                                                                    |
| Certificates             | `public/images/certificates/ibm.webp`, `ahrefs.webp`                 | Set each certificate's `image`.                                                                                                                                                                         |
| Favicon                  | `public/favicon.svg` and `app/favicon.ico`                           | Replace both supplied HT monograms (SVG and browser ICO fallback).                                                                                                                                      |
| Social sharing image     | `public/images/og/portfolio.png` (1200 × 630)                        | To use your own image, replace `app/opengraph-image.tsx` with `app/opengraph-image.png`, or remove that route and set `openGraph.images` and `twitter.images` in `app/layout.tsx` to your public asset. |

The default Open Graph image is generated locally using the portfolio's colors and name. CSS project illustrations are labeled **Illustrative preview**, and are never presented as real product screenshots. Next.js Image handles supplied local raster assets. Prefer compressed WebP/AVIF images. No portrait, PDF, credential, project link or screenshot has been invented.

## Contact form

The enquiry form preview appears on Home and `/contact`. It collects name, email and project description, with an optional project type. The `POST /api/contact` endpoint validates those fields and returns field errors for invalid input. Valid input receives a 503 response explaining that delivery is not configured; no enquiry is saved or sent. The submit button remains disabled until email delivery and spam protection are added.

## Environment and SEO

- `NEXT_PUBLIC_SITE_URL`: actual production origin, including `https://`, without a trailing slash. Used for canonical links, absolute metadata URLs and sitemap entries. Leave empty for local work. No invented production hostname is used; the sitemap is empty until this is configured.

These public environment values are embedded at build time. Rebuild after changing them. Theme preference is saved in localStorage, defaults to dark, and is applied before page paint. It still works when storage is unavailable. Reduced-motion preferences are respected.

## Checks

```sh
npm run format
npm run format:check
npm run lint
npm run typecheck
npm run build
```

Browser checks use Playwright and your installed Microsoft Edge by default:

```sh
npm run test:e2e
```

If Edge is unavailable, install Playwright Chromium with `npx playwright install chromium`, then set `PLAYWRIGHT_BROWSER=chromium` before running. Tests cover desktop (1440px), tablet (820px), and mobile (390px), all page layouts, navigation, filters, theme persistence, contact validation, honest unconfigured submissions, 404 handling, and horizontal overflow. Screenshots are saved under the ignored `test-results/` folder. The server starts automatically for tests.

## Deploy on Vercel

1. Push this Next.js project to your own Git repository, keeping `.env.local` out of Git.
2. Import the repository into Vercel. Use the Next.js framework preset, project root, and `npm run build`.
3. Set `NEXT_PUBLIC_SITE_URL` to your actual deployment origin and optionally add the contact endpoint.
4. Deploy. Check the real domain, sitemap, social sharing image, contact delivery, and CV download once configured.

This work is a local, Vercel-compatible implementation. It does not modify or publish the original private design-reference site.
