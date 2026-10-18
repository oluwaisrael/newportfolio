import { Link } from 'react-router-dom';
import { projects } from '../data/projects';
export default function Work() {
  return <section className="work-dossier"><header className="dossier-intro"><p className="eyebrow">SELECTED ENGINEERING WORK / 01—03</p><h1>Three studies.<br/><em>One direction.</em></h1><p>Local intelligence, a clear public API, and backend engineering studies. Each is documented for what the available source actually supports.</p></header><nav className="dossier-list" aria-label="Selected work">{projects.map((project) => <Link to={`/work/${project.slug}`} className="dossier-project" key={project.slug} style={{ '--accent': project.accent } as React.CSSProperties}><span className="mono">{project.number} / {project.category}</span><div><strong>{project.title}</strong><p>{project.summary}</p></div><span className="dossier-arrow">↗</span></Link>)}</nav></section>;
}
