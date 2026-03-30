import React, { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// Shared scroll state for all 3D creatures
const scrollState = { progress: 0 };

const useScrollSync = () => {
  useEffect(() => {
    const onScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      scrollState.progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
};

// ─── TROPICAL FISH (Surface: 0-25% scroll) ───
const TropicalFish = ({ startPos, speed, size, color, wobbleAmp, wobbleFreq, direction }) => {
  const groupRef = useRef();
  const tailRef = useRef();
  const timeOffset = useMemo(() => Math.random() * 100, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() + timeOffset;
    const g = groupRef.current;
    if (!g) return;
    g.position.x += speed * direction * 0.016;
    if (direction > 0 && g.position.x > 25) g.position.x = -25;
    if (direction < 0 && g.position.x < -25) g.position.x = 25;
    g.position.y = startPos[1] + Math.sin(t * wobbleFreq) * wobbleAmp;
    g.position.z = startPos[2] + Math.cos(t * wobbleFreq * 0.7) * wobbleAmp * 0.3;
    g.rotation.y = direction > 0 ? 0 : Math.PI;
    g.rotation.z = Math.sin(t * wobbleFreq) * 0.08;
    if (tailRef.current) tailRef.current.rotation.y = Math.sin(t * 10) * 0.5;

    // Fade based on depth zone
    const zone = scrollState.progress;
    const opacity = zone < 0.3 ? 1 : zone < 0.4 ? 1 - (zone - 0.3) / 0.1 : 0;
    g.visible = opacity > 0.01;
    g.scale.setScalar(size * opacity);
  });

  const col = new THREE.Color(color);
  const stripeCol = col.clone().multiplyScalar(0.5);

  return (
    <group ref={groupRef} position={startPos} scale={size}>
      {/* Round colorful body */}
      <mesh scale={[1.3, 1, 0.6]}>
        <sphereGeometry args={[1, 16, 12]} />
        <meshStandardMaterial color={col} roughness={0.3} metalness={0.5} emissive={col} emissiveIntensity={0.2} />
      </mesh>
      {/* Stripe */}
      <mesh position={[0, 0, 0]} scale={[1.32, 0.2, 0.62]}>
        <sphereGeometry args={[1, 12, 8]} />
        <meshStandardMaterial color={stripeCol} roughness={0.3} emissive={stripeCol} emissiveIntensity={0.1} />
      </mesh>
      {/* Eyes */}
      <mesh position={[0.9, 0.2, 0.35]}><sphereGeometry args={[0.15, 8, 8]} /><meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={0.3} /></mesh>
      <mesh position={[1.0, 0.2, 0.4]}><sphereGeometry args={[0.08, 8, 8]} /><meshStandardMaterial color="#000" /></mesh>
      <mesh position={[0.9, 0.2, -0.35]}><sphereGeometry args={[0.15, 8, 8]} /><meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={0.3} /></mesh>
      <mesh position={[1.0, 0.2, -0.4]}><sphereGeometry args={[0.08, 8, 8]} /><meshStandardMaterial color="#000" /></mesh>
      {/* Tall dorsal */}
      <mesh position={[0, 1, 0]} rotation={[0, 0, -0.2]} scale={[0.8, 0.8, 0.05]}>
        <coneGeometry args={[0.6, 1.5, 4]} />
        <meshStandardMaterial color={col} transparent opacity={0.8} emissive={col} emissiveIntensity={0.15} side={THREE.DoubleSide} />
      </mesh>
      {/* Tail */}
      <group ref={tailRef} position={[-1.2, 0, 0]}>
        <mesh position={[-0.5, 0.3, 0]} rotation={[0, 0, 0.5]} scale={[0.8, 0.4, 0.05]}>
          <coneGeometry args={[0.6, 1, 4]} />
          <meshStandardMaterial color={col} transparent opacity={0.85} emissive={col} emissiveIntensity={0.2} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[-0.5, -0.3, 0]} rotation={[0, 0, -0.5]} scale={[0.8, 0.4, 0.05]}>
          <coneGeometry args={[0.6, 1, 4]} />
          <meshStandardMaterial color={col} transparent opacity={0.85} emissive={col} emissiveIntensity={0.2} side={THREE.DoubleSide} />
        </mesh>
      </group>
    </group>
  );
};

// ─── JELLYFISH (Mid depth: 25-50% scroll) ───
const Jellyfish = ({ startPos, size, color, speed, direction }) => {
  const groupRef = useRef();
  const tentaclesRef = useRef([]);
  const timeOffset = useMemo(() => Math.random() * 100, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() + timeOffset;
    const g = groupRef.current;
    if (!g) return;

    g.position.x += speed * direction * 0.008;
    if (direction > 0 && g.position.x > 25) g.position.x = -25;
    if (direction < 0 && g.position.x < -25) g.position.x = 25;

    // Pulsing bob motion
    const pulse = Math.sin(t * 1.5) * 0.5;
    g.position.y = startPos[1] + Math.sin(t * 0.4) * 2 + pulse;
    g.scale.y = size * (1 + Math.sin(t * 1.5) * 0.1);
    g.scale.x = size * (1 - Math.sin(t * 1.5) * 0.05);
    g.scale.z = size * (1 - Math.sin(t * 1.5) * 0.05);

    const zone = scrollState.progress;
    const opacity = zone > 0.2 && zone < 0.55 ? Math.min((zone - 0.2) / 0.1, (0.55 - zone) / 0.1, 1) : 0;
    g.visible = opacity > 0.01;
  });

  const col = new THREE.Color(color);

  return (
    <group ref={groupRef} position={startPos} scale={size}>
      {/* Bell / dome */}
      <mesh>
        <sphereGeometry args={[1, 16, 16, 0, Math.PI * 2, 0, Math.PI * 0.6]} />
        <meshStandardMaterial color={col} transparent opacity={0.5} emissive={col} emissiveIntensity={0.4} side={THREE.DoubleSide} roughness={0.2} />
      </mesh>
      {/* Inner glow */}
      <mesh scale={0.85}>
        <sphereGeometry args={[1, 12, 12, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
        <meshStandardMaterial color="#ffffff" transparent opacity={0.15} emissive={col} emissiveIntensity={0.6} side={THREE.DoubleSide} />
      </mesh>
      {/* Tentacles */}
      {[0, 0.7, 1.4, 2.1, 2.8, 3.5, 4.2, 4.9, 5.6].map((angle, i) => (
        <mesh key={i} position={[Math.cos(angle) * 0.6, -1.2 - Math.random() * 0.5, Math.sin(angle) * 0.6]} scale={[0.04, 1.5 + Math.random(), 0.04]}>
          <cylinderGeometry args={[0.5, 0.1, 1, 4]} />
          <meshStandardMaterial color={col} transparent opacity={0.4} emissive={col} emissiveIntensity={0.3} />
        </mesh>
      ))}
    </group>
  );
};

// ─── STINGRAY (Mid-deep: 40-65% scroll) ───
const Stingray = ({ startPos, size, color, speed, direction }) => {
  const groupRef = useRef();
  const timeOffset = useMemo(() => Math.random() * 100, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() + timeOffset;
    const g = groupRef.current;
    if (!g) return;
    g.position.x += speed * direction * 0.012;
    if (direction > 0 && g.position.x > 28) g.position.x = -28;
    if (direction < 0 && g.position.x < -28) g.position.x = 28;
    g.position.y = startPos[1] + Math.sin(t * 0.5) * 1.5;
    g.rotation.y = direction > 0 ? -Math.PI / 2 : Math.PI / 2;
    // Wing flap
    g.rotation.z = Math.sin(t * 2) * 0.15;

    const zone = scrollState.progress;
    const opacity = zone > 0.35 && zone < 0.7 ? Math.min((zone - 0.35) / 0.1, (0.7 - zone) / 0.1, 1) : 0;
    g.visible = opacity > 0.01;
  });

  const col = new THREE.Color(color);

  return (
    <group ref={groupRef} position={startPos} scale={size}>
      {/* Flat wide body */}
      <mesh scale={[2.5, 0.15, 1.8]}>
        <sphereGeometry args={[1, 16, 8]} />
        <meshStandardMaterial color={col} roughness={0.4} metalness={0.3} emissive={col} emissiveIntensity={0.1} />
      </mesh>
      {/* Tail */}
      <mesh position={[-3, 0.1, 0]} rotation={[0, 0, 0.05]} scale={[2, 0.05, 0.05]}>
        <cylinderGeometry args={[0.3, 0.05, 1, 6]} />
        <meshStandardMaterial color={col} roughness={0.5} emissive={col} emissiveIntensity={0.1} />
      </mesh>
      {/* Eyes */}
      <mesh position={[0.8, 0.2, 0.6]}><sphereGeometry args={[0.12, 8, 8]} /><meshStandardMaterial color="#aaffaa" emissive="#aaffaa" emissiveIntensity={0.5} /></mesh>
      <mesh position={[0.8, 0.2, -0.6]}><sphereGeometry args={[0.12, 8, 8]} /><meshStandardMaterial color="#aaffaa" emissive="#aaffaa" emissiveIntensity={0.5} /></mesh>
    </group>
  );
};

// ─── SHARK (Deep: 55-80% scroll) ───
const Shark = ({ startPos, size, color, speed, direction }) => {
  const groupRef = useRef();
  const tailRef = useRef();
  const timeOffset = useMemo(() => Math.random() * 100, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() + timeOffset;
    const g = groupRef.current;
    if (!g) return;
    g.position.x += speed * direction * 0.014;
    if (direction > 0 && g.position.x > 30) g.position.x = -30;
    if (direction < 0 && g.position.x < -30) g.position.x = 30;
    g.position.y = startPos[1] + Math.sin(t * 0.3) * 1;
    g.rotation.y = direction > 0 ? 0 : Math.PI;
    g.rotation.z = Math.sin(t * 0.5) * 0.03;
    if (tailRef.current) tailRef.current.rotation.y = Math.sin(t * 4) * 0.25;

    const zone = scrollState.progress;
    const opacity = zone > 0.5 && zone < 0.85 ? Math.min((zone - 0.5) / 0.1, (0.85 - zone) / 0.1, 1) : 0;
    g.visible = opacity > 0.01;
  });

  const col = new THREE.Color(color);
  const belly = col.clone().lerp(new THREE.Color('#cccccc'), 0.6);

  return (
    <group ref={groupRef} position={startPos} scale={size}>
      {/* Torpedo body */}
      <mesh scale={[2.5, 0.8, 0.7]}>
        <sphereGeometry args={[1, 16, 12]} />
        <meshStandardMaterial color={col} roughness={0.4} metalness={0.3} emissive={col} emissiveIntensity={0.08} />
      </mesh>
      {/* Snout */}
      <mesh position={[2.2, 0, 0]} scale={[1, 0.5, 0.5]}>
        <coneGeometry args={[0.6, 1.5, 8]} />
        <meshStandardMaterial color={col} roughness={0.4} />
      </mesh>
      {/* Belly */}
      <mesh position={[0, -0.4, 0]} scale={[2.3, 0.4, 0.6]}>
        <sphereGeometry args={[1, 12, 8]} />
        <meshStandardMaterial color={belly} roughness={0.5} />
      </mesh>
      {/* Dorsal fin - iconic */}
      <mesh position={[0, 1.2, 0]} rotation={[0, 0, -0.15]} scale={[1.2, 1, 0.06]}>
        <coneGeometry args={[0.5, 1.8, 4]} />
        <meshStandardMaterial color={col} roughness={0.4} side={THREE.DoubleSide} />
      </mesh>
      {/* Pectoral fins */}
      <mesh position={[0.5, -0.5, 0.8]} rotation={[0.3, 0.2, 0.6]} scale={[1.2, 0.06, 0.6]}>
        <coneGeometry args={[0.5, 1.5, 4]} />
        <meshStandardMaterial color={col} roughness={0.4} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0.5, -0.5, -0.8]} rotation={[-0.3, -0.2, 0.6]} scale={[1.2, 0.06, 0.6]}>
        <coneGeometry args={[0.5, 1.5, 4]} />
        <meshStandardMaterial color={col} roughness={0.4} side={THREE.DoubleSide} />
      </mesh>
      {/* Eyes - menacing */}
      <mesh position={[1.5, 0.15, 0.45]}><sphereGeometry args={[0.12, 8, 8]} /><meshStandardMaterial color="#111" emissive="#333" emissiveIntensity={0.3} /></mesh>
      <mesh position={[1.5, 0.15, -0.45]}><sphereGeometry args={[0.12, 8, 8]} /><meshStandardMaterial color="#111" emissive="#333" emissiveIntensity={0.3} /></mesh>
      {/* Tail */}
      <group ref={tailRef} position={[-2.5, 0, 0]}>
        <mesh position={[-0.8, 0.6, 0]} rotation={[0, 0, 0.7]} scale={[0.8, 0.5, 0.04]}>
          <coneGeometry args={[0.6, 1.5, 4]} />
          <meshStandardMaterial color={col} roughness={0.4} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[-0.5, -0.3, 0]} rotation={[0, 0, -0.4]} scale={[0.6, 0.3, 0.04]}>
          <coneGeometry args={[0.5, 1, 4]} />
          <meshStandardMaterial color={col} roughness={0.4} side={THREE.DoubleSide} />
        </mesh>
      </group>
    </group>
  );
};

