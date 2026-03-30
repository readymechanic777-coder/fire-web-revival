import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

// ── Shared scroll state ──
const scrollState = { progress: 0 };

const useScrollSync = () => {
  useEffect(() => {
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      scrollState.progress = max > 0 ? window.scrollY / max : 0;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
};

// ── Visibility helper ──
const getZoneOpacity = (zone, min, max) => {
  if (zone < min || zone > max) return 0;
  const fadeIn = min + 0.08;
  const fadeOut = max - 0.08;
  if (zone < fadeIn) return (zone - min) / 0.08;
  if (zone > fadeOut) return (max - zone) / 0.08;
  return 1;
};

// ═══════════════════════════════════════════════
// TROPICAL FISH — Detailed with body segments
// ═══════════════════════════════════════════════
const TropicalFish = ({ startPos, speed, size, bodyColor, accentColor, wobbleAmp, wobbleFreq, direction, depthMin, depthMax }) => {
  const groupRef = useRef();
  const seg1 = useRef();
  const seg2 = useRef();
  const seg3 = useRef();
  const dorsalRef = useRef();
  const pectLRef = useRef();
  const pectRRef = useRef();
  const tailRef = useRef();
  const timeOffset = useMemo(() => Math.random() * 100, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() + timeOffset;
    const g = groupRef.current;
    if (!g) return;

    const opacity = getZoneOpacity(scrollState.progress, depthMin, depthMax);
    g.visible = opacity > 0.01;
    if (!g.visible) return;

    // Swimming movement
    g.position.x += speed * direction * 0.014;
    if (direction > 0 && g.position.x > 28) g.position.x = -28;
    if (direction < 0 && g.position.x < -28) g.position.x = 28;

    g.position.y = startPos[1] + Math.sin(t * wobbleFreq) * wobbleAmp + Math.sin(t * wobbleFreq * 0.37) * wobbleAmp * 0.4;
    g.position.z = startPos[2] + Math.cos(t * wobbleFreq * 0.5) * wobbleAmp * 0.3;

    g.rotation.y = direction > 0 ? 0 : Math.PI;
    // Banking into turns
    g.rotation.z = Math.sin(t * wobbleFreq) * 0.06 * direction;
    g.rotation.x = Math.cos(t * wobbleFreq * 0.5) * 0.03;

    // Body undulation — wave propagating tail-ward
    const wave = (phase) => Math.sin(t * 7 + phase) * 0.08;
    if (seg1.current) seg1.current.rotation.y = wave(0);
    if (seg2.current) seg2.current.rotation.y = wave(0.8);
    if (seg3.current) seg3.current.rotation.y = wave(1.6);

    // Tail wag — stronger amplitude
    if (tailRef.current) tailRef.current.rotation.y = Math.sin(t * 7 + 2.4) * 0.45;

    // Dorsal fin flutter
    if (dorsalRef.current) dorsalRef.current.scale.y = 1 + Math.sin(t * 4) * 0.1;

    // Pectoral fins rowing
    const pectAngle = Math.sin(t * 3) * 0.35;
    if (pectLRef.current) pectLRef.current.rotation.x = 0.5 + pectAngle;
    if (pectRRef.current) pectRRef.current.rotation.x = -0.5 - pectAngle;

    g.scale.setScalar(size * Math.min(opacity, 1));
  });

  const body = new THREE.Color(bodyColor);
  const accent = new THREE.Color(accentColor);
  const belly = body.clone().lerp(new THREE.Color('#ffffff'), 0.5);
  const finCol = accent.clone().multiplyScalar(0.8);

  return (
    <group ref={groupRef} position={startPos} scale={size}>
      {/* Segment 1: Head */}
      <group ref={seg1}>
        <mesh scale={[1.1, 0.9, 0.65]}>
          <sphereGeometry args={[1, 20, 14]} />
          <meshPhysicalMaterial color={body} roughness={0.25} metalness={0.35} clearcoat={0.6} clearcoatRoughness={0.2} emissive={body} emissiveIntensity={0.08} />
        </mesh>
        {/* Iridescent scales overlay */}
        <mesh scale={[1.12, 0.92, 0.67]}>
          <sphereGeometry args={[1, 20, 14]} />
          <meshPhysicalMaterial color={accent} roughness={0.15} metalness={0.6} clearcoat={1} clearcoatRoughness={0.1} transparent opacity={0.25} />
        </mesh>
        {/* Belly */}
        <mesh position={[0, -0.35, 0]} scale={[1.0, 0.35, 0.55]}>
          <sphereGeometry args={[1, 14, 10]} />
          <meshPhysicalMaterial color={belly} roughness={0.3} metalness={0.1} clearcoat={0.4} />
        </mesh>
        {/* Mouth */}
        <mesh position={[1.05, -0.05, 0]} scale={[0.15, 0.08, 0.2]}>
          <sphereGeometry args={[1, 8, 8]} />
          <meshStandardMaterial color="#1a0a0a" />
        </mesh>
        {/* Eye R */}
        <group position={[0.65, 0.22, 0.48]}>
          <mesh><sphereGeometry args={[0.2, 12, 12]} /><meshPhysicalMaterial color="#e8e8e0" roughness={0.1} clearcoat={1} /></mesh>
          <mesh position={[0.08, 0, 0.05]}><sphereGeometry args={[0.12, 10, 10]} /><meshStandardMaterial color="#1a1a2e" metalness={0.8} /></mesh>
          <mesh position={[0.12, 0.02, 0.08]}><sphereGeometry args={[0.04, 6, 6]} /><meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} /></mesh>
        </group>
        {/* Eye L */}
        <group position={[0.65, 0.22, -0.48]}>
          <mesh><sphereGeometry args={[0.2, 12, 12]} /><meshPhysicalMaterial color="#e8e8e0" roughness={0.1} clearcoat={1} /></mesh>
          <mesh position={[0.08, 0, -0.05]}><sphereGeometry args={[0.12, 10, 10]} /><meshStandardMaterial color="#1a1a2e" metalness={0.8} /></mesh>
          <mesh position={[0.12, 0.02, -0.08]}><sphereGeometry args={[0.04, 6, 6]} /><meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.5} /></mesh>
        </group>
        {/* Dorsal fin */}
        <group ref={dorsalRef} position={[-0.1, 0.85, 0]}>
          <mesh rotation={[0, 0, -0.25]} scale={[1, 0.7, 0.04]}>
            <coneGeometry args={[0.5, 1.4, 6]} />
            <meshPhysicalMaterial color={finCol} roughness={0.3} transparent opacity={0.75} side={THREE.DoubleSide} emissive={finCol} emissiveIntensity={0.1} />
          </mesh>
        </group>
        {/* Pectoral L */}
        <group ref={pectLRef} position={[0.15, -0.25, 0.55]}>
          <mesh rotation={[0.5, 0.3, 0.7]} scale={[0.5, 0.08, 0.7]}>
            <coneGeometry args={[0.5, 1, 5]} />
            <meshPhysicalMaterial color={finCol} roughness={0.3} transparent opacity={0.6} side={THREE.DoubleSide} />
          </mesh>
        </group>
        {/* Pectoral R */}
        <group ref={pectRRef} position={[0.15, -0.25, -0.55]}>
          <mesh rotation={[-0.5, -0.3, 0.7]} scale={[0.5, 0.08, 0.7]}>
            <coneGeometry args={[0.5, 1, 5]} />
            <meshPhysicalMaterial color={finCol} roughness={0.3} transparent opacity={0.6} side={THREE.DoubleSide} />
          </mesh>
        </group>

        {/* Segment 2: Mid body */}
        <group ref={seg2} position={[-0.9, 0, 0]}>
          <mesh scale={[0.9, 0.7, 0.55]}>
            <sphereGeometry args={[1, 16, 12]} />
            <meshPhysicalMaterial color={body} roughness={0.25} metalness={0.35} clearcoat={0.5} emissive={body} emissiveIntensity={0.06} />
          </mesh>
          {/* Accent stripe */}
          <mesh scale={[0.92, 0.18, 0.57]}>
            <sphereGeometry args={[1, 12, 8]} />
            <meshPhysicalMaterial color={accent} roughness={0.2} metalness={0.5} clearcoat={0.8} emissive={accent} emissiveIntensity={0.1} />
          </mesh>

          {/* Segment 3: Tail base */}
          <group ref={seg3} position={[-0.7, 0, 0]}>
            <mesh scale={[0.6, 0.45, 0.35]}>
              <sphereGeometry args={[1, 12, 8]} />
              <meshPhysicalMaterial color={body} roughness={0.25} metalness={0.3} clearcoat={0.4} />
            </mesh>
            {/* Anal fin */}
            <mesh position={[0, -0.4, 0]} rotation={[0, 0, 0.3]} scale={[0.5, 0.3, 0.03]}>
              <coneGeometry args={[0.4, 0.8, 4]} />
              <meshPhysicalMaterial color={finCol} roughness={0.3} transparent opacity={0.65} side={THREE.DoubleSide} />
            </mesh>

            {/* Tail fin */}
            <group ref={tailRef} position={[-0.6, 0, 0]}>
              <mesh position={[-0.4, 0.35, 0]} rotation={[0, 0, 0.55]} scale={[0.9, 0.45, 0.04]}>
                <coneGeometry args={[0.55, 1.2, 5]} />
                <meshPhysicalMaterial color={accent} roughness={0.25} transparent opacity={0.8} emissive={accent} emissiveIntensity={0.15} side={THREE.DoubleSide} />
              </mesh>
              <mesh position={[-0.4, -0.35, 0]} rotation={[0, 0, -0.55]} scale={[0.9, 0.45, 0.04]}>
                <coneGeometry args={[0.55, 1.2, 5]} />
                <meshPhysicalMaterial color={accent} roughness={0.25} transparent opacity={0.8} emissive={accent} emissiveIntensity={0.15} side={THREE.DoubleSide} />
              </mesh>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
};

