import {
  GRID_SIZE,
  TILE_GAP,
  TILE_PADDING,
  TILE_SIZE,
} from '@/lib/game-config';
import { cn } from '@/lib/utils';
import * as React from 'react';

export function TileContainer({
  className,
  children,
  ...props
}: React.ComponentProps<'div'>) {
  const backgroundTiles = React.useMemo(() => {
    return Array.from({ length: GRID_SIZE * GRID_SIZE }, (_, index) => {
      const row = Math.floor(index / GRID_SIZE);
      const col = index % GRID_SIZE;

      return (
        <div
          key={`background-tile-${index}`}
          aria-hidden
          className="absolute pointer-events-none"
          style={{
            width: TILE_SIZE,
            height: TILE_SIZE,
            left: col * (TILE_SIZE + TILE_GAP) + TILE_GAP,
            top: row * (TILE_SIZE + TILE_GAP) + TILE_GAP,
            padding: TILE_PADDING,
            zIndex: 0,
          }}
        >
          <div className="h-full w-full rounded-xs bg-slate-200/80 dark:bg-zinc-700/80" />
        </div>
      );
    });
  }, []);

  return (
    <div
      data-slot="card"
      className={cn(
        'text-card-foreground flex flex-col gap-6 rounded-sm shadow-sm relative',
        className
      )}
      {...props}
    >
      <div className="absolute inset-0 pointer-events-none" aria-hidden>
        {backgroundTiles}
      </div>
      {children}
    </div>
  );
}
