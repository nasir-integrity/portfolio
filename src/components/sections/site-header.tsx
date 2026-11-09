"use client";

import React from "react";
import { useScroll, useTransform } from "motion/react";
import * as m from "motion/react-m";

export function SiteHeader() {
  const { scrollYProgress } = useScroll();
  const progressScaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <div
      role="progressbar"
      aria-label="Reading Progress"
      className="fixed top-0 inset-x-0 z-50 h-[3px] bg-hairline-dark/40 overflow-hidden pointer-events-none"
    >
      <m.div
        style={{ scaleX: progressScaleX, transformOrigin: "0% 50%" }}
        className="h-full w-full bg-vermillion"
      />
    </div>
  );
}