// ═══════════════════════════════════════════════
// JELLYFISH — Pulsing dome with flowing tentacles
// ═══════════════════════════════════════════════
const Jellyfish = ({ startPos, size, color, speed, direction, depthMin, depthMax }) => {
  const groupRef = useRef();
  const bellRef = useRef();
  const tentRefs = useRef([]);
  const timeOffset = useMemo(() => Math.random() * 100, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() + timeOffset;
    const g = groupRef.current;
    if (!g) return;

    const opacity = getZoneOpacity(scrollState.progress, depthMin, depthMax);
    g.visible = opacity > 0.01;
    if (!g.visible) return;

    // Gentle drift
    g.position.x += speed * direction * 0.005;
    if (direction > 0 && g.position.x > 25) g.position.x = -25;
    if (direction < 0 && g.position.x < -25) g.position.x = 25;

    // Pulsing vertical movement
    const pulse = Math.sin(t * 1.2);
    g.position.y = startPos[1] + Math.sin(t * 0.35) * 2.5 + pulse * 0.6;
    g.position.z = startPos[2] + Math.cos(t * 0.25) * 1;

    // Bell contraction
    if (bellRef.current) {
      const contract = 1 - Math.max(0, pulse) * 0.15;
      bellRef.current.scale.set(size * contract, size * (1 + Math.max(0, pulse) * 0.08), size * contract);
    }

    // Tentacle sway — each with different phase for organic feel
    tentRefs.current.forEach((ref, i) => {
      if (ref) {
        const phase = i * 0.7;
        ref.rotation.x = Math.sin(t * 0.8 + phase) * 0.25;
        ref.rotation.z = Math.cos(t * 0.6 + phase) * 0.2;
        ref.scale.y = 1 + Math.sin(t * 1.2 + phase) * 0.15;
      }
    });

    g.scale.setScalar(Math.min(opacity, 1));
  });

  const col = new THREE.Color(color);
  const innerCol = col.clone().lerp(new THREE.Color('#ffffff'), 0.4);
  const tentCount = 12;

  return (
    <group ref={groupRef} position={startPos} scale={size}>
      {/* Bell dome */}
      <group ref={bellRef}>
        <mesh>
          <sphereGeometry args={[1.2, 24, 20, 0, Math.PI * 2, 0, Math.PI * 0.55]} />
          <meshPhysicalMaterial color={col} transparent opacity={0.4} emissive={col} emissiveIntensity={0.5} side={THREE.DoubleSide} roughness={0.1} transmission={0.3} thickness={0.5} />
        </mesh>
        {/* Inner bell */}
        <mesh scale={0.88}>
          <sphereGeometry args={[1.2, 20, 16, 0, Math.PI * 2, 0, Math.PI * 0.5]} />
          <meshPhysicalMaterial color={innerCol} transparent opacity={0.2} emissive={col} emissiveIntensity={0.8} side={THREE.DoubleSide} />
        </mesh>
        {/* Rim glow */}
        <mesh position={[0, -0.45, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[1.05, 0.06, 8, 32]} />
          <meshStandardMaterial color={col} emissive={col} emissiveIntensity={1.5} transparent opacity={0.6} />
        </mesh>
        {/* Oral arms — thick central tentacles */}
        {[0, 1.57, 3.14, 4.71].map((angle, i) => (
          <group key={`oral-${i}`} position={[Math.cos(angle) * 0.3, -0.8, Math.sin(angle) * 0.3]}
            ref={el => { if (el) tentRefs.current[i] = el; }}>
            <mesh scale={[0.12, 2.0 + Math.random() * 0.5, 0.12]}>
              <cylinderGeometry args={[1, 0.3, 1, 6]} />
              <meshPhysicalMaterial color={col} transparent opacity={0.45} emissive={col} emissiveIntensity={0.4} />
            </mesh>
          </group>
        ))}
        {/* Thin trailing tentacles */}
        {Array.from({ length: tentCount - 4 }).map((_, i) => {
          const angle = (i / (tentCount - 4)) * Math.PI * 2;
          const r = 0.8 + Math.random() * 0.2;
          return (
            <group key={`tent-${i}`} position={[Math.cos(angle) * r, -0.6, Math.sin(angle) * r]}
              ref={el => { if (el) tentRefs.current[i + 4] = el; }}>
              <mesh scale={[0.025, 2.5 + Math.random() * 1.5, 0.025]}>
                <cylinderGeometry args={[1, 0.15, 1, 4]} />
                <meshPhysicalMaterial color={col} transparent opacity={0.3} emissive={col} emissiveIntensity={0.3} />
              </mesh>
            </group>
          );
        })}
      </group>
      <pointLight position={[0, 0, 0]} color={color} intensity={0.8} distance={6} />
    </group>
  );
};

