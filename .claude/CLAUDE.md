# sosalover.github.io

Personal portfolio site for Thomas Moh, built with SvelteKit. For the current task list, please look at TASKS.md. Please create an agent team with three teammates run in parallel. 1. A team lead and architect 2. A code janitor, refactoring the code based on the architect's design 3. A UI expert, making the site accessible and beautiful

## Tech Stack
- **Framework**: SvelteKit 2 + Svelte 5
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4 (Vite plugin, not PostCSS config)
- **Font**: Syne (Google Fonts, loaded via app.html)
- **Build**: Vite 6
- **Deployment**: Vercel

## Commands
- `npm run dev` — start local dev server
- `npm run build` — production build
- `npm run check` — SvelteKit type checking
- `npm run preview` — preview production build locally

## Code Style
Enforced by Prettier (`.prettierrc`):
- **Tabs** for indentation (not spaces)
- **Single quotes**
- Max line width: 100 characters
- No trailing commas
- Svelte plugin enabled

Run `npx prettier --write .` to format.

## Project Structure
- `src/routes/` — SvelteKit file-based routing (pages)
- `src/components/` — Reusable Svelte components
- `src/lib/` — Shared utilities and data
- `src/svgs/` — SVG icon components (GitHub, LinkedIn)
- `static/` — Static assets (images, PDFs, favicon)
- `BurritoCV/` — Embedded Unity WebGL game (self-contained, do not modify)

## Key Routes
- `/` — Home grid (4-tile navigation)
- `/experience` — Work history
- `/writing` — Writing/blog
- `/physical-creations` — Physical projects
- `/digital-creations` — Digital projects
  - `/digital-creations/digital-garden` — Interactive scrapbook
  - `/digital-creations/burrito-cv` — Unity WebGL embed

## Architecture Notes
- Global layout in `src/routes/+layout.svelte` — sticky header with name + social icons, footer
- `SectionWithStickyHeader.svelte` — wraps page sections with sticky subheaders
- `SectionContent.svelte` — displays individual portfolio items
- `Modal.svelte` — generic modal; `DigitalGardenModal.svelte` for the garden feature
- Custom Tailwind utility `clip-right-angle` used for skewed section borders
- `svelte.config.js` sets `appDir: 'app'` to avoid GitHub Pages issues with `_app`
- Adapter: `@sveltejs/adapter-static` for static export

## Deployment
The site is deployed via **Vercel** (not GitHub Pages, despite the repo name). The `gh-pages` package in devDependencies is unused/legacy.

## Constraints for Claude
- **NEVER modify files outside of this codebase** (`/Users/thomasmoh/Documents/Github/sosalover.github.io`). This includes system files, other repos, Claude's own config files, or any path outside the project root.
