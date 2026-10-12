import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
interface Metrics {
  fps: number;
  calls: number;
  triangles: number;
  geometries: number;
  textures: number;
}
declare global {
  interface Window {
    __worldMetrics?: Metrics;
  }
}
export function RuntimeQuality({ onPressure }: { onPressure: () => void }) {
  const sample = useRef({ time: 0, frames: 0, warmup: 0, notified: false });
  useFrame(({ gl }, delta) => {
    const s = sample.current;
    s.warmup += delta;
    if (s.warmup < 8 || delta > 1) return;
    s.time += delta;
    s.frames++;
    if (s.time < 4) return;
    const fps = s.frames / s.time;
    if (import.meta.env.DEV)
      window.__worldMetrics = {
        fps: Math.round(fps),
        calls: gl.info.render.calls,
        triangles: gl.info.render.triangles,
        geometries: gl.info.memory.geometries,
        textures: gl.info.memory.textures,
      };
    if (fps < 30 && !s.notified) {
      s.notified = true;
      onPressure();
    }
    s.time = 0;
    s.frames = 0;
  });
  return null;
}
