import React, { useRef, useEffect, useMemo } from 'react';
import { useFrame, useGraph } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { SkeletonUtils } from 'three-stdlib';

export function SwimmingMarineLife({ url, scale = 1, speed = 1, startOffset = 0, yOffset = 0, zOffset = 0, rotationYOffset = 0 }) {
  const groupRef = useRef();
  const { scene, animations } = useGLTF(url);
  
  // Safely clone skinned meshes so they can be animated independently
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes, materials } = useGraph(clone);
  
  const { actions } = useAnimations(animations, groupRef);

  useEffect(() => {
    if (actions && Object.keys(actions).length > 0) {
      const firstActionKey = Object.keys(actions)[0];
      const action = actions[firstActionKey];
      action.play();
      action.setEffectiveTimeScale(speed);
    }
  }, [actions, speed]);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime * speed + startOffset;
    
    if (groupRef.current) {
        // Continuous swimming from left to right across the wide screen
        const xPos = ((t * 4) % 70) - 35; // Loops from -35 to +35
        
        groupRef.current.position.x = xPos;
        groupRef.current.position.y = Math.sin(t * 0.3) * 2 + yOffset; 
        groupRef.current.position.z = zOffset;
        
        // Keep perfectly straight, applying any specific model rotation offsets
        groupRef.current.rotation.y = rotationYOffset;
        groupRef.current.rotation.z = 0; // No rolling
        groupRef.current.rotation.x = 0;
    }
  });

  return (
    <group ref={groupRef} scale={scale} dispose={null}>
      <primitive object={clone} />
    </group>
  );
}

const RealisticGLBShark = () => {
  return (
    <div className="absolute inset-x-0 h-[100vh] top-1/2 -translate-y-1/2 z-[1] pointer-events-none overflow-hidden opacity-40 mix-blend-screen md:opacity-50">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 45 }}
        gl={{ alpha: true, antialias: false, powerPreference: 'high-performance' }}
        dpr={[1, 1]}
      >
        <ambientLight intensity={0.8} color="#0c4a6e" />
        <directionalLight position={[10, 20, 10]} intensity={2.5} color="#38bdf8" />
        <pointLight position={[-10, -10, -10]} intensity={3} color="#0369a1" />
        
        {/* Sharks (Swimming Higher) */}
        <SwimmingMarineLife url="/models/shark.glb" scale={5} speed={1.2} startOffset={0} yOffset={4} zOffset={-5} rotationYOffset={0} />
        <SwimmingMarineLife url="/models/shark.glb" scale={5} speed={1.5} startOffset={8} yOffset={7} zOffset={-8} rotationYOffset={0} />
        <SwimmingMarineLife url="/models/shark.glb" scale={5} speed={0.9} startOffset={15} yOffset={2} zOffset={-12} rotationYOffset={0} />
        <SwimmingMarineLife url="/models/shark.glb" scale={5} speed={1.8} startOffset={22} yOffset={5.5} zOffset={-10} rotationYOffset={0} />

        {/* Fish3 (Swimming Lower) */}
        <SwimmingMarineLife url="/models/fish3.glb" scale={3} speed={2.2} startOffset={5} yOffset={-3} zOffset={-3} rotationYOffset={Math.PI} />
        <SwimmingMarineLife url="/models/fish3.glb" scale={2.5} speed={2.5} startOffset={12} yOffset={-7} zOffset={-6} rotationYOffset={Math.PI} />
        <SwimmingMarineLife url="/models/fish3.glb" scale={3.5} speed={1.7} startOffset={19} yOffset={-4.5} zOffset={-9} rotationYOffset={Math.PI} />
        <SwimmingMarineLife url="/models/fish3.glb" scale={2.8} speed={2.8} startOffset={28} yOffset={-6} zOffset={-4} rotationYOffset={Math.PI} />
        <SwimmingMarineLife url="/models/fish3.glb" scale={3} speed={2.5} startOffset={35} yOffset={-10} zOffset={-5} rotationYOffset={Math.PI} />
        <SwimmingMarineLife url="/models/fish3.glb" scale={2.5} speed={2.1} startOffset={45} yOffset={-12} zOffset={-8} rotationYOffset={Math.PI} />

      </Canvas>
    </div>
  );
};

// Preload the models
useGLTF.preload('/models/shark.glb');
useGLTF.preload('/models/fish3.glb');

export default RealisticGLBShark;
