export interface NasirMetric {
  code: string;
  label: string;
  value: string;
  unit: string;
  note: string;
}

export interface StandardComparison {
  id: string;
  code: string;
  standardTitle: string;
  frameworkFocus: string;
  legacyFailureMode: string;
  nasirDeterministicProtocol: string;
  formulaOrConstraint: string;
  metrics: { label: string; value: string }[];
}

export interface PipelineStage {
  stepNumber: string;
  id: string;
  code: string;
  title: string;
  subtitle: string;
  summary: string;
  technicalDetails: string[];
  telemetryReadout: {
    key: string;
    value: string;
    status: "NOMINAL" | "WARNING" | "CRITICAL" | "VERIFIED";
  }[];
  sourceModulePath: string;
}

export interface VesselSegmentSpec {
  id: string;
  code: string;
  name: string;
  componentType: string;
  riskTierDefault: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  wallLossPct: number;
  nominalThicknessMm: number;
  measuredThicknessMm: number;
  operatingPressureBar: number;
  baselinePressureBar: number;
  methanePpm: number;
  methaneRateKgH: number;
  intervalHours: number;
  description: string;
  failureMechanism: string;
}

export interface ArchitectureLayer {
  id: string;
  code: string;
  layer: string;
  stack: string;
  responsibility: string;
  keyModules: string[];
}

export const HERO_METRICS: NasirMetric[] = [
  {
    code: "STD // 01",
    label: "INTEGRITY STANDARD",
    value: "API 580",
    unit: "RBI TRIAGE",
    note: "Deterministic ultrasonic wall-loss & differential pressure scoring",
  },
  {
    code: "STD // 02",
    label: "EMISSIONS FRAMEWORK",
    value: "OGMP 2.0",
    unit: "KG/H MASS",
    note: "Non-overlapping time-interval integration with coverage ratio tracking",
  },
  {
    code: "WIN // 03",
    label: "FRESHNESS WINDOW",
    value: "24.0",
    unit: "HOURS MAX",
    note: "Strict null-safety: missing or stale telemetry never defaults to zero",
  },
  {
    code: "TWIN // 04",
    label: "SPATIAL INSPECTION",
    value: "3D R3F",
    unit: "4 SEGMENTS",
    note: "Interactive 3-phase separator digital twin with component-level triage",
  },
];

export const STANDARDS_COMPARISONS: StandardComparison[] = [
  {
    id: "api-580",
    code: "STANDARD // API-580-RBI",
    standardTitle: "API 580 Risk-Based Inspection Triage",
    frameworkFocus: "Mechanical Integrity & Corrosion Prioritization",
    legacyFailureMode:
      "Periodic spreadsheet inspections detached from live pressure deviations; missing sensor values silently coerced to 0, masking high-risk vessel degradation.",
    nasirDeterministicProtocol:
      "Evaluates ultrasonic wall-loss percentage, differential pressure against asset baseline, and optical methane sniffer signals within a strict 24-hour freshness window.",
    formulaOrConstraint:
      "composite = 0.35 * corrosion + 0.40 * leak + 0.25 * emission_signal",
    metrics: [
      { label: "Corrosion Weight", value: "35% (Wall Loss / 50%)" },
      { label: "Leak Weight", value: "40% (|P - P0| / P0 / 0.20)" },
      { label: "Signal Weight", value: "25% (CH4 ppm / 100)" },
      { label: "Stale Data Policy", value: "NULL ('Insufficient Data')" },
    ],
  },
  {
    id: "ogmp-2",
    code: "FRAMEWORK // OGMP-2.0-CH4",
    standardTitle: "OGMP 2.0 Fugitive Methane Quantification",
    frameworkFocus: "Audit-Grade Mass Flow Integration & Claim Boundaries",
    legacyFailureMode:
      "Conflating ambient ppm concentration spikes with annual carbon tonnage, or double-counting overlapping inspection intervals during regulatory audits.",
    nasirDeterministicProtocol:
      "Strictly separates operational risk triage scores (0-100) from fugitive emissions mass. Computes CH4 mass exclusively from validated kg/h mass flow rates integrated over non-overlapping intervals.",
    formulaOrConstraint:
      "methane_mass_kg = sum(methane_rate_kg_h * (interval_end - observed_at))",
    metrics: [
      { label: "Required Unit", value: "kg/h Mass Flow Rate" },
      { label: "Overlap Guard", value: "Rejects obsStart < lastEnd" },
      { label: "Coverage Ratio", value: "coveredHours / periodHours" },
      { label: "Instrument Uncertainty", value: "+/- 15% Standard Spec" },
    ],
  },
];

