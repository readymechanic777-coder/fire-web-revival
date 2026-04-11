import React, { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';
import { useScroll, useTransform, motion } from 'framer-motion';

// Procedural tropical fish using Three.js geometry
const TropicalFish = ({ position, color, accentColor, size = 1, speed = 1, swimDirection = 1, type = 'angel' }) => {
    const groupRef = useRef();
    const tailRef = useRef();
    const finRef = useRef();
    const initialPos = useMemo(() => [...position], []);

    useFrame((state) => {
        if (!groupRef.current) return;
        const t = state.clock.elapsedTime * speed;
        
        // Swimming motion
        groupRef.current.position.x = initialPos[0] + Math.sin(t * 0.3) * 8 * swimDirection;
        groupRef.current.position.y = initialPos[1] + Math.sin(t * 0.5) * 1.5;
        groupRef.current.position.z = initialPos[2] + Math.cos(t * 0.2) * 3;
        
        // Body undulation
        groupRef.current.rotation.y = Math.sin(t * 0.3) * 0.15 * swimDirection;
        groupRef.current.rotation.z = Math.sin(t * 0.7) * 0.05;
        
        // Tail wag
        if (tailRef.current) {
            tailRef.current.rotation.y = Math.sin(t * 3) * 0.4;
        }
        // Fin flutter
        if (finRef.current) {
            finRef.current.rotation.z = Math.sin(t * 4) * 0.3;
        }
    });

    const bodyColor = useMemo(() => new THREE.Color(color), [color]);
    const accent = useMemo(() => new THREE.Color(accentColor), [accentColor]);

    if (type === 'angel') {
        return (
            <group ref={groupRef} position={position} scale={size}>
                {/* Body - tall angelfish shape */}
                <mesh>
                    <sphereGeometry args={[0.8, 12, 8]} />
                    <meshStandardMaterial color={bodyColor} emissive={bodyColor} emissiveIntensity={0.3} transparent opacity={0.9} />
                </mesh>
                {/* Stripes */}
                <mesh position={[0.15, 0, 0]} scale={[0.15, 1.1, 0.9]}>
                    <sphereGeometry args={[0.8, 8, 6]} />
                    <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.2} transparent opacity={0.7} />
                </mesh>
                <mesh position={[-0.2, 0, 0]} scale={[0.1, 1.0, 0.85]}>
                    <sphereGeometry args={[0.8, 8, 6]} />
                    <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.2} transparent opacity={0.7} />
                </mesh>
                {/* Dorsal fin */}
                <mesh ref={finRef} position={[0, 0.7, 0]} rotation={[0, 0, 0.3]}>
                    <coneGeometry args={[0.3, 0.8, 4]} />
                    <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.4} transparent opacity={0.8} />
                </mesh>
                {/* Tail */}
                <group ref={tailRef} position={[-0.8, 0, 0]}>
                    <mesh rotation={[0, 0, Math.PI / 4]}>
                        <coneGeometry args={[0.4, 0.6, 4]} />
                        <meshStandardMaterial color={bodyColor} emissive={bodyColor} emissiveIntensity={0.3} transparent opacity={0.85} />
                    </mesh>
                </group>
                {/* Eye */}
                <mesh position={[0.5, 0.15, 0.35]}>
                    <sphereGeometry args={[0.1, 8, 8]} />
                    <meshStandardMaterial color="#ffffff" emissive="#88ccff" emissiveIntensity={0.5} />
                </mesh>
                <mesh position={[0.52, 0.15, 0.38]}>
                    <sphereGeometry args={[0.05, 6, 6]} />
                    <meshStandardMaterial color="#000000" />
                </mesh>
            </group>
        );
    }

    if (type === 'clown') {
        return (
            <group ref={groupRef} position={position} scale={size}>
                {/* Body - rounder clownfish */}
                <mesh>
                    <sphereGeometry args={[0.6, 12, 10]} />
                    <meshStandardMaterial color={bodyColor} emissive={bodyColor} emissiveIntensity={0.4} transparent opacity={0.9} />
                </mesh>
                {/* White bands */}
                {[-0.15, 0.15, 0.4].map((x, i) => (
                    <mesh key={i} position={[x, 0, 0]} scale={[0.06, 1.05, 1.05]}>
                        <sphereGeometry args={[0.6, 8, 6]} />
                        <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.3} transparent opacity={0.85} />
                    </mesh>
                ))}
                {/* Tail */}
                <group ref={tailRef} position={[-0.6, 0, 0]}>
                    <mesh>
                        <coneGeometry args={[0.25, 0.5, 4]} />
                        <meshStandardMaterial color={bodyColor} emissive={bodyColor} emissiveIntensity={0.4} transparent opacity={0.85} />
                    </mesh>
                </group>
                {/* Fins */}
                <mesh ref={finRef} position={[0, 0.45, 0]} rotation={[0, 0, 0.2]}>
                    <coneGeometry args={[0.2, 0.4, 4]} />
                    <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.3} transparent opacity={0.8} />
                </mesh>
                {/* Eye */}
                <mesh position={[0.35, 0.12, 0.3]}>
                    <sphereGeometry args={[0.08, 8, 8]} />
                    <meshStandardMaterial color="#ffffff" emissive="#aaddff" emissiveIntensity={0.4} />
                </mesh>
                <mesh position={[0.37, 0.12, 0.33]}>
                    <sphereGeometry args={[0.04, 6, 6]} />
                    <meshStandardMaterial color="#111111" />
                </mesh>
            </group>
        );
    }

    if (type === 'tang') {
        return (
            <group ref={groupRef} position={position} scale={size}>
                {/* Body - flat oval tang */}
                <mesh scale={[1.2, 0.8, 0.4]}>
                    <sphereGeometry args={[0.7, 12, 10]} />
                    <meshStandardMaterial color={bodyColor} emissive={bodyColor} emissiveIntensity={0.35} transparent opacity={0.9} />
                </mesh>
                {/* Yellow accent tail area */}
                <mesh position={[-0.6, 0, 0]} scale={[0.4, 0.6, 0.3]}>
                    <sphereGeometry args={[0.7, 8, 6]} />
                    <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.5} transparent opacity={0.85} />
                </mesh>
                {/* Tail */}
                <group ref={tailRef} position={[-0.9, 0, 0]}>
                    <mesh rotation={[0, 0, Math.PI / 6]}>
                        <coneGeometry args={[0.3, 0.5, 4]} />
                        <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.4} transparent opacity={0.8} />
                    </mesh>
                </group>
                {/* Dorsal fin */}
                <mesh ref={finRef} position={[0.1, 0.5, 0]} rotation={[0, 0, 0.15]}>
                    <coneGeometry args={[0.35, 0.5, 4]} />
                    <meshStandardMaterial color={bodyColor} emissive={bodyColor} emissiveIntensity={0.3} transparent opacity={0.75} />
                </mesh>
                {/* Eye */}
                <mesh position={[0.5, 0.1, 0.2]}>
                    <sphereGeometry args={[0.08, 8, 8]} />
                    <meshStandardMaterial color="#ffffff" emissive="#88ccff" emissiveIntensity={0.5} />
                </mesh>
                <mesh position={[0.52, 0.1, 0.22]}>
                    <sphereGeometry args={[0.04, 6, 6]} />
                    <meshStandardMaterial color="#000000" />
                </mesh>
            </group>
        );
    }

    // Butterfly fish default
    return (
        <group ref={groupRef} position={position} scale={size}>
            <mesh scale={[0.9, 1.0, 0.35]}>
                <sphereGeometry args={[0.7, 12, 10]} />
                <meshStandardMaterial color={bodyColor} emissive={bodyColor} emissiveIntensity={0.35} transparent opacity={0.9} />
            </mesh>
            {/* Nose */}
            <mesh position={[0.6, 0.1, 0]} scale={[0.5, 0.3, 0.2]}>
                <sphereGeometry args={[0.4, 8, 6]} />
                <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.3} transparent opacity={0.85} />
            </mesh>
            {/* Eye spot (fake) */}
            <mesh position={[-0.2, 0.2, 0.2]}>
                <sphereGeometry args={[0.12, 8, 8]} />
                <meshStandardMaterial color="#000000" transparent opacity={0.7} />
            </mesh>
            {/* Tail */}
            <group ref={tailRef} position={[-0.7, 0, 0]}>
                <mesh rotation={[0, 0, Math.PI / 5]}>
                    <coneGeometry args={[0.25, 0.45, 4]} />
                    <meshStandardMaterial color={bodyColor} emissive={bodyColor} emissiveIntensity={0.3} transparent opacity={0.8} />
                </mesh>
            </group>
            {/* Dorsal */}
            <mesh ref={finRef} position={[0, 0.55, 0]}>
                <coneGeometry args={[0.3, 0.5, 4]} />
                <meshStandardMaterial color={accent} emissive={accent} emissiveIntensity={0.4} transparent opacity={0.75} />
            </mesh>
            {/* Real eye */}
            <mesh position={[0.4, 0.15, 0.2]}>
                <sphereGeometry args={[0.07, 8, 8]} />
                <meshStandardMaterial color="#ffffff" emissive="#aaddff" emissiveIntensity={0.4} />
            </mesh>
        </group>
    );
};

