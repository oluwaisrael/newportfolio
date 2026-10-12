import { NavLink, Link } from 'react-router-dom';
export function Header() {
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <Link to="/" className="brand" aria-label="Derin, home">
          derin<span aria-hidden="true">*</span>
        </Link>
        <span className="header-location mono">
          INDEPENDENT MIND.
          <br />
          LAGOS, NG / 06°27′ N
        </span>
        <nav aria-label="Main navigation">
          <NavLink to="/" end>
            World
          </NavLink>
          <NavLink to="/work">Work</NavLink>
          <NavLink to="/lab">Lab</NavLink>
          <NavLink to="/about">About</NavLink>
        </nav>
        <a href="mailto:adeotiisrael93@gmail.com" className="contact-link">
          Let’s talk <span>↗</span>
        </a>
      </header>
    </>
  );
}
