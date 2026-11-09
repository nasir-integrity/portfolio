"use client";

import React, { useRef } from "react";
import { Canvas } from "@react-three/fiber";
import { Grid, OrbitControls } from "@react-three/drei";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";
import { VESSEL_SEGMENTS, type VesselSegmentSpec } from "@/data/nasir-content";

interface AssetInspectorProps {
  activeSegmentId: string;
  onSelectSegment: (segment: VesselSegmentSpec) => void;
}

function SegmentMeshes({
  activeSegmentId,
  onSelectSegment,
}: AssetInspectorProps) {
  const isSelected = (id: string) => activeSegmentId === id;

  return (
    <group position={[0, -0.15, 0]}>
      {/* Segment 1: Inlet Flange F-101 */}
      <mesh
        position={[-1.6, 0, 0]}
        rotation={[0, 0, Math.PI / 2]}
        onClick={(e) => {
          e.stopPropagation();
          onSelectSegment(VESSEL_SEGMENTS[0]);
        }}
      >
        <cylinderGeometry args={[0.46, 0.46, 0.2, 24]} />
        <meshStandardMaterial
          color={isSelected("seg-inlet-flange") ? "#FF3B00" : "#52524E"}
          roughness={0.32}
          metalness={0.78}
          emissive={isSelected("seg-inlet-flange") ? "#FF3B00" : "#000000"}
          emissiveIntensity={isSelected("seg-inlet-flange") ? 0.55 : 0}
        />
      </mesh>

      {/* Inlet Neck Pipe */}
      <mesh position={[-1.2, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.26, 0.26, 0.65, 20]} />
        <meshStandardMaterial color="#2A2A28" roughness={0.5} metalness={0.6} />
      </mesh>

      {/* Segment 2: Vessel Shell Zone A */}
      <mesh
        position={[0, 0, 0]}
        rotation={[0, 0, Math.PI / 2]}
        onClick={(e) => {
          e.stopPropagation();
          onSelectSegment(VESSEL_SEGMENTS[1]);
        }}
      >
        <cylinderGeometry args={[0.66, 0.66, 1.65, 32]} />
        <meshStandardMaterial
          color={isSelected("seg-vessel-shell") ? "#FF3B00" : "#262624"}
          roughness={0.35}
          metalness={0.75}
          emissive={isSelected("seg-vessel-shell") ? "#FF3B00" : "#000000"}
          emissiveIntensity={isSelected("seg-vessel-shell") ? 0.45 : 0}
        />
      </mesh>

      {/* Circumferential Reference Rings */}
      {[-0.55, 0.55].map((rx) => (
        <mesh
          key={`ring-${rx}`}
          position={[rx, 0, 0]}
          rotation={[0, 0, Math.PI / 2]}
        >
          <torusGeometry args={[0.67, 0.015, 8, 32]} />
          <meshStandardMaterial color="#8E8E88" roughness={0.3} metalness={0.85} />
        </mesh>
      ))}

      {/* Segment 3: Emergency Relief Valve EV-01 */}
      <mesh
        position={[0, 0.96, 0]}
        onClick={(e) => {
          e.stopPropagation();
          onSelectSegment(VESSEL_SEGMENTS[2]);
        }}
      >
        <boxGeometry args={[0.36, 0.36, 0.36]} />
        <meshStandardMaterial
          color={isSelected("seg-control-valve") ? "#FF3B00" : "#F4F4F0"}
          roughness={0.28}
          metalness={0.7}
          emissive={isSelected("seg-control-valve") ? "#FF3B00" : "#000000"}
          emissiveIntensity={isSelected("seg-control-valve") ? 0.65 : 0}
        />
      </mesh>

      {/* Valve Handwheel */}
      <mesh position={[0, 1.28, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.17, 0.03, 8, 24]} />
        <meshStandardMaterial color="#F4F4F0" roughness={0.3} metalness={0.6} />
      </mesh>

      {/* Segment 4: Gas Outlet Nozzle N-02 */}
      <mesh
        position={[1.22, 0, 0]}
        rotation={[0, 0, Math.PI / 2]}
        onClick={(e) => {
          e.stopPropagation();
          onSelectSegment(VESSEL_SEGMENTS[3]);
        }}
      >
        <cylinderGeometry args={[0.27, 0.27, 0.68, 24]} />
        <meshStandardMaterial
          color={isSelected("seg-outlet-pipe") ? "#FF3B00" : "#8E8E88"}
          roughness={0.35}
          metalness={0.75}
          emissive={isSelected("seg-outlet-pipe") ? "#FF3B00" : "#000000"}
          emissiveIntensity={isSelected("seg-outlet-pipe") ? 0.5 : 0}
        />
      </mesh>

      {/* Base Saddles */}
      <mesh position={[-0.5, -0.82, 0]}>
        <boxGeometry args={[0.3, 0.5, 1.15]} />
        <meshStandardMaterial color="#161616" roughness={0.85} />
      </mesh>
      <mesh position={[0.5, -0.82, 0]}>
        <boxGeometry args={[0.3, 0.5, 1.15]} />
        <meshStandardMaterial color="#161616" roughness={0.85} />
      </mesh>
    </group>
  );
}