// ═══════════════════════════════════════════════
// MANTA RAY — Graceful wing-flapping
// ═══════════════════════════════════════════════
const MantaRay = ({ startPos, size, speed, direction, depthMin, depthMax }) => {
  const groupRef = useRef();
  const wingLRef = useRef();
  const wingRRef = useRef();
  const timeOffset = useMemo(() => Math.random() * 100, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() + timeOffset;
    const g = groupRef.current;
    if (!g) return;

    const opacity = getZoneOpacity(scrollState.progress, depthMin, depthMax);
    g.visible = opacity > 0.01;
    if (!g.visible) return;

    g.position.x += speed * direction * 0.01;
    if (direction > 0 && g.position.x > 30) g.position.x = -30;
    if (direction < 0 && g.position.x < -30) g.position.x = 30;
    g.position.y = startPos[1] + Math.sin(t * 0.4) * 1.8;
    g.rotation.y = direction > 0 ? -Math.PI / 2 : Math.PI / 2;

    // Graceful wing flap
    const wingAngle = Math.sin(t * 1.5) * 0.35;
    if (wingLRef.current) wingLRef.current.rotation.x = wingAngle;
    if (wingRRef.current) wingRRef.current.rotation.x = -wingAngle;

    g.scale.setScalar(size * Math.min(opacity, 1));
  });

  return (
    <group ref={groupRef} position={startPos} scale={size}>
      {/* Central body */}
      <mesh scale={[2, 0.2, 1]}>
        <sphereGeometry args={[1, 18, 10]} />
        <meshPhysicalMaterial color="#2c3e50" roughness={0.35} metalness={0.25} clearcoat={0.5} emissive="#1a2530" emissiveIntensity={0.08} />
      </mesh>
      {/* Belly */}
      <mesh position={[0, -0.15, 0]} scale={[1.8, 0.12, 0.85]}>
        <sphereGeometry args={[1, 14, 8]} />
        <meshPhysicalMaterial color="#8fa5b5" roughness={0.3} clearcoat={0.3} />
      </mesh>
      {/* Wing L */}
      <group ref={wingLRef} position={[0, 0, 1]}>
        <mesh scale={[2, 0.06, 1.8]}>
          <sphereGeometry args={[1, 14, 6]} />
          <meshPhysicalMaterial color="#34495e" roughness={0.35} metalness={0.2} clearcoat={0.4} side={THREE.DoubleSide} />
        </mesh>
      </group>
      {/* Wing R */}
      <group ref={wingRRef} position={[0, 0, -1]}>
        <mesh scale={[2, 0.06, 1.8]}>
          <sphereGeometry args={[1, 14, 6]} />
          <meshPhysicalMaterial color="#34495e" roughness={0.35} metalness={0.2} clearcoat={0.4} side={THREE.DoubleSide} />
        </mesh>
      </group>
      {/* Tail */}
      <mesh position={[-3, 0.1, 0]} rotation={[0, 0, 0.03]} scale={[2.5, 0.03, 0.03]}>
        <cylinderGeometry args={[0.4, 0.05, 1, 6]} />
        <meshStandardMaterial color="#2c3e50" />
      </mesh>
      {/* Eyes */}
      <mesh position={[1.2, 0.1, 0.7]}><sphereGeometry args={[0.1, 8, 8]} /><meshStandardMaterial color="#88ccaa" emissive="#88ccaa" emissiveIntensity={0.6} /></mesh>
      <mesh position={[1.2, 0.1, -0.7]}><sphereGeometry args={[0.1, 8, 8]} /><meshStandardMaterial color="#88ccaa" emissive="#88ccaa" emissiveIntensity={0.6} /></mesh>
    </group>
  );
};

