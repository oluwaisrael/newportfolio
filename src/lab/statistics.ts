import { normal, random } from '../utils/random';
export function sampleDistribution(count: number, spread: number, seed: number) {
  const rng = random(seed);
  return Array.from({ length: count }, () => 50 + normal(rng) * spread);
}
export function describe(values: number[]) {
  if (!values.length) return { mean: 0, sd: 0, se: 0 };
  const mean = values.reduce((a, b) => a + b, 0) / values.length;
  const variance = values.reduce((s, n) => s + (n - mean) ** 2, 0) / Math.max(1, values.length - 1);
  return { mean, sd: Math.sqrt(variance), se: Math.sqrt(variance / values.length) };
}
