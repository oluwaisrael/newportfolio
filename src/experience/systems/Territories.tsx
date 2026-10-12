import { useMemo } from 'react';
import { BufferGeometry, Vector3 } from 'three';
/** Quiet contour ribbons encode distributions, processing lanes and transformations. */
export function Territories() {
  const curves = useMemo(
    () =>
      Array.from({ length: 12 }, (_, row) =>
        new BufferGeometry().setFromPoints(
          Array.from({ length: 80 }, (_, i) => {
            const x = (i / 79 - 0.5) * 35;
            return new Vector3(x - 20, Math.exp((-x * x) / 65) * 3 - 1, -5 + row * 0.9);
          }),
        ),
      ),
    [],
  );
  return (
    <group>
      {curves.map((g, i) => (
        <lineLoop key={i} geometry={g}>
          <lineBasicMaterial color="#7d9cce" transparent opacity={0.1 + i * 0.008} />
        </lineLoop>
      ))}
      {Array.from({ length: 6 }, (_, i) => (
        <mesh key={i} position={[34, -0.8 + i * 0.22, -23]} rotation={[0, i * 0.13, 0]}>
          <boxGeometry args={[8, 0.08, 8]} />
          <meshStandardMaterial color="#514659" roughness={0.7} metalness={0.35} />
        </mesh>
      ))}
    </group>
  );
}
