# Portfolio Site Tasks

## Done ✅
- Shared components accessible (Modal focus trap, ARIA labels, skip-to-content)
- Bug fixes (resume PDF path, Cured link, CSS typo, stray class)
- Refactors (clip-right-angle → app.css, BouncingArrow, ContactSection components, CSS marquee)
- Nav: desktop links + mobile hamburger menu
- Per-page title tags, OpenGraph/Twitter meta tags, custom 404 page
- Page transitions (View Transitions API)
- Scroll-triggered reveal animations on section content
- Home grid staggered entrance animations + nameplate pulse
- Syne font weights upgraded (400–800)
- Footer redesigned ("LET'S WORK TOGETHER" with email + social icons)
- Marquee slowed down (60s desktop / 90s mobile)
- Red accent system (left border stripe on sections, CTA hover glow)
- Writing page: inline error instead of alert(), Svelte 5 syntax

## Current Priorities

### P1 — High impact, not yet done
1. **Experience page bullets** — replace placeholder "X million dollars" text with real metrics; style bullets with red accent markers instead of plain list-disc
2. **Writing page content** — page feels thin; add more sections (reading list, quotes, or short excerpts) to match the passion described in the copy
3. **Image optimization** — add `loading="lazy"` to below-fold images; `fetchpriority="high"` to hero images to improve load performance
4. **Micro-interactions on home tiles** — label badge should slide right slightly on hover (translate-x-2); currently only image scales

### P2 — Polish
5. **Animated nav underline** — desktop nav links: underline that slides in left-to-right on hover (CSS pseudo-element) instead of instant border-bottom
6. **Active nav link indicator** — highlight the current page's nav link (use `$page.url.pathname` to match)
7. **Experience bullets styling** — custom red square/dot markers instead of list-disc
8. **Dark mode toggle** — Tailwind dark: variants + localStorage preference

### P3 — Nice to have
9. Personal GitHub link (currently points to work account tmoh-figs)
10. Reading list or quotes section on writing page
