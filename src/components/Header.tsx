import { NavLink, Link, useLocation } from 'react-router-dom';
import { ThemeControl } from './ThemeControl';
export function Header() {
  const home = useLocation().pathname === '/';
  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className={'site-header' + (home ? ' site-header-arrival' : '')}>
        <Link to="/" className="brand" aria-label="Derin, home">
          derin<span aria-hidden="true">*</span>
        </Link>
        <span className="header-location mono">
          {home ? (
            <>
              LAGOS, NG
              <br />
              06° 27′ N&nbsp;&nbsp; · &nbsp;&nbsp;03° 22′ E
            </>
          ) : (
            <>
              INDEPENDENT MIND.
              <br />
              LAGOS, NG / 06°27′ N
            </>
          )}
        </span>
        <nav aria-label="Main navigation">
          <NavLink to="/" end>
            World
          </NavLink>
          <NavLink to="/work">Work</NavLink>
          <NavLink to="/experience">Experience</NavLink>
          <NavLink to="/lab">Lab</NavLink>
          <NavLink to="/about">About</NavLink>
        </nav>
        <a href="mailto:adeotiisrael93@gmail.com" className="contact-link">
          Let’s talk
        </a>
        <ThemeControl />
        {home && (
          <span className="arrival-orbit" aria-hidden="true">
            <i />
          </span>
        )}
      </header>
    </>
  );
}
