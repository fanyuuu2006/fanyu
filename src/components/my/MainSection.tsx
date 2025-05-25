"use client";
import { useLanguage } from "@/context/LanguageContext";
import { profile } from "@/lib/profile";
import { LanguageContent, LanguageOption } from "@/types/language";
import { LoadingOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";

type MyContent = Record<"birthdayTimer", string>;

const getMyContent = (language: LanguageOption): MyContent =>
  ((
    {
      chinese: {
        birthdayTimer: "生日倒計時",
      },
      english: {
        birthdayTimer: "Birthday Timer",
      },
    } as LanguageContent<MyContent>
  )[language]);

export const MainSection = () => {
  const Language = useLanguage();
  const myContent = getMyContent(Language.Current);

  const nextBirthday = (() => {
    const today = new Date();
    const birthday = new Date(profile.birthday);
    birthday.setFullYear(today.getFullYear());
    if (today > birthday) birthday.setFullYear(today.getFullYear() + 1);
    return birthday;
  })();

  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      const rest = nextBirthday.getTime() - Date.now();
      setTimeLeft({
        days: Math.floor(rest / (1000 * 60 * 60 * 24)),
        hours: Math.floor((rest / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((rest / 1000 / 60) % 60),
        seconds: Math.floor((rest / 1000) % 60),
      });
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [nextBirthday]);

  return (
    <section>
      <div className="container flex flex-col items-center">
        <span className="title font-bold">{myContent.birthdayTimer}</span>
        {timeLeft ? (
          <div className="card p-4">
            <span className="label font-bold">{`${timeLeft.days
              .toString()
              .padStart(3, "0")} : ${timeLeft.hours
              .toString()
              .padStart(2, "0")} : ${timeLeft.minutes
              .toString()
              .padStart(2, "0")} : ${timeLeft.seconds
              .toString()
              .padStart(2, "0")}`}</span>
          </div>
        ) : (
          <LoadingOutlined className="label" />
        )}
      </div>
    </section>
  );
};
