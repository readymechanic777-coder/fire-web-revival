import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const OceanBackground = () => {
    const mountRef = useRef(null);
    const templateRef = useRef('wave');
    const [activeBtn, setActiveBtn] = useState('wave');

    useEffect(() => {
        let animationFrameId;
        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x020617, 0.002);

        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        camera.position.set(0, 30, 80);
        camera.lookAt(0, 0, 0);

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1));
        if (mountRef.current) {
            mountRef.current.appendChild(renderer.domElement);
        }

        // [3D Web Experience Pattern]: Adjust quality based on device capabilities
        const isMobile = window.innerWidth < 768;
        const particleCount = isMobile ? 6400 : 25600;
        const gridSize = isMobile ? 80 : 160;
        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);
        const targets = new Float32Array(particleCount * 3);
        const velocities = new Float32Array(particleCount * 3);

        const indices = [];
        for (let iy = 0; iy < gridSize - 1; iy++) {
            for (let ix = 0; ix < gridSize - 1; ix++) {
                const a = ix + iy * gridSize;
                const b = (ix + 1) + iy * gridSize;
                const c = ix + (iy + 1) * gridSize;
                const d = (ix + 1) + (iy + 1) * gridSize;

                indices.push(a, b, d);
                indices.push(a, d, c);
            }
        }
        geometry.setIndex(indices);

        const colorBase = new THREE.Color();
        const colorActive = new THREE.Color(0x22d3ee);

        for (let i = 0; i < particleCount; i++) {
            positions[i * 3] = (Math.random() - 0.5) * 10;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
            colors[i * 3] = 0;
            colors[i * 3 + 1] = 0;
            colors[i * 3 + 2] = 0;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const texCanvas = document.createElement('canvas');
        texCanvas.width = 16;
        texCanvas.height = 16;
        const context = texCanvas.getContext('2d');
        const gradient = context.createRadialGradient(8, 8, 0, 8, 8, 8);
        gradient.addColorStop(0, 'rgba(34,211,238,1)');
        gradient.addColorStop(1, 'rgba(34,211,238,0)');
        context.fillStyle = gradient;
        context.fillRect(0, 0, 16, 16);
        const particleTexture = new THREE.CanvasTexture(texCanvas);

        // [CHANGE HERE]: The size of the wave particles
        const material = new THREE.PointsMaterial({
            size: 0.4,
            vertexColors: true,
            map: particleTexture,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false,
        });

        const waterMat = new THREE.MeshBasicMaterial({
            color: 0x032b43,
            transparent: true,
            opacity: 0,
            wireframe: true,
            blending: THREE.AdditiveBlending
        });

        const particles = new THREE.Points(geometry, material);
        const waterMesh = new THREE.Mesh(geometry, waterMat);
        scene.add(particles);
        scene.add(waterMesh);

        const mouse = new THREE.Vector2();
        const raycaster = new THREE.Raycaster();
        const mousePlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
        const mouse3D = new THREE.Vector3(0, 0, 0);
        let isMouseActive = false;

        const onMouseMove = (event) => {
            mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

            raycaster.setFromCamera(mouse, camera);
            raycaster.ray.intersectPlane(mousePlane, mouse3D);
            isMouseActive = true;
        };
        const onMouseOut = () => (isMouseActive = false);

        let scrollY = 0;
        const onScroll = () => {
            scrollY = window.scrollY;
        };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseout', onMouseOut);
        window.addEventListener('scroll', onScroll, { passive: true });

        const clock = new THREE.Clock();
        let lastTemplate = '';

        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);
            if (document.body.classList.contains('nav-open')) return;
            const time = clock.getElapsedTime();

            const currentTemplate = templateRef.current;

            if (currentTemplate === 'wave') {
                // Scroll-driven 3D: Adjust camera height and y-rotation based on scroll depth
                const scrollEffect = scrollY * 0.05;
                camera.position.lerp(new THREE.Vector3(0, 15 + scrollEffect * 0.1, 30 + scrollEffect), 0.02);
                waterMat.opacity = THREE.MathUtils.lerp(waterMat.opacity, 0.4, 0.05);
            } else if (currentTemplate === 'globe') {
                camera.position.lerp(new THREE.Vector3(0, 20, 150), 0.02);
                waterMat.opacity = THREE.MathUtils.lerp(waterMat.opacity, 0, 0.1);
            }
            camera.lookAt(0, 0, 0);
            waterMesh.visible = waterMat.opacity > 0.01;

            if (currentTemplate !== lastTemplate) {
                lastTemplate = currentTemplate;
                for (let i = 0; i < particleCount; i++) {
                    let ix = i % gridSize;
                    let iy = Math.floor(i / gridSize);

                    if (currentTemplate === 'wave') {
                        targets[i * 3] = (ix - gridSize / 2) * 1.0;
                        targets[i * 3 + 1] = 0;
                        targets[i * 3 + 2] = (iy - gridSize / 2) * 1.0;
                    } else if (currentTemplate === 'globe') {
                        const radius = 170;
                        const phi = Math.acos(1 - (i + 0.5) / particleCount);
                        const theta = Math.PI * (1 + Math.sqrt(5)) * i;

                        targets[i * 3] = radius * Math.cos(theta) * Math.sin(phi);
                        targets[i * 3 + 1] = radius * Math.cos(phi) - 130;
                        targets[i * 3 + 2] = radius * Math.sin(theta) * Math.sin(phi);
                    }
                }
            }

            const lerp = (a, b, t) => a + (b - a) * t;
            const cycleDuration = 32;
            const cycleTime = time % cycleDuration;
            const kf = [
                { time: 0, amp: 3.5, freq: 0.12, scale: 1.5, tm: -1.2, comp: 0, fog: 0.002 },
                { time: 8, amp: 3.5, freq: 0.12, scale: 1.5, tm: -1.2, comp: 0, fog: 0.002 },
                { time: 13, amp: 1.5, freq: 0.20, scale: 1.1, tm: -0.6, comp: 0, fog: 0.003 },
                { time: 19, amp: 0.6, freq: 0.04, scale: 5.5, tm: 0.2, comp: 0, fog: 0.0015 },
                { time: 26, amp: 6.5, freq: 0.16, scale: 2.2, tm: 1.5, comp: 1, fog: 0.0025 },
                { time: 32, amp: 3.5, freq: 0.12, scale: 1.5, tm: -1.2, comp: 0, fog: 0.002 }
            ];
            let k = 0;
            while (k < kf.length - 1 && cycleTime > kf[k + 1].time) k++;
            const segT = (cycleTime - kf[k].time) / (kf[k + 1].time - kf[k].time);
            const easeT = segT * segT * (3 - 2 * segT);
            const cinematic = {
                amp: lerp(kf[k].amp, kf[k + 1].amp, easeT),
                freq: lerp(kf[k].freq, kf[k + 1].freq, easeT),
                scale: lerp(kf[k].scale, kf[k + 1].scale, easeT),
                tm: lerp(kf[k].tm, kf[k + 1].tm, easeT),
                comp: lerp(kf[k].comp, kf[k + 1].comp, easeT),
                fog: lerp(kf[k].fog, kf[k + 1].fog, easeT)
            };
            scene.fog.density = cinematic.fog;

            const posAttr = geometry.attributes.position;
            const colAttr = geometry.attributes.color;

            for (let i = 0; i < particleCount; i++) {
                const i3 = i * 3;
                let ix = i % gridSize;
                let iy = Math.floor(i / gridSize);

                let px = posAttr.array[i3];
                let py = posAttr.array[i3 + 1];
                let pz = posAttr.array[i3 + 2];

                if (currentTemplate === 'wave') {
                    const spacing = 1.0;
                    targets[i3] = (ix - gridSize / 2) * spacing;
                    targets[i3 + 2] = (iy - gridSize / 2) * spacing;

                    const x = targets[i3];
                    const z = targets[i3 + 2];

                    const wave1 = Math.sin(x * 0.1 + time * 1.5) * 2.5;
                    const wave2 = Math.cos(z * 0.1 - time * 1.5) * 2.5;
                    const wave3 = Math.sin((x + z) * 0.05 + time) * 1.5;

                    targets[i3 + 1] = wave1 + wave2 + wave3;
                }

                let tx = targets[i3];
                let ty = targets[i3 + 1];
                let tz = targets[i3 + 2];

                let distToMouse = 999;
                if (isMouseActive) {
                    const dx = px - mouse3D.x;
                    const dy = py - mouse3D.y;
                    const dz = pz - mouse3D.z;
                    distToMouse = Math.sqrt(dx * dx + dy * dy + dz * dz);

                    // [CHANGE HERE]: Wave Mouse Interaction - Radius of effect
                    const repelRadius = 40;
                    if (distToMouse < repelRadius) {
                        const force = (repelRadius - distToMouse) / repelRadius;
                        // [CHANGE HERE]: Wave Mouse Interaction - Push force
                        tx += (dx / distToMouse) * force * 30;
                        ty += (dy / distToMouse) * force * 30;
                        tz += (dz / distToMouse) * force * 30;
                    }
                }

                velocities[i3] += (tx - px) * 0.02;
                velocities[i3 + 1] += (ty - py) * 0.02;
                velocities[i3 + 2] += (tz - pz) * 0.02;

                velocities[i3] *= 0.92;
                velocities[i3 + 1] *= 0.92;
                velocities[i3 + 2] *= 0.92;

                posAttr.array[i3] += velocities[i3];
                posAttr.array[i3 + 1] += velocities[i3 + 1];
                posAttr.array[i3 + 2] += velocities[i3 + 2];

                let currentColor = new THREE.Color(colAttr.array[i3], colAttr.array[i3 + 1], colAttr.array[i3 + 2]);
                let targetColor = colorBase;

                if (distToMouse < 30) {
                    targetColor = colorActive;
                } else {
                    if (currentTemplate === 'wave') {
                        const hue = 0.55 + Math.sin(px * 0.02 + time * 0.1) * 0.02 + cinematic.comp * 0.04;
                        const lum = 0.3 + (cinematic.amp * 0.03) + (Math.sin(pz * 0.01 + time) * 0.05);
                        targetColor.setHSL(hue, 0.9, Math.min(lum, 0.6));
                    } else if (currentTemplate === 'globe') {
                        targetColor.setHex(0x0ea5e9);
                    }
                }

                currentColor.lerp(targetColor, 0.05);
                colAttr.array[i3] = currentColor.r;
                colAttr.array[i3 + 1] = currentColor.g;
                colAttr.array[i3 + 2] = currentColor.b;
            }

            posAttr.needsUpdate = true;
            colAttr.needsUpdate = true;

            if (currentTemplate === 'wave') {
                scene.rotation.y = THREE.MathUtils.lerp(scene.rotation.y, 0, 0.05);
                scene.rotation.x = THREE.MathUtils.lerp(scene.rotation.x, 0, 0.05);
            } else if (currentTemplate === 'globe') {
                scene.rotation.y = time * 0.05;
                scene.rotation.x = 0;
            }

            renderer.render(scene, camera);
        };

        animate();

        const handleResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
            renderer.setSize(window.innerWidth, window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseout', onMouseOut);
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', handleResize);
            cancelAnimationFrame(animationFrameId);
            if (mountRef.current && renderer.domElement) {
                mountRef.current.removeChild(renderer.domElement);
            }
            renderer.dispose();
        };
    }, []);

    const changeTemplate = (template) => {
        templateRef.current = template;
        setActiveBtn(template);
    };

    return (
        <div className="absolute inset-0 z-0 overflow-hidden w-full h-full bg-slate-950">
            <div ref={mountRef} className="absolute inset-0" />
            <div className="absolute bottom-2 right-4 md:bottom-3 md:right-6 z-50 flex gap-2 md:gap-3 pointer-events-auto">
                {['globe', 'wave'].map((btn) => (
                    <button
                        key={btn}
                        onClick={() => changeTemplate(btn)}
                        className={`px-4 py-2 rounded-md border text-xs uppercase tracking-wide transition-all ${activeBtn === btn
                            ? 'bg-cyan-400/20 text-white border-cyan-400 shadow-[0_0_10px_rgba(34,211,238,0.3)]'
                            : 'bg-slate-950/60 text-cyan-400 border-cyan-400 backdrop-blur hover:bg-cyan-400/20 hover:text-white'
                            }`}
                    >
                        {btn}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default OceanBackground;