// ═══════════════════════════════════════════════
// SHARK — Segmented, menacing
// ═══════════════════════════════════════════════
const Shark = ({ startPos, size, speed, direction, depthMin, depthMax }) => {
  const groupRef = useRef();
  const bodyRef = useRef();
  const tailBaseRef = useRef();
  const tailFinRef = useRef();
  const jawRef = useRef();
  const timeOffset = useMemo(() => Math.random() * 100, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() + timeOffset;
    const g = groupRef.current;
    if (!g) return;

    const opacity = getZoneOpacity(scrollState.progress, depthMin, depthMax);
    g.visible = opacity > 0.01;
    if (!g.visible) return;

    g.position.x += speed * direction * 0.012;
    if (direction > 0 && g.position.x > 32) g.position.x = -32;
    if (direction < 0 && g.position.x < -32) g.position.x = 32;
    g.position.y = startPos[1] + Math.sin(t * 0.25) * 1.2;
    g.rotation.y = direction > 0 ? 0 : Math.PI;
    g.rotation.z = Math.sin(t * 0.4) * 0.02;

    // Body undulation
    if (bodyRef.current) bodyRef.current.rotation.y = Math.sin(t * 3.5) * 0.04;
    if (tailBaseRef.current) tailBaseRef.current.rotation.y = Math.sin(t * 3.5 + 0.8) * 0.1;
    if (tailFinRef.current) tailFinRef.current.rotation.y = Math.sin(t * 3.5 + 1.6) * 0.3;

    // Jaw subtle opening
    if (jawRef.current) jawRef.current.rotation.x = Math.sin(t * 0.8) * 0.03 + 0.02;

    g.scale.setScalar(size * Math.min(opacity, 1));
  });

  return (
    <group ref={groupRef} position={startPos} scale={size}>
      {/* Head */}
      <group>
        <mesh scale={[1.8, 0.7, 0.65]}>
          <sphereGeometry args={[1, 20, 14]} />
          <meshPhysicalMaterial color="#3d4f5f" roughness={0.4} metalness={0.25} clearcoat={0.3} />
        </mesh>
        {/* Snout */}
        <mesh position={[1.6, -0.1, 0]} scale={[0.9, 0.4, 0.45]} rotation={[0, 0, 0.1]}>
          <sphereGeometry args={[1, 14, 10]} />
          <meshPhysicalMaterial color="#3d4f5f" roughness={0.4} metalness={0.2} />
        </mesh>
        {/* Jaw */}
        <group ref={jawRef} position={[1.2, -0.4, 0]}>
          <mesh scale={[0.8, 0.2, 0.4]}>
            <sphereGeometry args={[1, 12, 8]} />
            <meshPhysicalMaterial color="#6b8090" roughness={0.4} />
          </mesh>
        </group>
        {/* Belly */}
        <mesh position={[0, -0.45, 0]} scale={[1.6, 0.3, 0.55]}>
          <sphereGeometry args={[1, 14, 8]} />
          <meshPhysicalMaterial color="#a0b5c5" roughness={0.4} />
        </mesh>
        {/* Dorsal fin */}
        <mesh position={[-0.2, 1.1, 0]} rotation={[0, 0, -0.15]} scale={[1, 0.9, 0.05]}>
          <coneGeometry args={[0.4, 1.6, 5]} />
          <meshPhysicalMaterial color="#3d4f5f" roughness={0.4} side={THREE.DoubleSide} />
        </mesh>
        {/* Pectoral fins */}
        <mesh position={[0.3, -0.4, 0.7]} rotation={[0.2, 0.15, 0.5]} scale={[1.3, 0.04, 0.6]}>
          <coneGeometry args={[0.4, 1.5, 5]} />
          <meshPhysicalMaterial color="#3d4f5f" roughness={0.4} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0.3, -0.4, -0.7]} rotation={[-0.2, -0.15, 0.5]} scale={[1.3, 0.04, 0.6]}>
          <coneGeometry args={[0.4, 1.5, 5]} />
          <meshPhysicalMaterial color="#3d4f5f" roughness={0.4} side={THREE.DoubleSide} />
        </mesh>
        {/* Eyes */}
        <group position={[1.1, 0.15, 0.5]}>
          <mesh><sphereGeometry args={[0.12, 10, 10]} /><meshPhysicalMaterial color="#1a1a1a" roughness={0.1} metalness={0.9} /></mesh>
        </group>
        <group position={[1.1, 0.15, -0.5]}>
          <mesh><sphereGeometry args={[0.12, 10, 10]} /><meshPhysicalMaterial color="#1a1a1a" roughness={0.1} metalness={0.9} /></mesh>
        </group>
        {/* Gill slits */}
        {[0.3, 0.5, 0.7].map((x, i) => (
          <React.Fragment key={i}>
            <mesh position={[x, -0.1, 0.6]} rotation={[0, 0, 0.1]} scale={[0.02, 0.25, 0.02]}>
              <boxGeometry /><meshStandardMaterial color="#2a3a4a" />
            </mesh>
            <mesh position={[x, -0.1, -0.6]} rotation={[0, 0, 0.1]} scale={[0.02, 0.25, 0.02]}>
              <boxGeometry /><meshStandardMaterial color="#2a3a4a" />
            </mesh>
          </React.Fragment>
        ))}
      </group>

      {/* Body mid */}
      <group ref={bodyRef} position={[-1.6, 0, 0]}>
        <mesh scale={[1.2, 0.6, 0.5]}>
          <sphereGeometry args={[1, 16, 10]} />
          <meshPhysicalMaterial color="#3d4f5f" roughness={0.4} metalness={0.2} clearcoat={0.2} />
        </mesh>
        {/* Second dorsal */}
        <mesh position={[-0.3, 0.6, 0]} rotation={[0, 0, -0.1]} scale={[0.5, 0.4, 0.03]}>
          <coneGeometry args={[0.3, 0.8, 4]} />
          <meshPhysicalMaterial color="#3d4f5f" roughness={0.4} side={THREE.DoubleSide} />
        </mesh>

        {/* Tail base */}
        <group ref={tailBaseRef} position={[-1.1, 0, 0]}>
          <mesh scale={[0.8, 0.4, 0.3]}>
            <sphereGeometry args={[1, 12, 8]} />
            <meshPhysicalMaterial color="#3d4f5f" roughness={0.4} />
          </mesh>

          {/* Tail fin */}
          <group ref={tailFinRef} position={[-0.8, 0, 0]}>
            <mesh position={[-0.3, 0.7, 0]} rotation={[0, 0, 0.6]} scale={[0.7, 0.6, 0.03]}>
              <coneGeometry args={[0.5, 1.5, 5]} />
              <meshPhysicalMaterial color="#3d4f5f" roughness={0.4} side={THREE.DoubleSide} />
            </mesh>
            <mesh position={[-0.2, -0.35, 0]} rotation={[0, 0, -0.35]} scale={[0.5, 0.35, 0.03]}>
              <coneGeometry args={[0.4, 1, 4]} />
              <meshPhysicalMaterial color="#3d4f5f" roughness={0.4} side={THREE.DoubleSide} />
            </mesh>
          </group>
        </group>
      </group>
    </group>
  );
};

