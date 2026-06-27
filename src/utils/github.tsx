import { RepoString } from "@/types";

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

function createBadgeUrl(repo: RepoString, config: BadgeConfig): string {
  const params = new URLSearchParams({
    ...DEFAULT_BADGE_OPTIONS,
    ...(config.color && { color: config.color }),
    ...(config.logo && { logo: config.logo }),
    ...config.params,
  });

  const url = `https://img.shields.io/github/${config.endpoint}/${repo}.svg?${params}`;

  return url;
}

export function getGithubBadgeSrcs(repo: RepoString) {
  return Object.entries(badgeConfig).map(([title, config]) => ({
    title: title as GithubBadge,
    url: createBadgeUrl(repo, config),
  }));
}

/**
 * 嘗試從 GitHub raw 取得 README.md 內容
 * 自動偵測 BOM 並以正確編碼解碼（UTF-16LE / UTF-16BE / UTF-8）
 *
 * @param repo - "owner/repo" 格式的字串
 * @returns 解碼後的 README 字串，或 null（找不到 / 內容無效）
 */
export const getGithubReadMe = async (
  repo: RepoString,
): Promise<string | null> => {
  const BRANCHES = ["main", "master"] as const;
  const MIN_LENGTH = 10;

  for (const branch of BRANCHES) {
    const url = `https://raw.githubusercontent.com/${repo}/${branch}/README.md`;

    try {
      const res = await fetch(url);

      if (!res.ok) continue;

      const buffer = await res.arrayBuffer();
      const bytes = new Uint8Array(buffer);

      // BOM 偵測：優先嘗試 UTF-16，fallback 到 UTF-8
      const encoding =
        bytes[0] === 0xff && bytes[1] === 0xfe
          ? "utf-16le"
          : bytes[0] === 0xfe && bytes[1] === 0xff
            ? "utf-16be"
            : "utf-8";

      const text = new TextDecoder(encoding).decode(bytes).trim();

      if (text.length >= MIN_LENGTH) return text;
    } catch {
      // 網路錯誤或解碼失敗，嘗試下一個 branch
      continue;
    }
  }

  return null;
};

export const isExternal = (url: string) => /^(https?:\/\/|mailto:|#)/.test(url);

export const toGithubUrl = (repo: RepoString, path: string) => {
  if (isExternal(path)) return path;

  const cleanRepo = repo.replace(/\/$/, "");

  const base = `https://github.com/${cleanRepo}/raw/main/`;

  // 這裡會正確處理 ./ ../ foo/bar
  return new URL(path, base).toString();
};
export const transformMarkdownLinks = (content: string, repo: RepoString) => {
  // Markdown []()
  content = content.replace(
    /(!?\[[^\]]*]\()([^)]+)(\))/g,
    (_, before, href, after) => `${before}${toGithubUrl(repo, href)}${after}`,
  );

  // HTML src=""
  content = content.replace(
    /(src\s*=\s*["'])([^"']+)(["'])/gi,
    (_, before, href, after) => `${before}${toGithubUrl(repo, href)}${after}`,
  );

  // HTML href=""
  content = content.replace(
    /(href\s*=\s*["'])([^"']+)(["'])/gi,
    (_, before, href, after) => `${before}${toGithubUrl(repo, href)}${after}`,
  );

  return content;
};
