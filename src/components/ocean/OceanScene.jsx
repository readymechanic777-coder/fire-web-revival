import { Canvas } from "@react-three/fiber";
import { Suspense, useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import AquaticCreatures from "./AquaticCreatures";

// Underwater light rays (god rays) - stronger at surface
const GodRays = () => {
  const ref = useRef();
  
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.z = Math.sin(clock.getElapsedTime() * 0.1) * 0.1;
  });

  return (
    <group ref={ref}>
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <mesh key={i} position={[i * 4 - 12, 15, -18]} rotation={[0, 0, (i - 3) * 0.12]}>
          <planeGeometry args={[2, 40]} />
          <meshBasicMaterial
            color="#44ccff"
            transparent
            opacity={0.06}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
};

// Floating particles (plankton/dust)
const OceanDust = ({ count = 300 }) => {
  const ref = useRef();
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 50;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 80;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    return arr;
  }, [count]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.getElapsedTime() * 0.008;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.05} color="#88ccee" transparent opacity={0.5} sizeAttenuation />
    </points>
  );
};

// Seaweed/kelp at bottom
const Seaweed = ({ position }) => {
  const ref = useRef();
  const offset = useMemo(() => Math.random() * Math.PI * 2, []);
  const height = useMemo(() => 3 + Math.random() * 3, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime() + offset;
    ref.current.rotation.z = Math.sin(t * 0.8) * 0.2;
    ref.current.rotation.x = Math.sin(t * 0.6) * 0.1;
  });

  return (
    <group ref={ref} position={position}>
      {Array.from({ length: Math.floor(height / 0.7) }, (_, i) => (
        <mesh key={i} position={[0, i * 0.7, 0]}>
          <boxGeometry args={[0.15, 0.8, 0.08]} />
          <meshStandardMaterial
            color={`hsl(${140 + i * 8}, 60%, ${20 + i * 3}%)`}
            roughness={0.8}
            transparent
            opacity={0.7}
          />
        </mesh>
      ))}
    </group>
  );
};

// Coral at bottom
const Coral = ({ position, color = "#ff4466" }) => {
  const ref = useRef();
  
  return (
    <group ref={ref} position={position}>
      {[0, 1, 2, 3].map((i) => (
        <mesh key={i} position={[Math.sin(i * 1.5) * 0.4, i * 0.3, Math.cos(i * 1.5) * 0.3]}>
          <sphereGeometry args={[0.2 + i * 0.05, 6, 6]} />
          <meshStandardMaterial color={color} roughness={0.6} metalness={0.2} />
        </mesh>
      ))}
    </group>
  );
};

const SceneContent = () => {
  return (
    <>
      {/* Lighting that changes with depth */}
      <ambientLight intensity={0.12} color="#446688" />
      <directionalLight position={[0, 25, 5]} intensity={0.5} color="#88ccff" />
      <pointLight position={[0, 8, 0]} intensity={1} color="#00aaff" distance={20} />
      <pointLight position={[-5, -5, -5]} intensity={0.4} color="#0066aa" distance={25} />
      <pointLight position={[5, -12, 5]} intensity={0.2} color="#003366" distance={30} />
      {/* Deep bioluminescent lights */}
      <pointLight position={[0, -15, -5]} intensity={0.3} color="#00ffaa" distance={15} />
      <pointLight position={[-5, -18, -8]} intensity={0.2} color="#8844ff" distance={12} />

      {/* Fog for depth */}
      <fog attach="fog" args={["#021a2d", 5, 45]} />

      {/* Aquatic creatures by depth zone */}
      <AquaticCreatures />

      {/* God rays from surface */}
      <GodRays />

      {/* Ocean dust/plankton */}
      <OceanDust />

      {/* Seaweed at the bottom */}
      {[[-8, -18, -8], [-4, -18, -10], [-1, -18, -7], [3, -18, -9], [6, -18, -8], [9, -18, -11], [-6, -18, -12]].map((pos, i) => (
        <Seaweed key={i} position={pos} />
      ))}

      {/* Coral reef at bottom */}
      {[[-5, -18, -6], [2, -18, -8], [7, -18, -7], [-2, -18, -11], [5, -18, -10]].map((pos, i) => (
        <Coral key={i} position={pos} color={["#ff4466", "#ff8844", "#ffaa22", "#ff66aa", "#44aaff"][i]} />
      ))}
    </>
  );
};

const OceanScene = ({ scrollProgress = 0 }) => {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none" style={{ opacity: 1 }}>
      <Canvas
        camera={{ position: [0, 0, 10], fov: 60, near: 0.1, far: 100 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <Suspense fallback={null}>
          <CameraController scrollProgress={scrollProgress} />
          <SceneContent />
        </Suspense>
      </Canvas>
    </div>
  );
};

// Camera that dives from surface to abyss
const CameraController = ({ scrollProgress }) => {
  useFrame(({ camera }) => {
    // Dive from y=8 (surface) to y=-18 (deep ocean abyss)
    const targetY = 8 - scrollProgress * 26;
    camera.position.y += (targetY - camera.position.y) * 0.05;
    // Gradual rotation as we dive deeper
    camera.rotation.x = -scrollProgress * 0.15;
    // Move slightly forward as we descend
    const targetZ = 10 - scrollProgress * 3;
    camera.position.z += (targetZ - camera.position.z) * 0.05;
    // Slight sway for underwater feel
    camera.position.x = Math.sin(Date.now() * 0.0003) * 0.5;
  });
  return null;
};

export default OceanScene;
