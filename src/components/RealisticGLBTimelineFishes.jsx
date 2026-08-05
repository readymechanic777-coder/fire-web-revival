import React, { useRef, useEffect, useMemo } from 'react';
import { useFrame, useGraph } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { SkeletonUtils } from 'three-stdlib';

export function SwimmingTimelineFish({ url, scale = 1, speed = 1, startOffset = 0, yOffset = 0, zOffset = 0, rotationYOffset = 0 }) {
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
        const xPos = ((t * 3) % 80) - 40; // Loops from -40 to +40 for wider coverage
        
        groupRef.current.position.x = xPos;
        // Increase the vertical weaving slightly for realism
        groupRef.current.position.y = Math.sin(t * 0.4) * 3 + yOffset; 
        groupRef.current.position.z = zOffset;
        
        // Keep perfectly straight, applying specific model rotation offsets
        groupRef.current.rotation.y = rotationYOffset;
        groupRef.current.rotation.z = 0; // No rolling
        groupRef.current.rotation.x = 0;
    }
  });

  return (
    <group ref={groupRef} scale={scale * 0.75} dispose={null}>
      <primitive object={clone} />
    </group>
  );
}

const RealisticGLBTimelineFishes = () => {
  return (
    <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden opacity-40 mix-blend-screen md:opacity-50">
      <Canvas
        camera={{ position: [0, 0, 15], fov: 45 }}
        gl={{ alpha: true, antialias: false, powerPreference: 'high-performance' }}
        dpr={[1, 1]}
      >
        <ambientLight intensity={0.9} color="#0c4a6e" />
        <directionalLight position={[10, 20, 10]} intensity={3.0} color="#38bdf8" />
        <pointLight position={[-10, -10, -10]} intensity={3} color="#0369a1" />
        
        {/* Fish Layer 1 - Original Density */}
        <SwimmingTimelineFish url="/models/fish3.glb" scale={2} speed={1.8} startOffset={5} yOffset={14} zOffset={-5} rotationYOffset={Math.PI} />
        <SwimmingTimelineFish url="/models/fish2.glb" scale={1.8} speed={1.5} startOffset={12} yOffset={8} zOffset={-8} rotationYOffset={Math.PI} />
        <SwimmingTimelineFish url="/models/fish.glb" scale={2.5} speed={2.1} startOffset={20} yOffset={0} zOffset={-12} rotationYOffset={Math.PI} />
        <SwimmingTimelineFish url="/models/fish.glb" scale={1.6} speed={1.9} startOffset={28} yOffset={-8} zOffset={-6} rotationYOffset={Math.PI} />
        <SwimmingTimelineFish url="/models/fish.glb" scale={2.8} speed={1.6} startOffset={35} yOffset={-14} zOffset={-10} rotationYOffset={Math.PI} />
        <SwimmingTimelineFish url="/models/fish.glb" scale={2.2} speed={1.7} startOffset={45} yOffset={10} zOffset={-7} rotationYOffset={Math.PI} />
        <SwimmingTimelineFish url="/models/fish.glb" scale={1.9} speed={2.0} startOffset={52} yOffset={4} zOffset={-11} rotationYOffset={Math.PI} />
        <SwimmingTimelineFish url="/models/fish.glb" scale={2.4} speed={1.4} startOffset={62} yOffset={-4} zOffset={-5} rotationYOffset={Math.PI} />
        <SwimmingTimelineFish url="/models/fish3.glb" scale={1.7} speed={2.2} startOffset={70} yOffset={-12} zOffset={-9} rotationYOffset={Math.PI} />
        <SwimmingTimelineFish url="/models/fish2.glb" scale={2.1} speed={1.8} startOffset={78} yOffset={-16} zOffset={-4} rotationYOffset={Math.PI} />

        {/* Fish Layer 2 - Extra Density */}
        <SwimmingTimelineFish url="/models/fish.glb" scale={2.2} speed={1.7} startOffset={2} yOffset={10} zOffset={-7} rotationYOffset={Math.PI} />
        <SwimmingTimelineFish url="/models/fish.glb" scale={1.9} speed={2.0} startOffset={15} yOffset={4} zOffset={-11} rotationYOffset={Math.PI} />
        <SwimmingTimelineFish url="/models/fish.glb" scale={2.4} speed={1.4} startOffset={25} yOffset={-4} zOffset={-5} rotationYOffset={Math.PI} />
        <SwimmingTimelineFish url="/models/fish3.glb" scale={1.7} speed={2.2} startOffset={38} yOffset={-12} zOffset={-9} rotationYOffset={Math.PI} />
        <SwimmingTimelineFish url="/models/fish2.glb" scale={2.1} speed={1.8} startOffset={44} yOffset={-16} zOffset={-4} rotationYOffset={Math.PI} />
        <SwimmingTimelineFish url="/models/fish.glb" scale={1.5} speed={2.3} startOffset={58} yOffset={12} zOffset={-4} rotationYOffset={Math.PI} />
        <SwimmingTimelineFish url="/models/fish2.glb" scale={1.8} speed={2.0} startOffset={66} yOffset={2} zOffset={-7} rotationYOffset={Math.PI} />
        <SwimmingTimelineFish url="/models/fish2.glb" scale={1.3} speed={2.6} startOffset={73} yOffset={-6} zOffset={-9} rotationYOffset={Math.PI} />
        
        {/* Fish Layer 3 - Deep Density */}
        <SwimmingTimelineFish url="/models/fish2.glb" scale={2.0} speed={2.2} startOffset={3} yOffset={-11} zOffset={-5} rotationYOffset={Math.PI} />
        <SwimmingTimelineFish url="/models/fish2.glb" scale={1.6} speed={2.5} startOffset={18} yOffset={6} zOffset={-11} rotationYOffset={Math.PI} />
        <SwimmingTimelineFish url="/models/fish3.glb" scale={1.9} speed={1.9} startOffset={22} yOffset={15} zOffset={-8} rotationYOffset={Math.PI} />
        <SwimmingTimelineFish url="/models/fish3.glb" scale={1.4} speed={2.4} startOffset={31} yOffset={-2} zOffset={-6} rotationYOffset={Math.PI} />
        <SwimmingTimelineFish url="/models/fish2.glb" scale={1.7} speed={2.1} startOffset={48} yOffset={-9} zOffset={-10} rotationYOffset={Math.PI} />
        <SwimmingTimelineFish url="/models/fish3.glb" scale={1.5} speed={2.7} startOffset={55} yOffset={-15} zOffset={-3} rotationYOffset={Math.PI} />
        <SwimmingTimelineFish url="/models/fish2.glb" scale={2.2} speed={1.8} startOffset={60} yOffset={10} zOffset={-12} rotationYOffset={Math.PI} />
        <SwimmingTimelineFish url="/models/fish3.glb" scale={1.4} speed={2.4} startOffset={69} yOffset={-2} zOffset={-6} rotationYOffset={Math.PI} />
        <SwimmingTimelineFish url="/models/fish2.glb" scale={1.7} speed={2.1} startOffset={75} yOffset={-9} zOffset={-10} rotationYOffset={Math.PI} />
        <SwimmingTimelineFish url="/models/fish3.glb" scale={1.5} speed={2.7} startOffset={82} yOffset={-15} zOffset={-3} rotationYOffset={Math.PI} />
        <SwimmingTimelineFish url="/models/fish2.glb" scale={2.2} speed={1.8} startOffset={88} yOffset={10} zOffset={-12} rotationYOffset={Math.PI} />

        {/* Fish Layer 4 - Foreground School */}
        <SwimmingTimelineFish url="/models/fish.glb" scale={2.5} speed={1.9} startOffset={8} yOffset={5} zOffset={-3} rotationYOffset={Math.PI} />
        <SwimmingTimelineFish url="/models/fish2.glb" scale={2.1} speed={2.1} startOffset={14} yOffset={-3} zOffset={-4} rotationYOffset={Math.PI} />
        <SwimmingTimelineFish url="/models/fish3.glb" scale={2.3} speed={1.8} startOffset={27} yOffset={12} zOffset={-2} rotationYOffset={Math.PI} />
        <SwimmingTimelineFish url="/models/fish.glb" scale={2.0} speed={2.3} startOffset={36} yOffset={-8} zOffset={-4} rotationYOffset={Math.PI} />
        <SwimmingTimelineFish url="/models/fish2.glb" scale={2.6} speed={1.7} startOffset={42} yOffset={-14} zOffset={-2} rotationYOffset={Math.PI} />
        <SwimmingTimelineFish url="/models/fish3.glb" scale={2.2} speed={2.0} startOffset={51} yOffset={2} zOffset={-3} rotationYOffset={Math.PI} />
        <SwimmingTimelineFish url="/models/fish.glb" scale={2.4} speed={1.6} startOffset={64} yOffset={8} zOffset={-4} rotationYOffset={Math.PI} />
        <SwimmingTimelineFish url="/models/fish2.glb" scale={1.9} speed={2.4} startOffset={71} yOffset={-5} zOffset={-2} rotationYOffset={Math.PI} />
        <SwimmingTimelineFish url="/models/fish3.glb" scale={2.7} speed={1.5} startOffset={79} yOffset={-11} zOffset={-3} rotationYOffset={Math.PI} />
      </Canvas>
    </div>
  );
};

// Preload the models
useGLTF.preload('/models/fish2.glb');
useGLTF.preload('/models/fish3.glb');
useGLTF.preload('/models/fish.glb');

export default RealisticGLBTimelineFishes;
