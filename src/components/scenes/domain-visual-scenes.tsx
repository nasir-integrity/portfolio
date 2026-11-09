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
        <ambientLight intensity={0.65} />
        <directionalLight position={[5, 8, 5]} intensity={1.8} color="#F4F4F0" />
        <directionalLight position={[-4, 2, -4]} intensity={0.8} color="#FF3B00" />

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
      {/* Cylindrical Pressure Shell Cutaway */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.7, 0.7, 2.2, 32, 1, true, 0, Math.PI * 1.65]} />
        <meshStandardMaterial
          color="#222222"
          metalness={0.85}
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
          emissiveIntensity={0.4}
          roughness={0.4}
          metalness={0.6}
        />
      </mesh>

      {/* Ultrasonic Scanning Rings */}
      {[-0.6, 0, 0.6].map((x, i) => (
        <mesh key={i} position={[x, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.74, 0.02, 16, 32]} />
          <meshStandardMaterial color="#F4F4F0" metalness={0.9} roughness={0.1} />
        </mesh>
      ))}

      {/* Pulsing Stress Field */}
      <mesh ref={ringRef} rotation={[0, 0, Math.PI / 2]}>
        <torusGeometry args={[0.82, 0.015, 8, 32]} />
        <meshStandardMaterial
          color="#FF3B00"
          emissive="#FF3B00"
          emissiveIntensity={0.8}
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
      {/* Flanged Joint Base */}
      <mesh position={[0, -0.4, 0]}>
        <cylinderGeometry args={[0.75, 0.75, 0.16, 24]} />
        <meshStandardMaterial color="#333333" metalness={0.9} roughness={0.25} />
      </mesh>
      <mesh position={[0, -0.22, 0]}>
        <cylinderGeometry args={[0.75, 0.75, 0.16, 24]} />
        <meshStandardMaterial color="#333333" metalness={0.9} roughness={0.25} />
      </mesh>

      {/* High-Precision Gasket Core */}
      <mesh position={[0, -0.31, 0]}>
        <cylinderGeometry args={[0.62, 0.62, 0.04, 24]} />
        <meshStandardMaterial color="#FF3B00" emissive="#FF3B00" emissiveIntensity={0.6} />
      </mesh>

      {/* Stack Pipe */}
      <mesh position={[0, 0.35, 0]}>
        <cylinderGeometry args={[0.38, 0.38, 1.0, 24, 1, true]} />
        <meshStandardMaterial color="#222222" metalness={0.8} roughness={0.3} side={THREE.DoubleSide} />
      </mesh>

      {/* Atmospheric Mass Flow Containment Rings */}
      {[0.5, 0.78, 1.05].map((y, idx) => (
        <mesh key={idx} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.42 + idx * 0.14, 0.016, 12, 32]} />
          <meshStandardMaterial
            color={idx === 1 ? "#FF3B00" : "#F4F4F0"}
            emissive={idx === 1 ? "#FF3B00" : "#000000"}
            emissiveIntensity={idx === 1 ? 0.7 : 0}
            metalness={0.7}
          />
        </mesh>
      ))}
    </group>
  );
}

/**
 * 2. Pipeline Scrollytelling 3D Visualization: 6-Stage Industrial Transformations
 */
