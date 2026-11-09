import * as React from "react";
import { cn } from "@/lib/utils";

interface ChamferCardProps extends React.HTMLAttributes<HTMLDivElement> {
  theme?: "light" | "dark";
  cut?: "tr" | "br" | "both" | "none";
  indexTag?: string;
  accentCorner?: boolean;
}

export function ChamferCard({
  className,
  theme = "light",
  cut = "tr",
  indexTag,
  accentCorner = true,
  children,
  ...props
}: ChamferCardProps) {
  const isDark = theme === "dark";

  return (
    <div
      className={cn(
        "relative border p-6 sm:p-8",
        isDark
          ? "border-hairline-dark bg-obsidian-elevated text-paper"
          : "border-obsidian bg-paper text-obsidian",
        cut === "tr" && "chamfer-tr",
        cut === "br" && "chamfer-br",
        cut === "both" && "chamfer-both",
        className
      )}
      {...props}
    >
      {accentCorner && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute top-0 left-0 h-2 w-2 bg-vermillion"
        />
      )}
      {indexTag && (
        <div
          className={cn(
            "mb-4 flex items-center justify-between border-b pb-2.5 font-mono text-[11px] uppercase tracking-[0.16em]",
            isDark
              ? "border-hairline-dark text-steel-light"
              : "border-hairline-light text-steel"
          )}
        >
          <span>{indexTag}</span>
          <span className="h-1.5 w-1.5 bg-vermillion" />
        </div>
      )}
      {children}
    </div>
  );
}
