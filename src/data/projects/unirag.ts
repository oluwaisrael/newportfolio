import type { Project } from '../types';
export const unirag: Project = {
  slug: 'unirag',
  number: '02',
  title: 'UniRAG',
  category: 'AI / grounded retrieval',
  accent: '#d9ae75',
  position: [4, 0, -22],
  summary: 'Answers that leave a trail back to the material.',
  question: 'Can an answer show where its understanding came from?',
  stack: ['Python', 'Streamlit', 'FAISS', 'BM25', 'Sentence Transformers', 'Gemini', 'Docker'],
  source: 'https://github.com/oluwaisrael/rag-course-app',
  status: 'Public source',
  pipeline: [
    'Documents',
    'Layout-aware chunks',
    'FAISS + BM25',
    'Cross-encoder',
    'Gemini',
    'Cited response',
  ],
  sections: [
    {
      title: 'The problem',
      body: 'Academic material contains both concepts and exact terms. A useful course assistant needs to find meaning while still respecting course codes, notation and the structure of the source.',
    },
    {
      title: 'Architecture',
      body: 'Layout-aware ingestion preserves hierarchy and nearby context. Sentence Transformer embeddings feed a FAISS index; BM25 provides a second, lexical index. Candidate chunks are merged and scored by a cross-encoder before Gemini receives the context.',
    },
    {
      title: 'An important decision',
      body: 'Hybrid retrieval gives exact terminology and semantic similarity separate paths into the candidate set. Re-ranking is another explicit stage instead of assuming the first retrieved chunks are the best evidence.',
    },
    {
      title: 'Implementation',
      body: 'The public repository documents Python and Streamlit, the Google GenAI SDK, and a multi-stage Docker build designed for ARM64 / Apple Silicon CPU execution.',
    },
    {
      title: 'Failure modes / trade-offs',
      body: 'A citation makes an answer inspectable; it does not automatically make it true. Chunk boundaries can remove context, retrieval can miss relevant passages, and re-ranking adds latency. Evaluation needs to separate retrieval quality from generation quality.',
    },
    {
      title: 'What the work makes clear',
      body: 'Retrieval is a sequence of choices. Preserving the path from document to chunk to response makes those choices easier to inspect and improve.',
    },
  ],
};
