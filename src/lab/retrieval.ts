export const documents = [
  {
    id: 'A',
    title: 'Sampling',
    text: 'A sample estimates population characteristics. Larger independent samples reduce uncertainty.',
    tags: ['statistics', 'uncertainty', 'sample', 'data'],
  },
  {
    id: 'B',
    title: 'Queues',
    text: 'Background workers consume queued jobs. Retry policy and idempotency shape failure behavior.',
    tags: ['backend', 'worker', 'queue', 'reliability'],
  },
  {
    id: 'C',
    title: 'Retrieval',
    text: 'Lexical search matches exact terms. Vector search retrieves semantically related context.',
    tags: ['retrieval', 'search', 'meaning', 'context'],
  },
  {
    id: 'D',
    title: 'Gradients',
    text: 'Backpropagation computes gradients of loss. Gradient descent updates network weights.',
    tags: ['learning', 'network', 'gradient', 'training'],
  },
  {
    id: 'E',
    title: 'Local models',
    text: 'Local inference runs on the device. Model size competes with memory and available compute.',
    tags: ['local', 'privacy', 'model', 'device'],
  },
];
const families = [
  ['statistics', 'uncertainty', 'sample', 'population', 'estimates'],
  ['backend', 'worker', 'queue', 'jobs', 'reliability'],
  ['retrieval', 'search', 'meaning', 'context', 'find'],
  ['learning', 'network', 'gradient', 'training', 'learn'],
  ['local', 'privacy', 'model', 'device', 'offline'],
];
const tokens = (value: string): string[] => value.toLowerCase().match(/[a-z]+/g) ?? [];
export function retrieve(query: string, semanticWeight: number) {
  const q = tokens(query);
  return documents
    .map((doc) => {
      const words = tokens(doc.text + ' ' + doc.title);
      const lexical = q.reduce((sum, term) => {
        const tf = words.filter((w) => w === term).length;
        const df = documents.filter((d) => tokens(d.text + ' ' + d.title).includes(term)).length;
        return (
          sum + (Math.log(1 + (documents.length - df + 0.5) / (df + 0.5)) * (tf * 2.2)) / (tf + 1.2)
        );
      }, 0);
      const semantic = q.length
        ? families.reduce(
            (sum, f) =>
              sum + (q.some((t) => f.includes(t)) && doc.tags.some((t) => f.includes(t)) ? 1 : 0),
            0,
          )
        : 0;
      return {
        ...doc,
        lexical,
        semantic,
        score: lexical * (1 - semanticWeight) + semantic * semanticWeight * 2,
      };
    })
    .sort((a, b) => b.score - a.score);
}
