"use client";
import { MainSection } from "@/components/projects/[title]/MainSection";
import { deslugify } from "@/utils/url";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface PageProps {
  params: Promise<{ title: string }>;
}

export default function Page({ params }: PageProps) {
  const [title, setTitle] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    params.then((res) => {
      if (res.title) {
        setTitle(deslugify(res.title));
      } else {
        router.replace("/projects");
      }
    });
  }, [params, router]);

  if (!title) return null;

  return <MainSection title={title} />;
}
