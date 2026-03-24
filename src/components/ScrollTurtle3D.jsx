import React, { useRef, useMemo, useEffect, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment } from '@react-three/drei';
import * as THREE from 'three';

// Bubble trail particles in 3D
const BubbleTrail = ({ turtlePos }) => {
  const count = 40;
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
    if (spawnTimer.current > 0.12) {
      spawnTimer.current = 0;
      const b = bubbles.current.find((b) => b.life <= 0);
      if (b) {
        b.pos.set(
          turtlePos.current.x + (Math.random() - 0.5) * 0.4,
          turtlePos.current.y + (Math.random() - 0.5) * 0.3,
          turtlePos.current.z + (Math.random() - 0.5) * 0.4
        );
        b.vel.set((Math.random() - 0.5) * 0.3, 0.3 + Math.random() * 0.5, (Math.random() - 0.5) * 0.3);
        b.maxLife = 1.5 + Math.random() * 2;
        b.life = b.maxLife;
        b.size = 0.02 + Math.random() * 0.05;
      }
    }
    bubbles.current.forEach((b, i) => {
      if (b.life > 0) {
        b.life -= delta;
        b.pos.add(b.vel.clone().multiplyScalar(delta));
        b.vel.y += delta * 0.1;
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
      <meshStandardMaterial color="#22d3ee" transparent opacity={0.5} emissive="#22d3ee" emissiveIntensity={0.3} />
    </instancedMesh>
  );
};

// The 3D Turtle model with full playful behavior
const TurtleModel = ({ scrollProgress, mousePos }) => {
  const group = useRef();
  const { scene, animations } = useGLTF('/models/turtle.glb');
  const mixer = useRef(null);
  const turtlePos = useRef(new THREE.Vector3(0, 0, 5));
  const prevScroll = useRef(0);
  const scrollSpeed = useRef(0);
  const swimTime = useRef(0);
  const totalRotation = useRef(0);

  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((child) => {
      if (child.isMesh && child.material) {
        child.castShadow = true;
        child.receiveShadow = true;
        child.material = child.material.clone();
        child.material.envMapIntensity = 1.5;
      }
    });
    return clone;
  }, [scene]);

  useEffect(() => {
    if (animations && animations.length > 0) {
      mixer.current = new THREE.AnimationMixer(clonedScene);
      animations.forEach((clip) => {
        const action = mixer.current.clipAction(clip);
        action.play();
        action.setLoop(THREE.LoopRepeat);
      });
    }
    return () => { if (mixer.current) mixer.current.stopAllAction(); };
  }, [animations, clonedScene]);

  useFrame((state, delta) => {
    if (!group.current) return;

    // Animation mixer
    if (mixer.current) {
      const animSpeed = 1 + Math.abs(scrollSpeed.current) * 4;
      mixer.current.update(delta * animSpeed);
    }

    const sp = scrollProgress.current;
    scrollSpeed.current = THREE.MathUtils.lerp(scrollSpeed.current, (sp - prevScroll.current) * 60, 0.1);
    prevScroll.current = sp;
    swimTime.current += delta;

    const t = sp; // 0 = top, 1 = bottom

    // === SCALE: starts at 0, grows to full size by 10% scroll, larger at footer ===
    let targetScale;
    if (t < 0.1) {
      // Hero: scale from 0 to 1.5
      targetScale = THREE.MathUtils.smoothstep(t, 0, 0.1) * 1.5;
    } else if (t > 0.88) {
      // Footer: grow bigger (up to 2.5)
      const footerT = THREE.MathUtils.smoothstep(t, 0.88, 1.0);
      targetScale = 1.5 + footerT * 1.0;
    } else {
      targetScale = 1.5;
    }
    const currentScale = THREE.MathUtils.lerp(group.current.scale.x, targetScale, 0.06);
    group.current.scale.setScalar(currentScale);

    // === POSITION: turtle follows the cursor ===
    let targetX, targetY, targetZ;

    // Convert mouse position (-1 to 1) to 3D world coordinates
    const cursorX = mousePos.current.x * 6; // wider range to cover viewport
    const cursorY = mousePos.current.y * -3.5; // invert Y, map to 3D space

    if (t <= 0.05) {
      // Start at center of hero, begin following cursor
      const heroT = THREE.MathUtils.smoothstep(t, 0, 0.05);
      targetX = THREE.MathUtils.lerp(0, cursorX, heroT);
      targetY = THREE.MathUtils.lerp(0, cursorY, heroT);
      targetZ = 4;
    } else if (t > 0.88) {
      // Footer: settle to the right side, below "Follow Us"
      const footerT = THREE.MathUtils.smoothstep(t, 0.88, 1.0);
      targetX = THREE.MathUtils.lerp(cursorX, 3.5, footerT);
      targetY = THREE.MathUtils.lerp(cursorY, -2.5, footerT);
      targetZ = THREE.MathUtils.lerp(4, 3, footerT);
    } else {
      // Main journey: follow cursor with playful offset
      const journeyT = (t - 0.05) / 0.83;
      
      // Follow cursor with gentle swimming offset
      targetX = cursorX + Math.sin(swimTime.current * 0.8) * 0.5;
      targetY = cursorY + Math.sin(swimTime.current * 1.2) * 0.3 + Math.cos(journeyT * Math.PI * 2) * 0.4;
      targetZ = 4 + Math.sin(journeyT * Math.PI * 3) * 1.5;
    }

    // Smooth interpolation - slightly delayed to feel organic/alive
    const lerpSpeed = t > 0.88 ? 0.02 : 0.045;
    turtlePos.current.x = THREE.MathUtils.lerp(turtlePos.current.x, targetX, lerpSpeed);
    turtlePos.current.y = THREE.MathUtils.lerp(turtlePos.current.y, targetY, lerpSpeed);
    turtlePos.current.z = THREE.MathUtils.lerp(turtlePos.current.z, targetZ, lerpSpeed);
    group.current.position.copy(turtlePos.current);

    // === ROTATION: full 360° playful rotation showing all sides ===
    if (t > 0.88) {
      // Footer: slow settling rotation, face the user
      const footerT = THREE.MathUtils.smoothstep(t, 0.88, 1.0);
      totalRotation.current = THREE.MathUtils.lerp(totalRotation.current, Math.PI * 0.1, 0.02);
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, totalRotation.current, 0.03);
      group.current.rotation.x = THREE.MathUtils.lerp(group.current.rotation.x, 0.1, 0.03);
      group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, 0, 0.03);
    } else {
      // Main journey: continuous 360° rotation showing all sides
      // Full Y rotation based on scroll + time (shows front, back, sides)
      const scrollRotY = t * Math.PI * 8; // multiple full rotations through scroll
      const timeRotY = swimTime.current * 0.3; // gentle continuous spin
      const swayRotY = Math.sin(t * Math.PI * 5) * 0.6; // directional sway
      totalRotation.current = scrollRotY + timeRotY + swayRotY;
      group.current.rotation.y = THREE.MathUtils.lerp(group.current.rotation.y, totalRotation.current, 0.06);

      // X rotation: pitch up/down based on scroll direction + playful dips
      const pitchFromScroll = scrollSpeed.current * 0.5;
      const pitchFromPath = Math.sin(t * Math.PI * 6) * 0.3;
      const playfulFlip = Math.sin(t * Math.PI * 2.5) * 0.4; // occasional pitch
      group.current.rotation.x = THREE.MathUtils.lerp(
        group.current.rotation.x,
        pitchFromScroll + pitchFromPath + playfulFlip + Math.sin(swimTime.current * 2) * 0.08,
        0.05
      );

      // Z rotation: barrel roll / banking turns
      const bankAngle = Math.sin(t * Math.PI * 4) * 0.35 + Math.cos(swimTime.current * 1.5) * 0.12;
      group.current.rotation.z = THREE.MathUtils.lerp(group.current.rotation.z, bankAngle, 0.05);
    }
  });

  return (
    <group>
      <primitive ref={group} object={clonedScene} scale={0.01} />
      <BubbleTrail turtlePos={turtlePos} />
    </group>
  );
};

