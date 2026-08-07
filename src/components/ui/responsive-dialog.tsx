import * as React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer";
import { cn } from "@/lib/utils";

interface ResponsiveDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
  className?: string;
}

export function ResponsiveDialog({ open, onOpenChange, children, className }: ResponsiveDialogProps) {
  const isMobile = useIsMobile();

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={onOpenChange}>
        <DrawerContent className={cn("max-h-[90vh]", className)}>
          <div className="overflow-y-auto px-4 pb-6">
            {children}
          </div>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className={className}>
        {children}
      </DialogContent>
    </Dialog>
  );
}

export function ResponsiveDialogHeader({ className, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const isMobile = useIsMobile();
  if (isMobile) return <DrawerHeader className={className} {...props} />;
  return <DialogHeader className={className} {...props} />;
}

export function ResponsiveDialogFooter({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  const isMobile = useIsMobile();
  if (isMobile) {
    return (
      <DrawerFooter className={cn("pb-safe", className)} {...props}>
        {children}
      </DrawerFooter>
    );
  }
  return <DialogFooter className={className} {...props}>{children}</DialogFooter>;
}

export function ResponsiveDialogTitle({ className, children, ...props }: React.HTMLAttributes<HTMLHeadingElement>) {
  const isMobile = useIsMobile();
  if (isMobile) return <DrawerTitle className={className} {...(props as any)}>{children}</DrawerTitle>;
  return <DialogTitle className={className} {...(props as any)}>{children}</DialogTitle>;
}

export function ResponsiveDialogDescription({ className, children, ...props }: React.HTMLAttributes<HTMLParagraphElement>) {
  const isMobile = useIsMobile();
  if (isMobile) return <DrawerDescription className={className} {...(props as any)}>{children}</DrawerDescription>;
  return <DialogDescription className={className} {...(props as any)}>{children}</DialogDescription>;
}
