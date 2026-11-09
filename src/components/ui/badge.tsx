import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center gap-1.5 px-2.5 py-1 font-mono text-[10px] font-semibold uppercase tracking-[0.16em] border select-none",
  {
    variants: {
      variant: {
        vermillion:
          "border-vermillion bg-vermillion text-paper chamfer-sm",
        vermillionOutline:
          "border-vermillion bg-vermillion/10 text-vermillion",
        light:
          "border-obsidian bg-paper text-obsidian",
        dark:
          "border-hairline-dark bg-obsidian-surface text-paper",
        muted:
          "border-hairline-light bg-paper-muted text-steel",
      },
    },
    defaultVariants: {
      variant: "light",
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof badgeVariants> {}

export function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}
