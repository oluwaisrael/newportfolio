export type Quality = 'low' | 'balanced' | 'high';
export const qualitySettings = {
  low: { dpr: 1, observations: 240, terrainSegments: 50, structures: 40 },
  balanced: { dpr: 1.25, observations: 600, terrainSegments: 80, structures: 65 },
  high: { dpr: 1.5, observations: 1000, terrainSegments: 110, structures: 90 },
} as const;
export function readQuality(): Quality {
  try {
    const value = localStorage.getItem('derin-quality');
    if (value === 'low' || value === 'balanced' || value === 'high') return value;
  } catch {
    /* Private browsing may deny persistence. */
  }
  return 'balanced';
}
export function saveQuality(quality: Quality) {
  try {
    localStorage.setItem('derin-quality', quality);
  } catch {
    /* The in-memory preference still works. */
  }
}