// ─── ANGLERFISH (Abyss: 75-100% scroll) ───
const Anglerfish = ({ startPos, size, color, speed, direction }) => {
  const groupRef = useRef();
  const lureRef = useRef();
  const timeOffset = useMemo(() => Math.random() * 100, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() + timeOffset;
    const g = groupRef.current;
    if (!g) return;
    g.position.x += speed * direction * 0.006;
    if (direction > 0 && g.position.x > 25) g.position.x = -25;
    if (direction < 0 && g.position.x < -25) g.position.x = 25;
    g.position.y = startPos[1] + Math.sin(t * 0.3) * 0.8;
    g.rotation.y = direction > 0 ? 0 : Math.PI;

    // Lure sway
    if (lureRef.current) {
      lureRef.current.rotation.z = Math.sin(t * 2) * 0.3;
    }

    const zone = scrollState.progress;
    const opacity = zone > 0.7 ? Math.min((zone - 0.7) / 0.1, 1) : 0;
    g.visible = opacity > 0.01;
  });

  const col = new THREE.Color(color);

  return (
    <group ref={groupRef} position={startPos} scale={size}>
      {/* Bulbous body */}
      <mesh scale={[1.2, 1.1, 0.9]}>
        <sphereGeometry args={[1, 16, 12]} />
        <meshStandardMaterial color={col} roughness={0.6} metalness={0.2} emissive={col} emissiveIntensity={0.05} />
      </mesh>
      {/* Huge mouth */}
      <mesh position={[1, -0.2, 0]} scale={[0.8, 0.6, 0.7]}>
        <sphereGeometry args={[1, 12, 8, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
        <meshStandardMaterial color="#0a0a0a" roughness={0.8} side={THREE.DoubleSide} />
      </mesh>
      {/* Teeth */}
      {[-0.3, -0.1, 0.1, 0.3].map((z, i) => (
        <mesh key={i} position={[1.5, 0.1, z]} rotation={[0, 0, 0.5]} scale={[0.08, 0.25, 0.08]}>
          <coneGeometry args={[0.5, 1, 4]} />
          <meshStandardMaterial color="#e8e8d0" emissive="#e8e8d0" emissiveIntensity={0.2} />
        </mesh>
      ))}
      {/* Bioluminescent lure */}
      <group ref={lureRef} position={[0.5, 1.5, 0]}>
        <mesh position={[0, 0, 0]} scale={[0.03, 1.2, 0.03]}>
          <cylinderGeometry args={[1, 1, 1, 4]} />
          <meshStandardMaterial color="#333" />
        </mesh>
        <mesh position={[0, 0.8, 0]}>
          <sphereGeometry args={[0.25, 12, 12]} />
          <meshStandardMaterial color="#22ff88" emissive="#22ff88" emissiveIntensity={2} transparent opacity={0.9} />
        </mesh>
        {/* Lure glow */}
        <pointLight position={[0, 0.8, 0]} color="#22ff88" intensity={2} distance={8} />
      </group>
      {/* Tiny evil eyes */}
      <mesh position={[0.8, 0.4, 0.5]}><sphereGeometry args={[0.12, 8, 8]} /><meshStandardMaterial color="#ff4444" emissive="#ff4444" emissiveIntensity={1} /></mesh>
      <mesh position={[0.8, 0.4, -0.5]}><sphereGeometry args={[0.12, 8, 8]} /><meshStandardMaterial color="#ff4444" emissive="#ff4444" emissiveIntensity={1} /></mesh>
      {/* Tail */}
      <mesh position={[-1.3, 0, 0]} scale={[0.6, 0.4, 0.3]}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshStandardMaterial color={col} roughness={0.6} />
      </mesh>
    </group>
  );
};

// ─── WHALE (Deep: 60-85%) ───
const Whale = ({ startPos, size, speed, direction }) => {
  const groupRef = useRef();
  const tailRef = useRef();
  const timeOffset = useMemo(() => Math.random() * 100, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() + timeOffset;
    const g = groupRef.current;
    if (!g) return;
    g.position.x += speed * direction * 0.005;
    if (direction > 0 && g.position.x > 35) g.position.x = -35;
    if (direction < 0 && g.position.x < -35) g.position.x = 35;
    g.position.y = startPos[1] + Math.sin(t * 0.2) * 1.5;
    g.rotation.y = direction > 0 ? 0 : Math.PI;
    if (tailRef.current) tailRef.current.rotation.y = Math.sin(t * 1.5) * 0.15;

    const zone = scrollState.progress;
    const opacity = zone > 0.55 && zone < 0.9 ? Math.min((zone - 0.55) / 0.1, (0.9 - zone) / 0.1, 1) : 0;
    g.visible = opacity > 0.01;
  });

  return (
    <group ref={groupRef} position={startPos} scale={size}>
      <mesh scale={[4, 1.5, 1.3]}>
        <sphereGeometry args={[1, 16, 12]} />
        <meshStandardMaterial color="#1e3a5f" roughness={0.5} metalness={0.2} emissive="#0a2040" emissiveIntensity={0.1} />
      </mesh>
      <mesh position={[0, -0.8, 0]} scale={[3.5, 0.8, 1.1]}>
        <sphereGeometry args={[1, 12, 8]} />
        <meshStandardMaterial color="#4a6fa5" roughness={0.5} />
      </mesh>
      {/* Eye */}
      <mesh position={[2.5, 0.3, 1]}><sphereGeometry args={[0.15, 8, 8]} /><meshStandardMaterial color="#222" /></mesh>
      <mesh position={[2.5, 0.3, -1]}><sphereGeometry args={[0.15, 8, 8]} /><meshStandardMaterial color="#222" /></mesh>
      <group ref={tailRef} position={[-4.5, 0, 0]}>
        <mesh position={[0, 0, 1]} rotation={[Math.PI / 2, 0, 0.3]} scale={[1.5, 0.08, 0.8]}>
          <coneGeometry args={[0.8, 2, 4]} />
          <meshStandardMaterial color="#1e3a5f" roughness={0.5} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0, 0, -1]} rotation={[-Math.PI / 2, 0, -0.3]} scale={[1.5, 0.08, 0.8]}>
          <coneGeometry args={[0.8, 2, 4]} />
          <meshStandardMaterial color="#1e3a5f" roughness={0.5} side={THREE.DoubleSide} />
        </mesh>
      </group>
    </group>
  );
};

