"use client";

import React, { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Sphere, OrbitControls } from "@react-three/drei";

function FloatingSphere({ color }: { color: string }) {
  const mesh = useRef<any>(null);
  useFrame(({ clock }) => {
    mesh.current.rotation.y = clock.getElapsedTime() * 0.3;
  });
  return (
    <Sphere ref={mesh} args={[1, 32, 32]}>
      <meshStandardMaterial color={color} wireframe />
    </Sphere>
  );
}

export default function Visualizer({ emotion }: { emotion: string | null }) {
  const colorMap: Record<string, string> = {
    happy: "yellow",
    sad: "blue",
    angry: "red",
    surprised: "purple",
    neutral: "white",
    fearful: "orange",
    disgusted: "green",
  };

  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />
      <FloatingSphere color={emotion ? colorMap[emotion] : "gray"} />
      <OrbitControls enableZoom={false} />
    </Canvas>
  );
}
