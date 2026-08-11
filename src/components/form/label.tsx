"use client";

import * as React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "../../lib/utils";

const labelVariants = cva(
  // text-sm md:text-xs — 14px mobile, 12px desktop (issue #29: su desktop le
  // label pesavano troppo, grandi quanto il valore che etichettano).
  //
  // Perche' qui si puo' scendere sotto i 16px e nei campi no: la soglia dei
  // 16px serve a non far zoomare Safari iOS quando l'utente mette a fuoco un
  // campo. Una label non e' focusabile, non ha mai fatto scattare quello zoom.
  // La #21 le aveva uniformate ai campi per coerenza visiva, ma quel vincolo
  // tecnico non le riguardava: la label e' secondaria rispetto al dato
  // inserito e puo' stare un gradino sotto.
  //
  // font-medium resta: a 12px il peso serve a tenerla leggibile.
  "text-sm md:text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
);

const Label = React.forwardRef<
  React.ElementRef<typeof LabelPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof LabelPrimitive.Root> & VariantProps<typeof labelVariants>
>(({ className, ...props }, ref) => (
  <LabelPrimitive.Root ref={ref} className={cn(labelVariants(), className)} {...props} />
));
Label.displayName = LabelPrimitive.Root.displayName;

export { Label };
