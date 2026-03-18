import { Canvas, useFrame } from '@react-three/fiber';
import { useRef, useMemo, useState, useEffect } from 'react';
import * as THREE from 'three';

/* ═══════════════════════════════════════════════════════════════
   SWIMMING WRAPPER — handles path, direction, bobbing
   ═══════════════════════════════════════════════════════════════ */
const SwimmingCreature = ({ children, startX, startY, startZ = 0, speed = 1, direction = 1, range = 14 }) => {
  const ref = useRef();
  const offset = useRef(Math.random() * 100);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.elapsedTime + offset.current;
    ref.current.position.x += direction * speed * 0.012;
    if (direction > 0 && ref.current.position.x > range) ref.current.position.x = -range;
    if (direction < 0 && ref.current.position.x < -range) ref.current.position.x = range;
    ref.current.position.y = startY + Math.sin(t * speed * 0.5) * 0.4;
    ref.current.position.z = startZ + Math.sin(t * speed * 0.3) * 0.3;
  });

  return (
    <group ref={ref} position={[startX, startY, startZ]} scale={[direction, 1, 1]}>
      {children}
    </group>
  );
};

/* ═══════════════════════════════════════════════════════════════
   ARTICULATED FISH — segmented body with cascading undulation
   ═══════════════════════════════════════════════════════════════ */
const ArticulatedFish = ({
  bodyColor = '#0EA5E9', size = 0.5, speed = 1, segments = 5,
  bodyShape = [1, 0.55, 0.35], tailSize = 0.55, opacity = 0.9,
  emissive = null, emissiveIntensity = 0, metalness = 0.4, roughness = 0.35,
  hasStripes = false, stripeColor = '#ffffff',
}) => {
  const segRefs = useRef([]);
  const tailRef = useRef();
  const finLRef = useRef();
  const finRRef = useRef();
  const dorsalRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.elapsedTime * speed;
    segRefs.current.forEach((ref, i) => {
      if (!ref) return;
      const amp = 0.025 + (i / segments) * 0.14;
      ref.rotation.y = Math.sin(t * 4.5 + i * 0.7) * amp;
    });
    if (tailRef.current) tailRef.current.rotation.y = Math.sin(t * 4.5 + segments * 0.7) * 0.4;
    if (finLRef.current) finLRef.current.rotation.z = Math.sin(t * 3) * 0.2 - 0.4;
    if (finRRef.current) finRRef.current.rotation.z = -Math.sin(t * 3) * 0.2 + 0.4;
    if (dorsalRef.current) dorsalRef.current.rotation.z = Math.sin(t * 2) * 0.08;
  });

  const mat = useMemo(() => ({
    color: bodyColor, roughness, metalness,
    transparent: opacity < 1, opacity,
    ...(emissive ? { emissive, emissiveIntensity } : {}),
    side: THREE.DoubleSide,
  }), [bodyColor, roughness, metalness, opacity, emissive, emissiveIntensity]);

  const renderSeg = (idx) => {
    if (idx >= segments) {
      return (
        <group ref={tailRef} position={[-size * 0.25, 0, 0]}>
          <mesh rotation={[Math.PI / 2, 0, 0]}>
            <coneGeometry args={[size * tailSize, size * tailSize * 1.3, 4, 1]} />
            <meshStandardMaterial {...mat} />
          </mesh>
        </group>
      );
    }
    const t = idx / Math.max(segments - 1, 1);
    const taper = 1 - t * 0.55;
    const sx = size * bodyShape[0] * taper;
    const sy = size * bodyShape[1] * taper;
    const sz = size * bodyShape[2] * taper;
    return (
      <group ref={el => segRefs.current[idx] = el} position={idx === 0 ? [0, 0, 0] : [-size * 0.2, 0, 0]}>
        <mesh scale={[sx, sy, sz]}>
          <sphereGeometry args={[1, 10, 8]} />
          <meshStandardMaterial {...mat} />
        </mesh>
        {/* Stripes */}
        {hasStripes && idx > 0 && idx < segments - 1 && (
          <mesh scale={[sx * 0.3, sy * 1.05, sz * 1.05]}>
            <sphereGeometry args={[1, 8, 6]} />
            <meshStandardMaterial color={stripeColor} transparent opacity={0.6} />
          </mesh>
        )}
        {/* Dorsal fin */}
        {idx === 1 && (
          <mesh ref={dorsalRef} position={[0, sy * 1.2, 0]} rotation={[0, 0, -0.15]}>
            <coneGeometry args={[size * 0.12, size * 0.5, 3]} />
            <meshStandardMaterial {...mat} />
          </mesh>
        )}
        {/* Pectoral fins + eyes on head */}
        {idx === 0 && (
          <>
            <mesh ref={finLRef} position={[-sx * 0.1, -sy * 0.3, sz * 0.9]} rotation={[0.6, 0, -0.3]}>
              <coneGeometry args={[size * 0.1, size * 0.35, 3]} />
              <meshStandardMaterial {...mat} />
            </mesh>
            <mesh ref={finRRef} position={[-sx * 0.1, -sy * 0.3, -sz * 0.9]} rotation={[-0.6, 0, -0.3]}>
              <coneGeometry args={[size * 0.1, size * 0.35, 3]} />
              <meshStandardMaterial {...mat} />
            </mesh>
            <mesh position={[sx * 0.7, sy * 0.25, sz * 0.65]}>
              <sphereGeometry args={[size * 0.09, 8, 8]} />
              <meshBasicMaterial color="white" />
            </mesh>
            <mesh position={[sx * 0.7, sy * 0.25, -sz * 0.65]}>
              <sphereGeometry args={[size * 0.09, 8, 8]} />
              <meshBasicMaterial color="white" />
            </mesh>
            <mesh position={[sx * 0.78, sy * 0.25, sz * 0.7]}>
              <sphereGeometry args={[size * 0.045, 6, 6]} />
              <meshBasicMaterial color="#111" />
            </mesh>
            <mesh position={[sx * 0.78, sy * 0.25, -sz * 0.7]}>
              <sphereGeometry args={[size * 0.045, 6, 6]} />
              <meshBasicMaterial color="#111" />
            </mesh>
          </>
        )}
        {renderSeg(idx + 1)}
      </group>
    );
  };

  return <group>{renderSeg(0)}</group>;
};

