'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGameStore } from '@/store/gameStore';
import * as THREE from 'three';

const LANE_WIDTH = 3;
const JUMP_HEIGHT = 2;
const JUMP_DURATION = 0.6; // seconds
const SLIDE_DURATION = 0.6; // seconds

export default function Ball() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  const lane = useGameStore((state) => state.lane);
  const isJumping = useGameStore((state) => state.isJumping);
  const isSliding = useGameStore((state) => state.isSliding);
  const endJump = useGameStore((state) => state.endJump);
  const endSlide = useGameStore((state) => state.endSlide);
  const coins = useGameStore((state) => state.coins);
  const status = useGameStore((state) => state.status);

  // Local state for animations
  const jumpTimer = useRef(0);
  const slideTimer = useRef(0);

  // Visual Evolution based on coins
  // Tier 1: normal, Tier 2: shiny (metal), Tier 3: glowing (emissive)
  const tier = Math.min(Math.floor(coins / 10), 2);
  const colors = ['#FF4500', '#00FA9A', '#00BFFF'];
  const emissiveIntensities = [0, 0.5, 2];
  
  useFrame((state, delta) => {
    if (!meshRef.current || status !== 'playing') return;

    // Lateral movement (lerp to target lane)
    const targetX = lane * LANE_WIDTH;
    meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 10 * delta);

    // Jump logic
    if (isJumping) {
      jumpTimer.current += delta;
      const progress = jumpTimer.current / JUMP_DURATION;
      
      if (progress >= 1) {
        jumpTimer.current = 0;
        meshRef.current.position.y = 0.5; // base radius
        endJump();
      } else {
        // Parabola: 4 * h * p * (1-p)
        const heightOffset = 4 * JUMP_HEIGHT * progress * (1 - progress);
        meshRef.current.position.y = 0.5 + heightOffset;
      }
    } else {
      meshRef.current.position.y = 0.5;
    }

    // Slide logic
    if (isSliding) {
      slideTimer.current += delta;
      if (slideTimer.current >= SLIDE_DURATION) {
        slideTimer.current = 0;
        meshRef.current.scale.set(1, 1, 1);
        meshRef.current.position.y = isJumping ? meshRef.current.position.y : 0.5;
        endSlide();
      } else {
        meshRef.current.scale.set(1, 0.5, 1);
        meshRef.current.position.y = 0.25; // adjusted for scaled height
      }
    } else {
       meshRef.current.scale.set(1, 1, 1);
    }
    
    // Rotate ball to simulate rolling
    const speed = useGameStore.getState().speed;
    meshRef.current.rotation.x -= speed * delta * 2;
  });

  return (
    <mesh ref={meshRef} position={[0, 0.5, 0]} castShadow>
      <sphereGeometry args={[0.5, 32, 32]} />
      <meshStandardMaterial 
        color={colors[tier]} 
        metalness={tier >= 1 ? 0.8 : 0.1}
        roughness={tier >= 1 ? 0.2 : 0.8}
        emissive={colors[tier]}
        emissiveIntensity={emissiveIntensities[tier]}
      />
    </mesh>
  );
}