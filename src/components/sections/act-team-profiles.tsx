"use client";

import React from "react";
import * as m from "motion/react-m";
import { ArrowUpRight } from "lucide-react";
import { NASIR_TEAM_MEMBERS } from "@/data/nasir-content";
import { ScrambleText } from "@/components/ui/scramble-text";

export function ActTeamProfiles() {
  return (
    <section
      id="act-team"
      className="relative w-full border-b border-obsidian bg-paper text-obsidian"
    >
      <div className="section-pad">
        {/* Section Heading */}
        <div className="max-w-4xl mb-16 lg:mb-24">
          <h2 className="type-section-header text-obsidian mb-6">
            THE INTEGRITY TEAM
          </h2>
          <p className="type-body text-steel">
            Developed by software engineering researchers from Sekolah Vokasi
            IPB University for Pertamuda Seed &amp; Scale 2026.
          </p>
        </div>

        {/* 3 Team Member Portrait Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {NASIR_TEAM_MEMBERS.map((member, idx) => (
            <m.a
              key={member.id}
              href={member.portfolioUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.45, delay: idx * 0.1 }}
              whileHover={{ y: -6 }}
              className="group flex flex-col justify-between border border-obsidian bg-paper p-6 sm:p-8 chamfer-tr hover:border-vermillion transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vermillion"
            >
              {/* Individual Portrait Frame (Architectural Silhouette Placeholder) */}
              <div className="relative aspect-[4/5] w-full mb-8 bg-obsidian text-paper overflow-hidden flex flex-col items-center justify-center chamfer-sm border border-hairline-dark">
                {/* Geometric Grid Background */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 opacity-20 pointer-events-none"
                  style={{
                    backgroundImage:
                      "linear-gradient(#F4F4F0 1px, transparent 1px), linear-gradient(90deg, #F4F4F0 1px, transparent 1px)",
                    backgroundSize: "24px 24px",
                  }}
                />

                {/* Technical Corner Crosshairs */}
                <span className="absolute top-3 left-3 font-mono text-[9px] text-vermillion">
                  +
                </span>
                <span className="absolute top-3 right-3 font-mono text-[9px] text-vermillion">
                  +
                </span>
                <span className="absolute bottom-3 left-3 font-mono text-[9px] text-vermillion">
                  +
                </span>
                <span className="absolute bottom-3 right-3 font-mono text-[9px] text-vermillion">
                  +
                </span>

                {/* Large Monogram Silhouette */}
                <div className="font-sans font-black text-5xl sm:text-6xl text-paper/85 tracking-tighter group-hover:text-vermillion group-hover:scale-105 transition-all">
                  {member.initials}
                </div>

                <div className="absolute bottom-4 inset-x-4 text-center font-mono text-[10px] uppercase tracking-[0.16em] text-steel-light">
                  ENGINEERING CAD FRAME
                </div>
              </div>

              {/* Member Metadata */}
              <div>
                <h3 className="type-title text-obsidian group-hover:text-vermillion transition-colors mb-2">
                  <ScrambleText text={member.name} />
                </h3>
                <p className="type-body text-steel text-sm sm:text-base mb-6">
                  {member.role}
                </p>
              </div>

              {/* Action Button */}
              <div className="pt-4 border-t border-hairline-light flex items-center justify-between type-action text-obsidian group-hover:text-vermillion transition-colors">
                <span>{member.portfolioLabel}</span>
                <ArrowUpRight className="h-4 w-4" />
              </div>
            </m.a>
          ))}
        </div>
      </div>
    </section>
  );
}
