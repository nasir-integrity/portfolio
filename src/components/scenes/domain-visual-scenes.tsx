"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Float, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

/**
 * 1. Standards 3D Visualization: Structural Integrity vs Methane Emissions
 */
export function Standards3DScene({
  variant,
}: {
  variant: "integrity" | "emissions";
}) {
  return (
    <div className="relative w-full h-[320px] sm:h-[400px] min-h-0 overflow-hidden bg-obsidian-elevated/70 border border-hairline-dark/60 chamfer-tr">
      <Canvas
        camera={{ position: [2.8, 1.8, 3.2], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <hemisphereLight args={["#FFFFFF", "#181A22", 1.4]} />
        <directionalLight position={[6, 9, 6]} intensity={2.8} color="#FFFFFF" />
        <directionalLight position={[-4, 6, -7]} intensity={3.8} color="#FFFFFF" />
        <directionalLight position={[-6, 2, 4]} intensity={1.5} color="#A8BEDD" />
        <directionalLight position={[0, -4, 3]} intensity={1.0} color="#FF6B35" />

        <Float speed={1.2} rotationIntensity={0.08} floatIntensity={0.08}>
          {variant === "integrity" ? (
            <StructuralIntegrityMesh />
          ) : (
            <FugitiveEmissionsMesh />
          )}
        </Float>

        <ContactShadows
          position={[0, -1.0, 0]}
          opacity={0.6}
          scale={5}
          blur={1.8}
          far={2.5}
          color="#050505"
        />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.8}
          autoRotate
          autoRotateSpeed={0.7}
        />
      </Canvas>
    </div>
  );
}

function StructuralIntegrityMesh() {
  const coreRef = useRef<THREE.Group>(null);
  const ringRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ringRef.current) {
      ringRef.current.rotation.y = t * 0.9;
      const s = 1 + Math.sin(t * 3.5) * 0.08;
      ringRef.current.scale.set(s, s, s);
    }
  });

  return (
    <group ref={coreRef} position={[0, 0, 0]}>
      {/* Cylindrical Pressure Shell Cutaway - Gunmetal Titanium */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.7, 0.7, 2.2, 32, 1, true, 0, Math.PI * 1.65]} />
        <meshStandardMaterial
          color="#505664"
          metalness={0.75}
          roughness={0.28}
          side={THREE.DoubleSide}
        />
      </mesh>

      {/* Internal Corrosion Core */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.55, 0.55, 1.8, 24]} />
        <meshStandardMaterial
          color="#FF3B00"
          emissive="#FF3B00"
          emissiveIntensity={0.5}
          roughness={0.35}
          metalness={0.6}
        />
      </mesh>

      {/* Ultrasonic Scanning Rings - High Polish */}
      {[-0.6, 0, 0.6].map((x, i) => (
        <mesh key={i} position={[x, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.74, 0.02, 16, 32]} />
          <meshStandardMaterial color="#DCE0EA" metalness={0.95} roughness={0.1} />
        </mesh>
      ))}

      {/* Pulsing Stress Field */}
      <mesh ref={ringRef} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.82, 0.015, 8, 32]} />
        <meshStandardMaterial
          color="#FF3B00"
          emissive="#FF3B00"
          emissiveIntensity={0.85}
        />
      </mesh>
    </group>
  );
}

function FugitiveEmissionsMesh() {
  const plumeRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (plumeRef.current) {
      plumeRef.current.rotation.y = t * 0.6;
    }
  });

  return (
    <group ref={plumeRef} position={[0, -0.2, 0]}>
      {/* Flanged Joint Base - Brushed Steel */}
      <mesh position={[0, -0.4, 0]}>
        <cylinderGeometry args={[0.75, 0.75, 0.16, 24]} />
        <meshStandardMaterial color="#606675" metalness={0.8} roughness={0.24} />
      </mesh>
      <mesh position={[0, -0.22, 0]}>
        <cylinderGeometry args={[0.75, 0.75, 0.16, 24]} />
        <meshStandardMaterial color="#606675" metalness={0.8} roughness={0.24} />
      </mesh>

      {/* High-Precision Gasket Core */}
      <mesh position={[0, -0.31, 0]}>
        <cylinderGeometry args={[0.62, 0.62, 0.04, 24]} />
        <meshStandardMaterial color="#FF3B00" emissive="#FF3B00" emissiveIntensity={0.7} />
      </mesh>

      {/* Stack Pipe - Machined Titanium */}
      <mesh position={[0, 0.35, 0]}>
        <cylinderGeometry args={[0.38, 0.38, 1.0, 24, 1, true]} />
        <meshStandardMaterial color="#4D5361" metalness={0.75} roughness={0.28} side={THREE.DoubleSide} />
      </mesh>

      {/* Atmospheric Mass Flow Containment Rings */}
      {[0.5, 0.78, 1.05].map((y, idx) => (
        <mesh key={idx} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.42 + idx * 0.14, 0.016, 12, 32]} />
          <meshStandardMaterial
            color={idx === 1 ? "#FF3B00" : "#DCE0EA"}
            emissive={idx === 1 ? "#FF3B00" : "#000000"}
            emissiveIntensity={idx === 1 ? 0.75 : 0}
            metalness={0.85}
            roughness={0.15}
          />
        </mesh>
      ))}
    </group>
  );
}

