import { Direction } from '@/lib/types';
import { useEffect } from 'react';

export const useKeyboardInput = (onMove: (direction: Direction) => void) => {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      // Support both arrow keys and gamer-favorite WASD controls.
      switch (event.key.toLowerCase()) {
        case 'arrowup':
        case 'w':
          event.preventDefault();
          onMove(Direction.Up);
          break;
        case 'arrowdown':
        case 's':
          event.preventDefault();
          onMove(Direction.Down);
          break;
        case 'arrowleft':
        case 'a':
          event.preventDefault();
          onMove(Direction.Left);
          break;
        case 'arrowright':
        case 'd':
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
