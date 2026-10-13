import { useEffect, useMemo } from 'react';
import { CanvasTexture, RepeatWrapping, type MeshStandardMaterial } from 'three';
import { useNavigate } from 'react-router-dom';
import { createArchitecture } from './geometry';
import { Atmosphere } from './Atmosphere';
import { WetGround } from './WetGround';
import { Surveyors } from './Surveyors';
import type { Quality } from '../quality';

function weatherTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 256;
  const context = canvas.getContext('2d')!,
    image = context.createImageData(256, 256);
  let seed = 918;
  for (let y = 0; y < 256; y++)
    for (let x = 0; x < 256; x++) {
      seed = (seed * 1664525 + 1013904223) >>> 0;
      const shade = 98 + (seed / 4294967296) * 96 + Math.sin(x * 0.24) * 14,
        index = (y * 256 + x) * 4;
      image.data[index] = shade;
      image.data[index + 1] = shade;
      image.data[index + 2] = shade;
      image.data[index + 3] = 255;
    }
  context.putImageData(image, 0, 0);
  for (let i = 0; i < 80; i++) {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    context.fillStyle = 'rgba(9,13,19,.22)';
    context.fillRect(seed % 256, 0, 1 + (seed % 3), 35 + (seed % 210));
  }
  const texture = new CanvasTexture(canvas);
  texture.wrapS = texture.wrapT = RepeatWrapping;
  texture.repeat.set(4, 18);
  return texture;
}
const regions = [
  { slug: 'unirag', x: -63, y: 9, z: -54, color: '#8dbbff' },
  { slug: 'neural-network', x: -111, y: 3, z: -9, color: '#e4a751' },
  { slug: 'priceuniverse', x: 105, y: 13, z: -59, color: '#b2dc96' },
  { slug: 'roam', x: 132, y: 4, z: 9, color: '#f2a66f' },
  { slug: 'lael', x: 210, y: 6, z: -38, color: '#ced5de' },
] as const;

