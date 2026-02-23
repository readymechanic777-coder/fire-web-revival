import { useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

// Procedural fish geometry
const FishMesh = ({ color, size = 1, position, speed = 1, swimRadius = 5 }) => {
  const ref = useRef();
  const offset = useMemo(() => Math.random() * Math.PI * 2, []);
  const yOffset = useMemo(() => Math.random() * 2 - 1, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime() * speed + offset;
    ref.current.position.x = position[0] + Math.sin(t * 0.5) * swimRadius;
    ref.current.position.z = position[2] + Math.cos(t * 0.5) * swimRadius;
    ref.current.position.y = position[1] + Math.sin(t * 0.8) * yOffset;
    // Face direction of movement
    ref.current.rotation.y = Math.atan2(
      Math.cos(t * 0.5) * swimRadius * 0.5,
      -Math.sin(t * 0.5) * swimRadius * 0.5
    ) + Math.PI;
    // Tail wiggle
    ref.current.children[1].rotation.y = Math.sin(t * 4) * 0.4;
  });

  return (
    <group ref={ref} position={position}>
      {/* Body */}
      <mesh>
        <sphereGeometry args={[0.3 * size, 8, 6]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.6} transparent opacity={0.85} />
      </mesh>
      {/* Tail */}
      <mesh position={[-0.35 * size, 0, 0]}>
        <coneGeometry args={[0.2 * size, 0.4 * size, 4]} />
        <meshStandardMaterial color={color} roughness={0.3} metalness={0.6} transparent opacity={0.8} />
      </mesh>
      {/* Dorsal fin */}
      <mesh position={[0, 0.2 * size, 0]} rotation={[0, 0, Math.PI / 6]}>
        <coneGeometry args={[0.08 * size, 0.2 * size, 3]} />
        <meshStandardMaterial color={color} roughness={0.4} metalness={0.5} transparent opacity={0.7} />
      </mesh>
    </group>
  );
};

