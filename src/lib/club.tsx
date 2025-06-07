import { ExperienceItem } from "@/types/experience";
import { InstagramOutlined, EnvironmentOutlined } from "@ant-design/icons";
import { NTUST } from "./education";

export const NTUST_BGC: ExperienceItem = {
  name: {
    chinese: "桌上遊戲研究社",
    english: "BoardGame Club",
  },
  role: {
    chinese: "第14屆幹部 美宣 & 攝影",
    english: "Graphic Design & Photography, 14th Leadership Team",
  },
  organization: NTUST,
  duration: { start: "2024-09", end: null },

  imageSrc:
    "https://lh3.googleusercontent.com/fife/ALs6j_FuiSwJT4O4v0UABOZBDSmwaPzqYkbIwCM3K2a3epzpotWl_K-CEfiFOnAuYZQ0HN67sydykdFyzmxqWzfHBCecYXE9rLJk8K-F7afX70kcSOVAD-ZdKGhB-kW1qpd0G9OTKLdDVDuOYJZKNvEEC9aGg3nXz4ALoNiy8TQg77O1LUDcxJyzEzlD6svwlJJKI4GHLpPnnYQkSHKAMiaELxzdIrJT6WL1nfk8ldPIxPmrVXXx8TYG7UiVpDQOUImV7FL5vC7gCCFBeMU74-Rat4DtfcaC5wP1doWUubB7rYWZMLr5VN8q4iyrDk-yTIrnIAeAD3C1QhoYstpmWU1ucmGVNxuhsZD6uetgvBuPYcKytl74IKRj1D4I6jKdTefZefldJ45lPlX-TuZbO_vZkJj0BTw3hm8_h840wuLh-Y6XWL9K2XKHS-sIK7kGKhV0LHi2AQAlKW9Uojuw6acU_u3FARnnZRZlJEx7-QWoTcWrQJR2MLcmt0ca_ocbRiSv8VDfRre-2SVrMtpDQieMn_ZSqjfwe67u6xfzqTPpLJM4GPJpi5nudRBqBmaRlsqCha1Qy8okGwoY0cdyBErrkxfO-Nz1UFoxZGsgiGHyvxoNv5qYepVm331Hvz4bqoBegKxhVZy0OqTAOiCd6tNAu-dYEZ8F9jsBwkJ5AQ3ylw0jgHODeaPRvQdd77zL5OWWdIsicwuLWukluZx0rNEjBZXDHKCOFfzMedqE_EMkRpr57aQOeQ1lnzrvjxiZ211XRY3XrMRNRZaca0ooioTLkFhINptk1lQMMlW-844pUJ7IbP_psg2lociR-t7A67BjEnAoWwCen2s_dFpyXbhhtnMTWjgmglVUyJJeMQVRkXKKzHQIlTuqOkwHseJ3clamlLu6Yo0LZbybMZ0XvmsMUkXIE8jmvYMYJ1hQqrwqADRa07juT_mPNiLzD4ZVDVRulhYQWDpX40QF9Tq5zF9jlzvZuSk5x62SnlFaY9v9yPFzwKkGEuyM7_h0ecMkBYf37z5PRSZlcWXOazRMTW2y6JCX8CNXcjVMrueD0Zlv1UrVs0d1bvtHpaeLn5L3GcUfRNdG_lGSgVnQhMy6lhbbwKCbYDyg8lMv2x9Pk2Ep9z8RXvzSK-eIWkvywKtvxGkFYn9qKKqoMwOUZhrvedgHyCD9gWqA9zsGc8tUBM6HiyTpIUpG-J0xnY4j4OiRwuopNPj12VLpnqMMr4DHbeI6qs4qyYyYpTS-PYPHJMxajkAkbysh6tE-7ugBAbUqeFbf83ySfzfIh16-vc_wvIsAB-YB6ybxzM8Y3HLvUpzSwRgeaFQDpLRRnn31V__tAcTReWLsotVJ1IIXFZYrc6ak3XXgH5CwWn9i-B8uY8q1TQ01XHd-FSazuTUMwLvnA5ZRRDEfZHbvDvKDqwB2Igid8mlAVvYScObHF7yYnJ0LJWVpSEd5pr8pqP-hDdYzbaDJ7zgm977GBJav0mQKMP9Cd4-vxqxGBZcx8tm7-KgtU8JA1woPES-oOgzOaa1Xl-hlUy8L5AztBxht356X9UaFbsDoaecBDaL-3a7ThrbA1mP2fP7V1IFLsZmpYzUsjHVDSEnJw6QjhLDhEo9iEnUsi2IFbYVVrRlOGSPpsGJUNo8yIgJqNPN4k02RT_SFBNNG7XYe6hiFT6Juh56zClUOxYcT_L_8U18_Jem4mB9ye11lQ8w0MXk=w1920-h868",
  links: [
    {
      chinese: "台科大桌遊社 Instagram",
      english: "NTUST BoardGame Club Instagram",
      icon: <InstagramOutlined />,
      href: "https://www.instagram.com/ntust_boardgame/",
    },
    {
      chinese: "臺灣省臺北市大安區",
      english: "Da'an District, Taipei City, Taiwan",
      icon: <EnvironmentOutlined />,
      href: "https://maps.app.goo.gl/Rzro8g26H8Pb1f1EA",
    },
  ],
};