export const PIPELINE_STAGES: PipelineStage[] = [
  {
    stepNumber: "01",
    id: "stage-asset-registry",
    code: "STAGE 01 // SPATIAL REGISTRY",
    title: "Asset Registration & 3D Spatial Mapping",
    subtitle: "Multi-tenant facility hierarchy with interactive 3D component topology",
    summary:
      "Operators register critical process equipment—3-phase horizontal separators, storage tanks, flanges, relief valves, and compressor seals—within a strict multi-tenant organization and facility boundary. Each unit binds physical nominal wall thickness and baseline pressure directly to an interactive 3D digital twin.",
    technicalDetails: [
      "Organization -> Facility -> Asset relational hierarchy enforced by Laravel Policies",
      "Nominal wall thickness (mm) and baseline operating pressure (bar) stored per asset",
      "Interactive 3D segment mapping for Flange F-101, Shell Zone A, Relief Valve EV-01, and Nozzle N-02",
    ],
    telemetryReadout: [
      { key: "ASSET_TAG", value: "SEP-3P-104A", status: "VERIFIED" },
      { key: "NOMINAL_WALL", value: "10.30 MM", status: "NOMINAL" },
      { key: "BASELINE_PRESSURE", value: "8.60 BAR", status: "NOMINAL" },
      { key: "TENANT_ISOLATION", value: "ORG_POLICY_ACTIVE", status: "VERIFIED" },
    ],
    sourceModulePath: "app/Http/Controllers/AssetController.php",
  },
  {
    stepNumber: "02",
    id: "stage-csv-ingestion",
    code: "STAGE 02 // TELEMETRY INGESTION",
    title: "Validated Field Observation CSV Import",
    subtitle: "Schema-checked batch ingestion with row-level quality quarantine",
    summary:
      "Field inspection teams upload ultrasonic thickness readings, differential pressure logs, optical gas imaging (OGI) ppm concentrations, and Hi-Flow Sampler kg/h mass rates via structured CSV batches. ImportCsvAction validates timestamps, units, and numeric bounds before committing to the database.",
    technicalDetails: [
      "Supports 4 canonical parameters: wall_loss (%), pressure (bar), methane_concentration (ppm), methane_mass_rate (kg/h)",
      "Automatically flags malformed rows or negative intervals without aborting valid observations",
      "Records immutable Import batch metadata with SHA-256 evidence traceability and audit event logs",
    ],
    telemetryReadout: [
      { key: "IMPORT_BATCH", value: "IMP-2026-1014", status: "VERIFIED" },
      { key: "VALID_ROWS", value: "1,420 / 1,424", status: "NOMINAL" },
      { key: "QUARANTINED", value: "4 ROWS (INTERVAL_ERR)", status: "WARNING" },
      { key: "AUDIT_HASH", value: "SHA256:9F8A..3C1E", status: "VERIFIED" },
    ],
    sourceModulePath: "app/Actions/Imports/ImportCsvAction.php",
  },
  {
    stepNumber: "03",
    id: "stage-risk-engine",
    code: "STAGE 03 // API 580 RISK ENGINE",
    title: "Deterministic Integrity & Risk Triage Computation",
    subtitle: "Weighted composite scoring with strict 24-hour freshness enforcement",
    summary:
      "DemoRiskProvider evaluates the latest valid observation for each parameter inside a rolling 24-hour window. It computes normalized sub-scores (0-100) for Corrosion, Leak Deviation, and Emission Signal, combining them into a Composite Integrity Score that assigns assets into Critical, High, Medium, or Low priority tiers.",
    technicalDetails: [
      "Corrosion Score (35%): clamp100((wall_loss_pct / 50.0) * 100.0)",
      "Leak Score (40%): clamp100((|pressure - baseline| / baseline / 0.20) * 100.0)",
      "Emission Signal (25%): clamp100((methane_ppm / 100.0) * 100.0)",
      "Zero-substitution prohibition: missing or >24h stale inputs yield composite = NULL ('Insufficient Data')",
    ],
    telemetryReadout: [
      { key: "CORROSION_IDX", value: "64.0 / 100", status: "WARNING" },
      { key: "LEAK_DEVIATION_IDX", value: "81.4 / 100", status: "CRITICAL" },
      { key: "EMISSION_SIGNAL_IDX", value: "80.0 / 100", status: "CRITICAL" },
      { key: "COMPOSITE_TRIAGE", value: "75.0 [CRITICAL TIER]", status: "CRITICAL" },
    ],
    sourceModulePath: "app/Services/Risk/DemoRiskProvider.php",
  },
  {
    stepNumber: "04",
    id: "stage-methane-quant",
    code: "STAGE 04 // OGMP 2.0 QUANTIFICATION",
    title: "Fugitive Methane Mass & CO2e Integration",
    subtitle: "Time-window clipping, overlap rejection, and temporal coverage ratio",
    summary:
      "EmissionCalculator integrates validated methane_mass_rate (kg/h) observations across the reporting period. Overlapping intervals on the same asset are deterministically rejected to prevent double counting, while temporal gaps are exposed through an explicit coverage ratio (0.00 to 1.00).",
    technicalDetails: [
      "Clips observation intervals strictly to [periodStart, periodEnd) before multiplying rate * hours",
      "Computes CO2e equivalence using configurable Global Warming Potential (GWP-100 = 28x or GWP-20 = 84x)",
      "Stores input_refs_json linking every calculated kilogram back to exact observation primary keys",
    ],
    telemetryReadout: [
      { key: "METHANE_MASS", value: "412.80 KG CH4", status: "WARNING" },
      { key: "CO2E_EQUIVALENT", value: "11.56 TONS CO2E", status: "WARNING" },
      { key: "COVERAGE_RATIO", value: "0.94 (676.8 / 720H)", status: "VERIFIED" },
      { key: "OVERLAP_REJECTED", value: "1 INTERVAL SKIPPED", status: "NOMINAL" },
    ],
    sourceModulePath: "app/Services/Emissions/EmissionCalculator.php",
  },
  {
    stepNumber: "05",
    id: "stage-maintenance-triage",
    code: "STAGE 05 // MAINTENANCE DISPATCH",
    title: "Risk-Prioritized Maintenance Task Dispatch",
    subtitle: "Closed-loop corrective & preventive work orders tied to asset anomalies",
    summary:
      "Operational managers convert high and critical risk assessments directly into actionable field maintenance tickets. Each work order locks onto the specific asset segment, urgency tier, target SLA deadline, assigned reliability engineer, and field inspection verification notes.",
    technicalDetails: [
      "Priority tiers (Urgent, High, Normal, Low) mapped directly from API 580 composite risk thresholds",
      "Lifecycle tracking from Open -> In Progress -> Verification -> Closed with full audit trail",
      "Prevents silent deferral of critical relief-valve or flange gasket integrity anomalies",
    ],
    telemetryReadout: [
      { key: "WORK_ORDER", value: "WO-2026-089", status: "CRITICAL" },
      { key: "TARGET_COMPONENT", value: "RELIEF VALVE EV-01", status: "CRITICAL" },
      { key: "SLA_DEADLINE", value: "48H CORRECTIVE", status: "WARNING" },
      { key: "ASSIGNED_CREW", value: "RELIABILITY_UNIT_02", status: "VERIFIED" },
    ],
    sourceModulePath: "app/Http/Controllers/MaintenanceTaskController.php",
  },
  {
    stepNumber: "06",
    id: "stage-compliance-audit",
    code: "STAGE 06 // TRACEABLE AUDIT DOSSIER",
    title: "Compliance Reporting & Immutable Audit Export",
    subtitle: "Versioned regulatory dossiers with method provenance and CSV/Print export",
    summary:
      "ReportBuilder compiles frozen, versioned compliance snapshots combining asset risk summaries, fugitive methane totals, temporal coverage ratios, and explicit methodology exclusions. Auditors can inspect the exact MethodVersion formula, verify input observation IDs, print official dossiers, or export raw CSV evidence.",
    technicalDetails: [
      "Immutable ReportVersion snapshots preserve exact numbers even if subsequent telemetry arrives",
      "Explicitly prints exclusions (e.g., skipped overlapping intervals or insufficient sensor windows)",
      "Dedicated print-ready layout and raw observation CSV export for regulatory verification",
    ],
    telemetryReadout: [
      { key: "REPORT_VERSION", value: "RPT-V4.2-LOCKED", status: "VERIFIED" },
      { key: "METHOD_PROVENANCE", value: "API580-V1 / OGMP-V1", status: "VERIFIED" },
      { key: "AUDIT_EVENTS", value: "100% TRACEABLE", status: "NOMINAL" },
      { key: "EXPORT_FORMATS", value: "PRINT PDF / RAW CSV", status: "NOMINAL" },
    ],
    sourceModulePath: "app/Services/Reporting/ReportBuilder.php",
  },
];

