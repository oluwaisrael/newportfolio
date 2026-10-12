import { FieldNotes } from '../components/FieldNotes';
import { Link } from 'react-router-dom';
export default function About() {
  return (
    <article className="about-page">
      <header className="page-intro">
        <p className="eyebrow">THE PERSON / ADEOTI ISRAEL</p>
        <h1>
          Not a biography.
          <br />
          <em>A direction of travel.</em>
        </h1>
      </header>
      <div className="about-editorial">
        <figure className="portrait-installation">
          <picture>
            <source
              srcSet="/images/derin-portrait-608.webp 608w, /images/derin-portrait-400.webp 400w"
              sizes="(max-width: 768px) 90vw, 40vw"
            />
            <img
              src="/images/derin-portrait-608.webp"
              alt="Adeoti Israel standing against a wall engraved with Lagos place names"
              width="608"
              height="1080"
              loading="lazy"
            />
          </picture>
          <figcaption className="mono">DERIN / LAGOS, NIGERIA</figcaption>
        </figure>
        <div className="about-copy">
          <p className="eyebrow">STATISTICS IS HOW I THINK.</p>
          <h2>
            Software is how
            <br />I put it to work.
          </h2>
          <p>
            I’m Adeoti Israel — Derin, online. I study Statistics at the University of Lagos. I’m
            building practical systems while moving deeper into AI and machine learning.
          </p>
          <p>
            My work connects the less visible parts of a product: data collection, backend services,
            retrieval and the decisions that make an interface useful.
          </p>
          <p>
            I’m interested in what sits beneath an answer. The assumptions. The evidence. The
            failure modes. The work of turning an idea into something that behaves reliably.
          </p>
          <Link to="/work" className="text-link">
            Follow the work <span>↗</span>
          </Link>
        </div>
      </div>
      <section className="journey">
        <p className="eyebrow">CURRENT VECTOR</p>
        <h2>Still becoming.</h2>
        <dl>
          <div>
            <dt>Foundation</dt>
            <dd>
              Statistics at the University of Lagos. Learning to reason with uncertainty,
              distributions and evidence.
            </dd>
          </div>
          <div>
            <dt>Practice</dt>
            <dd>
              Backend systems, Python, TypeScript and SQL. Connecting data and interfaces through
              clear boundaries.
            </dd>
          </div>
          <div>
            <dt>Frontier</dt>
            <dd>
              Retrieval, machine learning fundamentals, local intelligence and the infrastructure
              around models.
            </dd>
          </div>
        </dl>
      </section>
      <FieldNotes />
    </article>
  );
}
