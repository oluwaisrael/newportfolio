import { useMemo, useState } from 'react';
import { describe, sampleDistribution } from './statistics';
export function StatisticalNoise() {
  const [count, setCount] = useState(60);
  const [spread, setSpread] = useState(12);
  const [seed, setSeed] = useState(29);
  const values = useMemo(() => sampleDistribution(count, spread, seed), [count, spread, seed]);
  const stats = describe(values);
  return (
    <article className="experiment">
      <div className="experiment-heading">
        <p className="eyebrow">01 / STATISTICAL NOISE</p>
        <h2>How much can a sample tell you?</h2>
        <p>
          The population mean is 50. Change the noise or sample size and inspect how precisely the
          sample estimates it.
        </p>
      </div>
      <svg
        className="experiment-chart"
        viewBox="0 0 680 240"
        role="img"
        aria-label={`Sample of ${count} observations. Mean ${stats.mean.toFixed(1)}. Standard error ${stats.se.toFixed(2)}.`}
      >
        <line x1="340" x2="340" y1="10" y2="200" stroke="#62768d" strokeDasharray="3 7" />
        {values.map((v, i) => (
          <circle
            key={i}
            cx={20 + Math.max(0, Math.min(100, v)) * 6.4}
            cy={30 + (i % 10) * 15}
            r="2.4"
            fill="#99adc7"
            opacity=".65"
          />
        ))}
        <line
          x1={20 + (stats.mean - stats.se * 1.96) * 6.4}
          x2={20 + (stats.mean + stats.se * 1.96) * 6.4}
          y1="202"
          y2="202"
          stroke="#c4d49c"
          strokeWidth="4"
        />
        <circle cx={20 + stats.mean * 6.4} cy="202" r="5" fill="#d4dfbc" />
        <text x="340" y="234" textAnchor="middle" fill="#a3aaa9" fontSize="10">
          POPULATION MEAN / 50
        </text>
      </svg>
      <div className="lab-controls">
        <label>
          Sample size <output>{count}</output>
          <input
            type="range"
            min="10"
            max="200"
            step="10"
            value={count}
            onChange={(e) => setCount(+e.target.value)}
          />
        </label>
        <label>
          Population spread <output>{spread}</output>
          <input
            type="range"
            min="2"
            max="25"
            value={spread}
            onChange={(e) => setSpread(+e.target.value)}
          />
        </label>
        <button className="outline-button" onClick={() => setSeed((s) => s + 1)}>
          Draw another sample ↻
        </button>
      </div>
      <p className="lab-result" aria-live="polite">
        Sample mean <strong>{stats.mean.toFixed(2)}</strong> · Standard error{' '}
        <strong>{stats.se.toFixed(2)}</strong> · Approximate 95% interval{' '}
        <strong>
          {(stats.mean - 1.96 * stats.se).toFixed(1)}–{(stats.mean + 1.96 * stats.se).toFixed(1)}
        </strong>
      </p>
      <p className="experiment-footnote">
        Independent normal samples; the interval uses a normal approximation. A single interval
        either covers the mean or it does not. Its 95% describes repeated sampling.
      </p>
    </article>
  );
}
