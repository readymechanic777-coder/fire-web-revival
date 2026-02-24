import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// === DEPTH ZONES ===
// Zone 1 (Surface, y: 8 to 2): Tropical fish, dolphins
// Zone 2 (Shallow, y: 2 to -4): Sea turtles, jellyfish, clownfish schools
// Zone 3 (Mid, y: -4 to -10): Manta rays, swordfish, larger jellyfish
// Zone 4 (Deep, y: -10 to -18): Anglerfish (bioluminescent), giant squid, whale

// === BASE FISH ===
const SwimmingFish = ({ color, size = 1, startSide = "left", yRange, speed = 1, wobble = 1 }) => {
  const ref = useRef();
  const offset = useMemo(() => Math.random() * Math.PI * 2, []);
  const startX = startSide === "left" ? -25 : 25;
  const endX = startSide === "left" ? 25 : -25;
  const zPos = useMemo(() => -5 - Math.random() * 15, []);
  const yBase = useMemo(() => yRange[0] + Math.random() * (yRange[1] - yRange[0]), []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = (clock.getElapsedTime() * speed * 0.15 + offset) % 1;
    const x = startX + (endX - startX) * t;
    ref.current.position.x = x;
    ref.current.position.y = yBase + Math.sin(clock.getElapsedTime() * wobble + offset) * 0.8;
    ref.current.position.z = zPos + Math.sin(clock.getElapsedTime() * 0.3 + offset) * 2;
    // Face movement direction
    ref.current.rotation.y = startSide === "left" ? 0 : Math.PI;
    // Tail wiggle
    if (ref.current.children[1]) {
      ref.current.children[1].rotation.y = Math.sin(clock.getElapsedTime() * 5 * speed) * 0.4;
    }
  });

  return (
    <group ref={ref}>
      <mesh>
        <sphereGeometry args={[0.3 * size, 8, 6]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.6} transparent opacity={0.85} />
      </mesh>
      <mesh position={[-0.35 * size, 0, 0]}>
        <coneGeometry args={[0.2 * size, 0.4 * size, 4]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.6} transparent opacity={0.8} />
      </mesh>
      <mesh position={[0, 0.2 * size, 0]} rotation={[0, 0, Math.PI / 6]}>
        <coneGeometry args={[0.08 * size, 0.2 * size, 3]} />
        <meshStandardMaterial color={color} roughness={0.4} metalness={0.5} transparent opacity={0.7} />
      </mesh>
    </group>
  );
};

// === SCHOOL OF FISH (swim across from one side) ===
const FishSchool = ({ count = 6, side = "left", yRange, color, size = 0.5, speed = 1 }) => {
  const fishData = useMemo(() =>
    Array.from({ length: count }, (_, i) => ({
      id: i,
      speed: speed * (0.8 + Math.random() * 0.4),
      size: size * (0.8 + Math.random() * 0.4),
    })), [count, speed, size]
  );

  return (
    <>
      {fishData.map((f) => (
        <SwimmingFish
          key={f.id}
          color={color}
          size={f.size}
          startSide={side}
          yRange={yRange}
          speed={f.speed}
          wobble={0.8 + Math.random() * 0.6}
        />
      ))}
    </>
  );
};

// === JELLYFISH (drift slowly from sides) ===
const Jellyfish = ({ position, color = "#4de8ff", size = 1, driftDir = 1 }) => {
  const ref = useRef();
  const tentacleRefs = useRef([]);
  const offset = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime() + offset;
    ref.current.position.y = position[1] + Math.sin(t * 0.4) * 1.5;
    ref.current.position.x = position[0] + Math.sin(t * 0.15) * 8 * driftDir;
    ref.current.position.z = position[2] + Math.cos(t * 0.1) * 2;
    const pulse = 1 + Math.sin(t * 2) * 0.15;
    ref.current.scale.set(pulse, 1 / pulse, pulse);
    tentacleRefs.current.forEach((tent, i) => {
      if (tent) {
        tent.rotation.x = Math.sin(t * 1.5 + i * 0.5) * 0.3;
        tent.rotation.z = Math.sin(t * 1.2 + i * 0.8) * 0.15;
      }
    });
  });

  return (
    <group ref={ref} position={position}>
      <mesh>
        <sphereGeometry args={[0.5 * size, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial
          color={color} roughness={0.1} metalness={0.3} transparent opacity={0.5}
          side={THREE.DoubleSide} emissive={color} emissiveIntensity={0.3}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[0.35 * size, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color={color} transparent opacity={0.25} emissive={color} emissiveIntensity={0.5} />
      </mesh>
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <mesh
          key={i}
          ref={(el) => (tentacleRefs.current[i] = el)}
          position={[
            Math.sin((i / 6) * Math.PI * 2) * 0.25 * size,
            -0.2 * size,
            Math.cos((i / 6) * Math.PI * 2) * 0.25 * size,
          ]}
        >
          <cylinderGeometry args={[0.02 * size, 0.01 * size, 1.2 * size, 4]} />
          <meshStandardMaterial color={color} transparent opacity={0.35} emissive={color} emissiveIntensity={0.2} />
        </mesh>
      ))}
    </group>
  );
};

