import { create } from 'zustand';

export type GameStatus = 'menu' | 'playing' | 'paused' | 'gameover';

export interface GameState {
  status: GameStatus;
  score: number;
  coins: number;
  level: number;
  highScore: number;
  lane: number; // -1 (left), 0 (center), 1 (right)
  isJumping: boolean;
  isSliding: boolean;
  speed: number;
  
  // Actions
  setStatus: (status: GameStatus) => void;
  startGame: () => void;
  pauseGame: () => void;
  resumeGame: () => void;
  gameOver: () => void;
  moveLeft: () => void;
  moveRight: () => void;
  jump: () => void;
  endJump: () => void;
  slide: () => void;
  endSlide: () => void;
  addScore: (points: number) => void;
  addCoin: () => void;
  resetGame: () => void;
  setHighScore: (score: number) => void;
}

const INITIAL_SPEED = process.env.NEXT_PUBLIC_INITIAL_SPEED ? Number(process.env.NEXT_PUBLIC_INITIAL_SPEED) : 10;
const MAX_SPEED = process.env.NEXT_PUBLIC_MAX_SPEED ? Number(process.env.NEXT_PUBLIC_MAX_SPEED) : 15;
const SPEED_INCREMENT = 1;

export const useGameStore = create<GameState>((set, get) => ({
  status: 'menu',
  score: 0,
  coins: 0,
  level: 1,
  highScore: 0,
  lane: 0,
  isJumping: false,
  isSliding: false,
  speed: INITIAL_SPEED,

  setStatus: (status) => set({ status }),

  startGame: () => set({
    status: 'playing',
    score: 0,
    coins: 0,
    level: 1,
    lane: 0,
    isJumping: false,
    isSliding: false,
    speed: INITIAL_SPEED,
  }),

  pauseGame: () => set({ status: 'paused' }),
  
  resumeGame: () => set({ status: 'playing' }),

  gameOver: () => {
    const { score, highScore } = get();
    if (score > highScore) {
      set({ highScore: Math.floor(score) });
      if (typeof window !== 'undefined') {
        localStorage.setItem('howBallHighScore', Math.floor(score).toString());
      }
    }
    set({ status: 'gameover' });
  },

  moveLeft: () => set((state) => ({ lane: Math.max(state.lane - 1, -1) })),
  moveRight: () => set((state) => ({ lane: Math.min(state.lane + 1, 1) })),

  jump: () => {
    const { isJumping, isSliding } = get();
    if (!isJumping && !isSliding) {
      set({ isJumping: true });
    }
  },

  endJump: () => set({ isJumping: false }),

  slide: () => {
    const { isJumping, isSliding } = get();
    if (!isJumping && !isSliding) {
      set({ isSliding: true });
    }
  },

  endSlide: () => set({ isSliding: false }),

  addScore: (points) => set((state) => {
    const newScore = state.score + points;
    const newLevel = Math.floor(newScore / 500) + 1;
    let newSpeed = state.speed;
    
    if (newLevel > state.level) {
      newSpeed = Math.min(INITIAL_SPEED + (newLevel - 1) * SPEED_INCREMENT, MAX_SPEED);
    }

    return { 
      score: newScore,
      level: newLevel,
      speed: newSpeed
    };
  }),

  addCoin: () => set((state) => {
    const newCoins = state.coins + 1;
    if (typeof window !== 'undefined') {
      const totalCoins = parseInt(localStorage.getItem('howBallTotalCoins') || '0', 10) + 1;
      localStorage.setItem('howBallTotalCoins', totalCoins.toString());
    }
    return { coins: newCoins };
  }),

  resetGame: () => set({
    score: 0,
    coins: 0,
    level: 1,
    lane: 0,
    isJumping: false,
    isSliding: false,
    speed: INITIAL_SPEED,
  }),

  setHighScore: (score) => set({ highScore: score }),
}));