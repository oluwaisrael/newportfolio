import { StatisticalNoise } from '../lab/StatisticalNoise';
import { RagTrace } from '../lab/RagTrace';
import { NetworkLab } from '../lab/NetworkLab';
export default function Lab() {
  return (
    <section className="lab-page">
      <header className="page-intro">
        <p className="eyebrow">LAB / WORKING NOTES</p>
        <h1>
          Understanding
          <br />
          <em>through interaction.</em>
        </h1>
        <p>
          Small, inspectable experiments.
          <br />
          Change an input. See what follows.
        </p>
      </header>
      <div id="experiments">
        <StatisticalNoise />
        <RagTrace />
        <NetworkLab />
      </div>
      <p className="lab-note mono">ILLUSTRATIVE MODELS / NO LIVE PROJECT DATA</p>
    </section>
  );
}
