# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Primary users are **Upstream and Midstream Oil & Gas Operations Managers, Reliability Engineers, and HSE (Health, Safety, and Environment) Practitioners** evaluating NASIR for commercial enterprise procurement, pilot facility deployment, and regulatory audit readiness.

Secondary visitors include **Pertamuda Seed & Scale evaluators and industrial partners** inspecting the platform's engineering architecture, deterministic methodology, and the **NASIR Integrity Team** behind the system.

## Product Purpose

**NASIR** (*Nusantara Asset Integrity and Risk Platform*) is a web-based industrial intelligence platform that connects field inspection sensor observations with **API 580 Risk-Based Inspection (RBI) maintenance prioritization** and **OGMP 2.0 traceable fugitive methane emissions quantification** for oil, gas, and petrochemical facilities.

It exists to solve the failure modes of fragmented spreadsheet inspection logs in aging pipelines, pressure vessels, and storage tanks—where missing sensor readings are silently coerced to zero, pressure deviations go unlinked to maintenance work orders, and ambient methane concentration spikes (`ppm`) are erroneously conflated with annual carbon mass tonnage (`kg CH4` / `tCO2e`).

Success means an operations or HSE manager can verify the exact mathematical provenance of every risk triage score and methane mass calculation, inspect component-level 3D vessel risk, and initiate a facility pilot evaluation or inspect the open-source reference platform.

## Positioning

Unlike black-box industrial dashboards or generic ESG reporting tools that blend operational risk indices with carbon credit claims, NASIR enforces a **strict architectural and scientific separation** between:

1. **Operational Maintenance Triage (`0–100` Composite Score):** Weighted deterministic evaluation of ultrasonic wall loss (`35%`), differential pressure deviation (`40%`), and optical methane sniffer signals (`25%`) within a rolling **24-hour freshness window**, where missing or stale parameters propagate `NULL` (`Insufficient Data`) rather than defaulting to `0`.
2. **Audit-Grade Fugitive Methane Mass Integration (`kg CH4` & `tCO2e`):** Time-interval integration (`methane_rate_kg_h * interval_hours`) exclusively from validated mass flow observations, with automatic rejection of overlapping intervals (`obsStart < lastEnd`) to prevent double counting and an explicit temporal `coverage_ratio` (`0.00–1.00`).

## Operating Context

- **Industrial Environment:** Upstream and midstream oil & gas separation skids, 3-phase horizontal pressure vessels (`SEP-3P-104A`), weld-neck flanges (`F-101`), cylindrical shells (`Zone A`), pressure safety relief valves (`EV-01`), and gas export nozzles (`N-02`).
- **Field Telemetry & Instruments:** Ultrasonic thickness gauges (`wall_loss %` vs. `10.3 mm` nominal wall), differential pressure transducers (`bar` vs. `8.6 bar` baseline), Optical Gas Imaging (OGI) / laser methane sniffers (`ppm`), and Hi-Flow Sampler mass flow meters (`kg/h`).
- **Regulatory & Engineering Standards:** API Recommended Practice 580 (Risk-Based Inspection), OGMP 2.0 (Oil & Gas Methane Partnership Reporting Framework), ASME Boiler and Pressure Vessel Code (Section VIII), and IPCC AR5 Global Warming Potentials (`28x` 100-year / `84x` 20-year).
- **Operational Rituals:** Validated CSV batch ingestion with SHA-256 evidence hashing, row-level quality quarantine, 4-tier maintenance work-order dispatch (`Critical`, `High`, `Medium`, `Low`), and immutable `ReportVersion` regulatory audit dossiers.

## Capabilities and Constraints

### Confirmed Capabilities
- **6-Stage Operational Pipeline:**
  1. Multi-tenant Asset Registration & 3D Spatial Mapping (`AssetController.php`)
  2. Schema-Validated Field Observation CSV Import with Row Quarantine (`ImportCsvAction.php`)
  3. Deterministic API 580 Integrity & Risk Triage Engine (`DemoRiskProvider.php`)
  4. OGMP 2.0 Fugitive Methane Mass & `CO2e` Interval Integrator (`EmissionCalculator.php`)
  5. Risk-Prioritized Corrective & Preventive Maintenance Dispatch (`MaintenanceTaskController.php`)
  6. Immutable Versioned Compliance Dossiers & Print/CSV Export (`ReportBuilder.php`)
- **Interactive 3D Spatial Inspection:** Real-time React Three Fiber (`Three.js`) 10-part horizontal 3-phase separator digital twin and clickable 4-segment component risk inspector (`facility-hero-scene.tsx`, `asset-inspector-scene.tsx`).
- **Live Deterministic Simulator:** Interactive workbench allowing evaluators to test `wall_loss_pct`, `pressure_bar`, `methane_ppm`, the `24h` freshness gate, missing-sensor null-safety, `methane_rate_kg_h`, interval hours, GWP factors, and interval overlap rejection in real time.
- **Cross-Sector Expansion Architecture:** Designed to extend via the `RiskProvider` contract into Coal-Fired Power Plants (`CFPP / PLTU` boiler creep-fatigue & CEMS flue-gas) and Cement Calcination Facilities (`Rotary Kiln` thermal stress & clinker `CO2` factors).

