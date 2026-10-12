import { AskGuide } from '../components/AskGuide';
import { Link } from 'react-router-dom';
export default function Ask() {
  return (
    <section className="ask-page">
      <header className="page-intro">
        <p className="eyebrow">CONTEXT / A CONVERSATION STARTER</p>
        <h1>
          Ask the work.
          <br />
          <em>Then talk to me.</em>
        </h1>
        <p>A few ways into the thinking behind the projects.</p>
      </header>
      <AskGuide />
      <Link to="/work" className="text-link">
        Explore every destination <span>↗</span>
      </Link>
    </section>
  );
}
