import { LanguageContent, LanguageOption } from "@/types/language";
import { TimeUnit } from "./TimeUnit";
import { useLanguage } from "@/context/LanguageContext";
import { useState, useEffect } from "react";
import { profile } from "@/libs/profile";
import { LoadingOutlined } from "@ant-design/icons";

type TimerContent = Record<
  "birthdayTimer" | "days" | "hours" | "minutes" | "seconds",
  string
>;

const getTimerContent = (language: LanguageOption): TimerContent =>
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
    } as LanguageContent<TimerContent>
  )[language]);

export const TimerCard = () => {
  const Language = useLanguage();
  const timerContent = getTimerContent(Language.Current);

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
    <div className="card flex flex-col gap-2 items-center px-8 py-4">
      <h1 className="title font-bold">{timerContent.birthdayTimer}</h1>
      {timeLeft ? (
        <div className="flex gap-2 items-end label">
          <TimeUnit
            label={timerContent.days}
            value={timeLeft.days}
            maxLength={3}
          />
          :
          <TimeUnit
            label={timerContent.hours}
            value={timeLeft.hours}
            maxLength={2}
          />
          :
          <TimeUnit
            label={timerContent.minutes}
            value={timeLeft.minutes}
            maxLength={2}
          />
          :
          <TimeUnit
            label={timerContent.seconds}
            value={timeLeft.seconds}
            maxLength={2}
          />
        </div>
      ) : (
        <LoadingOutlined className="label" />
      )}
    </div>
  );
};
