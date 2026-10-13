import { BoxGeometry, CylinderGeometry, ExtrudeGeometry, Shape, type BufferGeometry } from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

type Batch = BufferGeometry[];
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
  const g = new BoxGeometry(w, h, d);
  g.rotateY(rotation);
  g.translate(x, y, z);
  batch.push(g);
}
function pier(batch: Batch, x: number, y: number, z: number, w: number, h: number, d: number) {
  const shape = new Shape();
  shape.moveTo(-w / 2, 0);
  shape.lineTo(w / 2, 0);
  shape.lineTo(w * 0.34, h * 0.94);
  shape.quadraticCurveTo(0, h * 1.035, -w * 0.34, h * 0.94);
  shape.closePath();
  const g = new ExtrudeGeometry(shape, {
    depth: d,
    bevelEnabled: true,
    bevelSize: 0.45,
    bevelThickness: 0.45,
    bevelSegments: 2,
    steps: 1,
    curveSegments: 5,
  });
  g.translate(x, y, z - d / 2);
  batch.push(g);
}
function combine(batch: Batch) {
  const plain = batch.map((g) => {
    const p = g.index ? g.toNonIndexed() : g;
    return p;
  });
  const result = mergeGeometries(plain, false);
  new Set([...batch, ...plain]).forEach((g) => g.dispose());
  return result;
}
export function createArchitecture() {
  const stone: Batch = [],
    metal: Batch = [],
    trim: Batch = [],
    lamps: Batch = [],
    distance: Batch = [];
  // A sculpted spine, recessed machinery and four unequal buttresses.
  pier(stone, 0, 0, -57, 11, 96, 16);
  for (const side of [-1, 1]) {
    const g = new CylinderGeometry(1, 1.08, 85, 24);
    g.scale(5, 1, 9.5);
    g.translate(side * 14, 42.5, -61);
    stone.push(g);
    // Raised edges and recessed panels articulate the rounded wing towers.
    for (const offset of [-2.7, 2.7]) box(trim, side * 14 + offset, 41, -51.7, 0.16, 81, 0.2);
    for (let j = 0; j < 35; j++) {
      box(metal, side * 14, 5 + j * 2.15, -51.35, 3.6, 0.09, 0.15);
      box(trim, side * 14, 5 + j * 2.15, -51.38, 3.6, 0.055, 0.3);
    }
    box(stone, side * 16.8, 81, -60, 2, 11, 7);
    box(stone, side * 11.2, 80, -60, 2, 9, 7);
  }
  pier(stone, -23, 0, -64, 8, 66, 18);
  pier(stone, 23, 0, -64, 8, 66, 18);
  pier(metal, -7, 0, -53, 4, 76, 9);
  pier(metal, 7, 0, -53, 4, 78, 9);
  box(stone, 0, 24, -64, 48, 48, 14);
  // Closely spaced curved louvers give the front its recognizable vertical rhythm.
  for (let i = 0; i < 60; i++) {
    const y = 3 + i * 1.38;
    const g = new CylinderGeometry(4.6, 4.7, 0.26, 24, 1, true, -Math.PI / 2, Math.PI);
    g.translate(0, y, -48.6);
    metal.push(g);
    for (const side of [-1, 1]) {
      box(trim, side * 8.2, y, -48.2, 1.2, 0.15, 2.8);
      if (i < 49) box(metal, side * 18.8, y, -57, 0.5, 0.22, 15);
    }
  }
  for (const side of [-1, 1]) {
    box(trim, side * 5.15, 44, -47.9, 0.18, 87, 0.3);
    box(trim, side * 10, 41, -51, 0.3, 81, 0.35);
    for (let i = 0; i < 12; i++) {
      box(metal, side * 24.4, 5 + i * 4.9, -57.2, 3.1, 1.8, 4.6);
      box(trim, side * 24.6, 5.5 + i * 4.9, -54.8, 3.4, 0.14, 0.2);
    }
    // Portal recesses and warm architectural slit lights.
    box(metal, side * 10, 10, -48.1, 5, 5.2, 0.8);
    for (const offset of [-0.75, 0.75]) box(lamps, side * 10 + offset, 11, -46.3, 0.64, 3.5, 0.15);
    box(lamps, side * 10, 1.7, -45.9, 0.35, 1.6, 0.1);
    box(stone, side * 5, 3.2, -45, 3, 6.4, 4);
  }
  // Broaden the central mass while keeping the approach at human scale.
  for (const batch of [stone, metal, trim, lamps]) for (const g of batch) g.scale(1.3, 1.16, 1);
  for (const side of [-1, 1]) {
    // Viaducts flank the visitor; the eye is below their decks.
    box(stone, side * 29, 7.5, 2, 16, 3.8, 106);
    box(stone, side * 21.05, 8.2, 2, 0.22, 5.2, 106);
    box(trim, side * 20.82, 10.9, 2, 0.16, 0.15, 106);
    for (let i = 0; i < 15; i++) {
      pier(stone, side * 27, 0, 50 - i * 7, 3.2, 6.2, 3.5);
      for (let j = 0; j < 7; j++) box(metal, side * 20.87, 8.1, 50 - i * 7 - j, 0.12, 5.4, 0.035);
      box(trim, side * 20.84, 9.6, 49 - i * 7, 0.14, 1.7, 0.12);
    }
    // Tall signal pylons, not a repeated skyline of cubes.
    pier(stone, side * 51, 7, -22, 1.4, side < 0 ? 74 : 54, 1.8);
    box(trim, side * 51, 30, -21, 2, 0.5, 2.3);
    box(metal, side * 35, 19, -90, 21, 2, 6);
    for (let i = 0; i < 7; i++) {
      const x = side * (42 + i * 17),
        z = -105 - (i % 3) * 38;
      const h = 28 + ((i * 17 + (side + 1) * 8) % 45);
      pier(distance, x, 0, z, 10 + (i % 3) * 3, h, 13);
      box(distance, x + 2, h + 5, z, 0.2, 13, 0.2);
      for (let j = 0; j < 8; j++) box(distance, x, h - j * 2.3, z + 7, 12 + (i % 3) * 3, 0.22, 0.6);
    }
  }
  // Paving expansion joints and raised verges establish a human scale.
  for (let i = 0; i < 30; i++) {
    const z = 65 - i * 4.8;
    box(metal, 0, 0.018, z, 42, 0.018, 0.045);
    for (let j = -3; j <= 3; j++) box(metal, j * 6 + (i % 2) * 3, 0.02, z - 2.4, 0.045, 0.018, 4.8);
  }
  for (const side of [-1, 1]) {
    box(stone, side * 18.3, 0.18, 9, 1.3, 0.36, 104);
    box(trim, side * 17.5, 0.03, 9, 0.06, 0.06, 104);
    for (let i = 0; i < 12; i++) box(metal, side * 17, 0.02, 53 - i * 8, 0.45, 0.04, 2.2);
  }
  return {
    stone: combine(stone),
    metal: combine(metal),
    trim: combine(trim),
    lamps: combine(lamps),
    distance: combine(distance),
  };
}
