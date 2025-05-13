import React from "react";
import { Canvas } from "@react-three/fiber";
import { Sphere, MeshDistortMaterial } from "@react-three/drei";

export default function ThreeBackground() {
  return (
    <Canvas
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: -1,
        pointerEvents: "none",
      }}
    >
      <ambientLight intensity={0.7} />
      <pointLight position={[10, 10, 10]} />
      <Sphere args={[1.2, 64, 64]} scale={2.2} position={[-2, 0, 0]}>
        <MeshDistortMaterial color="#a78bfa" distort={0.4} speed={2} />
      </Sphere>
      <Sphere args={[1.1, 64, 64]} scale={1.7} position={[2, 1, 1]}>
        <MeshDistortMaterial color="#38bdf8" distort={0.3} speed={2.5} />
      </Sphere>
      <Sphere args={[0.7, 64, 64]} scale={1.2} position={[0, -2, -1]}>
        <MeshDistortMaterial color="#6366f1" distort={0.5} speed={1.7} />
      </Sphere>
    </Canvas>
  );
}