// ═══════════════════════════════════════════════
// ANGLERFISH — Deep sea horror with bioluminescence
// ═══════════════════════════════════════════════
const Anglerfish = ({ startPos, size, speed, direction, depthMin, depthMax }) => {
  const groupRef = useRef();
  const lureRef = useRef();
  const jawRef = useRef();
  const timeOffset = useMemo(() => Math.random() * 100, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() + timeOffset;
    const g = groupRef.current;
    if (!g) return;

    const opacity = getZoneOpacity(scrollState.progress, depthMin, depthMax);
    g.visible = opacity > 0.01;
    if (!g.visible) return;

    g.position.x += speed * direction * 0.005;
    if (direction > 0 && g.position.x > 25) g.position.x = -25;
    if (direction < 0 && g.position.x < -25) g.position.x = 25;
    g.position.y = startPos[1] + Math.sin(t * 0.25) * 0.6;
    g.rotation.y = direction > 0 ? 0 : Math.PI;

    // Lure hypnotic sway
    if (lureRef.current) {
      lureRef.current.rotation.z = Math.sin(t * 1.5) * 0.4;
      lureRef.current.rotation.x = Math.cos(t * 1.1) * 0.2;
    }

    // Jaw snapping
    if (jawRef.current) {
      jawRef.current.rotation.x = Math.sin(t * 0.6) * 0.08 + 0.1;
    }

    g.scale.setScalar(size * Math.min(opacity, 1));
  });

  return (
    <group ref={groupRef} position={startPos} scale={size}>
      {/* Bulbous body */}
      <mesh scale={[1.3, 1.2, 1]}>
        <sphereGeometry args={[1, 18, 14]} />
        <meshPhysicalMaterial color="#0d1117" roughness={0.7} metalness={0.1} emissive="#0a0e14" emissiveIntensity={0.05} />
      </mesh>
      {/* Warty bumps */}
      {[...Array(8)].map((_, i) => {
        const a = (i / 8) * Math.PI * 2;
        const r = 0.9 + Math.random() * 0.3;
        return (
          <mesh key={i} position={[Math.cos(a) * r * 0.7, Math.sin(a) * r * 0.6, (Math.random() - 0.5) * 0.8]} scale={0.12 + Math.random() * 0.08}>
            <sphereGeometry args={[1, 6, 6]} />
            <meshStandardMaterial color="#1a1f25" roughness={0.8} />
          </mesh>
        );
      })}
      {/* Jaw */}
      <group ref={jawRef} position={[1.1, -0.5, 0]}>
        <mesh scale={[0.8, 0.35, 0.7]}>
          <sphereGeometry args={[1, 12, 8]} />
          <meshStandardMaterial color="#0a0e14" roughness={0.7} />
        </mesh>
        {/* Teeth — jagged */}
        {[-0.35, -0.18, 0, 0.18, 0.35].map((z, i) => (
          <mesh key={i} position={[0.6, 0.2 + (i % 2) * 0.08, z]} rotation={[0, 0, 0.3 + Math.random() * 0.3]} scale={[0.06, 0.22 + Math.random() * 0.1, 0.06]}>
            <coneGeometry args={[0.5, 1, 4]} />
            <meshStandardMaterial color="#d4d0c0" emissive="#d4d0c0" emissiveIntensity={0.15} />
          </mesh>
        ))}
      </group>
      {/* Upper teeth */}
      {[-0.3, -0.1, 0.1, 0.3].map((z, i) => (
        <mesh key={`ut-${i}`} position={[1.4, -0.05, z]} rotation={[0, 0, -0.3 - Math.random() * 0.2]} scale={[0.07, 0.2 + Math.random() * 0.12, 0.07]}>
          <coneGeometry args={[0.5, 1, 4]} />
          <meshStandardMaterial color="#d4d0c0" emissive="#d4d0c0" emissiveIntensity={0.15} />
        </mesh>
      ))}
      {/* Bioluminescent lure */}
      <group ref={lureRef} position={[0.4, 1.6, 0]}>
        <mesh scale={[0.025, 1.4, 0.025]}>
          <cylinderGeometry args={[1, 1, 1, 4]} />
          <meshStandardMaterial color="#222" />
        </mesh>
        <mesh position={[0, 0.85, 0]}>
          <sphereGeometry args={[0.3, 14, 14]} />
          <meshPhysicalMaterial color="#44ffaa" emissive="#44ffaa" emissiveIntensity={3} transparent opacity={0.85} roughness={0.1} />
        </mesh>
        <pointLight position={[0, 0.85, 0]} color="#44ffaa" intensity={4} distance={12} />
      </group>
      {/* Evil red eyes */}
      <mesh position={[0.85, 0.45, 0.55]}>
        <sphereGeometry args={[0.14, 10, 10]} />
        <meshStandardMaterial color="#ff2222" emissive="#ff2222" emissiveIntensity={2} />
      </mesh>
      <mesh position={[0.85, 0.45, -0.55]}>
        <sphereGeometry args={[0.14, 10, 10]} />
        <meshStandardMaterial color="#ff2222" emissive="#ff2222" emissiveIntensity={2} />
      </mesh>
      {/* Small fins */}
      <mesh position={[-0.8, 0.3, 0.7]} rotation={[0.3, 0, 0.5]} scale={[0.4, 0.06, 0.5]}>
        <coneGeometry args={[0.5, 1, 4]} />
        <meshStandardMaterial color="#151b22" transparent opacity={0.5} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[-0.8, 0.3, -0.7]} rotation={[-0.3, 0, 0.5]} scale={[0.4, 0.06, 0.5]}>
        <coneGeometry args={[0.5, 1, 4]} />
        <meshStandardMaterial color="#151b22" transparent opacity={0.5} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
};

