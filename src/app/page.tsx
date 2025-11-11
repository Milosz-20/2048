'use client';

import { ThemeToggle } from '@/components/theme-toggle';
import { Tile } from '@/components/tile';
import { TileContainer } from '@/components/tile-container';
import { BOARD_SIZE } from '@/lib/game-config';
import { Direction } from '@/lib/types';
import { useGameStore } from '@/store/use-game-store';
import { AnimatePresence } from 'motion/react';
import { useEffect } from 'react';
import { useKeyboardInput } from '../hooks/use-keyboard-input';

export default function Game() {
  const { tiles, newGame, move } = useGameStore();

  // Rozpocznij nową grę przy montowaniu komponentu
  useEffect(() => {
    newGame();
  }, [newGame]);

  const handleMove = (direction: Direction) => {
    move(direction);
  };

  useKeyboardInput(handleMove);

  return (
    <div className="w-full h-full relative">
      <div className="absolute top-4 right-4 z-10">
        <ThemeToggle />
      </div>
      <div className="w-full h-full flex justify-center items-center pt-[100px]">
        <TileContainer
          className="bg-zinc-300 dark:bg-zinc-800"
          style={{
            width: BOARD_SIZE,
            height: BOARD_SIZE,
          }}
        >
          <AnimatePresence initial={false}>
            {tiles.map((tile) => (
              <Tile key={tile.id} tile={tile} />
            ))}
          </AnimatePresence>
        </TileContainer>
      </div>
    </div>
  );
}
