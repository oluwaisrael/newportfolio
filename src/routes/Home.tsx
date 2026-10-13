import { Link } from 'react-router-dom';
import { projects } from '../data/projects';
import { useCapabilities } from '../hooks/useCapabilities';
const pins = [
  {
    slug: 'core',
    name: 'THE SYSTEMS CORE',
    detail: 'STATISTICS\nBACKEND\nAI/ML\nCREATIVE TECH',
    x: 55,
    y: 20,
    color: '#e7c078',
    href: '#arrival-path',
  },
  {
    slug: 'unirag',
    name: 'UniRAG',
    detail: 'DOCUMENT RETRIEVAL\nRAG SYSTEMS\nAI APPLICATIONS',
    x: 28,
    y: 33,
    color: '#a9c8ff',
    href: '/work/unirag',
  },
  {
    slug: 'priceuniverse',
    name: 'PriceUniverse',
    detail: 'PRICE INTELLIGENCE\nSCRAPING\nBACKEND SYSTEMS',
    x: 70,
    y: 33,
    color: '#a6d386',
    href: '/work/priceuniverse',
  },
  {
    slug: 'neural-network',
    name: 'Neural Network',
    detail: 'FROM SCRATCH\nDEEP LEARNING\nFUNDAMENTALS\nNUMPY',
    x: 16,
    y: 55,
    color: '#dfad65',
    href: '/work/neural-network',
  },
  {
    slug: 'lael',
    name: 'Lael',
    detail: 'LOCAL INTELLIGENCE\nPERSONAL OS\nTAURI + RUST',
    x: 90,
    y: 43,
    color: '#c9d4e1',
    href: '/work/lael',
  },
  {
    slug: 'roam',
    name: 'Roam',
    detail: 'DECISION SYSTEMS\nREAL PLACES\nNATURAL LANGUAGE',
    x: 84,
    y: 64,
    color: '#dfa875',
    href: '/work/roam',
  },
];
const index = [
  ['00', 'ORIGIN', '#arrival-title'],
  ['01', 'STATISTICS', '#statistics'],
  ['02', 'SYSTEMS', '#arrival-path'],
  ['03', 'WORK', '/work'],
  ['04', 'LAB', '/lab'],
  ['05', 'ABOUT', '/about'],
  ['06', 'CONTACT', 'mailto:adeotiisrael93@gmail.com'],
];
export default function Home() {
  const { realtime } = useCapabilities();
  return (
    <>
      <section className="arrival" aria-labelledby="arrival-title">
        <div className="arrival-copy">
          <p id="statistics" className="eyebrow">
            STATISTICS × SOFTWARE × AI
          </p>
          <h1 id="arrival-title">
            I TURN DATA
            <br />
            <em>INTO SYSTEMS.</em>
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
              Enter the world <span>⟶</span>
            </a>
            <Link to="/ask" className="text-link">
              Ask Derin <span>⟶</span>
            </Link>
          </div>
        </div>
        <nav className="arrival-sections" aria-label="World sections">
          {index.map(([number, label, href]) => (
            <a href={href} key={number}>
              <span>{number}</span>
              {label}
            </a>
          ))}
        </nav>
        <div className="arrival-pins" aria-label="Project districts">
          {pins.map((pin) => {
            const content = (
              <>
                <i aria-hidden="true" />
                <span className="pin-copy">
                  <strong>{pin.name}</strong>
                  <small>{pin.detail}</small>
                </span>
              </>
            );
            return pin.href.startsWith('/') ? (
              <Link
                key={pin.slug}
                to={pin.href}
                className={'district-pin pin-' + pin.slug}
                style={
                  { left: pin.x + '%', top: pin.y + '%', '--pin': pin.color } as React.CSSProperties
                }
              >
                {content}
              </Link>
            ) : (
              <a
                key={pin.slug}
                href={pin.href}
                className={'district-pin pin-' + pin.slug}
                style={
                  { left: pin.x + '%', top: pin.y + '%', '--pin': pin.color } as React.CSSProperties
                }
              >
                {content}
              </a>
            );
          })}
        </div>
        <div className="arrival-bottom">
          <span className="arrival-identity mono">
            ADEOTI ISRAEL
            <br />
            <span>STATISTICS STUDENT / BUILDER</span>
          </span>
          <a href="#discover" className="scroll-cue mono">
            <i aria-hidden="true">↓</i>
            <span>SCROLL TO EXPLORE</span>
          </a>
        </div>
      </section>
      <div
        className="arrival-traverse"
        id="arrival-path"
        aria-label="The winding path into the world"
      >
        <div id="discover" />
      </div>
      <section className="discovery" aria-label="Explore the world">
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
      </section>
      <section className="direction">
        <p className="eyebrow">05 / THE PERSON BEHIND THE SYSTEMS</p>
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
          About Derin <span>⟶</span>
        </Link>
      </section>
    </>
  );
}
