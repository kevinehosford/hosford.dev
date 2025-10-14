import { Moon, Sun } from 'lucide-react';
import { useState } from 'react';
import { getThemeValue } from '@/lib/getThemeValue';

type Theme = 'light' | 'dark';

export const ThemeSwitcher = () => {
  const [theme, setTheme] = useState<Theme>('dark');

  const handleThemeChange = (nextTheme: Theme) => {
    if (nextTheme === 'light') {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    setTheme(nextTheme);
  };

  return (
    <div className="flex items-center gap-2">
      {theme === 'dark' ? (
        <button onClick={() => handleThemeChange('light')} className="cursor-pointer">
          <Sun color={getThemeValue('--color-icon') ?? undefined} />
          <span className="sr-only">Light mode</span>
        </button>
      ) : (
        <button onClick={() => handleThemeChange('dark')} className="cursor-pointer">
          <Moon color={getThemeValue('--color-icon') ?? undefined} />
          <span className="sr-only">Dark mode</span>
        </button>
      )}
    </div>
  );
};
