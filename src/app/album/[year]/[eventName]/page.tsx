import { MainSection } from "@/components/album/[year]/[eventName]/MainSection";
import { deslugify } from "@/utils/url";
import React from "react";

interface PageProps {
  params: Promise<{ year: string; eventName: string }>;
}


export default async function Page({ params }: PageProps) {
  const { year, eventName } = await params;
  return (
    <MainSection year={deslugify(year)} eventName={deslugify(eventName)} />
  );
}
