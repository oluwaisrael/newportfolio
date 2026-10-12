import { RuntimeQuality } from './RuntimeQuality';
import { Canvas } from '@react-three/fiber';
import { World } from './World';
import { qualitySettings, type Quality } from './quality';
import { useVisibility } from '../hooks/useVisibility';
import { useEffect, useState } from 'react';
export default function ExperienceCanvas({
  quality,
  onFailure,
  onReady,
  onPressure,
}: {
  quality: Quality;
  onFailure: () => void;
  onReady: () => void;
  onPressure: () => void;
}) {
  const visible = useVisibility();
  const [canvas, setCanvas] = useState<HTMLCanvasElement | null>(null);
  useEffect(
    () => () => {
      document.body.style.cursor = '';
    },
    [],
  );
  useEffect(() => {
    const element = canvas;
    if (!element) return;
    const lost = (event: Event) => {
      event.preventDefault();
      onFailure();
    };
    element.addEventListener('webglcontextlost', lost);
    return () => element.removeEventListener('webglcontextlost', lost);
  }, [onFailure, canvas]);
  return (
    <Canvas
      aria-hidden="true"
      tabIndex={-1}
      dpr={qualitySettings[quality].dpr}
      frameloop={visible ? 'always' : 'never'}
      camera={{ position: [47, 32, 57], fov: 43, near: 0.1, far: 220 }}
      gl={{ antialias: false, alpha: false, powerPreference: 'low-power' }}
      onCreated={({ gl }) => {
        setCanvas(gl.domElement);
        onReady();
      }}
      fallback={null}
    >
      <World quality={quality} />
      <RuntimeQuality onPressure={onPressure} />
    </Canvas>
  );
}
