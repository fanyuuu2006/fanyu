import { GiscusSection } from "@/components/guestbook/GiscusSection";
import { HeadingSection } from "@/components/HeadingSection";

export default function Guestbook() {
  return (
    <>
      <HeadingSection
        title="留言板"
        description="在飯魚的留言板分享您的想法和建議。"
      />
      <GiscusSection />
    </>
  );
}
