import React, { useRef, useEffect, useMemo } from 'react';
import { useFrame, useGraph } from '@react-three/fiber';
import { useGLTF, useAnimations } from '@react-three/drei';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { SkeletonUtils } from 'three-stdlib';

export function RisingJellyfish({ url, scale = 1, speed = 1, startOffset = 0, xOffset = 0, zOffset = 0, rotationYOffset = 0 }) {
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
      action.setEffectiveTimeScale(speed * 0.8); // Jellyfish swim slower
    }
  }, [actions, speed]);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime * speed + startOffset;
    
    if (groupRef.current) {
        // Since canvas is now fixed 100vh, we loop through a standard viewport height (approx -15 to +15 in 3D space at Z=0)
        // We use a range of -25 to +25 so they spawn out of bounds and rise completely off screen
        const yPos = ((t * 1.5) % 50) - 25;
        
        // Organic, wider X and Z weaving
        groupRef.current.position.x = Math.sin(t * 0.4) * 8 + Math.cos(t * 0.2) * 3 + xOffset;
        groupRef.current.position.y = yPos + Math.sin(t * 2) * 0.5; // Slight pulsing up and down
        groupRef.current.position.z = Math.cos(t * 0.3) * 6 + zOffset;
        
        // Complex, realistic tilt as they drift
        groupRef.current.rotation.y = rotationYOffset + Math.sin(t * 0.2) * 0.4;
        groupRef.current.rotation.z = Math.sin(t * 0.3) * 0.2;
        groupRef.current.rotation.x = Math.cos(t * 0.4) * 0.15;
    }
  });

  return (
    <group ref={groupRef} scale={scale} dispose={null}>
      <primitive object={clone} />
    </group>
  );
}

const RealisticGLBJellyfish = () => {
  const containerRef = useRef(null);
  const [opacity, setOpacity] = React.useState(0);

  React.useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (containerRef.current) {
            const rect = containerRef.current.getBoundingClientRect();
            // Start fading in as the container enters the screen from the bottom
            const progress = 1 - (rect.top / window.innerHeight);
            const clampedProgress = Math.max(0, Math.min(1, progress));
            
            // If the container is completely off screen, hide it
            if (rect.bottom < 0 || rect.top > window.innerHeight) {
              setOpacity(0);
            } else {
              setOpacity(clampedProgress);
            }
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0 z-[1] pointer-events-none">
      <div 
        className="fixed inset-0 w-full h-full overflow-hidden mix-blend-screen md:opacity-60 transition-opacity duration-300"
        style={{ opacity: opacity * 0.5 }}
      >
        {opacity > 0 && (
          <Canvas
            camera={{ position: [0, 0, 15], fov: 45 }}
            gl={{ alpha: true, antialias: false, powerPreference: 'high-performance' }}
            dpr={[1, 1]}
          >
            <ambientLight intensity={1.2} color="#0c4a6e" />
            <directionalLight position={[10, 20, 10]} intensity={2.0} color="#38bdf8" />
            <pointLight position={[-10, -10, -10]} intensity={4} color="#a855f7" />
            
            {/* Constant stream of jellyfish within the fixed 100vh viewport */}
            <RisingJellyfish url="/models/jellyfish.glb" scale={5.5} speed={1.2} startOffset={0} xOffset={-8} zOffset={-5} rotationYOffset={0} />
            <RisingJellyfish url="/models/jellyfish1.glb" scale={4.8} speed={1.5} startOffset={12} xOffset={5} zOffset={-8} rotationYOffset={Math.PI / 4} />
            <RisingJellyfish url="/models/jellyfish.glb" scale={6.5} speed={1.0} startOffset={24} xOffset={-2} zOffset={-12} rotationYOffset={Math.PI / 6} />
            <RisingJellyfish url="/models/jellyfish1.glb" scale={4.5} speed={1.3} startOffset={36} xOffset={9} zOffset={-6} rotationYOffset={Math.PI / 3} />
          </Canvas>
        )}
      </div>
    </div>
  );
};

// Preload the models
useGLTF.preload('/models/jellyfish.glb');
useGLTF.preload('/models/jellyfish1.glb');

export default RealisticGLBJellyfish;