// === SEA TURTLE (crosses screen from side) ===
const SeaTurtle = ({ startSide = "left", yRange, speed = 0.3 }) => {
  const ref = useRef();
  const flipperRefs = useRef([]);
  const offset = useMemo(() => Math.random() * Math.PI * 2, []);
  const startX = startSide === "left" ? -20 : 20;
  const endX = startSide === "left" ? 20 : -20;
  const yBase = useMemo(() => yRange[0] + Math.random() * (yRange[1] - yRange[0]), []);
  const zPos = useMemo(() => -5 - Math.random() * 10, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = (clock.getElapsedTime() * speed * 0.08 + offset) % 1;
    ref.current.position.x = startX + (endX - startX) * t;
    ref.current.position.y = yBase + Math.sin(clock.getElapsedTime() * 0.5) * 0.8;
    ref.current.position.z = zPos;
    ref.current.rotation.y = startSide === "left" ? -Math.PI / 2 : Math.PI / 2;
    flipperRefs.current.forEach((f, i) => {
      if (f) f.rotation.z = Math.sin(clock.getElapsedTime() * 2 + i * Math.PI) * 0.5 * (i < 2 ? 1 : -1);
    });
  });

  return (
    <group ref={ref}>
      <mesh><sphereGeometry args={[0.6, 12, 8]} /><meshStandardMaterial color="#2a8a5e" roughness={0.7} metalness={0.2} /></mesh>
      <mesh position={[0, -0.1, 0]}><sphereGeometry args={[0.55, 12, 8]} /><meshStandardMaterial color="#3aaa6e" roughness={0.8} /></mesh>
      <mesh position={[0.6, 0, 0]}><sphereGeometry args={[0.2, 8, 6]} /><meshStandardMaterial color="#3aaa6e" roughness={0.6} /></mesh>
      {[[0.3, 0, 0.5], [0.3, 0, -0.5], [-0.3, 0, 0.5], [-0.3, 0, -0.5]].map((pos, i) => (
        <mesh key={i} ref={(el) => (flipperRefs.current[i] = el)} position={pos}>
          <boxGeometry args={[0.4, 0.05, 0.2]} />
          <meshStandardMaterial color="#2a8a5e" roughness={0.6} />
        </mesh>
      ))}
    </group>
  );
};

// === MANTA RAY (glides across from side) ===
const MantaRay = ({ startSide = "right", yRange, speed = 0.2 }) => {
  const ref = useRef();
  const offset = useMemo(() => Math.random() * Math.PI * 2, []);
  const startX = startSide === "left" ? -25 : 25;
  const endX = startSide === "left" ? 25 : -25;
  const yBase = useMemo(() => yRange[0] + Math.random() * (yRange[1] - yRange[0]), []);
  const zPos = useMemo(() => -8 - Math.random() * 8, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = (clock.getElapsedTime() * speed * 0.06 + offset) % 1;
    ref.current.position.x = startX + (endX - startX) * t;
    ref.current.position.y = yBase + Math.sin(clock.getElapsedTime() * 0.4) * 1;
    ref.current.position.z = zPos;
    ref.current.rotation.y = startSide === "left" ? 0 : Math.PI;
    if (ref.current.children[1]) ref.current.children[1].rotation.z = Math.sin(clock.getElapsedTime() * 1.5) * 0.3;
    if (ref.current.children[2]) ref.current.children[2].rotation.z = -Math.sin(clock.getElapsedTime() * 1.5) * 0.3;
  });

  return (
    <group ref={ref}>
      <mesh><sphereGeometry args={[0.5, 8, 6]} /><meshStandardMaterial color="#1a3a5c" roughness={0.5} metalness={0.4} /></mesh>
      <mesh position={[0, 0, 1]}><boxGeometry args={[0.8, 0.05, 1.5]} /><meshStandardMaterial color="#1a4a6c" roughness={0.5} metalness={0.3} /></mesh>
      <mesh position={[0, 0, -1]}><boxGeometry args={[0.8, 0.05, 1.5]} /><meshStandardMaterial color="#1a4a6c" roughness={0.5} metalness={0.3} /></mesh>
      <mesh position={[-1, 0, 0]}><cylinderGeometry args={[0.03, 0.01, 1.5, 4]} /><meshStandardMaterial color="#1a3a5c" roughness={0.6} /></mesh>
    </group>
  );
};

