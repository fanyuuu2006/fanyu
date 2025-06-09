import { MainSection } from "@/components/album/[year]/[eventName]/MainSection";
import { deslugify, slugify } from "@/utils/url";
import { Metadata } from "next";
import React from "react";

interface PageProps {
  params: Promise<{ year: string; eventName: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { year: rawYear, eventName: rawEventName } = await params;
  const year = deslugify(rawYear);
  const eventName = deslugify(rawEventName);

  const title = `${year}-${eventName}`;
  return {
    title,
    description: `${year}-${eventName}`,
    openGraph: {
      title,
      description: `${year}-${eventName}`,
      url: `https://fanyu.vercel.app/album/${slugify(year)}/${slugify(
        eventName
      )}`,
      images: [
        `https://fanyu.vercel.app/api/album/${slugify(year)}/${slugify(
          eventName
        )}/0`,
      ],
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { year, eventName } = await params;
  return (
    <MainSection year={deslugify(year)} eventName={deslugify(eventName)} />
  );
}
