import * as React from "react";

import { cn } from "../../lib/utils";

/** Riquadro decorativo per un'icona già descritta dal testo accanto. */
export const IconTile = React.forwardRef<HTMLSpanElement, React.ComponentPropsWithoutRef<"span">>(
  ({ className, ...props }, ref) => (
    <span
      {...props}
      ref={ref}
      data-slot="icon-tile"
      aria-hidden="true"
      className={cn("flex size-10 shrink-0 items-center justify-center bg-muted text-foreground [&>svg]:size-5", className)}
    />
  ),
);
IconTile.displayName = "IconTile";
