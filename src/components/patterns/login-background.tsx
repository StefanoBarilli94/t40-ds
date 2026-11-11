import * as React from "react";

import { cn } from "../../lib/utils";

const motifs = {
  shifts: {
    width: 308,
    height: 172,
    artwork: (
      <>
        <g fill="currentColor" fillOpacity="0.13">
          <rect x="4" y="6" width="36" height="34" />
          <rect x="48" y="6" width="36" height="34" />
          <rect x="136" y="6" width="36" height="34" />
          <rect x="180" y="6" width="36" height="34" />
          <rect x="268" y="6" width="36" height="34" />
          <rect x="4" y="48" width="36" height="34" />
          <rect x="92" y="48" width="36" height="34" />
          <rect x="136" y="48" width="36" height="34" />
          <rect x="224" y="48" width="36" height="34" />
          <rect x="48" y="92" width="36" height="34" />
          <rect x="92" y="92" width="36" height="34" />
          <rect x="180" y="92" width="36" height="34" />
          <rect x="268" y="92" width="36" height="34" />
          <rect x="4" y="134" width="36" height="34" />
          <rect x="136" y="134" width="36" height="34" />
          <rect x="224" y="134" width="36" height="34" />
        </g>
        <g fill="none" stroke="currentColor" strokeOpacity="0.22">
          <rect x="92.5" y="6.5" width="35" height="33" />
          <rect x="224.5" y="6.5" width="35" height="33" />
          <rect x="48.5" y="48.5" width="35" height="33" />
          <rect x="180.5" y="48.5" width="35" height="33" />
          <rect x="268.5" y="48.5" width="35" height="33" />
          <rect x="4.5" y="92.5" width="35" height="33" />
          <rect x="136.5" y="92.5" width="35" height="33" />
          <rect x="224.5" y="92.5" width="35" height="33" />
          <rect x="48.5" y="134.5" width="35" height="33" />
          <rect x="92.5" y="134.5" width="35" height="33" />
          <rect x="180.5" y="134.5" width="35" height="33" />
          <rect x="268.5" y="134.5" width="35" height="33" />
        </g>
      </>
    ),
  },
  register: {
    width: 280,
    height: 132,
    artwork: (
      <>
        <g fill="currentColor" fillOpacity="0.16">
          <rect x="16" y="12" width="96" height="6" />
          <rect x="216" y="12" width="48" height="6" />
          <rect x="16" y="28" width="132" height="6" />
          <rect x="232" y="28" width="32" height="6" />
          <rect x="16" y="44" width="72" height="6" />
          <rect x="224" y="44" width="40" height="6" />
          <rect x="16" y="60" width="112" height="6" />
          <rect x="216" y="60" width="48" height="6" />
          <rect x="16" y="92" width="64" height="10" />
          <rect x="200" y="92" width="64" height="10" />
          <rect x="16" y="114" width="88" height="6" />
          <rect x="240" y="114" width="24" height="6" />
        </g>
        <line x1="16" y1="79.5" x2="264" y2="79.5" stroke="currentColor" strokeOpacity="0.28" strokeDasharray="4 4" />
      </>
    ),
  },
  months: {
    width: 336,
    height: 170,
    artwork: (
      <>
        <g fill="currentColor" fillOpacity="0.16">
          <rect x="8" y="98" width="20" height="62" />
          <rect x="36" y="78" width="20" height="82" />
          <rect x="64" y="110" width="20" height="50" />
          <rect x="92" y="62" width="20" height="98" />
          <rect x="120" y="88" width="20" height="72" />
          <rect x="148" y="46" width="20" height="114" />
          <rect x="176" y="70" width="20" height="90" />
          <rect x="204" y="30" width="20" height="130" />
          <rect x="232" y="84" width="20" height="76" />
          <rect x="260" y="56" width="20" height="104" />
          <rect x="288" y="102" width="20" height="58" />
          <rect x="316" y="40" width="20" height="120" />
        </g>
        <line x1="0" y1="160.5" x2="336" y2="160.5" stroke="currentColor" strokeOpacity="0.3" />
      </>
    ),
  },
};

export interface LoginBackgroundProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Mattonella decorativa da ripetere sul fondo della pagina. */
  motif: keyof typeof motifs;
}

/** Fondo a pagina intera. La scheda di accesso viene passata come children. */
export const LoginBackground = React.forwardRef<HTMLDivElement, LoginBackgroundProps>(
  ({ motif, className, children, ...props }, ref) => {
    const patternId = React.useId();
    const { width, height, artwork } = motifs[motif];

    return (
      <div
        ref={ref}
        className={cn("relative isolate flex min-h-dvh w-full items-center justify-center bg-sidebar", className)}
        {...props}
      >
        <svg aria-hidden="true" focusable="false" className="pointer-events-none absolute inset-0 -z-10 size-full text-primary">
          <defs>
            <pattern id={patternId} width={width} height={height} patternUnits="userSpaceOnUse">
              {artwork}
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill={`url("#${patternId}")`} />
        </svg>
        {children}
      </div>
    );
  },
);
LoginBackground.displayName = "LoginBackground";
