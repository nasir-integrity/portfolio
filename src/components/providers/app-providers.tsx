"use client";

import React from "react";
import { ReactLenis } from "lenis/react";
import { LazyMotion, MotionConfig, domAnimation } from "motion/react";

interface AppProvidersProps {
  children: React.ReactNode;
}

export function AppProviders({ children }: AppProvidersProps) {
  return (
    <MotionConfig
      reducedMotion="user"
      transition={{
        duration: 0.55,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <LazyMotion features={domAnimation} strict>
        <ReactLenis
          root
          options={{
            lerp: 0.09,
            duration: 1.15,
            smoothWheel: true,
            anchors: true,
            respectReducedMotion: true,
          }}
        >
          {children}
        </ReactLenis>
      </LazyMotion>
    </MotionConfig>
  );
}
