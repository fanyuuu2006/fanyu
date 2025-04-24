"use client";
import { LanguageOption, useLanguage } from "@/context/LanguageContext";
import { profile } from "@/lib/profile";
import { OutsideLink } from "fanyucomponents";
import Image from "next/image";
import React from "react";

export const ProfileSection = () => {
  const Language = useLanguage();

  const TableData: {
    label: { [key in LanguageOption]: string };
    content: React.ReactNode;
  }[] = [
    {
      label: {
        chinese: "生日",
        english: "Birthday",
      },
      content: profile.birthday,
    },
    {
      label: {
        chinese: "來自",
        english: "From",
      },
      content: (
        <OutsideLink href="https://zh.wikipedia.org/wiki/%E9%97%9C%E8%A5%BF%E9%8E%AE_(%E5%8F%B0%E7%81%A3)">
          {profile[Language.Current].from}
        </OutsideLink>
      ),
    },
    {
      label: {
        chinese: "現居",
        english: "Location",
      },
      content: (
        <OutsideLink href="https://zh.wikipedia.org/zh-tw/%E5%A4%A7%E5%AE%89%E5%8D%80_(%E8%87%BA%E5%8C%97%E5%B8%82)">
          {profile[Language.Current].location}
        </OutsideLink>
      ),
    },
  ];

  return (
    <section id="home">
      <div className="container d-flex justify-center" style={{ gap: "1em" }}>
        <div
          className="card d-flex flex-column align-items-center"
          style={{
            width: "30%",
            padding: "1em",
            gap: "1em",
          }}
        >
          <Image
            src="/CampPhoto.jpg"
            className="bordered shadow"
            width={1080}
            height={1080}
            alt="Camp Photo"
            style={{
              width: "250px",
              height: "auto",
              borderRadius: "100%",
            }}
          />
          <div className="title d-flex flex-column text-center">
            {profile[Language.Current].name}
          </div>
          <ul className="note" style={{
            width: "100%"
          }}>
            {TableData.map((item, index) => (
              <React.Fragment key={index}>
                <li>
                  <div>{item.label[Language.Current]}:</div>
                  <div>{item.content}</div>
                </li>
              </React.Fragment>
            ))}
          </ul>
        </div>
        <div style={{ flexGrow: 1 }}></div>
      </div>
    </section>
  );
};
