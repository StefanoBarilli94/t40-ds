import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "../../lib/utils";

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, value, defaultValue, ...props }, ref) => {
  // Radix richiede un Thumb per ogni valore (slider "range" con più maniglie).
  // aria-label/aria-labelledby passati sul Root NON arrivano automaticamente al
  // Thumb (che è l'elemento con role="slider"): li propaghiamo esplicitamente.
  const thumbCount = (value ?? defaultValue ?? [0]).length;
  const ariaLabel = props["aria-label"];
  const ariaLabelledBy = props["aria-labelledby"];

  return (
    <SliderPrimitive.Root
      ref={ref}
      value={value}
      defaultValue={defaultValue}
      className={cn("relative flex w-full touch-none select-none items-center", className)}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-1.5 w-full grow overflow-hidden rounded-full bg-primary/20">
        <SliderPrimitive.Range className="absolute h-full bg-primary" />
      </SliderPrimitive.Track>
      {Array.from({ length: thumbCount }, (_, i) => (
        <SliderPrimitive.Thumb
          key={i}
          aria-label={ariaLabel}
          aria-labelledby={ariaLabelledBy}
          className="block h-4 w-4 rounded-full border border-primary/50 bg-background shadow transition-colors data-[disabled]:pointer-events-none data-[disabled]:opacity-50"
        />
      ))}
    </SliderPrimitive.Root>
  );
});
Slider.displayName = SliderPrimitive.Root.displayName;

export { Slider };
