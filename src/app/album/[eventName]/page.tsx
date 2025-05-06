"use client";
import { MainSection } from "@/components/album/[eventName]/MainSection";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { deslugify } from "@/utils/url";

interface PageProps {
  params: Promise<{ eventName: string }>;
}

export default function Page({ params }: PageProps) {
  const [eventName, setEventName] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    params.then((res) => {
      if (res.eventName) {
        setEventName(deslugify(res.eventName));
      } else {
        router.replace("/album"); // 沒有 eventName 就跳轉
      }
    });
  }, [params, router]);

  if (!eventName) return null; // 或顯示 loading 中的畫面

  return <MainSection eventName={eventName} />;
}