export const VESSEL_SEGMENTS: VesselSegmentSpec[] = [
  {
    id: "seg-inlet-flange",
    code: "SEG-01 // F-101",
    name: "Inlet Flange F-101",
    componentType: '8" ASME Class 300 Weld-Neck Flange Joint',
    riskTierDefault: "HIGH",
    wallLossPct: 32,
    nominalThicknessMm: 10.3,
    measuredThicknessMm: 7.1,
    operatingPressureBar: 7.4,
    baselinePressureBar: 8.6,
    methanePpm: 80,
    methaneRateKgH: 1.85,
    intervalHours: 168,
    description:
      "High-turbulence crude/gas inlet flange joint experiencing cyclic vibration stress and spiral-wound gasket micro-seepage.",
    failureMechanism:
      "Flow-accelerated localized erosion-corrosion + gasket seating stress relaxation.",
  },
  {
    id: "seg-vessel-shell",
    code: "SEG-02 // ZONE-A",
    name: "Vessel Shell Zone A",
    componentType: "SA-516 Gr.70 Cylindrical Pressure Shell",
    riskTierDefault: "MEDIUM",
    wallLossPct: 18,
    nominalThicknessMm: 10.3,
    measuredThicknessMm: 8.4,
    operatingPressureBar: 8.5,
    baselinePressureBar: 8.6,
    methanePpm: 18,
    methaneRateKgH: 0.25,
    intervalHours: 168,
    description:
      "Primary horizontal three-phase separation chamber handling oil-water-gas residence retention.",
    failureMechanism:
      "Bottom-of-line sweet CO2 / sour H2S aqueous phase general wall thinning.",
  },
  {
    id: "seg-control-valve",
    code: "SEG-03 // EV-01",
    name: "Emergency Relief Valve EV-01",
    componentType: "Spring-Loaded PSV & Actuated Bypass Assembly",
    riskTierDefault: "CRITICAL",
    wallLossPct: 45,
    nominalThicknessMm: 10.3,
    measuredThicknessMm: 5.6,
    operatingPressureBar: 6.9,
    baselinePressureBar: 8.6,
    methanePpm: 94,
    methaneRateKgH: 3.4,
    intervalHours: 168,
    description:
      "Top-mounted emergency overpressure protection valve and vent stack interface showing severe seat simmer and wall loss.",
    failureMechanism:
      "High-velocity gas throttling cavitation, seat wire-drawing, and fugitive stem packing leak.",
  },
  {
    id: "seg-outlet-pipe",
    code: "SEG-04 // N-02",
    name: "Gas Outlet Nozzle N-02",
    componentType: "Schedule 80 Demister Gas Export Nozzle",
    riskTierDefault: "LOW",
    wallLossPct: 8,
    nominalThicknessMm: 10.3,
    measuredThicknessMm: 9.5,
    operatingPressureBar: 8.6,
    baselinePressureBar: 8.6,
    methanePpm: 6,
    methaneRateKgH: 0.08,
    intervalHours: 168,
    description:
      "Downstream mist-extracted gas discharge nozzle routing dry gas to the export header manifold.",
    failureMechanism:
      "Minimal dry-gas erosion; operating well within ASME B31.3 corrosion allowance.",
  },
];

