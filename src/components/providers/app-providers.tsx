"use client";

import React, { useEffect } from "react";
import { ReactLenis, useLenis } from "lenis/react";
import { LazyMotion, MotionConfig, domAnimation } from "motion/react";
import { SiteLoader } from "@/components/ui/site-loader";

interface AppProvidersProps {
  children: React.ReactNode;
}

function ScrollResetOnMount() {
  const lenis = useLenis();

  useEffect(() => {
    if (typeof window !== "undefined") {
      if ("scrollRestoration" in history) {
        history.scrollRestoration = "manual";
      }
      window.scrollTo(0, 0);
    }
  }, []);

  useEffect(() => {
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    }
  }, [lenis]);

  return null;
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
        <SiteLoader />
        <ReactLenis
          root
          options={{
            lerp: 0.09,
            duration: 1.15,
            smoothWheel: true,
            anchors: false,
            respectReducedMotion: true,
          }}
        >
          <ScrollResetOnMount />
          {children}
        </ReactLenis>
      </LazyMotion>
    </MotionConfig>
  );
}
