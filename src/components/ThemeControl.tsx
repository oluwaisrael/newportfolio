import { useEffect, useState } from 'react';
type Theme = 'system' | 'light' | 'dark';
export function ThemeControl() {
  const [theme, setTheme] = useState<Theme>(() => (localStorage.getItem('derin-theme') as Theme) || 'system');
  useEffect(() => { document.documentElement.dataset.theme = theme; localStorage.setItem('derin-theme', theme); }, [theme]);
  return <label className="theme-control"><span className="sr-only">Colour theme</span><select value={theme} onChange={(event) => setTheme(event.target.value as Theme)}><option value="system">System</option><option value="light">Light</option><option value="dark">Dark</option></select></label>;
}
