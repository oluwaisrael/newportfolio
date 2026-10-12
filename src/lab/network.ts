export const weights = [
  [0.8, -0.4, 0.2, 0.9],
  [-0.2, 0.7, 0.9, -0.5],
  [0.6, 0.2, -0.8, 0.3],
];
export function forward(input: number[]) {
  const hidden = weights.map((row) =>
    Math.max(0, row.reduce((s, w, i) => s + w * (input[i] ?? 0), 0) - 0.3),
  );
  const logits = [
    hidden[0] * 0.8 - hidden[1] * 0.5 + hidden[2] * 0.4,
    hidden[1] * 0.9 - hidden[0] * 0.2 - hidden[2] * 0.3,
  ];
  const max = Math.max(...logits);
  const exps = logits.map((x) => Math.exp(x - max));
  const sum = exps.reduce((a, b) => a + b, 0);
  return { hidden, probabilities: exps.map((x) => x / sum) };
}
