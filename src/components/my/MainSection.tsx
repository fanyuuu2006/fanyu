"use client";
import { useLanguage } from "@/context/LanguageContext";
import { profile } from "@/lib/profile";
import { LanguageContent, LanguageOption } from "@/types/language";
import { LoadingOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { TimeUnit } from "./TimeUnit";

type MyContent = Record<
  "birthdayTimer" | "days" | "hours" | "minutes" | "seconds",
  string
>;

const getMyContent = (language: LanguageOption): MyContent =>
  ((
    {
      chinese: {
        birthdayTimer: "生日倒計時",
        days: "天",
        hours: "時",
        minutes: "分",
        seconds: "秒",
      },
      english: {
        birthdayTimer: "Birthday Timer",
        days: "Days",
        hours: "Hours",
        minutes: "Minutes",
        seconds: "Seconds",
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
    <section id="hero">
      <div className="container flex flex-col items-center justify-center min-h-162">
        {timeLeft ? (
          <div className="card flex flex-col gap-2 items-center px-8 py-4 brightness-[var(--brightness-light)]">
            <span className="title font-bold">{myContent.birthdayTimer}</span>
            <div className="flex gap-2 items-end label">
              <TimeUnit
                label={myContent.days}
                value={timeLeft.days}
                maxLength={3}
              />
              :
              <TimeUnit
                label={myContent.hours}
                value={timeLeft.hours}
                maxLength={2}
              />
              :
              <TimeUnit
                label={myContent.minutes}
                value={timeLeft.minutes}
                maxLength={2}
              />
              :
              <TimeUnit
                label={myContent.seconds}
                value={timeLeft.seconds}
                maxLength={2}
              />
            </div>
          </div>
        ) : (
          <LoadingOutlined className="label" />
        )}
      </div>
    </section>
  );
};
