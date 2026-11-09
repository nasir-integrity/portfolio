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
  sourceModulePath?: string;
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

export interface TeamMemberSpec {
  id: string;
  code: string;
  name: string;
  program: string;
  institution: string;
  focusArea: string;
  portfolioUrl: string;
  portfolioLabel: string;
}

export const NASIR_TEAM_MEMBERS: TeamMemberSpec[] = [
  {
    id: "team-rafi",
    code: "ENG // 01",
    name: "Rafi Fakhri Alaudin",
    program: "Software Engineering Technology",
    institution: "Vocational School of IPB University",
    focusArea: "Platform Architecture & Domain Services",
    portfolioUrl: "https://github.com/ZimrionVarethos/pertamuda",
    portfolioLabel: "VIEW PORTFOLIO",
  },
  {
    id: "team-farrel",
    code: "ENG // 02",
    name: "Moch. Farrel Azqila Simbolon",
    program: "Software Engineering Technology",
    institution: "Vocational School of IPB University",
    focusArea: "Spatial 3D Inspection & Telemetry Systems",
    portfolioUrl: "https://github.com/ZimrionVarethos",
    portfolioLabel: "VIEW PORTFOLIO",
  },
  {
    id: "team-daffa",
    code: "ENG // 03",
    name: "Daffa Bisma Rudidharma",
    program: "Software Engineering Technology",
    institution: "Vocational School of IPB University",
    focusArea: "Full-Stack Engineering & Systems Infrastructure",
    portfolioUrl: "https://daffabisma.com",
    portfolioLabel: "DAFFABISMA.COM",
  },
];

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
      "Spreadsheets silently coerce missing sensor readings to zero, masking critical vessel wall degradation.",
    nasirDeterministicProtocol:
      "Triages wall loss, pressure delta, and methane sniffer telemetry within a strict 24-hour window.",
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
      "Conflating ambient ppm spikes with annual carbon mass, or double-counting overlapping intervals.",
    nasirDeterministicProtocol:
      "Integrates validated kg/h mass flow rates over non-overlapping intervals with explicit temporal coverage ratios.",
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
      "Registers pressure vessels and pipelines within multi-tenant facilities, binding nominal wall thickness and baseline operating pressure directly to 3D spatial models.",
    technicalDetails: [
      "Multi-tenant organization boundary and asset relational hierarchy",
      "Nominal wall thickness and baseline operating pressure bound to 3D digital twin",
    ],
    telemetryReadout: [
      { key: "ASSET_TAG", value: "SEP-3P-104A", status: "VERIFIED" },
      { key: "NOMINAL_WALL", value: "10.30 MM", status: "NOMINAL" },
      { key: "BASELINE_PRESSURE", value: "8.60 BAR", status: "NOMINAL" },
      { key: "TENANT_ISOLATION", value: "ORG_POLICY_ACTIVE", status: "VERIFIED" },
    ],
  },
  {
    stepNumber: "02",
    id: "stage-csv-ingestion",
    code: "STAGE 02 // TELEMETRY INGESTION",
    title: "Validated Field Observation CSV Import",
    subtitle: "Schema-checked batch ingestion with row-level quality quarantine",
    summary:
      "Ingests field telemetry batches with automated row-level schema validation, quarantining malformed timestamps and negative intervals without blocking valid data.",
    technicalDetails: [
      "Validates wall loss, pressure delta, methane concentration, and mass rate bounds",
      "Automated row-level quarantine with cryptographic evidence traceability",
    ],
    telemetryReadout: [
      { key: "IMPORT_BATCH", value: "IMP-2026-1014", status: "VERIFIED" },
      { key: "VALID_ROWS", value: "1,420 / 1,424", status: "NOMINAL" },
      { key: "QUARANTINED", value: "4 ROWS (INTERVAL_ERR)", status: "WARNING" },
      { key: "AUDIT_HASH", value: "SHA256:9F8A..3C1E", status: "VERIFIED" },
    ],
  },
  {
    stepNumber: "03",
    id: "stage-risk-engine",
    code: "STAGE 03 // API 580 RISK ENGINE",
    title: "Deterministic Integrity & Risk Triage Computation",
    subtitle: "Weighted composite scoring with strict 24-hour freshness enforcement",
    summary:
      "Computes normalized risk across wall loss (35%), pressure deviation (40%), and methane sniffers (25%). Missing or stale sensors strictly output NULL.",
    technicalDetails: [
      "Normalized sub-indices: Corrosion (35%), Leak Deviation (40%), Emission Signal (25%)",
      "Strict null-safety: missing or >24h stale inputs yield composite NULL (Insufficient Data)",
    ],
    telemetryReadout: [
      { key: "CORROSION_IDX", value: "64.0 / 100", status: "WARNING" },
      { key: "LEAK_DEVIATION_IDX", value: "81.4 / 100", status: "CRITICAL" },
      { key: "EMISSION_SIGNAL_IDX", value: "80.0 / 100", status: "CRITICAL" },
      { key: "COMPOSITE_TRIAGE", value: "75.0 [CRITICAL TIER]", status: "CRITICAL" },
    ],
  },
  {
    stepNumber: "04",
    id: "stage-methane-quant",
    code: "STAGE 04 // OGMP 2.0 QUANTIFICATION",
    title: "Fugitive Methane Mass & CO2e Integration",
    subtitle: "Time-window clipping, overlap rejection, and temporal coverage ratio",
    summary:
      "Integrates validated mass flow rates (kg/h) into verified CH4 mass and CO2e tonnage, automatically rejecting overlapping intervals to prevent double counting.",
    technicalDetails: [
      "Clips observation intervals strictly to reporting window with temporal coverage ratios",
      "Deterministic overlap guard rejects double-counted intervals during regulatory audits",
    ],
    telemetryReadout: [
      { key: "METHANE_MASS", value: "412.80 KG CH4", status: "WARNING" },
      { key: "CO2E_EQUIVALENT", value: "11.56 TONS CO2E", status: "WARNING" },
      { key: "COVERAGE_RATIO", value: "0.94 (676.8 / 720H)", status: "VERIFIED" },
      { key: "OVERLAP_REJECTED", value: "1 INTERVAL SKIPPED", status: "NOMINAL" },
    ],
  },
  {
    stepNumber: "05",
    id: "stage-maintenance-triage",
    code: "STAGE 05 // MAINTENANCE DISPATCH",
    title: "Risk-Prioritized Maintenance Task Dispatch",
    subtitle: "Closed-loop corrective & preventive work orders tied to asset anomalies",
    summary:
      "Dispatches corrective work orders mapped directly to risk urgency tiers, preventing silent deferral of critical relief valve and flange anomalies.",
    technicalDetails: [
      "Priority tiers mapped directly from API 580 composite risk thresholds",
      "Closed-loop dispatch locking target segment, SLA deadline, and audit trail",
    ],
    telemetryReadout: [
      { key: "WORK_ORDER", value: "WO-2026-089", status: "CRITICAL" },
      { key: "TARGET_COMPONENT", value: "RELIEF VALVE EV-01", status: "CRITICAL" },
      { key: "SLA_DEADLINE", value: "48H CORRECTIVE", status: "WARNING" },
      { key: "ASSIGNED_CREW", value: "RELIABILITY_UNIT_02", status: "VERIFIED" },
    ],
  },
  {
    stepNumber: "06",
    id: "stage-compliance-audit",
    code: "STAGE 06 // TRACEABLE AUDIT DOSSIER",
    title: "Compliance Reporting & Immutable Audit Export",
    subtitle: "Versioned regulatory dossiers with method provenance and CSV/Print export",
    summary:
      "Compiles frozen, immutable compliance dossiers with explicit mathematical provenance and temporal coverage ratios for regulatory review.",
    technicalDetails: [
      "Immutable compliance snapshots preserve audited calculations against late arrivals",
      "Explicit audit exclusions, methodology provenance, and raw CSV verification",
    ],
    telemetryReadout: [
      { key: "REPORT_VERSION", value: "RPT-V4.2-LOCKED", status: "VERIFIED" },
      { key: "METHOD_PROVENANCE", value: "API580-V1 / OGMP-V1", status: "VERIFIED" },
      { key: "AUDIT_EVENTS", value: "100% TRACEABLE", status: "NOMINAL" },
      { key: "EXPORT_FORMATS", value: "PRINT PDF / RAW CSV", status: "NOMINAL" },
    ],
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
    stack: "Laravel 13 • Eloquent ORM • Fortify + Passkeys • Automated Test Suite",
    responsibility:
      "Executes deterministic API 580 risk evaluations, OGMP 2.0 interval clipping, CSV batch validation, multi-tenant policy enforcement, and immutable audit logging.",
    keyModules: [
      "API 580 Risk Evaluator",
      "OGMP 2.0 Mass Integrator",
      "CSV Schema Ingestion",
      "Compliance Report Engine",
      "Audit Event Logger",
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
      "Operations Overview",
      "Risk Triage Console",
      "Emissions Mass Monitor",
      "Regulatory Audit Dossier",
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
      "Facility Digital Twin",
      "Asset Component Inspector",
      "Component Topology Geometry",
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
      "Multi-Tenancy Policies",
      "Domain Invariant Tests",
      "Asset Access Control",
      "Compliance Dossier Integrity",
    ],
  },
];

export const PROTOTYPE_BOUNDARIES = {
  currentCapabilities: [
    "Validated CSV telemetry ingestion with row-level quarantine and cryptographic evidence tracking",
    "Deterministic API 580 triage scoring with 24-hour freshness window and strict NULL propagation",
    "OGMP 2.0 mass rate interval integration with overlap rejection and spatial 3D inspection",
  ],
  explicitNonClaims: [
    "MVP operates via validated CSV batches; does not claim direct hardware PLC/SCADA streaming",
    "Ambient ppm sniffer readings never yield carbon mass without verified kg/h flow measurements",
    "Missing or stale telemetry strictly propagates NULL; never coerced or substituted with zero",
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
