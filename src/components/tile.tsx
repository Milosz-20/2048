'use client'
import * as React from "react"
import { Tile as TileType } from "@/app/page";
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react";
interface TileProps extends React.ComponentProps<"div"> {
  tile: TileType;
}

const tileWidth = 150;

function Tile({ className, tile, ...props }: TileProps) {
    const [position, setPosition] = useState({left: 0, top: 0})

    useEffect(()=>{
        const x = tile.col * tileWidth;
        const y = tile.row * tileWidth;
         setPosition({left: x, top: y})
    }, [tile])

  return (
    <div className="p-2 w-[150px] h-[150px] absolute" style={{ left: position.left, top: position.top }}>
        <div
            data-slot="card"
            className={cn(
            "bg-red-400 text-card-foreground h-[100%] w-[100%] flex rounded-xl border ",
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
