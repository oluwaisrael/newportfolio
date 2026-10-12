import { Link } from 'react-router-dom';
import { projects } from '../data/projects';
export default function Work() {
  return (
    <section className="work-map">
      <div className="page-intro">
        <p className="eyebrow">INDEX / 01—05</p>
        <h1>
          Choose a<br />
          <em>direction.</em>
        </h1>
        <p>
          Different questions. Connected systems.
          <br />
          Select a destination to move closer.
        </p>
      </div>
      <nav className="map-destinations" aria-label="Project destinations">
        {projects.map((p) => (
          <Link to={'/work/' + p.slug} key={p.slug} className={'map-label map-label-' + p.number}>
            <span className="map-cross">+</span>
            <span className="mono">
              {p.number} / {p.category}
            </span>
            <strong>{p.title}</strong>
            <span className="map-description">{p.summary}</span>
            <span className="map-enter">Explore destination ↗</span>
          </Link>
        ))}
      </nav>
      <div className="map-legend mono">
        <span>+ SELECT A DESTINATION</span>
        <span>FIVE INQUIRIES / ONE WORLD</span>
      </div>
    </section>
  );
}