// === ANGLERFISH (deep zone, bioluminescent) ===
const Anglerfish = ({ startSide = "left", yRange }) => {
  const ref = useRef();
  const lightRef = useRef();
  const offset = useMemo(() => Math.random() * Math.PI * 2, []);
  const startX = startSide === "left" ? -20 : 20;
  const endX = startSide === "left" ? 20 : -20;
  const yBase = useMemo(() => yRange[0] + Math.random() * (yRange[1] - yRange[0]), []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = (clock.getElapsedTime() * 0.05 + offset) % 1;
    ref.current.position.x = startX + (endX - startX) * t;
    ref.current.position.y = yBase + Math.sin(clock.getElapsedTime() * 0.3) * 0.5;
    ref.current.position.z = -8 - Math.sin(clock.getElapsedTime() * 0.2) * 3;
    ref.current.rotation.y = startSide === "left" ? 0 : Math.PI;
    if (lightRef.current) {
      lightRef.current.intensity = 1.5 + Math.sin(clock.getElapsedTime() * 3) * 0.8;
    }
  });

  return (
    <group ref={ref}>
      <mesh><sphereGeometry args={[0.5, 8, 8]} /><meshStandardMaterial color="#1a1a2e" roughness={0.9} metalness={0.1} /></mesh>
      <mesh position={[0.3, 0, 0]}><sphereGeometry args={[0.25, 6, 6]} /><meshStandardMaterial color="#0d0d1a" roughness={0.9} /></mesh>
      {/* Bioluminescent lure */}
      <mesh position={[0.6, 0.8, 0]}>
        <sphereGeometry args={[0.1, 8, 8]} />
        <meshStandardMaterial color="#00ffaa" emissive="#00ffaa" emissiveIntensity={2} transparent opacity={0.9} />
      </mesh>
      <pointLight ref={lightRef} position={[0.6, 0.8, 0]} color="#00ffaa" intensity={1.5} distance={8} />
      {/* Lure stalk */}
      <mesh position={[0.5, 0.5, 0]} rotation={[0, 0, -0.6]}>
        <cylinderGeometry args={[0.015, 0.01, 0.7, 4]} />
        <meshStandardMaterial color="#222244" roughness={0.8} />
      </mesh>
      {/* Eyes */}
      <mesh position={[0.4, 0.15, 0.15]}><sphereGeometry args={[0.06, 6, 6]} /><meshStandardMaterial color="#88ff88" emissive="#88ff88" emissiveIntensity={0.8} /></mesh>
      <mesh position={[0.4, 0.15, -0.15]}><sphereGeometry args={[0.06, 6, 6]} /><meshStandardMaterial color="#88ff88" emissive="#88ff88" emissiveIntensity={0.8} /></mesh>
    </group>
  );
};

// === WHALE (deep, massive, crosses slowly) ===
const Whale = ({ startSide = "right", yRange }) => {
  const ref = useRef();
  const offset = useMemo(() => Math.random() * Math.PI * 2, []);
  const startX = startSide === "left" ? -35 : 35;
  const endX = startSide === "left" ? 35 : -35;
  const yBase = useMemo(() => yRange[0] + Math.random() * (yRange[1] - yRange[0]), []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = (clock.getElapsedTime() * 0.02 + offset) % 1;
    ref.current.position.x = startX + (endX - startX) * t;
    ref.current.position.y = yBase + Math.sin(clock.getElapsedTime() * 0.2) * 1;
    ref.current.position.z = -18;
    ref.current.rotation.y = startSide === "left" ? 0 : Math.PI;
  });

  return (
    <group ref={ref}>
      {/* Body */}
      <mesh scale={[2.5, 1, 1]}><sphereGeometry args={[1.2, 12, 10]} /><meshStandardMaterial color="#1a2a4a" roughness={0.7} metalness={0.2} /></mesh>
      {/* Head */}
      <mesh position={[2.5, 0.2, 0]}><sphereGeometry args={[0.9, 10, 8]} /><meshStandardMaterial color="#1a2a4a" roughness={0.7} metalness={0.2} /></mesh>
      {/* Tail */}
      <mesh position={[-3, 0.3, 0]} rotation={[0, 0, 0.3]}>
        <boxGeometry args={[0.6, 0.08, 2]} />
        <meshStandardMaterial color="#1a3a5a" roughness={0.6} />
      </mesh>
      {/* Eye */}
      <mesh position={[2.8, 0.4, 0.7]}><sphereGeometry args={[0.08, 6, 6]} /><meshStandardMaterial color="#446688" /></mesh>
    </group>
  );
};

