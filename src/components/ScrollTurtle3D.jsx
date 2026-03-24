import React, { useRef, useMemo, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useGLTF, Environment } from '@react-three/drei';
import * as THREE from 'three';

// Bubble trail particles in 3D
const BubbleTrail = ({ turtlePos }) => {
  const count = 30;
  const meshRef = useRef();
  const bubbles = useRef(
    Array.from({ length: count }, () => ({
      pos: new THREE.Vector3(0, -100, 0),
      vel: new THREE.Vector3(0, 0, 0),
      life: 0,
      maxLife: 0,
      size: 0,
    }))
  );
  const spawnTimer = useRef(0);

  const dummy = useMemo(() => new THREE.Object3D(), []);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    spawnTimer.current += delta;

    // Spawn new bubble every 0.15s
    if (spawnTimer.current > 0.15) {
      spawnTimer.current = 0;
      const b = bubbles.current.find((b) => b.life <= 0);
      if (b) {
        b.pos.set(
          turtlePos.current.x + (Math.random() - 0.5) * 0.3,
          turtlePos.current.y + (Math.random() - 0.5) * 0.2,
          turtlePos.current.z + (Math.random() - 0.5) * 0.3
        );
        b.vel.set(
          (Math.random() - 0.5) * 0.2,
          0.3 + Math.random() * 0.4,
          (Math.random() - 0.5) * 0.2
        );
        b.maxLife = 1.5 + Math.random() * 1.5;
        b.life = b.maxLife;
        b.size = 0.02 + Math.random() * 0.04;
      }
    }

    bubbles.current.forEach((b, i) => {
      if (b.life > 0) {
        b.life -= delta;
        b.pos.add(b.vel.clone().multiplyScalar(delta));
        b.vel.y += delta * 0.1; // buoyancy
        const scale = b.size * (b.life / b.maxLife);
        dummy.position.copy(b.pos);
        dummy.scale.setScalar(scale);
      } else {
        dummy.scale.setScalar(0);
        dummy.position.set(0, -100, 0);
      }
      dummy.updateMatrix();
      meshRef.current.setMatrixAt(i, dummy.matrix);
    });
    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[null, null, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshStandardMaterial
        color="#22d3ee"
        transparent
        opacity={0.5}
        emissive="#22d3ee"
        emissiveIntensity={0.3}
      />
    </instancedMesh>
  );
};

