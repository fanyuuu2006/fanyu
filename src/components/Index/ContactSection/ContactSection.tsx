"use client";
import { CardLink } from "@/components/common/CardLink";
import { useLanguage } from "@/context/LanguageContext";
import { contactCategorieMap } from "@/lib/contact";
import { fadeInItem, staggerContainer } from "@/lib/motion";
import { profile } from "@/lib/profile";
import { ContactCategory } from "@/types/contact";
import { LanguageContent, LanguageOption } from "@/types/language";
import { Tooltip } from "antd";
import { OutsideLink } from "fanyucomponents";
import { motion } from "framer-motion";

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
        <div className="title font-bold">{contactContent.contact}</div>
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
                <CardLink key={index} variants={fadeInItem}>
                  <Tooltip title={item.label}>
                    <OutsideLink
                      href={item.href}
                      className="btn note flex items-center px-4 py-1 gap-2"
                    >
                      {item.icon}
                      <span>{item.id}</span>
                    </OutsideLink>
                  </Tooltip>
                </CardLink>
              ))}
            </motion.div>
          </div>
        ))}
      </div>
    </section>
  );
};
