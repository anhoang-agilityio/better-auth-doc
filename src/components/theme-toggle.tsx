import { Moon, Sun } from 'lucide-react';
import { useEffect, useState } from 'react';

type ThemePreference = 'light' | 'dark';

const STORAGE_KEY = 'theme';

function getInitialTheme(): ThemePreference {
  if (typeof localStorage !== 'undefined') {
    const stored = localStorage.getItem(STORAGE_KEY) as ThemePreference | null;
    if (stored === 'light' || stored === 'dark') {
      return stored;
    }
  }
  if (typeof window !== 'undefined') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light';
  }
  return 'light';
}

export default function ThemeToggle() {
  const [theme, setTheme] = useState<ThemePreference>(getInitialTheme());

  useEffect(() => {
    const isDark = theme === 'dark';
    const root = document.documentElement;
    root.classList[isDark ? 'add' : 'remove']('dark');
    try {
      localStorage.setItem(STORAGE_KEY, theme);
    } catch {
      // ignore write failures (privacy mode)
    }
  }, [theme]);

  const toggleTheme = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'));

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      title="Toggle theme"
      onClick={toggleTheme}
      className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-neutral-200 bg-white text-neutral-900 shadow-sm ring-2 transition-colors hover:bg-neutral-100 focus-visible:ring-neutral-400 focus-visible:outline-none dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-100 dark:hover:bg-neutral-800"
    >
      <Sun className="h-4 w-4 scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
      <Moon className="absolute h-4 w-4 scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
      <span className="sr-only">Toggle theme</span>
    </button>
  );
}
