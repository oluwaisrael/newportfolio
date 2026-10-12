export type ProjectSlug = 'priceuniverse' | 'unirag' | 'neural-network' | 'roam' | 'lael';
export type Vec3 = [number, number, number];
export interface CaseSection { title: string; body: string; }
export interface Project { slug: ProjectSlug; number: string; title: string; category: string; summary: string; question: string; stack: string[]; accent: string; position: Vec3; source?: string; status: string; sections: CaseSection[]; pipeline: string[]; }
