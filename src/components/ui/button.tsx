import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-mono text-xs uppercase tracking-[0.14em] font-semibold focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vermillion disabled:pointer-events-none disabled:opacity-40 cursor-pointer select-none",
  {
    variants: {
      variant: {
        vermillion:
          "bg-vermillion text-paper border border-vermillion hover:bg-vermillion-dim chamfer-tr",
        obsidian:
          "bg-obsidian text-paper border border-obsidian hover:bg-obsidian-surface chamfer-tr",
        outlineLight:
          "bg-transparent text-obsidian border border-obsidian hover:bg-obsidian hover:text-paper",
        outlineDark:
          "bg-transparent text-paper border border-hairline-dark hover:border-vermillion hover:text-vermillion",
        ghost:
          "bg-transparent text-current hover:text-vermillion",
      },
      size: {
        default: "h-11 px-5 py-2.5",
        sm: "h-8 px-3.5 py-1.5 text-[11px]",
        lg: "h-12 px-7 py-3 text-xs",
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "vermillion",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";