### Explicit Prototype Boundaries (Non-Claims)
- **No Unverified Live SCADA Claims:** The MVP operates on validated CSV batch ingestion and deterministic demonstration providers; it does not claim direct live hardware PLC/Modbus/OPC-UA streaming.
- **Zero-Substitution Prohibition:** Stale (`>24h`) or missing sensor parameters never default to `0`; composite risk strictly evaluates to `NULL` (`Insufficient Data`).
- **Strict Claim Separation:** Risk triage scores (`0–100`) are never used as carbon tonnage, and ambient `ppm` sniffer readings never produce `kg CH4` mass without a validated `kg/h` flow rate and measured time interval.
- **No Direct Government Gateway Filing:** Generates print-ready and CSV audit dossiers for human regulatory review rather than claiming automated ministry API submission.

### Team & Portfolio Requirement
- **NASIR Integrity Team:**
  - **Rafi Fakhri Alaudin** — Software Engineering Technology (*Teknologi Rekayasa Perangkat Lunak*), Vocational School of IPB University (*Sekolah Vokasi IPB University*)
  - **Moch. Farrel Azqila Simbolon** — Software Engineering Technology (*Teknologi Rekayasa Perangkat Lunak*), Vocational School of IPB University (*Sekolah Vokasi IPB University*)
  - **Daffa Bisma Rudidharma** — Software Engineering Technology (*Teknologi Rekayasa Perangkat Lunak*), Vocational School of IPB University (*Sekolah Vokasi IPB University*)
- **Interactable Team Cards:** Must be presented as interactable cards that redirect visitors to each respective member's individual portfolio (with Daffa Bisma Rudidharma's portfolio at `https://daffabisma.com`, and configurable/verified portfolio URLs for Rafi Fakhri Alaudin and Moch. Farrel Azqila Simbolon).

## Brand Commitments

- **Identity:** **NASIR** (*Nusantara Asset Integrity and Risk Platform*) — developed by the **NASIR Integrity Team** (Vocational School of IPB University) for Pertamuda Seed & Scale 2026.
- **Voice & Tone:** International engineering and product case-study authority—precise, transparent about mathematical formulas and prototype boundaries, zero marketing fluff or unsubstantiated ESG claims.
- **Pinned Design References & Structural Commitments:**
  - **Isotherm (`isotherm.framer.website`):** 2-column scrollytelling architecture (left narrative/spec column, right visual plate), interactive saturation transitions (desaturated/monochrome by default, snapping to full-color vermillion telemetry on scroll/hover), rigid `0px`-radius components, and high-contrast palette of cool off-white (`#F4F4F0`), vermillion orange (`#FF3B00`), and pitch black (`#0D0D0D`).
  - **Havenly (`havenly.framer.ai`):** Monospace-dominant typographic hierarchy (`Geist Mono` / `JetBrains Mono` paired with `Geist Sans`), straight-cut chamfered component edges (`clip-path`) as structural accents in place of border rounding, and technical character-decode text animations.

## Evidence on Hand

- **Source Platform Repository:** `https://github.com/ZimrionVarethos/pertamuda` (Laravel 13, PHP 8.2+, React 19, Inertia.js 3.0, Three.js, Pest PHP test suite).
- **Target Portfolio Repository:** `https://github.com/nasir-integrity/portfolio`
- **Verified Domain Formulas & Codebase Artifacts:**
  - `app/Services/Risk/DemoRiskProvider.php` (API 580 triage weights, `clamp100`, 24-hour window, null-safety)
  - `app/Services/Emissions/EmissionCalculator.php` (OGMP 2.0 `kg/h` interval clipping, overlap guard, `coverage_ratio`, `+/- 15%` instrument uncertainty)
  - `app/Actions/Imports/ImportCsvAction.php` (CSV validation and row quarantine)
  - `app/Services/Reporting/ReportBuilder.php` (Immutable `ReportVersion` snapshots)
  - `tests/Unit/NasirDomainFormulasTest.php` & `tests/Feature/NasirMultiTenancyPolicyTest.php`
  - Ported 3D scenes in `src/components/scenes/facility-hero-scene.tsx` and `src/components/scenes/asset-inspector-scene.tsx`
- **Deliberate Absences (Do Not Fabricate):** No fabricated commercial oil & gas client logos, no invented production uptime SLAs, and no unverified carbon credit certificates.

## Product Principles

1. **Mathematical Provenance Over Black-Box Scores:** Every risk index and emission figure must expose its underlying formula, input observation references, and time-window constraints.
2. **Null-Safety Is Non-Negotiable:** Missing or expired telemetry must surface explicitly as `NULL (Insufficient Data)`—never masked by zero-substitution.
3. **Strict Boundary Between Triage and Tonnage:** Operational maintenance prioritization (`0–100`) and regulatory fugitive mass accounting (`kg CH4`) serve distinct engineering jobs and must never be conflated.
4. **Spatial Context Anchors Abstract Telemetry:** Sensor anomalies become immediately actionable when bound to specific physical 3D vessel geometry (`F-101`, `Zone A`, `EV-01`, `N-02`).
5. **Scope Honesty Builds Enterprise Trust:** Explicitly stating prototype boundaries (CSV batch ingestion vs. live SCADA) earns more credibility with HSE and reliability engineers than inflated claims.

## Accessibility & Inclusion

- Enforces `<MotionConfig reducedMotion="user">` and Lenis `respectReducedMotion: true` so visitors with vestibular motion sensitivity experience instant, non-animated state transitions and native 1:1 scrolling.
- High-contrast typographic hierarchy (`#0D0D0D` on `#F4F4F0` and `#F4F4F0` on `#0D0D0D`) with semantic form controls and keyboard-accessible interactive simulator inputs.
