import { useEffect, useMemo } from 'react';
import { PlaneGeometry } from 'three';
import { useNavigate } from 'react-router-dom';
import { createArchitecture } from './geometry';
import { Surveyors } from './Surveyors';
import type { Quality } from '../quality';

const regions = [
  { slug: 'unirag', x: -72, y: 18, z: -68 },
  { slug: 'neural-network', x: -116, y: 14, z: -38 },
  { slug: 'priceuniverse', x: 72, y: 18, z: -73 },
  { slug: 'roam', x: 116, y: 16, z: -42 },
  { slug: 'lael', x: 108, y: 18, z: -116 },
] as const;

export function ArrivalWorld(_props: { quality: Quality }) {
  void _props.quality;
  const geometry = useMemo(createArchitecture, []);
  const ground = useMemo(() => new PlaneGeometry(500, 500), []);
  const navigate = useNavigate();

  useEffect(
    () => () => {
      Object.values(geometry).forEach((item) => {
        if ('dispose' in item) item.dispose();
      });
      ground.dispose();
    },
    [geometry, ground],
  );

  return (
    <>
      <color attach="background" args={['#737373']} />
      <fog attach="fog" args={['#737373', 260, 560]} />
      <hemisphereLight args={['#d7d7d7', '#444444', 1.15]} />
      <ambientLight color="#ffffff" intensity={0.42} />
      <directionalLight position={[-80, 140, 75]} color="#ffffff" intensity={2.6} />
      <directionalLight position={[90, 70, -110]} color="#c8c8c8" intensity={0.85} />

      <group>
        <mesh geometry={ground} rotation={[-Math.PI / 2, 0, 0]} position={[0, -2.5, -30]}>
          <meshStandardMaterial color="#5f5f5f" roughness={0.92} metalness={0.02} />
        </mesh>
        <mesh geometry={geometry.plaza}>
          <meshStandardMaterial color="#a0a0a0" roughness={0.82} metalness={0.04} />
        </mesh>
        <mesh geometry={geometry.structure}>
          <meshStandardMaterial color="#858585" roughness={0.86} metalness={0.04} />
        </mesh>
        <mesh geometry={geometry.recess}>
          <meshStandardMaterial color="#4b4b4b" roughness={0.94} metalness={0} />
        </mesh>
        <mesh geometry={geometry.support}>
          <meshStandardMaterial color="#727272" roughness={0.9} metalness={0.02} />
        </mesh>
        <mesh geometry={geometry.roof}>
          <meshStandardMaterial color="#b0b0b0" roughness={0.76} metalness={0.08} />
        </mesh>
        <mesh geometry={geometry.routeDeck}>
          <meshStandardMaterial color="#a8a8a8" roughness={0.78} metalness={0.06} />
        </mesh>
        <mesh geometry={geometry.routeEdge}>
          <meshStandardMaterial color="#777777" roughness={0.86} metalness={0.03} />
        </mesh>
        <mesh geometry={geometry.routeSupport}>
          <meshStandardMaterial color="#686868" roughness={0.9} metalness={0.02} />
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
