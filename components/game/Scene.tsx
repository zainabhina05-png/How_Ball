'use client';

import { Canvas } from '@react-three/fiber';
import { PerspectiveCamera, Sky } from '@react-three/drei';
import { useGameStore } from '@/store/gameStore';
import Ball from './Ball';
import Road from './Road';
import ObstacleManager from './ObstacleManager';
import GameManager from './GameManager';

export default function Scene() {
  const status = useGameStore((state) => state.status);
  const level = useGameStore((state) => state.level);

  // Level-based themes
  const themes = [
    { sky: '#87CEEB', light: '#ffffff' }, // Level 1: Day
    { sky: '#FF7F50', light: '#FFD700' }, // Level 2: Sunset
    { sky: '#2F4F4F', light: '#483D8B' }, // Level 3: Dusk
    { sky: '#000000', light: '#191970' }, // Level 4: Night
    { sky: '#800080', light: '#FF00FF' }, // Level 5: Neon
  ];

  const currentTheme = themes[(level - 1) % themes.length];

  return (
    <div style={{ width: '100vw', height: '100vh', position: 'absolute', top: 0, left: 0, zIndex: 0 }}>
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 4, 8]} fov={60} rotation={[-0.2, 0, 0]} />
        
        <color attach="background" args={[currentTheme.sky]} />
        {/* Simple sky with sun/moon based on level could go here, but a solid color works well for pseudo-3D runner */}
        <fog attach="fog" args={[currentTheme.sky, 10, 60]} />
        
        <ambientLight intensity={0.5} />
        <directionalLight 
          position={[10, 20, 5]} 
          intensity={1} 
          color={currentTheme.light} 
          castShadow 
        />

        <Road />
        <Ball />
        {status === 'playing' && <ObstacleManager />}
        {status === 'playing' && <GameManager />}
      </Canvas>
    </div>
  );
}
/* Created by Zaeb */