import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const Fish = ({ startPos, speed, size, color, wobbleAmp, wobbleFreq, direction }) => {
  const groupRef = useRef();
  const tailRef = useRef();
  const bodyRef = useRef();
  const timeOffset = useMemo(() => Math.random() * 100, []);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() + timeOffset;
    const g = groupRef.current;
    if (!g) return;

    // Swim across screen
    g.position.x += speed * direction * 0.016;

    // Wrap around
    if (direction > 0 && g.position.x > 25) g.position.x = -25;
    if (direction < 0 && g.position.x < -25) g.position.x = 25;

    // Vertical wobble
    g.position.y = startPos[1] + Math.sin(t * wobbleFreq) * wobbleAmp;

    // Slight z wobble
    g.position.z = startPos[2] + Math.cos(t * wobbleFreq * 0.7) * wobbleAmp * 0.5;

    // Face direction + slight pitch/yaw
    g.rotation.y = direction > 0 ? 0 : Math.PI;
    g.rotation.z = Math.sin(t * wobbleFreq) * 0.1;
    g.rotation.x = Math.cos(t * wobbleFreq * 0.5) * 0.05;

    // Tail wag
    if (tailRef.current) {
      tailRef.current.rotation.y = Math.sin(t * 8) * 0.4;
    }

    // Body flex
    if (bodyRef.current) {
      bodyRef.current.rotation.y = Math.sin(t * 6) * 0.08;
    }
  });

  const bodyColor = new THREE.Color(color);
  const finColor = bodyColor.clone().multiplyScalar(0.7);
  const bellyColor = bodyColor.clone().lerp(new THREE.Color(0xffffff), 0.4);

  return (
    <group ref={groupRef} position={startPos} scale={size}>
      {/* Main body */}
      <group ref={bodyRef}>
        <mesh>
          <sphereGeometry args={[1, 16, 12]} />
          <meshStandardMaterial color={bodyColor} roughness={0.3} metalness={0.4} emissive={bodyColor} emissiveIntensity={0.15} />
        </mesh>
        {/* Body stretch */}
        <mesh scale={[1.6, 0.8, 0.7]}>
          <sphereGeometry args={[1, 16, 12]} />
          <meshStandardMaterial color={bodyColor} roughness={0.3} metalness={0.4} emissive={bodyColor} emissiveIntensity={0.1} />
        </mesh>
        {/* Belly */}
        <mesh position={[0, -0.3, 0]} scale={[1.4, 0.5, 0.6]}>
          <sphereGeometry args={[1, 12, 8]} />
          <meshStandardMaterial color={bellyColor} roughness={0.4} metalness={0.2} emissive={bellyColor} emissiveIntensity={0.05} />
        </mesh>

        {/* Eye right */}
        <mesh position={[0.7, 0.2, 0.45]}>
          <sphereGeometry args={[0.18, 8, 8]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.3} />
        </mesh>
        <mesh position={[0.82, 0.2, 0.52]}>
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshStandardMaterial color="#000000" />
        </mesh>

        {/* Eye left */}
        <mesh position={[0.7, 0.2, -0.45]}>
          <sphereGeometry args={[0.18, 8, 8]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.3} />
        </mesh>
        <mesh position={[0.82, 0.2, -0.52]}>
          <sphereGeometry args={[0.1, 8, 8]} />
          <meshStandardMaterial color="#000000" />
        </mesh>

        {/* Dorsal fin */}
        <mesh position={[0, 0.8, 0]} rotation={[0, 0, -0.3]} scale={[1.2, 0.6, 0.08]}>
          <coneGeometry args={[0.8, 1.5, 4]} />
          <meshStandardMaterial color={finColor} roughness={0.5} transparent opacity={0.85} emissive={finColor} emissiveIntensity={0.1} side={THREE.DoubleSide} />
        </mesh>

        {/* Pectoral fins */}
        <mesh position={[0.2, -0.3, 0.6]} rotation={[0.5, 0.3, 0.8]} scale={[0.6, 0.15, 0.8]}>
          <coneGeometry args={[0.6, 1, 4]} />
          <meshStandardMaterial color={finColor} roughness={0.5} transparent opacity={0.7} side={THREE.DoubleSide} />
        </mesh>
        <mesh position={[0.2, -0.3, -0.6]} rotation={[-0.5, -0.3, 0.8]} scale={[0.6, 0.15, 0.8]}>
          <coneGeometry args={[0.6, 1, 4]} />
          <meshStandardMaterial color={finColor} roughness={0.5} transparent opacity={0.7} side={THREE.DoubleSide} />
        </mesh>
      </group>

      {/* Tail section */}
      <group ref={tailRef} position={[-1.4, 0, 0]}>
        {/* Tail connector */}
        <mesh scale={[0.8, 0.5, 0.4]}>
          <sphereGeometry args={[0.8, 8, 8]} />
          <meshStandardMaterial color={bodyColor} roughness={0.3} metalness={0.3} emissive={bodyColor} emissiveIntensity={0.1} />
        </mesh>
        {/* Tail fin top */}
        <mesh position={[-0.8, 0.4, 0]} rotation={[0, 0, 0.6]} scale={[1, 0.5, 0.06]}>
          <coneGeometry args={[0.7, 1.2, 4]} />
          <meshStandardMaterial color={finColor} roughness={0.4} transparent opacity={0.8} emissive={finColor} emissiveIntensity={0.15} side={THREE.DoubleSide} />
        </mesh>
        {/* Tail fin bottom */}
        <mesh position={[-0.8, -0.4, 0]} rotation={[0, 0, -0.6]} scale={[1, 0.5, 0.06]}>
          <coneGeometry args={[0.7, 1.2, 4]} />
          <meshStandardMaterial color={finColor} roughness={0.4} transparent opacity={0.8} emissive={finColor} emissiveIntensity={0.15} side={THREE.DoubleSide} />
        </mesh>
      </group>
    </group>
  );
};

