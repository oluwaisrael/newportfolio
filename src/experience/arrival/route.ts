import { CatmullRomCurve3, Vector3 } from 'three';
import { arrivalWalkwayPoints } from './geometry';

// The camera line is derived from the walkable bridge's authored centerline.
// This keeps the guided journey physically attached to the route through the city.
export const arrivalRoute = new CatmullRomCurve3([
  new Vector3(0, 8.5, 68),
  ...arrivalWalkwayPoints.map((point) => point.clone().add(new Vector3(0, 7, 9))),
]);
export const arrivalEye = arrivalRoute.getPointAt(0);
export const arrivalLook = new Vector3(0, 28, -91);
export const arrivalTargets = new CatmullRomCurve3([
  arrivalLook,
  new Vector3(18, 14, -18),
  new Vector3(34, 20, -38),
  new Vector3(25, 24, -55),
  new Vector3(0, 26, -70),
  new Vector3(-28, 30, -88),
  new Vector3(-36, 34, -110),
]);
export const futureDestinations = [
  'priceuniverse',
  'unirag',
  'neural-network',
  'roam',
  'lael',
  'about',
  'lab',
  'contact',
] as const;
