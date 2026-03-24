import React, { Suspense, useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, Environment } from '@react-three/drei';
import * as THREE from 'three';

const FishModel = () => {
  const group = useRef();
  const spotlightRef = useRef();
  const { scene, animations } = useGLTF('/models/emperor_angelfish.glb');
  const mixer = useRef(null);

  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((child) => {
      if (child.isMesh && child.material) {
        child.material = child.material.clone();
        child.material.envMapIntensity = 3;
        child.material.emissive = new THREE.Color('#0e4a6a');
        child.material.emissiveIntensity = 0.4;
        child.material.toneMapped = false;
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
    const cycleLength = 8;
    const progress = (t % cycleLength) / cycleLength;

    group.current.position.x = THREE.MathUtils.lerp(-6, 6, progress);
    group.current.position.y = Math.sin(t * 1.5) * 0.4;
    group.current.rotation.y = Math.PI / 2 + Math.sin(t * 2) * 0.1;
    group.current.rotation.z = Math.sin(t * 3) * 0.05;

    // Spotlight follows the fish
    if (spotlightRef.current) {
      spotlightRef.current.position.set(
        group.current.position.x,
        group.current.position.y + 4,
        group.current.position.z + 3
      );
      spotlightRef.current.target = group.current;
    }
  });

  return (
    <>
      <primitive ref={group} object={clonedScene} scale={5.5} />
      <spotLight
        ref={spotlightRef}
        intensity={8}
        angle={0.5}
        penumbra={0.8}
        color="#22d3ee"
        distance={20}
        castShadow={false}
      />
    </>
  );
};

const Fish3DSection = () => {
  return (
    <section className="relative py-8 md:py-12 overflow-visible" style={{ zIndex: 20 }}>
      <div className="w-full max-w-5xl mx-auto h-[350px] md:h-[450px]">
        <Canvas
          camera={{ position: [0, 0, 8], fov: 50 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance', toneMapping: THREE.ACESFilmicToneMapping, toneMappingExposure: 1.8 }}
          dpr={[1, 1.5]}
          style={{ background: 'transparent' }}
        >
          <ambientLight intensity={1.2} color="#38bdf8" />
          <directionalLight position={[5, 5, 5]} intensity={2.5} color="#22d3ee" />
          <directionalLight position={[-3, 3, 4]} intensity={1.5} color="#67e8f9" />
          <pointLight position={[0, 0, 4]} intensity={3} color="#22d3ee" distance={15} />
          <pointLight position={[-3, 2, 2]} intensity={1.5} color="#06b6d4" distance={12} />
          <pointLight position={[3, -1, 3]} intensity={1.5} color="#0ea5e9" distance={12} />
          <hemisphereLight args={['#22d3ee', '#064e3b', 1]} />
          <fog attach="fog" args={['#011627', 15, 35]} />
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