export const ARCHITECTURE_LAYERS: ArchitectureLayer[] = [
  {
    id: "arch-backend",
    code: "LAYER 01 // CORE ENGINE",
    layer: "Laravel 13 & PHP 8.2+ Domain Services",
    stack: "Laravel 13 • Eloquent ORM • Fortify + Passkeys • Pest PHP",
    responsibility:
      "Executes deterministic API 580 risk evaluations, OGMP 2.0 interval clipping, CSV batch validation, multi-tenant policy enforcement, and immutable audit logging.",
    keyModules: [
      "DemoRiskProvider.php",
      "EmissionCalculator.php",
      "ImportCsvAction.php",
      "ReportBuilder.php",
      "AuditLogger.php",
    ],
  },
  {
    id: "arch-frontend",
    code: "LAYER 02 // REACTIVE INTERFACE",
    layer: "React 19 + TypeScript + Inertia.js SPA Bridge",
    stack: "React 19 • TypeScript 5.7 • Inertia 3.0 • Tailwind CSS v4",
    responsibility:
      "Delivers zero-reload operational dashboards, interactive evidence tables, and print-ready regulatory audit views without client-side state drift.",
    keyModules: [
      "nasir-dashboard-layout.tsx",
      "dashboard/risk/index.tsx",
      "dashboard/emissions/index.tsx",
      "dashboard/reports/show.tsx",
    ],
  },
  {
    id: "arch-3d",
    code: "LAYER 03 // SPATIAL DIGITAL TWIN",
    layer: "Three.js & React Three Fiber Inspection Canvas",
    stack: "Three.js r185 • @react-three/fiber • @react-three/drei • ACES Filmic",
    responsibility:
      "Renders physically based metallic pressure vessels, pulsing SCADA telemetry beacons, and clickable 4-segment component inspection geometry.",
    keyModules: [
      "facility-hero-scene.tsx",
      "asset-inspector-scene.tsx",
      "asset-inspector-data.ts",
    ],
  },
  {
    id: "arch-security",
    code: "LAYER 04 // MULTI-TENANT GOVERNANCE",
    layer: "Organization Isolation & Cryptographic Provenance",
    stack: "MySQL / SQLite • Organization Policies • 2FA + WebAuthn Passkeys",
    responsibility:
      "Enforces strict tenant boundaries across facilities, assets, imports, and reports while recording every state mutation in an append-only audit log.",
    keyModules: [
      "NasirMultiTenancyPolicyTest.php",
      "NasirDomainFormulasTest.php",
      "AssetPolicy.php",
      "ReportPolicy.php",
    ],
  },
];

