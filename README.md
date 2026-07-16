<div align="center">

# 🎮 How Ball

### *A Fast-Paced 3D Endless Runner Game*

[![Live Demo](https://img.shields.io/badge/🎮_Live_Demo-Play_Now-brightgreen?style=for-the-badge&logoColor=white)](https://how-ball.vercel.app)
[![Next.js](https://img.shields.io/badge/Next.js-16.2-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![React Three Fiber](https://img.shields.io/badge/React_Three_Fiber-3D-blue?style=flat-square&logo=three.js)](https://docs.pmnd.rs/react-three-fiber)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Zustand](https://img.shields.io/badge/Zustand-State-purple?style=flat-square)](https://zustand-demo.pmnd.rs/)
[![Tests](https://img.shields.io/badge/Tests-Vitest-6E9F18?style=flat-square)](https://vitest.dev/)

<p align="center">
  <strong>Guide your ball through an endless 3D road, dodge obstacles, and beat your high score!</strong>
</p>

[🎯 Play Now](https://how-ball.vercel.app) • [📖 Documentation](#getting-started) • [🐛 Report Bug](https://github.com/zainabhina05-png/How_Ball/issues)

</div>

---

## ✨ Features

<table>
<tr>
<td width="50%">

### 🎮 Gameplay
- **Smooth 3D Physics** — Realistic ball movement and rolling
- **Infinite Road** — Endless scrolling with level-based themes
- **Dynamic Obstacles** — Randomly generated, glowing low/high barriers
- **Coins** — Spinning gold torus coins with emissive glow
- **Score & High Score** — Persisted to localStorage
- **Pause / Resume** — Esc or P at any time

</td>
<td width="50%">

### 🛠️ Technical
- **Next.js 16** — Modern React framework with App Router
- **React Three Fiber** — 3D WebGL rendering
- **Zustand** — Lightweight global state
- **TypeScript** — Fully typed codebase
- **Vitest** — Automated test suite (22 tests, CI-enforced)
- **Web Audio API** — Procedural SFX + ambient music
- **Responsive** — Portrait-safe camera on all phone sizes

</td>
</tr>
</table>

---

## 🎯 How to Play

| Control | Action |
|---------|--------|
| ⬅️ **Left Arrow / A** | Move ball left |
| ➡️ **Right Arrow / D** | Move ball right |
| ⬆️ **Up Arrow / W / Space** | Jump (clears low obstacles) |
| ⬇️ **Down Arrow / S** | Slide (avoids high obstacles) |
| ⏸️ **Esc / P** | Pause / Resume game |
| 🔊 **Mute button (HUD)** | Toggle sound on/off (persisted) |
| 📱 **Touch / Swipe** | All four directions supported on mobile |

**Objective:** Avoid obstacles and survive as long as possible while collecting coins!

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ installed
- npm package manager

### Installation

```bash
# Clone the repository
git clone https://github.com/zainabhina05-png/How_Ball.git

# Navigate to project directory
cd How_Ball

# Install dependencies
npm install
```

### Running Locally

```bash
# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to play!

### Run Tests

```bash
npm test
```

The test suite covers all game logic in `store/gameStore.ts` (22 tests via Vitest). Tests are also enforced automatically on every push/PR via GitHub Actions CI.

### Build for Production

```bash
npm run build
npm start
```

---

## 🏗️ Tech Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 16** | React framework with App Router |
| **React Three Fiber** | 3D WebGL rendering |
| **Three.js** | WebGL 3D library |
| **Zustand** | Global game state management |
| **TypeScript** | Type safety and better DX |
| **CSS Modules** | Component-scoped styling |
| **Vitest** | Fast unit test runner |
| **Web Audio API** | Procedural SFX + ambient music (no external files) |

---

## 📂 Project Structure

```
how-ball/
├── app/                    # Next.js App Router
│   ├── page.tsx            # Main game page
│   ├── layout.tsx          # Root layout + metadata
│   ├── globals.css         # Global styles
│   └── icon.png            # 512×512 home-screen icon
├── components/
│   ├── game/               # Game components
│   │   ├── Ball.tsx        # Player ball (tier-based visual)
│   │   ├── Road.tsx        # Infinite scrolling road
│   │   ├── Scene.tsx       # 3D scene + responsive camera
│   │   ├── ObstacleManager.tsx  # Obstacles + coins + collision
│   │   ├── GameManager.tsx # Score ticker
│   │   ├── InputManager.tsx     # Keyboard + swipe + pause
│   │   └── CanvasErrorBoundary.tsx  # WebGL error/context-loss fallback
│   └── ui/                 # UI components
│       ├── UIOverlay.tsx   # HUD, menus, pause screen
│       └── UI.module.css   # Shared UI styles
├── lib/
│   └── audioManager.ts     # Web Audio procedural sound system
├── store/
│   └── gameStore.ts        # Zustand state + all game actions
├── __tests__/
│   └── gameStore.test.ts   # 22 unit tests
├── .github/workflows/
│   └── test.yml            # CI: run tests on push/PR
└── public/
    └── favicon.jpg         # Custom ball favicon
```

---

## 🎵 Audio System

HOW BALL? uses a fully procedural audio system built on the **Web Audio API** — no audio files, no licensing concerns, zero additional bundle size.

- **Background Music** — Ambient multi-oscillator drone with LFO modulation, starts on game start, pauses when game pauses
- **Jump SFX** — Short ascending sine tone
- **Slide SFX** — Descending sawtooth sweep
- **Coin SFX** — Two-tone "ding" in triangle wave
- **Game Over SFX** — Descending minor chord
- **Mute Toggle** — 🔊/🔇 button in HUD, preference saved to localStorage
- **Fail-safe** — All audio operations are try/caught and fail silently on browsers that block autoplay or lack AudioContext (e.g., some mobile environments)

---

## 📱 Mobile Support

The camera dynamically adjusts its field of view based on the device aspect ratio, ensuring all three lanes stay visible on portrait phones down to **360px wide** (covering iPhone SE, most Android devices). The viewport uses `100dvh` (dynamic viewport height) to prevent mobile browser chrome from clipping the canvas.

An error boundary handles WebGL context loss (common when Safari iOS reclaims GPU memory) — showing a friendly "refresh" panel instead of a blank/frozen screen.

---

## 🧪 Tests

22 unit tests cover all core logic in `store/gameStore.ts`:

| Test group | Coverage |
|------------|----------|
| `addScore` | Score increment, level-up at 500pts, speed cap at MAX_SPEED |
| `jump/slide` | Mutual exclusion, can't jump while sliding and vice versa |
| `gameOver` | High score update logic, localStorage persistence |
| `pauseGame/resumeGame` | Status transitions |
| `moveLeft/moveRight` | Lane clamping at ±1 |

Run locally: `npm test`  
Enforced in CI via GitHub Actions on every push/PR.

---

## 🎨 Visual Design

- **Ball** — Evolves through 3 tiers as you collect coins: orange → green metallic → glowing cyan
- **Coins** — Spinning gold tori with emissive glow and point light
- **Low Obstacles** — Red barrier blocks with glowing stripe and warm point light
- **High Obstacles** — Blue neon gate pillars with emissive crossbar and cool point light
- **Road** — Level-themed color palette cycling through Day → Sunset → Dusk → Night → Neon
- **UI** — Glassmorphism panels with backdrop blur, gradient text, smooth slide-up animation

---

## 🤝 Contributing

Contributions are welcome! Feel free to:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

---

## 👤 Author

**Zainab**
- GitHub: [@zainabhina05-png](https://github.com/zainabhina05-png)
- Email: zainab.hina05@gmail.com

---

## 🌟 Acknowledgments

- Built with [Next.js](https://nextjs.org/)
- 3D rendering powered by [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)
- State management with [Zustand](https://zustand-demo.pmnd.rs/)
- Tests powered by [Vitest](https://vitest.dev/)

---

<div align="center">

### 🎮 [**Play How Ball Now!**](https://how-ball.vercel.app) 🎮

Made with ❤️ by Zainab

⭐ **Star this repo if you enjoyed the game!** ⭐

</div>
