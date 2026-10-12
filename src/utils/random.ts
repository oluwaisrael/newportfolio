/** Seeded scene generation keeps geometry stable across routes and tests. */
export function random(seed: number) {
  let state = seed >>> 0;
  return () => {
    state = (1664525 * state + 1013904223) >>> 0;
    return state / 4294967296;
  };
}
export function normal(rng: () => number) {
  return Math.sqrt(-2 * Math.log(Math.max(0.0001, rng()))) * Math.cos(2 * Math.PI * rng());
}
export function terrainHeight(x: number, z: number) {
  return (
    -1.8 +
    Math.sin(x * 0.075) * 1.3 +
    Math.cos(z * 0.09) * 1.1 +
    Math.sin(x * 0.17 + z * 0.13) * 0.45
  );
}