export default function AssetInspectorScene({
  activeSegmentId,
  onSelectSegment,
}: AssetInspectorProps) {
  const controlsRef = useRef<OrbitControlsImpl | null>(null);

  const handleResetCamera = () => {
    controlsRef.current?.reset();
  };

  return (
    <div className="relative h-[380px] w-full border border-hairline-dark bg-obsidian overflow-hidden">
      {/* Top Left Telemetry Tag */}
      <div className="
        absolute top-3 left-3 z-10 flex items-center gap-2
      ">
        <span className="border border-hairline-dark bg-obsidian-elevated px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-paper">
          3D SEGMENT INSPECTOR // CLICK GEOMETRY
        </span>
        <button
          type="button"
          onClick={handleResetCamera}
          className="border border-hairline-dark bg-obsidian-surface px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em] text-steel-light hover:border-vermillion hover:text-vermillion cursor-pointer"
        >
          RESET CAM
        </button>
      </div>

      {/* Bottom Quick-Select Bar */}
      <div className="absolute bottom-3 inset-x-3 z-10 grid grid-cols-2 sm:grid-cols-4 gap-1.5">
        {VESSEL_SEGMENTS.map((seg) => {
          const active = seg.id === activeSegmentId;
          return (
            <button
              key={seg.id}
              type="button"
              onClick={() => onSelectSegment(seg)}
              className={`px-2.5 py-1.5 text-left font-mono text-[10px] uppercase tracking-[0.12em] border cursor-pointer ${
                active
                  ? "border-vermillion bg-vermillion text-paper font-semibold"
                  : "border-hairline-dark bg-obsidian-elevated/90 text-steel-light hover:border-paper hover:text-paper"
              }`}
            >
              <div className="truncate">{seg.code}</div>
              <div className="truncate text-[9px] opacity-80">{seg.name}</div>
            </button>
          );
        })}
      </div>

      <Canvas
        camera={{ position: [0, 1.25, 3.7], fov: 44 }}
        gl={{ antialias: true, powerPreference: "high-performance" }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.85} />
        <directionalLight position={[4, 6, 4]} intensity={1.5} color="#F4F4F0" />
        <directionalLight
          position={[-4, 2, -3]}
          intensity={0.65}
          color="#FF3B00"
        />

        <SegmentMeshes
          activeSegmentId={activeSegmentId}
          onSelectSegment={onSelectSegment}
        />

        <Grid
          position={[0, -1.22, 0]}
          args={[12, 12]}
          cellSize={0.4}
          cellThickness={0.7}
          cellColor="#1E1E1E"
          sectionSize={2.0}
          sectionThickness={1.0}
          sectionColor="#FF3B00"
          fadeDistance={7}
          fadeStrength={1.2}
        />

        <OrbitControls
          ref={controlsRef}
          enablePan={false}
          enableZoom={false}
          minDistance={2.2}
          maxDistance={5.5}
        />
      </Canvas>
    </div>
  );
}