/* ═══════════════════════════════════════════════════════════════
   JELLYFISH — dome + tentacles with pulsing animation
   ═══════════════════════════════════════════════════════════════ */
const Jellyfish = ({ color = '#a855f7', size = 0.6, speed = 0.8, glowColor = '#c084fc', opacity = 0.5 }) => {
  const domeRef = useRef();
  const tentacleRefs = useRef([]);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime * speed;
    if (domeRef.current) {
      domeRef.current.scale.y = 0.6 + Math.sin(t * 2) * 0.15;
      domeRef.current.scale.x = 1 + Math.sin(t * 2 + Math.PI) * 0.08;
      domeRef.current.scale.z = 1 + Math.sin(t * 2 + Math.PI) * 0.08;
    }
    tentacleRefs.current.forEach((ref, i) => {
      if (!ref) return;
      ref.rotation.x = Math.sin(t * 1.5 + i * 1.2) * 0.3;
      ref.rotation.z = Math.sin(t * 1.2 + i * 0.8) * 0.15;
    });
  });

  const tentacles = useMemo(() => {
    const arr = [];
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2;
      const r = size * 0.5;
      arr.push({ x: Math.cos(angle) * r, z: Math.sin(angle) * r, len: size * (1.2 + Math.random() * 0.8) });
    }
    return arr;
  }, [size]);

  return (
    <group>
      {/* Dome */}
      <mesh ref={domeRef}>
        <sphereGeometry args={[size, 16, 12, 0, Math.PI * 2, 0, Math.PI * 0.6]} />
        <meshStandardMaterial
          color={color} transparent opacity={opacity}
          emissive={glowColor} emissiveIntensity={0.6}
          side={THREE.DoubleSide} roughness={0.2} metalness={0.1}
        />
      </mesh>
      {/* Inner glow */}
      <mesh>
        <sphereGeometry args={[size * 0.7, 10, 8, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
        <meshBasicMaterial color={glowColor} transparent opacity={0.2} side={THREE.BackSide} />
      </mesh>
      {/* Tentacles */}
      {tentacles.map((t, i) => (
        <group key={i} ref={el => tentacleRefs.current[i] = el} position={[t.x, -size * 0.2, t.z]}>
          <mesh>
            <cylinderGeometry args={[size * 0.02, size * 0.01, t.len, 4]} />
            <meshStandardMaterial
              color={color} transparent opacity={opacity * 0.7}
              emissive={glowColor} emissiveIntensity={0.3}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
};

/* ═══════════════════════════════════════════════════════════════
   ANGLERFISH — bulbous body + bioluminescent lure
   ═══════════════════════════════════════════════════════════════ */
const AnglerFish = ({ size = 0.8, speed = 0.6 }) => {
  const lureRef = useRef();
  const jawRef = useRef();
  const bodyRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.elapsedTime * speed;
    if (lureRef.current) {
      lureRef.current.rotation.z = Math.sin(t * 2) * 0.3;
      lureRef.current.children.forEach(c => {
        if (c.material?.emissiveIntensity !== undefined) {
          c.material.emissiveIntensity = 1.5 + Math.sin(t * 4) * 1;
        }
      });
    }
    if (jawRef.current) jawRef.current.rotation.x = Math.sin(t * 1.5) * 0.1 + 0.15;
    if (bodyRef.current) bodyRef.current.rotation.y = Math.sin(t * 3) * 0.04;
  });

  return (
    <group ref={bodyRef}>
      {/* Bulbous body */}
      <mesh scale={[size * 1.2, size, size * 0.9]}>
        <sphereGeometry args={[1, 12, 10]} />
        <meshStandardMaterial color="#1a1a2e" roughness={0.8} metalness={0.2} />
      </mesh>
      {/* Lower jaw */}
      <group ref={jawRef} position={[size * 0.8, -size * 0.3, 0]}>
        <mesh scale={[size * 0.5, size * 0.15, size * 0.4]}>
          <sphereGeometry args={[1, 8, 6]} />
          <meshStandardMaterial color="#12122a" roughness={0.9} />
        </mesh>
        {/* Teeth */}
        {[-0.2, 0, 0.2].map((z, i) => (
          <mesh key={i} position={[size * 0.4, size * 0.1, z * size]} rotation={[0, 0, -0.5]}>
            <coneGeometry args={[size * 0.03, size * 0.15, 3]} />
            <meshStandardMaterial color="#c8c8d0" />
          </mesh>
        ))}
      </group>
      {/* Lure stalk */}
      <group ref={lureRef} position={[size * 0.5, size * 0.9, 0]}>
        <mesh>
          <cylinderGeometry args={[size * 0.02, size * 0.015, size * 1.2, 4]} />
          <meshStandardMaterial color="#2a2a4e" />
        </mesh>
        {/* Lure light */}
        <mesh position={[0, size * 0.65, 0]}>
          <sphereGeometry args={[size * 0.12, 8, 8]} />
          <meshStandardMaterial
            color="#00ff88" emissive="#00ff88" emissiveIntensity={2}
            transparent opacity={0.9}
          />
        </mesh>
        {/* Point light from lure */}
        <pointLight position={[0, size * 0.65, 0]} color="#00ff88" intensity={2} distance={5} />
      </group>
      {/* Eye */}
      <mesh position={[size * 0.9, size * 0.3, size * 0.5]}>
        <sphereGeometry args={[size * 0.12, 8, 8]} />
        <meshBasicMaterial color="#ffff00" />
      </mesh>
      <mesh position={[size * 0.9, size * 0.3, -size * 0.5]}>
        <sphereGeometry args={[size * 0.12, 8, 8]} />
        <meshBasicMaterial color="#ffff00" />
      </mesh>
      {/* Tail */}
      <mesh position={[-size * 1.3, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <coneGeometry args={[size * 0.4, size * 0.6, 4]} />
        <meshStandardMaterial color="#1a1a2e" roughness={0.8} />
      </mesh>
    </group>
  );
};

/* ═══════════════════════════════════════════════════════════════
   GHOST FISH — translucent ethereal deep-sea creature
   ═══════════════════════════════════════════════════════════════ */
const GhostFish = ({ size = 0.6, speed = 0.5, color = '#e0f2fe' }) => {
  const bodyRef = useRef();
  const tailRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.elapsedTime * speed;
    if (bodyRef.current) {
      bodyRef.current.rotation.y = Math.sin(t * 2.5) * 0.06;
      bodyRef.current.material.opacity = 0.15 + Math.sin(t * 1.5) * 0.08;
    }
    if (tailRef.current) tailRef.current.rotation.y = Math.sin(t * 3) * 0.3;
  });

  return (
    <group>
      <mesh ref={bodyRef} scale={[size * 1.5, size * 0.5, size * 0.3]}>
        <sphereGeometry args={[1, 10, 8]} />
        <meshStandardMaterial
          color={color} transparent opacity={0.2}
          emissive={color} emissiveIntensity={0.8}
          side={THREE.DoubleSide} roughness={0.1}
        />
      </mesh>
      <group ref={tailRef} position={[-size * 1.5, 0, 0]}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <coneGeometry args={[size * 0.35, size * 0.8, 4]} />
          <meshStandardMaterial
            color={color} transparent opacity={0.15}
            emissive={color} emissiveIntensity={0.5} side={THREE.DoubleSide}
          />
        </mesh>
      </group>
      {/* Glowing organs */}
      {[0.3, -0.1, -0.5].map((x, i) => (
        <mesh key={i} position={[x * size, -size * 0.15, 0]}>
          <sphereGeometry args={[size * 0.06, 6, 6]} />
          <meshStandardMaterial
            color="#22d3ee" emissive="#22d3ee" emissiveIntensity={1.5}
            transparent opacity={0.6}
          />
        </mesh>
      ))}
    </group>
  );
};

/* ═══════════════════════════════════════════════════════════════
   BIOLUMINESCENT SCHOOL — tiny glowing dots that move together
   ═══════════════════════════════════════════════════════════════ */
const BioSchool = ({ count = 12, size = 0.06, color = '#22d3ee', spread = 2, speed = 1 }) => {
  const meshRef = useRef();
  const offsets = useMemo(() => Array.from({ length: count }, () => ({
    x: (Math.random() - 0.5) * spread,
    y: (Math.random() - 0.5) * spread * 0.5,
    z: (Math.random() - 0.5) * spread * 0.3,
    phase: Math.random() * Math.PI * 2,
    speed: 0.5 + Math.random() * 0.5,
  })), [count, spread]);

  return (
    <group ref={meshRef}>
      {offsets.map((o, i) => (
        <SchoolDot key={i} offset={o} size={size} color={color} speed={speed} />
      ))}
    </group>
  );
};

const SchoolDot = ({ offset, size, color, speed }) => {
  const ref = useRef();
  useFrame(({ clock }) => {
    const t = clock.elapsedTime * speed;
    if (ref.current) {
      ref.current.position.x = offset.x + Math.sin(t * offset.speed + offset.phase) * 0.3;
      ref.current.position.y = offset.y + Math.cos(t * offset.speed * 0.7 + offset.phase) * 0.2;
    }
  });
  return (
    <mesh ref={ref} position={[offset.x, offset.y, offset.z]}>
      <sphereGeometry args={[size, 6, 6]} />
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={2} transparent opacity={0.8} />
    </mesh>
  );
};

/* ═══════════════════════════════════════════════════════════════
   ZONE CONFIGURATIONS — different creatures per depth
   ═══════════════════════════════════════════════════════════════ */
const ZONE_CONFIGS = {
  surface: {
    ambientLight: 0.6,
    creatures: [
      { type: 'fish', props: { bodyColor: '#FF6B35', size: 0.4, speed: 1.4, hasStripes: true, stripeColor: '#fff' }, swim: { startX: -10, startY: 1.5, speed: 1.4, direction: 1 } },
      { type: 'fish', props: { bodyColor: '#FFD700', size: 0.35, speed: 1.2 }, swim: { startX: 8, startY: -0.5, speed: 1.1, direction: -1 } },
      { type: 'fish', props: { bodyColor: '#00CED1', size: 0.5, speed: 1.0, segments: 6 }, swim: { startX: -6, startY: 0.5, speed: 0.9, direction: 1 } },
      { type: 'fish', props: { bodyColor: '#FF69B4', size: 0.3, speed: 1.6 }, swim: { startX: 12, startY: -1.5, speed: 1.3, direction: -1 } },
      { type: 'school', props: { count: 15, color: '#C0C0C0', spread: 3 }, swim: { startX: -8, startY: 2, speed: 1.0, direction: 1 } },
    ],
  },
  shallow: {
    ambientLight: 0.5,
    creatures: [
      { type: 'fish', props: { bodyColor: '#10B981', size: 0.6, speed: 0.9, segments: 6, bodyShape: [1.2, 0.7, 0.3] }, swim: { startX: -12, startY: 1, speed: 0.8, direction: 1 } },
      { type: 'fish', props: { bodyColor: '#FBBF24', size: 0.55, speed: 0.7, bodyShape: [0.8, 0.9, 0.4] }, swim: { startX: 10, startY: -1, speed: 0.7, direction: -1 } },
      { type: 'fish', props: { bodyColor: '#8B5CF6', size: 0.45, speed: 1.1 }, swim: { startX: -5, startY: 2, speed: 1.0, direction: 1 } },
      { type: 'fish', props: { bodyColor: '#EC4899', size: 0.35, speed: 1.3, hasStripes: true, stripeColor: '#fce7f3' }, swim: { startX: 7, startY: -2, speed: 1.2, direction: -1 } },
    ],
  },
  twilight: {
    ambientLight: 0.3,
    creatures: [
      { type: 'fish', props: { bodyColor: '#334155', size: 0.7, speed: 0.8, segments: 7, bodyShape: [1.4, 0.4, 0.3], metalness: 0.6 }, swim: { startX: -12, startY: 0, speed: 1.2, direction: 1 } },
      { type: 'fish', props: { bodyColor: '#1e293b', size: 0.4, speed: 1.0, emissive: '#22d3ee', emissiveIntensity: 0.5 }, swim: { startX: 8, startY: 1.5, speed: 0.9, direction: -1 } },
      { type: 'jellyfish', props: { color: '#7c3aed', size: 0.5, glowColor: '#a78bfa' }, swim: { startX: -4, startY: -1, speed: 0.4, direction: 1 } },
      { type: 'school', props: { count: 10, color: '#67e8f9', spread: 2, size: 0.04 }, swim: { startX: 6, startY: 2, speed: 0.7, direction: -1 } },
    ],
  },
  midnight: {
    ambientLight: 0.15,
    creatures: [
      { type: 'jellyfish', props: { color: '#a855f7', size: 0.7, glowColor: '#c084fc', speed: 0.6 }, swim: { startX: -6, startY: 1, speed: 0.3, direction: 1 } },
      { type: 'jellyfish', props: { color: '#ec4899', size: 0.5, glowColor: '#f472b6', speed: 0.5 }, swim: { startX: 8, startY: -1, speed: 0.25, direction: -1 } },
      { type: 'fish', props: { bodyColor: '#0f172a', size: 0.5, speed: 0.7, emissive: '#06b6d4', emissiveIntensity: 0.8, opacity: 0.7 }, swim: { startX: -10, startY: -2, speed: 0.8, direction: 1 } },
      { type: 'school', props: { count: 20, color: '#a78bfa', spread: 4, size: 0.05 }, swim: { startX: 3, startY: 0, speed: 0.5, direction: -1 } },
    ],
  },
  deep: {
    ambientLight: 0.08,
    creatures: [
      { type: 'fish', props: { bodyColor: '#0a0a1a', size: 0.6, speed: 0.6, emissive: '#14b8a6', emissiveIntensity: 1.0, opacity: 0.8, segments: 6 }, swim: { startX: -8, startY: 1, speed: 0.6, direction: 1 } },
      { type: 'ghost', props: { size: 0.5, speed: 0.4, color: '#67e8f9' }, swim: { startX: 10, startY: -1, speed: 0.3, direction: -1 } },
      { type: 'school', props: { count: 15, color: '#22d3ee', spread: 3, size: 0.04 }, swim: { startX: -4, startY: 2, speed: 0.4, direction: 1 } },
      { type: 'jellyfish', props: { color: '#06b6d4', size: 0.4, glowColor: '#22d3ee', opacity: 0.3 }, swim: { startX: 6, startY: -2, speed: 0.2, direction: -1 } },
    ],
  },
  abyss: {
    ambientLight: 0.04,
    creatures: [
      { type: 'angler', props: { size: 0.7, speed: 0.5 }, swim: { startX: -10, startY: 0, speed: 0.4, direction: 1 } },
      { type: 'ghost', props: { size: 0.7, speed: 0.3, color: '#a5f3fc' }, swim: { startX: 8, startY: 1, speed: 0.25, direction: -1 } },
      { type: 'school', props: { count: 25, color: '#00ff88', spread: 5, size: 0.03 }, swim: { startX: 0, startY: -1, speed: 0.3, direction: 1 } },
    ],
  },
  hadal: {
    ambientLight: 0.02,
    creatures: [
      { type: 'ghost', props: { size: 0.9, speed: 0.2, color: '#e0f2fe' }, swim: { startX: -8, startY: 0, speed: 0.15, direction: 1 } },
      { type: 'angler', props: { size: 0.5, speed: 0.4 }, swim: { startX: 10, startY: -1, speed: 0.3, direction: -1 } },
      { type: 'jellyfish', props: { color: '#14b8a6', size: 0.8, glowColor: '#2dd4bf', opacity: 0.25, speed: 0.3 }, swim: { startX: -3, startY: 2, speed: 0.15, direction: 1 } },
      { type: 'school', props: { count: 30, color: '#5eead4', spread: 6, size: 0.025 }, swim: { startX: 5, startY: -2, speed: 0.2, direction: -1 } },
    ],
  },
  trench: {
    ambientLight: 0.01,
    creatures: [
      { type: 'ghost', props: { size: 1.2, speed: 0.15, color: '#cffafe' }, swim: { startX: -12, startY: 0, speed: 0.1, direction: 1 } },
      { type: 'angler', props: { size: 0.9, speed: 0.3 }, swim: { startX: 10, startY: 1, speed: 0.2, direction: -1 } },
      { type: 'jellyfish', props: { color: '#0891b2', size: 1.0, glowColor: '#06b6d4', opacity: 0.2, speed: 0.2 }, swim: { startX: -5, startY: -2, speed: 0.1, direction: 1 } },
      { type: 'school', props: { count: 40, color: '#99f6e4', spread: 8, size: 0.02 }, swim: { startX: 3, startY: 1.5, speed: 0.15, direction: -1 } },
    ],
  },
};

/* ═══════════════════════════════════════════════════════════════
   CREATURE RENDERER
   ═══════════════════════════════════════════════════════════════ */
const CreatureRenderer = ({ type, props }) => {
  switch (type) {
    case 'fish': return <ArticulatedFish {...props} />;
    case 'jellyfish': return <Jellyfish {...props} />;
    case 'angler': return <AnglerFish {...props} />;
    case 'ghost': return <GhostFish {...props} />;
    case 'school': return <BioSchool {...props} />;
    default: return null;
  }
};

/* ═══════════════════════════════════════════════════════════════
   SCENE — renders all creatures for a zone
   ═══════════════════════════════════════════════════════════════ */
const FishScene = ({ zone }) => {
  const config = ZONE_CONFIGS[zone] || ZONE_CONFIGS.surface;
  return (
    <>
      <ambientLight intensity={config.ambientLight} />
      <pointLight position={[5, 5, 5]} intensity={0.3} color="#22d3ee" />
      <pointLight position={[-5, -3, 3]} intensity={0.15} color="#a78bfa" />
      {config.creatures.map((creature, i) => (
        <SwimmingCreature key={i} {...creature.swim}>
          <CreatureRenderer type={creature.type} props={creature.props} />
        </SwimmingCreature>
      ))}
    </>
  );
};

/* ═══════════════════════════════════════════════════════════════
   OVERLAY COMPONENT — lazy Canvas with IntersectionObserver
   ═══════════════════════════════════════════════════════════════ */
const Fish3DOverlay = ({ zone = 'surface' }) => {
  const containerRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => setIsVisible(entry.isIntersecting),
      { threshold: 0.05, rootMargin: '200px' }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 z-[2] pointer-events-none" style={{ minHeight: 200 }}>
      {isVisible && (
        <Canvas
          camera={{ position: [0, 0, 10], fov: 50 }}
          gl={{ alpha: true, antialias: false, powerPreference: 'low-power' }}
          dpr={[1, 1.5]}
          style={{ background: 'transparent' }}
        >
          <FishScene zone={zone} />
        </Canvas>
      )}
    </div>
  );
};

export default Fish3DOverlay;
