'use client';

import { Tile } from '@/components/tile';
import { TileContainer } from '@/components/tile-container';
import { Button } from '@/components/ui/button';
import { BOARD_SIZE } from '@/lib/game-config';
import { Direction } from '@/lib/types';
import { useConfetti as triggerConfetti } from '@/lib/use-confetti';
import { useGameStore } from '@/store/use-game-store';
import { AnimatePresence, motion } from 'motion/react';
import { useEffect } from 'react';
import { useKeyboardInput } from '../hooks/use-keyboard-input';

export default function Game() {
  const tiles = useGameStore((state) => state.tiles);
  const newGame = useGameStore((state) => state.newGame);
  const gameOver = useGameStore((state) => state.gameOver);
  const gameWon = useGameStore((state) => state.gameWon);
  const move = useGameStore((state) => state.move);

  useEffect(() => {
    newGame();
  }, [newGame]);

  useEffect(() => {
    if (gameWon) {
      triggerConfetti();
    }
  }, [gameWon, triggerConfetti]);

  const handleMove = (direction: Direction) => {
    move(direction);
  };

  useKeyboardInput(handleMove);

  const MotionButton = motion.create(Button);

  return (
    <>
      <TileContainer
        className={`bg-zinc-300 dark:bg-zinc-800 transition duration-200 ${
          gameOver ? 'scale-95 opacity-70' : 'scale-100 opacity-100'
        }`}
        style={{
          width: BOARD_SIZE,
          height: BOARD_SIZE,
          transformOrigin: 'center',
          willChange: 'opacity, transform',
          backfaceVisibility: 'hidden',
        }}
      >
        <AnimatePresence initial={false}>
          {tiles.map((tile) => (
            <Tile key={tile.id} tile={tile} />
          ))}
        </AnimatePresence>
        
      </TileContainer>

      <AnimatePresence>
        {gameOver && (
          <MotionButton
            style={{
              position: 'absolute',
              willChange: 'transform, opacity',
              transitionProperty: 'background-color, color',
              transitionDuration: '200ms',
            }}
            key="gameover-button"
            size="lg"
            variant="secondary"
            onClick={newGame}
            initial={{ y: BOARD_SIZE + 40, opacity: 0 }}
            animate={{ y: BOARD_SIZE, opacity: 1 }}
            exit={{ y: BOARD_SIZE + 40, opacity: 0 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="mx-auto mt-4"
          >
            Try again
          </MotionButton>
        )}
      </AnimatePresence>
    </>
  );
}
