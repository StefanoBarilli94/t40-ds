import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { ArrowLeft } from "lucide-react";

import { cn } from "../../lib/utils";

export interface PageHeaderProps extends Omit<React.ComponentProps<"header">, "title"> {
  title: React.ReactNode;
  /** Collegamento dell'app con un testo che indica dove si torna. */
  back?: React.ReactElement<{ children?: React.ReactNode }>;
  aside?: React.ReactNode;
  action?: React.ReactNode;
}

const PageHeader = React.forwardRef<HTMLElement, PageHeaderProps>(
  ({ title, back, aside, action, className, ...props }, ref) => (
    <header ref={ref} data-slot="page-header" className={cn("space-y-2", className)} {...props}>
      {back && (
        <Slot className="inline-flex min-h-11 items-center gap-2 px-1 text-sm font-medium text-primary-text underline-offset-4 hover:underline md:min-h-9">
          {React.cloneElement(back, {
            children: <><ArrowLeft aria-hidden="true" className="size-4 shrink-0" />{back.props.children}</>,
          })}
        </Slot>
      )}
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div className="flex min-w-0 flex-wrap items-center gap-x-3 gap-y-1">
          <h1 className="min-w-0 break-words text-lg font-bold sm:text-xl lg:text-2xl">{title}</h1>
          {aside}
        </div>
        {action && <div className="grid md:shrink-0">{action}</div>}
      </div>
    </header>
  ),
);
PageHeader.displayName = "PageHeader";

export { PageHeader };
