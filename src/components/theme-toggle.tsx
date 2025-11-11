'use client';

import { Toggle } from '@/components/ui/toggle';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import * as React from 'react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  // Avoid hydration mismatch
  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const isDark = theme === 'dark';

  return (
    <Toggle
      pressed={isDark}
      onPressedChange={(pressed) => {
        setTheme(pressed ? 'dark' : 'light');
      }}
      aria-label="Toggle theme"
      variant="outline"
    >
      {isDark ?
        <Moon className="h-[1.2rem] w-[1.2rem]" />
      : <Sun className="h-[1.2rem] w-[1.2rem]" />}
    </Toggle>
  );
}
