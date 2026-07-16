'use client';

import { useRef, useState, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGameStore } from '@/store/gameStore';
import * as THREE from 'three';

const LANE_WIDTH = 3;
const SPAWN_Z = -60;
const DESPAWN_Z = 10;

type EntityType = 'coin' | 'low_obstacle' | 'high_obstacle';

interface Entity {
  id: number;
  type: EntityType;
  lane: number; // -1, 0, 1
  z: number;
  collected?: boolean;
}

export default function ObstacleManager() {
  const [entities, setEntities] = useState<Entity[]>([]);
  // Use a ref to drive the game logic without relying on React state updater closures
  const entitiesRef = useRef<Entity[]>([]);
  const spawnTimer = useRef(0);
  const nextEntityId = useRef(0);

  const status = useGameStore((state) => state.status);
  const speed = useGameStore((state) => state.speed);
  const ballLane = useGameStore((state) => state.lane);
  const isJumping = useGameStore((state) => state.isJumping);
  const isSliding = useGameStore((state) => state.isSliding);
  const gameOver = useGameStore((state) => state.gameOver);
  const addCoin = useGameStore((state) => state.addCoin);

  const groupRef = useRef<THREE.Group>(null);

  // Clear entities on game reset
  useEffect(() => {
    if (status === 'menu' || status === 'playing' && entitiesRef.current.length > 0 && speed === 10) {
       // Reset if playing from start or in menu
       if (useGameStore.getState().score === 0) {
         entitiesRef.current = [];
         setEntities([]);
       }
    }
  }, [status, speed]);

  useFrame((state, delta) => {
    if (status !== 'playing') return;

    let stateChanged = false;
    let hitObstacle = false;
    let coinsToCollect = 0;

    // 1. Spawning Logic
    const spawnInterval = Math.max(0.5, 15 / speed); 
    spawnTimer.current += delta;

    if (spawnTimer.current >= spawnInterval) {
      spawnTimer.current = 0;
      stateChanged = true;
      
      const rand = Math.random();
      const lane = Math.floor(Math.random() * 3) - 1;
      let type: EntityType = 'coin';

      if (rand > 0.6) {
        type = 'low_obstacle';
        entitiesRef.current.push({ id: nextEntityId.current++, type, lane, z: SPAWN_Z });
      } else if (rand > 0.4) {
        type = 'high_obstacle';
        entitiesRef.current.push({ id: nextEntityId.current++, type, lane, z: SPAWN_Z });
      } else if (rand > 0.2) {
         type = 'coin';
         entitiesRef.current.push(
            { id: nextEntityId.current++, type: 'coin', lane, z: SPAWN_Z },
            { id: nextEntityId.current++, type: 'coin', lane, z: SPAWN_Z - 2 },
            { id: nextEntityId.current++, type: 'coin', lane, z: SPAWN_Z - 4 }
         );
      } else {
         entitiesRef.current.push({ id: nextEntityId.current++, type, lane, z: SPAWN_Z });
      }
    }

    // 2. Movement & Collision Logic
    const nextEntities: Entity[] = [];

    for (let i = 0; i < entitiesRef.current.length; i++) {
      const ent = entitiesRef.current[i];
      if (ent.collected) continue;

      const newZ = ent.z + speed * delta;
      let collected = false;
      
      // Collision Detection (Ball is at z=0, radius=0.5)
      if (Math.abs(newZ) < 0.8) {
        if (ent.lane === ballLane) {
          if (ent.type === 'coin') {
            collected = true;
            coinsToCollect++;
          } else if (ent.type === 'low_obstacle') {
            if (!isJumping) hitObstacle = true;
          } else if (ent.type === 'high_obstacle') {
            if (!isSliding) hitObstacle = true;
          }
        }
      }

      if (newZ !== ent.z || collected) {
         stateChanged = true;
      }

      if (!collected && newZ < DESPAWN_Z) {
         nextEntities.push({ ...ent, z: newZ, collected: ent.collected || collected });
      }
    }

    entitiesRef.current = nextEntities;

    if (stateChanged) {
      setEntities([...nextEntities]);
    }

    // Trigger side effects safely outside of React's state updater
    if (coinsToCollect > 0) {
      for (let i = 0; i < coinsToCollect; i++) {
        addCoin();
      }
    }
    
    if (hitObstacle) {
      gameOver();
    }
  });

  return (
    <group ref={groupRef}>
      {entities.map(ent => {
        if (ent.collected) return null;

        const x = ent.lane * LANE_WIDTH;

        if (ent.type === 'coin') {
          return (
            <group key={ent.id} position={[x, 0.6, ent.z]}>
              {/* Spinning torus — much more coin-like than a flat cylinder */}
              <mesh rotation={[Math.PI / 2, ent.z * 2, 0]}>
                <torusGeometry args={[0.28, 0.08, 12, 24]} />
                <meshStandardMaterial
                  color="#FFD700"
                  emissive="#FFA500"
                  emissiveIntensity={1.2}
                  metalness={0.9}
                  roughness={0.1}
                />
              </mesh>
              {/* Soft glow point light */}
              <pointLight color="#FFD700" intensity={0.8} distance={3} />
            </group>
          );
        }

        if (ent.type === 'low_obstacle') {
          return (
            <group key={ent.id} position={[x, 0.5, ent.z]}>
              {/* Main body — slightly rounded */}
              <mesh castShadow>
                <boxGeometry args={[2, 1, 0.9]} />
                <meshStandardMaterial
                  color="#CC2200"
                  emissive="#FF2200"
                  emissiveIntensity={0.35}
                  metalness={0.3}
                  roughness={0.6}
                />
              </mesh>
              {/* Glowing stripe on top */}
              <mesh position={[0, 0.55, 0]}>
                <boxGeometry args={[2, 0.08, 0.9]} />
                <meshStandardMaterial
                  color="#FF6644"
                  emissive="#FF4422"
                  emissiveIntensity={2}
                  metalness={0}
                  roughness={0}
                />
              </mesh>
              <pointLight color="#FF2200" intensity={0.6} distance={3} />
            </group>
          );
        }

        if (ent.type === 'high_obstacle') {
          return (
            <group key={ent.id} position={[x, 0, ent.z]}>
              {/* Left pillar */}
              <mesh position={[-0.8, 1.1, 0]} castShadow>
                <boxGeometry args={[0.35, 2.2, 0.35]} />
                <meshStandardMaterial
                  color="#1133CC"
                  emissive="#2244FF"
                  emissiveIntensity={0.6}
                  metalness={0.7}
                  roughness={0.2}
                />
              </mesh>
              {/* Right pillar */}
              <mesh position={[0.8, 1.1, 0]} castShadow>
                <boxGeometry args={[0.35, 2.2, 0.35]} />
                <meshStandardMaterial
                  color="#1133CC"
                  emissive="#2244FF"
                  emissiveIntensity={0.6}
                  metalness={0.7}
                  roughness={0.2}
                />
              </mesh>
              {/* Top crossbar */}
              <mesh position={[0, 2.1, 0]} castShadow>
                <boxGeometry args={[2, 0.35, 0.35]} />
                <meshStandardMaterial
                  color="#2244FF"
                  emissive="#4466FF"
                  emissiveIntensity={1.2}
                  metalness={0.5}
                  roughness={0.1}
                />
              </mesh>
              <pointLight color="#2244FF" intensity={0.8} distance={4} position={[0, 1, 0]} />
            </group>
          );
        }

        return null;
      })}
    </group>
  );
}