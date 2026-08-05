import React, { useRef, useEffect, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import { Canvas } from '@react-three/fiber';
import { useDeviceCapability } from '@/hooks/use-device-capability';
import { useInView } from 'framer-motion';

export function SwimmingFishGLB({ url, scale = 1, speed = 1, color }) {
  const { scene } = useGLTF(url);
  const groupRef = useRef();
  const shaderRefs = useRef([]);
  const offset = useMemo(() => Math.random() * 100, []);

  // Clone the scene so we can safely modify materials without affecting other instances
  const clonedScene = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((child) => {
      if (child.isMesh) {
        // Create a unique material instance for this mesh so uniforms don't clash
        child.material = child.material.clone();
        
        if (color) {
            child.material.color = new THREE.Color(color);
        }

        child.material.onBeforeCompile = (shader) => {
          shader.uniforms.uTime = { value: 0 };
          shader.vertexShader = `
            uniform float uTime;
            ${shader.vertexShader}
          `;
          
          shader.vertexShader = shader.vertexShader.replace(
            '#include <begin_vertex>',
            `
            #include <begin_vertex>
            // Bend the fish along its spine (assuming spine is along Z axis, bending X)
            // If the model is oriented differently, this will bend a different axis.
            float bend = sin(position.z * 1.5 - uTime * 4.0) * 0.15;
            
            // Multiply by z to make the tail (positive Z) wag more than the head (negative Z)
            transformed.x += bend * max(0.0, position.z + 1.0);
            `
          );
          shaderRefs.current.push(shader);
        };
      }
    });
    return clone;
  }, [scene, color]);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime * speed + offset;
    
    // Update shader uniforms for tail wagging
    shaderRefs.current.forEach(shader => {
      if (shader && shader.uniforms && shader.uniforms.uTime) {
        shader.uniforms.uTime.value = t;
      }
    });

    // Make the entire fish swim in a circle or back and forth
    if (groupRef.current) {
        // Move in a gentle sine wave path
        groupRef.current.position.x = Math.sin(t * 0.5) * 5;
        groupRef.current.position.y = Math.sin(t * 0.7) * 1;
        
        // Rotate to face the direction of movement
        groupRef.current.rotation.y = Math.cos(t * 0.5) * 0.5 - Math.PI / 2;
        groupRef.current.rotation.z = Math.sin(t * 0.7) * 0.2;
    }
  });

  return (
    <group ref={groupRef} scale={scale}>
      <primitive object={clonedScene} />
    </group>
  );
}

const RealisticGLBFish = () => {
  const { isLowEnd, ready } = useDeviceCapability();
  const ref = useRef(null);
  const isInView = useInView(ref, { margin: "1000px 0px 1000px 0px" });
  
  if (!ready || isLowEnd) return null;

  return (
    <div ref={ref} className="absolute inset-0 z-0 pointer-events-none" style={{ opacity: 0.7 }}>
      {isInView && (
        <Canvas
          camera={{ position: [0, 0, 10], fov: 50 }}
          gl={{ alpha: true, antialias: false, powerPreference: 'high-performance' }}
          dpr={[1, 1]}
        >
          <ambientLight intensity={0.5} color="#22d3ee" />
          <directionalLight position={[10, 10, 5]} intensity={1} color="#ffffff" />
          
          {/* Render a couple of fish instances with increased scale and speed */}
          <SwimmingFishGLB url="/models/fish.glb" scale={2.5} speed={2.5} />
          
          <group position={[5, -3, -4]}>
              <SwimmingFishGLB url="/models/fish.glb" scale={1.8} speed={2.0} color="#22d3ee" />
          </group>
          
          <group position={[-6, 3, -6]}>
              <SwimmingFishGLB url="/models/fish.glb" scale={2.2} speed={3.0} color="#a78bfa" />
          </group>
        </Canvas>
      )}
    </div>
  );
};

// Preload the model
// useGLTF.preload('/models/fish.glb');

export default RealisticGLBFish;
