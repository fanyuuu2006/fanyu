type BadgeConfig = {
  endpoint: string;
  color?: string;
  logo?: string;
  params?: Record<string, string>;
};

const DEFAULT_BADGE_OPTIONS = {
  style: "for-the-badge",
  logoColor: "white",
} as const;

export const badgeConfig = {
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
} as const satisfies Record<string, BadgeConfig>;

export type GithubBadge = keyof typeof badgeConfig;

function createBadgeUrl(
  repo: `${string}/${string}`,
  config: BadgeConfig,
): string {
  const params = new URLSearchParams({
    ...DEFAULT_BADGE_OPTIONS,
    ...(config.color && { color: config.color }),
    ...(config.logo && { logo: config.logo }),
    ...config.params,
  });

  const url = `https://img.shields.io/github/${config.endpoint}/${repo}.svg?${params}`;

  return url;
}

export function getGithubBadgeSrcs(repo: `${string}/${string}`) {
  return Object.entries(badgeConfig).map(([title, config]) => ({
    title: title as GithubBadge,
    url: createBadgeUrl(repo, config),
  }));
}