/**
 * 2. Pipeline Scrollytelling 3D Visualization: 6-Stage Industrial Transformations
 * Spans the full height and width of the right column without inner borders or frames.
 */
export function PipelineStage3DScene({ stepIndex }: { stepIndex: number }) {
  return (
    <div className="relative w-full h-full min-h-[440px] sm:min-h-[500px] lg:min-h-full overflow-hidden bg-obsidian flex items-center justify-center">
      <Canvas
        camera={{ position: [3.4, 2.2, 3.8], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <hemisphereLight args={["#FFFFFF", "#181B24", 1.5]} />
        <directionalLight position={[6, 9, 6]} intensity={3.0} color="#FFFFFF" />
        <directionalLight position={[-4, 7, -8]} intensity={4.2} color="#FFFFFF" />
        <directionalLight position={[-6, 2, 4]} intensity={1.6} color="#A8BEDD" />
        <directionalLight position={[0, -4, 3]} intensity={1.2} color="#FF6B35" />

        <Float speed={1.0} rotationIntensity={0.06} floatIntensity={0.06}>
          <PipelineObjectByStage stepIndex={stepIndex} />
        </Float>

        <ContactShadows
          position={[0, -1.2, 0]}
          opacity={0.65}
          scale={6}
          blur={2.0}
          far={3.0}
          color="#050505"
        />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.85}
          autoRotate
          autoRotateSpeed={0.65}
        />
      </Canvas>
    </div>
  );
}

function PipelineObjectByStage({ stepIndex }: { stepIndex: number }) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (groupRef.current) {
      groupRef.current.rotation.y = t * 0.35;
    }
  });

  return (
    <group ref={groupRef}>
      {/* STAGE 01: Spatial Digital Twin Geometry */}
      {stepIndex === 0 && (
        <group>
          {/* Main Vessel Body - Gunmetal Titanium */}
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.75, 0.75, 2.4, 32]} />
            <meshStandardMaterial color="#525866" metalness={0.7} roughness={0.25} wireframe={false} />
          </mesh>
          {/* Coordinate Scan Lattice */}
          <mesh rotation={[0, 0, Math.PI / 2]} position={[0, 0, 0]}>
            <cylinderGeometry args={[0.77, 0.77, 2.44, 16]} />
            <meshStandardMaterial color="#FF3B00" wireframe={true} />
          </mesh>
          {/* Hemispherical Pressure Heads */}
          {[-1.2, 1.2].map((x, i) => (
            <mesh key={i} position={[x, 0, 0]} rotation={[0, 0, i === 0 ? Math.PI / 2 : -Math.PI / 2]}>
              <sphereGeometry args={[0.75, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
              <meshStandardMaterial color="#6A7080" metalness={0.8} roughness={0.22} />
            </mesh>
          ))}
          {/* Structural Saddle Ribs */}
          {[-0.6, 0.6].map((x, i) => (
            <mesh key={`rib-${i}`} position={[x, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
              <torusGeometry args={[0.79, 0.03, 16, 32]} />
              <meshStandardMaterial color="#DCE0EA" metalness={0.9} roughness={0.15} />
            </mesh>
          ))}
        </group>
      )}

      {/* STAGE 02: Signal Immunity (Quarantine Matrix) */}
      {stepIndex === 1 && (
        <group>
          {[-0.8, 0, 0.8].map((x, ix) =>
            [-0.5, 0.5].map((y, iy) => {
              const isQuarantine = ix === 2 && iy === 1;
              return (
                <mesh key={`${ix}-${iy}`} position={[x, y, (ix * iy) * 0.2]}>
                  <boxGeometry args={[0.34, 0.34, 0.34]} />
                  <meshStandardMaterial
                    color={isQuarantine ? "#FF3B00" : "#646A78"}
                    emissive={isQuarantine ? "#FF3B00" : "#000000"}
                    emissiveIntensity={isQuarantine ? 0.9 : 0}
                    metalness={0.75}
                    roughness={0.22}
                  />
                </mesh>
              );
            })
          )}
          {/* Quarantined Isolation Ring */}
          <mesh position={[0.8, 0.5, 0]}>
            <ringGeometry args={[0.26, 0.32, 32]} />
            <meshBasicMaterial color="#FF3B00" side={THREE.DoubleSide} />
          </mesh>
          {/* Bus Interconnect Rails */}
          {[-0.5, 0.5].map((y, i) => (
            <mesh key={`rail-${i}`} position={[0, y, 0]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.02, 0.02, 1.8, 12]} />
              <meshStandardMaterial color="#A4AABE" metalness={0.9} roughness={0.15} />
            </mesh>
          ))}
        </group>
      )}

      {/* STAGE 03: Structural Triage (Tri-Axial Stress Core) */}
      {stepIndex === 2 && (
        <group>
          {/* Internal High-Stress Core */}
          <mesh>
            <octahedronGeometry args={[0.85, 0]} />
            <meshStandardMaterial
              color="#FF3B00"
              emissive="#FF3B00"
              emissiveIntensity={0.65}
              roughness={0.3}
              metalness={0.65}
            />
          </mesh>
          {/* External Exoskeleton Caliper Cage */}
          <mesh rotation={[Math.PI / 4, Math.PI / 4, 0]}>
            <octahedronGeometry args={[1.2, 0]} />
            <meshStandardMaterial color="#8A90A0" metalness={0.85} roughness={0.18} wireframe={true} />
          </mesh>
          {/* Central Caliper Ring */}
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[1.05, 0.025, 16, 32]} />
            <meshStandardMaterial color="#DCE0EA" metalness={0.92} roughness={0.12} />
          </mesh>
        </group>
      )}

      {/* STAGE 04: Plume Accounting (Non-Overlapping Mass Intervals) */}
      {stepIndex === 3 && (
        <group>
          {/* Calibrated Vent Spool */}
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.24, 0.24, 2.1, 24]} />
            <meshStandardMaterial color="#4D5361" metalness={0.75} roughness={0.28} />
          </mesh>
          {/* Precision Flanged End Collars */}
          {[-0.95, 0.95].map((y, i) => (
            <mesh key={`flange-${i}`} position={[0, y, 0]}>
              <cylinderGeometry args={[0.48, 0.48, 0.1, 24]} />
              <meshStandardMaterial color="#6A7080" metalness={0.82} roughness={0.2} />
            </mesh>
          ))}
          {/* Concentric Non-Overlapping Measurement Discs */}
          {[-0.55, 0, 0.55].map((y, i) => (
            <mesh key={`disc-${i}`} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.52 + i * 0.2, 0.035, 16, 32]} />
              <meshStandardMaterial
                color={i === 1 ? "#FF3B00" : "#DCE0EA"}
                emissive={i === 1 ? "#FF3B00" : "#000000"}
                emissiveIntensity={i === 1 ? 0.75 : 0}
                metalness={0.85}
                roughness={0.15}
              />
            </mesh>
          ))}
        </group>
      )}

      {/* STAGE 05: Field Dispatch (Actuated Safety Valve Mechanism) */}
      {stepIndex === 4 && (
        <group position={[0, -0.25, 0]}>
          {/* Main Valve Body - Gunmetal Titanium with Clear Chamfers */}
          <mesh position={[0, 0.2, 0]}>
            <boxGeometry args={[0.72, 0.72, 0.72]} />
            <meshStandardMaterial color="#525866" metalness={0.75} roughness={0.24} />
          </mesh>
          {/* Pipe Flange Spools Left and Right */}
          {[-0.48, 0.48].map((x, i) => (
            <mesh key={`pipe-${i}`} position={[x, 0.2, 0]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.28, 0.28, 0.26, 24]} />
              <meshStandardMaterial color="#6E7484" metalness={0.82} roughness={0.2} />
            </mesh>
          ))}
          {/* Bonnet Neck Column */}
          <mesh position={[0, 0.7, 0]}>
            <cylinderGeometry args={[0.18, 0.22, 0.32, 24]} />
            <meshStandardMaterial color="#868C9E" metalness={0.85} roughness={0.18} />
          </mesh>
          {/* Actuator Status Halo Ring - Vivid Vermillion */}
          <mesh position={[0, 0.95, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.44, 0.05, 16, 32]} />
            <meshStandardMaterial
              color="#FF3B00"
              emissive="#FF3B00"
              emissiveIntensity={0.85}
              roughness={0.25}
            />
          </mesh>
          {/* Polished Chrome Actuator Stem */}
          <mesh position={[0, 0.95, 0]}>
            <cylinderGeometry args={[0.08, 0.08, 0.5, 16]} />
            <meshStandardMaterial color="#DDE1EC" metalness={0.95} roughness={0.08} />
          </mesh>
          {/* Top Override Handwheel */}
          <mesh position={[0, 1.22, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.26, 0.03, 12, 24]} />
            <meshStandardMaterial color="#787E8E" metalness={0.8} roughness={0.25} />
          </mesh>
        </group>
      )}

      {/* STAGE 06: Sealed Proof (Monolithic Cryptographic Vault) */}
      {stepIndex === 5 && (
        <group>
          {/* Layered Titanium Cryptographic Vault Chassis */}
          <mesh>
            <boxGeometry args={[1.35, 1.75, 0.36]} />
            <meshStandardMaterial color="#484E5C" metalness={0.8} roughness={0.2} />
          </mesh>
          {/* Front Brushed Faceplate */}
          <mesh position={[0, 0, 0.19]}>
            <boxGeometry args={[1.15, 1.55, 0.03]} />
            <meshStandardMaterial color="#686E7E" metalness={0.85} roughness={0.18} />
          </mesh>
          {/* Front Dual Vermillion Optical Hash Ring */}
          <mesh position={[0, 0, 0.22]}>
            <ringGeometry args={[0.28, 0.36, 32]} />
            <meshStandardMaterial
              color="#FF3B00"
              emissive="#FF3B00"
              emissiveIntensity={0.85}
              side={THREE.DoubleSide}
            />
          </mesh>
          {/* Rear Hash Ring */}
          <mesh position={[0, 0, -0.19]}>
            <ringGeometry args={[0.28, 0.36, 32]} />
            <meshStandardMaterial
              color="#FF3B00"
              emissive="#FF3B00"
              emissiveIntensity={0.85}
              side={THREE.DoubleSide}
            />
          </mesh>
          {/* Corner Security Locking Pins */}
          {[
            [-0.52, -0.72],
            [0.52, -0.72],
            [-0.52, 0.72],
            [0.52, 0.72],
          ].map(([x, y], i) => (
            <mesh key={`pin-${i}`} position={[x, y, 0.19]}>
              <cylinderGeometry args={[0.045, 0.045, 0.08, 16]} />
              <meshStandardMaterial color="#E0E4ED" metalness={0.95} roughness={0.1} />
            </mesh>
          ))}
        </group>
      )}
    </group>
  );
}

