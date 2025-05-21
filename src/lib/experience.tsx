import {
  LuBriefcase,
  LuGraduationCap,
  LuTrophy,
  LuUsers,
} from "react-icons/lu";
import { ExperienceItem, ExperienceTab } from "../types/experience";

import { NTUST_BGC } from "./club";
import { NTUST, CPSHS, FGJH, GSES } from "./education";
import { HXL, LFV, KNSH, LFR } from "./work";
import { PDAO } from "./competition";

export const experienceTabs = [
  "education",
  "club",
  "work",
  "competition",
] as const;

export const experienceTabIcons: Record<ExperienceTab, React.ReactNode> = {
  education: <LuGraduationCap />,
  club: <LuUsers />,
  work: <LuBriefcase />,
  competition: <LuTrophy />,
};

export const experience: Record<ExperienceTab, ExperienceItem[]> = {
  education: [NTUST, CPSHS, FGJH, GSES],
  club: [NTUST_BGC],
  work: [HXL, LFV, KNSH, LFR],
  competition: [PDAO],
};
