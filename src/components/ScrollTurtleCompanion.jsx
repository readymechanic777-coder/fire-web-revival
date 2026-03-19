import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/* ─── Procedural Sea Turtle ─── */
const TurtleBody = () => {
  const shape = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(0, -0.6);
    s.bezierCurveTo(0.8, -0.6, 1.2, -0.2, 1.2, 0.1);
    s.bezierCurveTo(1.2, 0.5, 0.8, 0.7, 0, 0.7);
    s.bezierCurveTo(-0.8, 0.7, -1.2, 0.5, -1.2, 0.1);
    s.bezierCurveTo(-1.2, -0.2, -0.8, -0.6, 0, -0.6);
    return s;
  }, []);

  const extrudeSettings = useMemo(() => ({
    depth: 0.5,
    bevelEnabled: true,
    bevelThickness: 0.25,
    bevelSize: 0.15,
    bevelSegments: 6,
  }), []);

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.15, 0]} castShadow>
      <extrudeGeometry args={[shape, extrudeSettings]} />
      <meshStandardMaterial
        color="#2d8a6e"
        roughness={0.6}
        metalness={0.15}
        emissive="#0a3d2a"
        emissiveIntensity={0.3}
      />
    </mesh>
  );
};

/* Shell pattern (hexagonal bumps on top) */
const ShellPattern = () => {
  const bumps = useMemo(() => {
    const positions = [];
    for (let row = -2; row <= 2; row++) {
      const cols = row % 2 === 0 ? 3 : 2;
      for (let col = 0; col < cols; col++) {
        const offsetX = row % 2 === 0 ? -0.4 : -0.2;
        positions.push([
          offsetX + col * 0.4,
          0.55,
          -0.05 + row * 0.25,
        ]);
      }
    }
    return positions;
  }, []);

  return (
    <group>
      {bumps.map((pos, i) => (
        <mesh key={i} position={pos} scale={[0.18, 0.08, 0.18]}>
          <sphereGeometry args={[1, 6, 4]} />
          <meshStandardMaterial
            color="#1a6b4f"
            roughness={0.7}
            emissive="#0d4a35"
            emissiveIntensity={0.2}
          />
        </mesh>
      ))}
    </group>
  );
};

/* Turtle Head */
const TurtleHead = React.forwardRef((_, ref) => (
  <group ref={ref} position={[0, 0.1, -0.9]}>
    {/* Head */}
    <mesh>
      <sphereGeometry args={[0.22, 12, 10]} />
      <meshStandardMaterial
        color="#3ba37d"
        roughness={0.5}
        emissive="#1a5c45"
        emissiveIntensity={0.3}
      />
    </mesh>
    {/* Eyes */}
    <mesh position={[0.12, 0.06, -0.15]}>
      <sphereGeometry args={[0.05, 8, 8]} />
      <meshStandardMaterial color="#111" roughness={0.2} metalness={0.8} />
    </mesh>
    <mesh position={[-0.12, 0.06, -0.15]}>
      <sphereGeometry args={[0.05, 8, 8]} />
      <meshStandardMaterial color="#111" roughness={0.2} metalness={0.8} />
    </mesh>
    {/* Eye highlights */}
    <mesh position={[0.13, 0.08, -0.18]}>
      <sphereGeometry args={[0.02, 6, 6]} />
      <meshBasicMaterial color="#ffffff" />
    </mesh>
    <mesh position={[-0.11, 0.08, -0.18]}>
      <sphereGeometry args={[0.02, 6, 6]} />
      <meshBasicMaterial color="#ffffff" />
    </mesh>
  </group>
));

/* Flipper */
const Flipper = React.forwardRef(({ side, position }, ref) => {
  const shape = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(0, 0);
    s.bezierCurveTo(side * 0.3, -0.1, side * 0.7, -0.3, side * 0.9, -0.6);
    s.bezierCurveTo(side * 0.85, -0.65, side * 0.5, -0.5, side * 0.3, -0.35);
    s.bezierCurveTo(side * 0.1, -0.2, 0, -0.1, 0, 0);
    return s;
  }, [side]);

  return (
    <group ref={ref} position={position}>
      <mesh rotation={[-Math.PI / 2, 0, 0]}>
        <extrudeGeometry args={[shape, { depth: 0.06, bevelEnabled: true, bevelThickness: 0.02, bevelSize: 0.02, bevelSegments: 2 }]} />
        <meshStandardMaterial
          color="#3ba37d"
          roughness={0.5}
          side={THREE.DoubleSide}
          emissive="#1a5c45"
          emissiveIntensity={0.2}
        />
      </mesh>
    </group>
  );
});