// Floating particles for underwater atmosphere
const UnderwaterParticles = () => {
    const ref = useRef();
    const count = 80;
    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 40;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 30;
        }
        return pos;
    }, []);

    useFrame((state) => {
        if (!ref.current) return;
        const t = state.clock.elapsedTime;
        const posArr = ref.current.geometry.attributes.position.array;
        for (let i = 0; i < count; i++) {
            posArr[i * 3 + 1] += Math.sin(t * 0.5 + i) * 0.005;
            posArr[i * 3] += Math.cos(t * 0.3 + i * 0.5) * 0.003;
        }
        ref.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
            </bufferGeometry>
            <pointsMaterial size={0.15} color="#22d3ee" transparent opacity={0.4} blending={THREE.AdditiveBlending} />
        </points>
    );
};

// Fish school configuration
const fishConfig = [
    { pos: [-8, 2, -5], color: '#ff6b35', accent: '#ffffff', size: 1.2, speed: 0.7, dir: 1, type: 'clown' },
    { pos: [10, -1, -3], color: '#ff8c42', accent: '#fff5e6', size: 1.0, speed: 0.9, dir: -1, type: 'clown' },
    { pos: [-5, 3, -8], color: '#1a73e8', accent: '#ffd700', size: 1.4, speed: 0.5, dir: 1, type: 'tang' },
    { pos: [7, -2, -6], color: '#e8e8e8', accent: '#333333', size: 1.3, speed: 0.6, dir: -1, type: 'angel' },
    { pos: [-12, 0, -4], color: '#ffd700', accent: '#000000', size: 1.1, speed: 0.8, dir: 1, type: 'butterfly' },
    { pos: [6, 4, -10], color: '#ff4757', accent: '#2f3542', size: 0.9, speed: 1.0, dir: -1, type: 'angel' },
    { pos: [-3, -3, -7], color: '#0abde3', accent: '#feca57', size: 1.5, speed: 0.4, dir: 1, type: 'tang' },
    { pos: [12, 1, -5], color: '#ff9ff3', accent: '#ffffff', size: 0.8, speed: 1.1, dir: -1, type: 'butterfly' },
];

