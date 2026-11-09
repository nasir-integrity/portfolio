"use client";

import React, { useEffect, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { ContactShadows, Float, Grid, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

function StudioLighting() {
  const { gl, scene } = useThree();

  useEffect(() => {
    const pmremGenerator = new THREE.PMREMGenerator(gl);
    pmremGenerator.compileEquirectangularShader();
    const roomEnv = new RoomEnvironment();
    const envTexture = pmremGenerator.fromScene(roomEnv).texture;
    scene.environment = envTexture;

    return () => {
      envTexture.dispose();
      pmremGenerator.dispose();
    };
  }, [gl, scene]);

  return null;
}

function IndustrialSeparatorTwin({
  scrollProgress = 0,
}: {
  scrollProgress?: number;
}) {
  const groupRef = useRef<THREE.Group>(null);
  const sensorRef1 = useRef<THREE.Mesh>(null);
  const sensorRef2 = useRef<THREE.Mesh>(null);
  const { viewport } = useThree();

  const isDesktop = viewport.width > 7;
  const baseScale = isDesktop ? 1.28 : 0.96;

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (sensorRef1.current) {
      const s = 1 + Math.sin(t * 3.8) * 0.24;
      sensorRef1.current.scale.set(s, s, s);
    }
    if (sensorRef2.current) {
      const s = 1 + Math.cos(t * 3.1) * 0.2;
      sensorRef2.current.scale.set(s, s, s);
    }
    if (groupRef.current && scrollProgress !== 0) {
      groupRef.current.rotation.y = scrollProgress * 0.65;
    }
  });

  return (
    <group
      ref={groupRef}
      position={[0, isDesktop ? -0.52 : -0.62, 0]}
      scale={baseScale}
    >
      {/* 1. Reinforced Concrete & Obsidian Skid Plinth */}
      <mesh position={[0, -0.15, 0]} receiveShadow>
        <boxGeometry args={[4.8, 0.22, 2.6]} />
        <meshStandardMaterial color="#141414" roughness={0.9} metalness={0.12} />
      </mesh>

      {/* Steel Skid I-Beams */}
      <mesh position={[0, -0.02, 1.1]}>
        <boxGeometry args={[4.7, 0.08, 0.12]} />
        <meshStandardMaterial color="#2A2A2A" roughness={0.38} metalness={0.85} />
      </mesh>
      <mesh position={[0, -0.02, -1.1]}>
        <boxGeometry args={[4.7, 0.08, 0.12]} />
        <meshStandardMaterial color="#2A2A2A" roughness={0.38} metalness={0.85} />
      </mesh>

      {/* Heavy Skid Corner Lifting Lugs (Vermillion Accent) */}
      {[
        [-2.25, 1.1],
        [2.25, 1.1],
        [-2.25, -1.1],
        [2.25, -1.1],
      ].map(([lx, lz], li) => (
        <group key={`lug-${li}`} position={[lx, 0.06, lz]}>
          <mesh>
            <boxGeometry args={[0.08, 0.12, 0.04]} />
            <meshStandardMaterial
              color="#FF3B00"
              roughness={0.3}
              metalness={0.65}
            />
          </mesh>
          <mesh position={[0, 0.03, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <torusGeometry args={[0.035, 0.012, 8, 16]} />
            <meshStandardMaterial
              color="#FF3B00"
              roughness={0.25}
              metalness={0.75}
            />
          </mesh>
        </group>
      ))}

      {/* 2. Heavy Welded Saddle Supports */}
      {[-0.85, 0.85].map((sx) => (
        <group key={`saddle-${sx}`} position={[sx, 0.25, 0]}>
          <mesh position={[0, -0.22, 0]}>
            <boxGeometry args={[0.38, 0.06, 1.4]} />
            <meshStandardMaterial
              color="#1F1F1F"
              roughness={0.5}
              metalness={0.75}
            />
          </mesh>
          <mesh position={[0, 0.05, 0]}>
            <boxGeometry args={[0.26, 0.5, 1.25]} />
            <meshStandardMaterial
              color="#181818"
              roughness={0.55}
              metalness={0.7}
            />
          </mesh>
          <mesh position={[0, 0.35, 0]} rotation={[0, 0, Math.PI / 2]}>
            <cylinderGeometry
              args={[0.67, 0.67, 0.28, 32, 1, false, 0, Math.PI]}
            />
            <meshStandardMaterial
              color="#2E2E2C"
              roughness={0.4}
              metalness={0.8}
            />
          </mesh>
        </group>
      ))}

      {/* 3. Main Horizontal Pressure Vessel Shell */}
      <mesh
        position={[0, 0.95, 0]}
        rotation={[0, 0, Math.PI / 2]}
        castShadow
        receiveShadow
      >
        <cylinderGeometry args={[0.62, 0.62, 2.7, 48]} />
        <meshStandardMaterial color="#222220" roughness={0.26} metalness={0.86} />
      </mesh>

      {/* ASME Dished Elliptical Heads */}
      <mesh
        position={[-1.35, 0.95, 0]}
        rotation={[0, 0, Math.PI / 2]}
        scale={[1, 0.45, 1]}
        castShadow
      >
        <sphereGeometry
          args={[0.62, 36, 24, 0, Math.PI * 2, 0, Math.PI / 2]}
        />
        <meshStandardMaterial color="#2B2B28" roughness={0.3} metalness={0.82} />
      </mesh>
      <mesh
        position={[1.35, 0.95, 0]}
        rotation={[0, 0, -Math.PI / 2]}
        scale={[1, 0.45, 1]}
        castShadow
      >
        <sphereGeometry
          args={[0.62, 36, 24, 0, Math.PI * 2, 0, Math.PI / 2]}
        />
        <meshStandardMaterial color="#2B2B28" roughness={0.3} metalness={0.82} />
      </mesh>

      {/* Circumferential Girth Welds */}
      {[-0.6, 0, 0.6].map((wx) => (
        <mesh
          key={`weld-${wx}`}
          position={[wx, 0.95, 0]}
          rotation={[0, 0, Math.PI / 2]}
        >
          <torusGeometry args={[0.625, 0.015, 8, 48]} />
          <meshStandardMaterial
            color="#52524E"
            roughness={0.32}
            metalness={0.88}
          />
        </mesh>
      ))}

      {/* ASME Vessel Code Nameplate */}
      <mesh position={[0, 0.95, 0.625]}>
        <boxGeometry args={[0.24, 0.14, 0.012]} />
        <meshStandardMaterial color="#FF3B00" roughness={0.25} metalness={0.8} />
      </mesh>

      {/* 4. Bolted Front Manway Hatch (Left Head Apex) */}
      <group position={[-1.63, 0.95, 0]} rotation={[0, 0, Math.PI / 2]}>
        <mesh position={[0, -0.04, 0]}>
          <cylinderGeometry args={[0.22, 0.22, 0.08, 24]} />
          <meshStandardMaterial color="#3A3A36" roughness={0.3} metalness={0.85} />
        </mesh>
        <mesh position={[0, 0.02, 0]}>
          <cylinderGeometry args={[0.26, 0.26, 0.03, 24]} />
          <meshStandardMaterial color="#F4F4F0" roughness={0.22} metalness={0.9} />
        </mesh>
        <mesh position={[0, 0.04, 0]}>
          <cylinderGeometry args={[0.23, 0.23, 0.02, 24]} />
          <meshStandardMaterial color="#222220" roughness={0.3} metalness={0.85} />
        </mesh>
        {[...Array(8)].map((_, i) => {
          const angle = (i / 8) * Math.PI * 2;
          return (
            <mesh
              key={`stud-${i}`}
              position={[Math.cos(angle) * 0.2, 0.055, Math.sin(angle) * 0.2]}
            >
              <cylinderGeometry args={[0.016, 0.016, 0.025, 8]} />
              <meshStandardMaterial
                color="#F4F4F0"
                roughness={0.15}
                metalness={0.95}
              />
            </mesh>
          );
        })}
      </group>

      {/* 5. Inlet Manifold & Gas Control Valve Assembly */}
      <group position={[-0.75, 0.95, 0]}>
        <mesh position={[0, 0.72, 0.35]}>
          <cylinderGeometry args={[0.11, 0.11, 0.45, 24]} />
          <meshStandardMaterial color="#333330" roughness={0.35} metalness={0.8} />
        </mesh>
        <mesh position={[0, 0.96, 0.35]}>
          <cylinderGeometry args={[0.19, 0.19, 0.05, 24]} />
          <meshStandardMaterial color="#F4F4F0" roughness={0.25} metalness={0.88} />
        </mesh>
        <mesh position={[0, 1.15, 0.35]}>
          <boxGeometry args={[0.28, 0.26, 0.28]} />
          <meshStandardMaterial color="#FF3B00" roughness={0.28} metalness={0.65} />
        </mesh>
        <mesh position={[0, 1.34, 0.35]}>
          <cylinderGeometry args={[0.04, 0.04, 0.16, 16]} />
          <meshStandardMaterial color="#52524E" roughness={0.2} metalness={0.9} />
        </mesh>
        <group position={[0, 1.44, 0.35]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh>
            <torusGeometry args={[0.16, 0.024, 12, 32]} />
            <meshStandardMaterial
              color="#F4F4F0"
              roughness={0.25}
              metalness={0.75}
            />
          </mesh>
          {[0, Math.PI / 2].map((rot, ri) => (
            <mesh key={`spoke-${ri}`} rotation={[0, 0, rot]}>
              <boxGeometry args={[0.32, 0.02, 0.02]} />
              <meshStandardMaterial
                color="#F4F4F0"
                roughness={0.3}
                metalness={0.75}
              />
            </mesh>
          ))}
        </group>
      </group>

      {/* 6. Top Gas Outlet Demister Nozzle */}
      <group position={[0.75, 0.95, -0.15]}>
        <mesh position={[0, 0.72, 0]}>
          <cylinderGeometry args={[0.12, 0.12, 0.45, 24]} />
          <meshStandardMaterial color="#333330" roughness={0.35} metalness={0.8} />
        </mesh>
        <mesh position={[0, 0.96, 0]}>
          <cylinderGeometry args={[0.2, 0.2, 0.05, 24]} />
          <meshStandardMaterial color="#F4F4F0" roughness={0.25} metalness={0.88} />
        </mesh>
        <mesh position={[0, 1.25, 0]}>
          <cylinderGeometry args={[0.1, 0.1, 0.55, 24]} />
          <meshStandardMaterial color="#333330" roughness={0.35} metalness={0.8} />
        </mesh>
      </group>

      {/* 7. Pressure Safety Relief Valve (PSV) in Vermillion */}
      <group position={[0.1, 1.58, 0]}>
        <mesh>
          <cylinderGeometry args={[0.07, 0.07, 0.25, 20]} />
          <meshStandardMaterial color="#3A3A36" roughness={0.3} metalness={0.8} />
        </mesh>
        <mesh position={[0, 0.2, 0]}>
          <boxGeometry args={[0.18, 0.2, 0.18]} />
          <meshStandardMaterial color="#FF3B00" roughness={0.28} metalness={0.75} />
        </mesh>
        <mesh position={[0.1, 0.52, 0]}>
          <cylinderGeometry args={[0.06, 0.06, 0.55, 20]} />
          <meshStandardMaterial color="#FF3B00" roughness={0.32} metalness={0.7} />
        </mesh>
      </group>

      {/* 8. Level Bridle & Sight Glass Telemetry Column */}
      <group position={[0.25, 0.95, 0.68]}>
        <mesh position={[0, 0.35, -0.06]}>
          <boxGeometry args={[0.06, 0.06, 0.14]} />
          <meshStandardMaterial color="#52524E" roughness={0.3} metalness={0.8} />
        </mesh>
        <mesh position={[0, -0.35, -0.06]}>
          <boxGeometry args={[0.06, 0.06, 0.14]} />
          <meshStandardMaterial color="#52524E" roughness={0.3} metalness={0.8} />
        </mesh>
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.035, 0.035, 0.85, 16]} />
          <meshStandardMaterial color="#F4F4F0" roughness={0.12} metalness={0.2} />
        </mesh>
        <mesh position={[0, -0.05, 0.02]}>
          <cylinderGeometry args={[0.022, 0.022, 0.55, 16]} />
          <meshPhysicalMaterial
            color="#FF3B00"
            roughness={0.05}
            metalness={0.1}
            transmission={0.8}
            transparent
            opacity={0.88}
          />
        </mesh>
      </group>

      {/* 9. Bottom Water Sump / Boot */}
      <group position={[-0.35, 0.18, 0]}>
        <mesh>
          <cylinderGeometry args={[0.22, 0.22, 0.45, 24]} />
          <meshStandardMaterial color="#242422" roughness={0.35} metalness={0.75} />
        </mesh>
        <mesh position={[0, -0.25, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.15, 16]} />
          <meshStandardMaterial color="#52524E" roughness={0.3} metalness={0.8} />
        </mesh>
        <mesh position={[0, -0.34, 0]}>
          <cylinderGeometry args={[0.15, 0.15, 0.04, 16]} />
          <meshStandardMaterial color="#F4F4F0" roughness={0.25} metalness={0.88} />
        </mesh>
      </group>

      {/* 10. Optical Methane Sensor Transmitter Beacon (Vermillion Pulse) */}
      <group position={[-0.75, 2.52, 0.35]}>
        <mesh>
          <cylinderGeometry args={[0.11, 0.11, 0.18, 20]} />
          <meshStandardMaterial color="#181818" roughness={0.4} metalness={0.65} />
        </mesh>
        <mesh position={[0, 0, 0.095]} rotation={[Math.PI / 2, 0, 0]}>
          <circleGeometry args={[0.085, 20]} />
          <meshBasicMaterial color="#0D0D0D" />
        </mesh>
        <mesh ref={sensorRef1} position={[0, 0.15, 0]}>
          <octahedronGeometry args={[0.095, 0]} />
          <meshStandardMaterial
            color="#FF3B00"
            emissive="#FF3B00"
            emissiveIntensity={1.6}
          />
        </mesh>
      </group>

      {/* Sensor Beacon 2: Differential Pressure Transducer (Off-White Pulse) */}
      <group position={[0.75, 2.55, -0.15]}>
        <mesh ref={sensorRef2}>
          <octahedronGeometry args={[0.085, 0]} />
          <meshStandardMaterial
            color="#F4F4F0"
            emissive="#F4F4F0"
            emissiveIntensity={1.2}
          />
        </mesh>
      </group>
    </group>
  );
}

export interface FacilityHeroSceneProps {
  className?: string;
  scrollProgress?: number;
}

export default function FacilityHeroScene({
  className = "w-full h-full",
  scrollProgress = 0,
}: FacilityHeroSceneProps) {
  return (
    <div className={`relative ${className} min-h-0 overflow-hidden`}>
      <Canvas
        camera={{ position: [3.6, 2.15, 4.0], fov: 38 }}
        gl={{
          antialias: true,
          powerPreference: "high-performance",
          toneMapping: THREE.ACESFilmicToneMapping,
          toneMappingExposure: 1.22,
        }}
        dpr={[1, 1.5]}
        shadows
      >
        <StudioLighting />

        <ambientLight intensity={0.42} />
        <directionalLight
          position={[6, 9, 6]}
          intensity={1.85}
          color="#F4F4F0"
          castShadow
          shadow-mapSize={[1024, 1024]}
        />
        <directionalLight position={[-6, 4, -5]} intensity={0.75} color="#FF3B00" />
        <pointLight
          position={[-0.75, 2.5, 0.4]}
          intensity={1.8}
          color="#FF3B00"
          distance={3.8}
        />
        <pointLight
          position={[0.75, 2.5, -0.2]}
          intensity={1.3}
          color="#F4F4F0"
          distance={3.5}
        />

        <Float speed={0.75} rotationIntensity={0.025} floatIntensity={0.04}>
          <IndustrialSeparatorTwin scrollProgress={scrollProgress} />
        </Float>

        <Grid
          position={[0, -0.66, 0]}
          args={[18, 18]}
          cellSize={0.4}
          cellThickness={0.8}
          cellColor="#1F1F1F"
          sectionSize={2.0}
          sectionThickness={1.2}
          sectionColor="#FF3B00"
          fadeDistance={9.5}
          fadeStrength={1.3}
        />
        <ContactShadows
          position={[0, -0.65, 0]}
          opacity={0.7}
          scale={10}
          blur={2.2}
          far={3.5}
          color="#050505"
        />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          minDistance={2.6}
          maxDistance={8.0}
          minPolarAngle={Math.PI / 6}
          maxPolarAngle={Math.PI / 2.05}
          autoRotate
          autoRotateSpeed={0.55}
        />
      </Canvas>
    </div>
  );
}
