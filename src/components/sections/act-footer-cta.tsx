"use client";

import React from "react";
import * as m from "motion/react-m";
import { ArrowUpRight, Code2, GitFork, ShieldAlert, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { NASIR_TEAM_MEMBERS } from "@/data/nasir-content";

export function ActFooterCta() {
  return (
    <footer
      id="act-cta"
      className="relative w-full bg-obsidian text-paper bg-blueprint-dark"
    >
      <div className="mx-auto max-w-[1440px] border-x border-hairline-dark">
        {/* NASIR Integrity Team Interactive Portfolio Strip */}
        <div className="border-b border-hairline-dark p-6 sm:p-10 lg:p-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
            <div>
              <h2 className="font-mono text-2xl sm:text-3xl font-bold uppercase tracking-tight text-paper">
                NASIR INTEGRITY TEAM
              </h2>
              <p className="font-sans text-xs sm:text-sm text-steel-light mt-1.5">
                Software Engineering Technology — Vocational School of IPB
                University
              </p>
            </div>
            <div className="inline-flex items-center gap-2 border border-hairline-dark bg-obsidian-elevated px-3.5 py-2 font-mono text-[11px] uppercase tracking-[0.14em] text-steel-light">
              <Users className="h-3.5 w-3.5 text-vermillion" />
              <span>SELECT ENGINEER TO OPEN INDIVIDUAL PORTFOLIO</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {NASIR_TEAM_MEMBERS.map((member, idx) => (
              <m.a
                key={member.id}
                href={member.portfolioUrl}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                whileHover={{ y: -4 }}
                className="group relative flex flex-col justify-between border border-hairline-dark bg-obsidian-elevated p-6 chamfer-tr hover:border-vermillion focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vermillion"
              >
                <span
                  aria-hidden="true"
                  className="pointer-events-none absolute top-0 left-0 h-2 w-2 bg-vermillion"
                />

                <div>
                  <div className="flex items-center justify-between border-b border-hairline-dark pb-3 mb-4 font-mono text-[10px] uppercase tracking-[0.16em]">
                    <span className="text-vermillion font-bold">
                      {member.code}
                    </span>
                    <span className="inline-flex items-center gap-1 text-steel-light group-hover:text-vermillion">
                      <span>{member.portfolioLabel}</span>
                      <ArrowUpRight className="h-3.5 w-3.5" />
                    </span>
                  </div>

                  <h3 className="font-mono text-lg sm:text-xl font-bold uppercase tracking-tight text-paper group-hover:text-vermillion">
                    {member.name}
                  </h3>

                  <p className="font-mono text-xs text-paper/90 mt-1">
                    {member.program}
                  </p>
                  <p className="font-sans text-xs text-steel-light mt-0.5">
                    {member.institution}
                  </p>
                </div>

                <div className="mt-6 pt-3 border-t border-hairline-dark flex items-center justify-between font-mono text-[10px] uppercase tracking-[0.12em] text-steel-light">
                  <span className="truncate">{member.focusArea}</span>
                  <span className="h-1.5 w-1.5 bg-vermillion shrink-0" />
                </div>
              </m.a>
            ))}
          </div>
        </div>

        {/* Main Enterprise Evaluation & Repository Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-hairline-dark border-b border-hairline-dark">
          {/* Left 8 Columns */}
          <div className="lg:col-span-8 p-6 sm:p-12 lg:p-16">
            <h2 className="font-mono text-3xl sm:text-5xl font-bold uppercase tracking-tight leading-[1.06] text-paper mb-6">
              DEPLOY TRACEABLE INTEGRITY &amp; EMISSIONS TELEMETRY.
            </h2>

            <p className="font-sans text-sm sm:text-base text-steel-light max-w-2xl leading-relaxed mb-8">
              Evaluate NASIR for upstream and midstream facility deployment.
              Inspect the complete platform codebase—including the Laravel 13
              domain services, Pest PHP formula verification suite, Inertia +
              React 19 operational dashboards, and Three.js spatial inspectors.
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
