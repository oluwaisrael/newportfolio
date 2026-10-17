import { useEffect, useMemo } from 'react';
import { CanvasTexture, EquirectangularReflectionMapping, SRGBColorSpace } from 'three';
import { useThree } from '@react-three/fiber';

// Bake original procedural cloud noise once; no full-screen fractal shader each frame.
function cloudSky() {
  const width = 1024,
    height = 512;
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;
  const image = ctx.createImageData(width, height);
  const hash = (x: number, y: number) => {
    const n = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
    return n - Math.floor(n);
  };
  const noise = (x: number, y: number) => {
    const ix = Math.floor(x),
      iy = Math.floor(y);
    let fx = x - ix,
      fy = y - iy;
    fx *= fx * (3 - 2 * fx);
    fy *= fy * (3 - 2 * fy);
    const a = hash(ix, iy),
      b = hash(ix + 1, iy),
      c = hash(ix, iy + 1),
      d = hash(ix + 1, iy + 1);
    return (a + (b - a) * fx) * (1 - fy) + (c + (d - c) * fx) * fy;
  };
  const fbm = (x: number, y: number) => {
    let amplitude = 0.5,
      value = 0;
    for (let i = 0; i < 6; i++) {
      value += amplitude * noise(x, y);
      const nx = 1.6 * x + 1.2 * y + 3.7;
      y = -1.2 * x + 1.6 * y + 3.7;
      x = nx;
      amplitude *= 0.5;
    }
    return value;
  };
  const smooth = (a: number, b: number, n: number) => {
    const t = Math.max(0, Math.min(1, (n - a) / (b - a)));
    return t * t * (3 - 2 * t);
  };
  for (let y = 0; y < height; y++)
    for (let x = 0; x < width; x++) {
      const phi = (x / width) * Math.PI * 2,
        theta = (y / height) * Math.PI;
      const dx = -Math.cos(phi) * Math.sin(theta),
        dy = Math.cos(theta),
        dz = -Math.sin(phi) * Math.sin(theta);
      const u = dx / Math.max(0.16, dy + 0.36),
        v = dz / Math.max(0.16, dy + 0.36);
      const warp = fbm(u * 3.4, v * 3.4),
        cloud = fbm(u * 2.2 + warp, v * 2.2 + warp);
      const sun = Math.exp(-((dx - 0.01) ** 2 + (dy - 0.19) ** 2 + (dz + 0.98) ** 2) * 24);
      const silver = Math.exp(-((dx - 0.01) ** 2 + (dy - 0.19) ** 2 + (dz + 0.98) ** 2) * 220);
      const value = smooth(0.25, 0.76, cloud),
        horizon = smooth(-0.1, 0.35, dy);
      const index = (y * width + x) * 4;
      for (let channel = 0; channel < 3; channel++) {
        const dark = [0.008, 0.012, 0.019][channel],
          light = [0.08, 0.105, 0.145][channel],
          mist = [0.09, 0.12, 0.16][channel];
        const color =
          mist * (1 - horizon) +
          (dark + (light - dark) * value + sun * 0.25 + silver * 0.42) * horizon;
        image.data[index + channel] = Math.min(255, Math.pow(color, 1 / 2.2) * 255);
      }
      image.data[index + 3] = 255;
    }
  ctx.putImageData(image, 0, 0);
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  texture.mapping = EquirectangularReflectionMapping;
  return texture;
}
export function Atmosphere() {
  const sky = useMemo(cloudSky, []);
  const scene = useThree((s) => s.scene);
  useEffect(() => {
    scene.background = sky;
    scene.environment = sky;
    scene.environmentIntensity = 0.58;
    return () => {
      if (scene.background === sky) scene.background = null;
      if (scene.environment === sky) scene.environment = null;
      sky.dispose();
    };
  }, [scene, sky]);
  return (
    <>
      <fog attach="fog" args={['#0b1015', 210, 520]} />
      <hemisphereLight args={['#80afc8', '#0b1015', 1.05]} />
      <ambientLight color="#9bb2bd" intensity={0.3} />
      <directionalLight position={[0, 180, -115]} color="#c69b63" intensity={1.65} />
      <directionalLight position={[-35, 100, -25]} color="#80afc8" intensity={1.7} />
      <directionalLight position={[25, 20, 55]} color="#a7c4d1" intensity={0.62} />
      <pointLight position={[0, 5, -39]} color="#c69b63" intensity={140} distance={36} decay={2} />
    </>
  );
}
