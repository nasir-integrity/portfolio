export interface StandardComparison {
  id: string;
  title: string;
  tag: string;
  headline: string;
  problem: string;
  solution: string;
  visualType: "integrity" | "emissions";
}

export interface PipelineStage {
  stepNumber: string;
  id: string;
  title: string;
  subtitle: string;
  summary: string;
  highlight: string;
}

export interface ArchitectureLayer {
  id: string;
  title: string;
  subtitle: string;
  description: string;
}

export interface TeamMemberSpec {
  id: string;
  name: string;
  role: string;
  initials: string;
  institution: string;
  program: string;
  portfolioUrl: string;
  portfolioLabel: string;
}

export const NASIR_TEAM_MEMBERS: TeamMemberSpec[] = [
  {
    id: "team-rafi",
    name: "Rafi Fakhri Alaudin",
    role: "Platform Architecture & Core Domain Services",
    initials: "RFA",
    institution: "Sekolah Vokasi IPB University",
    program: "Teknologi Rekayasa Perangkat Lunak",
    portfolioUrl: "https://github.com/ZimrionVarethos/pertamuda",
    portfolioLabel: "VIEW PROFILE",
  },
  {
    id: "team-farrel",
    name: "Moch. Farrel Azqila Simbolon",
    role: "Spatial 3D Systems & Interactive Graphics",
    initials: "MFA",
    institution: "Sekolah Vokasi IPB University",
    program: "Teknologi Rekayasa Perangkat Lunak",
    portfolioUrl: "https://github.com/ZimrionVarethos",
    portfolioLabel: "VIEW PROFILE",
  },
  {
    id: "team-daffa",
    name: "Daffa Bisma Rudidharma",
    role: "Full-Stack Architecture & Systems Infrastructure",
    initials: "DBR",
    institution: "Sekolah Vokasi IPB University",
    program: "Teknologi Rekayasa Perangkat Lunak",
    portfolioUrl: "https://daffabisma.com",
    portfolioLabel: "DAFFABISMA.COM",
  },
];

export const STANDARDS_COMPARISONS: StandardComparison[] = [
  {
    id: "structural-decay",
    title: "Structural Decay",
    tag: "API 580 Mechanical Protocol",
    headline: "PREDICTING CATASTROPHIC RUPTURE BEFORE IT HAPPENS",
    problem:
      "Spreadsheets silently replace missing inspection readings with zeros, concealing critical pipeline wall thinning until pressure failure occurs.",
    solution:
      "Enforces strict deterministic physics across ultrasonic wall loss, pressure variations, and sniffer signals—halting processing if telemetry is missing.",
    visualType: "integrity",
  },
  {
    id: "fugitive-escape",
    title: "Fugitive Escape",
    tag: "OGMP 2.0 Mass Accounting",
    headline: "MEASURING MASSIVE GAS LOSS WITH AUDIT-GRADE PRECISION",
    problem:
      "Traditional dashboards mistake ambient gas concentration spikes for annual carbon tonnage, creating fictitious numbers and double-counted timelines.",
    solution:
      "Integrates certified mass flow rates exclusively across non-overlapping operational windows with cryptographic evidence verification.",
    visualType: "emissions",
  },
];

export const PIPELINE_STAGES: PipelineStage[] = [
  {
    stepNumber: "01",
    id: "stage-spatial-twin",
    title: "Spatial Digital Twin",
    subtitle: "Coordinate-accurate vessel mapping",
    summary:
      "Registers high-pressure separation vessels directly in 3D coordinate space, anchoring physical wall thicknesses and pressure tolerances before live sensors connect.",
    highlight: "10.3mm Nominal Wall Thickness",
  },
  {
    stepNumber: "02",
    id: "stage-signal-immunity",
    title: "Signal Immunity",
    subtitle: "Automated telemetry quarantine",
    summary:
      "Ingests field sensor feeds through an impenetrable validation gate, quarantining corrupt rows and forbidding zero-substitution for missing metrics.",
    highlight: "Cryptographic Evidence Hash",
  },
  {
    stepNumber: "03",
    id: "stage-structural-triage",
    title: "Structural Triage",
    subtitle: "Live multi-vector risk evaluation",
    summary:
      "Combines real-time ultrasonic wall loss and differential pressure variations into a clear risk tier—instantly highlighting high-hazard components.",
    highlight: "Deterministic 0–100 Risk Index",
  },
  {
    stepNumber: "04",
    id: "stage-plume-accounting",
    title: "Plume Accounting",
    subtitle: "True mass emission integration",
    summary:
      "Integrates verified mass flow rates over continuous time windows, automatically cutting overlapping intervals to prevent duplicate carbon claims.",
    highlight: "Non-Overlapping kg CH4 Integration",
  },
  {
    stepNumber: "05",
    id: "stage-field-dispatch",
    title: "Field Dispatch",
    subtitle: "Closed-loop emergency work orders",
    summary:
      "Issues instant corrective work orders mapped to risk urgency tiers, preventing dangerous relief valve simmering from being postponed.",
    highlight: "48-Hour Critical Intervention SLA",
  },
  {
    stepNumber: "06",
    id: "stage-sealed-proof",
    title: "Sealed Proof",
    subtitle: "Immutable regulatory dossiers",
    summary:
      "Locks calculated compliance snapshots into verifiable audit dossiers ready for industrial regulators, completely traceable to raw field logs.",
    highlight: "Cryptographically Verified Dossier",
  },
];

export const ARCHITECTURE_LAYERS: ArchitectureLayer[] = [
  {
    id: "arch-core",
    title: "Deterministic Engine",
    subtitle: "Laravel & PHP Domain Services",
    description:
      "Executes proven mathematical evaluations with zero hidden state or speculative defaults, preserving complete audit transparency.",
  },
  {
    id: "arch-twin",
    title: "Spatial 3D Twin",
    subtitle: "Three.js & WebGL Visual Core",
    description:
      "Renders physically accurate vessel geometry and live telemetry beacons directly in the browser with high-performance WebGL graphics.",
  },
  {
    id: "arch-vault",
    title: "Audit Vault",
    subtitle: "Multi-Tenant Isolation & Proof",
    description:
      "Enforces strict organizational data boundaries and seals compliance dossiers with immutable SHA-256 evidence verification.",
  },
];
