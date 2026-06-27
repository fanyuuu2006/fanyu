"use client";
import { contactCategories } from "@/libs/contact";
import { MySection } from "./MySection";
import { ContactCard } from "./ContactCard";

export const ContactSection = () => {
  return (
    <MySection id="contact" title="聯絡方式">
      <ul className="text-(--foreground) w-full flex flex-col justify-center gap-6">
        {contactCategories.map((category) => (
          <li key={category.label}>
            <h3 className="flex items-center gap-2 text-2xl font-semibold text-(--foreground) mb-4">
              <span className="size-2 shrink-0 rounded-full bg-(--primary)" />
              {category.label}
              <div className="h-px w-12 rounded-full bg-linear-to-r from-(--secondary) to-transparent" />
            </h3>
            <div className="text-2xl flex flex-wrap items-center gap-2 p-4">
              {category.items.map((item, i) => (
                <ContactCard
                  key={`${category.label}-${item.label}-${i}`}
                  item={item}
                />
              ))}
            </div>
          </li>
        ))}
      </ul>
    </MySection>
  );
};
