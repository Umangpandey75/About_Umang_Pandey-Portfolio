// ── Constants barrel export ───────────────────────────────────────────────────
// Usage: import { config, projects, skillCategories, journeyItems } from "@/constants"
// (Requires path alias. Without alias: from "../../constants")

export { config }                    from "./config";
export type { SiteConfig }           from "./config";

export { projects }                  from "./projects";
export type { TProject }             from "./projects";

export { skillCategories }           from "./skills";
export type { SkillCategory }        from "./skills";

export { journeyItems }              from "./journey";
export type { JourneyItem, JourneyType } from "./journey";
