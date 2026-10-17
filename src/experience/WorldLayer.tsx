import { useWorld } from './WorldController';
import { findProject } from '../data/projects';
import { SoundControl } from '../components/SoundControl';
import { lazy, Suspense, useCallback, useState } from 'react';
import { useCapabilities } from '../hooks/useCapabilities';
import { SceneBoundary } from '../components/SceneBoundary';
import { readQuality, saveQuality, type Quality } from './quality';
const ExperienceCanvas = lazy(() => import('./ExperienceCanvas'));
export function WorldLayer() {
  const { realtime } = useCapabilities();
  const { state, highlight } = useWorld();
  const artwork = findProject(highlight ?? state);
  const [failed, setFailed] = useState(false);
  const [ready, setReady] = useState(false);
  const [quality, setQuality] = useState<Quality>(readQuality);
  const [explicit, setExplicit] = useState(() => {
    try {
      return localStorage.getItem('derin-quality') !== null;
    } catch {
      return false;
    }
  });
  const pressure = useCallback(() => {
    if (!explicit) setQuality('low');
  }, [explicit]);
  const failure = useCallback(() => {
    setFailed(true);
    setReady(false);
  }, []);
  const loaded = useCallback(() => setReady(true), []);
  const active = realtime && !failed;
  return (
    <>
      <div
        className={
          'world-layer ' +
          (state === 'entry' ? 'world-arrival ' : '') +
          (ready && active ? 'world-ready' : 'world-static')
        }
        aria-hidden="true"
      >
        <div
          className="world-artwork"
          style={artwork ? { backgroundImage: 'url(/images/arrival-still.webp)' } : undefined}
        />
        {active && (
          <SceneBoundary onFailure={failure}>
            <Suspense fallback={null}>
              <ExperienceCanvas
                quality={quality}
                onFailure={failure}
                onReady={loaded}
                onPressure={pressure}
              />
            </Suspense>
          </SceneBoundary>
        )}
        <div className="world-vignette" />
      </div>
      <div className={'world-controls' + (state === 'entry' && active ? ' arrival-controls' : '')}>
        <SoundControl />
        <span className="mono">{active ? 'WORLD / LIVE' : 'WORLD / STILL'}</span>
        {active && (
          <label className="quality-label">
            <span className="sr-only">Graphics quality</span>
            <select
              value={quality}
              onChange={(e) => {
                const value = e.target.value as Quality;
                setQuality(value);
                setExplicit(true);
                saveQuality(value);
              }}
            >
              <option value="low">Low</option>
              <option value="balanced">Balanced</option>
              <option value="high">High</option>
            </select>
          </label>
        )}
      </div>
    </>
  );
}
