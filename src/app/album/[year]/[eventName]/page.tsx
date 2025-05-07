"use client";
import { MainSection } from "@/components/album/[year]/[eventName]/MainSection";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { deslugify, slugify } from "@/utils/url";

interface PageProps {
  params: Promise<{ year: string; eventName: string }>;
}

export default function Page({ params }: PageProps) {
  const [year, setYear] = useState<string | null>(null);
  const [eventName, setEventName] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    params.then(({ year: rawYear, eventName: rawEvent }) => {
      if (!rawYear) return router.replace("/album");

      const cleanYear = deslugify(rawYear);
      setYear(cleanYear);

      if (!rawEvent) {
        router.replace(`/album/${slugify(rawYear)}`);
        return;
      }

      setEventName(deslugify(rawEvent));
    });
  }, [params, router]);

  if (!year || !eventName) return null;

  return <MainSection year={year} eventName={eventName} />;
}
