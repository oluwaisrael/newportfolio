import type { Project } from '../types';
export const roam: Project = {
  slug: 'roam',
  number: '04',
  title: 'Roam',
  category: 'Software / decision systems',
  accent: '#ac9dbb',
  position: [-1, 0, 14],
  summary: 'A place to go. A reason to choose it.',
  question: 'How do you make a recommendation honest about its trade-offs?',
  stack: ['FastAPI', 'React', 'OpenStreetMap', 'Python', 'TypeScript'],
  source: 'https://github.com/oluwaisrael/roam',
  status: 'In development',
  pipeline: [
    'Natural language',
    'Structured constraints',
    'Place providers',
    'Deterministic ranking',
    'Reasons + caveats',
  ],
  sections: [
    {
      title: 'The problem',
      body: '“Somewhere quiet with Wi-Fi, nearby, within budget” is a decision with competing constraints. Roam translates that intent into place candidates, rankings and reasons.',
    },
    {
      title: 'Architecture',
      body: 'A FastAPI backend fetches OpenStreetMap places through Overpass, with Nominatim as a second live source. A rules parser or optional language-model provider converts the request into structured intent. Ranking and recommendation evidence remain deterministic.',
    },
    {
      title: 'An important decision',
      body: 'Language understanding is separate from recommendation scoring. The React interface exposes interpreted constraints and what-if recalculation, so a visitor can see what changes when a preference changes.',
    },
    {
      title: 'Implementation',
      body: 'The repository includes browser geolocation, provider attribution, optional review enrichment and an explicit demo-data setting. When demo data is disabled, provider failure returns an unavailable state rather than quietly substituting invented places.',
    },
    {
      title: 'Failure modes / trade-offs',
      body: 'OpenStreetMap often lacks Wi-Fi quality, noise, price and power information. Roam uses conservative category heuristics and marks limited details. A useful ranking still needs honest uncertainty about the underlying attributes.',
    },
    {
      title: 'What the work makes clear',
      body: 'The strongest recommendation is not necessarily the most confident one. Showing evidence, missing details and alternative choices gives the visitor more control.',
    },
  ],
};