// The 3D Turtle model
const TurtleModel = ({ scrollProgress, mousePos }) => {
  const group = useRef();
  const { scene, animations } = useGLTF('/models/turtle.glb');
  const mixer = useRef(null);
  const turtlePos = useRef(new THREE.Vector3(0, 0, 0));
  const prevScroll = useRef(0);
  const scrollSpeed = useRef(0);
  const targetRotY = useRef(0);
  const swimTime = useRef(0);

  // Clone the scene so we can manipulate it safely
  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
        // Enhance materials
        if (child.material) {
          child.material = child.material.clone();
          child.material.envMapIntensity = 1.5;
        }
      }
    });
    return clone;
  }, [scene]);

  // Setup animation mixer
  useEffect(() => {
    if (animations && animations.length > 0) {
      mixer.current = new THREE.AnimationMixer(clonedScene);
      animations.forEach((clip) => {
        const action = mixer.current.clipAction(clip);
        action.play();
        action.setLoop(THREE.LoopRepeat);
      });
    }
    return () => {
      if (mixer.current) mixer.current.stopAllAction();
    };
  }, [animations, clonedScene]);

  useFrame((state, delta) => {
    if (!group.current) return;

    // Update animation mixer
    if (mixer.current) {
      // Speed up animations based on scroll speed
      const animSpeed = 1 + Math.abs(scrollSpeed.current) * 3;
      mixer.current.update(delta * animSpeed);
    }

    // Calculate scroll speed
    const sp = scrollProgress.current;
    scrollSpeed.current = THREE.MathUtils.lerp(
      scrollSpeed.current,
      (sp - prevScroll.current) * 60,
      0.1
    );
    prevScroll.current = sp;

    swimTime.current += delta;

    // Define the swim path - a gentle S-curve through the page
    const t = sp;
    
    // X position: gentle side-to-side sway
    const targetX = Math.sin(t * Math.PI * 3) * 2 + mousePos.current.x * 0.3;
    
    // Y position: follows scroll, with gentle bob
    const targetY = 3 - t * 8 + Math.sin(swimTime.current * 1.5) * 0.15;
    
    // Z position: comes closer and goes back
    const targetZ = 2 + Math.sin(t * Math.PI * 2) * 1.5;

    // Smooth lerp to target
    const lerpSpeed = 0.03;
    turtlePos.current.x = THREE.MathUtils.lerp(turtlePos.current.x, targetX, lerpSpeed);
    turtlePos.current.y = THREE.MathUtils.lerp(turtlePos.current.y, targetY, lerpSpeed);
    turtlePos.current.z = THREE.MathUtils.lerp(turtlePos.current.z, targetZ, lerpSpeed);

    group.current.position.copy(turtlePos.current);

    // Rotation: turtle faces direction of movement
    const scrollDir = scrollSpeed.current;
    
    // Tilt forward/back based on scroll direction
    const targetRotX = scrollDir * 0.3 + Math.sin(swimTime.current * 2) * 0.05;
    group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, targetRotX, 0.05);

    // Turn left/right based on X movement
    targetRotY.current = Math.sin(t * Math.PI * 3) * 0.4 + mousePos.current.x * 0.2;
    group.current.rotation.y = THREE.MathUtils.lerp(
      group.current.rotation.y,
      targetRotY.current + Math.PI,
      0.03
    );

    // Gentle roll
    group.current.rotation.z = Math.sin(swimTime.current * 1.2) * 0.08;

    // Scale: slightly larger when closer
    const baseScale = 1.2;
    const scale = baseScale + Math.abs(scrollSpeed.current) * 0.1;
    group.current.scale.setScalar(THREE.MathUtils.lerp(group.current.scale.x, scale, 0.05));

    // Footer settling: when near bottom (t > 0.9)
    if (t > 0.9) {
      const footerT = (t - 0.9) / 0.1;
      // Slow down and do a gentle rotation
      group.current.rotation.y = THREE.MathUtils.lerp(
        group.current.rotation.y,
        Math.PI * 2 * footerT + Math.PI,
        0.02
      );
      // Settle down
      const settleY = THREE.MathUtils.lerp(targetY, -5, footerT);
      turtlePos.current.y = THREE.MathUtils.lerp(turtlePos.current.y, settleY, 0.03);
    }
  });

  return (
    <group>
      <primitive ref={group} object={clonedScene} scale={1.2} />
      <BubbleTrail turtlePos={turtlePos} />
    </group>
  );
};

// Underwater atmosphere
const UnderwaterAtmosphere = () => {
  return (
    <>
      <ambientLight intensity={0.3} color="#0891b2" />
      <directionalLight
        position={[5, 10, 5]}
        intensity={0.8}
        color="#22d3ee"
        castShadow
      />
      <pointLight position={[-3, 5, 2]} intensity={0.5} color="#06b6d4" distance={20} />
      <pointLight position={[3, -2, -3]} intensity={0.3} color="#0e7490" distance={15} />
      {/* God rays effect via spot light */}
      <spotLight
        position={[0, 15, 0]}
        angle={0.4}
        penumbra={1}
        intensity={0.6}
        color="#22d3ee"
        castShadow={false}
      />
      <fog attach="fog" args={['#011627', 5, 25]} />
    </>
  );
};

// Main canvas component
const TurtleCanvas = ({ scrollProgress, mousePos }) => {
  return (
    <Canvas
      camera={{ position: [0, 1, 8], fov: 50, near: 0.1, far: 100 }}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
        stencil: false,
        depth: true,
      }}
      dpr={[1, 1.5]}
      style={{ background: 'transparent' }}
    >
      <UnderwaterAtmosphere />
      <Suspense fallback={null}>
        <TurtleModel scrollProgress={scrollProgress} mousePos={mousePos} />
        <Environment preset="night" />
      </Suspense>
    </Canvas>
  );
};

// Wrapper component that handles scroll tracking
const ScrollTurtle3D = () => {
  const scrollProgress = useRef(0);
  const mousePos = useRef({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show turtle after a brief delay
    const timer = setTimeout(() => setVisible(true), 1000);

    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      scrollProgress.current = docHeight > 0 ? scrollTop / docHeight : 0;
    };

    const handleMouseMove = (e) => {
      mousePos.current = {
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      };
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    handleScroll();

    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 40 }}
    >
      <TurtleCanvas scrollProgress={scrollProgress} mousePos={mousePos} />
    </div>
  );
};

// Preload the model
useGLTF.preload('/models/turtle.glb');

export default ScrollTurtle3D;
