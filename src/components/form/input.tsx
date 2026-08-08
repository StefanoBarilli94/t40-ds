import * as React from "react";

import { cn } from "../../lib/utils";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          // bg-card (bianco), non bg-background: un campo form è una superficie
          // sopra la pagina, deve distinguersi da ciò che lo circonda — non
          // fondersi quando il contenitore intorno usa già --background.
          "flex h-9 w-full rounded-md border border-input bg-card px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground [&::-webkit-calendar-picker-indicator]:ml-auto disabled:cursor-not-allowed disabled:opacity-50 disabled:bg-muted md:text-sm",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

export { Input };
