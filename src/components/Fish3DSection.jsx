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
    
    // Gentle floating motion
    group.current.position.y = Math.sin(state.clock.elapsedTime * 0.8) * 0.3;
    group.current.rotation.y += delta * 0.3;
  });

  return <primitive ref={group} object={clonedScene} scale={2} />;
};

const Fish3DSection = () => {
  return (
    <section className="relative py-16 md:py-24 flex items-center justify-center min-h-[50vh]">
      <div className="w-full max-w-2xl mx-auto h-[400px] md:h-[500px]">
        <Canvas
          camera={{ position: [0, 0, 5], fov: 45 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          dpr={[1, 1.5]}
          style={{ background: 'transparent' }}
        >
          <ambientLight intensity={0.5} color="#0891b2" />
          <directionalLight position={[5, 5, 5]} intensity={1} color="#22d3ee" />
          <pointLight position={[-3, 2, 2]} intensity={0.5} color="#06b6d4" />
          <fog attach="fog" args={['#011627', 8, 25]} />
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
