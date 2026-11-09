import { SiteHeader } from "@/components/sections/site-header";
import { ActHero } from "@/components/sections/act-hero";
import { ActProblemStandards } from "@/components/sections/act-problem-standards";
import { ActPipelineScrollytelling } from "@/components/sections/act-pipeline-scrollytelling";
import { ActRiskSimulator } from "@/components/sections/act-risk-simulator";
import { ActArchitectureScope } from "@/components/sections/act-architecture-scope";
import { ActFooterCta } from "@/components/sections/act-footer-cta";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-paper text-obsidian selection:bg-vermillion selection:text-paper">
      <SiteHeader />
      <main>
        <ActHero />
        <ActProblemStandards />
        <ActPipelineScrollytelling />
        <ActRiskSimulator />
        <ActArchitectureScope />
      </main>
      <ActFooterCta />
    </div>
  );
}
