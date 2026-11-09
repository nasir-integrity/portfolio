import { SiteHeader } from "@/components/sections/site-header";
import { ActHero } from "@/components/sections/act-hero";
import { ActProblemStandards } from "@/components/sections/act-problem-standards";
import { ActPipelineScrollytelling } from "@/components/sections/act-pipeline-scrollytelling";
import { ActArchitectureScope } from "@/components/sections/act-architecture-scope";
import { ActTeamProfiles } from "@/components/sections/act-team-profiles";
import { ActFooterCta } from "@/components/sections/act-footer-cta";

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-obsidian text-obsidian selection:bg-vermillion selection:text-paper">
      <SiteHeader />
      <ActHero />
      {/* Sliding Curtain Container: Slides over the sticky hero */}
      <main className="relative z-10 bg-paper shadow-[0_-30px_70px_rgba(0,0,0,0.85)]">
        <ActProblemStandards />
        <ActPipelineScrollytelling />
        <ActArchitectureScope />
        <ActTeamProfiles />
      </main>
      <div className="relative z-10 bg-obsidian">
        <ActFooterCta />
      </div>
    </div>
  );
}
