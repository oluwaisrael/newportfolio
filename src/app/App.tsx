import { Metadata } from '../components/Metadata';
import { Routes, Route } from 'react-router-dom';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { WorldController } from '../experience/WorldController';
import { WorldLayer } from '../experience/WorldLayer';
import Home from '../routes/Home';
import Work from '../routes/Work';
import CaseStudy from '../routes/CaseStudy';
import About from '../routes/About';
import Lab from '../routes/Lab';
import Ask from '../routes/Ask';
export default function App() {
  return (
    <WorldController>
      <Metadata />
      <Header />
      <WorldLayer />
      <main id="main" tabIndex={-1}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work" element={<Work />} />
          <Route path="/work/:slug" element={<CaseStudy />} />
          <Route path="/about" element={<About />} />
          <Route path="/lab" element={<Lab />} />
          <Route path="/ask" element={<Ask />} />
          <Route
            path="*"
            element={
              <section className="page-intro">
                <h1>Unmapped territory.</h1>
                <a className="text-link" href="/">
                  Return to the world ↗
                </a>
              </section>
            }
          />
        </Routes>
      </main>
      <Footer />
    </WorldController>
  );
}
