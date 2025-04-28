"use client";
import { PortfolioSection } from "@/components/portfolio/PortfolioSection";
import { useEffect, useState } from "react";
interface PageProps {
  params: Promise<{ index: string }>;
}

export default function Page({ params }: PageProps) {
  const [index, setIndex] = useState<string | null>(null);
  useEffect(() => {
    params.then((data) => {
      if ((data.index && data.index != "null") || data.index != "undefined")
        setIndex(data.index);
    });
  }, [params]);
  return <PortfolioSection index={index} />;
}
