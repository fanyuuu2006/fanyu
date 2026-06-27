"use client";
import Link from "next/link";
import Image from "next/image";

export const HeroSection = () => {
  return (
    <section className="h-screen">
      <div className="container h-full flex flex-col items-center justify-center gap-6">
        <div className="w-full flex justify-between items-end">
          <h1 className="text-[clamp(3rem,6vw,8rem)] text-nowrap font-bold leading-tight tracking-tight">
            <span>我是</span>
            <span className="text-transparent bg-clip-text bg-linear-to-r from-(--primary) to-(--secondary)">
              飯魚
            </span>
          </h1>
          <Link
            href="/#aboutMe"
            className="size-32 md:size-48 lg:size-64 shrink-0 rounded-full overflow-hidden border-2 border-(--primary) hover:drop-shadow-[0_0_1rem_var(--primary)] transition-all duration-300"
          >
            <Image
              src="/images/fanyu.jpg"
              alt="個人照片"
              className="w-full h-full object-cover"
              width={256}
              height={256}
            />
          </Link>
        </div>
        <div className="w-full flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <span className="max-w-2xl text-base sm:text-xl md:text-2xl text-(--muted) leading-relaxed">
            熱愛程式設計與實作開發，專注於前端技術，喜歡將想法透過程式一步步實現，並在學習與創作中持續成長。
          </span>
          <div className="shrink-0 w-full sm:w-auto flex items-center justify-center gap-4 sm:gap-6">
            <Link
              href="/#contact"
              className="btn primary shrink-0 font-bold px-8 py-3 text-xl sm:text-2xl rounded-full text-center"
            >
              聯繫我
            </Link>
            <Link
              href="/portfolio"
              className="btn secondary shrink-0 font-bold px-8 py-3 text-xl sm:text-2xl rounded-full text-center"
            >
              作品集
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};
