import { PortfolioItem } from "@/types";
import { cn } from "@/utils/className";
import { getGithubRepoLanguages } from "@/utils/github";
import { Suspense, use } from "react";

const calculatePercentage = (
  size: number,
  totalSize: number,
  digits = 2,
): number => {
  if (totalSize === 0) return 0;

  return Number(((size / totalSize) * 100).toFixed(digits));
};

type GitHubLanguagesDivProps = React.HTMLAttributes<HTMLDivElement> & {
  item: PortfolioItem;
};

export const GitHubLanguagesDiv = ({
  item,
  className,
  ...rest
}: GitHubLanguagesDivProps) => {
  const repo = item.github?.repo;
  if (!repo) return null;

  const languagesPromise = getGithubRepoLanguages(repo);
  return (
    <div className={cn(className)} {...rest}>
      <Suspense fallback={<LanguagesSkeleton />}>
        <LanguagesContent languagesPromise={languagesPromise} />
      </Suspense>
    </div>
  );
};

type LanguagesContentProps = {
  languagesPromise: ReturnType<typeof getGithubRepoLanguages>;
};
const LanguagesContent = ({ languagesPromise }: LanguagesContentProps) => {
  const languages = use(languagesPromise);
  const totalSize = languages.reduce((acc, lang) => acc + lang.size, 0);
  return (
    <div className="flex flex-col gap-2">
      {/* Progress bar */}
      <span
        role="progressbar"
        className="flex h-2 w-full rounded overflow-hidden"
      >
        {languages.map((language) => {
          const percentage = calculatePercentage(language.size, totalSize, 1);
          return (
            <span
              key={language.language}
              className="h-full"
              style={{
                width: `${percentage}%`,
                backgroundColor: language.color || "var(--muted)",
              }}
            />
          );
        })}
      </span>
      <ul>
        {languages.map((language) => {
          const percentage = calculatePercentage(language.size, totalSize, 1);
          return (
            <li key={language.language} className="inline">
              <div
                className="inline-flex items-center mr-4"
                title={`${language.language}: ${percentage}%`}
              >
                <span
                  className="w-2 h-2 mr-2 rounded-full shrink-0"
                  style={{ backgroundColor: language.color || "var(--muted)" }}
                />
                <span className="text-sm font-medium mr-1">
                  {language.language}
                </span>
                <span className="text-xs text-(--muted)">{percentage}%</span>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

const LanguagesSkeleton = () => {
  return (
    <div className="space-y-2">
      {/* progress bar skeleton */}
      <span className="flex h-2 w-full overflow-hidden rounded">
        <span className="skeleton w-full" />
      </span>

      {/* tags skeleton */}
      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="skeleton h-5 w-20 rounded" />
        ))}
      </div>
    </div>
  );
};
