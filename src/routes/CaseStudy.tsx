import { Link, useParams } from 'react-router-dom';
import { findProject, projects } from '../data/projects';
export default function CaseStudy() {
  const { slug } = useParams();
  const project = findProject(slug);
  if (!project)
    return (
      <section className="page-intro">
        <h1>Unmapped territory.</h1>
        <Link to="/work" className="text-link">
          Return to the work ↗
        </Link>
      </section>
    );
  const next = projects[(projects.indexOf(project) + 1) % projects.length];
  return (
    <article
      className="case-study"
      style={{ '--project-accent': project.accent } as React.CSSProperties}
    >
      <header className="case-hero">
        <Link to="/work" className="eyebrow">
          ← THE WORLD / {project.number}
        </Link>
        <div>
          <p className="eyebrow">{project.category}</p>
          <h1>{project.title}</h1>
          <p className="case-summary">{project.summary}</p>
          <a className="text-link" href="#case-content">
            Look underneath <span>↓</span>
          </a>
        </div>
        <span className="mono case-status">{project.status}</span>
      </header>
      <div id="case-content" className="case-content">
        <div className="case-question">
          <p className="eyebrow">THE CORE QUESTION</p>
          <h2>{project.question}</h2>
        </div>
        <ol className="pipeline" aria-label="Project architecture">
          {project.pipeline.map((step, i) => (
            <li key={step}>
              <span className="mono">0{i + 1}</span>
              {step}
            </li>
          ))}
        </ol>
        <div className="case-sections">
          {project.sections.map((section, i) => (
            <section key={section.title}>
              <h2>
                <span className="mono">0{i + 1}</span>
                {section.title}
              </h2>
              <p>{section.body}</p>
            </section>
          ))}
        </div>
        <div className="technology-list">
          <p className="eyebrow">TOOLS / MATERIALS</p>
          {project.stack.map((t) => (
            <span key={t}>{t}</span>
          ))}
        </div>
        {project.source ? (
          <a className="text-link" href={project.source} target="_blank" rel="noreferrer">
            Read the source <span>↗</span>
          </a>
        ) : (
          <p className="muted">An ongoing personal experiment. Public source is not available.</p>
        )}
        <Link to={'/work/' + next.slug} className="next-project">
          <span className="eyebrow">NEXT DESTINATION / {next.number}</span>
          <strong>{next.title}</strong>
          <span>↗</span>
        </Link>
      </div>
    </article>
  );
}
