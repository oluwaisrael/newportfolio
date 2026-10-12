import { Canvas } from '@react-three/fiber';
import { World } from './World';
import { qualitySettings, type Quality } from './quality';
import { useVisibility } from '../hooks/useVisibility';
import { useEffect, useRef } from 'react';
export default function ExperienceCanvas({quality,onFailure,onReady}:{quality:Quality;onFailure:()=>void;onReady:()=>void}){const visible=useVisibility();const canvas=useRef<HTMLCanvasElement|null>(null);useEffect(()=>()=>{document.body.style.cursor='';},[]);useEffect(()=>{const element=canvas.current;if(!element)return;const lost=(event:Event)=>{event.preventDefault();onFailure();};element.addEventListener('webglcontextlost',lost);return()=>element.removeEventListener('webglcontextlost',lost);},[onFailure]);return <Canvas aria-hidden="true" tabIndex={-1} dpr={qualitySettings[quality].dpr} frameloop={visible?'always':'never'} camera={{position:[47,32,57],fov:43,near:.1,far:220}} gl={{antialias:false,alpha:false,powerPreference:'low-power'}} onCreated={({gl})=>{canvas.current=gl.domElement;onReady();}} fallback={null}><World quality={quality}/></Canvas>;}
