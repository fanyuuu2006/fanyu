import { githubBadges } from "@/lib/github";
import { GitHubBadgeItem, RepoString } from "@/types/github";

export const getGithubBadgeSrcs = (repo: RepoString): GitHubBadgeItem[] => {
  return githubBadges.map((badge) => ({
    title: badge,
    url: `https://img.shields.io/github/${badge
      .toLowerCase()
      .replace(" ", "-")}/${repo}.svg?style=flat-square`,
  }));
};
