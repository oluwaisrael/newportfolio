import type { Project } from '../types';
export const lael: Project = {
  slug: 'lael',
  number: '05',
  title: 'Lael',
  category: 'Creative technology / local intelligence',
  accent: '#b8b9ad',
  position: [-23, 0, -29],
  summary: 'Intelligence with the presence of almost nothing.',
  question: 'What if a useful system asked for less of your attention?',
  stack: ['Tauri', 'React', 'TypeScript', 'Rust', 'SQLite', 'Whisper', 'Ollama'],
  status: 'Personal experiment / building',
  pipeline: ['Speech', 'Whisper', 'Local context', 'Ollama', 'Native presence'],
  sections: [
    {
      title: 'The direction',
      body: 'Lael is a native desktop assistant experiment around speech, memory and local models. Its ambition is a quiet system-level presence, rather than another conversation window competing for attention.',
    },
    {
      title: 'Architecture direction',
      body: 'The supplied project brief describes Tauri, a React and TypeScript interface, Rust, SQLite, Whisper and Ollama. These tools connect native application boundaries, local persistence, speech recognition and model execution.',
    },
    {
      title: 'An important decision',
      body: 'Local operation changes the design question. The interface must account for model availability, device resources and the distinction between listening, processing and remaining idle.',
    },
    {
      title: 'Scope',
      body: 'The earlier portfolio identifies Lael as building. No public implementation repository was available during this rebuild, so this page describes the stated direction without claiming completed integrations or a production release.',
    },
    {
      title: 'Failure modes / trade-offs',
      body: 'Local models compete with other applications for memory and compute. Speech recognition can misunderstand intent. A calm interface still needs unmistakable consent, recording state and a way to stop an action.',
    },
    {
      title: 'The ongoing question',
      body: 'How much interface does intelligence need? The sparse installation in this world is a study of that question, not a demonstration of a running assistant.',
    },
  ],
};