// === DOLPHIN (surface, playful arc) ===
const Dolphin = ({ startSide = "left", yRange }) => {
  const ref = useRef();
  const offset = useMemo(() => Math.random() * Math.PI * 2, []);
  const startX = startSide === "left" ? -22 : 22;
  const endX = startSide === "left" ? 22 : -22;
  const yBase = useMemo(() => yRange[0] + Math.random() * (yRange[1] - yRange[0]), []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = (clock.getElapsedTime() * 0.12 + offset) % 1;
    ref.current.position.x = startX + (endX - startX) * t;
    // Playful arcing motion
    ref.current.position.y = yBase + Math.sin(t * Math.PI * 3) * 2;
    ref.current.position.z = -6 + Math.sin(clock.getElapsedTime() * 0.5) * 2;
    ref.current.rotation.y = startSide === "left" ? 0 : Math.PI;
    ref.current.rotation.z = Math.cos(t * Math.PI * 3) * 0.4;
  });

  return (
    <group ref={ref}>
      <mesh scale={[1.5, 0.6, 0.6]}><sphereGeometry args={[0.4, 8, 6]} /><meshStandardMaterial color="#5588aa" roughness={0.4} metalness={0.5} /></mesh>
      <mesh position={[0.5, 0.1, 0]}><sphereGeometry args={[0.18, 6, 6]} /><meshStandardMaterial color="#6699bb" roughness={0.4} metalness={0.5} /></mesh>
      <mesh position={[-0.5, 0.15, 0]} rotation={[0, 0, 0.5]}>
        <coneGeometry args={[0.25, 0.5, 4]} />
        <meshStandardMaterial color="#5588aa" roughness={0.5} />
      </mesh>
      <mesh position={[0, 0.25, 0]} rotation={[0, 0, Math.PI / 5]}>
        <coneGeometry args={[0.08, 0.3, 3]} />
        <meshStandardMaterial color="#5588aa" roughness={0.5} />
      </mesh>
    </group>
  );
};

// === SWORDFISH (mid-depth, fast) ===
const Swordfish = ({ startSide = "right", yRange }) => {
  const ref = useRef();
  const offset = useMemo(() => Math.random() * Math.PI * 2, []);
  const startX = startSide === "left" ? -25 : 25;
  const endX = startSide === "left" ? 25 : -25;
  const yBase = useMemo(() => yRange[0] + Math.random() * (yRange[1] - yRange[0]), []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = (clock.getElapsedTime() * 0.18 + offset) % 1;
    ref.current.position.x = startX + (endX - startX) * t;
    ref.current.position.y = yBase + Math.sin(clock.getElapsedTime() * 0.6) * 0.5;
    ref.current.position.z = -7;
    ref.current.rotation.y = startSide === "left" ? 0 : Math.PI;
  });

  return (
    <group ref={ref}>
      <mesh scale={[2, 0.5, 0.5]}><sphereGeometry args={[0.3, 8, 6]} /><meshStandardMaterial color="#334466" roughness={0.3} metalness={0.6} /></mesh>
      {/* Sword */}
      <mesh position={[0.8, 0, 0]}><cylinderGeometry args={[0.02, 0.005, 0.8, 4]} rotation={[0, 0, Math.PI / 2]} /><meshStandardMaterial color="#667799" roughness={0.3} metalness={0.7} /></mesh>
      <mesh position={[-0.5, 0.1, 0]} rotation={[0, 0, 0.3]}>
        <coneGeometry args={[0.15, 0.35, 4]} />
        <meshStandardMaterial color="#334466" roughness={0.4} />
      </mesh>
    </group>
  );
};

