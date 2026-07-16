'use client';

import { useFrame } from '@react-three/fiber';
import { useGameStore } from '@/store/gameStore';

export default function GameManager() {
  const status = useGameStore((state) => state.status);
  const speed = useGameStore((state) => state.speed);
  const addScore = useGameStore((state) => state.addScore);

  useFrame((state, delta) => {
    if (status === 'playing') {
      // Base score increase is 10 points per second at speed 10
      addScore(speed * delta);
    }
  });

  return null;
}