/* Back flipper (smaller) */
const BackFlipper = React.forwardRef(({ side, position }, ref) => (
  <group ref={ref} position={position}>
    <mesh rotation={[-Math.PI / 2, 0, side * 0.3]}>
      <coneGeometry args={[0.12, 0.4, 6]} />
      <meshStandardMaterial
        color="#3ba37d"
        roughness={0.5}
        emissive="#1a5c45"
        emissiveIntensity={0.2}
      />
    </mesh>
  </group>
));

/* Tail */
const Tail = React.forwardRef((_, ref) => (
  <group ref={ref} position={[0, 0.05, 0.8]}>
    <mesh rotation={[-Math.PI / 2, 0, 0]}>
      <coneGeometry args={[0.08, 0.35, 6]} />
      <meshStandardMaterial
        color="#3ba37d"
        roughness={0.5}
        emissive="#1a5c45"
        emissiveIntensity={0.2}
      />
    </mesh>
  </group>
));

/* Bubble trail */
const BubbleTrail = ({ turtlePos }) => {
  const bubblesRef = useRef([]);
  const meshRefs = useRef([]);
  const count = 12;

  useEffect(() => {
    bubblesRef.current = Array.from({ length: count }, () => ({
      pos: new THREE.Vector3(0, -10, 0),
      vel: new THREE.Vector3(),
      life: 0,
      maxLife: 0,
    }));
  }, []);

  useFrame((_, delta) => {
    bubblesRef.current.forEach((b, i) => {
      b.life -= delta;
      if (b.life <= 0) {
        // Respawn
        b.pos.set(
          turtlePos.current.x + (Math.random() - 0.5) * 0.5,
          turtlePos.current.y - 0.1,
          turtlePos.current.z + (Math.random() - 0.5) * 0.3
        );
        b.vel.set((Math.random() - 0.5) * 0.3, 0.5 + Math.random() * 0.5, (Math.random() - 0.5) * 0.2);
        b.maxLife = 1.5 + Math.random() * 1.5;
        b.life = b.maxLife;
      }
      b.pos.addScaledVector(b.vel, delta);
      b.vel.x += (Math.random() - 0.5) * 0.5 * delta;

      const mesh = meshRefs.current[i];
      if (mesh) {
        mesh.position.copy(b.pos);
        const alpha = Math.max(0, b.life / b.maxLife);
        mesh.material.opacity = alpha * 0.5;
        mesh.scale.setScalar(0.03 + (1 - alpha) * 0.04);
      }
    });
  });

  return (
    <>
      {Array.from({ length: count }).map((_, i) => (
        <mesh key={i} ref={el => { meshRefs.current[i] = el; }}>
          <sphereGeometry args={[1, 6, 6]} />
          <meshBasicMaterial color="#67e8f9" transparent opacity={0.3} />
        </mesh>
      ))}
    </>
  );
};

