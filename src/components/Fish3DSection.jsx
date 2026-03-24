import React, { Suspense, useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Center, Environment, Float, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { clone as skeletonClone } from 'three/examples/jsm/utils/SkeletonUtils.js';

const FishModel = () => {
  const group = useRef();
  const { scene, animations } = useGLTF('/models/emperor_angelfish.glb');
  const mixer = useRef(null);

  const preparedScene = useMemo(() => {
    const clone = skeletonClone(scene);
    const box = new THREE.Box3().setFromObject(clone);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const maxAxis = Math.max(size.x, size.y, size.z) || 1;
    const normalizedScale = 4.8 / maxAxis;

    clone.position.sub(center);
    clone.scale.setScalar(normalizedScale);

    clone.traverse((child) => {
      if (child.isMesh && child.material) {
        child.castShadow = true;
        child.receiveShadow = true;
        child.material = child.material.clone();
        child.material.envMapIntensity = 4.5;
        if ('color' in child.material && child.material.color) {
          child.material.color.offsetHSL(0, 0, 0.12);
        }
        if ('roughness' in child.material) {
          child.material.roughness = Math.min(child.material.roughness ?? 0.35, 0.35);
        }
        if ('metalness' in child.material) {
          child.material.metalness = Math.max(child.material.metalness ?? 0.08, 0.08);
        }
        if ('emissive' in child.material && child.material.emissive) {
          child.material.emissive = new THREE.Color().setHSL(0.53, 0.95, 0.78);
          child.material.emissiveIntensity = 0.55;
        }
      }
    });

    return clone;
  }, [scene]);

  useEffect(() => {
    if (animations?.length > 0) {
      mixer.current = new THREE.AnimationMixer(preparedScene);
      animations.forEach((clip) => {
        const action = mixer.current.clipAction(clip);
        action.play();
        action.setLoop(THREE.LoopRepeat);
      });
    }

    return () => {
      if (mixer.current) mixer.current.stopAllAction();
    };
  }, [animations, preparedScene]);

  useFrame((state, delta) => {
    if (!group.current) return;
    if (mixer.current) mixer.current.update(delta);

    const t = state.clock.elapsedTime;
    group.current.position.x = Math.sin(t * 0.42) * 2.8;
    group.current.position.y = Math.sin(t * 1.15) * 0.34;
    group.current.rotation.x = Math.cos(t * 0.9) * 0.08;
    group.current.rotation.y = -Math.PI / 2 + Math.sin(t * 0.42) * 0.38;
    group.current.rotation.z = Math.sin(t * 1.4) * 0.08;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.2} floatIntensity={0.3}>
      <group ref={group}>
        <Center>
          <primitive object={preparedScene} />
        </Center>
      </group>
    </Float>
  );
};

const Fish3DSection = () => {
  return (
    <section className="relative py-8 md:py-12 overflow-visible" style={{ zIndex: 20 }}>
      <div className="mx-auto h-[360px] w-full max-w-5xl md:h-[460px]">
        <Canvas
          camera={{ position: [0, 0.15, 7.5], fov: 30, near: 0.1, far: 40 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          dpr={[1, 1.5]}
          style={{ background: 'transparent' }}
          shadows
        >
          <ambientLight intensity={2.6} color="hsl(190, 90%, 96%)" />
          <hemisphereLight args={['hsl(190, 100%, 94%)', 'hsl(203, 70%, 10%)', 3.4]} />
          <directionalLight position={[5, 3.5, 7]} intensity={4.8} color="hsl(188, 100%, 86%)" />
          <directionalLight position={[-6, 2, -5]} intensity={3.6} color="hsl(0, 0%, 100%)" />
          <spotLight
            position={[0, 4, 6]}
            intensity={24}
            angle={0.5}
            penumbra={0.9}
            distance={22}
            color="hsl(0, 0%, 100%)"
          />
          <pointLight position={[0, 0.25, 5]} intensity={4.4} distance={18} color="hsl(190, 100%, 80%)" />
          <pointLight position={[0, 0, -6]} intensity={3.2} distance={22} color="hsl(0, 0%, 100%)" />
          <fog attach="fog" args={['hsl(203, 83%, 13%)', 11, 24]} />
          <Suspense fallback={null}>
            <FishModel />
            <Environment preset="sunset" />
          </Suspense>
        </Canvas>
      </div>
    </section>
  );
};

useGLTF.preload('/models/emperor_angelfish.glb');

export default Fish3DSection;
