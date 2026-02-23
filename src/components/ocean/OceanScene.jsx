import { Canvas } from "@react-three/fiber";
import { Suspense, useRef, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import AquaticCreatures from "./AquaticCreatures";

// Underwater light rays (god rays)
const GodRays = () => {
  const ref = useRef();
  
  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.z = Math.sin(clock.getElapsedTime() * 0.1) * 0.1;
  });

  return (
    <group ref={ref}>
      {[0, 1, 2, 3, 4].map((i) => (
        <mesh key={i} position={[i * 4 - 8, 12, -15]} rotation={[0, 0, (i - 2) * 0.15]}>
          <planeGeometry args={[1.5, 30]} />
          <meshBasicMaterial
            color="#44ccff"
            transparent
            opacity={0.04}
            side={THREE.DoubleSide}
            blending={THREE.AdditiveBlending}
          />
        </mesh>
      ))}
    </group>
  );
};

// Floating particles (plankton/dust)
const OceanDust = ({ count = 200 }) => {
  const ref = useRef();
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3] = (Math.random() - 0.5) * 40;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 60;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 40;
    }
    return arr;
  }, [count]);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.getElapsedTime() * 0.01;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
      </bufferGeometry>
      <pointsMaterial size={0.04} color="#88ccee" transparent opacity={0.4} sizeAttenuation />
    </points>
  );
};

// Seaweed/kelp
const Seaweed = ({ position }) => {
  const ref = useRef();
  const offset = useMemo(() => Math.random() * Math.PI * 2, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    const t = clock.getElapsedTime() + offset;
    ref.current.rotation.z = Math.sin(t * 0.8) * 0.2;
    ref.current.rotation.x = Math.sin(t * 0.6) * 0.1;
  });

  return (
    <group ref={ref} position={position}>
      {[0, 0.8, 1.6, 2.4].map((y, i) => (
        <mesh key={i} position={[0, y, 0]}>
          <boxGeometry args={[0.15, 0.9, 0.08]} />
          <meshStandardMaterial
            color={`hsl(${140 + i * 10}, 60%, ${25 + i * 5}%)`}
            roughness={0.8}
            transparent
            opacity={0.7}
          />
        </mesh>
      ))}
    </group>
  );
};

const SceneContent = () => {
  return (
    <>
      {/* Lighting */}
      <ambientLight intensity={0.15} color="#446688" />
      <directionalLight position={[0, 20, 5]} intensity={0.4} color="#88ccff" />
      <pointLight position={[0, 5, 0]} intensity={0.8} color="#00aaff" distance={30} />
      <pointLight position={[-5, -10, -5]} intensity={0.3} color="#0066aa" distance={20} />
      <pointLight position={[5, -15, 5]} intensity={0.2} color="#003366" distance={25} />

      {/* Fog for depth */}
      <fog attach="fog" args={["#021a2d", 5, 40]} />

      {/* Aquatic creatures */}
      <AquaticCreatures />

      {/* God rays */}
      <GodRays />

      {/* Ocean dust/plankton */}
      <OceanDust />

      {/* Seaweed at the "bottom" */}
      {[[-6, -18, -8], [-3, -18, -10], [0, -18, -7], [4, -18, -9], [7, -18, -8]].map((pos, i) => (
        <Seaweed key={i} position={pos} />
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

// Camera that moves down as user scrolls (diving effect)
const CameraController = ({ scrollProgress }) => {
  useFrame(({ camera }) => {
    // Dive from y=8 (surface) to y=-18 (deep ocean)
    const targetY = 8 - scrollProgress * 26;
    camera.position.y += (targetY - camera.position.y) * 0.05;
    // Slight rotation for immersion
    camera.rotation.x = -scrollProgress * 0.15;
    // Move forward slightly as we dive
    const targetZ = 10 - scrollProgress * 4;
    camera.position.z += (targetZ - camera.position.z) * 0.05;
  });
  return null;
};

export default OceanScene;
