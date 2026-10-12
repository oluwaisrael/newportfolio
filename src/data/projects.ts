import { priceuniverse } from './projects/priceuniverse';
import { unirag } from './projects/unirag';
import { neuralNetwork } from './projects/neural-network';
import { roam } from './projects/roam';
import { lael } from './projects/lael';
export const projects = [priceuniverse, unirag, neuralNetwork, roam, lael];
export const findProject = (slug: string | undefined) =>
  projects.find((project) => project.slug === slug);