// === BUBBLES ===
const BubbleParticles = ({ count = 80, range = 30 }) => {
  const ref = useRef();
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * range;
      arr[i * 3 + 1] = (Math.random() - 0.5) * range * 2;
      arr[i * 3 + 2] = (Math.random() - 0.5) * range;
    }
    return arr;
  }, [count, range]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const posArr = ref.current.geometry.attributes.position.array;
    for (let i = 0; i < count; i++) {
      posArr[i * 3 + 1] += 0.02 + Math.sin(clock.getElapsedTime() + i) * 0.005;
      if (posArr[i * 3 + 1] > range) posArr[i * 3 + 1] = -range;
    }
    ref.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.08} color="#88ddff" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
};

// === MAIN COMPONENT ===
const AquaticCreatures = () => {
  return (
    <>
      {/* ===== ZONE 1: SURFACE (y: 8 to 2) ===== */}
      {/* Dolphins leaping from both sides */}
      <Dolphin startSide="left" yRange={[4, 7]} />
      <Dolphin startSide="right" yRange={[3, 6]} />
      
      {/* Tropical fish schools from sides */}
      <FishSchool count={8} side="left" yRange={[3, 7]} color="#00ddff" size={0.5} speed={1.2} />
      <FishSchool count={6} side="right" yRange={[4, 7]} color="#ffaa33" size={0.4} speed={1} />
      <FishSchool count={10} side="left" yRange={[2, 5]} color="#ff6688" size={0.35} speed={1.4} />

      {/* ===== ZONE 2: SHALLOW (y: 2 to -4) ===== */}
      {/* Sea turtle crossing */}
      <SeaTurtle startSide="right" yRange={[0, 2]} speed={0.35} />
      <SeaTurtle startSide="left" yRange={[-2, 0]} speed={0.25} />
      
      {/* Jellyfish drifting */}
      <Jellyfish position={[-8, 1, -6]} color="#4de8ff" size={1.2} driftDir={1} />
      <Jellyfish position={[6, -1, -8]} color="#ff66cc" size={0.8} driftDir={-1} />
      
      {/* More fish schools */}
      <FishSchool count={7} side="right" yRange={[-3, 0]} color="#66ffcc" size={0.45} speed={0.9} />
      <FishSchool count={5} side="left" yRange={[-2, 1]} color="#ffcc44" size={0.6} speed={0.8} />

      {/* ===== ZONE 3: MID-DEPTH (y: -4 to -10) ===== */}
      {/* Manta ray gliding across */}
      <MantaRay startSide="right" yRange={[-6, -4]} speed={0.2} />
      <MantaRay startSide="left" yRange={[-8, -5]} speed={0.15} />
      
      {/* Swordfish darting through */}
      <Swordfish startSide="left" yRange={[-7, -5]} />
      <Swordfish startSide="right" yRange={[-9, -6]} />
      
      {/* Larger jellyfish */}
      <Jellyfish position={[-5, -6, -5]} color="#66ffaa" size={1.4} driftDir={1} />
      <Jellyfish position={[7, -8, -7]} color="#aa88ff" size={1.6} driftDir={-1} />
      
      {/* Deep fish schools */}
      <FishSchool count={6} side="right" yRange={[-9, -5]} color="#4488ff" size={0.5} speed={0.7} />

      {/* ===== ZONE 4: DEEP ABYSS (y: -10 to -18) ===== */}
      {/* Anglerfish with bioluminescent lure */}
      <Anglerfish startSide="left" yRange={[-15, -11]} />
      <Anglerfish startSide="right" yRange={[-17, -13]} />
      
      {/* Whale in the deep */}
      <Whale startSide="right" yRange={[-16, -12]} />
      
      {/* Deep jellyfish - bioluminescent colors */}
      <Jellyfish position={[-6, -13, -6]} color="#ff4488" size={1.8} driftDir={1} />
      <Jellyfish position={[5, -16, -8]} color="#44ffaa" size={1.2} driftDir={-1} />
      <Jellyfish position={[0, -14, -10]} color="#8844ff" size={2} driftDir={1} />
      
      {/* Sparse deep fish */}
      <FishSchool count={3} side="left" yRange={[-16, -12]} color="#22aaff" size={0.6} speed={0.4} />

      {/* ===== BUBBLES EVERYWHERE ===== */}
      <BubbleParticles count={100} range={30} />
    </>
  );
};

export default AquaticCreatures;
