import { ExperienceItem } from "@/types/experience";
import { InstagramOutlined, EnvironmentOutlined } from "@ant-design/icons";
import NTUST from "./education/ntust";

export const NTUST_BGC: ExperienceItem = {
  name: {
    chinese: "桌上遊戲研究社",
    english: "Board Game Club",
  },
  role: {
    chinese: "第14屆幹部 美宣 & 攝影",
    english: "Graphic Design & Photography, 14th Leadership Team",
  },
  organization: NTUST,
  duration: "2024-09",

  imageSrc:
    "https://lh3.googleusercontent.com/rd-d/ALs6j_Gvwqe4c16JQ0ozJiL694xksFDOA8Vvt5egKuYzK7jKGFXgTSYbagw5ATGVUEOeQkBcbeyoXPjBFwPe7rOz5Es_1K5hbXTe3xN5UsggO0mfTJLP-UJeKPqyVsdvKH8oPxN9yPnH6CcvpLMEy-7ajgwFK0OtsQnaEArSo3xZ0ePTCQccu1uZtIq0CJ89ZxKqUxj-QS06z0z-PxDZGioQg5Ygr0K6-cGyeOYqYi-oJYMp5l0Sd7seeli-Mbc9jKIxcxfX4BVBSVEXT25A8VUv_HDKXeAFJ300g5manQdRWHm5BTL8RS8B5ujR0De9SbKMYn8yldqy-0a8CePbz7vx5fTe50OCnosXXtpKGA0wmPltUfmitRvhN38j4cGSK27r806WSW57DCvAW7bjQ_j17vHWg0gV-UCHiIegme2lD41C75OzV39lKZUByHU66APNZMIkNxl_jnucZqbVglFw_mQhFgCquZZ4k36EJIg_esYXZhR6J_aAI7vOx3alH_aCUKj14WVfiCiPaeJuHBgj_IIPPl9jNAzr7IROXGRgoN311VHPahLmfkAV5IuMuHC_HyKHGRCakl6OIGujm_KaqH4xP9j38CMP9j3z_Uhz6MkzMIrXge-lKFeycByfn8wtjvUNKDCEyH8TO47hOoWT3DMPR8cG6wXC8x2Kd21i86U_RlSX5IOw-hrxRzhiIQ3FNf9t-3HsnAQfEVGzgr27ztBk7z0-GgKw4NYXrD7LyEJ3IYPVy2b1Yp1u7yHdMm-_0Pbe8pFwvVuybkZ8LFTeXKJwOFkaNmGdXUpfy6rqY1NpMtzX0F-_r3qWLo_JVeES_7Qo2OlYLrKKtNsGM3WiG6E5JIogJW6Sob3PfxCOueYQHYPxYtPUfBv655p_3Q69QPBfXmnmmK6TpmgoW95c0FWvh0hIRKX0lO7rmsiECHn4-WePHt30YWWXfOOxnzL2aUVvSTP-lDiKfxboQtZMkJo6hmkVT-NIoNi_ZzaVlU68B7SgDieA_n9J8BNHOA=w1920-h912",
  links: [
    {
      chinese: "台科大桌遊社 Instagram",
      english: "NTUST Board Game Club Instagram",
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
