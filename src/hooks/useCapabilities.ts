import { useEffect, useState } from 'react';
export interface Capabilities { realtime: boolean; reducedMotion: boolean; }
export function detectCapabilities(): Capabilities {
 const reducedMotion=matchMedia('(prefers-reduced-motion: reduce)').matches;
 const small=matchMedia('(max-width: 900px)').matches;
 const coarse=matchMedia('(pointer: coarse)').matches;
 const memory=(navigator as Navigator & {deviceMemory?:number}).deviceMemory;
 const weak=(memory!==undefined&&memory<=4)||(navigator.hardwareConcurrency>0&&navigator.hardwareConcurrency<=2);
 return {realtime:!small&&!coarse&&!reducedMotion&&!weak,reducedMotion};
}
export function useCapabilities(){const [capabilities,setCapabilities]=useState(detectCapabilities);useEffect(()=>{const media=['(prefers-reduced-motion: reduce)','(max-width: 900px)','(pointer: coarse)'].map(q=>matchMedia(q));const update=()=>setCapabilities(detectCapabilities());media.forEach(m=>m.addEventListener('change',update));return()=>media.forEach(m=>m.removeEventListener('change',update));},[]);return capabilities;}