// ═══════════════════════════════════════════════
// SEAHORSE — Gentle bobbing
// ═══════════════════════════════════════════════
const Seahorse = ({ startPos, size, color, speed, direction, depthMin, depthMax }) => {
  const groupRef = useRef();
  const tailCurlRef = useRef();
  const timeOffset = useMemo(() => Math.random() * 100, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() + timeOffset;
    const g = groupRef.current;
    if (!g) return;

    const opacity = getZoneOpacity(scrollState.progress, depthMin, depthMax);
    g.visible = opacity > 0.01;
    if (!g.visible) return;

    g.position.x += speed * direction * 0.004;
    if (direction > 0 && g.position.x > 22) g.position.x = -22;
    if (direction < 0 && g.position.x < -22) g.position.x = 22;
    g.position.y = startPos[1] + Math.sin(t * 0.6) * 1.5;
    g.rotation.y = direction > 0 ? -0.3 : Math.PI + 0.3;

    // Gentle body sway
    g.rotation.z = Math.sin(t * 0.8) * 0.1;

    // Tail curl animation
    if (tailCurlRef.current) {
      tailCurlRef.current.rotation.z = Math.sin(t * 0.5) * 0.2 - 0.5;
    }

    g.scale.setScalar(size * Math.min(opacity, 1));
  });

  const col = new THREE.Color(color);

  return (
    <group ref={groupRef} position={startPos} scale={size}>
      {/* Head */}
      <mesh position={[0.4, 1.5, 0]} scale={[0.5, 0.55, 0.4]}>
        <sphereGeometry args={[1, 14, 12]} />
        <meshPhysicalMaterial color={col} roughness={0.3} metalness={0.3} clearcoat={0.5} emissive={col} emissiveIntensity={0.1} />
      </mesh>
      {/* Snout */}
      <mesh position={[1.0, 1.5, 0]} rotation={[0, 0, 0.1]} scale={[0.5, 0.12, 0.12]}>
        <cylinderGeometry args={[0.5, 0.8, 1, 6]} />
        <meshPhysicalMaterial color={col} roughness={0.3} clearcoat={0.4} />
      </mesh>
      {/* Eye */}
      <mesh position={[0.6, 1.65, 0.25]}><sphereGeometry args={[0.1, 8, 8]} /><meshStandardMaterial color="#111" /></mesh>
      <mesh position={[0.6, 1.65, -0.25]}><sphereGeometry args={[0.1, 8, 8]} /><meshStandardMaterial color="#111" /></mesh>
      {/* Body segments */}
      {[1.0, 0.5, 0, -0.5].map((y, i) => (
        <mesh key={i} position={[0, y, 0]} scale={[0.4 - i * 0.03, 0.35, 0.35 - i * 0.03]}>
          <sphereGeometry args={[1, 10, 8]} />
          <meshPhysicalMaterial color={col} roughness={0.3} metalness={0.25} clearcoat={0.4} emissive={col} emissiveIntensity={0.06} />
        </mesh>
      ))}
      {/* Dorsal fin (back ridge) */}
      <mesh position={[-0.3, 0.5, 0]} rotation={[0, 0, 0.3]} scale={[0.3, 0.6, 0.03]}>
        <coneGeometry args={[0.4, 1, 4]} />
        <meshPhysicalMaterial color={col} transparent opacity={0.6} side={THREE.DoubleSide} emissive={col} emissiveIntensity={0.15} />
      </mesh>
      {/* Curling tail */}
      <group ref={tailCurlRef} position={[0, -0.8, 0]}>
        {[0, -0.3, -0.55, -0.75].map((dy, i) => (
          <mesh key={i} position={[-0.08 * i, dy, 0]} scale={[0.18 - i * 0.03, 0.2, 0.18 - i * 0.03]}>
            <sphereGeometry args={[1, 6, 6]} />
            <meshPhysicalMaterial color={col} roughness={0.3} clearcoat={0.3} />
          </mesh>
        ))}
      </group>
    </group>
  );
};

// ═══════════════════════════════════════════════
// WHALE — Majestic deep-sea giant
// ═══════════════════════════════════════════════
const Whale = ({ startPos, size, speed, direction, depthMin, depthMax }) => {
  const groupRef = useRef();
  const tailRef = useRef();
  const flukeRef = useRef();
  const timeOffset = useMemo(() => Math.random() * 100, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() + timeOffset;
    const g = groupRef.current;
    if (!g) return;

    const opacity = getZoneOpacity(scrollState.progress, depthMin, depthMax);
    g.visible = opacity > 0.01;
    if (!g.visible) return;

    g.position.x += speed * direction * 0.004;
    if (direction > 0 && g.position.x > 38) g.position.x = -38;
    if (direction < 0 && g.position.x < -38) g.position.x = 38;
    g.position.y = startPos[1] + Math.sin(t * 0.15) * 2;
    g.rotation.y = direction > 0 ? 0 : Math.PI;
    g.rotation.z = Math.sin(t * 0.2) * 0.015;

    if (tailRef.current) tailRef.current.rotation.y = Math.sin(t * 1.2) * 0.08;
    if (flukeRef.current) flukeRef.current.rotation.y = Math.sin(t * 1.2 + 0.6) * 0.15;

    g.scale.setScalar(size * Math.min(opacity, 1));
  });

  return (
    <group ref={groupRef} position={startPos} scale={size}>
      {/* Main body */}
      <mesh scale={[4.5, 1.5, 1.4]}>
        <sphereGeometry args={[1, 22, 14]} />
        <meshPhysicalMaterial color="#1a3550" roughness={0.45} metalness={0.15} clearcoat={0.3} emissive="#0c1e30" emissiveIntensity={0.06} />
      </mesh>
      {/* Belly grooves */}
      <mesh position={[0.5, -0.9, 0]} scale={[3.5, 0.7, 1.15]}>
        <sphereGeometry args={[1, 16, 10]} />
        <meshPhysicalMaterial color="#4a7a9a" roughness={0.4} clearcoat={0.2} />
      </mesh>
      {/* Head bulge */}
      <mesh position={[3.5, 0.2, 0]} scale={[1.5, 1.1, 1.2]}>
        <sphereGeometry args={[1, 16, 12]} />
        <meshPhysicalMaterial color="#1a3550" roughness={0.45} />
      </mesh>
      {/* Eyes */}
      <mesh position={[3.2, 0.3, 1.1]}><sphereGeometry args={[0.15, 8, 8]} /><meshStandardMaterial color="#1a1a2a" /></mesh>
      <mesh position={[3.2, 0.3, -1.1]}><sphereGeometry args={[0.15, 8, 8]} /><meshStandardMaterial color="#1a1a2a" /></mesh>
      {/* Pectoral fins */}
      <mesh position={[1, -0.8, 1.5]} rotation={[0.3, 0.2, 0.6]} scale={[2, 0.06, 0.8]}>
        <coneGeometry args={[0.5, 2, 5]} />
        <meshPhysicalMaterial color="#1a3550" roughness={0.4} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[1, -0.8, -1.5]} rotation={[-0.3, -0.2, 0.6]} scale={[2, 0.06, 0.8]}>
        <coneGeometry args={[0.5, 2, 5]} />
        <meshPhysicalMaterial color="#1a3550" roughness={0.4} side={THREE.DoubleSide} />
      </mesh>
      {/* Tail section */}
      <group ref={tailRef} position={[-4.5, 0, 0]}>
        <mesh scale={[1.2, 0.6, 0.5]}>
          <sphereGeometry args={[1, 12, 8]} />
          <meshPhysicalMaterial color="#1a3550" roughness={0.45} />
        </mesh>
        {/* Flukes */}
        <group ref={flukeRef} position={[-1.5, 0, 0]}>
          <mesh position={[0, 0, 1.2]} rotation={[Math.PI / 2, 0, 0.25]} scale={[1.5, 0.05, 0.9]}>
            <coneGeometry args={[0.7, 2, 5]} />
            <meshPhysicalMaterial color="#1a3550" roughness={0.4} side={THREE.DoubleSide} />
          </mesh>
          <mesh position={[0, 0, -1.2]} rotation={[-Math.PI / 2, 0, -0.25]} scale={[1.5, 0.05, 0.9]}>
            <coneGeometry args={[0.7, 2, 5]} />
            <meshPhysicalMaterial color="#1a3550" roughness={0.4} side={THREE.DoubleSide} />
          </mesh>
        </group>
      </group>
    </group>
  );
};

