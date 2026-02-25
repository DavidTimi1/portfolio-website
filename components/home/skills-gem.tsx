"use client";

import React, { useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Html, OrbitControls, Environment, Float, Stars } from "@react-three/drei";
import * as THREE from "three";
import {
    FaHtml5, FaCss3Alt, FaJs, FaReact, FaNodeJs, FaPython,
    FaGitAlt, FaGithub, FaFigma
} from "react-icons/fa";
import {
    SiTypescript, SiTailwindcss, SiNextdotjs, SiDjango,
    SiBootstrap, SiMysql, SiPostgresql, SiC
} from "react-icons/si";

// Define the technologies and their icons
const technologies = [
    { name: "HTML", icon: <FaHtml5 className="text-[#E34F26]" /> },
    { name: "CSS", icon: <FaCss3Alt className="text-[#1572B6]" /> },
    { name: "JavaScript", icon: <FaJs className="text-[#F7DF1E]" /> },
    { name: "TypeScript", icon: <SiTypescript className="text-[#3178C6]" /> },
    { name: "Flask", icon: <FaPython className="text-[#3776AB]" /> },
    { name: "React", icon: <FaReact className="text-[#61DAFB]" /> },
    { name: "Tailwind", icon: <SiTailwindcss className="text-[#06B6D4]" /> },
    { name: "Node.js", icon: <FaNodeJs className="text-[#339933]" /> },
    { name: "Next.js", icon: <SiNextdotjs className="text-white" /> },
    { name: "Python", icon: <FaPython className="text-[#3776AB]" /> },
    { name: "Django", icon: <SiDjango className="text-[#092E20]" /> },
    { name: "Bootstrap", icon: <SiBootstrap className="text-[#7952B3]" /> },
    { name: "MySQL", icon: <SiMysql className="text-[#4479A1]" /> },
    { name: "Git", icon: <FaGitAlt className="text-[#F05032]" /> },
    { name: "GitHub", icon: <FaGithub className="text-white" /> },
    { name: "Figma", icon: <FaFigma className="text-[#F24E1E]" /> },
    { name: "C", icon: <SiC className="text-[#A8B9CC]" /> },
    { name: "PostgreSQL", icon: <SiPostgresql className="text-[#4169E1]" /> },
];

function Gem({ count = technologies.length }) {
    const meshRef = useRef<THREE.Mesh>(null);

    // Create an Icosahedron geometry to distribute points evenly
    const radius = 1;
    // const geometry = useMemo(() => new THREE.IcosahedronGeometry(radius, 0), []);

    // Get vertices from the geometry to position our icons
    const verticesGeometry = useMemo(() => new THREE.IcosahedronGeometry(radius, 1), []);
    const vertices = useMemo(() => {
        const pos = verticesGeometry.attributes.position;
        const verts = [];
        for (let i = 0; i < pos.count; i++) {
            verts.push(new THREE.Vector3().fromBufferAttribute(pos, i));
        }
        return verts;

    }, [verticesGeometry]);

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += delta * 0.1;
            meshRef.current.rotation.x += delta * 0.05;
        }
    });

    return (
        <group>
            {/* The Gem Core */}
            <mesh ref={meshRef} visible={false}>
                <icosahedronGeometry args={[radius, 1]} />
                <meshBasicMaterial wireframe color="white" transparent opacity={0.1} />
            </mesh>

            {/* Floating Icons */}
            <group rotation={[0, 0, 0]}>
                <RotatingGroup vertices={vertices} />
            </group>
        </group>
    );
}

function RotatingGroup({ vertices }: { vertices: THREE.Vector3[] }) {
    const groupRef = useRef<THREE.Group>(null);
    useFrame((state, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += delta * 0.08;
            groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.2) * 0.2;
        }
    });

    // Shuffle or pick with a stride.
    const stride = Math.floor(vertices.length / technologies.length) || 1;
    const usedVertices = vertices.filter((_, i) => i % stride === 0).slice(0, technologies.length);

    return (
        <group ref={groupRef}>
            <mesh>
                <icosahedronGeometry args={[2.4, 0]} />
                <meshBasicMaterial
                    color="#00f0ff"
                    wireframe
                    transparent
                    opacity={0.05}
                />
            </mesh>

            {technologies.map((tech, i) => {
                const pos = usedVertices[i] || new THREE.Vector3(0, 0, 0);
                return (
                    <TechPoint
                        key={tech.name}
                        position={pos}
                        icon={tech.icon}
                        label={tech.name}
                    />
                );
            })}
        </group>
    );
}

function TechPoint({ position, icon, label }: { position: THREE.Vector3, icon: React.ReactNode, label: string }) {
    const [hovered, setHovered] = useState(false);

    return (
        <group position={position}>
            <Html center distanceFactor={12} zIndexRange={[100, 0]}>
                <div
                    className={`
                        relative flex flex-col items-center justify-center 
                        transition-all duration-300 cursor-pointer
                        ${hovered ? 'scale-125 z-50' : 'scale-100 opacity-80'}
                    `}
                    onMouseEnter={() => setHovered(true)}
                    onMouseLeave={() => setHovered(false)}
                >
                    <div className="
                        w-6 h-6 rounded-full 
                        bg-black/50 backdrop-blur-md 
                        border border-white/10 
                        flex items-center justify-center
                        shadow-[0_0_15px_rgba(0,240,255,0.2)]
                        hover:bg-black/80 hover:border-[#00f0ff]/50 hover:shadow-[0_0_20px_#00f0ff]
                    ">
                        <div className="text-lg">
                            {icon}
                        </div>
                    </div>
                    {hovered && (
                        <div className="absolute top-14 bg-black/80 text-white text-xs px-2 py-1 rounded border border-white/10 whitespace-nowrap backdrop-blur-sm">
                            {label}
                        </div>
                    )}
                </div>
            </Html>

            {/* dot at the center of each node */}
            <mesh>
                <sphereGeometry args={[0.05, 16, 16]} />
                <meshBasicMaterial color="#00f0ff" />
            </mesh>
        </group>
    );
}

export default function SkillsGem() {
    return (
        <div className="w-full h-[600px] relative">
            <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
                <fog attach="fog" args={['black', 5, 20]} />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} color="#00f0ff" />
                <pointLight position={[-10, -10, -10]} intensity={0.5} color="#ff00ff" />

                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

                <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
                    <Gem />
                </Float>

                <OrbitControls
                    enableZoom={false}
                    enablePan={false}
                    autoRotate={false}
                    rotateSpeed={0.5}
                />
                <Environment preset="city" />
            </Canvas>
        </div>
    );
}
