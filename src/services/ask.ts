import type { ProjectSlug } from '../data/types';
export interface Answer {id:string;question:string;text:string;destination?:ProjectSlug;linkLabel?:string;}
/** Authored navigation content. A future remote provider must return this contract explicitly. */
export interface AskProvider { answers: readonly Answer[]; }
export const authoredGuide:AskProvider={answers:[
 {id:'statistics',question:'Why Statistics?',text:'Statistics gives me a language for patterns and uncertainty. Software makes that thinking useful: collecting observations, building models and giving people a way to act on the result.'},
 {id:'backend',question:'Show me your backend work.',text:'Start with PriceUniverse. Scrapers, background workers, PostgreSQL and FastAPI connect the collection of marketplace data to an explorable product.',destination:'priceuniverse',linkLabel:'Enter PriceUniverse'},
 {id:'unirag',question:'Explain UniRAG.',text:'UniRAG connects academic questions to source material. FAISS retrieves semantic matches, BM25 catches exact terms, and a cross-encoder re-ranks candidates before Gemini receives the context.',destination:'unirag',linkLabel:'Follow the retrieval'},
 {id:'learning',question:'What are you learning now?',text:'Going deeper into AI/ML systems: retrieval, evaluation, neural network fundamentals and the infrastructure around models. C#/.NET is also part of my backend learning direction.'},
 {id:'represents',question:'Which project best represents you?',text:'Together they show the direction. PriceUniverse connects infrastructure to an interface; the NumPy network shows my interest in what happens underneath an abstraction.',destination:'neural-network',linkLabel:'Look beneath the network'}
]};
