import { Link } from 'react-router-dom';
export function Footer() {
  return (
    <footer className="site-footer">
      <div>
        <Link to="/" className="brand">
          derin<span aria-hidden="true">*</span>
        </Link>
        <p>
          Thinking statistically.
          <br />
          Building deliberately.
        </p>
      </div>
      <a className="footer-email" href="mailto:adeotiisrael93@gmail.com">
        Make a connection <span>↗</span>
      </a>
      <div className="footer-bottom mono">
        <span>© {new Date().getFullYear()} ADEOTI ISRAEL</span>
        <a href="https://github.com/oluwaisrael" target="_blank" rel="noreferrer">
          GITHUB ↗
        </a>
        <Link to="/ask">ASK DERIN ↗</Link>
        <span>LAGOS, NIGERIA</span>
      </div>
    </footer>
  );
}
