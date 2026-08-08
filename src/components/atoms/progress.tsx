"use client";

import * as React from "react";
import * as ProgressPrimitive from "@radix-ui/react-progress";

import { cn } from "../../lib/utils";

export interface ProgressProps extends React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> {
  /**
   * Classe per l'indicatore (la parte riempita), separata da `className`
   * (che governa il binario/track). Serve a chi ricolora la barra intera per
   * un contesto specifico — vedi `PageLoader`'s `inverted`.
   */
  indicatorClassName?: string;
}

const Progress = React.forwardRef<React.ElementRef<typeof ProgressPrimitive.Root>, ProgressProps>(
  ({ className, indicatorClassName, value, ...props }, ref) => (
    <ProgressPrimitive.Root
      ref={ref}
      value={value}
      className={cn("relative h-2 w-full overflow-hidden rounded-full bg-primary/20", className)}
      {...props}
    >
      <ProgressPrimitive.Indicator
        className={cn(
          "h-full w-full flex-1 bg-primary",
          // value=null/undefined -> Radix marca data-state="indeterminate":
          // niente percentuale nota, quindi niente translateX proporzionale —
          // la barra riempie in loop invece di restare ferma o sparire dietro
          // translateX(-100%) (che succedeva prima: `value || 0` trattava
          // l'assenza di value come 0%, cioe' indicatore invisibile).
          value == null
            ? "origin-left animate-progress-fill"
            : "origin-left transition-transform",
          indicatorClassName,
        )}
        style={value == null ? undefined : { transform: `translateX(-${100 - value}%)` }}
      />
    </ProgressPrimitive.Root>
  ),
);
Progress.displayName = ProgressPrimitive.Root.displayName;

export { Progress };
