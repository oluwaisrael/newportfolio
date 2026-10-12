import { BrowserRouter, useLocation } from 'react-router-dom';
import { useEffect, type ReactNode } from 'react';
function RouteReset() {
 const { pathname } = useLocation();
 useEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }); document.getElementById('main')?.focus({ preventScroll: true }); }, [pathname]);
 return null;
}
export function Router({ children }: { children: ReactNode }) { return <BrowserRouter><RouteReset />{children}</BrowserRouter>; }
