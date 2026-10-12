import { useLayoutEffect, useMemo, useRef } from 'react';
import { InstancedMesh, Object3D, Color } from 'three';
import { projects } from '../../data/projects';
import { random, terrainHeight } from '../../utils/random';
export function Architecture({ count }: { count: number }) {
  const ref = useRef<InstancedMesh>(null);
  const instances = useMemo(() => {
    const rng = random(91);
    return Array.from({ length: count }, () => {
      let x = (rng() - 0.5) * 130,
        z = (rng() - 0.6) * 105;
      for (
        let attempt = 0;
        attempt < 12 && projects.some((p) => Math.hypot(p.position[0] - x, p.position[2] - z) < 12);
        attempt++
      ) {
        x = (rng() - 0.5) * 130;
        z = (rng() - 0.6) * 105;
      }
      const h = (2 + rng() ** 3 * 17) * (z > 5 ? 0.35 : 1);
      return { x, z, h, w: 0.18 + rng() * 0.55, d: 1.3 + rng() * 3.2, shade: rng() };
    });
  }, [count]);
  useLayoutEffect(() => {
    if (!ref.current) return;
    const dummy = new Object3D(),
      color = new Color();
    instances.forEach((p, i) => {
      dummy.position.set(p.x, terrainHeight(p.x, p.z) + p.h / 2, p.z);
      dummy.scale.set(p.w, p.h, p.d);
      dummy.rotation.y = (Math.floor(p.shade * 4) * Math.PI) / 2;
      dummy.updateMatrix();
      ref.current!.setMatrixAt(i, dummy.matrix);
      color.set(p.shade > 0.8 ? '#52635c' : '#344643');
      ref.current!.setColorAt(i, color);
    });
    ref.current.instanceMatrix.needsUpdate = true;
    ref.current.computeBoundingSphere();
  }, [instances]);
  return (
    <instancedMesh ref={ref} args={[undefined, undefined, count]}>
      <boxGeometry />
      <meshStandardMaterial roughness={0.72} metalness={0.35} />
    </instancedMesh>
  );
}
