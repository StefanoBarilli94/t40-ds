import * as React from "react";
import { Slot } from "@radix-ui/react-slot";

import { cn } from "../../lib/utils";
import type { BottomNavBadgeProps, BottomNavItemProps } from "./bottom-nav";

const TopNav = React.forwardRef<HTMLElement, React.ComponentProps<"nav">>(
  ({ className, "aria-label": label = "Navigazione principale", ...props }, ref) => (
    <nav ref={ref} data-sidebar="top-nav" aria-label={label}
      className={cn("hidden min-w-0 items-stretch border-b border-sidebar-border bg-sidebar px-3 text-sidebar-foreground md:flex lg:px-6", className)}
      {...props}
    />
  ),
);
TopNav.displayName = "TopNav";

const TopNavBrand = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
  ({ className, ...props }, ref) => (
    <div ref={ref} data-slot="top-nav-brand" className={cn("mr-2 flex shrink-0 items-center gap-2 lg:mr-4", className)} {...props} />
  ),
);
TopNavBrand.displayName = "TopNavBrand";

const TopNavItem = React.forwardRef<HTMLButtonElement, BottomNavItemProps>(
  ({ asChild = false, isActive = false, className, type, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp ref={ref} type={asChild ? undefined : type ?? "button"} data-sidebar="top-nav-button"
        aria-current={isActive ? "page" : undefined}
        className={cn(
          "flex h-11 min-w-0 items-center gap-1.5 border-b-2 border-transparent px-2 text-sm font-medium -outline-offset-2 md:h-9 lg:gap-2 lg:px-3",
          "hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
          "aria-[current=page]:border-sidebar-primary aria-[current=page]:bg-sidebar-accent aria-[current=page]:font-semibold aria-[current=page]:text-sidebar-accent-foreground",
          "[&>span:not([data-sidebar])]:truncate [&>svg]:size-4 [&>svg]:shrink-0",
          className,
        )}
        {...props}
      />
    );
  },
);
TopNavItem.displayName = "TopNavItem";

const TopNavBadge = React.forwardRef<HTMLSpanElement, BottomNavBadgeProps>(
  ({ className, children, label, ...props }, ref) => (
    <span ref={ref} data-sidebar="top-nav-badge"
      className={cn("relative shrink-0 bg-sidebar-primary px-1.5 text-xs font-semibold tabular-nums text-sidebar-primary-foreground", className)}
      {...props}
    >
      <span aria-hidden="true">{children}</span>
      <span className="sr-only">{label}</span>
    </span>
  ),
);
TopNavBadge.displayName = "TopNavBadge";

const TopNavEnd = React.forwardRef<HTMLDivElement, React.ComponentProps<"div">>(
  ({ className, ...props }, ref) => (
    <div ref={ref} data-slot="top-nav-end" className={cn("ml-auto flex shrink-0 items-center gap-2 pl-2", className)} {...props} />
  ),
);
TopNavEnd.displayName = "TopNavEnd";

export { TopNav, TopNavBrand, TopNavItem, TopNavBadge, TopNavEnd };
