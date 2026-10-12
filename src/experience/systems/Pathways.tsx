import { useMemo, useRef, useEffect } from 'react';
import { useFrame } from '@react-three/fiber';
import { BufferGeometry, Vector3, Group } from 'three';
import { terrainHeight } from '../../utils/random';
const paths=[[-50,-4,40,-4],[-20,-35,-20,35],[9,-45,9,40],[-40,-20,37,-20],[25,-25,25,30]];
export function Pathways(){const group=useRef<Group>(null);const geometries=useMemo(()=>paths.map(([x1,z1,x2,z2])=>{const points=Array.from({length:100},(_,i)=>{const t=i/99,x=x1+(x2-x1)*t,z=z1+(z2-z1)*t;return new Vector3(x,terrainHeight(x,z)+.08,z);});return new BufferGeometry().setFromPoints(points);}),[]);useEffect(()=>()=>geometries.forEach(g=>g.dispose()),[geometries]);useFrame(({clock})=>{group.current?.children.forEach((child,i)=>{const p=paths[i],t=(clock.elapsedTime*.045+i*.18)%1,x=p[0]+(p[2]-p[0])*t,z=p[1]+(p[3]-p[1])*t;child.position.set(x,terrainHeight(x,z)+.2,z);});});return <>{geometries.map((g,i)=><lineLoop key={i} geometry={g}><lineBasicMaterial color={i===2?'#7891ac':'#697753'} transparent opacity={.38}/></lineLoop>)}<group ref={group}>{paths.map((_,i)=><mesh key={i}><sphereGeometry args={[.12,6,4]}/><meshBasicMaterial color="#c7d5a3"/></mesh>)}</group></>;}
