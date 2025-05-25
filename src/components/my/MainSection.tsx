"use client";
import { useLanguage } from "@/context/LanguageContext";
import { profile } from "@/lib/profile";
import { LanguageContent, LanguageOption } from "@/types/language";
import { LoadingOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { TimeUnit } from "./TimeUnit";

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
    <section id="hero">
      <div className="container flex flex-col items-center justify-center min-h-screen">
        {timeLeft ? (
          <div className="card label font-bold flex flex-col gap-2 items-center p-4 brightness-[var(--brightness-light)]">
            <span className="title font-bold">{myContent.birthdayTimer}</span>
            <div className="flex gap-2 ">
              <TimeUnit value={timeLeft.days} maxLength={3} />
              :
              <TimeUnit value={timeLeft.hours} maxLength={2} />
              :
              <TimeUnit value={timeLeft.minutes} maxLength={2} />
              :
              <TimeUnit value={timeLeft.seconds} maxLength={2} />
            </div>
          </div>
        ) : (
          <LoadingOutlined className="label" />
        )}
      </div>
    </section>
  );
};