export function ArrivalWorld({ quality }: { quality: Quality }) {
  const geometry = useMemo(createArchitecture, []),
    texture = useMemo(weatherTexture, []),
    navigate = useNavigate();
  useEffect(
    () => () => {
      Object.values(geometry).forEach((g) => g.dispose());
      texture.dispose();
    },
    [geometry, texture],
  );
  return (
    <>
      <Atmosphere />
      <group>
        <mesh geometry={geometry.stone}>
          <meshStandardMaterial
            color="#707a83"
            map={texture}
            bumpMap={texture}
            bumpScale={0.11}
            onBeforeCompile={heightAtmosphere}
            roughness={0.88}
            metalness={0.14}
          />
        </mesh>
        <mesh geometry={geometry.metal}>
          <meshStandardMaterial
            color="#293541"
            map={texture}
            bumpMap={texture}
            bumpScale={0.07}
            onBeforeCompile={heightAtmosphere}
            roughness={0.47}
            metalness={0.58}
          />
        </mesh>
        <mesh geometry={geometry.trim}>
          <meshStandardMaterial color="#556270" roughness={0.48} metalness={0.67} />
        </mesh>
        <mesh geometry={geometry.gold}>
          <meshStandardMaterial
            color="#d4a66d"
            emissive="#ba7940"
            emissiveIntensity={0.42}
            roughness={0.42}
            metalness={0.54}
          />
        </mesh>
        <mesh geometry={geometry.blue}>
          <meshStandardMaterial
            color="#96bdff"
            emissive="#377ded"
            emissiveIntensity={1.15}
            roughness={0.42}
            metalness={0.3}
          />
        </mesh>
        <mesh geometry={geometry.green}>
          <meshStandardMaterial
            color="#a6cc8e"
            emissive="#5a8b59"
            emissiveIntensity={0.85}
            roughness={0.48}
          />
        </mesh>
        <mesh geometry={geometry.amber}>
          <meshStandardMaterial
            color="#d2a171"
            emissive="#b87537"
            emissiveIntensity={0.75}
            roughness={0.52}
          />
        </mesh>
        <mesh geometry={geometry.lamps}>
          <meshStandardMaterial
            color="#ffe9cb"
            emissive="#ffd395"
            emissiveIntensity={2.4}
            toneMapped={false}
          />
        </mesh>
        <mesh geometry={geometry.distance}>
          <meshStandardMaterial color="#293541" roughness={0.95} />
        </mesh>
        <mesh geometry={geometry.water}>
          <meshStandardMaterial
            color="#4f7480"
            emissive="#173848"
            emissiveIntensity={0.55}
            roughness={0.16}
            metalness={0.45}
            transparent
            opacity={0.72}
          />
        </mesh>
        <mesh geometry={geometry.road}>
          <meshStandardMaterial color="#292827" roughness={0.24} metalness={0.54} side={2} />
        </mesh>
        <mesh geometry={geometry.rails}>
          <meshStandardMaterial
            color="#e6bd8b"
            emissive="#c68b56"
            emissiveIntensity={0.95}
            roughness={0.3}
            metalness={0.55}
          />
        </mesh>

        <mesh position={[0, 106, -82]} rotation={[Math.PI / 2, 0, 0]} scale={[1, 0.42, 1]}>
          <torusGeometry args={[62, 0.14, 5, 220]} />
          <meshBasicMaterial color="#b18c70" toneMapped={false} transparent opacity={0.76} />
        </mesh>
        <mesh position={[0, 105, -82]} rotation={[Math.PI / 2, 0, 0]} scale={[1, 0.33, 1]}>
          <torusGeometry args={[79, 0.075, 4, 220]} />
          <meshBasicMaterial color="#8f9cab" toneMapped={false} transparent opacity={0.56} />
        </mesh>
        <pointLight
          position={[-8.5, 7, 46]}
          color="#8dabc9"
          intensity={34}
          distance={26}
          decay={2}
        />
        <pointLight
          position={[0, 128, -79]}
          color="#e7c697"
          intensity={2350}
          distance={164}
          decay={2}
        />
        <pointLight
          position={[-63, 22, -47]}
          color="#4d8cf4"
          intensity={1050}
          distance={96}
          decay={2}
        />
        <pointLight
          position={[105, 26, -52]}
          color="#84b77b"
          intensity={930}
          distance={100}
          decay={2}
        />
        <pointLight
          position={[-111, 25, -4]}
          color="#dc9848"
          intensity={1050}
          distance={108}
          decay={2}
        />
        <pointLight
          position={[132, 17, 10]}
          color="#bc815a"
          intensity={280}
          distance={82}
          decay={2}
        />
        <WetGround quality={quality} />
        <Surveyors />
        {regions.map((region) => (
          <mesh
            key={region.slug}
            position={[region.x, region.y + 17, region.z]}
            onClick={(e) => {
              e.stopPropagation();
              navigate('/work/' + region.slug);
            }}
            onPointerOver={() => {
              document.body.style.cursor = 'pointer';
            }}
            onPointerOut={() => {
              document.body.style.cursor = '';
            }}
          >
            <cylinderGeometry args={[25, 30, 34, 8]} />
            <meshBasicMaterial transparent opacity={0} />
          </mesh>
        ))}
      </group>
    </>
  );
}

const heightAtmosphere: MeshStandardMaterial['onBeforeCompile'] = (shader) => {
  shader.vertexShader = shader.vertexShader
    .replace('#include <common>', '#include <common>\nvarying float arrivalHeight;')
    .replace(
      '#include <begin_vertex>',
      '#include <begin_vertex>\narrivalHeight=(modelMatrix*vec4(position,1.)).y;',
    );
  shader.fragmentShader = shader.fragmentShader
    .replace('#include <common>', '#include <common>\nvarying float arrivalHeight;')
    .replace(
      '#include <fog_fragment>',
      `#ifdef USE_FOG\nfloat fogFactor=smoothstep(fogNear,fogFar,vFogDepth);fogFactor*=.37+exp(-max(arrivalHeight,0.)*.042)*.72;gl_FragColor.rgb=mix(gl_FragColor.rgb,fogColor,fogFactor);\n#endif`,
    );
};
