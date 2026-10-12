import { useState } from 'react';
import { forward, weights } from './network';
export function NetworkLab() {
  const [input, setInput] = useState([1, 0, 0, 1]);
  const result = forward(input);
  return (
    <article className="experiment">
      <div className="experiment-heading">
        <p className="eyebrow">03 / NETWORK FROM SCRATCH</p>
        <h2>Nothing hidden in the hidden layer.</h2>
        <p>
          Toggle four inputs. The network computes weighted sums, ReLU activations and a softmax
          output in your browser.
        </p>
      </div>
      <div className="network-lab">
        <div>
          <p className="eyebrow">INPUT / 2 × 2</p>
          <div className="pixel-input">
            {input.map((value, i) => (
              <button
                key={i}
                aria-label={`Input pixel ${i + 1}`}
                aria-pressed={value === 1}
                onClick={() => setInput((v) => v.map((x, j) => (i === j ? 1 - x : x)))}
              >
                {value}
              </button>
            ))}
          </div>
        </div>
        <div>
          <p className="eyebrow">HIDDEN / RELU</p>
          {result.hidden.map((v, i) => (
            <div className="neuron-value" key={i}>
              <span>h{i + 1}</span>
              <meter min="0" max="2" value={v} />
              <output>{v.toFixed(2)}</output>
            </div>
          ))}
        </div>
        <div>
          <p className="eyebrow">OUTPUT / SOFTMAX</p>
          {result.probabilities.map((p, i) => (
            <div className="neuron-value" key={i}>
              <span>{i === 0 ? 'A' : 'B'}</span>
              <meter min="0" max="1" value={p} />
              <output>{(p * 100).toFixed(1)}%</output>
            </div>
          ))}
        </div>
      </div>
      <details className="network-equations">
        <summary>Inspect the actual weights</summary>
        <pre>
          {weights.map((row, i) => `h${i + 1} = ReLU([${row.join(', ')}] · x − 0.3)`).join('\n')}
        </pre>
        <p>
          Output logits: A = 0.8h₁ − 0.5h₂ + 0.4h₃; B = −0.2h₁ + 0.9h₂ − 0.3h₃. Softmax normalizes
          their exponentials.
        </p>
      </details>
      <p className="experiment-footnote">
        Fixed illustrative weights, not a trained classifier. Classes A and B have no real-world
        meaning. The MNIST project uses 784 inputs; this small model keeps every operation visible.
      </p>
    </article>
  );
}
