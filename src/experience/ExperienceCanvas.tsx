import { useWorldInView } from '../hooks/useWorldInView';
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
  const inView = useWorldInView();
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
      frameloop={visible && inView ? 'always' : 'never'}
      camera={{ position: [0, 8.5, 68], fov: 50, near: 0.1, far: 900 }}
      gl={{ antialias: true, alpha: false, powerPreference: 'low-power' }}
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
