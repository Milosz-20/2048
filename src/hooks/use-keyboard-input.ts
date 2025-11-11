import { Direction } from '@/lib/types';
import { useEffect } from 'react';

export const useKeyboardInput = (onMove: (direction: Direction) => void) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      switch (event.key) {
        case 'ArrowUp':
          event.preventDefault();
          onMove(Direction.Up);
          break;
        case 'ArrowDown':
          event.preventDefault();
          onMove(Direction.Down);
          break;
        case 'ArrowLeft':
          event.preventDefault();
          onMove(Direction.Left);
          break;
        case 'ArrowRight':
          event.preventDefault();
          onMove(Direction.Right);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onMove]);
};
