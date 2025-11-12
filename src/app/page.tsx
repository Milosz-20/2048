'use client';

import { Tile } from '@/components/tile';
import { TileContainer } from '@/components/tile-container';
import { BOARD_SIZE } from '@/lib/game-config';
import { Direction } from '@/lib/types';
import { useGameStore } from '@/store/use-game-store';
import { AnimatePresence } from 'motion/react';
import { useEffect } from 'react';
import { useKeyboardInput } from '../hooks/use-keyboard-input';

export default function Game() {
  const tiles = useGameStore((state) => state.tiles);
  const newGame = useGameStore((state) => state.newGame);
  const move = useGameStore((state) => state.move);

  useEffect(() => {
    newGame();
  }, [newGame]);

  const handleMove = (direction: Direction) => {
    move(direction);
  };

  useKeyboardInput(handleMove);

  return (
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
  );
}
