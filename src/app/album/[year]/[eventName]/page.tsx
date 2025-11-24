import { MainSection } from "@/components/album/[year]/[eventName]/MainSection";
import * as album from "@/utils/album";
import { deslugify } from "@/utils/url";
import React from "react";

interface PageProps {
  params: Promise<{ year: string; eventName: string }>;
}

export default async function Page({ params }: PageProps) {
  const { year, eventName } = await params;
  const items = await album.items(deslugify(year), deslugify(eventName));
  return (
    <MainSection
      year={deslugify(year)}
      event={{
        name: deslugify(eventName),
        items,
      }}
    />
  );
}
