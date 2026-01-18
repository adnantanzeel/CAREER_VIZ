import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva,  VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-lg text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground shadow-lg shadow-primary/25 hover:shadow-primary/40 hover:scale-[1.02] active:scale-[0.98]",
        destructive: "bg-destructive text-destructive-foreground shadow-lg shadow-destructive/25 hover:shadow-destructive/40 hover:scale-[1.02]",
        outline: "border border-primary/50 bg-transparent text-primary hover:bg-primary/10 hover:border-primary hover:shadow-[0_0_20px_rgba(0,245,212,0.2)]",
        secondary: "bg-secondary text-secondary-foreground shadow-lg shadow-secondary/25 hover:shadow-secondary/40 hover:scale-[1.02]",
        ghost: "text-foreground/80 hover:text-primary hover:bg-primary/5",
        link: "text-primary underline-offset-4 hover:underline",
        neon: "bg-gradient-to-r from-primary to-secondary text-primary-foreground shadow-[0_0_30px_rgba(0,245,212,0.4)] hover:shadow-[0_0_50px_rgba(0,245,212,0.6)] hover:scale-[1.03] active:scale-[0.98] font-display tracking-wide",
        glass: "bg-white/5 backdrop-blur-md border border-white/10 text-foreground hover:bg-white/10 hover:border-primary/30 hover:shadow-[0_0_20px_rgba(0,245,212,0.15)]",
        hero: "relative overflow-hidden bg-gradient-to-r from-primary to-secondary text-primary-foreground px-8 py-4 text-base font-display tracking-wider shadow-[0_0_40px_rgba(0,245,212,0.5)] hover:shadow-[0_0_60px_rgba(0,245,212,0.7)] hover:scale-[1.05] active:scale-[0.98]",
        admin: "bg-accent/20 border border-accent/50 text-accent hover:bg-accent/30 hover:border-accent hover:shadow-[0_0_20px_rgba(167,139,250,0.3)]",
      },
      size: {
        default: "h-10 px-5 py-2",
        sm: "h-9 rounded-md px-4",
        lg: "h-12 rounded-lg px-8 text-base",
        xl: "h-14 rounded-xl px-10 text-lg",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  },
);

function Button({ className, variant, size, asChild = false, ...props }) {
  const Comp = asChild ? Slot : "button";
  return <Comp className={cn(buttonVariants({ variant, size, className }))} {...props} />;
}
Button.displayName = "Button";

export { Button, buttonVariants };




