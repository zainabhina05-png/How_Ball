import Scene from '@/components/game/Scene';
import InputManager from '@/components/game/InputManager';
import UIOverlay from '@/components/ui/UIOverlay';

export default function Home() {
  return (
    <main style={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <Scene />
      <InputManager />
      <UIOverlay />
    </main>
  );
}