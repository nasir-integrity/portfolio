"use client";

import React from "react";

export function ActFooterCta() {
  return (
    <footer
      id="act-footer"
      className="relative w-full bg-obsidian text-paper overflow-hidden select-none pt-24 sm:pt-36 lg:pt-52 flex items-end justify-center"
    >
      {/* Giant Edge-to-Edge Abruptly Cropped Brand Typography */}
      <div className="w-full text-center leading-none overflow-hidden">
        <span
          className="inline-block font-sans font-black text-[27vw] tracking-[-0.08em] leading-[0.70] text-paper translate-y-[22%] transition-colors duration-500 hover:text-vermillion pointer-events-auto cursor-default"
          style={{
            willChange: "transform",
          }}
        >
          NASIR
        </span>
      </div>
    </footer>
  );
}
