import { SiteHeader } from "@/components/sections/site-header";
import { ActHero } from "@/components/sections/act-hero";
import { ActProblemStandards } from "@/components/sections/act-problem-standards";
import { ActPipelineScrollytelling } from "@/components/sections/act-pipeline-scrollytelling";
import { ActArchitectureScope } from "@/components/sections/act-architecture-scope";
import { ActTeamProfiles } from "@/components/sections/act-team-profiles";
import { ActFooterCta } from "@/components/sections/act-footer-cta";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-paper text-obsidian selection:bg-vermillion selection:text-paper">
      <SiteHeader />
      <main>
        <ActHero />
        <ActProblemStandards />
        <ActPipelineScrollytelling />
        <ActArchitectureScope />
        <ActTeamProfiles />
      </main>
      <ActFooterCta />
    </div>
  );
}
