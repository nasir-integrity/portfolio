# NASIR Scrollytelling Portfolio — Implementation Plan

## Objective
Build a single-page scrollytelling engineering & product portfolio for **NASIR** (*Nusantara Asset Integrity and Risk Platform*) [source: `ZimrionVarethos/pertamuda`, target: `nasir-integrity/portfolio`].

## Stack & Constraints
- **Framework**: Next.js (App Router) + TypeScript
- **Animation**: `motion` (`motion/react` + `motion/react-m`), wrapped in `<MotionConfig reducedMotion="user">` and `<LazyMotion features={domAnimation}>`. Animate only `transform` and `opacity`; drive scroll effects via `useScroll` and `useTransform`.
- **Smooth Scroll**: `lenis` (`lenis/react` `<ReactLenis root />`)
- **Styling**: Tailwind CSS v4 (`@import "tailwindcss";` + `@theme`)
- **3D / Canvas**: React Three Fiber (`@react-three/fiber`, `@react-three/drei`, `three`), dynamically lazy-loaded in isolated client components
- **Design System**:
  - **Isotherm**: 2-column layout (text-image), interactive visual plates with saturation transitions, rigid 0px-radius components, cool off-white (`#F4F4F0`), vermillion orange (`#FF3B00`), pitch black (`#0D0D0D`).
  - **Havenly**: Geist Mono / JetBrains Mono dominant typography with Geist Sans body copy, straight-cut chamfered edges (`clip-path`) as accents, text reveal/scramble animations.

## Ordered Execution Steps

1. **Commit 1 — `chore: initialize repository and gitignore`**
   - `git init`, create branch `feat/initial-portfolio`, configure remote `https://github.com/nasir-integrity/portfolio.git`.
   - Add `.gitignore` covering `node_modules`, `.next`, `out`, `build`, `.env*`, `.DS_Store`, `*.tsbuildinfo`.

2. **Commit 2 — `chore: scaffold next.js typescript and tailwind v4 foundation`**
   - Create `package.json`, `tsconfig.json`, `next.config.ts`, `postcss.config.mjs`.
   - Install dependencies (`next`, `react`, `react-dom`, `motion`, `lenis`, `three`, `@types/three`, `@react-three/fiber`, `@react-three/drei`, `lucide-react`, `clsx`, `tailwind-merge`, `@radix-ui/react-slot`, `class-variance-authority`).
   - Set up `src/app/globals.css` (Tailwind v4 `@theme` with `#F4F4F0`, `#0D0D0D`, `#FF3B00`, chamfered utility classes, hairline grid utilities) and `src/app/layout.tsx` (`Geist_Mono` + `Geist` fonts).

3. **Commit 3 — `feat(core): add motion, lenis providers, and rigid ui primitives`**
   - `src/lib/utils.ts` (`cn` helper)
   - `src/components/providers/app-providers.tsx` (`<ReactLenis root>` + `<MotionConfig reducedMotion="user">` + `<LazyMotion features={domAnimation}>`)
   - `src/components/ui/chamfer-card.tsx`, `src/components/ui/button.tsx`, `src/components/ui/badge.tsx`, `src/components/ui/decode-text.tsx` (Havenly straight-cut edges, rigid borders, monospace decode/stagger animations)
   - `src/app/template.tsx` (page transition boundary)

4. **Commit 4 — `feat(data): add typed nasir domain data, formulas, and telemetry specs`**
   - `src/data/nasir-content.ts`: Typed data for the 6 operational stages, API 580 & OGMP 2.0 standards, 4 vessel segments (`F-101`, `Zone A`, `EV-01`, `N-02`), deterministic risk calculation helpers (`clamp100`, corrosion, leak, emission signal, composite score, 24h freshness check), and methane interval integration helper.

5. **Commit 5 — `feat(scenes): add lazy-loaded react three fiber vessel and inspector scenes`**
   - `src/components/scenes/facility-hero-scene.tsx`: 10-part horizontal 3-phase separator pressure vessel adapted to the `#0D0D0D` / `#FF3B00` / `#F4F4F0` industrial aesthetic with studio lighting, telemetry beacons, and HUD overlays.
   - `src/components/scenes/asset-inspector-scene.tsx`: Interactive 4-segment R3F vessel inspector highlighting selected segments (`F-101`, `Zone A`, `EV-01`, `N-02`) in vermillion (`#FF3B00`) and off-white (`#F4F4F0`).

6. **Commit 6 — `feat(sections): implement header, act 1 3d hero, and act 2 standards matrix`**
   - `src/components/sections/site-header.tsx`: Rigid top navigation bar with live coordinates, act index jump links, and GitHub link.
   - `src/components/sections/act-hero.tsx`: Act I Dark Industrial Cutaway hero with lazy-loaded 3D pressure vessel, Havenly monospace headline reveal, and scroll-linked parallax via `useScroll`/`useTransform`.
   - `src/components/sections/act-problem-standards.tsx`: Act II Cool Off-White blueprint grid comparing legacy unverified logs against API 580 Risk-Based Inspection and OGMP 2.0 Methane Quantification.

7. **Commit 7 — `feat(sections): implement act 3 isotherm 2-column 6-stage pipeline scrollytelling`**
   - `src/components/sections/act-pipeline-scrollytelling.tsx`: Sticky 2-column Isotherm layout for the 6 NASIR operational stages.
   - `src/components/sections/pipeline-visual-plates.tsx`: 6 architectural SVG & high-contrast UI mockup plates with Isotherm saturation transitions (`grayscale` to full-color vermillion active state on scroll/hover) and Motion `transform`/`opacity` transitions.

8. **Commit 8 — `feat(sections): implement act 4 interactive 3d risk and methane simulator`**
   - `src/components/sections/act-risk-simulator.tsx`: Dark Industrial Cutaway combining the 3D `AssetInspectorScene` with live parameter controls (`wall_loss_pct`, `pressure_bar`, `methane_ppm`, `24h_freshness_window`, `methane_rate_kg_h`, `interval_hours`) computing real-time Corrosion, Leak, Emission Signal, Composite Triage Score, and `CH4` / `CO2e` mass with null-safety provenance.

9. **Commit 9 — `feat(sections): implement act 5 architecture specs, act 6 footer, and assemble page`**
   - `src/components/sections/act-architecture-scope.tsx`: Act V System Stack (Laravel 13, React 19, Inertia.js, Three.js, Multi-Tenant Policy), Prototype Scope Honesty matrix, and Sector Roadmap (CFPP / Cement).
   - `src/components/sections/act-footer-cta.tsx`: Act VI Pilot Access, repository links (`ZimrionVarethos/pertamuda` & `nasir-integrity/portfolio`), and terminal colophon.
   - `src/app/page.tsx`: Assemble all 6 acts into the single-page scrollytelling flow.
   - Verify with `npm run lint` (`tsc --noEmit`) and `npm run build`.
