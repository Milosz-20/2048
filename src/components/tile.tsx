'use client';
import * as React from 'react';

import {
  MOVE_ANIMATION_DURATION,
  TILE_ANIMATION_SCALE_EXIT,
  TILE_ANIMATION_SCALE_MERGED,
  TILE_ANIMATION_SCALE_NEW,
  TILE_ANIMATION_SCALE_NORMAL,
  TILE_COLORS,
  TILE_GAP,
  TILE_PADDING,
  TILE_SIZE,
  TILE_TEXT_COLORS,
} from '@/lib/game-config';
import { Tile as TileType } from '@/lib/types';
import { cn } from '@/lib/utils';
import { motion } from 'motion/react';
import { TypographyH1, TypographyH2, TypographyH3 } from './ui/typography';

interface TileProps extends React.ComponentProps<'div'> {
  tile: TileType;
}

export function Tile({ className, tile, ...props }: TileProps) {
  const position = {
    left: tile.col * (TILE_SIZE + TILE_GAP) + TILE_GAP,
    top: tile.row * (TILE_SIZE + TILE_GAP) + TILE_GAP,
  };

  const getScale = () => {
    if (tile.isNew) return TILE_ANIMATION_SCALE_NEW;
    if (tile.mergedFrom) return TILE_ANIMATION_SCALE_EXIT;
    return TILE_ANIMATION_SCALE_NORMAL;
  };

  const getZIndex = () => {
    if (tile.mergedFrom) return 20;
    if (tile.isMerging) return 10;
    return 1;
  };

  return (
    <motion.div
      key={tile.id}
      className="absolute"
      animate={{
        ...position,
        scale:
          tile.mergedFrom ?
            TILE_ANIMATION_SCALE_MERGED
          : TILE_ANIMATION_SCALE_NORMAL,
        opacity: 1,
      }}
      initial={{
        ...position,
        scale: getScale(),
        opacity: tile.isNew || tile.mergedFrom ? 0 : 1,
      }}
      exit={{ scale: TILE_ANIMATION_SCALE_EXIT, opacity: 0 }}
      transition={{
        duration: MOVE_ANIMATION_DURATION / 1000,
        ease: 'easeOut',
        delay: tile.mergedFrom ? MOVE_ANIMATION_DURATION / 1000 : 0,
      }}
      style={{
        width: TILE_SIZE,
        height: TILE_SIZE,
        padding: TILE_PADDING,
        zIndex: getZIndex(),
      }}
    >
      <div
        data-slot="card"
        className={cn(
          TILE_COLORS[tile.value] || 'bg-gray-400',
          TILE_TEXT_COLORS[tile.value] || 'text-white',
          'h-full w-full flex items-center justify-center rounded-xs border',
          className
        )}
        {...props}
      >
        <TypographyH2 className='p-0'>
          {tile.value}
        </TypographyH2>
      </div>
    </motion.div>
  );
}