export const PROTOTYPE_BOUNDARIES = {
  currentCapabilities: [
    "Validated CSV telemetry ingestion with row-level quality quarantine and SHA-256 evidence tracking",
    "Deterministic API 580 triage scoring with 24-hour freshness window and strict NULL propagation",
    "OGMP 2.0 mass rate (kg/h) interval integration with overlap rejection and coverage ratio calculation",
    "Interactive 3D pressure vessel digital twin and 4-segment component risk inspector",
    "Multi-tenant RBAC, WebAuthn Passkey authentication, and immutable ReportVersion audit snapshots",
  ],
  explicitNonClaims: [
    "Does NOT claim direct live hardware PLC/SCADA Modbus/OPC-UA streaming in the MVP (operates via validated CSV batches)",
    "Does NOT convert ambient ppm sniffer readings into carbon tonnage without validated kg/h mass flow measurements",
    "Does NOT substitute 0 for missing or stale (>24h) sensor telemetry—always outputs NULL ('Insufficient Data')",
    "Does NOT directly submit filings to ministry API gateways or sovereign carbon credit registries",
  ],
  sectorExpansionRoadmap: [
    {
      code: "SECTOR // CFPP-PLTU",
      title: "Coal-Fired Power Plants (PLTU)",
      scope:
        "Boiler tube creep-fatigue risk indexing and Continuous Emission Monitoring System (CEMS) stack flue-gas integration.",
    },
    {
      code: "SECTOR // CEMENT-KILN",
      title: "Cement & Calcination Facilities",
      scope:
        "Rotary kiln refractory shell thermal-stress triage and clinker calcination CO2 emission factor accounting.",
    },
  ],
};

