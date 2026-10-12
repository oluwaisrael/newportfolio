import { Link } from 'react-router-dom';
export function FieldNotes() {
  return (
    <details className="field-notes">
      <summary className="mono">FIELD NOTE / 79AD780</summary>
      <div>
        <p>Every new system has a previous state.</p>
        <a
          href="https://github.com/oluwaisrael/newportfolio/tree/archive/pre-world-rebuild"
          target="_blank"
          rel="noreferrer"
        >
          The world before this one ↗
        </a>
        <p>A small detour: C#/.NET is part of the ongoing backend learning path.</p>
        <Link to="/lab">Coordinates for an unfinished thought → the Lab</Link>
      </div>
    </details>
  );
}