// Jellyfish with pulsing animation
const JellyfishMesh = ({ position, color = "#4de8ff", size = 1 }) => {
  const ref = useRef();
  const tentacleRefs = useRef([]);
  const offset = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime() + offset;
    // Gentle floating
    ref.current.position.y = position[1] + Math.sin(t * 0.4) * 1.5;
    ref.current.position.x = position[0] + Math.sin(t * 0.2) * 0.5;
    // Pulse
    const pulse = 1 + Math.sin(t * 2) * 0.15;
    ref.current.scale.set(pulse, 1 / pulse, pulse);
    // Tentacle sway
    tentacleRefs.current.forEach((tent, i) => {
      if (tent) {
        tent.rotation.x = Math.sin(t * 1.5 + i * 0.5) * 0.3;
        tent.rotation.z = Math.sin(t * 1.2 + i * 0.8) * 0.15;
      }
    });
  });

  return (
    <group ref={ref} position={position}>
      {/* Bell */}
      <mesh>
        <sphereGeometry args={[0.5 * size, 16, 12, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial
          color={color}
          roughness={0.1}
          metalness={0.3}
          transparent
          opacity={0.5}
          side={THREE.DoubleSide}
          emissive={color}
          emissiveIntensity={0.3}
        />
      </mesh>
      {/* Inner glow */}
      <mesh>
        <sphereGeometry args={[0.35 * size, 12, 8, 0, Math.PI * 2, 0, Math.PI / 2]} />
        <meshStandardMaterial color={color} transparent opacity={0.25} emissive={color} emissiveIntensity={0.5} />
      </mesh>
      {/* Tentacles */}
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

// Sea turtle
const TurtleMesh = ({ position, speed = 0.3 }) => {
  const ref = useRef();
  const flipperRefs = useRef([]);
  const offset = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime() * speed + offset;
    ref.current.position.x = position[0] + Math.sin(t * 0.3) * 8;
    ref.current.position.z = position[2] + Math.cos(t * 0.3) * 6;
    ref.current.position.y = position[1] + Math.sin(t * 0.5) * 0.8;
    ref.current.rotation.y = Math.atan2(
      Math.cos(t * 0.3) * 8 * 0.3,
      -Math.sin(t * 0.3) * 6 * 0.3
    ) + Math.PI;
    // Flipper animation
    flipperRefs.current.forEach((f, i) => {
      if (f) f.rotation.z = Math.sin(t * 2 + i * Math.PI) * 0.5 * (i < 2 ? 1 : -1);
    });
  });

  return (
    <group ref={ref} position={position}>
      {/* Shell */}
      <mesh>
        <sphereGeometry args={[0.6, 12, 8]} />
        <meshStandardMaterial color="#2a8a5e" roughness={0.7} metalness={0.2} />
      </mesh>
      <mesh position={[0, -0.1, 0]}>
        <sphereGeometry args={[0.55, 12, 8]} />
        <meshStandardMaterial color="#3aaa6e" roughness={0.8} />
      </mesh>
      {/* Head */}
      <mesh position={[0.6, 0, 0]}>
        <sphereGeometry args={[0.2, 8, 6]} />
        <meshStandardMaterial color="#3aaa6e" roughness={0.6} />
      </mesh>
      {/* Flippers */}
      {[[0.3, 0, 0.5], [0.3, 0, -0.5], [-0.3, 0, 0.5], [-0.3, 0, -0.5]].map((pos, i) => (
        <mesh key={i} ref={(el) => (flipperRefs.current[i] = el)} position={pos}>
          <boxGeometry args={[0.4, 0.05, 0.2]} />
          <meshStandardMaterial color="#2a8a5e" roughness={0.6} />
        </mesh>
      ))}
    </group>
  );
};

// Manta ray
const MantaRayMesh = ({ position, speed = 0.2 }) => {
  const ref = useRef();
  const offset = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime() * speed + offset;
    ref.current.position.x = position[0] + Math.sin(t * 0.25) * 10;
    ref.current.position.z = position[2] + Math.cos(t * 0.25) * 8;
    ref.current.position.y = position[1] + Math.sin(t * 0.4) * 1;
    ref.current.rotation.y = Math.atan2(
      Math.cos(t * 0.25) * 10 * 0.25,
      -Math.sin(t * 0.25) * 8 * 0.25
    ) + Math.PI;
    // Wing flap
    ref.current.children[1].rotation.z = Math.sin(t * 1.5) * 0.3;
    ref.current.children[2].rotation.z = -Math.sin(t * 1.5) * 0.3;
  });

  return (
    <group ref={ref} position={position}>
      {/* Body */}
      <mesh>
        <sphereGeometry args={[0.5, 8, 6]} />
        <meshStandardMaterial color="#1a3a5c" roughness={0.5} metalness={0.4} />
      </mesh>
      {/* Left wing */}
      <mesh position={[0, 0, 1]}>
        <boxGeometry args={[0.8, 0.05, 1.5]} />
        <meshStandardMaterial color="#1a4a6c" roughness={0.5} metalness={0.3} />
      </mesh>
      {/* Right wing */}
      <mesh position={[0, 0, -1]}>
        <boxGeometry args={[0.8, 0.05, 1.5]} />
        <meshStandardMaterial color="#1a4a6c" roughness={0.5} metalness={0.3} />
      </mesh>
      {/* Tail */}
      <mesh position={[-1, 0, 0]}>
        <cylinderGeometry args={[0.03, 0.01, 1.5, 4]} />
        <meshStandardMaterial color="#1a3a5c" roughness={0.6} />
      </mesh>
    </group>
  );
};

// Bubble particles
const BubbleParticles = ({ count = 60, range = 20 }) => {
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

// Small schooling fish
const FishSchool = ({ count = 8, center, color, size = 0.5 }) => {
  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <FishMesh
          key={i}
          color={color}
          size={size}
          position={[
            center[0] + (Math.random() - 0.5) * 3,
            center[1] + (Math.random() - 0.5) * 2,
            center[2] + (Math.random() - 0.5) * 3,
          ]}
          speed={0.4 + Math.random() * 0.3}
          swimRadius={3 + Math.random() * 3}
        />
      ))}
    </>
  );
};

const AquaticCreatures = () => {
  return (
    <>
      {/* Schools of fish at different depths */}
      <FishSchool count={6} center={[5, 2, -3]} color="#00ccff" size={0.6} />
      <FishSchool count={8} center={[-4, -2, 2]} color="#ffaa33" size={0.4} />
      <FishSchool count={5} center={[0, -6, -5]} color="#ff6688" size={0.5} />
      <FishSchool count={7} center={[6, -10, 3]} color="#66ffcc" size={0.35} />
      
      {/* Jellyfish */}
      <JellyfishMesh position={[-3, 4, -4]} color="#4de8ff" size={1.2} />
      <JellyfishMesh position={[4, -3, -6]} color="#ff66cc" size={0.8} />
      <JellyfishMesh position={[-5, -8, -3]} color="#66ffaa" size={1} />
      <JellyfishMesh position={[2, -14, -5]} color="#aa88ff" size={1.4} />
      
      {/* Sea turtle */}
      <TurtleMesh position={[0, -4, -5]} speed={0.35} />
      
      {/* Manta ray - deep */}
      <MantaRayMesh position={[0, -12, -8]} speed={0.2} />
      
      {/* Bubbles */}
      <BubbleParticles count={80} range={25} />
    </>
  );
};

export default AquaticCreatures;
