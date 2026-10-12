import { InputPixels } from './InputPixels';
import { useMemo, useRef, useLayoutEffect, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import {
  BufferGeometry,
  Vector3,
  Group,
  InstancedMesh,
  MeshStandardMaterial,
  Object3D,
} from 'three';
export function NeuralNetworkWorld() {
  const layers = useRef<Group>(null);
  const connections = useMemo(() => {
    const p: Vector3[] = [];
    for (let l = 0; l < 2; l++)
      for (let a = 0; a < 10; a++)
        for (let b = 0; b < 10; b += 2) {
          p.push(
            new Vector3(l * 3 - 3, 0.7 + a * 0.5, 0),
            new Vector3((l + 1) * 3 - 3, 0.7 + b * 0.5, 0),
          );
        }
    return new BufferGeometry().setFromPoints(p);
  }, []);
  useEffect(() => () => connections.dispose(), [connections]);
  useLayoutEffect(() => {
    const dummy = new Object3D();
    layers.current?.children.forEach((layer) => {
      const instances = layer as InstancedMesh;
      for (let i = 0; i < 10; i++) {
        dummy.position.set(0, 0.7 + i * 0.5, 0);
        dummy.updateMatrix();
        instances.setMatrixAt(i, dummy.matrix);
      }
      instances.instanceMatrix.needsUpdate = true;
      instances.computeBoundingSphere();
    });
  }, []);
  useFrame(({ clock }) => {
    const phase = (clock.elapsedTime * 0.55) % 3;
    layers.current?.children.forEach((layer, i) => {
      ((layer as InstancedMesh).material as MeshStandardMaterial).emissiveIntensity =
        Math.max(0, 1 - Math.abs(phase - i)) * 0.7;
    });
  });
  return (
    <group position={[20, 0, -9]}>
      <InputPixels />
      <mesh position={[0, -0.25, 0]}>
        <boxGeometry args={[12, 0.5, 7]} />
        <meshStandardMaterial color="#252e34" />
      </mesh>
      <lineSegments geometry={connections}>
        <lineBasicMaterial color="#718499" transparent opacity={0.18} />
      </lineSegments>
      <group ref={layers}>
        {[0, 1, 2].map((l) => (
          <instancedMesh key={l} position={[l * 3 - 3, 0, 0]} args={[undefined, undefined, 10]}>
            <boxGeometry args={[0.28, 0.28, 0.28]} />
            <meshStandardMaterial color="#8c9ba9" emissive="#adc8ea" emissiveIntensity={0} />
          </instancedMesh>
        ))}
      </group>
      {[-4.5, 4.5].map((x) => (
        <mesh key={x} position={[x, 3, -0.8]}>
          <boxGeometry args={[0.15, 6, 2]} />
          <meshStandardMaterial color="#3c4950" />
        </mesh>
      ))}
      <mesh position={[0, 6.05, -0.8]}>
        <boxGeometry args={[9.2, 0.12, 2]} />
        <meshStandardMaterial color="#3c4950" />
      </mesh>
    </group>
  );
}
