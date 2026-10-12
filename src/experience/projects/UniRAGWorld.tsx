import { useRef, useMemo, useLayoutEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { InstancedMesh, Object3D, Color } from 'three';
import { random } from '../../utils/random';
export function UniRAGWorld() {
  const fragments = useRef<InstancedMesh>(null);
  const dummy = useMemo(() => new Object3D(), []);
  const points = useMemo(() => {
    const rng = random(71);
    return Array.from({ length: 144 }, (_, i) => ({
      x: (rng() - 0.5) * 13,
      y: 0.5 + rng() * 7,
      z: (rng() - 0.5) * 7,
      selected: i % 12 === 0,
      lexical: i % 2 === 0,
    }));
  }, []);
  useLayoutEffect(() => {
    const color = new Color();
    points.forEach((p, i) =>
      fragments.current?.setColorAt(
        i,
        color.set(p.selected ? '#dbb67f' : p.lexical ? '#686c61' : '#48565a'),
      ),
    );
    if (fragments.current?.instanceColor) fragments.current.instanceColor.needsUpdate = true;
  }, [points]);
  useFrame(({ clock }) => {
    if (!fragments.current) return;
    const phase = (clock.elapsedTime % 12) / 12;
    const converge = phase > 0.35 && phase < 0.8 ? Math.sin(((phase - 0.35) / 0.45) * Math.PI) : 0;
    points.forEach((p, i) => {
      const strength = p.selected ? converge * 0.9 : converge * 0.12;
      dummy.position.set(
        p.x * (1 - strength),
        p.y * (1 - strength) + strength * 3,
        p.z * (1 - strength),
      );
      dummy.rotation.set(0, p.lexical ? -0.2 : 0.2, 0);
      dummy.scale.set(0.36, 0.58, 0.035);
      dummy.updateMatrix();
      fragments.current!.setMatrixAt(i, dummy.matrix);
    });
    fragments.current.instanceMatrix.needsUpdate = true;
  });
  return (
    <group position={[4, 0, -22]}>
      <mesh position={[0, -0.3, 0]}>
        <boxGeometry args={[15, 0.45, 10]} />
        <meshStandardMaterial color="#292d29" />
      </mesh>
      <instancedMesh ref={fragments} args={[undefined, undefined, 144]} frustumCulled={false}>
        <boxGeometry />
        <meshStandardMaterial roughness={0.65} metalness={0.2} />
      </instancedMesh>
      <mesh position={[0, 3, -3.8]}>
        <boxGeometry args={[3, 5, 0.15]} />
        <meshStandardMaterial color="#3e4239" metalness={0.6} roughness={0.3} />
      </mesh>
      <mesh position={[0, 5.55, -3.7]}>
        <boxGeometry args={[3, 0.035, 0.2]} />
        <meshBasicMaterial color="#d9ae75" />
      </mesh>
    </group>
  );
}