// ─── Scene orchestrator ───
const OceanScene = () => {
  return (
    <>
      <ambientLight intensity={0.25} color="#1a6fa0" />
      <directionalLight position={[10, 15, 5]} intensity={0.4} color="#38bdf8" />
      <pointLight position={[-15, -10, -8]} intensity={0.2} color="#0ea5e9" />

      {/* SURFACE: Tropical fish (0-30% scroll) */}
      <TropicalFish startPos={[-15, 4, -5]} speed={2.0} size={0.5} color="#ff6b35" wobbleAmp={1.2} wobbleFreq={1.0} direction={1} />
      <TropicalFish startPos={[10, 6, -7]} speed={1.6} size={0.4} color="#ffd23f" wobbleAmp={1.5} wobbleFreq={0.8} direction={-1} />
      <TropicalFish startPos={[-5, 2, -4]} speed={2.3} size={0.55} color="#22d3ee" wobbleAmp={1.0} wobbleFreq={1.2} direction={1} />
      <TropicalFish startPos={[18, 5, -6]} speed={1.4} size={0.45} color="#f472b6" wobbleAmp={1.8} wobbleFreq={0.7} direction={-1} />
      <TropicalFish startPos={[0, 3, -8]} speed={1.9} size={0.35} color="#a3e635" wobbleAmp={1.3} wobbleFreq={0.9} direction={1} />

      {/* MID-DEPTH: Jellyfish (25-55% scroll) */}
      <Jellyfish startPos={[-8, 3, -6]} size={0.8} color="#c084fc" speed={0.8} direction={1} />
      <Jellyfish startPos={[12, -1, -5]} size={0.6} color="#f0abfc" speed={0.5} direction={-1} />
      <Jellyfish startPos={[3, 5, -8]} size={1.0} color="#818cf8" speed={0.6} direction={1} />

      {/* MID-DEEP: Stingrays (40-70% scroll) */}
      <Stingray startPos={[-12, -2, -5]} size={1.0} color="#64748b" speed={1.5} direction={1} />
      <Stingray startPos={[15, 1, -7]} size={0.8} color="#475569" speed={1.2} direction={-1} />

      {/* DEEP: Sharks (55-85% scroll) */}
      <Shark startPos={[-20, -1, -6]} size={1.2} color="#334155" speed={2.0} direction={1} />
      <Shark startPos={[22, 2, -8]} size={0.9} color="#475569" speed={1.5} direction={-1} />

      {/* DEEP: Whale (60-90% scroll) */}
      <Whale startPos={[-25, -3, -12]} size={0.7} speed={1.0} direction={1} />

      {/* ABYSS: Anglerfish (75-100% scroll) */}
      <Anglerfish startPos={[-10, -2, -5]} size={0.8} color="#1a1a2e" speed={0.8} direction={1} />
      <Anglerfish startPos={[14, 1, -6]} size={0.6} color="#16213e" speed={0.6} direction={-1} />
    </>
  );
};

const SwimmingFish3D = () => {
  useScrollSync();

  return (
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 5 }}>
      <Canvas
        camera={{ position: [0, 0, 20], fov: 60 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }}
        dpr={[1, 1.5]}
        style={{ background: 'transparent' }}
      >
        <OceanScene />
      </Canvas>
    </div>
  );
};

export default SwimmingFish3D;
