'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGameStore } from '@/store/gameStore';
import * as THREE from 'three';

export default function Road() {
  const gridRef = useRef<THREE.GridHelper>(null);
  const status = useGameStore((state) => state.status);
  const speed = useGameStore((state) => state.speed);
  const level = useGameStore((state) => state.level);

  useFrame((state, delta) => {
    if (status !== 'playing' || !gridRef.current) return;

    // Move grid backwards to simulate forward movement
    gridRef.current.position.z += speed * delta;
    
    // Reset grid position to create infinite loop effect
    // Grid size is 100, divisions 100, so each square is 1 unit.
    if (gridRef.current.position.z >= 10) {
      gridRef.current.position.z -= 10;
    }
  });

  const roadColors = [
    '#555555', // Level 1
    '#6b4423', // Level 2
    '#223344', // Level 3
    '#111111', // Level 4
    '#2b005e', // Level 5
  ];
  
  const currentRoadColor = roadColors[(level - 1) % roadColors.length];

  return (
    <group>
      {/* Solid ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.1, -20]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color={currentRoadColor} />
      </mesh>
      
      {/* Moving Grid for speed illusion */}
      <gridHelper 
        ref={gridRef}
        args={[100, 100, '#ffffff', '#ffffff']} 
        position={[0, 0, -20]} 
      />

      {/* Lane markers */}
      <mesh position={[-1.5, 0.01, -20]} rotation={[-Math.PI / 2, 0, 0]}>
         <planeGeometry args={[0.1, 100]} />
         <meshBasicMaterial color="#ffffff" transparent opacity={0.5} />
      </mesh>
      <mesh position={[1.5, 0.01, -20]} rotation={[-Math.PI / 2, 0, 0]}>
         <planeGeometry args={[0.1, 100]} />
         <meshBasicMaterial color="#ffffff" transparent opacity={0.5} />
      </mesh>
    </group>
  );
}