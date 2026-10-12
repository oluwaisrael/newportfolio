import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Points, PointsMaterial } from 'three';
import { normal, random } from '../../utils/random';
export function DataField({ count }: { count: number }) {
  const ref = useRef<Points>(null);
  const material = useRef<PointsMaterial>(null);
  const positions = useMemo(() => {
    const rng = random(82),
      points = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const x = normal(rng) * 18,
        z = normal(rng) * 16;
      points.set([x, 1 + Math.exp(-(x * x + z * z) / 500) * 5 + rng() * 2, z - 7], i * 3);
    }
    return points;
  }, [count]);
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = Math.sin(clock.elapsedTime * 0.025) * 0.025;
    if (material.current)
      material.current.opacity = 0.35 + Math.min(1, clock.elapsedTime / 4) * 0.3;
  });
  return (
    <points ref={ref} frustumCulled={false}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        ref={material}
        color="#a5b5a1"
        size={0.07}
        transparent
        opacity={0.5}
        sizeAttenuation
        depthWrite={false}
      />
    </points>
  );
}
