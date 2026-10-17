import { Link } from 'react-router-dom';
import { projects } from '../data/projects';
import { useCapabilities } from '../hooks/useCapabilities';
import { certifications, experience, profile, skills, timeline } from '../data/profile';
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
    slug: 'lael-ai',
    name: 'LAEL — LOCAL AI',
    detail: 'LOCAL PRESENCE\nVOICE + MEMORY\nPRIVATE DEVELOPMENT',
    x: 28,
    y: 33,
    color: '#a9c8ff',
    href: '/work/lael-ai',
  },
  {
    slug: 'aiico-product-api',
    name: 'AIICO PRODUCT API',
    detail: 'ASP.NET CORE\nPOSTGRESQL\nPUBLIC C# API',
    x: 70,
    y: 33,
    color: '#a6d386',
    href: '/work/aiico-product-api',
  },
  {
    slug: 'backend-systems',
    name: 'BACKEND SYSTEMS',
    detail: 'API BOUNDARIES\nASYNC WORK\nREAL-TIME FLOWS',
    x: 16,
    y: 55,
    color: '#dfad65',
    href: '/work/backend-systems',
  },
];
const index = [
  ['00', 'ORIGIN', '#arrival-title'],
  ['01', 'WORK', '/work'],
  ['02', 'JOURNEY', '#journey'],
  ['03', 'EXPERIENCE', '/experience'],
  ['04', 'ABOUT', '/about'],
  ['05', 'CONTACT', '/contact'],
];
export default function Home() {
  const { realtime } = useCapabilities();
  return (
    <>
      <section className="arrival" aria-labelledby="arrival-title">
        <div className="arrival-copy">
          <p id="statistics" className="eyebrow">
            cødë → derin* / LAGOS, NIGERIA
          </p>
          <h1 id="arrival-title">
            I BUILD SOFTWARE
            <br />
            <em>WHERE DATA, DESIGN &amp; INTELLIGENCE MEET.</em>
          </h1>
          <p className="arrival-description">
            {profile.positioning}.
          </p>
          <div className="arrival-actions">
            <a href={realtime ? '#arrival-path' : '#discover'} className="pill">
              Enter the world <span>⟶</span>
            </a>
            <Link to="/contact" className="text-link">
              Contact <span>⟶</span>
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
            <span>STATISTICS · BACKEND · APPLIED AI</span>
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
      />
      <section id="discover" className="discovery" aria-label="Explore the world">
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
      <section className="direction" id="journey">
        <p className="eyebrow">THE PERSON BEHIND THE SYSTEMS</p>
        <h2>
          Learning to see.
          <br />
          Learning to build.
        </h2>
        <p>
          Before the systems, there was cødë. Now: a Statistics student building at the intersection of data, backend engineering and applied AI.
        </p>
        <Link to="/about" className="text-link">
          About Derin <span>⟶</span>
        </Link>
      </section>
      <section className="profile-ledger" aria-label="Profile overview">
        <div className="academic-feature"><span className="eyebrow">UNIVERSITY OF LAGOS / STATISTICS</span><strong>{profile.cgpa}</strong><span>WEIGHTED CGPA</span></div>
        <div><p className="eyebrow">THE JOURNEY</p>{timeline.map(([year, text]) => <p key={year}><b>{year}</b> {text}</p>)}</div>
        <div><p className="eyebrow">CURRENT &amp; PRIOR EXPERIENCE</p>{experience.map(([company, role, note]) => <p key={company}><b>{company}</b><br />{role} · {note}</p>)}</div>
        <div><p className="eyebrow">CREDENTIALS / SEVEN</p>{certifications.map(([name, issuer, date]) => <p key={name}><b>{name}</b><br />{issuer} · {date}</p>)}</div>
        <div><p className="eyebrow">TOOLS DEMONSTRATED ACROSS WORK</p><p>{skills.join(' · ')}</p><p className="muted">Founder of lāel, an independent clothing brand. V&amp;M UNILAG model; independent fashion and lifestyle creator; freelance developer and designer.</p></div>
      </section>
    </>
  );
}
