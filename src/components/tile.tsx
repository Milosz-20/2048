'use client'
import * as React from "react"

import { cn } from "@/lib/utils"
import { useEffect, useState } from "react";
import { TILE_SIZE, TILE_GAP, TILE_PADDING, TILE_COLORS, TILE_TEXT_COLORS } from "@/lib/game-config";
import { Tile as TileType} from "@/lib/types";

interface TileProps extends React.ComponentProps<"div"> {
  tile: TileType;
}

function Tile({ className, tile, ...props }: TileProps) {
    const [position, setPosition] = useState({left: 0, top: 0})

    useEffect(()=>{
        const x = tile.col * (TILE_SIZE + TILE_GAP) + TILE_GAP;
        const y = tile.row * (TILE_SIZE + TILE_GAP) + TILE_GAP;
         setPosition({left: x, top: y})
    }, [tile])

    const tileColor = TILE_COLORS[tile.value] || 'bg-gray-400';
    const textColor = TILE_TEXT_COLORS[tile.value] || 'text-white';

  return (
    <div 
      className="absolute" 
      style={{ 
        left: position.left, 
        top: position.top,
        width: TILE_SIZE,
        height: TILE_SIZE,
        padding: TILE_PADDING
      }}
    >
        <div
            data-slot="card"
            className={cn(
            tileColor + " " + textColor + " h-full w-full flex items-center justify-center rounded-xl border font-bold text-2xl",
            className
            )}
            {...props}
        >
            {tile.value}
        </div>
    </div>
  )
}

export {
  Tile
}
