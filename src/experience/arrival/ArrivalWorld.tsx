import { useEffect, useMemo } from 'react';
import { CanvasTexture, PlaneGeometry, RepeatWrapping } from 'three';
import { useNavigate } from 'react-router-dom';
import { createArchitecture } from './geometry';
import { Atmosphere } from './Atmosphere';
import { Surveyors } from './Surveyors';
import type { Quality } from '../quality';

const regions = [
  { slug: 'unirag', x: -72, y: 18, z: -68 },
  { slug: 'neural-network', x: -116, y: 14, z: -38 },
  { slug: 'priceuniverse', x: 72, y: 18, z: -73 },
  { slug: 'roam', x: 116, y: 16, z: -42 },
  { slug: 'lael', x: 108, y: 18, z: -116 },
] as const;

function concreteTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 256;
  const context = canvas.getContext('2d')!;
  const image = context.createImageData(256, 256);
  let seed = 81427;
  for (let index = 0; index < image.data.length; index += 4) {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    const grain = 155 + Math.floor((seed / 4294967296) * 70);
    image.data[index] = grain;
    image.data[index + 1] = grain;
    image.data[index + 2] = grain;
    image.data[index + 3] = 255;
  }
  context.putImageData(image, 0, 0);
  const texture = new CanvasTexture(canvas);
  texture.wrapS = texture.wrapT = RepeatWrapping;
  texture.repeat.set(8, 8);
  return texture;
}

export function ArrivalWorld(_props: { quality: Quality }) {
  void _props.quality;
  const geometry = useMemo(createArchitecture, []);
  const ground = useMemo(() => new PlaneGeometry(500, 500), []);
  const concrete = useMemo(concreteTexture, []);
  const navigate = useNavigate();

  useEffect(
    () => () => {
      Object.values(geometry).forEach((item) => {
        if ('dispose' in item) item.dispose();
      });
      ground.dispose();
      concrete.dispose();
    },
    [concrete, geometry, ground],
  );

  return (
    <>
      <Atmosphere />
      <directionalLight position={[0, 38, 115]} color="#80afc8" intensity={0.9} />
      <pointLight
        position={[0, 72, -58]}
        color="#c69b63"
        intensity={850}
        distance={150}
        decay={2}
      />
      <pointLight
        position={[-72, 34, -48]}
        color="#80afc8"
        intensity={560}
        distance={110}
        decay={2}
      />
      <pointLight
        position={[72, 38, -58]}
        color="#c69b63"
        intensity={460}
        distance={105}
        decay={2}
      />
      <pointLight position={[0, 5, 16]} color="#80afc8" intensity={125} distance={54} decay={2} />

      <group>
        <mesh geometry={ground} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.5, -30]}>
          <meshStandardMaterial color="#0b1015" roughness={0.48} metalness={0.34} />
        </mesh>
        <mesh geometry={geometry.plaza}>
          <meshStandardMaterial
            color="#2b3941"
            map={concrete}
            bumpMap={concrete}
            bumpScale={0.045}
            roughness={0.56}
            metalness={0.24}
          />
        </mesh>
        <mesh geometry={geometry.structure}>
          <meshStandardMaterial
            color="#394b56"
            map={concrete}
            bumpMap={concrete}
            bumpScale={0.08}
            roughness={0.76}
            metalness={0.12}
          />
        </mesh>
        <mesh geometry={geometry.recess}>
          <meshStandardMaterial
            color="#0c1217"
            emissive="#132733"
            emissiveIntensity={0.18}
            roughness={0.72}
            metalness={0.24}
          />
        </mesh>
        <mesh geometry={geometry.support}>
          <meshStandardMaterial color="#26343e" roughness={0.82} metalness={0.12} />
        </mesh>
        <mesh geometry={geometry.roof}>
          <meshStandardMaterial color="#465b67" roughness={0.42} metalness={0.5} />
        </mesh>
        <mesh geometry={geometry.routeDeck}>
          <meshStandardMaterial color="#52626a" roughness={0.5} metalness={0.38} />
        </mesh>
        <mesh geometry={geometry.routeEdge}>
          <meshStandardMaterial
            color="#8f6d45"
            emissive="#c69b63"
            emissiveIntensity={0.48}
            roughness={0.28}
            metalness={0.52}
          />
        </mesh>
        <mesh geometry={geometry.routeSupport}>
          <meshStandardMaterial color="#26343e" roughness={0.84} metalness={0.14} />
        </mesh>
        <mesh geometry={geometry.lights}>
          <meshStandardMaterial
            color="#e9d5b0"
            emissive="#c69b63"
            emissiveIntensity={0.9}
            roughness={0.32}
            metalness={0.08}
          />
        </mesh>

        <Surveyors />
        {regions.map((region) => (
          <mesh
            key={region.slug}
            position={[region.x, region.y + 18, region.z]}
            onClick={(event) => {
              event.stopPropagation();
              navigate('/work/' + region.slug);
            }}
            onPointerOver={() => {
              document.body.style.cursor = 'pointer';
            }}
            onPointerOut={() => {
              document.body.style.cursor = '';
            }}
          >
            <boxGeometry args={[28, 40, 32]} />
            <meshBasicMaterial transparent opacity={0} />
          </mesh>
        ))}
      </group>
    </>
  );
}
