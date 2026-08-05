'use client';

import { useState, useEffect } from 'react';
import { useGameStore } from '@/store/gameStore';
import audioManager from '@/lib/audioManager';
import styles from './UI.module.css';

// ─── Mute Toggle Button ───────────────────────────────────────────────────────

function MuteButton() {
  const [muted, setMuted] = useState(false);

  useEffect(() => {
    // Sync initial state from audioManager (which reads localStorage)
    if (audioManager) setMuted(audioManager.muted);
  }, []);

  const handleToggle = () => {
    if (!audioManager) return;
    const nowMuted = audioManager.toggleMute();
    setMuted(nowMuted);
  };

  return (
    <button
      className={styles.muteButton}
      onClick={handleToggle}
      aria-label={muted ? 'Unmute' : 'Mute'}
      title={muted ? 'Unmute' : 'Mute'}
    >
      {muted ? '🔇' : '🔊'}
    </button>
  );
}

// ─── Main Menu ────────────────────────────────────────────────────────────────

export function MainMenu() {
  const startGame = useGameStore((state) => state.startGame);

  return (
    <div className={styles.overlay}>
      <div className={styles.glassPanel}>
        <h1 className={styles.title}>HOW BALL?</h1>
        <p className={styles.subtitle}>An endless runner built with Next.js &amp; React Three Fiber</p>

        <button className={styles.button} onClick={startGame}>
          Start Running
        </button>

        <div className={styles.instructions}>
          <span>Controls:</span>
          <span><span className={styles.keyHint}>←</span> / <span className={styles.keyHint}>→</span> to move</span>
          <span><span className={styles.keyHint}>↑</span> or <span className={styles.keyHint}>Space</span> to jump</span>
          <span><span className={styles.keyHint}>↓</span> to slide</span>
          <span><span className={styles.keyHint}>Esc</span> / <span className={styles.keyHint}>P</span> to pause</span>
        </div>
      </div>
    </div>
  );
}

// ─── HUD ──────────────────────────────────────────────────────────────────────

export function HUD() {
  const score = useGameStore((state) => state.score);
  const coins = useGameStore((state) => state.coins);
  const level = useGameStore((state) => state.level);

  return (
    <div className={styles.hud}>
      <div className={styles.hudItem}>
        <span className={styles.hudLabel}>Score</span>
        <span className={styles.hudValue}>{Math.floor(score)}</span>
      </div>

      <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
        <div className={styles.hudItem}>
          <span className={styles.hudLabel}>Level</span>
          <span className={styles.hudValue}>{level}</span>
        </div>
        <div className={styles.hudItem}>
          <span className={styles.hudLabel}>Coins</span>
          <span className={styles.hudValue} style={{ color: 'var(--secondary)' }}>{coins}</span>
        </div>
        <MuteButton />
      </div>
    </div>
  );
}

// ─── Game Over ────────────────────────────────────────────────────────────────

export function GameOverScreen() {
  const startGame = useGameStore((state) => state.startGame);
  const score = useGameStore((state) => state.score);
  const coins = useGameStore((state) => state.coins);
  const highScore = useGameStore((state) => state.highScore);

  return (
    <div className={styles.overlay}>
      <div className={styles.glassPanel}>
        <h1 className={styles.title} style={{ color: '#ff4444' }}>GAME OVER</h1>

        <div className={styles.scoreGrid}>
          <div className={styles.scoreItem}>
            <div className={styles.hudLabel}>Score</div>
            <div className={styles.hudValue}>{Math.floor(score)}</div>
          </div>
          <div className={styles.scoreItem}>
            <div className={styles.hudLabel}>Best</div>
            <div className={styles.hudValue}>{highScore}</div>
          </div>
          <div className={styles.scoreItem} style={{ gridColumn: '1 / span 2' }}>
            <div className={styles.hudLabel}>Coins Collected</div>
            <div className={styles.hudValue}>{coins}</div>
          </div>
        </div>

        <button className={styles.button} onClick={startGame}>
          Play Again
        </button>
      </div>
    </div>
  );
}

// ─── Pause Screen ─────────────────────────────────────────────────────────────

export function PauseScreen() {
  const resumeGame = useGameStore((state) => state.resumeGame);

  return (
    <div className={styles.overlay}>
      <div className={styles.glassPanel}>
        <h1 className={styles.title}>PAUSED</h1>

        <button className={styles.button} onClick={resumeGame}>
          Resume
        </button>

        <div className={styles.instructions} style={{ flexDirection: 'column', gap: '10px' }}>
          <span>Press <span className={styles.keyHint}>Esc</span> or <span className={styles.keyHint}>P</span> to resume</span>
          <MuteButton />
        </div>
      </div>
    </div>
  );
}

// ─── Root Overlay ─────────────────────────────────────────────────────────────

export default function UIOverlay() {
  const status = useGameStore((state) => state.status);

  return (
    <>
      {(status === 'playing' || status === 'paused') && <HUD />}
      {status === 'menu' && <MainMenu />}
      {status === 'paused' && <PauseScreen />}
      {status === 'gameover' && <GameOverScreen />}
    </>
  );
}
