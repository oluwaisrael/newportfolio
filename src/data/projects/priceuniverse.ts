import type { Project } from '../types';
export const priceuniverse: Project = {
 slug:'priceuniverse',number:'01',title:'PriceUniverse',category:'Backend / price intelligence',accent:'#bdca85',position:[-13,0,-5],
 summary:'Turning fragmented marketplace prices into a system you can explore.',question:'What does a price mean without its history?',stack:['FastAPI','React','React Three Fiber','PostgreSQL','Celery','Redis'],source:'https://github.com/oluwaisrael/Price-universe',status:'In development',pipeline:['Jumia / Jiji','Scrapers','Celery + Redis','PostgreSQL','FastAPI','React / R3F'],
 sections:[
 {title:'The problem',body:'A single product listing is a snapshot. PriceUniverse brings Nigerian marketplace data into one explorable product, connecting collection, storage and a spatial interface.'},
 {title:'Architecture',body:'The repository separates scrapers, background tasks, database access and API services. A FastAPI backend exposes product data to a React Three Fiber frontend. PostgreSQL stores the collected records; Celery and Redis support background work.'},
 {title:'An important decision',body:'Collection belongs outside the request path. Separating workers from the interface creates a useful boundary between slow marketplace responses and the visitor exploring existing data.'},
 {title:'Implementation and scope',body:'The README marks scraping, PostgreSQL storage, search, a 3D product universe and product detail panels as implemented. Historical charts, prediction, accounts, watchlists and deployment remain roadmap items there. GitHub Actions is described as planned.'},
 {title:'Failure modes / trade-offs',body:'Marketplace markup can change; requests can be blocked; a missing observation is not a price drop. The visual history in this portfolio is an explanatory simulation, not a live feed or evidence of production reliability.'},
 {title:'What the work makes clear',body:'A compelling interface depends on the less visible system beneath it: consistent records, task boundaries and a way to distinguish missing data from real changes.'}
 ]};
