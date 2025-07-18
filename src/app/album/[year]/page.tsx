"use client";
import { deslugify } from "@/utils/url";
import { LoadingOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

interface PageProps {
  params: Promise<{ year: string }>;
}

export default function Page({ params }: PageProps) {
  const router = useRouter();

  useEffect(() => {
    params.then((res) => {
      router.replace(`/album/#${deslugify(res.year)}`);
    });
  }, [params, router]);

  return (
    <div className="container">
      <div className="flex">
        <LoadingOutlined className="text-5xl mx-auto" />
      </div>
    </div>
  );
}
