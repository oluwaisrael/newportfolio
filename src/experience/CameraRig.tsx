import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import { Vector3, MathUtils } from 'three';
import { useWorld } from './WorldController';
import { findProject } from '../data/projects';
import type { Vec3 } from '../data/types';
const positions: Record<string, { eye: Vec3; target: Vec3 }> = {
  entry: { eye: [47, 27, 57], target: [0, 0, -5] },
  'work-map': { eye: [43, 52, 58], target: [0, 0, -7] },
  about: { eye: [-35, 13, 24], target: [-14, 2, -10] },
  lab: { eye: [25, 20, 25], target: [14, 2, -9] },
  ask: { eye: [38, 30, 44], target: [0, 0, -7] },
};
export function CameraRig() {
  const { state, progress, highlight } = useWorld();
  const look = useRef(new Vector3(0, 0, -5));
  const vectors = useMemo(() => ({ eye: new Vector3(), target: new Vector3() }), []);
  const elapsed = useRef(0);
  useFrame(({ camera, pointer }, delta) => {
    const dt = Math.min(delta, 0.05);
    elapsed.current += dt;
    const project = findProject(highlight ?? state);
    if (project) {
      const [x, y, z] = project.position;
      vectors.eye.set(x + 18, y + 12, z + 24);
      vectors.target.set(x, y + 2, z);
    } else {
      const shot = positions[state] ?? positions.entry;
      vectors.eye.set(...shot.eye);
      vectors.target.set(...shot.target);
      if (state === 'entry') {
        vectors.eye.x -= progress.current * 18;
        vectors.eye.y += progress.current * 9;
        vectors.eye.z -= progress.current * 15;
        vectors.eye.y += Math.max(0, 1 - elapsed.current / 8) * 5;
      }
    }
    vectors.eye.x += pointer.x * 0.65;
    vectors.eye.y += pointer.y * 0.3;
    const blend = 1 - Math.exp(-dt * 1.25);
    camera.position.lerp(vectors.eye, blend);
    look.current.lerp(vectors.target, blend);
    camera.lookAt(look.current);
    camera.far = MathUtils.lerp(camera.far, 220, blend);
  });
  return null;
}
