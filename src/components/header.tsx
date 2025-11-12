'use client';

import { ScoreDisplay } from '@/components/score-display';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { BOARD_SIZE } from '@/lib/game-config';
import { useGameStore } from '@/store/use-game-store';
import { DropdownMenuSeparator } from '@radix-ui/react-dropdown-menu';
import { Menu, Plus } from 'lucide-react';
import { useCallback } from 'react';
import { ThemeToggle } from './theme-toggle';
import { Button } from './ui/button';

export function Header() {
  const score = useGameStore((state) => state.score);
  const bestScore = useGameStore((state) => state.bestScore);
  const newGame = useGameStore((state) => state.newGame);

  const handleNewGame = useCallback(() => {
    newGame();
  }, [newGame]);

  return (
    <div className="flex w-full justify-center">
      <div className="flex items-center" style={{ width: BOARD_SIZE }}>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="w-12 h-12">
              <Menu />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={handleNewGame}>
                <Plus /> New game
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <ThemeToggle />
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="ml-auto flex items-center gap-4">
          <ScoreDisplay
            label="SCORE"
            score={score}
            className="min-w-[100px] h-16 justify-center"
          />
          <ScoreDisplay
            label="BEST"
            score={bestScore}
            className="min-w-[100px] h-16 justify-center"
          />
        </div>
      </div>
    </div>
  );
}

export default Header;
