import {
  LuBriefcase,
  LuGraduationCap,
  LuTrophy,
  LuUsers,
} from "react-icons/lu";
import { ExperienceItem, ExperienceTab } from "../types/experience";

import * as club from "./club";
import * as education from "./education";
import * as work from "./work";
import * as competition from "./competition";

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
  education: Object.values(education),
  club: Object.values(club),
  work: Object.values(work),
  competition: Object.values(competition),
};
