import { describe as suite, expect, it } from 'vitest';
import { describe, sampleDistribution } from '../src/lab/statistics';
import { forward } from '../src/lab/network';
import { retrieve } from '../src/lab/retrieval';
import { projects } from '../src/data/projects';
import { random } from '../src/utils/random';
suite('statistical model',()=>{
 it('computes sample variance and standard error',()=>{const result=describe([1,2,3,4,5]);expect(result.mean).toBe(3);expect(result.sd).toBeCloseTo(Math.sqrt(2.5));expect(result.se).toBeCloseTo(Math.sqrt(.5));});
 it('provides reproducible, finite samples',()=>{expect(sampleDistribution(100,12,42)).toEqual(sampleDistribution(100,12,42));expect(sampleDistribution(200,25,1).every(Number.isFinite)).toBe(true);});
 it('handles an empty input',()=>expect(describe([])).toEqual({mean:0,sd:0,se:0}));
});
suite('transparent neural forward pass',()=>{
 it('normalizes probabilities for every binary input',()=>{for(let n=0;n<16;n++){const output=forward([0,1,2,3].map(i=>(n>>i)&1));expect(output.probabilities.reduce((a,b)=>a+b,0)).toBeCloseTo(1);expect(output.hidden.every(x=>x>=0)).toBe(true);}});
 it('exposes a known weighted sum',()=>expect(forward([1,0,0,1]).hidden[0]).toBeCloseTo(1.4));
});
suite('retrieval honesty',()=>{
 it('retrieves exact terminology',()=>expect(retrieve('backpropagation',0)[0].id).toBe('D'));
 it('finds authored related concepts',()=>expect(retrieve('offline',1)[0].id).toBe('E'));
 it('returns no evidence for unknown or empty queries',()=>{expect(retrieve('zzzz',.5).every(x=>x.score===0)).toBe(true);expect(retrieve('',.5).every(x=>x.score===0)).toBe(true);});
});
suite('world content',()=>{
 it('keeps every destination unique and reachable',()=>{expect(new Set(projects.map(p=>p.slug)).size).toBe(5);expect(projects.every(p=>p.sections.length>=5&&p.position.every(Number.isFinite))).toBe(true);});
 it('generates stable bounded random values',()=>{const rng=random(3);for(let i=0;i<1000;i++){const v=rng();expect(v).toBeGreaterThanOrEqual(0);expect(v).toBeLessThan(1);}});
});
