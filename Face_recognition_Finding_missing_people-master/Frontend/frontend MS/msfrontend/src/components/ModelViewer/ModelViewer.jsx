import React, { useRef, useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Environment, Text, Float } from '@react-three/drei';

function PosterFace({ position, rotation }) {
  return (
    <group position={position} rotation={rotation}>
      {/* Nail hole area */}
      <mesh position={[0, 1.5, 0.005]}>
        <cylinderGeometry args={[0.2, 0.2, 0.02, 16]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#222" />
      </mesh>
      <mesh position={[0, 1.5, 0.015]}>
        <cylinderGeometry args={[0.08, 0.08, 0.04, 16]} rotation={[Math.PI / 2, 0, 0]} />
        <meshStandardMaterial color="#e2e2e2" />
      </mesh>

      {/* MISSING Text */}
      <Text
        position={[0, 0.9, 0.01]}
        color="#111"
        fontSize={0.65}
        fontWeight="bold"
        anchorX="center"
        anchorY="middle"
      >
        MISSING
      </Text>

      {/* Blue Background for Image */}
      <mesh position={[0, -0.4, 0.01]}>
        <boxGeometry args={[2.2, 2.0, 0.02]} />
        <meshStandardMaterial color="#3b82f6" roughness={0.6} />
      </mesh>

      {/* Silhouette */}
      <mesh position={[0, -1.0, 0.05]}>
        <cylinderGeometry args={[0.5, 0.8, 0.8, 32]} />
        <meshStandardMaterial color="#ffffff" roughness={0.3} />
      </mesh>
      <mesh position={[0, -0.25, 0.1]}>
        <sphereGeometry args={[0.45, 32, 32]} />
        <meshStandardMaterial color="#ffffff" roughness={0.3} />
      </mesh>

      {/* Question Mark */}
      <Text
        position={[0, -0.25, 0.57]}
        color="#111"
        fontSize={0.5}
        fontWeight="bold"
        anchorX="center"
        anchorY="middle"
      >
        ?
      </Text>
    </group>
  );
}

function MissingPoster({ interacted }) {
  const groupRef = useRef();

  return (
    <Float speed={interacted ? 2 : 0} rotationIntensity={interacted ? 0.2 : 0} floatIntensity={interacted ? 0.5 : 0}>
      <group ref={groupRef} rotation={[0, -0.1, 0]}>
        {/* The parchment/poster board */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry args={[3, 4, 0.1]} />
          <meshStandardMaterial color="#fdf2d5" roughness={0.9} />
        </mesh>

        {/* Front Face */}
        <PosterFace position={[0, 0, 0.05]} rotation={[0, 0, 0]} />

        {/* Back Face (rotated 180 degrees) */}
        <PosterFace position={[0, 0, -0.05]} rotation={[0, Math.PI, 0]} />
      </group>
    </Float>
  );
}

const ModelViewer = () => {
  const [interacted, setInteracted] = useState(false);

  return (
    <div
      style={{ width: '100%', height: '500px', margin: '0 auto', cursor: interacted ? 'grabbing' : 'grab' }}
      title="Hover or drag to rotate, scroll to zoom"
      onPointerEnter={() => setInteracted(true)}
      onPointerLeave={() => setInteracted(false)}
    >
      <Canvas camera={{ position: [0, 0, 6.5], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[5, 5, 5]} intensity={1.5} />
        <spotLight position={[-5, 5, 5]} angle={0.15} penumbra={1} intensity={1} />

        <MissingPoster interacted={interacted} />

        <OrbitControls enableZoom={true} autoRotate={interacted} autoRotateSpeed={1.5} />
        <Environment preset="city" />
      </Canvas>
    </div>
  );
};

export default ModelViewer;
