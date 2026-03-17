import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js';
import { MeshSurfaceSampler } from 'three/examples/jsm/math/MeshSurfaceSampler.js';

const ReadableParticleLoader = () => {
    const mountRef = useRef(null);

    useEffect(() => {
        let animationFrameId;

        const container = mountRef.current;
        if (!container) return;

        const scene = new THREE.Scene();
        scene.fog = new THREE.FogExp2(0x020617, 0.005);

        const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
        camera.position.set(0, -15, 100);

        const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        renderer.setSize(window.innerWidth, window.innerHeight);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1));
        container.appendChild(renderer.domElement);

        let particles;
        const particleCount = 35000;
        let positions, colors, targets, velocities;
        const colorBase = new THREE.Color(0x0ea5e9);
        const colorActive = new THREE.Color(0x22d3ee);
        const clock = new THREE.Clock();

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
        const onMouseOut = () => { isMouseActive = false; };

        window.addEventListener('mousemove', onMouseMove);
        window.addEventListener('mouseout', onMouseOut);

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

        const loader = new FontLoader();
        loader.load('https://unpkg.com/three@0.160.0/examples/fonts/droid/droid_sans_bold.typeface.json', function (font) {
            const textGeo = new TextGeometry('AVISHKAAR', {
                font: font,
                size: 12,
                height: 2,
                curveSegments: 4,
                bevelEnabled: true,
                bevelThickness: 0.5,
                bevelSize: 0.2,
                bevelSegments: 2
            });

            textGeo.computeBoundingBox();
            textGeo.center();

            const textMesh = new THREE.Mesh(textGeo, new THREE.MeshBasicMaterial());

            const sampler = new MeshSurfaceSampler(textMesh).build();

            const geometry = new THREE.BufferGeometry();
            positions = new Float32Array(particleCount * 3);
            targets = new Float32Array(particleCount * 3);
            velocities = new Float32Array(particleCount * 3);
            colors = new Float32Array(particleCount * 3);

            const tempPosition = new THREE.Vector3();

            for (let i = 0; i < particleCount; i++) {
                sampler.sample(tempPosition);

                targets[i * 3] = tempPosition.x;
                targets[i * 3 + 1] = tempPosition.y;
                targets[i * 3 + 2] = tempPosition.z;

                positions[i * 3] = (Math.random() - 0.5) * 100;
                positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
                positions[i * 3 + 2] = (Math.random() - 0.5) * 100;

                colors[i * 3] = colorBase.r;
                colors[i * 3 + 1] = colorBase.g;
                colors[i * 3 + 2] = colorBase.b;
            }

            geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
            geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

            const material = new THREE.PointsMaterial({
                size: 0.5,
                vertexColors: true,
                map: particleTexture,
                transparent: true,
                blending: THREE.AdditiveBlending,
                depthWrite: false
            });

            particles = new THREE.Points(geometry, material);
            scene.add(particles);
        });

        const animate = () => {
            animationFrameId = requestAnimationFrame(animate);
            if (document.body.classList.contains('nav-open')) return;
            const time = clock.getElapsedTime();

            if (particles) {
                const posAttr = particles.geometry.attributes.position;
                const colAttr = particles.geometry.attributes.color;

                for (let i = 0; i < particleCount; i++) {
                    const i3 = i * 3;

                    let px = posAttr.array[i3];
                    let py = posAttr.array[i3 + 1];
                    let pz = posAttr.array[i3 + 2];

                    let tx = targets[i3];
                    let ty = targets[i3 + 1];
                    let tz = targets[i3 + 2];

                    ty += Math.sin(tx * 0.1 + time * 1.5) * 1.5;
                    tz += Math.cos(tx * 0.1 + time * 1.5) * 1.5;

                    let distToMouse = 999;
                    if (isMouseActive) {
                        const dx = px - mouse3D.x;
                        const dy = py - mouse3D.y;
                        const dz = pz - mouse3D.z;
                        distToMouse = Math.sqrt(dx * dx + dy * dy + dz * dz);

                        const repelRadius = 8;
                        if (distToMouse < repelRadius) {
                            const force = (repelRadius - distToMouse) / repelRadius;
                            tx += (dx / distToMouse) * force * 10;
                            ty += (dy / distToMouse) * force * 10;
                            tz += (dz / distToMouse) * force * 10;
                        }
                    }

                    velocities[i3] += (tx - px) * 0.04;
                    velocities[i3 + 1] += (ty - py) * 0.04;
                    velocities[i3 + 2] += (tz - pz) * 0.04;

                    velocities[i3] *= 0.82;
                    velocities[i3 + 1] *= 0.82;
                    velocities[i3 + 2] *= 0.82;

                    posAttr.array[i3] += velocities[i3];
                    posAttr.array[i3 + 1] += velocities[i3 + 1];
                    posAttr.array[i3 + 2] += velocities[i3 + 2];

                    let currentColor = new THREE.Color(colAttr.array[i3], colAttr.array[i3 + 1], colAttr.array[i3 + 2]);
                    let targetColor = distToMouse < 20 ? colorActive : colorBase;

                    currentColor.lerp(targetColor, 0.1);
                    colAttr.array[i3] = currentColor.r;
                    colAttr.array[i3 + 1] = currentColor.g;
                    colAttr.array[i3 + 2] = currentColor.b;
                }

                posAttr.needsUpdate = true;
                colAttr.needsUpdate = true;
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
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseout', onMouseOut);
            window.removeEventListener('resize', handleResize);
            if (container.contains(renderer.domElement)) {
                container.removeChild(renderer.domElement);
            }
            renderer.dispose();
            scene.clear();
        };
    }, []);

    return (
        <div className="absolute inset-0 z-[15] pointer-events-auto">
            <div
                ref={mountRef}
                className="w-full h-full cursor-crosshair"
            />
        </div>
    );
};

export default ReadableParticleLoader;
