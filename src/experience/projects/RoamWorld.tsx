import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group } from 'three';
export function RoamWorld() {
  const candidates = useRef<Group>(null);
  useFrame(({ clock }) => {
    candidates.current?.children.forEach((child, i) => {
      const selected = Math.floor(clock.elapsedTime / 5) % 7 === i;
      const target = selected ? 1.35 : 0.65;
      child.scale.y += (target - child.scale.y) * 0.025;
    });
  });
  return (
    <group position={[-1, 0, 14]}>
      <mesh position={[0, -0.35, 0]}>
        <cylinderGeometry args={[6.5, 7, 0.5, 7]} />
        <meshStandardMaterial color="#292a2d" />
      </mesh>
      <group ref={candidates}>
        {Array.from({ length: 7 }, (_, i) => {
          const a = (i / 7) * Math.PI * 2;
          return (
            <group key={i} position={[Math.cos(a) * 4, 0, Math.sin(a) * 4]}>
              <mesh position={[0, 0.65, 0]}>
                <cylinderGeometry args={[0.7, 1, 1.3, 6]} />
                <meshStandardMaterial color="#514c59" roughness={0.6} />
              </mesh>
              <mesh position={[0, 1.4, 0]}>
                <cylinderGeometry args={[0.55, 0.55, 0.04, 6]} />
                <meshBasicMaterial color="#b4a0bd" />
              </mesh>
            </group>
          );
        })}
      </group>
    </group>
  );
}
