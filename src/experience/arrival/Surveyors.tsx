import { useEffect, useMemo } from 'react';
import {
  CapsuleGeometry,
  CylinderGeometry,
  Matrix4,
  SphereGeometry,
  Vector3,
  type BufferGeometry,
} from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

// Small original human silhouettes establish scale; they are scenery, not player controls.
function figureGeometry() {
  const parts: BufferGeometry[] = [];
  const limb = (from: number[], to: number[], radius: number) => {
    const a = new Vector3(...from),
      b = new Vector3(...to),
      direction = b.clone().sub(a);
    const g = new CapsuleGeometry(radius, Math.max(0.01, direction.length() - radius * 2), 3, 6);
    const matrix = new Matrix4().lookAt(a, b, new Vector3(0, 0, 1));
    g.rotateX(Math.PI / 2);
    g.applyMatrix4(matrix);
    g.translate(...a.add(b).multiplyScalar(0.5).toArray());
    parts.push(g);
  };
  const body = new CylinderGeometry(0.23, 0.17, 0.59, 8);
  body.scale(1, 1, 0.65);
  body.translate(0, 1.16, 0);
  parts.push(body);
  const head = new SphereGeometry(0.115, 10, 8);
  head.scale(0.84, 1.25, 1);
  head.translate(0, 1.66, 0);
  parts.push(head);
  const pack = new CapsuleGeometry(0.14, 0.2, 3, 6);
  pack.scale(1, 0.95, 0.48);
  pack.translate(0, 1.22, 0.13);
  parts.push(pack);
  limb([-0.1, 0.89, 0], [-0.12, 0.47, 0.04], 0.086);
  limb([-0.12, 0.47, 0.04], [-0.13, 0.1, 0.08], 0.063);
  limb([0.1, 0.89, 0], [0.12, 0.48, -0.09], 0.083);
  limb([0.12, 0.48, -0.09], [0.13, 0.1, -0.16], 0.062);
  limb([-0.22, 1.43, 0], [-0.29, 1.09, 0.025], 0.066);
  limb([-0.29, 1.09, 0.025], [-0.27, 0.84, -0.03], 0.047);
  limb([0.22, 1.43, 0], [0.3, 1.1, 0.07], 0.066);
  limb([0.3, 1.1, 0.07], [0.32, 0.88, 0.04], 0.047);
  for (const side of [-1, 1]) {
    const foot = new SphereGeometry(0.07, 7, 5);
    foot.scale(1, 0.65, 1.8);
    foot.translate(side * 0.13, 0.06, side < 0 ? 0.03 : -0.22);
    parts.push(foot);
  }
  const plain = parts.map((g) => g.toNonIndexed());
  const merged = mergeGeometries(plain, false);
  [...parts, ...plain].forEach((g) => g.dispose());
  return merged;
}
export function Surveyors() {
  const geometry = useMemo(figureGeometry, []);
  useEffect(() => () => geometry.dispose(), [geometry]);
  return (
    <group>
      {[
        [-4, 2.4, 52],
        [12, 0, -6],
        [15, 0, -9],
      ].map((p, i) => (
        <mesh
          key={i}
          geometry={geometry}
          scale={i === 0 ? 1.55 : 1}
          position={p as [number, number, number]}
          rotation={[0, i === 0 ? 0 : 0.2, 0]}
        >
          <meshStandardMaterial
            color="#26323a"
            emissive="#101720"
            emissiveIntensity={0.35}
            roughness={0.72}
            metalness={0.18}
          />
        </mesh>
      ))}
    </group>
  );
}