/**
 * Deterministic NASIR Domain Formula Helpers
 * Mirrors app/Services/Risk/DemoRiskProvider.php and app/Services/Emissions/EmissionCalculator.php
 */
export function clamp100(val: number): number {
  return Math.max(0, Math.min(100, Number(val.toFixed(1))));
}

export interface RiskSimulationInput {
  wallLossPct: number | null;
  pressureBar: number | null;
  baselinePressureBar: number;
  methanePpm: number | null;
  isWithin24hWindow: boolean;
}

export interface RiskSimulationResult {
  corrosionScore: number | null;
  leakScore: number | null;
  emissionSignalScore: number | null;
  compositeScore: number | null;
  tier: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW" | "INSUFFICIENT DATA";
  statusReason: string;
}

export function evaluateNasirRisk(
  input: RiskSimulationInput
): RiskSimulationResult {
  if (!input.isWithin24hWindow) {
    return {
      corrosionScore: null,
      leakScore: null,
      emissionSignalScore: null,
      compositeScore: null,
      tier: "INSUFFICIENT DATA",
      statusReason:
        "Observation timestamp exceeds 24-hour freshness window. NASIR refuses zero-substitution.",
    };
  }

  const corrosionScore =
    input.wallLossPct !== null
      ? clamp100((input.wallLossPct / 50.0) * 100.0)
      : null;

  const leakScore =
    input.pressureBar !== null && input.baselinePressureBar > 0
      ? clamp100(
          (Math.abs(input.pressureBar - input.baselinePressureBar) /
            input.baselinePressureBar /
            0.2) *
            100.0
        )
      : null;

  const emissionSignalScore =
    input.methanePpm !== null
      ? clamp100((input.methanePpm / 100.0) * 100.0)
      : null;

  if (
    corrosionScore === null ||
    leakScore === null ||
    emissionSignalScore === null
  ) {
    return {
      corrosionScore,
      leakScore,
      emissionSignalScore,
      compositeScore: null,
      tier: "INSUFFICIENT DATA",
      statusReason:
        "One or more required parameters are missing. Composite score requires all 3 valid observations.",
    };
  }

  const rawComposite =
    0.35 * corrosionScore + 0.4 * leakScore + 0.25 * emissionSignalScore;
  const compositeScore = Number(rawComposite.toFixed(1));

  let tier: RiskSimulationResult["tier"] = "LOW";
  if (compositeScore >= 75.0) {
    tier = "CRITICAL";
  } else if (compositeScore >= 50.0) {
    tier = "HIGH";
  } else if (compositeScore >= 25.0) {
    tier = "MEDIUM";
  }

  return {
    corrosionScore,
    leakScore,
    emissionSignalScore,
    compositeScore,
    tier,
    statusReason:
      "Deterministic triage evaluation complete within 24h freshness window.",
  };
}

export interface EmissionSimulationInput {
  methaneRateKgH: number;
  observedHours: number;
  totalPeriodHours: number;
  gwpFactor: number;
  hasOverlapAnomaly: boolean;
}

export interface EmissionSimulationResult {
  methaneMassKg: number;
  co2eTons: number;
  coverageRatio: number;
  uncertaintyLabel: string;
  exclusionNote: string | null;
}

export function evaluateNasirEmission(
  input: EmissionSimulationInput
): EmissionSimulationResult {
  const effectiveHours = Math.max(
    0,
    Math.min(input.observedHours, input.totalPeriodHours)
  );
  const methaneMassKg = Number(
    (input.methaneRateKgH * effectiveHours).toFixed(2)
  );
  const co2eKg = methaneMassKg * input.gwpFactor;
  const co2eTons = Number((co2eKg / 1000).toFixed(3));
  const coverageRatio = Number(
    Math.min(1, effectiveHours / Math.max(1, input.totalPeriodHours)).toFixed(2)
  );

  return {
    methaneMassKg,
    co2eTons,
    coverageRatio,
    uncertaintyLabel: "+/- 15% flow instrument specification",
    exclusionNote: input.hasOverlapAnomaly
      ? "1 overlapping observation interval rejected (obsStart < lastEnd) to prevent double counting."
      : coverageRatio < 1
        ? `Partial temporal coverage (${Math.round(coverageRatio * 100)}% of period window).`
        : null,
  };
}