// ═══════════════════════════════════════════════
// ═══════════════════════════════════════════════
// OCTOPUS — Flowing tentacles with individual segments
// ═══════════════════════════════════════════════
const Octopus = ({ startPos, size, color, speed, direction, depthMin, depthMax }) => {
  const groupRef = useRef();
  const headRef = useRef();
  const tentRefs = useRef([]);
  const timeOffset = useMemo(() => Math.random() * 100, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() + timeOffset;
    const g = groupRef.current;
    if (!g) return;

    const opacity = getZoneOpacity(scrollState.progress, depthMin, depthMax);
    g.visible = opacity > 0.01;
    if (!g.visible) return;

    g.position.x += speed * direction * 0.007;
    if (direction > 0 && g.position.x > 26) g.position.x = -26;
    if (direction < 0 && g.position.x < -26) g.position.x = 26;
    g.position.y = startPos[1] + Math.sin(t * 0.35) * 2 + Math.sin(t * 0.13) * 1;
    g.position.z = startPos[2] + Math.cos(t * 0.25) * 1.5;
    g.rotation.y = direction > 0 ? -0.3 : Math.PI + 0.3;

    if (headRef.current) {
      headRef.current.rotation.x = Math.sin(t * 0.6) * 0.12;
      headRef.current.rotation.z = Math.cos(t * 0.4) * 0.08;
    }

    // Animate tentacles — flowing organic wave
    tentRefs.current.forEach((ref, i) => {
      if (!ref) return;
      const phase = i * 0.8;
      ref.rotation.x = Math.sin(t * 1.8 + phase) * 0.5;
      ref.rotation.z = Math.cos(t * 1.4 + phase * 0.7) * 0.35;
      // Children segments get more wave
      if (ref.children) {
        ref.children.forEach((child, ci) => {
          if (child.isGroup || child.isObject3D) {
            child.rotation.x = Math.sin(t * 1.6 + phase + ci * 0.6) * (0.2 + ci * 0.12);
            child.rotation.z = Math.cos(t * 1.2 + phase + ci * 0.5) * (0.15 + ci * 0.08);
          }
        });
      }
    });

    g.scale.setScalar(size * Math.min(opacity, 1));
  });

  const col = new THREE.Color(color);
  const tentCol = col.clone().multiplyScalar(0.85);
  const suckerCol = col.clone().lerp(new THREE.Color('#ffccaa'), 0.4);

  const tentacleAngles = useMemo(() => Array.from({ length: 8 }).map((_, i) => (i / 8) * Math.PI * 2), []);

  return (
    <group ref={groupRef} position={startPos} scale={size}>
      <group ref={headRef}>
        {/* Mantle */}
        <mesh position={[0, 0.6, 0]} scale={[0.85, 1.1, 0.8]}>
          <sphereGeometry args={[1, 20, 16]} />
          <meshPhysicalMaterial color={col} roughness={0.25} metalness={0.2} clearcoat={0.6} clearcoatRoughness={0.15} emissive={col} emissiveIntensity={0.1} />
        </mesh>
        {/* Spots */}
        {[...Array(6)].map((_, i) => {
          const a = (i / 6) * Math.PI * 2;
          return (
            <mesh key={i} position={[Math.cos(a) * 0.65, 0.7 + Math.sin(a * 2) * 0.3, Math.sin(a) * 0.6]} scale={0.12}>
              <sphereGeometry args={[1, 6, 6]} />
              <meshPhysicalMaterial color={col} roughness={0.2} transparent opacity={0.4} clearcoat={0.8} />
            </mesh>
          );
        })}
        {/* Eyes */}
        <group position={[0.55, 0.3, 0.5]}>
          <mesh scale={[0.22, 0.18, 0.15]}><sphereGeometry args={[1, 12, 12]} /><meshPhysicalMaterial color="#e8e4d0" roughness={0.1} clearcoat={1} /></mesh>
          <mesh position={[0.06, 0, 0.04]} scale={[0.14, 0.16, 0.1]}><sphereGeometry args={[1, 10, 10]} /><meshStandardMaterial color="#1a1a1a" metalness={0.9} /></mesh>
          <mesh position={[0.09, 0.03, 0.06]} scale={0.035}><sphereGeometry args={[1, 6, 6]} /><meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={0.5} /></mesh>
        </group>
        <group position={[0.55, 0.3, -0.5]}>
          <mesh scale={[0.22, 0.18, 0.15]}><sphereGeometry args={[1, 12, 12]} /><meshPhysicalMaterial color="#e8e4d0" roughness={0.1} clearcoat={1} /></mesh>
          <mesh position={[0.06, 0, -0.04]} scale={[0.14, 0.16, 0.1]}><sphereGeometry args={[1, 10, 10]} /><meshStandardMaterial color="#1a1a1a" metalness={0.9} /></mesh>
          <mesh position={[0.09, 0.03, -0.06]} scale={0.035}><sphereGeometry args={[1, 6, 6]} /><meshStandardMaterial color="#fff" emissive="#fff" emissiveIntensity={0.5} /></mesh>
        </group>
        {/* Siphon */}
        <mesh position={[0.4, -0.3, 0]} rotation={[0, 0, 0.4]} scale={[0.15, 0.25, 0.12]}>
          <cylinderGeometry args={[0.8, 1, 1, 6]} />
          <meshPhysicalMaterial color={col} roughness={0.3} clearcoat={0.3} />
        </mesh>
      </group>

      {/* 8 Tentacles — each with 4 segments */}
      {tentacleAngles.map((angle, tIdx) => {
        const baseX = Math.cos(angle) * 0.6;
        const baseZ = Math.sin(angle) * 0.6;
        return (
          <group key={tIdx} ref={el => { tentRefs.current[tIdx] = el; }} position={[baseX, -0.7, baseZ]}>
            <mesh scale={[0.16, 0.5, 0.16]}>
              <cylinderGeometry args={[1, 0.8, 1, 6]} />
              <meshPhysicalMaterial color={tentCol} roughness={0.35} metalness={0.15} clearcoat={0.4} emissive={tentCol} emissiveIntensity={0.05} />
            </mesh>
            <mesh position={[0, -0.15, 0]} scale={0.05}><sphereGeometry args={[1, 5, 5]} /><meshStandardMaterial color={suckerCol} /></mesh>
            <group position={[0, -0.5, 0]}>
              <mesh scale={[0.13, 0.45, 0.13]}>
                <cylinderGeometry args={[1, 0.75, 1, 6]} />
                <meshPhysicalMaterial color={tentCol} roughness={0.35} clearcoat={0.3} />
              </mesh>
              <mesh position={[0, -0.12, 0]} scale={0.04}><sphereGeometry args={[1, 5, 5]} /><meshStandardMaterial color={suckerCol} /></mesh>
              <group position={[0, -0.45, 0]}>
                <mesh scale={[0.1, 0.4, 0.1]}>
                  <cylinderGeometry args={[1, 0.7, 1, 5]} />
                  <meshPhysicalMaterial color={tentCol} roughness={0.4} clearcoat={0.2} />
                </mesh>
                <group position={[0, -0.4, 0]}>
                  <mesh scale={[0.07, 0.35, 0.07]}>
                    <cylinderGeometry args={[1, 0.5, 1, 4]} />
                    <meshPhysicalMaterial color={tentCol} roughness={0.4} />
                  </mesh>
                </group>
              </group>
            </group>
          </group>
        );
      })}
    </group>
  );
};

