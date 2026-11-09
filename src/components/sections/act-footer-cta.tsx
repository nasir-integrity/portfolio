"use client";

import React from "react";
import { ArrowUpRight, Code2, GitFork, ShieldAlert } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function ActFooterCta() {
  return (
    <footer
      id="act-cta"
      className="relative w-full bg-obsidian text-paper bg-blueprint-dark"
    >
      <div className="mx-auto max-w-[1440px] border-x border-hairline-dark">
        {/* Main CTA Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-hairline-dark border-b border-hairline-dark">
          {/* Left 8 Columns */}
          <div className="lg:col-span-8 p-6 sm:p-12 lg:p-16">
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <Badge variant="vermillion">ACT VI // REPOSITORY &amp; PILOT ACCESS</Badge>
              <Badge variant="dark">OPEN SOURCE MIT LICENSE</Badge>
            </div>

            <h2 className="font-mono text-3xl sm:text-5xl font-bold uppercase tracking-tight leading-[1.06] text-paper mb-6">
              DEPLOY TRACEABLE INTEGRITY &amp; EMISSIONS TELEMETRY.
            </h2>

            <p className="font-sans text-sm sm:text-base text-steel-light max-w-2xl leading-relaxed mb-8">
              Explore the complete NASIR platform codebase—including the
              Laravel 13 domain services, Pest PHP formula verification suite,
              Inertia + React 19 operational dashboards, and Three.js spatial
              inspectors.
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <Button variant="vermillion" size="lg" asChild>
                <a
                  href="https://github.com/ZimrionVarethos/pertamuda"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GitFork className="h-4 w-4" />
                  <span>NASIR PLATFORM REPO (PERTAMUDA)</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </Button>

              <Button variant="outlineDark" size="lg" asChild>
                <a
                  href="https://github.com/nasir-integrity/portfolio"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Code2 className="h-4 w-4 text-vermillion" />
                  <span>PORTFOLIO REPOSITORY</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </Button>
            </div>
          </div>

          {/* Right 4 Columns: Demo Credentials & Quick Run Guide */}
          <div className="lg:col-span-4 p-6 sm:p-10 lg:p-12 bg-obsidian-elevated flex flex-col justify-between font-mono text-xs">
            <div>
              <div className="flex items-center justify-between border-b border-hairline-dark pb-3 mb-4 text-[10px] uppercase tracking-[0.16em] text-vermillion font-bold">
                <span>LOCAL MVP QUICKSTART</span>
                <span>PHP 8.2+ / NODE 22+</span>
              </div>

              <div className="space-y-2 bg-obsidian border border-hairline-dark p-4 text-[11px] text-paper overflow-x-auto">
                <div>
                  <span className="text-vermillion">$</span> git clone
                  https://github.com/ZimrionVarethos/pertamuda.git
                </div>
                <div>
                  <span className="text-vermillion">$</span> composer install
                  &amp;&amp; php artisan migrate --seed
                </div>
                <div>
                  <span className="text-vermillion">$</span> npm install &amp;&amp;
                  npm run build
                </div>
                <div>
                  <span className="text-vermillion">$</span> php artisan serve
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-hairline-dark space-y-1.5 text-[11px]">
              <div className="text-steel-light uppercase tracking-[0.14em] text-[10px]">
                DEMO SEED CREDENTIALS
              </div>
              <div className="text-paper">
                USER: <span className="text-vermillion">demo@nasir.id</span>
              </div>
              <div className="text-paper">
                PASS: <span className="text-vermillion">password</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Colophon Strip */}
        <div className="px-6 sm:px-10 py-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 font-mono text-[11px] text-steel-light">
          <div className="flex items-center gap-2.5">
            <span className="inline-flex h-5 w-5 items-center justify-center bg-vermillion text-paper">
              <ShieldAlert className="h-3 w-3" />
            </span>
            <span className="text-paper font-semibold">
              NASIR // NUSANTARA ASSET INTEGRITY &amp; RISK PLATFORM
            </span>
          </div>

          <div className="flex flex-wrap items-center gap-6">
            <a href="#act-hero" className="hover:text-vermillion">
              BACK TO TOP ↑
            </a>
            <span>NEXT.JS • MOTION • LENIS • R3F • TAILWIND V4</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
