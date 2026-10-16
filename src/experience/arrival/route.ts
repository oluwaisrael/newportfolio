import { CatmullRomCurve3, Vector3 } from 'three';
import { arrivalWalkwayPoints } from './geometry';

// The camera line is derived from the walkable bridge's authored centerline.
// This keeps the guided journey physically attached to the route through the city.
export const arrivalRoute = new CatmullRomCurve3(
  arrivalWalkwayPoints.map((point) => point.clone().add(new Vector3(0, 7, 12))),
);
export const arrivalEye = arrivalRoute.getPointAt(0);
export const arrivalLook = new Vector3(0, 32, -91);
export const arrivalTargets = new CatmullRomCurve3([
  arrivalLook,
  ...arrivalWalkwayPoints.slice(2).map((point) => point.clone().add(new Vector3(0, 20, -35))),
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
