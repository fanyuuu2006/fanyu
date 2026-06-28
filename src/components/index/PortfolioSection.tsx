import { portfolioItems } from "@/libs/portfolio";
import { Carousel } from "../Carousel";
import { MySection } from "./MySection";
import { PortfolioCard } from "./PortfolioCard";
import Link from "next/link";

export const PortfolioSection = () => {
  return (
    <MySection id="portfolio" title="作品集">
      <Carousel duration={portfolioItems.length * 2500}>
        {portfolioItems.map((item) => (
          <PortfolioCard
            key={item.title}
            item={item}
            className="m-2 size-50 md:size-56 shrink-0"
          />
        ))}
      </Carousel>
      <div className="w-full flex justify-center mt-4">
        <Link
          href="/portfolio"
          className="btn primary font-bold px-4 py-2 text-sm md:text-base rounded-full text-center"
        >
          查看更多
        </Link>
      </div>
    </MySection>
  );
};
