import { Card } from "@/components/ui/card";
import { TypographyCard } from "@/components/ui/typography";
import Image from "next/image";

const table = [
  [0,0,0,0],
  [0,0,0,0],
  [0,0,2,0],
  [0,0,0,0]
]

export default function Home() {
  return (
    <div className="w-full h-full flex justify-center mt-[100px]">
      <Card className="w-[600px] h-[600px] grid grid-cols-4 grid-rows-4 p-4 gap-4 bg-slate-100">
        {table.flat().map((value, index) => (
          value !== 0 ? (
            <Card key={index} className="bg-white flex items-center justify-center rounded-xs">
            <TypographyCard>{value}</TypographyCard>
          </Card>
          ) : (
            <Card key={index} className="rounded-xs">
          </Card>
          )
        ))}
      </Card>
    </div>
  );
}
