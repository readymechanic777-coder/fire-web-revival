import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/* ═══════════════════════════════════════════════════════════════
   PARTICLE KELP — seaweed made of dots along a curved path
   ═══════════════════════════════════════════════════════════════ */
const ParticleKelp = ({ position, height = 2.5, color = '#10b981', speed = 1, density = 200 }) => {
    const pointsRef = useRef();

    const { basePositions, originalY } = useMemo(() => {
        const pos = new Float32Array(density * 3);
        const origY = new Float32Array(density);

        for (let i = 0; i < density; i++) {
            const t = Math.random();
            const y = t * height;
            const stemX = Math.sin(t * Math.PI * 0.6) * 0.15;
            const stemZ = Math.cos(t * Math.PI * 0.8) * 0.08;
            const spread = t * 0.12 + 0.02;
            const angle = Math.random() * Math.PI * 2;
            const r = Math.random() * spread;

            pos[i * 3] = stemX + Math.cos(angle) * r;
            pos[i * 3 + 1] = y;
            pos[i * 3 + 2] = stemZ + Math.sin(angle) * r;
            origY[i] = y;
        }
        return { basePositions: pos, originalY: origY };
    }, [height, density]);

    const positions = useMemo(() => new Float32Array(basePositions), [basePositions]);

    useFrame(({ clock }) => {
        if (!pointsRef.current) return;
        const t = clock.getElapsedTime() * speed;
        const posArr = pointsRef.current.geometry.attributes.position.array;

        for (let i = 0; i < density; i++) {
            const y = originalY[i];
            const influence = Math.pow(y / height, 1.8);
            posArr[i * 3] = basePositions[i * 3] + Math.sin(t + y * 2.5) * 0.25 * influence;
            posArr[i * 3 + 2] = basePositions[i * 3 + 2] + Math.cos(t * 0.7 + y * 2) * 0.15 * influence;
        }
        pointsRef.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <group position={position}>
            <points ref={pointsRef}>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" count={density} array={positions} itemSize={3} />
                </bufferGeometry>
                <pointsMaterial
                    size={0.022}
                    color={color}
                    transparent
                    opacity={0.85}
                    sizeAttenuation
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </points>
            <pointLight position={[0, height * 0.3, 0]} color={color} intensity={0.3} distance={1.5} decay={2} />
        </group>
    );
};

/* ═══════════════════════════════════════════════════════════════
   PARTICLE CORAL — branching coral made of dots
   ═══════════════════════════════════════════════════════════════ */
const ParticleCoral = ({ position, color = '#ec4899', scale = 1, density = 300 }) => {
    const pointsRef = useRef();

    const { basePositions } = useMemo(() => {
        const pos = new Float32Array(density * 3);
        let idx = 0;

        // Generate coral branch paths recursively and fill with dots
        const addBranch = (bx, by, bz, h, angle, depth, count) => {
            if (depth > 3 || idx >= density) return;
            const branchDots = Math.floor(count);
            for (let i = 0; i < branchDots && idx < density; i++) {
                const t = i / branchDots;
                const y = by + t * h;
                const cx = bx + Math.sin(angle) * t * h * 0.3;
                const cz = bz + Math.cos(angle + 1) * t * h * 0.15;
                // Scatter around the branch center
                const spread = 0.03 * scale;
                pos[idx * 3] = cx + (Math.random() - 0.5) * spread;
                pos[idx * 3 + 1] = y;
                pos[idx * 3 + 2] = cz + (Math.random() - 0.5) * spread;
                idx++;
            }
            // Fork at the top
            const forks = depth < 2 ? 3 : 2;
            for (let f = 0; f < forks; f++) {
                const newAngle = angle + (f - (forks - 1) / 2) * (0.7 + Math.random() * 0.5);
                const topY = by + h;
                const dx = Math.sin(newAngle) * h * 0.25;
                const dz = Math.cos(newAngle + f) * h * 0.12;
                addBranch(bx + dx, topY, bz + dz, h * 0.55, newAngle, depth + 1, count * 0.4);
            }
        };

        addBranch(0, 0, 0, 0.6 * scale, 0, 0, density * 0.25);

        // Fill remaining slots with tip glow dots
        while (idx < density) {
            const t = Math.random();
            pos[idx * 3] = (Math.random() - 0.5) * 0.4 * scale;
            pos[idx * 3 + 1] = 0.3 * scale + Math.random() * 0.5 * scale;
            pos[idx * 3 + 2] = (Math.random() - 0.5) * 0.3 * scale;
            idx++;
        }

        return { basePositions: pos };
    }, [scale, density]);

    const positions = useMemo(() => new Float32Array(basePositions), [basePositions]);

    useFrame(({ clock }) => {
        if (!pointsRef.current) return;
        const t = clock.getElapsedTime();
        const posArr = pointsRef.current.geometry.attributes.position.array;
        for (let i = 0; i < density; i++) {
            const y = basePositions[i * 3 + 1];
            const influence = y / (0.8 * scale);
            posArr[i * 3] = basePositions[i * 3] + Math.sin(t * 0.4 + y * 3) * 0.02 * influence;
            posArr[i * 3 + 2] = basePositions[i * 3 + 2] + Math.cos(t * 0.3 + y * 2) * 0.015 * influence;
        }
        pointsRef.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <group position={position}>
            <points ref={pointsRef}>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" count={density} array={positions} itemSize={3} />
                </bufferGeometry>
                <pointsMaterial
                    size={0.02}
                    color={color}
                    transparent
                    opacity={0.9}
                    sizeAttenuation
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </points>
            <pointLight position={[0, 0.4 * scale, 0]} color={color} intensity={0.5} distance={1.8} decay={2} />
        </group>
    );
};

/* ═══════════════════════════════════════════════════════════════
   PARTICLE ANEMONE — radial tentacle pattern of dots
   ═══════════════════════════════════════════════════════════════ */
const ParticleAnemone = ({ position, color = '#f472b6', tentacles = 10, radius = 0.3, density = 180 }) => {
    const pointsRef = useRef();

    const { basePositions } = useMemo(() => {
        const pos = new Float32Array(density * 3);
        const dotsPerTentacle = Math.floor(density / tentacles);

        for (let t = 0; t < tentacles; t++) {
            const angle = (t / tentacles) * Math.PI * 2;
            for (let d = 0; d < dotsPerTentacle; d++) {
                const idx = t * dotsPerTentacle + d;
                if (idx >= density) break;
                const frac = d / dotsPerTentacle;
                const r = radius * 0.3 + frac * radius * 0.7;
                const h = frac * 0.35;
                const wobble = Math.sin(frac * Math.PI) * 0.04;
                pos[idx * 3] = Math.cos(angle) * r + (Math.random() - 0.5) * 0.02;
                pos[idx * 3 + 1] = h;
                pos[idx * 3 + 2] = Math.sin(angle) * r + (Math.random() - 0.5) * 0.02;
            }
        }
        return { basePositions: pos };
    }, [tentacles, radius, density]);

    const positions = useMemo(() => new Float32Array(basePositions), [basePositions]);

    useFrame(({ clock }) => {
        if (!pointsRef.current) return;
        const t = clock.getElapsedTime();
        const posArr = pointsRef.current.geometry.attributes.position.array;
        for (let i = 0; i < density; i++) {
            const y = basePositions[i * 3 + 1];
            const sway = Math.sin(t * 1.5 + i * 0.3) * 0.04 * (y / 0.35);
            posArr[i * 3] = basePositions[i * 3] + sway;
            posArr[i * 3 + 2] = basePositions[i * 3 + 2] + Math.cos(t * 1.2 + i * 0.2) * 0.03 * (y / 0.35);
        }
        pointsRef.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <group position={position}>
            <points ref={pointsRef}>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" count={density} array={positions} itemSize={3} />
                </bufferGeometry>
                <pointsMaterial
                    size={0.018}
                    color={color}
                    transparent
                    opacity={0.85}
                    sizeAttenuation
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </points>
            <pointLight position={[0, 0.15, 0]} color={color} intensity={0.6} distance={1.2} decay={2} />
        </group>
    );
};

/* ═══════════════════════════════════════════════════════════════
   PARTICLE GEM — crystal made of dense dot cluster
   ═══════════════════════════════════════════════════════════════ */
const ParticleGem = ({ position, color = '#22d3ee', size = 0.12, speed = 0.4, density = 100 }) => {
    const pointsRef = useRef();
    const glowRef = useRef();

    const basePositions = useMemo(() => {
        const pos = new Float32Array(density * 3);
        for (let i = 0; i < density; i++) {
            // Diamond / octahedron shape
            const t = Math.random();
            const angle = Math.random() * Math.PI * 2;
            const y = (Math.random() - 0.5) * 2 * size;
            const maxR = size * (1 - Math.abs(y) / size);
            const r = Math.random() * maxR;
            pos[i * 3] = Math.cos(angle) * r;
            pos[i * 3 + 1] = y;
            pos[i * 3 + 2] = Math.sin(angle) * r;
        }
        return pos;
    }, [size, density]);

    const positions = useMemo(() => new Float32Array(basePositions), [basePositions]);

    useFrame(({ clock }) => {
        if (!pointsRef.current) return;
        const t = clock.getElapsedTime();
        // Rotate the whole gem
        pointsRef.current.parent.rotation.y = t * speed;
        pointsRef.current.parent.position.y = position[1] + Math.sin(t * 1.2 + position[0]) * 0.06;

        // Sparkle effect — randomly shift dots slightly
        const posArr = pointsRef.current.geometry.attributes.position.array;
        for (let i = 0; i < density; i++) {
            posArr[i * 3] = basePositions[i * 3] + Math.sin(t * 3 + i) * 0.005;
            posArr[i * 3 + 1] = basePositions[i * 3 + 1] + Math.cos(t * 4 + i * 0.5) * 0.005;
            posArr[i * 3 + 2] = basePositions[i * 3 + 2] + Math.sin(t * 2.5 + i * 0.3) * 0.005;
        }
        pointsRef.current.geometry.attributes.position.needsUpdate = true;

        if (glowRef.current) {
            glowRef.current.intensity = 1.2 + Math.sin(t * 2 + position[0]) * 0.7;
        }
    });

    return (
        <group position={position}>
            <points ref={pointsRef}>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" count={density} array={positions} itemSize={3} />
                </bufferGeometry>
                <pointsMaterial
                    size={0.016}
                    color={color}
                    transparent
                    opacity={0.95}
                    sizeAttenuation
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </points>
            <pointLight ref={glowRef} position={[0, 0, 0]} color={color} intensity={1.2} distance={2} decay={2} />
        </group>
    );
};

/* ═══════════════════════════════════════════════════════════════
   PARTICLE SEA GRASS — thin blade clusters of dots
   ═══════════════════════════════════════════════════════════════ */
const ParticleGrass = ({ position, color = '#34d399', blades = 8, density = 120 }) => {
    const pointsRef = useRef();

    const { basePositions } = useMemo(() => {
        const pos = new Float32Array(density * 3);
        const dotsPerBlade = Math.floor(density / blades);

        for (let b = 0; b < blades; b++) {
            const bx = (Math.random() - 0.5) * 0.4;
            const bz = (Math.random() - 0.5) * 0.4;
            const bh = 0.3 + Math.random() * 0.6;
            const bAngle = Math.random() * Math.PI * 2;

            for (let d = 0; d < dotsPerBlade; d++) {
                const idx = b * dotsPerBlade + d;
                if (idx >= density) break;
                const frac = d / dotsPerBlade;
                pos[idx * 3] = bx + (Math.random() - 0.5) * 0.02;
                pos[idx * 3 + 1] = frac * bh;
                pos[idx * 3 + 2] = bz + (Math.random() - 0.5) * 0.02;
            }
        }
        return { basePositions: pos };
    }, [blades, density]);

    const positions = useMemo(() => new Float32Array(basePositions), [basePositions]);

    useFrame(({ clock }) => {
        if (!pointsRef.current) return;
        const t = clock.getElapsedTime();
        const posArr = pointsRef.current.geometry.attributes.position.array;
        for (let i = 0; i < density; i++) {
            const y = basePositions[i * 3 + 1];
            const influence = y * 1.5;
            posArr[i * 3] = basePositions[i * 3] + Math.sin(t * 1.3 + i * 0.1) * 0.04 * influence;
            posArr[i * 3 + 2] = basePositions[i * 3 + 2] + Math.cos(t * 0.9 + i * 0.15) * 0.025 * influence;
        }
        pointsRef.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <group position={position}>
            <points ref={pointsRef}>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" count={density} array={positions} itemSize={3} />
                </bufferGeometry>
                <pointsMaterial
                    size={0.014}
                    color={color}
                    transparent
                    opacity={0.75}
                    sizeAttenuation
                    depthWrite={false}
                    blending={THREE.AdditiveBlending}
                />
            </points>
        </group>
    );
};

/* ═══════════════════════════════════════════════════════════════
   BUBBLE PARTICLES — drifting upwards
   ═══════════════════════════════════════════════════════════════ */
const BubbleField = ({ count = 80 }) => {
    const pointsRef = useRef();

    const { positions, speeds, phases } = useMemo(() => {
        const p = new Float32Array(count * 3);
        const s = new Float32Array(count);
        const ph = new Float32Array(count);
        for (let i = 0; i < count; i++) {
            p[i * 3] = (Math.random() - 0.5) * 14;
            p[i * 3 + 1] = Math.random() * 5;
            p[i * 3 + 2] = (Math.random() - 0.5) * 6;
            s[i] = 0.15 + Math.random() * 0.6;
            ph[i] = Math.random() * Math.PI * 2;
        }
        return { positions: p, speeds: s, phases: ph };
    }, [count]);

    useFrame(({ clock }) => {
        if (!pointsRef.current) return;
        const pos = pointsRef.current.geometry.attributes.position.array;
        const t = clock.getElapsedTime();
        for (let i = 0; i < count; i++) {
            pos[i * 3 + 1] += speeds[i] * 0.006;
            pos[i * 3] += Math.sin(t * 0.5 + phases[i]) * 0.001;
            if (pos[i * 3 + 1] > 6) {
                pos[i * 3 + 1] = -0.2;
                pos[i * 3] = (Math.random() - 0.5) * 14;
                pos[i * 3 + 2] = (Math.random() - 0.5) * 6;
            }
        }
        pointsRef.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
            </bufferGeometry>
            <pointsMaterial size={0.025} color="#67e8f9" transparent opacity={0.5} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
        </points>
    );
};

/* ═══════════════════════════════════════════════════════════════
   PLANKTON / DUST FIELD
   ═══════════════════════════════════════════════════════════════ */
const PlanktonField = ({ count = 100 }) => {
    const pointsRef = useRef();

    const positions = useMemo(() => {
        const p = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            p[i * 3] = (Math.random() - 0.5) * 16;
            p[i * 3 + 1] = Math.random() * 6;
            p[i * 3 + 2] = (Math.random() - 0.5) * 8;
        }
        return p;
    }, [count]);

    useFrame(({ clock }) => {
        if (!pointsRef.current) return;
        const pos = pointsRef.current.geometry.attributes.position.array;
        const t = clock.getElapsedTime();
        for (let i = 0; i < count; i++) {
            pos[i * 3] += Math.sin(t * 0.2 + i) * 0.001;
            pos[i * 3 + 1] += Math.cos(t * 0.15 + i * 0.5) * 0.0008;
        }
        pointsRef.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
            </bufferGeometry>
            <pointsMaterial size={0.02} color="#94a3b8" transparent opacity={0.3} sizeAttenuation depthWrite={false} />
        </points>
    );
};

/* ═══════════════════════════════════════════════════════════════
   CAUSTIC LIGHT
   ═══════════════════════════════════════════════════════════════ */
const CausticLight = () => {
    const lightRef = useRef();
    useFrame(({ clock }) => {
        if (!lightRef.current) return;
        const t = clock.getElapsedTime();
        lightRef.current.position.x = Math.sin(t * 0.3) * 3;
        lightRef.current.position.z = Math.cos(t * 0.2) * 2;
        lightRef.current.intensity = 0.3 + Math.sin(t * 0.8) * 0.15;
    });
    return <spotLight ref={lightRef} position={[0, 8, 3]} angle={0.5} penumbra={1} color="#0ea5e9" intensity={0.4} distance={18} castShadow={false} />;
};

/* ═══════════════════════════════════════════════════════════════
   SANDY GROUND
   ═══════════════════════════════════════════════════════════════ */
const OceanGround = () => {
    const geometry = useMemo(() => {
        const geo = new THREE.PlaneGeometry(18, 10, 64, 32);
        const pos = geo.attributes.position;
        for (let i = 0; i < pos.count; i++) {
            const x = pos.getX(i);
            const y = pos.getY(i);
            pos.setZ(i, (Math.sin(x * 3) * Math.cos(y * 4) * 0.04) + (Math.random() * 0.02));
        }
        geo.computeVertexNormals();
        return geo;
    }, []);

    return (
        <group>
            {/* Main sandy ground */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]} geometry={geometry}>
                <meshStandardMaterial
                    color="#5c4023"
                    emissive="#3d2a14"
                    emissiveIntensity={0.4}
                    roughness={0.9}
                    metalness={0.05}
                />
            </mesh>
            {/* Lighter sand highlights */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.04, 0.5]}>
                <planeGeometry args={[16, 6]} />
                <meshStandardMaterial
                    color="#7a5a35"
                    emissive="#4a351a"
                    emissiveIntensity={0.3}
                    roughness={0.95}
                    metalness={0}
                    transparent
                    opacity={0.5}
                />
            </mesh>
            {/* Subtle sand grain particles on the floor */}
            <SandGrains />
        </group>
    );
};

/* Sand grain dots scattered on the ground */
const SandGrains = ({ count = 400 }) => {
    const pointsRef = useRef();

    const positions = useMemo(() => {
        const p = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            p[i * 3] = (Math.random() - 0.5) * 16;
            p[i * 3 + 1] = Math.random() * 0.08;
            p[i * 3 + 2] = (Math.random() - 0.5) * 8;
        }
        return p;
    }, [count]);

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
            </bufferGeometry>
            <pointsMaterial
                size={0.015}
                color="#c2a060"
                transparent
                opacity={0.4}
                sizeAttenuation
                depthWrite={false}
            />
        </points>
    );
};

/* ═══════════════════════════════════════════════════════════════
   FISH SCHOOL — small dot-based fish
   ═══════════════════════════════════════════════════════════════ */
const FishSchool = ({ center = [0, 1.5, 0], count = 12, color = '#67e8f9' }) => {
    const pointsRef = useRef();

    const { positions, offsets, speeds, phases } = useMemo(() => {
        const p = new Float32Array(count * 3);
        const o = [];
        const s = new Float32Array(count);
        const ph = new Float32Array(count);
        for (let i = 0; i < count; i++) {
            o.push([
                (Math.random() - 0.5) * 2,
                (Math.random() - 0.5) * 0.8,
                (Math.random() - 0.5) * 1.5,
            ]);
            s[i] = 0.3 + Math.random() * 0.4;
            ph[i] = Math.random() * Math.PI * 2;
            p[i * 3] = center[0] + o[i][0];
            p[i * 3 + 1] = center[1] + o[i][1];
            p[i * 3 + 2] = center[2] + o[i][2];
        }
        return { positions: p, offsets: o, speeds: s, phases: ph };
    }, [count, center]);

    useFrame(({ clock }) => {
        if (!pointsRef.current) return;
        const t = clock.getElapsedTime();
        const posArr = pointsRef.current.geometry.attributes.position.array;
        for (let i = 0; i < count; i++) {
            posArr[i * 3] = center[0] + offsets[i][0] + Math.sin(t * speeds[i] + phases[i]) * 2.5;
            posArr[i * 3 + 1] = center[1] + offsets[i][1] + Math.sin(t * speeds[i] * 1.3 + phases[i]) * 0.3;
            posArr[i * 3 + 2] = center[2] + offsets[i][2] + Math.cos(t * speeds[i] + phases[i]) * 1.2;
        }
        pointsRef.current.geometry.attributes.position.needsUpdate = true;
    });

    return (
        <points ref={pointsRef}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" count={count} array={positions} itemSize={3} />
            </bufferGeometry>
            <pointsMaterial size={0.04} color={color} transparent opacity={0.9} sizeAttenuation depthWrite={false} blending={THREE.AdditiveBlending} />
        </points>
    );
};

/* ═══════════════════════════════════════════════════════════════
   MAIN SCENE
   ═══════════════════════════════════════════════════════════════ */
const OceanFloorScene = () => {
    const kelps = useMemo(() => [
        { pos: [-5.5, 0, -0.5], h: 3, color: '#10b981', speed: 0.7, density: 250 },
        { pos: [-4.2, 0, 0.8], h: 2.2, color: '#14b8a6', speed: 1.0, density: 180 },
        { pos: [-3, 0, -0.3], h: 3.5, color: '#059669', speed: 0.55, density: 300 },
        { pos: [-1.8, 0, 1.0], h: 2, color: '#34d399', speed: 1.1, density: 160 },
        { pos: [-0.5, 0, -1.0], h: 2.8, color: '#10b981', speed: 0.8, density: 220 },
        { pos: [0.8, 0, 0.6], h: 1.8, color: '#2dd4bf', speed: 0.95, density: 150 },
        { pos: [2, 0, -0.5], h: 2.5, color: '#059669', speed: 0.65, density: 200 },
        { pos: [3.2, 0, 0.5], h: 3.2, color: '#14b8a6', speed: 1.2, density: 260 },
        { pos: [4.5, 0, -0.2], h: 2.3, color: '#10b981', speed: 0.75, density: 190 },
        { pos: [5.5, 0, 0.9], h: 2, color: '#34d399', speed: 1.05, density: 160 },
        { pos: [6.2, 0, -0.7], h: 2.7, color: '#059669', speed: 0.6, density: 220 },
    ], []);

    const corals = useMemo(() => [
        { pos: [-4, 0, 0.3], color: '#ec4899', scale: 1.3, density: 350 },
        { pos: [-1.2, 0, -0.4], color: '#f43f5e', scale: 1.0, density: 280 },
        { pos: [1.5, 0, 1.0], color: '#e879f9', scale: 1.2, density: 320 },
        { pos: [3.8, 0, -0.1], color: '#fb7185', scale: 0.9, density: 250 },
        { pos: [5.8, 0, 0.5], color: '#ec4899', scale: 1.1, density: 300 },
    ], []);

    const anemones = useMemo(() => [
        { pos: [-3.5, 0.02, -0.1], color: '#f472b6', tentacles: 14, radius: 0.3, density: 200 },
        { pos: [0, 0.02, 0.8], color: '#c084fc', tentacles: 10, radius: 0.25, density: 160 },
        { pos: [2.8, 0.02, -0.3], color: '#fb923c', tentacles: 12, radius: 0.28, density: 180 },
        { pos: [5.2, 0.02, 0.2], color: '#f472b6', tentacles: 10, radius: 0.22, density: 150 },
    ], []);

    const grasses = useMemo(() => [
        { pos: [-5, 0, 0.2], color: '#34d399' },
        { pos: [-3.5, 0, 1.2], color: '#4ade80' },
        { pos: [-1, 0, -0.1], color: '#2dd4bf' },
        { pos: [1, 0, 1.3], color: '#34d399' },
        { pos: [2.5, 0, -0.8], color: '#4ade80' },
        { pos: [4, 0, 1.0], color: '#2dd4bf' },
        { pos: [6, 0, -0.1], color: '#34d399' },
    ], []);

    const gems = useMemo(() => [
        { pos: [-4.5, 0.2, 1.0], color: '#22d3ee', size: 0.12, speed: 0.3 },
        { pos: [-2, 0.22, -0.3], color: '#a78bfa', size: 0.15, speed: 0.5 },
        { pos: [-0.3, 0.15, 1.2], color: '#34d399', size: 0.1, speed: 0.45 },
        { pos: [1.5, 0.25, -0.1], color: '#60a5fa', size: 0.13, speed: 0.35 },
        { pos: [3, 0.18, 0.7], color: '#f472b6', size: 0.12, speed: 0.55 },
        { pos: [4.8, 0.16, -0.5], color: '#fbbf24', size: 0.1, speed: 0.4 },
        { pos: [6, 0.2, 0.4], color: '#22d3ee', size: 0.11, speed: 0.5 },
    ], []);

    return (
        <>
            {/* Lighting */}
            <ambientLight intensity={0.08} color="#0c4a6e" />
            <directionalLight position={[2, 10, 3]} intensity={0.2} color="#22d3ee" />
            <CausticLight />
            <pointLight position={[0, 3, 0]} intensity={0.3} color="#0ea5e9" distance={12} />
            <pointLight position={[-5, 2, 1]} intensity={0.2} color="#14b8a6" distance={10} />
            <pointLight position={[5, 2, -1]} intensity={0.2} color="#3b82f6" distance={10} />

            {/* Fog */}
            <fog attach="fog" args={['#000a14', 5, 16]} />

            {/* Ground */}
            <OceanGround />

            {/* Particle Kelp */}
            {kelps.map((k, i) => (
                <ParticleKelp key={`k-${i}`} position={k.pos} height={k.h} color={k.color} speed={k.speed} density={k.density} />
            ))}

            {/* Particle Grass */}
            {grasses.map((g, i) => (
                <ParticleGrass key={`sg-${i}`} position={g.pos} color={g.color} />
            ))}

            {/* Particle Corals */}
            {corals.map((c, i) => (
                <ParticleCoral key={`bc-${i}`} position={c.pos} color={c.color} scale={c.scale} density={c.density} />
            ))}

            {/* Particle Anemones */}
            {anemones.map((a, i) => (
                <ParticleAnemone key={`an-${i}`} position={a.pos} color={a.color} tentacles={a.tentacles} radius={a.radius} density={a.density} />
            ))}

            {/* Particle Gems */}
            {gems.map((g, i) => (
                <ParticleGem key={`gem-${i}`} position={g.pos} color={g.color} size={g.size} speed={g.speed} />
            ))}

            {/* Fish Schools */}
            <FishSchool center={[-2, 2, 0]} count={10} color="#67e8f9" />
            <FishSchool center={[3, 1.8, -0.5]} count={8} color="#38bdf8" />
            <FishSchool center={[0, 2.5, 1]} count={6} color="#7dd3fc" />

            {/* Bubbles & Plankton */}
            <BubbleField count={70} />
            <PlanktonField count={100} />
        </>
    );
};

/* ═══════════════════════════════════════════════════════════════
   EXPORTED COMPONENT
   ═══════════════════════════════════════════════════════════════ */
const OceanFloor3D = () => {
    return (
        <div className="w-full h-full relative">
            <Canvas
                camera={{ position: [0, 5, 4], fov: 45, near: 0.1, far: 25, rotation: [-0.7, 0, 0] }}
                dpr={[1, 1.5]}
                gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
                style={{ background: 'transparent' }}
            >
                <Suspense fallback={null}>
                    <OceanFloorScene />
                </Suspense>
            </Canvas>
        </div>
    );
};

export default OceanFloor3D;
