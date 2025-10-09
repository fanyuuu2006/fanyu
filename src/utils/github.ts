import { githubBadges } from "@/libs/github";
import { GitHubBadgeItem, RepoString } from "@/types/github";

// Badge 配置映射，包含更好的樣式和顏色
const badgeConfig: Record<
  string,
  { endpoint: string; color?: string; logo?: string }
> = {
  License: {
    endpoint: "license",
    color: "blue",
    logo: "github",
  },
  Stars: {
    endpoint: "stars",
    color: "yellow",
    logo: "star",
  },
  Forks: {
    endpoint: "forks",
    color: "blue",
    logo: "git-fork",
  },
  Issues: {
    endpoint: "issues",
    color: "red",
    logo: "issue-opened",
  },
  "Last commit": {
    endpoint: "last-commit",
    color: "green",
    logo: "git-commit",
  },
  "Created at": {
    endpoint: "created-at",
    color: "lightgrey",
    logo: "calendar",
  },
  "Repo size": {
    endpoint: "repo-size",
    color: "orange",
    logo: "database",
  },
  "Commit Activity/y": {
    endpoint: "commit-activity/y",
    color: "brightgreen",
    logo: "activity",
  },
  "Languages/top": {
    endpoint: "languages/top",
    color: "blueviolet",
    logo: "code",
  },
};

export const getGithubBadgeSrcs = (repo: RepoString): GitHubBadgeItem[] => {
  return githubBadges.map((badge) => {
    const config = badgeConfig[badge];
    if (!config) {
      // 備用方案：使用原本的邏輯
      return {
        title: badge,
        url: `https://img.shields.io/github/${badge
          .toLowerCase()
          .replace(" ", "-")}/${repo}.svg?style=for-the-badge`,
      };
    }

    // 構建 URL 參數
    const params = new URLSearchParams({
      style: "for-the-badge", // 使用更現代的樣式
      color: config.color || "blue",
      ...(config.logo && { logo: config.logo }),
      logoColor: "white",
    });

    return {
      title: badge,
      url: `https://img.shields.io/github/${
        config.endpoint
      }/${repo}.svg?${params.toString()}`,
    };
  });
};

// 提供不同樣式選項的函數
export const getGithubBadgeSrcsWithStyle = (
  repo: RepoString,
  style:
    | "flat"
    | "flat-square"
    | "for-the-badge"
    | "plastic"
    | "social" = "for-the-badge"
): GitHubBadgeItem[] => {
  return githubBadges.map((badge) => {
    const config = badgeConfig[badge];
    if (!config) {
      return {
        title: badge,
        url: `https://img.shields.io/github/${badge
          .toLowerCase()
          .replace(" ", "-")}/${repo}.svg?style=${style}`,
      };
    }

    const params = new URLSearchParams({
      style,
      color: config.color || "blue",
      ...(config.logo && { logo: config.logo }),
      logoColor: "white",
    });

    return {
      title: badge,
      url: `https://img.shields.io/github/${
        config.endpoint
      }/${repo}.svg?${params.toString()}`,
    };
  });
};
