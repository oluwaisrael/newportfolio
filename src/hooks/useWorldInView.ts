import { useEffect, useState } from 'react';
/** Once opaque reading content covers the world, keep its last frame without drawing. */
export function useWorldInView() {
  const [inView, setInView] = useState(true);
  useEffect(() => {
    let current = true;
    const update = () => {
      const next = window.scrollY < window.innerHeight * 1.8;
      if (next !== current) {
        current = next;
        setInView(next);
      }
    };
    update();
    window.addEventListener('scroll', update, { passive: true });
    window.addEventListener('resize', update);
    return () => {
      window.removeEventListener('scroll', update);
      window.removeEventListener('resize', update);
    };
  }, []);
  return inView;
}
