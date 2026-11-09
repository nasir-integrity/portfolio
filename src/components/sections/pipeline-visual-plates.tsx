"use client";

import React from "react";
import { type PipelineStage } from "@/data/nasir-content";

interface PipelineVisualPlateProps {
  stage: PipelineStage;
  isActive: boolean;
}

export function PipelineVisualPlate({
  stage,
  isActive,
}: PipelineVisualPlateProps) {
  return (
    <div
      data-active={isActive ? "true" : "false"}
      className="isotherm-plate relative w-full border border-obsidian bg-obsidian text-paper p-5 sm:p-6 chamfer-tr"
    >
      {/* Top Plate Frame Header */}
      <div className="flex items-center justify-between border-b border-hairline-dark pb-3 mb-5 font-mono text-[10px] uppercase tracking-[0.16em]">
        <div className="flex items-center gap-2">
          <span className="inline-block h-2 w-2 bg-vermillion" />
          <span className="text-paper font-semibold">{stage.code}</span>
        </div>
        <span className="text-steel-light">STEP {stage.stepNumber} // 06</span>
      </div>

      {/* Stage-Specific Architectural Schematic & UI Frame (Unbordered container) */}
      <div className="mb-6 bg-obsidian-elevated/70 p-5 sm:p-6">
        {stage.stepNumber === "01" && <Stage01Schematic />}
        {stage.stepNumber === "02" && <Stage02Schematic />}
        {stage.stepNumber === "03" && <Stage03Schematic />}
        {stage.stepNumber === "04" && <Stage04Schematic />}
        {stage.stepNumber === "05" && <Stage05Schematic />}
        {stage.stepNumber === "06" && <Stage06Schematic />}
      </div>

      {/* Bottom 4-Metric Telemetry Readout Strip (Open Key/Value) */}
      <div className="pt-4 border-t border-hairline-dark/60 grid grid-cols-2 sm:grid-cols-4 gap-4">
        {stage.telemetryReadout.map((item) => {
          const isAlert =
            item.status === "CRITICAL" || item.status === "WARNING";
          return (
            <div key={item.key} className="font-mono">
              <div className="text-[10px] uppercase tracking-[0.14em] text-steel-light truncate">
                {item.key}
              </div>
              <div
                className={`text-xs sm:text-sm font-bold mt-0.5 truncate ${
                  isAlert ? "text-vermillion" : "text-paper"
                }`}
              >
                {item.value}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

function Stage01Schematic() {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between font-mono text-[10px] text-steel-light uppercase">
        <span>3D ASSET TOPOLOGY // SEP-3P-104A</span>
        <span className="text-vermillion">4 ACTIVE ZONES</span>
      </div>
      <svg
        viewBox="0 0 520 170"
        className="w-full h-auto bg-transparent"
        role="img"
        aria-label="3-Phase Horizontal Separator Schematic"
      >
        {/* Grid lines */}
        <line x1="0" y1="85" x2="520" y2="85" stroke="#262626" strokeDasharray="4 4" />
        <line x1="260" y1="0" x2="260" y2="170" stroke="#262626" strokeDasharray="4 4" />

        {/* Inlet Flange F-101 */}
        <rect x="40" y="62" width="24" height="46" fill="#FF3B00" stroke="#F4F4F0" strokeWidth="1.5" />
        <text x="32" y="52" fill="#FF3B00" fontSize="9" fontFamily="monospace">F-101 INLET</text>

        {/* Vessel Shell Zone A */}
        <rect x="64" y="45" width="320" height="80" fill="#1C1C1C" stroke="#F4F4F0" strokeWidth="1.5" />
        <line x1="160" y1="45" x2="160" y2="125" stroke="#52524E" strokeWidth="1" />
        <line x1="280" y1="45" x2="280" y2="125" stroke="#52524E" strokeWidth="1" />
        <text x="175" y="90" fill="#F4F4F0" fontSize="10" fontFamily="monospace">SHELL ZONE A (10.3mm NOM)</text>

        {/* Relief Valve EV-01 */}
        <rect x="205" y="14" width="38" height="31" fill="#FF3B00" stroke="#F4F4F0" strokeWidth="1.5" />
        <text x="252" y="30" fill="#FF3B00" fontSize="9" fontFamily="monospace">EV-01 PSV [8.6 BAR]</text>

        {/* Outlet Nozzle N-02 */}
        <rect x="384" y="68" width="76" height="34" fill="#2A2A2A" stroke="#F4F4F0" strokeWidth="1.5" />
        <text x="390" y="58" fill="#F4F4F0" fontSize="9" fontFamily="monospace">N-02 OUTLET</text>

        {/* Saddles */}
        <rect x="110" y="125" width="28" height="26" fill="#52524E" />
        <rect x="310" y="125" width="28" height="26" fill="#52524E" />
      </svg>
    </div>
  );
}

function Stage02Schematic() {
  const rows = [
    { id: "OBS-881", param: "wall_loss", val: "32.0", unit: "%", quality: "VALID", ok: true },
    { id: "OBS-882", param: "pressure", val: "7.40", unit: "bar", quality: "VALID", ok: true },
    { id: "OBS-883", param: "methane_concentration", val: "80.0", unit: "ppm", quality: "VALID", ok: true },
    { id: "OBS-884", param: "methane_mass_rate", val: "-1.20", unit: "kg/h", quality: "QUARANTINED", ok: false },
  ];
  return (
    <div className="font-mono text-[11px]">
      <div className="flex items-center justify-between text-[10px] text-steel-light pb-2 border-b border-hairline-dark mb-2">
        <span>CSV STREAM // PARSER VALIDATION MATRIX</span>
        <span className="text-vermillion">STRICT SCHEMA GATE</span>
      </div>
      <div className="divide-y divide-hairline-dark/60">
        {rows.map((r) => (
          <div
            key={r.id}
            className="grid grid-cols-12 items-center px-3 py-2 bg-obsidian text-[10px]"
          >
            <span className="col-span-3 text-steel-light">{r.id}</span>
            <span className="col-span-4 text-paper truncate">{r.param}</span>
            <span className="col-span-3 text-paper font-semibold">
              {r.val} {r.unit}
            </span>
            <span
              className={`col-span-2 text-right font-bold ${
                r.ok ? "text-paper" : "text-vermillion"
              }`}
            >
              {r.quality}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function Stage03Schematic() {
  const bars = [
    { label: "CORROSION SCORE (35% WT)", score: 64.0, formula: "32% / 50% * 100" },
    { label: "LEAK DEVIATION (40% WT)", score: 81.4, formula: "|7.0 - 8.6| / 8.6 / 0.2" },
    { label: "EMISSION SIGNAL (25% WT)", score: 80.0, formula: "80 ppm / 100 * 100" },
  ];
  return (
    <div className="space-y-3 font-mono">
      {bars.map((b) => (
        <div key={b.label} className="py-2">
          <div className="flex items-center justify-between text-[10px] mb-1.5">
            <span className="text-paper font-semibold">{b.label}</span>
            <span className="text-vermillion font-bold">{b.score.toFixed(1)} / 100</span>
          </div>
          <div className="h-2 w-full bg-obsidian-surface overflow-hidden">
            <div
              className="h-full bg-vermillion"
              style={{ width: `${b.score}%` }}
            />
          </div>
          <div className="text-[9px] text-steel-light mt-1">
            FORMULA: {b.formula}
          </div>
        </div>
      ))}
    </div>
  );
}

function Stage04Schematic() {
  return (
    <div className="space-y-3 font-mono text-[10px]">
      <div className="flex items-center justify-between text-steel-light">
        <span>OGMP 2.0 INTERVAL CLIPPING &amp; OVERLAP GUARD</span>
        <span className="text-vermillion">RATE * HOURS = KG CH4</span>
      </div>
      <div className="space-y-2 bg-obsidian p-3">
        <div className="flex items-center gap-2">
          <span className="w-20 text-steel-light">INT #101</span>
          <div className="flex-1 h-5 bg-vermillion/90 text-paper px-2 flex items-center justify-between">
            <span>00:00 → 08:00 (8.0h)</span>
            <span className="font-bold">2.4 kg/h = 19.2 kg</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-20 text-vermillion font-bold">INT #102</span>
          <div className="flex-1 h-5 border border-vermillion bg-vermillion/15 text-vermillion px-2 flex items-center justify-between">
            <span>06:00 → 10:00 [OVERLAP]</span>
            <span className="font-bold">REJECTED (NO DOUBLE COUNT)</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-20 text-steel-light">INT #103</span>
          <div className="flex-1 h-5 bg-paper text-obsidian px-2 flex items-center justify-between">
            <span>08:00 → 20:00 (12.0h)</span>
            <span className="font-bold">2.1 kg/h = 25.2 kg</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function Stage05Schematic() {
  return (
    <div className="bg-obsidian p-3.5 font-mono text-xs space-y-3">
      <div className="flex items-center justify-between border-b border-hairline-dark pb-2">
        <span className="text-vermillion font-bold">TICKET // WO-2026-089</span>
        <span className="bg-vermillion text-paper px-2 py-0.5 text-[10px] font-bold">
          PRIORITY: CRITICAL
        </span>
      </div>
      <div className="grid grid-cols-2 gap-3 text-[10px]">
        <div className="bg-obsidian-surface p-2.5">
          <div className="text-steel-light">ASSET SEGMENT</div>
          <div className="text-paper font-semibold mt-0.5">
            EV-01 Emergency Relief Valve
          </div>
        </div>
        <div className="bg-obsidian-surface p-2.5">
          <div className="text-steel-light">TRIGGER CONDITION</div>
          <div className="text-vermillion font-semibold mt-0.5">
            45% Wall Loss + Seat Simmer
          </div>
        </div>
      </div>
      <div className="flex items-center justify-between text-[10px] text-steel-light pt-1">
        <span>STATUS: DISPATCHED TO FIELD CREW 02</span>
        <span className="text-paper">SLA: 48 HOURS</span>
      </div>
    </div>
  );
}

function Stage06Schematic() {
  return (
    <div className="bg-obsidian p-3.5 font-mono text-[10px] space-y-2.5">
      <div className="flex items-center justify-between border-b border-hairline-dark pb-2">
        <span className="text-paper font-bold">
          REGULATORY DOSSIER // RPT-2026-Q4-V4
        </span>
        <span className="border border-vermillion text-vermillion px-1.5 py-0.5">
          IMMUTABLE SNAPSHOT
        </span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <div className="bg-obsidian-surface p-2">
          <div className="text-steel-light">METHOD ID</div>
          <div className="text-paper font-bold mt-0.5">OGMP-2.0-V1</div>
        </div>
        <div className="bg-obsidian-surface p-2">
          <div className="text-steel-light">COVERAGE RATIO</div>
          <div className="text-vermillion font-bold mt-0.5">0.94 (PARTIAL)</div>
        </div>
        <div className="bg-obsidian-surface p-2">
          <div className="text-steel-light">UNCERTAINTY</div>
          <div className="text-paper font-bold mt-0.5">+/- 15.0%</div>
        </div>
      </div>
      <div className="bg-obsidian-elevated px-2.5 py-1.5 text-steel-light">
        EXCLUSION LOG: 1 overlapping observation (#884) excluded; 0 stale assets coerced.
      </div>
    </div>
  );
}
