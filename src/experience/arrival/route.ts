import { CatmullRomCurve3, Vector3 } from 'three';
// The visitor begins on the near terrace and winds through the five districts.
export const arrivalEye = new Vector3(0, 7, 68);
export const arrivalLook = new Vector3(0, 28, -84);
export const arrivalRoute = new CatmullRomCurve3([
  arrivalEye,
  new Vector3(1, 8, 49),
  new Vector3(25, 10, 29),
  new Vector3(44, 11, 7),
  new Vector3(7, 12, -17),
  new Vector3(-49, 16, -37),
  new Vector3(-84, 18, -58),
  new Vector3(-42, 22, -81),
]);
export const arrivalTargets = new CatmullRomCurve3([
  arrivalLook,
  new Vector3(0, 34, -81),
  new Vector3(18, 43, -86),
  new Vector3(-9, 48, -85),
  new Vector3(-44, 37, -68),
  new Vector3(-96, 31, -51),
  new Vector3(-116, 26, -45),
  new Vector3(-58, 30, -87),
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
