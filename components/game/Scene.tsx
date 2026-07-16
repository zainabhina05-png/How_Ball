'use client';

import { useEffect } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import { useGameStore } from '@/store/gameStore';
import Ball from './Ball';
import Road from './Road';
import ObstacleManager from './ObstacleManager';
import GameManager from './GameManager';
import CanvasErrorBoundary from './CanvasErrorBoundary';

const LANE_WIDTH = 3;
// We need all 3 lanes (±LANE_WIDTH world units) plus ball radius + obstacle margin
const HALF_WIDTH_NEEDED = LANE_WIDTH * 1.6; // ~4.8 world units
const CAMERA_Z = 8;
const CAMERA_Y = 4;

/**
 * Lives inside the Canvas so it can access useThree().
 * Recomputes the camera fov whenever the viewport aspect changes
 * so all three lanes stay visible on portrait phones (down to 360px wide).
 *
 * Math: visible half-width at distance d for vertical fov f and aspect a:
 *   half_h = d * tan(f/2)
 *   half_w = half_h * a
 * Solve for f such that half_w >= HALF_WIDTH_NEEDED:
 *   hFov = 2 * atan(HALF_WIDTH_NEEDED / d)        (horizontal fov required)
 *   vFov = hFov / a                                 (convert to vertical fov)
 * We take max(60, vFov) so desktop doesn't get an unnecessarily wide lens.
 */
function ResponsiveCamera() {
  const { camera, viewport } = useThree();

  useEffect(() => {
    const aspect = viewport.aspect; // updated by R3F on resize
    const hFovRad = 2 * Math.atan(HALF_WIDTH_NEEDED / CAMERA_Z);
    const vFovRad = aspect < 1 ? hFovRad / aspect : hFovRad;
    const vFovDeg = (vFovRad * 180) / Math.PI;

    // @ts-expect-error PerspectiveCamera has fov
    camera.fov = Math.max(60, vFovDeg);
    // @ts-expect-error
    camera.position.set(0, CAMERA_Y, CAMERA_Z);
    // @ts-expect-error
    camera.rotation.x = -0.2;
    camera.updateProjectionMatrix();
  }, [camera, viewport.aspect]);

  return null;
}

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
    // 100dvh: dynamic viewport height — shrinks/grows with mobile browser chrome.
    // Fallback to 100vh for browsers that don't support dvh.
    <div
      style={{
        width: '100vw',
        height: '100dvh' as string,
        position: 'absolute',
        top: 0,
        left: 0,
        zIndex: 0,
      }}
    >
      <CanvasErrorBoundary>
        <Canvas>
          <ResponsiveCamera />

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
          {(status === 'playing' || status === 'paused') && <ObstacleManager />}
          {status === 'playing' && <GameManager />}
        </Canvas>
      </CanvasErrorBoundary>
    </div>
  );
}