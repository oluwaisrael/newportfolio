import { Link } from 'react-router-dom';
import { projects } from '../data/projects';

const visual = projects.slice(0, 3);
const technical = projects.slice(3);

export default function Work() {
  return <section className="work-exhibition">
    <header className="exhibition-intro"><p className="eyebrow">SELECTED WORK / 01—06</p><h1>Six projects.<br/><em>One practice.</em></h1><p>Three visual flagships lead the exhibition. Three technical studies make the systems underneath visible.</p></header>
    <section className="flagship-gallery" aria-labelledby="flagship-heading"><div className="exhibition-heading"><p className="eyebrow">VISUAL FLAGSHIPS</p><h2 id="flagship-heading">Products with<br/>a point of view.</h2></div>{visual.map((project, index) => <Link className={`flagship-card flagship-${index + 1}`} to={`/work/${project.slug}`} key={project.slug} style={{ '--accent': project.accent } as React.CSSProperties}><span className="mono">{project.number} / {project.category}</span><div className="flagship-art" aria-hidden="true"><i/><i/><i/></div><strong>{project.title}</strong><p>{project.summary}</p><b>Explore study ↗</b></Link>)}</section>
    <section className="technical-exhibits" aria-labelledby="technical-heading"><header><p className="eyebrow">TECHNICAL SHOWCASES</p><h2 id="technical-heading">The systems<br/><em>underneath.</em></h2></header><div>{technical.map((project) => <Link to={`/work/${project.slug}`} key={project.slug} className="technical-exhibit" style={{ '--accent': project.accent } as React.CSSProperties}><span className="mono">{project.number}</span><div><p className="eyebrow">{project.category}</p><strong>{project.title}</strong><p>{project.summary}</p></div><ol aria-hidden="true">{project.pipeline.map((step, index) => <li key={step}><b>0{index + 1}</b>{step}</li>)}</ol><i>↗</i></Link>)}</div></section>
  </section>;
}
