import { Surveyors } from './Surveyors';
import { useEffect, useMemo } from 'react';
import { CanvasTexture, RepeatWrapping, type MeshStandardMaterial } from 'three';
import { useNavigate } from 'react-router-dom';
import { createArchitecture } from './geometry';
import { Atmosphere } from './Atmosphere';
import { WetGround } from './WetGround';
import type { Quality } from '../quality';

function weatherTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 256;
  const ctx = canvas.getContext('2d')!;
  const data = ctx.createImageData(256, 256);
  let seed = 918;
  for (let y = 0; y < 256; y++)
    for (let x = 0; x < 256; x++) {
      seed = (seed * 1664525 + 1013904223) >>> 0;
      const v = 130 + (seed / 4294967296) * 58 + Math.sin(x * 0.24) * 12;
      const i = (y * 256 + x) * 4;
      data.data[i] = data.data[i + 1] = data.data[i + 2] = v;
      data.data[i + 3] = 255;
    }
  ctx.putImageData(data, 0, 0);
  for (let i = 0; i < 80; i++) {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    ctx.fillStyle = 'rgba(22,29,33,0.13)';
    ctx.fillRect(seed % 256, 0, 1 + (seed % 3), (seed % 190) + 30);
  }
  const texture = new CanvasTexture(canvas);
  texture.wrapS = texture.wrapT = RepeatWrapping;
  texture.repeat.set(5, 16);
  return texture;
}
const districts = [
  { slug: 'priceuniverse', x: -49, z: -89, color: '#8caa87', height: 25 },
  { slug: 'unirag', x: 49, z: -85, color: '#8dbbda', height: 31 },
  { slug: 'neural-network', x: 58, z: -115, color: '#c3a174', height: 22 },
] as const;

export function ArrivalWorld({ quality }: { quality: Quality }) {
  const geometry = useMemo(createArchitecture, []);
  const texture = useMemo(weatherTexture, []);
  const navigate = useNavigate();
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
            color="#9ba8ad"
            map={texture}
            onBeforeCompile={heightAtmosphere}
            roughness={0.83}
            metalness={0.18}
            bumpMap={texture}
            bumpScale={0.12}
          />
        </mesh>
        <mesh geometry={geometry.metal}>
          <meshStandardMaterial
            color="#35434a"
            onBeforeCompile={heightAtmosphere}
            roughness={0.49}
            metalness={0.62}
            bumpMap={texture}
            bumpScale={0.04}
          />
        </mesh>
        <mesh geometry={geometry.trim}>
          <meshStandardMaterial color="#66787c" roughness={0.45} metalness={0.68} />
        </mesh>
        <mesh geometry={geometry.lamps}>
          <meshStandardMaterial
            color="#fff0d1"
            emissive="#ffe2ad"
            emissiveIntensity={5}
            toneMapped={false}
          />
        </mesh>
        <mesh geometry={geometry.distance}>
          <meshStandardMaterial color="#536469" roughness={0.95} />
        </mesh>
        <WetGround quality={quality} />
        <Surveyors />
        <mesh position={[0, 3.6, -37]} renderOrder={2}>
          <planeGeometry args={[110, 16]} />
          <shaderMaterial
            transparent
            depthWrite={false}
            vertexShader={`varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`}
            fragmentShader={`varying vec2 vUv;void main(){float a=exp(-pow((vUv.y-.32)*4.,2.))*smoothstep(0.,.15,vUv.x)*smoothstep(1.,.85,vUv.x);gl_FragColor=vec4(.52,.62,.64,a*.23);}`}
          />
        </mesh>
        {[-1, 1].map((side) => (
          <mesh key={'glow' + side} position={[side * 13, 12.76, -45.9]} renderOrder={3}>
            <planeGeometry args={[9, 10]} />
            <shaderMaterial
              transparent
              depthWrite={false}
              vertexShader={`varying vec2 vUv;void main(){vUv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);}`}
              fragmentShader={`varying vec2 vUv;void main(){vec2 p=(vUv-.5)*2.;float a=exp(-dot(p,p)*5.)*.22;gl_FragColor=vec4(1.,.79,.48,a);}`}
            />
          </mesh>
        ))}
        {districts.map((d) => (
          <group key={d.slug} position={[d.x, 0, d.z]}>
            <mesh
              position={[0, d.height / 2, 0]}
              onClick={(e) => {
                e.stopPropagation();
                navigate('/work/' + d.slug);
              }}
              onPointerOver={() => {
                document.body.style.cursor = 'pointer';
              }}
              onPointerOut={() => {
                document.body.style.cursor = '';
              }}
            >
              <cylinderGeometry args={[5, 7, d.height, 8]} />
              <meshStandardMaterial color="#38454a" metalness={0.45} roughness={0.65} />
            </mesh>
            {[0, 1, 2].map((i) => (
              <mesh key={i} position={[0, d.height * 0.7 + i * 1.5, 5.5]}>
                <boxGeometry args={[6, 0.13, 0.2]} />
                <meshStandardMaterial color={d.color} emissive={d.color} emissiveIntensity={1.2} />
              </mesh>
            ))}
          </group>
        ))}
        {/* A pair of human-scale survey markers at the entrance, 1.7 m tall. */}
        {[-1, 1].map((side) => (
          <group key={side} position={[side * 12, 0, -17]}>
            <mesh position={[0, 0.7, 0]}>
              <cylinderGeometry args={[0.1, 0.16, 1.4, 6]} />
              <meshStandardMaterial color="#1b2528" />
            </mesh>
            <mesh position={[0, 1.5, 0]}>
              <boxGeometry args={[0.24, 0.3, 0.24]} />
              <meshStandardMaterial color="#b8c5bf" emissive="#b8c5bf" emissiveIntensity={0.4} />
            </mesh>
          </group>
        ))}
      </group>
    </>
  );
}

// Keep the crown crisp while moisture gathers around the base of the architecture.
const heightAtmosphere: MeshStandardMaterial['onBeforeCompile'] = (shader) => {
  shader.vertexShader = shader.vertexShader
    .replace('#include <common>', '#include <common>\nvarying float arrivalHeight;')
    .replace(
      '#include <begin_vertex>',
      '#include <begin_vertex>\narrivalHeight = (modelMatrix * vec4(position,1.)).y;',
    );
  shader.fragmentShader = shader.fragmentShader
    .replace('#include <common>', '#include <common>\nvarying float arrivalHeight;')
    .replace(
      '#include <fog_fragment>',
      `
    #ifdef USE_FOG
      float fogFactor = smoothstep(fogNear,fogFar,vFogDepth);
      fogFactor *= .42 + exp(-max(arrivalHeight,0.)*.07)*.7;
      gl_FragColor.rgb = mix(gl_FragColor.rgb,fogColor,fogFactor);
    #endif
  `,
    );
};
