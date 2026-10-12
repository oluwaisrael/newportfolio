import { useMemo, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { BufferGeometry, Float32BufferAttribute, Line } from 'three';
export function LaelWorld() {
  const geometry = useMemo(() => {
    const g = new BufferGeometry();
    g.setAttribute('position', new Float32BufferAttribute(new Float32Array(64 * 3), 3));
    return g;
  }, []);
  const line = useMemo(() => new Line(geometry), [geometry]);
  useEffect(
    () => () => {
      geometry.dispose();
      (Array.isArray(line.material) ? line.material : [line.material]).forEach((material) =>
        material.dispose(),
      );
    },
    [geometry, line],
  );
  useFrame(({ clock }) => {
    const positions = geometry.attributes.position;
    for (let i = 0; i < 64; i++) {
      const x = (i / 63 - 0.5) * 4;
      positions.setXYZ(
        i,
        x,
        1.3 + Math.sin(i * 0.4 + clock.elapsedTime * 0.5) * Math.exp(-x * x) * 0.09,
        0.6,
      );
    }
    positions.needsUpdate = true;
  });
  return (
    <group position={[-23, 0, -29]}>
      <mesh position={[0, -0.1, 0]}>
        <boxGeometry args={[10, 0.3, 7]} />
        <meshStandardMaterial color="#1b2325" roughness={0.35} metalness={0.6} />
      </mesh>
      <mesh position={[0, 1.3, 0]}>
        <boxGeometry args={[6, 2.6, 0.8]} />
        <meshStandardMaterial color="#20292b" metalness={0.65} roughness={0.3} />
      </mesh>
      <primitive object={line}>
        <lineBasicMaterial attach="material" color="#a8b4a5" />
      </primitive>
    </group>
  );
}
