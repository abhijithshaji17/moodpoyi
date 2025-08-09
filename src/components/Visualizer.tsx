"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Box, Sphere, OrbitControls } from "@react-three/drei";
import * as THREE from "three";

function Dancer({ emotion }: { emotion: string | null }) {
  const group = useRef<THREE.Group>(null);
  const head = useRef<THREE.Mesh>(null);
  const leftArm = useRef<THREE.Mesh>(null);
  const rightArm = useRef<THREE.Mesh>(null);
  const leftLeg = useRef<THREE.Mesh>(null);
  const rightLeg = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    // Default animation
    let speed = 1;
    let armSwing = Math.sin(t * speed) * 0.5;
    let legSwing = Math.cos(t * speed) * 0.4;
    let headBob = Math.sin(t * speed) * 0.1;

    if (emotion === "happy") {
      speed = 4;
      armSwing = Math.sin(t * speed) * 1.2;
      legSwing = Math.cos(t * speed) * 0.8;
      headBob = Math.sin(t * speed * 2) * 0.2;
    } else if (emotion === "sad") {
      speed = 0.5;
      armSwing = Math.sin(t * speed) * 0.2;
      legSwing = Math.cos(t * speed) * 0.1;
      headBob = Math.sin(t * speed) * 0.05;
    } else if (emotion === "angry") {
      speed = 10;
      armSwing = (Math.random() - 0.5) * 2;
      legSwing = (Math.random() - 0.5) * 1;
      headBob = (Math.random() - 0.5) * 0.3;
    }

    if (head.current) head.current.position.y = 1.5 + headBob;
    if (leftArm.current) leftArm.current.rotation.x = armSwing;
    if (rightArm.current) rightArm.current.rotation.x = -armSwing;
    if (leftLeg.current) leftLeg.current.rotation.x = legSwing;
    if (rightLeg.current) rightLeg.current.rotation.x = -legSwing;
  });

  return (
    <group ref={group}>
      {/* Head */}
      <Sphere ref={head} args={[0.5, 16, 16]} position={[0, 1.5, 0]}>
        <meshStandardMaterial color="white" />
      </Sphere>
      {/* Body */}
      <Box args={[1, 1.5, 0.5]} position={[0, 0, 0]}>
        <meshStandardMaterial color="blue" />
      </Box>
      {/* Arms */}
      <Box ref={leftArm} args={[0.2, 1, 0.2]} position={[-0.7, 0.5, 0]}>
        <meshStandardMaterial color="red" />
      </Box>
      <Box ref={rightArm} args={[0.2, 1, 0.2]} position={[0.7, 0.5, 0]}>
        <meshStandardMaterial color="red" />
      </Box>
      {/* Legs */}
      <Box ref={leftLeg} args={[0.3, 1.2, 0.3]} position={[-0.3, -1.3, 0]}>
        <meshStandardMaterial color="green" />
      </Box>
      <Box ref={rightLeg} args={[0.3, 1.2, 0.3]} position={[0.3, -1.3, 0]}>
        <meshStandardMaterial color="green" />
      </Box>
    </group>
  );
}

export default function Visualizer({ emotion }: { emotion: string | null }) {
  return (
    <Canvas camera={{ position: [0, 1, 8] }}>
      <ambientLight intensity={0.8} />
      <pointLight position={[10, 10, 10]} />
      <group position={[0, 1, 0]}>
        <Dancer emotion={emotion} />
      </group>
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
}
