import * as React from "react"
import { cn } from "@/lib/utils"


function TileContainer({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="card"
      className={cn(
        "bg-card text-card-foreground flex flex-col gap-6 rounded-xl border shadow-sm relative",
        className
      )}
      {...props}
    />
  )
}

export {
  TileContainer
}
