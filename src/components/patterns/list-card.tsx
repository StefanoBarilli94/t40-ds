import * as React from "react";
import { Slot, Slottable } from "@radix-ui/react-slot";
import { ChevronRight } from "lucide-react";

import { cn } from "../../lib/utils";

export interface ListCardProps extends Omit<React.ComponentPropsWithoutRef<"a">, "title"> {
  /** Passa il collegamento del router come unico figlio. */
  asChild?: boolean;
  title: React.ReactNode;
  icon?: React.ReactNode;
  status?: React.ReactNode;
  statusPosition?: "before" | "after";
  detail?: React.ReactNode;
  secondaryDetail?: React.ReactNode;
}

/** Una scheda interamente cliccabile, con un solo collegamento. */
export const ListCard = React.forwardRef<HTMLAnchorElement, ListCardProps>(
  ({ asChild, className, title, icon, status, statusPosition = "before", detail, secondaryDetail, children, ...props }, ref) => {
    const Link = asChild ? Slot : "a";
    return (
      <Link
        {...props}
        ref={ref}
        data-slot="list-card"
        className={cn("flex h-full min-h-11 items-center gap-3 border border-border bg-card p-4 hover:bg-muted", className)}
      >
        {icon}
        <span className="grid min-w-0 flex-1 gap-1">
          {statusPosition === "before" && status && <span className="flex flex-wrap items-center gap-2">{status}</span>}
          <span className="break-words text-base font-semibold text-foreground">{title}</span>
          {statusPosition === "after" && status && <span className="flex flex-wrap items-center gap-2">{status}</span>}
          {detail && <span className="break-words text-sm text-foreground">{detail}</span>}
          {secondaryDetail && <span className="break-words text-sm text-muted-foreground">{secondaryDetail}</span>}
          {!asChild && children}
        </span>
        <ChevronRight aria-hidden="true" className="size-4 shrink-0 text-muted-foreground" />
        {asChild && <Slottable>{children}</Slottable>}
      </Link>
    );
  },
);
ListCard.displayName = "ListCard";
