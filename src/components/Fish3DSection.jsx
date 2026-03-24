import React, { Suspense, useEffect, useMemo, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Center, Environment, Float, useGLTF } from '@react-three/drei';
import * as THREE from 'three';

const FishModel = () => {
  const group = useRef();
  const { scene, animations } = useGLTF('/models/emperor_angelfish.glb');
  const mixer = useRef(null);

  const preparedScene = useMemo(() => {
    const clone = scene.clone(true);
    const box = new THREE.Box3().setFromObject(clone);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const maxAxis = Math.max(size.x, size.y, size.z) || 1;
    const normalizedScale = 3.2 / maxAxis;

    clone.position.sub(center);
    clone.scale.setScalar(normalizedScale);

    clone.traverse((child) => {
      if (child.isMesh && child.material) {
        child.material = child.material.clone();
        child.material.envMapIntensity = 3;
        if ('emissive' in child.material) {
          child.material.emissive = new THREE.Color('hsl(190 90% 92%)');
          child.material.emissiveIntensity = 0.22;
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
    group.current.position.x = Math.sin(t * 0.45) * 1.8;
    group.current.position.y = Math.sin(t * 1.1) * 0.28;
    group.current.rotation.y = -Math.PI / 2 + Math.sin(t * 0.45) * 0.28;
    group.current.rotation.z = Math.sin(t * 1.4) * 0.06;
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
          camera={{ position: [0, 0.2, 6], fov: 36 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          dpr={[1, 1.5]}
          style={{ background: 'transparent' }}
        >
          <ambientLight intensity={1.8} color="hsl(190 90% 92%)" />
          <hemisphereLight args={['hsl(190 95% 88%)', 'hsl(201 70% 12%)', 2.2]} />
          <directionalLight position={[4, 3, 6]} intensity={3.2} color="hsl(188 100% 82%)" />
          <directionalLight position={[-4, 2, -3]} intensity={2.6} color="hsl(0 0% 100%)" />
          <spotLight
            position={[0, 3, 5]}
            intensity={14}
            angle={0.42}
            penumbra={0.9}
            distance={18}
            color="hsl(0 0% 100%)"
          />
          <pointLight position={[0, 0, 4]} intensity={2.8} distance={16} color="hsl(190 100% 78%)" />
          <fog attach="fog" args={['hsl(203 83% 13%)', 10, 20]} />
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
