"use client";
import { useLanguage } from "@/context/LanguageContext";
import { LanguageContent } from "@/types/language";
import Link from "next/link";
import Image from "next/image";
import { MenuOutlined } from "@ant-design/icons";
import { useModal } from "fanyucomponents";

const Routes: {
  label: LanguageContent<string>;
  href: string;
}[] = [
  {
    label: {
      chinese: "首頁",
      english: "Home",
    },
    href: "/#home",
  },
  {
    label: {
      chinese: "關於我",
      english: "About Me",
    },
    href: "/#aboutMe",
  },

  {
    label: {
      chinese: "技能",
      english: "Skills",
    },
    href: "/#skills",
  },
  {
    label: {
      chinese: "作品集",
      english: "Portfolio",
    },
    href: "/#portfolio",
  },
];

export const Header = () => {
  const Language = useLanguage();
  const Modal = useModal();
  return (
    <header>
      <nav
        className="container d-flex align-items-center justify-content-between"
        style={{ flexWrap: "nowrap", height: "6em", padding: "0.5em 2em" }}
      >
        <Link href="/" className="nav-brand">
          <Image
            alt="Logo"
            src="/logo.png"
            width={1500}
            height={500}
            style={{
              height: "100%",
              width: "auto",
            }}
          />
        </Link>
        <div className="nav-collapse note text-bold ">
          {Routes.map((item, index) => (
            <Link key={index} href={item.href}>
              {item.label[Language.Current]}
            </Link>
          ))}
        </div>
        <button
          className="btn nav-menu"
          style={{ borderRadius: "5px", padding: "0.5em" }}
          onClick={() => {
            Modal.Open();
          }}
        >
          <MenuOutlined />
        </button>
        <Modal.Container>
          <div
            className="pop card bordered d-flex flex-column note text-bold text-center"
            style={{ padding: "1em", gap: "1em" }}
          >
            {Routes.map((item, index) => (
              <Link
                key={index}
                href={item.href}
                className="card-glass card-link bordered"
                style={{ padding: "0.5em 1em" }}
                onClick={() => {
                  Modal.Close();
                }}
              >
                {item.label[Language.Current]}
              </Link>
            ))}
          </div>
        </Modal.Container>
      </nav>
    </header>
  );
};
