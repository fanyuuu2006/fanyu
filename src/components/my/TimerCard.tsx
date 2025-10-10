import { OverrideProps } from "fanyucomponents";
import { LanguageContent, LanguageOption } from "@/types/language";
import { useLanguage } from "@/contexts/LanguageContext";
import React, { useState, useEffect, useMemo } from "react";
import { profile } from "@/libs/profile";
import { LoadingOutlined } from "@ant-design/icons";

type TimerContent = Record<
  "birthdayTimer" | "days" | "hours" | "minutes" | "seconds" | "loading",
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
        loading: "載入中",
      },
      english: {
        birthdayTimer: "Birthday Timer",
        days: "Days",
        hours: "Hours",
        minutes: "Minutes",
        seconds: "Seconds",
        loading: "Loading",
      },
    } as LanguageContent<TimerContent>
  )[language]);

type TimeUnitProps = OverrideProps<
  React.HTMLAttributes<HTMLDivElement>,
  {
    value: number; // 時間值（數字）
    maxLength: number; // 顯示的最大位數（用於補零）
    label: string; // 時間單位標籤（如：天、時、分、秒）
  }
>;

/**
 * 時間單位組件 - 顯示單個時間單位的數值和標籤
 * 包含一個上方的標籤和下方的數值卡片
 *
 * @param value - 要顯示的時間數值
 * @param maxLength - 數值的最大位數，不足時補零
 * @param className - 自定義 CSS 類別名稱
 * @param label - 時間單位的標籤文字
 * @param rest - 其他 HTML div 屬性
 */
const TimeUnit = ({
  value,
  maxLength,
  className,
  label,
  ...rest
}: TimeUnitProps) => (
  <div
    className={`${className ?? "flex flex-col items-center gap-2"} `}
    {...rest}
  >
    {/* 時間單位標籤 - 顯示在數值上方 */}
    <span className="text-xs sm:text-sm md:text-base lg:text-lg xl:text-xl text-[var(--text-color-muted)] font-medium uppercase tracking-wider">
      {label}
    </span>
    {/* 時間數值卡片 - 帶有背景、邊框和陰影效果 */}
    <div className="bg-[var(--background-color-tertiary)] border border-[var(--border-color)] rounded-xl px-3 py-2 sm:px-4 sm:py-3 md:px-6 md:py-4">
      {/* 數值文字 - 使用等寬字體確保對齊，並補零顯示 */}
      <span className="font-mono font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl text-[var(--text-color)] tabular-nums">
        {value.toString().padStart(maxLength, "0")}
      </span>
    </div>
  </div>
);

/**
 * 生日倒計時卡片組件
 * 顯示距離下一個生日還有多少天、小時、分鐘和秒數
 * 支援中英文切換，響應式設計，包含載入狀態和實時更新
 */
export const TimerCard = () => {
  // 獲取當前語言設定
  const Language = useLanguage();
  // 根據當前語言獲取對應的文字內容
  const timerContent = getTimerContent(Language.Current);

  /**
   * 計算下一個生日的日期
   * 使用 useMemo 避免重複計算，提升性能
   */
  const nextBirthday = useMemo(() => {
    const today = new Date();
    const birthday = new Date(profile.birthday);

    // 設置生日為今年
    birthday.setFullYear(today.getFullYear());

    // 如果今年的生日已經過了，則計算明年的生日
    if (today > birthday) birthday.setFullYear(today.getFullYear() + 1);

    return birthday;
  }, []);

  /**
   * 剩餘時間的狀態
   * 包含天、小時、分鐘、秒數，初始值為 null 表示載入中
   */
  const [timeLeft, setTimeLeft] = useState<{
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
  } | null>(null);

  /**
   * 設置定時器，每秒更新倒計時
   * 計算距離下一個生日的剩餘時間
   */
  useEffect(() => {
    const timer = setInterval(() => {
      // 計算剩餘毫秒數
      const rest = nextBirthday.getTime() - Date.now();

      // 將毫秒轉換為天、小時、分鐘、秒
      setTimeLeft({
        days: Math.floor(rest / (1000 * 60 * 60 * 24)), // 天數
        hours: Math.floor((rest / (1000 * 60 * 60)) % 24), // 小時（24小時制）
        minutes: Math.floor((rest / 1000 / 60) % 60), // 分鐘（60分鐘制）
        seconds: Math.floor((rest / 1000) % 60), // 秒數（60秒制）
      });
    }, 1000); // 每秒更新一次

    // 清理定時器，避免記憶體洩漏
    return () => {
      clearInterval(timer);
    };
  }, [nextBirthday]);

  return (
    // 主要卡片容器 - 使用全域 card 樣式，響應式間距和最大寬度
    <div className="card flex flex-col gap-6 md:gap-8 items-center p-6 md:p-8 lg:p-10 max-w-4xl mx-auto">
      {/* 標題區域 - 顯示倒計時標題 */}
      <div className="text-center">
        {/* 主標題 - 使用漸層文字效果，響應式字體大小 */}
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-[var(--text-color-primary)] to-[var(--text-color-secondary)] bg-clip-text text-transparent leading-tight">
          {timerContent.birthdayTimer}
        </h1>
      </div>

      {/* 倒計時內容區域 - 根據載入狀態顯示不同內容 */}
      {timeLeft ? (
        // 倒計時顯示區域 - 使用 flexbox 佈局，響應式間距
        <div className="flex flex-wrap justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-10 items-center">
          {/* 天數時間單位 */}
          <TimeUnit
            label={timerContent.days}
            value={timeLeft.days}
            maxLength={3} // 天數最多顯示 3 位數（如：365）
          />

          {/* 分隔符號 - 在小螢幕隱藏以節省空間 */}
          <div className="text-[var(--text-color-muted)] text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light hidden sm:block">
            :
          </div>

          {/* 小時時間單位 */}
          <TimeUnit
            label={timerContent.hours}
            value={timeLeft.hours}
            maxLength={2} // 小時最多顯示 2 位數（如：23）
          />

          {/* 分隔符號 */}
          <div className="text-[var(--text-color-muted)] text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light hidden sm:block">
            :
          </div>

          {/* 分鐘時間單位 */}
          <TimeUnit
            label={timerContent.minutes}
            value={timeLeft.minutes}
            maxLength={2} // 分鐘最多顯示 2 位數（如：59）
          />

          {/* 分隔符號 */}
          <div className="text-[var(--text-color-muted)] text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light hidden sm:block">
            :
          </div>

          {/* 秒數時間單位 */}
          <TimeUnit
            label={timerContent.seconds}
            value={timeLeft.seconds}
            maxLength={2} // 秒數最多顯示 2 位數（如：59）
          />
        </div>
      ) : (
        // 載入狀態顯示區域 - 當時間資料尚未載入完成時顯示
        <div className="flex flex-col items-center gap-4">
          {/* 載入動畫圖示 - 使用 Ant Design 的載入圖示，帶有旋轉動畫 */}
          <LoadingOutlined className="text-4xl md:text-5xl lg:text-6xl text-[var(--text-color-primary)] animate-spin" />
          {/* 載入提示文字 */}
          <span className="text-sm md:text-base text-[var(--text-color-muted)] font-medium">
            {timerContent.loading}...
          </span>
        </div>
      )}
    </div>
  );
};
