"use client";
import { LanguageOption, useLanguage } from "@/context/LanguageContext";
import { profile } from "@/lib/profile";
import { OutsideLink } from "fanyucomponents";
import Image from "next/image";
import React from "react";

export const HomeSection = () => {
  const Language = useLanguage();
  
  return (
    <section id="home">
      <div className="container d-flex justify-center" style={{ gap: "1em" }}>
        <div
          className="card d-flex flex-column align-items-center justify-center"
          style={{
            flexGrow: 1,
            padding: "1em",
            gap: "1em",
          }}
        >
          <div>
            <div className="title">
              {{ chinese: "哈囉，", english: "Hello," }[Language.Current]}
            </div>
            <div className="label">
              {{ chinese: "我是", english: "I'm " }[Language.Current]}
              {profile[Language.Current].nickname}❗
            </div>
          </div>
        </div>
        <div
          className="d-flex flex-column align-items-center justify-center"
          style={{ width: "50%" }}
        >
          <Image
            loading="lazy"
            src="/CampPhoto.jpg"
            className="bordered shadow"
            width={1080}
            height={1080}
            alt="Camp Photo"
            style={{
              width: "300px",
              height: "auto",
              borderRadius: "100%",
            }}
          />
        </div>
      </div>
    </section>
  );
};
