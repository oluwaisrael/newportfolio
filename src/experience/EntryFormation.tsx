import { useRef, type ReactNode } from 'react';
import { useFrame } from '@react-three/fiber';
import { Group, MathUtils } from 'three';
import { useWorld } from './WorldController';
export function EntryFormation({children}:{children:ReactNode}){const group=useRef<Group>(null);const{state}=useWorld();const initialEntry=useRef(state==='entry');const elapsed=useRef(0);useFrame((_,delta)=>{if(!group.current)return;elapsed.current+=Math.min(delta,.05);const t=initialEntry.current?MathUtils.smoothstep(elapsed.current,1,7):1;group.current.scale.y=.01+t*.99;group.current.position.y=(1-t)*-1.5;});return <group ref={group}>{children}</group>;}
