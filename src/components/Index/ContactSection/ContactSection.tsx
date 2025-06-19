"use client";
import { useLanguage } from "@/context/LanguageContext";
import { contactCategorieMap } from "@/libs/contact";
import { fadeInItem, staggerContainer } from "@/libs/motion";
import { profile } from "@/libs/profile";
import { ContactCategory } from "@/types/contact";
import { LanguageContent, LanguageOption } from "@/types/language";
import { motion } from "framer-motion";
import { ContactCard } from "./ContactCard";

type ContactContent = Record<"contact", string>;

const getContactContent = (language: LanguageOption): ContactContent =>
  ((
    {
      chinese: {
        contact: "聯繫",
      },
      english: {
        contact: "Contact",
      },
    } as LanguageContent<ContactContent>
  )[language]);

export const ContactSection = () => {
  const Language = useLanguage();
  const contactContent = getContactContent(Language.Current);

  return (
    <section id="contact">
      <div className="container flex flex-col items-center">
        <h1 className="title font-bold">
          {contactContent.contact}
        </h1>
        {Object.entries(profile.contact).map(([category, items]) => (
          <div
            key={category}
            className={`flex flex-col w-full items-start gap-4`}
          >
            <div className="content font-bold ">
              {
                contactCategorieMap[Language.Current][
                  category as ContactCategory
                ]
              }
            </div>
            <motion.div
              variants={staggerContainer}
              initial="hiddenBottom"
              whileInView="show"
              viewport={{ once: true }}
              className="flex flex-wrap w-full gap-2"
            >
              {items.map((item, index) => (
                <ContactCard
                  key={`${item.label} ${index}`}
                  variants={fadeInItem}
                  item={item}
                />
              ))}
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
};