export function PipelineStage3DScene({ stepIndex }: { stepIndex: number }) {
  return (
    <div className="relative w-full h-[380px] sm:h-[480px] lg:h-[520px] min-h-0 overflow-hidden bg-obsidian border border-hairline-dark chamfer-tr shadow-2xl">
      <Canvas
        camera={{ position: [3.4, 2.2, 3.8], fov: 40 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.6} />
        <directionalLight position={[6, 9, 6]} intensity={1.8} color="#F4F4F0" />
        <directionalLight position={[-5, 3, -5]} intensity={0.9} color="#FF3B00" />

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
          <mesh rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry args={[0.75, 0.75, 2.4, 32]} />
            <meshStandardMaterial color="#1C1C1C" metalness={0.88} roughness={0.25} wireframe={false} />
          </mesh>
          <mesh rotation={[0, 0, Math.PI / 2]} position={[0, 0, 0]}>
            <cylinderGeometry args={[0.76, 0.76, 2.42, 16]} />
            <meshStandardMaterial color="#FF3B00" wireframe={true} />
          </mesh>
          {[-1.0, 1.0].map((x, i) => (
            <mesh key={i} position={[x, 0, 0]} rotation={[0, 0, Math.PI / 2]}>
              <sphereGeometry args={[0.75, 24, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
              <meshStandardMaterial color="#333333" metalness={0.85} roughness={0.3} />
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
                  <boxGeometry args={[0.32, 0.32, 0.32]} />
                  <meshStandardMaterial
                    color={isQuarantine ? "#FF3B00" : "#F4F4F0"}
                    emissive={isQuarantine ? "#FF3B00" : "#000000"}
                    emissiveIntensity={isQuarantine ? 0.85 : 0}
                    metalness={0.8}
                    roughness={0.2}
                  />
                </mesh>
              );
            })
          )}
          <mesh position={[0.8, 0.5, 0]}>
            <ringGeometry args={[0.24, 0.3, 32]} />
            <meshBasicMaterial color="#FF3B00" side={THREE.DoubleSide} />
          </mesh>
        </group>
      )}

      {/* STAGE 03: Structural Triage (Tri-Axial Stress Core) */}
      {stepIndex === 2 && (
        <group>
          <mesh>
            <octahedronGeometry args={[0.9, 0]} />
            <meshStandardMaterial color="#FF3B00" emissive="#FF3B00" emissiveIntensity={0.5} roughness={0.3} metalness={0.7} />
          </mesh>
          <mesh rotation={[Math.PI / 4, Math.PI / 4, 0]}>
            <octahedronGeometry args={[1.15, 0]} />
            <meshStandardMaterial color="#F4F4F0" wireframe={true} />
          </mesh>
        </group>
      )}

      {/* STAGE 04: Plume Accounting (Non-Overlapping Mass Intervals) */}
      {stepIndex === 3 && (
        <group>
          {[-0.8, 0, 0.8].map((y, i) => (
            <mesh key={i} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[0.5 + i * 0.25, 0.05, 16, 32]} />
              <meshStandardMaterial
                color={i === 1 ? "#FF3B00" : "#F4F4F0"}
                metalness={0.9}
                roughness={0.2}
              />
            </mesh>
          ))}
          <mesh position={[0, 0, 0]}>
            <cylinderGeometry args={[0.2, 0.2, 2.0, 24]} />
            <meshStandardMaterial color="#262626" metalness={0.8} roughness={0.4} />
          </mesh>
        </group>
      )}

      {/* STAGE 05: Field Dispatch (Actuated Valve Mechanism) */}
      {stepIndex === 4 && (
        <group position={[0, -0.3, 0]}>
          <mesh position={[0, 0.2, 0]}>
            <boxGeometry args={[0.7, 0.7, 0.7]} />
            <meshStandardMaterial color="#222222" metalness={0.85} roughness={0.25} />
          </mesh>
          <mesh position={[0, 0.85, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.42, 0.06, 12, 24]} />
            <meshStandardMaterial color="#FF3B00" emissive="#FF3B00" emissiveIntensity={0.5} roughness={0.3} />
          </mesh>
          <mesh position={[0, 0.6, 0]}>
            <cylinderGeometry args={[0.1, 0.1, 0.5, 16]} />
            <meshStandardMaterial color="#F4F4F0" metalness={0.9} roughness={0.2} />
          </mesh>
        </group>
      )}

      {/* STAGE 06: Sealed Proof (Monolithic Cryptographic Vault) */}
      {stepIndex === 5 && (
        <group>
          <mesh>
            <boxGeometry args={[1.3, 1.7, 0.35]} />
            <meshStandardMaterial color="#161616" metalness={0.92} roughness={0.18} />
          </mesh>
          <mesh position={[0, 0, 0.2]}>
            <ringGeometry args={[0.28, 0.36, 32]} />
            <meshStandardMaterial color="#FF3B00" emissive="#FF3B00" emissiveIntensity={0.8} side={THREE.DoubleSide} />
          </mesh>
          <mesh position={[0, 0, -0.2]}>
            <ringGeometry args={[0.28, 0.36, 32]} />
            <meshStandardMaterial color="#FF3B00" emissive="#FF3B00" emissiveIntensity={0.8} side={THREE.DoubleSide} />
          </mesh>
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
        <ambientLight intensity={0.7} />
        <directionalLight position={[6, 9, 6]} intensity={1.8} color="#F4F4F0" />
        <directionalLight position={[-4, 2, -4]} intensity={0.8} color="#FF3B00" />

        <Float speed={0.8} rotationIntensity={0.05} floatIntensity={0.05}>
          <group ref={groupRef} position={[0, -0.1, 0]}>
            {/* Layer 01: Core Engine Plate */}
            <mesh position={[0, -0.65, 0]}>
              <boxGeometry args={[2.0, 0.12, 2.0]} />
              <meshStandardMaterial color="#1C1C1C" metalness={0.85} roughness={0.3} />
            </mesh>
            {/* Layer 02: Spatial 3D Twin Plate */}
            <mesh position={[0, 0, 0]}>
              <boxGeometry args={[2.0, 0.12, 2.0]} />
              <meshStandardMaterial color="#FF3B00" emissive="#FF3B00" emissiveIntensity={0.4} metalness={0.7} roughness={0.3} />
            </mesh>
            {/* Layer 03: Cryptographic Vault Plate */}
            <mesh position={[0, 0.65, 0]}>
              <boxGeometry args={[2.0, 0.12, 2.0]} />
              <meshStandardMaterial color="#2E2E2E" metalness={0.9} roughness={0.2} />
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
                <meshStandardMaterial color="#F4F4F0" metalness={0.95} roughness={0.1} />
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