/**
 * 3. Architecture 3D Visualization: Exploded Isometric Stack
 */
export function Architecture3DScene() {
  const groupRef = useRef<THREE.Group>(null);

  return (
    <div className="relative w-full h-[380px] sm:h-[460px] min-h-0 overflow-hidden bg-obsidian-elevated/70 border border-hairline-dark/60 chamfer-tr">
      <Canvas
        camera={{ position: [3.2, 2.8, 3.4], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <hemisphereLight args={["#FFFFFF", "#181B24", 1.4]} />
        <directionalLight position={[6, 9, 6]} intensity={2.8} color="#FFFFFF" />
        <directionalLight position={[-4, 7, -7]} intensity={3.6} color="#FFFFFF" />
        <directionalLight position={[-5, 2, 4]} intensity={1.5} color="#A8BEDD" />
        <directionalLight position={[0, -4, 3]} intensity={1.0} color="#FF6B35" />

        <Float speed={0.8} rotationIntensity={0.05} floatIntensity={0.05}>
          <group ref={groupRef} position={[0, -0.1, 0]}>
            {/* Layer 01: Core Engine Plate */}
            <mesh position={[0, -0.65, 0]}>
              <boxGeometry args={[2.0, 0.12, 2.0]} />
              <meshStandardMaterial color="#484E5C" metalness={0.75} roughness={0.26} />
            </mesh>
            {/* Layer 02: Spatial 3D Twin Plate */}
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[2.0, 0.12, 2.0]} />
              <meshStandardMaterial
                color="#FF3B00"
                emissive="#FF3B00"
                emissiveIntensity={0.5}
                metalness={0.7}
                roughness={0.28}
              />
            </mesh>
            {/* Layer 03: Cryptographic Vault Plate */}
            <mesh position={[0, 0.65, 0]}>
              <boxGeometry args={[2.0, 0.12, 2.0]} />
              <meshStandardMaterial color="#686E7E" metalness={0.85} roughness={0.2} />
            </mesh>

            {/* Connecting Bus Pillars */}
            {[
              [-0.8, -0.8],
              [0.8, -0.8],
              [-0.8, 0.8],
              [0.8, 0.8],
            ].map(([x, z], i) => (
              <mesh key={i} position={[x, 0, z]}>
                <cylinderGeometry args={[0.035, 0.035, 1.5, 12]} />
                <meshStandardMaterial color="#E0E4ED" metalness={0.95} roughness={0.1} />
              </mesh>
            ))}
          </group>
        </Float>

        <ContactShadows
          position={[0, -1.1, 0]}
          opacity={0.65}
          scale={5.5}
          blur={2.0}
          far={2.8}
          color="#050505"
        />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minPolarAngle={Math.PI / 4}
          maxPolarAngle={Math.PI / 1.9}
          autoRotate
          autoRotateSpeed={0.55}
        />
      </Canvas>
    </div>
  );
}
