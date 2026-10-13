import { arrivalEye, arrivalLook, arrivalRoute, arrivalTargets } from './arrival/route';
import { useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import { Vector3, PerspectiveCamera } from 'three';
import { useWorld } from './WorldController';
import { findProject } from '../data/projects';
import type { Vec3 } from '../data/types';
const positions: Record<string, { eye: Vec3; target: Vec3 }> = {
  entry: { eye: [0, 7, 68], target: [0, 28, -84] },
  'work-map': { eye: [43, 52, 58], target: [0, 0, -7] },
  about: { eye: [-35, 13, 24], target: [-14, 2, -10] },
  lab: { eye: [25, 20, 25], target: [14, 2, -9] },
  ask: { eye: [38, 30, 44], target: [0, 0, -7] },
};
export function CameraRig() {
  const { state, progress, highlight } = useWorld();
  const look = useRef(arrivalLook.clone());
  const vectors = useMemo(() => ({ eye: new Vector3(), target: new Vector3() }), []);
  const previousState = useRef(state);
  const routeProgress = useRef(0);
  useFrame(({ camera, pointer }, delta) => {
    const dt = Math.min(delta, 0.05);
    if (previousState.current !== state) {
      if (state === 'entry') {
        camera.position.copy(arrivalEye);
        look.current.copy(arrivalLook);
        routeProgress.current = 0;
      }
      previousState.current = state;
    }
    const project = state === 'entry' ? undefined : findProject(highlight ?? state);
    if (project) {
      const [x, y, z] = project.position;
      vectors.eye.set(x + 18, y + 12, z + 24);
      vectors.target.set(x, y + 2, z);
    } else {
      const shot = positions[state] ?? positions.entry;
      vectors.eye.set(...shot.eye);
      vectors.target.set(...shot.target);
      if (state === 'entry') {
        routeProgress.current +=
          (progress.current - routeProgress.current) * (1 - Math.exp(-dt * 3));
        arrivalRoute.getPointAt(routeProgress.current, vectors.eye);
        arrivalTargets.getPointAt(routeProgress.current, vectors.target);
      }
    }
    vectors.eye.x += pointer.x * 0.28;
    vectors.eye.y += pointer.y * 0.12;
    const blend = 1 - Math.exp(-dt * 1.25);
    camera.position.lerp(vectors.eye, blend);
    look.current.lerp(vectors.target, blend);
    camera.lookAt(look.current);
    if (camera instanceof PerspectiveCamera) {
      const fov = state === 'entry' ? 48 : 43;
      if (camera.fov !== fov) {
        camera.fov = fov;
        camera.updateProjectionMatrix();
      }
    }
    if (import.meta.env.DEV) {
      window.__arrivalCamera = {
        progress: routeProgress.current,
        position: camera.position.toArray(),
        target: look.current.toArray(),
      };
    }
  });
  return null;
}

declare global {
  interface Window {
    __arrivalCamera?: { progress: number; position: number[]; target: number[] };
  }
}
