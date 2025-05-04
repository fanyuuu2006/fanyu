import { useLanguage } from "@/context/LanguageContext";
import { profile } from "@/lib/profile";
import { LanguageContent, LanguageOption } from "@/types/language";
import { ClubCard } from "./ClubCard";

type ClubContent = Record<"club", string>;

const getClubContent = (language: LanguageOption): ClubContent =>
  ((
    {
      chinese: {
        club: "社團",
      },
      english: {
        club: "Club",
      },
    } as LanguageContent<ClubContent>
  )[language]);

export type ClubDivProps = React.HTMLAttributes<HTMLDivElement>;

export const ClubDiv = ({ className, ...rest }: ClubDivProps) => {
  const Language = useLanguage();
  const ClubContent = getClubContent(Language.Current);

  return (
    <div
      className={`${className ?? ""} flex flex-col w-full items-start gap-4`}
      {...rest}
    >
      <div className="content font-bold ">{ClubContent.club}</div>
      <div className='flex flex-col w-full "gap-4'>
        {profile.experience.club.map((item) => (
          <ClubCard key={item.name.english} item={item} />
        ))}
      </div>
    </div>
  );
};