const UnderwaterAtmosphere = () => (
  <>
    <ambientLight intensity={0.4} color="#0891b2" />
    <directionalLight position={[5, 10, 5]} intensity={0.9} color="#22d3ee" />
    <pointLight position={[-3, 5, 2]} intensity={0.5} color="#06b6d4" distance={20} />
    <pointLight position={[3, -2, -3]} intensity={0.3} color="#0e7490" distance={15} />
    <spotLight position={[0, 15, 0]} angle={0.4} penumbra={1} intensity={0.6} color="#22d3ee" />
    <fog attach="fog" args={['#011627', 8, 30]} />
  </>
);

const TurtleCanvas = ({ scrollProgress, mousePos }) => (
  <Canvas
    camera={{ position: [0, 0, 10], fov: 50, near: 0.1, far: 100 }}
    gl={{ antialias: true, alpha: true, powerPreference: 'high-performance', stencil: false, depth: true }}
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

const ScrollTurtle3D = () => {
  const scrollProgress = useRef(0);
  const mousePos = useRef({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 800);

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
    <div className="fixed inset-0 pointer-events-none" style={{ zIndex: 40 }}>
      <TurtleCanvas scrollProgress={scrollProgress} mousePos={mousePos} />
    </div>
  );
};

useGLTF.preload('/models/turtle.glb');
export default ScrollTurtle3D;
