import type { ProjectSlug } from '../data/types';
export interface Answer {
  id: string;
  question: string;
  text: string;
  destination?: ProjectSlug;
  linkLabel?: string;
}
/** Authored navigation content. A future remote provider must return this contract explicitly. */
export interface AskProvider {
  answers: readonly Answer[];
}
export const authoredGuide: AskProvider = {
  answers: [
    {
      id: 'statistics',
      question: 'Why Statistics?',
      text: 'Statistics gives me a language for patterns and uncertainty. Software makes that thinking useful: collecting observations, building models and giving people a way to act on the result.',
    },
    {
      id: 'backend',
      question: 'Show me your backend work.',
      text: 'The Backend Systems collection examines independent services: asynchronous notifications and real-time chat boundaries.',
      destination: 'backend-systems',
      linkLabel: 'Explore backend systems',
    },
    {
      id: 'lael',
      question: 'What is Lael?',
      text: 'Lael is a private local desktop AI application joining Tauri, React, Rust, SQLite, local Ollama generation and Whisper speech recognition.',
      destination: 'lael-ai',
      linkLabel: 'Explore Lael',
    },
    {
      id: 'learning',
      question: 'What are you learning now?',
      text: 'Going deeper into AI/ML systems: retrieval, evaluation, neural network fundamentals and the infrastructure around models. C#/.NET is also part of my backend learning direction.',
    },
    {
      id: 'represents',
      question: 'Which project best represents you?',
      text: 'Lael brings interface and local intelligence together; the public C# API shows a clear, inspectable backend boundary.',
      destination: 'aiico-product-api',
      linkLabel: 'Read the API study',
    },
  ],
};
