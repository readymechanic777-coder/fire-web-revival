import React, { Suspense, useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment } from '@react-three/drei';
import * as THREE from 'three';

const FishModel = () => {
  const group = useRef();
  const { scene, animations } = useGLTF('/models/emperor_angelfish.glb');
  const mixer = useRef(null);

  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((child) => {
      if (child.isMesh && child.material) {
        child.material = child.material.clone();
        child.material.envMapIntensity = 1.5;
      }
    });
    return clone;
  }, [scene]);

  useEffect(() => {
    if (animations?.length > 0) {
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
    if (mixer.current) mixer.current.update(delta);

    const t = state.clock.elapsedTime;

    // Swim left to right repeatedly
    const cycleLength = 8; // seconds per full crossing
    const progress = (t % cycleLength) / cycleLength; // 0 to 1

    // X: -6 to 6 (left to right)
    group.current.position.x = THREE.MathUtils.lerp(-6, 6, progress);

    // Gentle vertical bobbing
    group.current.position.y = Math.sin(t * 1.5) * 0.4;

    // Face swimming direction (right)
    group.current.rotation.y = Math.PI / 2 + Math.sin(t * 2) * 0.1;

    // Slight body sway
    group.current.rotation.z = Math.sin(t * 3) * 0.05;
  });

  return <primitive ref={group} object={clonedScene} scale={4.5} />;
};

const Fish3DSection = () => {
  return (
    <section className="relative py-8 md:py-12 overflow-visible" style={{ zIndex: 20 }}>
      <div className="w-full max-w-5xl mx-auto h-[350px] md:h-[450px]">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 50 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          dpr={[1, 1.5]}
          style={{ background: 'transparent' }}
        >
          <ambientLight intensity={0.6} color="#0891b2" />
          <directionalLight position={[5, 5, 5]} intensity={1.2} color="#22d3ee" />
          <pointLight position={[-3, 2, 2]} intensity={0.6} color="#06b6d4" />
          <pointLight position={[3, -1, -2]} intensity={0.4} color="#0e7490" />
          <fog attach="fog" args={['#011627', 12, 30]} />
          <Suspense fallback={null}>
            <FishModel />
            <Environment preset="night" />
          </Suspense>
        </Canvas>
      </div>
    </section>
  );
};

useGLTF.preload('/models/emperor_angelfish.glb');
export default Fish3DSection;