const FishScene = () => {
    return (
        <>
            <ambientLight intensity={0.3} color="#0ea5e9" />
            <pointLight position={[0, 10, 5]} intensity={0.8} color="#22d3ee" distance={50} />
            <pointLight position={[-10, -5, 0]} intensity={0.4} color="#0284c7" distance={30} />
            <fog attach="fog" args={['#011627', 10, 45]} />
            
            {fishConfig.map((fish, i) => (
                <TropicalFish
                    key={i}
                    position={fish.pos}
                    color={fish.color}
                    accentColor={fish.accent}
                    size={fish.size}
                    speed={fish.speed}
                    swimDirection={fish.dir}
                    type={fish.type}
                />
            ))}
            
            <UnderwaterParticles />
        </>
    );
};

const DeepOceanFish = () => {
    const { scrollYProgress } = useScroll();
    const [visible, setVisible] = useState(false);

    // 1600m-4000m out of 10994m = ~0.145-0.364 scroll progress
    const opacity = useTransform(scrollYProgress, [0.12, 0.16, 0.34, 0.38], [0, 1, 1, 0]);

    useEffect(() => {
        const unsubscribe = scrollYProgress.on('change', (v) => {
            setVisible(v > 0.11 && v < 0.39);
        });
        return unsubscribe;
    }, [scrollYProgress]);

    if (!visible) return null;

    return (
        <motion.div
            className="fixed inset-0 z-[12] pointer-events-none"
            style={{ opacity }}
        >
            <Canvas
                camera={{ position: [0, 0, 20], fov: 60 }}
                dpr={[1, 1.5]}
                gl={{ antialias: false, alpha: true, powerPreference: 'low-power' }}
                style={{ background: 'transparent' }}
            >
                <FishScene />
            </Canvas>
        </motion.div>
    );
};

export default DeepOceanFish;
