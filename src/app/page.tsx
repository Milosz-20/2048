import { Tile } from "@/components/tile";
import { TileContainer } from "@/components/TileContainer";
import { Card } from "@/components/ui/card";
import { TypographyCard } from "@/components/ui/typography";
import Image from "next/image";
export type Tile = {
    id: number,
    row: number,
    col: number,
    value: number
  }

const tiles: Tile[] = [ 
  { id: 1, row: 0, col: 0, value: 2 },
  { id: 2, row: 2, col: 2, value: 4 }
]

export default function Home() {
  return (
    <div className="w-full h-full flex justify-center mt-[100px]">
      <TileContainer className="w-[600px] h-[600px] bg-orange-100">
        {tiles.map((tile, index) => (
          <Tile 
            key={tile.id} 
            tile={{
              id: tile.id,
              row: tile.row,
              col: tile.col,
              value: tile.value
            }} 
          />
        ))}
      </TileContainer>
    </div>
  );
}