/* ─── Animated Turtle Assembly ─── */
const AnimatedTurtle = ({ scrollProgress, isSettled }) => {
  const groupRef = useRef();
  const headRef = useRef();
  const leftFrontRef = useRef();
  const rightFrontRef = useRef();
  const leftBackRef = useRef();
  const rightBackRef = useRef();
  const tailRef = useRef();
  const turtlePos = useRef(new THREE.Vector3(2, 1, 0));

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    const progress = scrollProgress.current;
    const settled = isSettled.current;

    if (!groupRef.current) return;

    // Position: turtle swims along the right side, moving down with scroll
    const targetX = settled ? 0 : 1.8 + Math.sin(t * 0.4) * 0.6;
    const targetY = settled ? -1.5 : 1.2 - progress * 3 + Math.sin(t * 0.6) * 0.3;
    const targetZ = settled ? 0.5 : Math.cos(t * 0.3) * 0.4;

    const lerpSpeed = settled ? 0.02 : 0.03;
    groupRef.current.position.x += (targetX - groupRef.current.position.x) * lerpSpeed;
    groupRef.current.position.y += (targetY - groupRef.current.position.y) * lerpSpeed;
    groupRef.current.position.z += (targetZ - groupRef.current.position.z) * lerpSpeed;

    turtlePos.current.copy(groupRef.current.position);

    // Body tilt & rotation for swimming feel
    const targetRotY = settled ? 0 : Math.sin(t * 0.4) * 0.3;
    const targetRotX = settled ? 0.1 : Math.sin(t * 0.3) * 0.08;
    const targetRotZ = settled ? 0 : Math.cos(t * 0.5) * 0.1;

    groupRef.current.rotation.y += (targetRotY - groupRef.current.rotation.y) * 0.03;
    groupRef.current.rotation.x += (targetRotX - groupRef.current.rotation.x) * 0.03;
    groupRef.current.rotation.z += (targetRotZ - groupRef.current.rotation.z) * 0.03;

    // Flipper animations
    const flipSpeed = settled ? 0.8 : 2.5;
    const flipAmp = settled ? 0.15 : 0.6;

    if (leftFrontRef.current) {
      leftFrontRef.current.rotation.z = Math.sin(t * flipSpeed) * flipAmp;
      leftFrontRef.current.rotation.x = Math.cos(t * flipSpeed * 0.7) * flipAmp * 0.3;
    }
    if (rightFrontRef.current) {
      rightFrontRef.current.rotation.z = -Math.sin(t * flipSpeed) * flipAmp;
      rightFrontRef.current.rotation.x = Math.cos(t * flipSpeed * 0.7 + Math.PI) * flipAmp * 0.3;
    }
    if (leftBackRef.current) {
      leftBackRef.current.rotation.z = Math.sin(t * flipSpeed * 0.6 + 1) * flipAmp * 0.4;
    }
    if (rightBackRef.current) {
      rightBackRef.current.rotation.z = -Math.sin(t * flipSpeed * 0.6 + 1) * flipAmp * 0.4;
    }

    // Head bob
    if (headRef.current) {
      headRef.current.rotation.x = Math.sin(t * 1.2) * 0.06;
      headRef.current.rotation.y = Math.sin(t * 0.8) * 0.1;
    }

    // Tail wag
    if (tailRef.current) {
      tailRef.current.rotation.y = Math.sin(t * 3) * 0.2;
    }

    // Scale pulse when settled (happy breathing)
    if (settled) {
      const breathe = 1 + Math.sin(t * 1.5) * 0.02;
      groupRef.current.scale.setScalar(breathe);
    } else {
      groupRef.current.scale.setScalar(1);
    }
  });

  return (
    <>
      <group ref={groupRef} scale={1}>
        <TurtleBody />
        <ShellPattern />
        <TurtleHead ref={headRef} />
        <Flipper ref={leftFrontRef} side={1} position={[0.9, 0.05, -0.3]} />
        <Flipper ref={rightFrontRef} side={-1} position={[-0.9, 0.05, -0.3]} />
        <BackFlipper ref={leftBackRef} side={1} position={[0.7, 0, 0.5]} />
        <BackFlipper ref={rightBackRef} side={-1} position={[-0.7, 0, 0.5]} />
        <Tail ref={tailRef} />

        {/* Glow underneath */}
        <pointLight position={[0, -0.3, 0]} color="#22d3ee" intensity={0.6} distance={3} />
      </group>
      <BubbleTrail turtlePos={turtlePos} />
    </>
  );
};

/* ─── Scene ─── */
const TurtleScene = ({ scrollProgress, isSettled }) => {
  return (
    <>
      <ambientLight intensity={0.25} color="#b8e8f5" />
      <directionalLight position={[3, 5, -2]} intensity={0.5} color="#67e8f9" />
      <directionalLight position={[-2, 3, 3]} intensity={0.3} color="#22d3ee" />
      <pointLight position={[0, 2, 0]} intensity={0.4} color="#0ea5e9" distance={8} />

      <AnimatedTurtle scrollProgress={scrollProgress} isSettled={isSettled} />
    </>
  );
};

/* ─── Main Overlay Component ─── */
const ScrollTurtleCompanion = () => {
  const scrollProgress = useRef(0);
  const isSettled = useRef(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Delay mount slightly so it appears after preloader
    const timer = setTimeout(() => setVisible(true), 500);

    const handleScroll = () => {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? window.scrollY / docHeight : 0;
      scrollProgress.current = Math.min(1, Math.max(0, progress));

      // Settle when near footer (last 5%)
      isSettled.current = progress > 0.95;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 40 }}
    >
      <Canvas
        camera={{ position: [0, 1, 5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
        style={{ background: 'transparent' }}
      >
        <TurtleScene scrollProgress={scrollProgress} isSettled={isSettled} />
      </Canvas>
    </div>
  );
};

export default ScrollTurtleCompanion;
