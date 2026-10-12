import { useMemo } from 'react';
import { Color } from 'three';
const digit = ['0011100', '0110110', '1100011', '1100011', '1100011', '0110110', '0011100'];
/** An illustrative 28×28 input raster; no trained inference is implied. */
export function InputPixels() {
  const { positions, colors } = useMemo(() => {
    const positions = new Float32Array(784 * 3);
    const colors = new Float32Array(784 * 3);
    const lit = new Color('#9cb4cd');
    const dark = new Color('#27343c');
    for (let y = 0; y < 28; y++)
      for (let x = 0; x < 28; x++) {
        const i = y * 28 + x;
        positions.set([-8 + x * 0.11, 5 - y * 0.11, 1], i * 3);
        (digit[Math.floor(y / 4)][Math.floor(x / 4)] === '1' ? lit : dark).toArray(colors, i * 3);
      }
    return { positions, colors };
  }, []);
  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial vertexColors size={0.075} sizeAttenuation />
    </points>
  );
}
