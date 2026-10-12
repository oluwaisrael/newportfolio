import { useMemo, useLayoutEffect, useRef } from 'react';
import { InstancedMesh, Object3D } from 'three';
/** Shared fins give the backend territory a distinct service-infrastructure silhouette. */
export function Infrastructure() {
  const ref = useRef<InstancedMesh>(null);
  const dummy = useMemo(() => new Object3D(), []);
  useLayoutEffect(() => {
    if (!ref.current) return;
    for (let i = 0; i < 48; i++) {
      const bank = Math.floor(i / 16);
      dummy.position.set(-29 + bank * 5, 0.7 + (i % 16) * 0.3, -12);
      dummy.scale.set(3.5, 0.075, 8);
      dummy.updateMatrix();
      ref.current.setMatrixAt(i, dummy.matrix);
    }
    ref.current.instanceMatrix.needsUpdate = true;
    ref.current.computeBoundingSphere();
  }, [dummy]);
  return (
    <>
      <instancedMesh ref={ref} args={[undefined, undefined, 48]}>
        <boxGeometry />
        <meshStandardMaterial color="#42524b" roughness={0.6} metalness={0.5} />
      </instancedMesh>
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[-29 + i * 5, 3, -7.95]}>
          <boxGeometry args={[0.035, 4.5, 0.035]} />
          <meshBasicMaterial color="#b0bc8d" />
        </mesh>
      ))}
    </>
  );
}
