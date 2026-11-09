"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import * as m from "motion/react-m";
import { Activity, AlertOctagon, Flame, RotateCcw, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  VESSEL_SEGMENTS,
  evaluateNasirEmission,
  evaluateNasirRisk,
  type VesselSegmentSpec,
} from "@/data/nasir-content";

const AssetInspectorScene = dynamic(
  () => import("@/components/scenes/asset-inspector-scene"),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[380px] w-full items-center justify-center border border-hairline-dark bg-obsidian font-mono text-xs uppercase tracking-[0.16em] text-steel-light">
        <span className="inline-block h-2 w-2 bg-vermillion mr-2 animate-pulse" />
        LOADING 3D SEGMENT INSPECTOR...
      </div>
    ),
  }
);

export function ActRiskSimulator() {
  const [selectedSegment, setSelectedSegment] = useState<VesselSegmentSpec>(
    VESSEL_SEGMENTS[2]
  );

  const [activeMode, setActiveMode] = useState<"risk" | "emissions">("risk");

  const [wallLossPct, setWallLossPct] = useState<number>(
    VESSEL_SEGMENTS[2].wallLossPct
  );
  const [pressureBar, setPressureBar] = useState<number>(
    VESSEL_SEGMENTS[2].operatingPressureBar
  );
  const [methanePpm, setMethanePpm] = useState<number>(
    VESSEL_SEGMENTS[2].methanePpm
  );
  const [isWithin24h, setIsWithin24h] = useState<boolean>(true);
  const [simulateMissingParam, setSimulateMissingParam] =
    useState<boolean>(false);

  const [methaneRateKgH, setMethaneRateKgH] = useState<number>(
    VESSEL_SEGMENTS[2].methaneRateKgH
  );
  const [observedHours, setObservedHours] = useState<number>(
    VESSEL_SEGMENTS[2].intervalHours
  );
  const [gwpFactor, setGwpFactor] = useState<number>(28);
  const [hasOverlapAnomaly, setHasOverlapAnomaly] = useState<boolean>(false);

  const handleSelectSegment = (seg: VesselSegmentSpec) => {
    setSelectedSegment(seg);
    setWallLossPct(seg.wallLossPct);
    setPressureBar(seg.operatingPressureBar);
    setMethanePpm(seg.methanePpm);
    setMethaneRateKgH(seg.methaneRateKgH);
    setObservedHours(seg.intervalHours);
    setIsWithin24h(true);
    setSimulateMissingParam(false);
  };

  const riskResult = evaluateNasirRisk({
    wallLossPct: simulateMissingParam ? null : wallLossPct,
    pressureBar,
    baselinePressureBar: selectedSegment.baselinePressureBar,
    methanePpm,
    isWithin24hWindow: isWithin24h,
  });

  const emissionResult = evaluateNasirEmission({
    methaneRateKgH,
    observedHours,
    totalPeriodHours: 168,
    gwpFactor,
    hasOverlapAnomaly,
  });

  return (
    <section
      id="act-simulator"
      className="relative w-full border-b border-obsidian bg-obsidian text-paper"
    >
      <div className="mx-auto max-w-[1440px] border-x border-hairline-dark">
        {/* Compact Header */}
        <div className="border-b border-hairline-dark px-6 sm:px-12 py-10 lg:py-14 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
          <div>
            <div className="font-mono text-xs uppercase tracking-[0.18em] text-vermillion font-bold mb-2">
              REAL-TIME DETERMINISTIC WORKBENCH // ZERO-COERCION TEST
            </div>
            <h2 className="font-sans text-3xl sm:text-5xl font-bold uppercase tracking-tight leading-[1.02] text-paper">
              INTERACTIVE 3D RISK &amp; CH4 SIMULATOR.
            </h2>
          </div>

          <Button
            variant="outlineDark"
            size="sm"
            onClick={() => handleSelectSegment(selectedSegment)}
          >
            <RotateCcw className="h-3.5 w-3.5 text-vermillion" />
            <span>RESET TELEMETRY</span>
          </Button>
        </div>

        {/* 12-Column Interactive Workbench */}
        <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-hairline-dark">
          {/* Left 6 Columns: 3D Segment Inspector + Segment Switcher */}
          <div className="lg:col-span-6 p-6 sm:p-10 lg:p-12 flex flex-col justify-between space-y-6">
            <div>
              {/* Segment Quick-Selector Pills */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 mb-4">
                {VESSEL_SEGMENTS.map((seg) => {
                  const isSegActive = seg.id === selectedSegment.id;
                  return (
                    <button
                      key={seg.id}
                      type="button"
                      onClick={() => handleSelectSegment(seg)}
                      className={`px-2.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.12em] transition-colors truncate cursor-pointer ${
                        isSegActive
                          ? "bg-vermillion text-paper font-bold"
                          : "bg-obsidian-elevated text-steel-light hover:text-paper hover:bg-obsidian-surface border border-hairline-dark"
                      }`}
                    >
                      {seg.code}
                    </button>
                  );
                })}
              </div>

              <div className="flex items-center justify-between mb-3 font-mono text-xs uppercase tracking-[0.15em]">
                <span className="text-vermillion font-bold">
                  {selectedSegment.code} // {selectedSegment.name}
                </span>
                <span className="text-steel-light">
                  {selectedSegment.componentType}
                </span>
              </div>

              <AssetInspectorScene
                activeSegmentId={selectedSegment.id}
                onSelectSegment={handleSelectSegment}
              />
            </div>

            {/* Compact 3-Stat Telemetry Bar */}
            <div className="grid grid-cols-3 gap-4 border-t border-hairline-dark pt-4 font-mono text-xs">
              <div>
                <div className="text-[10px] text-steel-light uppercase">
                  NOMINAL WALL
                </div>
                <div className="text-sm sm:text-base text-paper font-bold mt-0.5">
                  {selectedSegment.nominalThicknessMm.toFixed(1)} mm
                </div>
              </div>
              <div>
                <div className="text-[10px] text-steel-light uppercase">
                  MEASURED WALL
                </div>
                <div className="text-sm sm:text-base text-vermillion font-bold mt-0.5">
                  {(
                    selectedSegment.nominalThicknessMm *
                    (1 - wallLossPct / 100)
                  ).toFixed(2)}{" "}
                  mm
                </div>
              </div>
              <div>
                <div className="text-[10px] text-steel-light uppercase">
                  BASELINE PRESSURE
                </div>
                <div className="text-sm sm:text-base text-paper font-bold mt-0.5">
                  {selectedSegment.baselinePressureBar.toFixed(1)} bar
                </div>
              </div>
            </div>
          </div>

          {/* Right 6 Columns: 2-Tab Interactive Mode Switcher */}
          <div className="lg:col-span-6 p-6 sm:p-10 bg-obsidian-elevated/40 flex flex-col justify-between">
            <div>
              {/* Tab Switcher Header */}
              <div className="grid grid-cols-2 border border-hairline-dark bg-obsidian mb-6 font-mono text-xs">
                <button
                  type="button"
                  onClick={() => setActiveMode("risk")}
                  className={`p-3.5 flex items-center justify-center gap-2 uppercase tracking-[0.14em] transition-colors cursor-pointer ${
                    activeMode === "risk"
                      ? "bg-obsidian-surface text-paper border-b-2 border-vermillion font-bold"
                      : "text-steel-light hover:text-paper hover:bg-obsidian-elevated"
                  }`}
                >
                  <Activity className="h-4 w-4 text-vermillion" />
                  <span>ENGINE A // API 580 RISK</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveMode("emissions")}
                  className={`p-3.5 flex items-center justify-center gap-2 uppercase tracking-[0.14em] transition-colors cursor-pointer ${
                    activeMode === "emissions"
                      ? "bg-obsidian-surface text-paper border-b-2 border-vermillion font-bold"
                      : "text-steel-light hover:text-paper hover:bg-obsidian-elevated"
                  }`}
                >
                  <Flame className="h-4 w-4 text-vermillion" />
                  <span>ENGINE B // OGMP 2.0 CH4</span>
                </button>
              </div>

              {/* Mode A: API 580 Risk Triage Engine */}
              {activeMode === "risk" && (
                <m.div
                  key="engine-risk"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.22 }}
                  className="space-y-3.5 font-mono text-xs"
                >
                  <div className="bg-obsidian p-3.5">
                    <div className="flex items-center justify-between mb-2">
                      <label
                        htmlFor="slider-wall-loss"
                        className="uppercase tracking-[0.12em] text-paper"
                      >
                        1. ULTRASONIC WALL LOSS (%)
                      </label>
                      <span className="text-vermillion font-bold">
                        {simulateMissingParam
                          ? "NULL (MISSING)"
                          : `${wallLossPct}%`}
                      </span>
                    </div>
                    <input
                      id="slider-wall-loss"
                      type="range"
                      min={0}
                      max={60}
                      step={1}
                      disabled={simulateMissingParam}
                      value={wallLossPct}
                      onChange={(e) => setWallLossPct(Number(e.target.value))}
                      className="w-full accent-[#FF3B00] cursor-pointer"
                    />
                  </div>

                  <div className="bg-obsidian p-3.5">
                    <div className="flex items-center justify-between mb-2">
                      <label
                        htmlFor="slider-pressure"
                        className="uppercase tracking-[0.12em] text-paper"
                      >
                        2. OPERATING PRESSURE ({selectedSegment.baselinePressureBar} BAR BASE)
                      </label>
                      <span className="text-vermillion font-bold">
                        {pressureBar.toFixed(1)} BAR
                      </span>
                    </div>
                    <input
                      id="slider-pressure"
                      type="range"
                      min={6.0}
                      max={10.5}
                      step={0.1}
                      value={pressureBar}
                      onChange={(e) => setPressureBar(Number(e.target.value))}
                      className="w-full accent-[#FF3B00] cursor-pointer"
                    />
                  </div>

                  <div className="bg-obsidian p-3.5">
                    <div className="flex items-center justify-between mb-2">
                      <label
                        htmlFor="slider-ppm"
                        className="uppercase tracking-[0.12em] text-paper"
                      >
                        3. METHANE SNIFFER SIGNAL (PPM)
                      </label>
                      <span className="text-vermillion font-bold">
                        {methanePpm} PPM
                      </span>
                    </div>
                    <input
                      id="slider-ppm"
                      type="range"
                      min={0}
                      max={120}
                      step={2}
                      value={methanePpm}
                      onChange={(e) => setMethanePpm(Number(e.target.value))}
                      className="w-full accent-[#FF3B00] cursor-pointer"
                    />
                  </div>

                  {/* Null-Safety & Freshness Window Toggles */}
                  <div className="grid grid-cols-2 gap-2.5">
                    <button
                      type="button"
                      onClick={() => setIsWithin24h((prev) => !prev)}
                      className={`p-2.5 text-left font-mono text-[10px] uppercase tracking-[0.12em] cursor-pointer ${
                        isWithin24h
                          ? "bg-obsidian text-paper border border-hairline-dark"
                          : "bg-vermillion/15 text-vermillion border border-vermillion font-bold"
                      }`}
                    >
                      {isWithin24h
                        ? "✓ 24H FRESHNESS OK"
                        : "✕ STALE (>24H) -> NULL"}
                    </button>

                    <button
                      type="button"
                      onClick={() => setSimulateMissingParam((prev) => !prev)}
                      className={`p-2.5 text-left font-mono text-[10px] uppercase tracking-[0.12em] cursor-pointer ${
                        !simulateMissingParam
                          ? "bg-obsidian text-paper border border-hairline-dark"
                          : "bg-vermillion/15 text-vermillion border border-vermillion font-bold"
                      }`}
                    >
                      {!simulateMissingParam
                        ? "✓ ALL SENSORS VALID"
                        : "✕ MISSING SENSOR -> NULL"}
                    </button>
                  </div>

                  {/* Animated Composite Risk Gauge */}
                  <div className="border border-vermillion bg-obsidian p-5 chamfer-tr">
                    <div className="grid grid-cols-3 gap-3 mb-4 font-mono text-xs">
                      {[
                        { label: "CORROSION", val: riskResult.corrosionScore },
                        { label: "LEAK DEV", val: riskResult.leakScore },
                        { label: "CH4 SIGNAL", val: riskResult.emissionSignalScore },
                      ].map((sub) => (
                        <div key={sub.label}>
                          <div className="flex justify-between text-[10px] text-steel-light mb-1">
                            <span>{sub.label}</span>
                            <span className="text-paper font-bold">
                              {sub.val !== null ? sub.val.toFixed(0) : "NULL"}
                            </span>
                          </div>
                          <div className="h-1.5 w-full bg-obsidian-surface overflow-hidden">
                            <m.div
                              initial={false}
                              animate={{
                                scaleX: sub.val !== null ? sub.val / 100 : 0,
                              }}
                              style={{ transformOrigin: "0% 50%" }}
                              className="h-full w-full bg-vermillion"
                            />
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-hairline-dark">
                      <div>
                        <div className="font-mono text-[10px] uppercase tracking-[0.16em] text-steel-light">
                          COMPOSITE TRIAGE SCORE
                        </div>
                        <div className="font-mono text-2xl sm:text-3xl font-bold text-paper mt-0.5">
                          {riskResult.compositeScore !== null
                            ? `${riskResult.compositeScore.toFixed(1)} / 100`
                            : "NULL // STALE OR MISSING"}
                        </div>
                      </div>

                      <div className="border border-vermillion bg-vermillion px-3.5 py-1.5 font-mono text-xs font-bold uppercase tracking-[0.16em] text-paper chamfer-sm flex items-center gap-2">
                        {riskResult.tier === "LOW" ? (
                          <ShieldCheck className="h-4 w-4" />
                        ) : (
                          <AlertOctagon className="h-4 w-4" />
                        )}
                        <span>{riskResult.tier}</span>
                      </div>
                    </div>
                  </div>
                </m.div>
              )}

              {/* Mode B: OGMP 2.0 Fugitive Methane Mass Integrator */}
              {activeMode === "emissions" && (
                <m.div
                  key="engine-emissions"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.22 }}
                  className="space-y-4 font-mono text-xs"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="bg-obsidian p-3.5">
                      <div className="flex justify-between mb-1.5">
                        <label
                          htmlFor="slider-mass-rate"
                          className="text-[11px] text-paper"
                        >
                          MASS FLOW RATE (KG/H)
                        </label>
                        <span className="text-vermillion font-bold">
                          {methaneRateKgH.toFixed(2)} kg/h
                        </span>
                      </div>
                      <input
                        id="slider-mass-rate"
                        type="range"
                        min={0.05}
                        max={5.0}
                        step={0.05}
                        value={methaneRateKgH}
                        onChange={(e) =>
                          setMethaneRateKgH(Number(e.target.value))
                        }
                        className="w-full accent-[#FF3B00] cursor-pointer"
                      />
                    </div>

                    <div className="bg-obsidian p-3.5">
                      <div className="flex justify-between mb-1.5">
                        <label
                          htmlFor="slider-hours"
                          className="text-[11px] text-paper"
                        >
                          MEASURED WINDOW (OF 168H)
                        </label>
                        <span className="text-vermillion font-bold">
                          {observedHours}h
                        </span>
                      </div>
                      <input
                        id="slider-hours"
                        type="range"
                        min={12}
                        max={168}
                        step={12}
                        value={observedHours}
                        onChange={(e) =>
                          setObservedHours(Number(e.target.value))
                        }
                        className="w-full accent-[#FF3B00] cursor-pointer"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2.5 font-mono text-[10px]">
                    <button
                      type="button"
                      onClick={() => setGwpFactor(gwpFactor === 28 ? 84 : 28)}
                      className="border border-hairline-dark bg-obsidian p-2.5 text-left text-paper hover:border-vermillion cursor-pointer"
                    >
                      GWP FACTOR: {gwpFactor}x ({gwpFactor === 28 ? "100-YR" : "20-YR"})
                    </button>
                    <button
                      type="button"
                      onClick={() => setHasOverlapAnomaly((p) => !p)}
                      className={`border p-2.5 text-left cursor-pointer ${
                        hasOverlapAnomaly
                          ? "border-vermillion bg-vermillion/15 text-vermillion font-bold"
                          : "border-hairline-dark bg-obsidian text-steel-light"
                      }`}
                    >
                      {hasOverlapAnomaly
                        ? "✕ OVERLAP GUARD ACTIVE"
                        : "+ TEST INTERVAL OVERLAP"}
                    </button>
                  </div>

                  <div className="border border-vermillion bg-obsidian p-5 chamfer-tr space-y-4">
                    {/* Animated Coverage Bar */}
                    <div>
                      <div className="flex justify-between text-[10px] text-steel-light mb-1.5">
                        <span>TEMPORAL COVERAGE RATIO</span>
                        <span className="text-paper font-bold">
                          {(emissionResult.coverageRatio * 100).toFixed(0)}% ({observedHours}H / 168H)
                        </span>
                      </div>
                      <div className="h-2 w-full bg-obsidian-surface overflow-hidden">
                        <m.div
                          initial={false}
                          animate={{ scaleX: emissionResult.coverageRatio }}
                          style={{ transformOrigin: "0% 50%" }}
                          className="h-full w-full bg-vermillion"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4 pt-3 border-t border-hairline-dark">
                      <div>
                        <div className="text-[10px] text-steel-light">
                          INTEGRATED CH4 MASS
                        </div>
                        <div className="text-2xl font-bold text-paper mt-0.5">
                          {emissionResult.methaneMassKg} kg
                        </div>
                      </div>
                      <div>
                        <div className="text-[10px] text-steel-light">
                          CO2e EQUIVALENT
                        </div>
                        <div className="text-2xl font-bold text-vermillion mt-0.5">
                          {emissionResult.co2eTons} tCO2e
                        </div>
                      </div>
                    </div>
                  </div>
                </m.div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
