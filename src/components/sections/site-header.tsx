"use client";

import React from "react";
import { useScroll, useTransform } from "motion/react";
import * as m from "motion/react-m";
import { ArrowUpRight, ShieldAlert } from "lucide-react";

const NAV_ITEMS = [
  { label: "DIGITAL TWIN", href: "#act-hero" },
  { label: "STANDARDS", href: "#act-standards" },
  { label: "PIPELINE", href: "#act-pipeline" },
  { label: "SIMULATOR", href: "#act-simulator" },
  { label: "ARCHITECTURE", href: "#act-architecture" },
];

export function SiteHeader() {
  const { scrollYProgress } = useScroll();
  const progressScaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <header className="fixed top-0 inset-x-0 z-50 border-b border-hairline-dark bg-obsidian/95 backdrop-blur-md text-paper">
      <div className="mx-auto max-w-[1440px] px-4 sm:px-8 h-14 flex items-center justify-between">
        {/* Left Brand Identifier */}
        <a
          href="#act-hero"
          className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] font-semibold group"
        >
          <span className="inline-flex h-6 w-6 items-center justify-center bg-vermillion text-paper font-bold chamfer-sm">
            <ShieldAlert className="h-3.5 w-3.5" />
          </span>
          <span>NASIR</span>
        </a>

        {/* Center Section Jump Links */}
        <nav
          aria-label="Primary Sections"
          className="hidden lg:flex items-center gap-7 h-full"
        >
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="py-1 font-mono text-[11px] uppercase tracking-[0.14em] text-steel-light hover:text-paper transition-colors"
            >
              <span>{item.label}</span>
            </a>
          ))}
        </nav>

        {/* Right External Repository Action */}
        <div className="flex items-center gap-3">
          <a
            href="https://github.com/ZimrionVarethos/pertamuda"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 border border-vermillion bg-vermillion px-3.5 py-1.5 font-mono text-[11px] font-semibold uppercase tracking-[0.14em] text-paper hover:bg-vermillion-dim chamfer-tr"
          >
            <span>SOURCE REPO</span>
            <ArrowUpRight className="h-3.5 w-3.5" />
          </a>
        </div>
      </div>

      {/* Scroll Progress Hairline Driven by Motion useScroll + useTransform */}
      <div className="h-[2px] w-full bg-hairline-dark overflow-hidden">
        <m.div
          style={{ scaleX: progressScaleX, transformOrigin: "0% 50%" }}
          className="h-full w-full bg-vermillion"
        />
      </div>
    </header>
  );
}
