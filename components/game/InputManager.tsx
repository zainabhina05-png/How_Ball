'use client';

import { useEffect, useRef } from 'react';
import { useGameStore } from '@/store/gameStore';

export default function InputManager() {
  const status = useGameStore((state) => state.status);
  const moveLeft = useGameStore((state) => state.moveLeft);
  const moveRight = useGameStore((state) => state.moveRight);
  const jump = useGameStore((state) => state.jump);
  const slide = useGameStore((state) => state.slide);
  const pauseGame = useGameStore((state) => state.pauseGame);
  const resumeGame = useGameStore((state) => state.resumeGame);

  // Swipe detection refs
  const touchStart = useRef<{x: number, y: number} | null>(null);

  useEffect(() => {
    if (status !== 'playing') return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'ArrowLeft':
        case 'a':
        case 'A':
          moveLeft();
          break;
        case 'ArrowRight':
        case 'd':
        case 'D':
          moveRight();
          break;
        case 'ArrowUp':
        case 'w':
        case 'W':
        case ' ':
          jump();
          break;
        case 'ArrowDown':
        case 's':
        case 'S':
          slide();
          break;
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStart.current = {
        x: e.touches[0].clientX,
        y: e.touches[0].clientY
      };
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!touchStart.current) return;
      
      const dx = e.changedTouches[0].clientX - touchStart.current.x;
      const dy = e.changedTouches[0].clientY - touchStart.current.y;
      
      if (Math.abs(dx) > Math.abs(dy)) {
        // Horizontal swipe
        if (Math.abs(dx) > 30) {
          if (dx > 0) moveRight();
          else moveLeft();
        }
      } else {
        // Vertical swipe
        if (Math.abs(dy) > 30) {
          if (dy < 0) jump(); // Swipe up
          else slide();       // Swipe down
        }
      }
      touchStart.current = null;
    };

    const handleTouchMove = (e: TouchEvent) => {
      // Prevent default scrolling and rubber-banding when swiping
      e.preventDefault();
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('touchstart', handleTouchStart, { passive: false });
    window.addEventListener('touchmove', handleTouchMove, { passive: false });
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [status, moveLeft, moveRight, jump, slide]);

  useEffect(() => {
    const handlePauseToggle = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'p' || e.key === 'P') {
        if (status === 'playing') {
          pauseGame();
        } else if (status === 'paused') {
          resumeGame();
        }
      }
    };

    window.addEventListener('keydown', handlePauseToggle);
    return () => window.removeEventListener('keydown', handlePauseToggle);
  }, [status, pauseGame, resumeGame]);

  return null;
}