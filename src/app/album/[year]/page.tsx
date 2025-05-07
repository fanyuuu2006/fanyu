"use client";
import { MainSection } from "@/components/album/MainSection";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { deslugify } from "@/utils/url";

interface PageProps {
  params: Promise<{ year: string }>;
}

export default function Page({ params }: PageProps) {
  const [year, setYear] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    params.then((res) => {
      if (res.year) {
        setYear(deslugify(res.year));
      } else {
        router.replace("/album"); // 沒有 year 就跳轉
      }
    });
  }, [params, router]);

  if (!year) return null;
  return <MainSection year={year} />;
}
