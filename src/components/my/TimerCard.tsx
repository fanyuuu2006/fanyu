import { OverrideProps } from "fanyucomponents";
import { LanguageContent, LanguageOption } from "@/types/language";
import { useLanguage } from "@/contexts/LanguageContext";
import React, { useState, useEffect, useMemo } from "react";
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

type TimeUnitProps = OverrideProps<
  React.HTMLAttributes<HTMLDivElement>,
  { value: number; maxLength: number; label: string }
>;

const TimeUnit = ({
  value,
  maxLength,
  className,
  label,
  ...rest
}: TimeUnitProps) => (
  <div className={`${className ?? "flex flex-col items-center"} `} {...rest}>
    <span style={{ fontSize: "0.5em" }}>{label}</span>
    <span className="font-bold bg-[var(--background-color)] p-2 rounded-lg">
      {value.toString().padStart(maxLength, "0")}
    </span>
  </div>
);

export const TimerCard = () => {
  const Language = useLanguage();
  const timerContent = getTimerContent(Language.Current);

  const nextBirthday = useMemo(() => {
    const today = new Date();
    const birthday = new Date(profile.birthday);
    birthday.setFullYear(today.getFullYear());
    if (today > birthday) birthday.setFullYear(today.getFullYear() + 1);
    return birthday;
  }, []);

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
    <div className="card flex flex-col gap-2 items-center p-8">
      <h1 className="text-5xl font-bold">{timerContent.birthdayTimer}</h1>
      {timeLeft ? (
        <div className="flex gap-2 items-end text-4xl">
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
        <LoadingOutlined className="text-4xl" />
      )}
    </div>
  );
};
