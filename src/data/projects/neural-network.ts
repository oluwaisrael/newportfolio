import type { Project } from '../types';
export const neuralNetwork: Project = {
  slug: 'neural-network',
  number: '03',
  title: 'Neural Network From Scratch',
  category: 'Statistics / ML fundamentals',
  accent: '#7d9cce',
  position: [20, 0, -9],
  summary: 'Below the library: matrices, gradients, and handwritten digits.',
  question: 'What changes when you write the learning yourself?',
  stack: ['Python', 'NumPy', 'MNIST', 'Jupyter'],
  source: 'https://github.com/oluwaisrael/neural-network-from-scratch',
  status: 'Public source',
  pipeline: ['784 pixels', '10 hidden units', 'ReLU', '10 outputs', 'Softmax'],
  sections: [
    {
      title: 'The problem',
      body: 'High-level libraries make model training accessible. This project removes that abstraction to study how a fully connected classifier learns from handwritten digits.',
    },
    {
      title: 'Architecture',
      body: 'The documented network has 784 input values, a hidden layer of 10 units with ReLU, and 10 output units with softmax. The implementation uses NumPy rather than an automatic differentiation framework.',
    },
    {
      title: 'Implementation',
      body: 'Forward propagation, backpropagation, gradient descent and one-hot encoding are implemented explicitly. The dataset is Kaggle Digit Recognizer / MNIST and is intentionally excluded from the source repository.',
    },
    {
      title: 'An important decision',
      body: 'A small architecture keeps the chain from matrix multiplication to activation to loss readable. The purpose is understanding the calculation, not claiming a state-of-the-art digit recognizer.',
    },
    {
      title: 'Failure modes / trade-offs',
      body: 'Training accuracy is not held-out generalization. The repository lists mini-batches, Adam, additional hidden layers and a PyTorch implementation as future improvements; none are claimed here as completed.',
    },
    {
      title: 'What the work makes clear',
      body: 'The abstraction resolves into dimensions, derivatives and repeated updates. The portfolio network is a schematic activation sequence, not a live inference result from trained weights.',
    },
  ],
};
