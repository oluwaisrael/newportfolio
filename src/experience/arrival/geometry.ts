import {
  BufferGeometry,
  BoxGeometry,
  CylinderGeometry,
  ExtrudeGeometry,
  Float32BufferAttribute,
  Shape,
  TubeGeometry,
  CatmullRomCurve3,
  Vector3,
} from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

type Batch = BufferGeometry[];
function add(batch: Batch, geometry: BufferGeometry, x: number, y: number, z: number) {
  geometry.translate(x, y, z);
  batch.push(geometry);
}
function box(
  batch: Batch,
  x: number,
  y: number,
  z: number,
  w: number,
  h: number,
  d: number,
  rotation = 0,
) {
  const shape = new Shape();
  shape.moveTo(-w / 2, 0);
  shape.lineTo(w / 2, 0);
  shape.lineTo(w * 0.43, h * 0.88);
  shape.lineTo(w * 0.32, h);
  shape.lineTo(-w * 0.32, h);
  shape.lineTo(-w * 0.43, h * 0.88);
  shape.closePath();
  const g = new ExtrudeGeometry(shape, {
    depth: d,
    bevelEnabled: true,
    bevelSize: Math.min(0.3, w * 0.05),
    bevelThickness: 0.24,
    bevelSegments: 1,
    curveSegments: 1,
  });
  g.rotateY(rotation);
  add(batch, g, x, y, z - d / 2);
}
function finish(b: Batch) {
  if (!b.length) return new BufferGeometry();
  const flat = b.map((g) => (g.index ? g.toNonIndexed() : g)),
    merged = mergeGeometries(flat, false);
  new Set([...b, ...flat]).forEach((g) => g.dispose());
  return merged;
}
function random(seed: number) {
  return () => {
    seed = (seed * 1664525 + 1013904223) >>> 0;
    return seed / 4294967296;
  };
}
function ribbon(points: Vector3[], width: number, yLift: number) {
  const curve = new CatmullRomCurve3(points);
  const count = 220,
    positions: number[] = [],
    indices: number[] = [];
  const centerline: Vector3[] = [];
  for (let i = 0; i <= count; i++) {
    const t = i / count,
      p = curve.getPointAt(t),
      tangent = curve.getTangentAt(t).setY(0).normalize();
    const side = new Vector3(-tangent.z, 0, tangent.x);
    p.y += yLift;
    centerline.push(p.clone());
    const taper = Math.min(1, 0.45 + t * 5, 0.35 + (1 - t) * 5),
      half = width * 0.5 * taper;
    positions.push(
      p.x + side.x * half,
      p.y,
      p.z + side.z * half,
      p.x - side.x * half,
      p.y,
      p.z - side.z * half,
    );
    if (i < count) {
      const n = i * 2;
      indices.push(n, n + 2, n + 1, n + 1, n + 2, n + 3);
    }
  }
  const g = new BufferGeometry();
  g.setAttribute('position', new Float32BufferAttribute(positions, 3));
  g.setIndex(indices);
  g.computeVertexNormals();
  const railBatch: BufferGeometry[] = [];
  for (const side of [-1, 1]) {
    const railPoints = centerline.map((p, i) => {
      const tangent = curve
        .getTangentAt(i / count)
        .setY(0)
        .normalize();
      return p
        .add(new Vector3(-tangent.z, 0, tangent.x).multiplyScalar(width * 0.49 * side))
        .add(new Vector3(0, 0.055, 0));
    });
    railBatch.push(new TubeGeometry(new CatmullRomCurve3(railPoints), 180, 0.045, 5, false));
  }
  return { road: g, rails: finish(railBatch) };
}
export function createArchitecture() {
  const stone: Batch = [new BoxGeometry(480, 1.4, 260)],
    metal: Batch = [],
    trim: Batch = [],
    gold: Batch = [],
    blue: Batch = [],
    green: Batch = [],
    amber: Batch = [],
    distance: Batch = [],
    water: Batch = [],
    lamps: Batch = [];
  const rng = random(9271);
  stone[0].translate(0, -1.45, -32);
  add(stone, new BoxGeometry(15, 1.2, 10), -4, 1.8, 52);
  // The core rises far above the horizontal skyline. Its faceted spire remains visible above the fog.
  add(stone, new CylinderGeometry(1.2, 9, 162, 11, 12, false), 0, 80, -82);
  add(metal, new CylinderGeometry(1.8, 5.5, 128, 9, 8, false), -17, 59, -78);
  add(metal, new CylinderGeometry(1.3, 5.8, 136, 9, 9, false), 17, 63, -84);
  for (const [x, z, h, r] of [
    [-33, -81, 99, 8],
    [33, -87, 98, 8],
    [-48, -91, 68, 6],
    [48, -77, 78, 6],
  ] as const) {
    add(stone, new CylinderGeometry(1, r, h, 7, 7, false), x, h / 2, z);
    for (let y = 11; y < h - 10; y += 7.5)
      box(trim, x, y, z + r * 0.79, r * 0.82, 0.11, 0.16, 0.12);
  }
  // Thin inset ribs and thousands of small facade apertures share two merged materials.
  for (const [x, z, h, r] of [
    [0, -82, 162, 5.8],
    [-17, -78, 128, 5],
    [17, -84, 136, 5.2],
  ] as const) {
    for (let y = 8; y < h - 5; y += 4.1) {
      for (const angle of [-0.8, -0.45, 0, 0.45, 0.8]) {
        const px = x + Math.sin(angle) * r,
          pz = z + Math.cos(angle) * r;
        box(y % 12 < 4 ? gold : metal, px, y, pz, 0.31, 0.9, 0.14, angle);
      }
    }
    for (const side of [-1, 1])
      box(trim, x + side * r * 0.7, h * 0.49, z + r * 0.57, 0.22, h * 0.94, 0.25, side * 0.14);
  }
  // Jagged mesas and architectural districts. Faceted towers vary in height, width and lean.
  const clusters = [
    { cx: -63, cz: -54, color: blue, base: 9, count: 34, spread: 54 },
    { cx: -111, cz: -9, color: gold, base: 3, count: 42, spread: 67 },
    { cx: 105, cz: -59, color: green, base: 13, count: 38, spread: 60 },
    { cx: 132, cz: 9, color: amber, base: 4, count: 40, spread: 68 },
    { cx: 210, cz: -38, color: distance, base: 6, count: 42, spread: 90 },
  ];
  for (let c = 0; c < clusters.length; c++) {
    const cluster = clusters[c],
      platformY = cluster.base;
    const mesa = new CylinderGeometry(1, 1, 3, 7, 1, false);
    mesa.scale(cluster.spread * 0.85, 1, cluster.spread * 0.52);
    add(stone, mesa, cluster.cx, platformY - 1.8, cluster.cz);
    const edge = new CylinderGeometry(1, 1, 1, 7, 1, false);
    edge.scale(cluster.spread * 0.89, 0.4, cluster.spread * 0.56);
    add(trim, edge, cluster.cx, platformY - 0.2, cluster.cz);
    for (let i = 0; i < cluster.count; i++) {
      const a = rng() * Math.PI * 2,
        radius = Math.sqrt(rng()) * cluster.spread * 0.77;
      const x = cluster.cx + Math.cos(a) * radius,
        z = cluster.cz + Math.sin(a) * radius * 0.57;
      const h = 8 + rng() ** 1.35 * (c === 1 ? 76 : 59),
        w = 2.5 + rng() * 6,
        sides = 5 + Math.floor(rng() * 5);
      const tower = new CylinderGeometry(
        w * (0.58 + rng() * 0.38),
        w,
        h,
        sides,
        Math.max(1, Math.floor(h / 22)),
        false,
      );
      tower.rotateY(rng() * Math.PI);
      tower.scale(0.72 + rng() * 0.63, 1, 0.72 + rng() * 0.63);
      add(i % 4 === 0 ? cluster.color : stone, tower, x, platformY + h * 0.5, z);
      if (i % 2 === 0) {
        for (let fy = platformY + 5; fy < platformY + h - 3; fy += Math.max(4.5, h / 9)) {
          const angle = rng() * Math.PI * 2,
            fx = x + Math.cos(angle) * w * 0.86,
            fz = z + Math.sin(angle) * w * 0.86;
          box(
            i % 4 === 0 ? cluster.color : metal,
            fx,
            fy,
            fz,
            0.12,
            0.65 + rng() * 0.5,
            0.12,
            angle,
          );
        }
      }
      if (h > 38 && i % 4 === 0)
        add(
          trim,
          new CylinderGeometry(0.1, 0.4, h * 0.2, 4),
          x + w * 0.45,
          platformY + h + h * 0.1,
          z,
        );
    }
    // Thin vertical falls read as waterfalls beneath the raised city shelves.
    for (let i = 0; i < 4; i++) {
      const x = cluster.cx + (rng() - 0.5) * cluster.spread * 1.2,
        z = cluster.cz + (rng() - 0.5) * cluster.spread * 0.72;
      const drop = platformY + 8 + rng() * 14;
      add(water, new CylinderGeometry(0.08, 0.24, drop, 5), x, drop * 0.5, z);
    }
  }
  // Pin lights and illuminated crown bands remain a single small draw-call batch.
  for (const [x, z, y] of [
    [0, -82, 98],
    [-17, -78, 80],
    [17, -84, 85],
    [-112, -54, 22],
    [105, -59, 27],
    [-158, -6, 14],
    [132, 9, 15],
  ] as const) {
    for (let i = 0; i < 5; i++)
      box(lamps, x + (i - 2) * 0.48, y + (i % 2) * 0.45, z + 7, 0.11, 0.55, 0.08);
  }
  // The far city is a broken silhouette across the horizon, not one repeated cube grid.
  for (let i = 0; i < 120; i++) {
    const x = (rng() - 0.5) * 560,
      z = -143 - rng() * 105,
      h = 14 + rng() ** 2 * 74,
      w = 3 + rng() * 11;
    const sides = 5 + Math.floor(rng() * 5),
      g = new CylinderGeometry(0.15 + rng() * 2, w, h, sides, 3, false);
    g.rotateY(rng() * Math.PI);
    add(i % 9 === 0 ? trim : distance, g, x, h * 0.5, z);
  }
  // Foreground black-stone ledges and broken flanks give the camera a real horizon.
  for (let i = 0; i < 32; i++) {
    const side = i % 2 ? 1 : -1,
      z = 46 - rng() * 30,
      x = side * (25 + rng() * 28),
      h = 2.5 + rng() * 8,
      w = 8 + rng() * 12;
    box(stone, x, h * 0.5, z, w, h, 9 + rng() * 25, (rng() - 0.5) * 0.28);
    if (i % 3 === 0) box(gold, x, h * 0.7, z + 8, 0.09, 0.11, 18 + rng() * 12, (rng() - 0.5) * 0.2);
  }
  // Low amber markers trace the same rising path that the visitor follows.
  const route = ribbon(
    [
      new Vector3(8, 29, -108),
      new Vector3(-16, 23, -96),
      new Vector3(-53, 18, -83),
      new Vector3(-96, 12, -64),
      new Vector3(-101, 15, -43),
      new Vector3(-75, 20, -28),
      new Vector3(-28, 16, -20),
      new Vector3(27, 13, -14),
      new Vector3(62, 11, 2),
      new Vector3(53, 12, 20),
      new Vector3(10, 7, 35),
      new Vector3(-8, 5, 47),
      new Vector3(-4, 3, 52),
    ],
    4.8,
    0.28,
  );
  for (let z = -92; z < 64; z += 3.8) {
    // The long floor is held with a few inset expansion joints, in one batched geometry.
    box(metal, 0, 0.03, z, 110, 0.02, 0.05);
  }
  // Under-mesa ravines and narrow light catchers.
  for (const side of [-1, 1])
    for (let i = 0; i < 9; i++) {
      const x = side * (52 + i * 16),
        z = -83 + (i % 4) * 31,
        h = 12 + (i % 5) * 3;
      box(trim, x, h * 0.5, z, 0.06, h, 0.12, side * 0.08);
    }
  return {
    stone: finish(stone),
    metal: finish(metal),
    trim: finish(trim),
    gold: finish(gold),
    lamps: finish(lamps),
    blue: finish(blue),
    green: finish(green),
    amber: finish(amber),
    distance: finish(distance),
    water: finish(water),
    road: route.road,
    rails: route.rails,
  };
}
