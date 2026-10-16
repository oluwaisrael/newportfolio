import {
  BufferGeometry,
  BoxGeometry,
  CatmullRomCurve3,
  Float32BufferAttribute,
  TubeGeometry,
  Vector3,
} from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

type Batch = BufferGeometry[];

export type ArrivalArchitecture = ReturnType<typeof createArchitecture>;

function add(batch: Batch, geometry: BufferGeometry, x: number, y: number, z: number) {
  geometry.translate(x, y, z);
  batch.push(geometry);
}

function block(
  batch: Batch,
  x: number,
  y: number,
  z: number,
  width: number,
  height: number,
  depth: number,
) {
  add(batch, new BoxGeometry(width, height, depth), x, y, z);
}

function finish(batch: Batch) {
  if (!batch.length) return new BufferGeometry();
  const geometries = batch.map((geometry) => (geometry.index ? geometry.toNonIndexed() : geometry));
  const merged = mergeGeometries(geometries, false);
  new Set([...batch, ...geometries]).forEach((geometry) => geometry.dispose());
  if (!merged) throw new Error('Arrival architecture batches must share vertex attributes.');
  return merged;
}

function facade(
  structure: Batch,
  recess: Batch,
  x: number,
  z: number,
  width: number,
  depth: number,
  height: number,
  floors: number,
) {
  block(structure, x, height / 2, z, width, height, depth);

  // Deep inset window bays, broad pilasters and floor slabs make each monolith
  // read as a layered building rather than a smooth primitive.
  const front = z + depth / 2;
  const floorHeight = height / floors;
  const bayWidth = width / Math.max(3, Math.round(width / 5.5));
  const bayCount = Math.max(3, Math.round(width / 5.5));
  for (let floor = 0; floor < floors; floor++) {
    const floorY = (floor + 0.5) * floorHeight;
    for (let bay = 0; bay < bayCount; bay++) {
      const bayX = x - width / 2 + bayWidth * (bay + 0.5);
      const openingWidth = bayWidth * 0.5;
      const openingHeight = floorHeight * 0.56;
      block(recess, bayX, floorY, front + 0.07, openingWidth, openingHeight, 0.12);
      block(
        structure,
        bayX,
        floorY - openingHeight * 0.57,
        front + 0.24,
        openingWidth + 0.5,
        0.42,
        0.42,
      );
    }
    block(structure, x, (floor + 1) * floorHeight, front + 0.12, width + 0.5, 0.44, 0.7);
  }

  for (let side = -1; side <= 1; side += 2) {
    block(structure, x + side * (width * 0.46), height / 2, front + 0.34, 1.2, height, 1.1);
    block(
      structure,
      x + side * (width * 0.5 + 1.2),
      height / 2,
      z,
      1.2,
      height * 0.92,
      depth * 0.8,
    );
  }
}

function bridge(points: Vector3[], width: number) {
  const curve = new CatmullRomCurve3(points);
  const sections = 180;
  const positions: number[] = [];
  const indices: number[] = [];
  const centers: Vector3[] = [];
  const half = width / 2;
  const thickness = 2.1;

  for (let index = 0; index <= sections; index++) {
    const t = index / sections;
    const point = curve.getPointAt(t);
    const tangent = curve.getTangentAt(t).setY(0).normalize();
    const side = new Vector3(-tangent.z, 0, tangent.x);
    centers.push(point.clone());
    positions.push(
      point.x + side.x * half,
      point.y,
      point.z + side.z * half,
      point.x - side.x * half,
      point.y,
      point.z - side.z * half,
      point.x - side.x * half,
      point.y - thickness,
      point.z - side.z * half,
      point.x + side.x * half,
      point.y - thickness,
      point.z + side.z * half,
    );
    if (index === sections) continue;
    const current = index * 4;
    const next = current + 4;
    // Top face and the two visible side walls form one solid walkable mesh.
    indices.push(
      current,
      next,
      current + 1,
      current + 1,
      next,
      next + 1,
      current + 1,
      next + 1,
      current + 2,
      current + 2,
      next + 1,
      next + 2,
      current,
      current + 3,
      next,
      current + 3,
      next + 3,
      next,
    );
  }

  const deck = new BufferGeometry();
  deck.setAttribute('position', new Float32BufferAttribute(positions, 3));
  deck.setIndex(indices);
  deck.computeVertexNormals();

  const edges: Batch = [];
  for (const sideSign of [-1, 1]) {
    const pointsForEdge = centers.map((center, index) => {
      const tangent = curve
        .getTangentAt(index / sections)
        .setY(0)
        .normalize();
      const side = new Vector3(-tangent.z, 0, tangent.x);
      return center
        .clone()
        .add(side.multiplyScalar(half * sideSign))
        .add(new Vector3(0, -0.1, 0));
    });
    edges.push(new TubeGeometry(new CatmullRomCurve3(pointsForEdge), sections, 0.48, 8, false));
  }

  const support: Batch = [];
  // Four broad concrete piers physically carry the elevated part of the route.
  for (const t of [0.3, 0.48, 0.66, 0.82]) {
    const point = curve.getPointAt(t);
    if (point.y < 5) continue;
    const tangent = curve.getTangentAt(t).setY(0).normalize();
    const side = new Vector3(-tangent.z, 0, tangent.x);
    for (const sideSign of [-1, 1]) {
      const foot = point.clone().add(side.clone().multiplyScalar((half - 2.2) * sideSign));
      const pierHeight = Math.max(1, point.y - 1.6);
      block(support, foot.x, pierHeight / 2, foot.z, 2.6, pierHeight, 3.4);
      block(support, foot.x, pierHeight + 0.8, foot.z, 4, 1.6, 4.6);
    }
  }

  return { deck, edge: finish(edges), support: finish(support), curve };
}

