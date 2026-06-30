"use client";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/utils/className";
import { motion } from "framer-motion";
import { fadeInItem, staggerContainer } from "@/libs/motion";

export const HeroSection = () => {
  return (
    <section className="h-screen">
      <div className="container h-full flex flex-col items-center justify-center gap-6">
        <div className="w-full flex justify-between items-end">
          <motion.h1
            variants={fadeInItem}
            initial="hiddenLeft"
            whileInView="show"
            viewport={{ once: true }}
            className="text-[clamp(3rem,6vw,8rem)] text-nowrap font-bold leading-tight tracking-tight"
          >
            <span>我是</span>
            <span className="text-transparent bg-clip-text bg-linear-to-r from-(--primary) to-(--secondary)">
              飯魚
            </span>
          </motion.h1>
          <Link href="/#aboutMe">
            <motion.div
              variants={fadeInItem}
              initial="hiddenRight"
              whileInView="show"
              className="size-32 md:size-48 lg:size-64 shrink-0 rounded-full overflow-hidden border-2 border-(--primary) hover:drop-shadow-[0_0_1rem_var(--primary)] transition-all duration-300"
            >
              <Image
                src="/images/fanyu.jpg"
                alt="個人照片"
                className="w-full h-full object-cover"
                width={256}
                height={256}
              />
            </motion.div>
          </Link>
        </div>
        <motion.div
          variants={staggerContainer}
          animate="show"
          initial="hiddenBottom"
          className="w-full flex flex-col items-center gap-8 sm:flex-row sm:justify-between"
        >
          <motion.span
            variants={fadeInItem}
            className="max-w-2xl text-base md:text-xl lg:text-2xl text-(--muted) leading-relaxed"
          >
            熱愛程式設計與實作開發，專注於前端技術，喜歡將想法透過程式一步步實現，並在學習與創作中持續成長。
          </motion.span>
          <motion.div
            variants={fadeInItem}
            className="shrink-0 w-full sm:w-auto flex items-center justify-center gap-4"
          >
            {[
              {
                href: "/#contact",
                label: "聯繫我",
                className: "btn primary",
              },
              {
                href: "/portfolio",
                label: "作品集",
                className: "btn secondary",
              },
            ].map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  `shrink-0 font-bold px-6 py-2 text-xl sm:text-2xl rounded-full text-center`,
                  link.className,
                )}
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};
