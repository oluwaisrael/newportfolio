import { useCapabilities } from '../hooks/useCapabilities';
import { Link } from 'react-router-dom';
import { projects } from '../data/projects';
export default function Home() {
  const { realtime } = useCapabilities();
  return (
    <>
      <section className="arrival" aria-labelledby="arrival-title">
        <div className="arrival-top mono">
          <span>
            <i className="status-dot" /> A PERSONAL EXPLORATION
          </span>
          <span>SYSTEMS WORLD — VOL. 01</span>
        </div>
        <div className="arrival-copy">
          <p className="eyebrow">STATISTICS × SOFTWARE × AI</p>
          <h1 id="arrival-title">
            I TURN DATA
            <br />
            INTO SYSTEMS.
          </h1>
          <p className="arrival-description">
            Statistics underneath.
            <br />
            Backend at the foundation.
            <br />
            AI/ML at the frontier.
            <br />
            Interactive systems on the surface.
          </p>
          <div className="arrival-actions">
            <a href={realtime ? '#arrival-path' : '#discover'} className="pill">
              Enter the world <span>↓</span>
            </a>
            <Link to="/ask" className="text-link">
              Ask Derin <span>↗</span>
            </Link>
          </div>
        </div>
        <nav className="arrival-index" aria-label="World index">
          <span className="mono">WORLD INDEX / 08</span>
          {projects.map((p) => (
            <Link key={p.slug} to={'/work/' + p.slug}>
              <span className="mono">{p.number}</span>
              {p.title}
              <span aria-hidden="true">↗</span>
            </Link>
          ))}
          <Link to="/about">
            <span className="mono">06</span>About<span aria-hidden="true">↗</span>
          </Link>
          <Link to="/lab">
            <span className="mono">07</span>Lab<span aria-hidden="true">↗</span>
          </Link>
          <a href="mailto:adeotiisrael93@gmail.com">
            <span className="mono">08</span>Contact<span aria-hidden="true">↗</span>
          </a>
        </nav>
        <div className="arrival-bottom">
          <span className="mono">
            ADEOTI ISRAEL
            <br />
            <span className="muted">STATISTICS STUDENT / BUILDER</span>
          </span>
          <a href="#discover" className="scroll-cue mono">
            SCROLL TO DISCOVER <span>↓</span>
          </a>
          <span className="mono arrival-coordinate">
            06.5244° N<br />
            03.3792° E
          </span>
        </div>
      </section>
      <div
        className="arrival-traverse"
        id="arrival-path"
        aria-label="The approach to the central system"
      >
        <div className="traverse-caption">
          <span className="mono">00 / ARRIVAL</span>
          <p>
            Every system begins
            <br />
            with a question.
          </p>
          <a href="#discover" className="text-link">
            Find your direction <span>↓</span>
          </a>
        </div>
      </div>
      <section id="discover" className="discovery">
        <div className="section-heading">
          <p className="eyebrow">01 / THE TERRITORY</p>
          <h2>
            Five destinations.
            <br />
            One connected world.
          </h2>
          <p className="muted">Follow a question into the system behind it.</p>
        </div>
        <div className="destination-index">
          {projects.map((p) => (
            <Link key={p.slug} to={'/work/' + p.slug} className="destination-line">
              <span className="mono">{p.number}</span>
              <span>
                <strong>{p.title}</strong>
                <small>{p.summary}</small>
              </span>
              <span className="mono destination-category">{p.category}</span>
              <span>↗</span>
            </Link>
          ))}
        </div>
        <Link to="/work" className="text-link">
          Explore the world map <span>↗</span>
        </Link>
      </section>
      <section className="direction">
        <p className="eyebrow">02 / THE PERSON BEHIND THE PATTERNS</p>
        <h2>
          Learning to see.
          <br />
          Learning to build.
        </h2>
        <p>
          I’m Adeoti Israel. Derin, online. A Statistics student at the University of Lagos, working
          at the intersection of data, backend engineering and applied AI.
        </p>
        <Link to="/about" className="text-link">
          A direction of travel <span>↗</span>
        </Link>
      </section>
      <section className="home-lab">
        <p className="eyebrow">03 / OPEN QUESTIONS</p>
        <h2>
          Some ideas need
          <br />
          to be touched.
        </h2>
        <p>Change a distribution. Follow a retrieval. Look underneath an activation.</p>
        <Link to="/lab" className="text-link">
          Step into the lab <span>↗</span>
        </Link>
        <Link to="/ask" className="text-link">
          Ask the work <span>↗</span>
        </Link>
      </section>
    </>
  );
}
