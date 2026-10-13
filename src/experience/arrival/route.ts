import { CatmullRomCurve3, Vector3 } from 'three';

// World units are metres. Arrival is the first, deliberately short leg of the route.
export const arrivalEye = new Vector3(0, 2.8, 52);
export const arrivalLook = new Vector3(-5, 35, -55);
export const arrivalRoute = new CatmullRomCurve3([
  arrivalEye,
  new Vector3(0.4, 2.8, 36),
  new Vector3(1.2, 3.0, 15),
  new Vector3(0, 3.2, -9),
]);
export const arrivalTargets = new CatmullRomCurve3([
  arrivalLook,
  new Vector3(-3, 29, -55),
  new Vector3(-1, 21, -55),
  new Vector3(0, 12, -55),
]);
// Later legs can supply their own eye/target splines without changing native scrolling.
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
