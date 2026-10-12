import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { findProject } from '../data/projects';
export function Metadata() {
  const { pathname } = useLocation();
  useEffect(() => {
    const project = findProject(pathname.split('/')[2]);
    const titles: Record<string, string> = {
      '/': 'Derin — Adeoti Israel',
      '/work': 'The work — Derin',
      '/about': 'A direction of travel — Derin',
      '/lab': 'Interactive lab — Derin',
      '/ask': 'Ask the work — Derin',
    };
    document.title = project
      ? `${project.title} — Derin`
      : (titles[pathname] ?? 'Unmapped territory — Derin');
    const description =
      project?.summary ??
      'Adeoti Israel — Derin. Statistics at the University of Lagos, backend engineering, AI/ML and creative technology.';
    document.querySelector('meta[name="description"]')?.setAttribute('content', description);
    document.querySelector('meta[property="og:title"]')?.setAttribute('content', document.title);
    document.querySelector('meta[property="og:description"]')?.setAttribute('content', description);
  }, [pathname]);
  return null;
}
