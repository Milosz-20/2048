'use client';

import { Tile } from '@/components/tile';
import { TileContainer } from '@/components/TileContainer';
import { BOARD_SIZE, GRID_SIZE } from '@/lib/game-config';
import { createInitialState, move } from '@/lib/game-utils';
import { Direction, GameState } from '@/lib/types';
import { useEffect, useState } from 'react';

export default function Home() {
  const [state, setState] = useState<GameState>(() =>
    createInitialState(GRID_SIZE)
  );

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      let direction: Direction | null = null;

      switch (event.key) {
        case 'ArrowLeft':
          direction = Direction.Left;
          break;
        case 'ArrowRight':
          direction = Direction.Right;
          break;
        case 'ArrowUp':
          direction = Direction.Up;
          break;
        case 'ArrowDown':
          direction = Direction.Down;
          break;
        default:
          return;
      }

      if (direction) {
        event.preventDefault();
        setState((prevState) => move(prevState, direction!));
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <div className="w-full h-full flex justify-center mt-[100px]">
      <TileContainer
        className="bg-orange-100"
        style={{
          width: BOARD_SIZE,
          height: BOARD_SIZE,
        }}
      >
        {state.tiles.map((tile) => (
          <Tile
            key={tile.id}
            tile={{
              id: tile.id,
              value: tile.value,
              row: tile.row,
              col: tile.col,
            }}
          />
        ))}
      </TileContainer>
    </div>
  );
}
