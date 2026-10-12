import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type MutableRefObject,
  type ReactNode,
} from 'react';
import { useLocation } from 'react-router-dom';
import type { ProjectSlug } from '../data/types';
import { findProject } from '../data/projects';
export type WorldState = 'entry' | 'work-map' | 'about' | 'lab' | 'ask' | ProjectSlug;
interface WorldControl {
  state: WorldState;
  progress: MutableRefObject<number>;
  highlight: ProjectSlug | null;
  setHighlight: (slug: ProjectSlug | null) => void;
}
const Context = createContext<WorldControl | null>(null);
export function WorldController({ children }: { children: ReactNode }) {
  const { pathname } = useLocation();
  const progress = useRef(0);
  const [highlight, setHighlight] = useState<ProjectSlug | null>(null);
  const state: WorldState = pathname.startsWith('/work/')
    ? (findProject(pathname.split('/')[2])?.slug ?? 'work-map')
    : pathname === '/work'
      ? 'work-map'
      : pathname === '/about'
        ? 'about'
        : pathname === '/lab'
          ? 'lab'
          : pathname === '/ask'
            ? 'ask'
            : 'entry';
  useEffect(() => {
    const update = () => {
      progress.current = Math.min(1, window.scrollY / Math.max(1, window.innerHeight * 1.8));
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, []);
  const value = useMemo(() => ({ state, progress, highlight, setHighlight }), [state, highlight]);
  return <Context.Provider value={value}>{children}</Context.Provider>;
}
export function useWorld() {
  const world = useContext(Context);
  if (!world) throw new Error('WorldController is required');
  return world;
}
