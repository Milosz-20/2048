'use client';

import { DropdownMenuItem } from '@/components/ui/dropdown-menu';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import * as React from 'react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const isDark = theme === 'dark';

  return (
    <DropdownMenuItem
      onSelect={(event) => {
        event.preventDefault();
        setTheme(isDark ? 'light' : 'dark');
      }}
      className="justify-between"
    >
      <span className="flex items-center gap-2">
        {isDark ?
          <Moon className="h-4 w-4" />
        : <Sun className="h-4 w-4" />}
        <span>{isDark ? 'Dark theme' : 'Light theme'}</span>
      </span>
    </DropdownMenuItem>
  );
}