const fishConfigs = [
  { color: '#22d3ee', size: 0.5, speed: 1.8, y: 3, z: -5, wobbleAmp: 1.5, wobbleFreq: 0.8, direction: 1 },
  { color: '#0ea5e9', size: 0.7, speed: 1.2, y: -2, z: -3, wobbleAmp: 2, wobbleFreq: 0.6, direction: -1 },
  { color: '#f97316', size: 0.4, speed: 2.2, y: 5, z: -8, wobbleAmp: 1, wobbleFreq: 1.2, direction: 1 },
  { color: '#a855f7', size: 0.55, speed: 1.5, y: -4, z: -6, wobbleAmp: 1.8, wobbleFreq: 0.9, direction: -1 },
  { color: '#34d399', size: 0.6, speed: 1.0, y: 1, z: -4, wobbleAmp: 2.5, wobbleFreq: 0.5, direction: 1 },
  { color: '#fb923c', size: 0.35, speed: 2.5, y: 6, z: -10, wobbleAmp: 0.8, wobbleFreq: 1.4, direction: -1 },
  { color: '#38bdf8', size: 0.65, speed: 0.9, y: -5, z: -7, wobbleAmp: 2.2, wobbleFreq: 0.7, direction: 1 },
  { color: '#e879f9', size: 0.45, speed: 1.7, y: 4, z: -9, wobbleAmp: 1.3, wobbleFreq: 1.0, direction: -1 },
  { color: '#2dd4bf', size: 0.5, speed: 1.3, y: -1, z: -5, wobbleAmp: 1.6, wobbleFreq: 0.85, direction: 1 },
  { color: '#60a5fa', size: 0.55, speed: 1.6, y: 2, z: -6, wobbleAmp: 1.4, wobbleFreq: 0.75, direction: -1 },
];

const FishScene = () => {
  return (
    <>
      <ambientLight intensity={0.3} color="#22d3ee" />
      <directionalLight position={[10, 10, 5]} intensity={0.5} color="#38bdf8" />
      <pointLight position={[-10, -5, -5]} intensity={0.3} color="#0ea5e9" />

      {fishConfigs.map((cfg, i) => (
        <Fish
          key={i}
          startPos={[(Math.random() - 0.5) * 40, cfg.y, cfg.z]}
          speed={cfg.speed}
          size={cfg.size}
          color={cfg.color}
          wobbleAmp={cfg.wobbleAmp}
          wobbleFreq={cfg.wobbleFreq}
          direction={cfg.direction}
        />
      ))}
    </>
  );
};

const SwimmingFish3D = () => {
  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 5 }}
    >
      <Canvas
        camera={{ position: [0, 0, 20], fov: 60 }}
        gl={{ alpha: true, antialias: true, powerPreference: 'low-power' }}
        dpr={[1, 1.5]}
        style={{ background: 'transparent' }}
      >
        <FishScene />
      </Canvas>
    </div>
  );
};

export default SwimmingFish3D;