// ═══════════════════════════════════════════════
// SCENE — Cinematic lighting + all creatures
// ═══════════════════════════════════════════════
const OceanScene = () => {
  return (
    <>
      {/* Cinematic lighting */}
      <ambientLight intensity={0.15} color="#0a3050" />
      <directionalLight position={[15, 20, 10]} intensity={0.45} color="#4a9fd4" />
      <directionalLight position={[-10, -5, -8]} intensity={0.15} color="#1a5080" />
      <pointLight position={[0, 15, 5]} intensity={0.3} color="#38bdf8" distance={50} />
      <pointLight position={[0, -15, -5]} intensity={0.1} color="#064e7a" distance={40} />

      {/* ═══ SURFACE (0-35%): Tropical fish + Seahorses ═══ */}
      <TropicalFish startPos={[-18, 5, -5]} speed={2.2} size={0.55} bodyColor="#ff6b35" accentColor="#ffd23f" wobbleAmp={1.3} wobbleFreq={0.9} direction={1} depthMin={0} depthMax={0.35} />
      <TropicalFish startPos={[12, 7, -7]} speed={1.7} size={0.45} bodyColor="#22d3ee" accentColor="#06b6d4" wobbleAmp={1.6} wobbleFreq={0.75} direction={-1} depthMin={0} depthMax={0.35} />
      <TropicalFish startPos={[-5, 3, -4]} speed={2.5} size={0.5} bodyColor="#f472b6" accentColor="#ec4899" wobbleAmp={1.1} wobbleFreq={1.1} direction={1} depthMin={0} depthMax={0.35} />
      <TropicalFish startPos={[20, 4, -6]} speed={1.4} size={0.6} bodyColor="#a3e635" accentColor="#84cc16" wobbleAmp={1.8} wobbleFreq={0.65} direction={-1} depthMin={0} depthMax={0.35} />
      <TropicalFish startPos={[6, 6, -8]} speed={1.9} size={0.4} bodyColor="#fbbf24" accentColor="#f59e0b" wobbleAmp={1.0} wobbleFreq={1.0} direction={1} depthMin={0} depthMax={0.35} />
      <Seahorse startPos={[-10, 3, -5]} size={0.5} color="#f97316" speed={0.5} direction={1} depthMin={0.05} depthMax={0.3} />
      <Seahorse startPos={[15, 5, -6]} size={0.4} color="#fbbf24" speed={0.3} direction={-1} depthMin={0.05} depthMax={0.3} />

      {/* ═══ MID-DEPTH (20-50%): Jellyfish ═══ */}
      <Jellyfish startPos={[-9, 4, -6]} size={0.9} color="#c084fc" speed={0.9} direction={1} depthMin={0.18} depthMax={0.52} />
      <Jellyfish startPos={[14, -1, -5]} size={0.65} color="#f0abfc" speed={0.5} direction={-1} depthMin={0.2} depthMax={0.55} />
      <Jellyfish startPos={[4, 6, -8]} size={1.1} color="#818cf8" speed={0.7} direction={1} depthMin={0.22} depthMax={0.5} />
      <Jellyfish startPos={[-16, 2, -7]} size={0.5} color="#a78bfa" speed={0.4} direction={-1} depthMin={0.2} depthMax={0.48} />

      {/* ═══ MID-DEEP (38-68%): Manta Rays + Octopus ═══ */}
      <MantaRay startPos={[-14, -1, -6]} size={1.1} speed={1.6} direction={1} depthMin={0.35} depthMax={0.68} />
      <MantaRay startPos={[18, 2, -8]} size={0.85} speed={1.2} direction={-1} depthMin={0.38} depthMax={0.7} />
      <Octopus startPos={[-8, 0, -5]} size={1.0} color="#c0392b" speed={0.8} direction={1} depthMin={0.35} depthMax={0.68} />
      <Octopus startPos={[12, 3, -7]} size={0.75} color="#8e44ad" speed={0.6} direction={-1} depthMin={0.4} depthMax={0.72} />

      {/* ═══ DEEP (50-82%): Sharks ═══ */}
      <Shark startPos={[-22, -1, -7]} size={1.3} speed={2.2} direction={1} depthMin={0.48} depthMax={0.82} />
      <Shark startPos={[24, 2, -9]} size={1.0} speed={1.7} direction={-1} depthMin={0.52} depthMax={0.85} />

      {/* ═══ DEEP (55-88%): Whale ═══ */}
      <Whale startPos={[-28, -3, -14]} size={0.65} speed={1.0} direction={1} depthMin={0.53} depthMax={0.88} />

      {/* ═══ ABYSS (72-100%): Anglerfish ═══ */}
      <Anglerfish startPos={[-12, -2, -5]} size={0.85} speed={0.9} direction={1} depthMin={0.7} depthMax={1.0} />
      <Anglerfish startPos={[16, 1, -7]} size={0.65} speed={0.6} direction={-1} depthMin={0.75} depthMax={1.0} />
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