export function createArchitecture() {
  const plaza: Batch = [];
  const structure: Batch = [];
  const recess: Batch = [];
  const support: Batch = [];
  const roof: Batch = [];
  // Arrival forecourt: one broad terrace, oversized edge curbs and readable slab joints.
  block(plaza, 0, -1.2, 38, 250, 2.4, 120);
  block(plaza, 0, -2.15, 38, 254, 0.38, 124);
  for (let x = -115; x <= 115; x += 23) block(structure, x, 0.018, 38, 0.16, 0.035, 115);
  for (let z = -18; z <= 91; z += 22) block(structure, 0, 0.022, z, 245, 0.04, 0.16);
  block(structure, -123, 0.35, 39, 3.8, 0.7, 122);
  block(structure, 123, 0.35, 39, 3.8, 0.7, 122);

  // Central landmark: a broad inhabited gate with an open central passage,
  // layered piers, a deep lintel and a roof spine set behind the opening.
  facade(structure, recess, -13, -91, 25, 30, 104, 11);
  facade(structure, recess, 13, -91, 25, 30, 104, 11);
  block(structure, 0, 105, -91, 48, 11, 35);
  block(roof, 0, 112, -91, 43, 3.2, 29);
  block(structure, 0, 76, -73, 49, 3.2, 4);
  block(structure, 0, 74, -110, 48, 3.2, 4);
  block(structure, -26, 54, -89, 4, 86, 33);
  block(structure, 26, 54, -89, 4, 86, 33);

  // Midground monoliths are broad, stepped and spaced to preserve long views.
  facade(structure, recess, -72, -72, 42, 33, 72, 8);
  block(structure, -72, 77, -75, 35, 6, 28);
  block(structure, -72, 57, -52, 47, 5.5, 9);
  facade(structure, recess, 72, -78, 40, 35, 80, 9);
  block(structure, 72, 85, -81, 34, 6, 29);
  block(structure, 72, 65, -54, 45, 5.5, 9);
  facade(structure, recess, -116, -41, 30, 27, 50, 6);
  facade(structure, recess, 116, -47, 31, 28, 59, 7);
  facade(structure, recess, -105, -113, 31, 26, 64, 7);
  facade(structure, recess, 108, -120, 35, 30, 69, 8);

  // Layered cross-world bridges: broad decks, fascia, underslung trusses and columns.
  for (const [x, y, z, width, depth] of [
    [0, 30, -57, 162, 11],
    [-66, 20, -35, 72, 9],
    [77, 27, -43, 74, 10],
  ]) {
    block(structure, x, y, z, width, 3.5, depth);
    block(roof, x, y - 2.3, z, width + 1.2, 1.1, depth + 1.2);
    for (const side of [-1, 1]) {
      block(structure, x + side * (width / 2 - 3), y - 8, z, 4.5, 12, depth * 0.7);
      block(structure, x + side * (width / 2 - 3), y + 3.5, z, 1.1, 4.2, depth);
    }
    for (let bay = -1; bay <= 1; bay++)
      block(structure, x + bay * (width / 4), y - 7.5, z, 2.5, 11, depth * 0.65);
  }

  const route = bridge(arrivalWalkwayPoints, 8.5);
  return {
    plaza: finish(plaza),
    structure: finish(structure),
    recess: finish(recess),
    support: finish(support),
    roof: finish(roof),
    routeDeck: route.deck,
    routeEdge: route.edge,
    routeSupport: route.support,
    routeCurve: route.curve,
  };
}

export const arrivalWalkwayPoints = [
  new Vector3(0, 2.4, 22),
  new Vector3(3, 3.5, 8),
  new Vector3(18, 8, -9),
  new Vector3(34, 14, -28),
  new Vector3(28, 18, -45),
  new Vector3(3, 18, -57),
  new Vector3(-25, 20, -70),
  new Vector3(-42, 24, -86),
  new Vector3(-36, 26, -105),
];
