import Scene from '@/components/game/Scene';
import InputManager from '@/components/game/InputManager';
import UIOverlay from '@/components/ui/UIOverlay';

export default function Home() {
  return (
    <main style={{ width: '100%', height: '100%', overflow: 'hidden' }}>
      <Scene />
      <InputManager />
      <UIOverlay />
    </main>
  );
}