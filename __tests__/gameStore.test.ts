/**
 * Tests for store/gameStore.ts pure logic.
 *
 * We mock the audioManager to prevent any Web Audio API access in Node.
 * We mock localStorage for high-score persistence tests.
 */

import { describe, it, expect, beforeEach, vi } from 'vitest';

// ─── Mock audioManager (no Web Audio in Node) ──────────────────────────────
vi.mock('@/lib/audioManager', () => ({
  default: {
    playSfx: vi.fn(),
    startBgMusic: vi.fn(),
    stopBgMusic: vi.fn(),
    pauseBgMusic: vi.fn(),
    resumeBgMusic: vi.fn(),
    toggleMute: vi.fn(),
    setSpeed: vi.fn(),
    muted: false,
  },
}));

// ─── Mock localStorage ─────────────────────────────────────────────────────
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => { store[key] = value; },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { store = {}; },
  };
})();
Object.defineProperty(global, 'localStorage', { value: localStorageMock });
Object.defineProperty(global, 'window', { value: { localStorage: localStorageMock }, writable: true });

// Import store AFTER mocks are in place
import { useGameStore } from '@/store/gameStore';

// ─── Helper ────────────────────────────────────────────────────────────────
const getState = () => useGameStore.getState();
const INITIAL_SPEED = 15;
const MAX_SPEED = 50;

const resetToMenu = () => {
  useGameStore.setState({
    status: 'menu',
    score: 0,
    coins: 0,
    level: 1,
    highScore: 0,
    lane: 0,
    isJumping: false,
    isSliding: false,
    speed: INITIAL_SPEED,
  });
};

beforeEach(() => {
  resetToMenu();
  localStorageMock.clear();
  vi.clearAllMocks();
});

// ─── addScore ──────────────────────────────────────────────────────────────
describe('addScore', () => {
  it('increments score by the given points', () => {
    getState().startGame();
    getState().addScore(100);
    expect(Math.floor(getState().score)).toBe(100);
  });

  it('increases level every 500 points', () => {
    getState().startGame();
    expect(getState().level).toBe(1);
    getState().addScore(500);
    expect(getState().level).toBe(2);
    getState().addScore(500);
    expect(getState().level).toBe(3);
  });

  it('starts at INITIAL_SPEED (15)', () => {
    getState().startGame();
    expect(getState().speed).toBe(INITIAL_SPEED);
  });

  it('speed is strictly greater than INITIAL_SPEED after scoring points', () => {
    getState().startGame();
    getState().addScore(100);
    expect(getState().speed).toBeGreaterThan(INITIAL_SPEED);
  });

  it('speed increases monotonically with score', () => {
    getState().startGame();
    const speeds: number[] = [];
    for (let i = 0; i < 20; i++) {
      getState().addScore(500);
      speeds.push(getState().speed);
    }
    for (let i = 1; i < speeds.length; i++) {
      expect(speeds[i]).toBeGreaterThanOrEqual(speeds[i - 1]);
    }
  });

  it('caps speed at MAX_SPEED (50)', () => {
    getState().startGame();
    // Add a huge score to push well past any ramp
    for (let i = 0; i < 100; i++) {
      getState().addScore(5000);
    }
    expect(getState().speed).toBeLessThanOrEqual(MAX_SPEED);
  });

  it('speed at score=500 is between INITIAL and MAX (not too far, not too slow)', () => {
    getState().startGame();
    getState().addScore(500);
    const speed = getState().speed;
    // At score 500 with RAMP_RATE=1000: speed ≈ 15 + 35*(1 - e^(-0.5)) ≈ 28.7
    expect(speed).toBeGreaterThan(INITIAL_SPEED);
    expect(speed).toBeLessThan(MAX_SPEED);
  });

  it('speed at score=2000 is well past the halfway mark', () => {
    getState().startGame();
    getState().addScore(2000);
    const speed = getState().speed;
    // At score 2000 with RAMP_RATE=1000: speed ≈ 15 + 35*(1 - e^(-2)) ≈ 44.7 — close to cap
    expect(speed).toBeGreaterThan(35);
    expect(speed).toBeLessThanOrEqual(MAX_SPEED);
  });
});

// ─── jump / slide mutual exclusion ────────────────────────────────────────
describe('jump and slide', () => {
  beforeEach(() => { getState().startGame(); });

  it('sets isJumping to true when not already jumping or sliding', () => {
    getState().jump();
    expect(getState().isJumping).toBe(true);
  });

  it('cannot jump while already jumping', () => {
    getState().jump();
    getState().jump(); // second jump should be ignored
    expect(getState().isJumping).toBe(true); // still true, not double-triggered
  });

  it('cannot jump while sliding', () => {
    getState().slide();
    getState().jump();
    expect(getState().isJumping).toBe(false);
  });

  it('sets isSliding to true when not jumping or sliding', () => {
    getState().slide();
    expect(getState().isSliding).toBe(true);
  });

  it('cannot slide while already sliding', () => {
    getState().slide();
    getState().slide();
    expect(getState().isSliding).toBe(true);
  });

  it('cannot slide while jumping', () => {
    getState().jump();
    getState().slide();
    expect(getState().isSliding).toBe(false);
  });
});

// ─── gameOver / high score ─────────────────────────────────────────────────
describe('gameOver', () => {
  it('sets status to gameover', () => {
    getState().startGame();
    getState().gameOver();
    expect(getState().status).toBe('gameover');
  });

  it('updates highScore when current score beats it', () => {
    useGameStore.setState({ score: 999, highScore: 500 });
    getState().gameOver();
    expect(getState().highScore).toBe(999);
  });

  it('does not update highScore when current score is lower', () => {
    useGameStore.setState({ score: 100, highScore: 500 });
    getState().gameOver();
    expect(getState().highScore).toBe(500);
  });

  it('persists high score to localStorage', () => {
    useGameStore.setState({ score: 750, highScore: 0 });
    getState().gameOver();
    expect(localStorageMock.getItem('howBallHighScore')).toBe('750');
  });
});

// ─── pauseGame / resumeGame ────────────────────────────────────────────────
describe('pauseGame / resumeGame', () => {
  it('transitions status to paused', () => {
    getState().startGame();
    getState().pauseGame();
    expect(getState().status).toBe('paused');
  });

  it('transitions status back to playing', () => {
    getState().startGame();
    getState().pauseGame();
    getState().resumeGame();
    expect(getState().status).toBe('playing');
  });
});

// ─── moveLeft / moveRight lane clamping ───────────────────────────────────
describe('lane clamping', () => {
  beforeEach(() => { getState().startGame(); });

  it('starts in the center lane (0)', () => {
    expect(getState().lane).toBe(0);
  });

  it('moves left to -1', () => {
    getState().moveLeft();
    expect(getState().lane).toBe(-1);
  });

  it('clamps at -1 — cannot go further left', () => {
    getState().moveLeft();
    getState().moveLeft();
    expect(getState().lane).toBe(-1);
  });

  it('moves right to 1', () => {
    getState().moveRight();
    expect(getState().lane).toBe(1);
  });

  it('clamps at 1 — cannot go further right', () => {
    getState().moveRight();
    getState().moveRight();
    expect(getState().lane).toBe(1);
  });

  it('moves from -1 to center on moveRight', () => {
    getState().moveLeft();
    getState().moveRight();
    expect(getState().lane).toBe(0);
  });
});
