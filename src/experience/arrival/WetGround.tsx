import { useEffect, useMemo } from 'react';
import { Color, PlaneGeometry, type ShaderMaterial } from 'three';
import { Reflector } from 'three/addons/objects/Reflector.js';
import type { Quality } from '../quality';

export function WetGround({ quality }: { quality: Quality }) {
  const ground = useMemo(() => {
    const geometry = new PlaneGeometry(420, 420);
    const size = quality === 'high' ? 1024 : quality === 'balanced' ? 768 : 384;
    const reflector = new Reflector(geometry, {
      clipBias: 0.003,
      textureWidth: size,
      textureHeight: size,
      color: new Color('#59666b'),
    });
    reflector.rotation.x = -Math.PI / 2;
    reflector.position.y = -0.025;
    const material = reflector.material as ShaderMaterial;
    material.vertexShader = material.vertexShader
      .replace('uniform mat4 textureMatrix;', 'uniform mat4 textureMatrix; varying vec2 groundUv;')
      .replace('vUv = textureMatrix', 'groundUv = position.xy; vUv = textureMatrix');
    material.fragmentShader = material.fragmentShader
      .replace(
        'uniform vec3 color;',
        `uniform vec3 color; varying vec2 groundUv;
      float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
      float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);}
    `,
      )
      .replace(
        'vec4 base = texture2DProj( tDiffuse, vUv );',
        `
      float n=noise(groundUv*vec2(3.,23.));
      vec4 rippled=vUv; rippled.x+=(n-.5)*.003*vUv.w; rippled.y+=(n-.5)*.0008*vUv.w;
      vec4 base=texture2DProj(tDiffuse,rippled);
      float wet=smoothstep(.2,.75,noise(groundUv*.43));
      base.rgb=mix(vec3(.045,.058,.064),base.rgb,.23+wet*.40);
      base.rgb+= (n-.5)*.012;
    `,
      );
    return reflector;
  }, [quality]);
  useEffect(
    () => () => {
      ground.geometry.dispose();
      ground.dispose();
    },
    [ground],
  );
  return <primitive object={ground} />;
}
