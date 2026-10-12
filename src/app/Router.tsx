import { BrowserRouter, useLocation } from 'react-router-dom';
import { useEffect, useRef, type ReactNode } from 'react';
function RouteReset() {
  const { pathname } = useLocation();
  const previous = useRef(pathname);
  useEffect(() => {
    if (previous.current === pathname) return;
    previous.current = pathname;
    window.scrollTo({ top: 0, behavior: 'instant' });
    document.getElementById('main')?.focus({ preventScroll: true });
  }, [pathname]);
  return null;
}
export function Router({ children }: { children: ReactNode }) {
  return (
    <BrowserRouter>
      <RouteReset />
      {children}
    </BrowserRouter>
  );
}
