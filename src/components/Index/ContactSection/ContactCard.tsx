// 引入相關依賴
import { CopyButton } from "@/components/custom/CopyButton";
import { useLanguage } from "@/contexts/LanguageContext";
import { ContactItem } from "@/types/contact";
import { OutsideLink, OverrideProps } from "fanyucomponents";
import { cn } from "@/utils/className";
import { proxyUrl } from "@/utils/url";
import { MyImage } from "@/components/custom/MyImage";

/**
 * ContactCard 元件的 Props 型別定義
 * 繼承自 HTML div 元素的屬性，並額外包含一個 ContactItem
 */
export type ContactCardProps = OverrideProps<
  React.HTMLAttributes<HTMLDivElement>,
  {
    item: ContactItem; // 聯絡資訊項目
  }
>;

/**
 * ContactCard 聯絡卡片元件
 * 用於顯示聯絡方式的卡片，包含連結、頭像、姓名、ID 等資訊
 * 支援懸停顯示詳細資訊的覆蓋層效果
 *
 * @param className - 自訂 CSS 類別名稱
 * @param item - 聯絡資訊項目數據
 * @param rest - 其他 HTML div 屬性
 */
export const ContactCard = ({ className, item, ...rest }: ContactCardProps) => {
  // 取得當前語言設定
  const Language = useLanguage();

  // 從聯絡項目中解構圖片相關屬性
  const {
    src: imageSrc,
    style: imageStyle,
    className: imageClassName,
    ...restImageProps
  } = item.info.image || {};

  /**
   * 漸層樣式配置
   * 建立具有模糊背景效果的漸層樣式，用於卡片邊框和背景
   */
  const gradientStyle: React.CSSProperties = {
    // 使用 45 度角漸層，支援自訂顏色或預設主要/次要文字顏色
    background: `linear-gradient(45deg, ${(item.backgrounds?.length
      ? item.backgrounds
      : ["var(--text-color-primary)", "var(--text-color-secondary)"]
    ).join(",")})`,
    backgroundBlendMode: "overlay", // 混合模式
    backgroundColor: "rgba(0, 0, 0, 0.1)", // 半透明黑色背景
    backdropFilter: "blur(1rem)", // 背景模糊效果
    WebkitBackdropFilter: "blur(1rem)", // Safari 瀏覽器支援
    willChange: "background-color, backdrop-filter", // 最佳化動畫效能
  };

  return (
    // 外層容器：包含懸停群組效果的覆蓋層包裝器
    <div className={cn(`overlay-wrapper group`, className)} {...rest}>
      {/* 主要連結按鈕：點擊後跳轉到外部連結 */}
      <OutsideLink
        draggable={true} // 允許拖曳
        href={item.href} // 連結地址
        className="block p-[2px] rounded-full no-underline " // 樣式：區塊顯示、內邊距、圓角、無底線
        style={gradientStyle} // 套用漸層樣式
      >
        {/* 內層按鈕內容：圖示 + 標籤文字 */}
        <span className="text-xl md:text-2xl font-semibold flex items-center justify-center px-4 py-2 gap-2 rounded-[inherit] no-underline bg-[var(--background-color)] transition-all duration-300 group-hover:bg-transparent">
          <item.icon /> {/* 聯絡方式圖示 */}
          {item.label} {/* 聯絡方式標籤 */}
        </span>
      </OutsideLink>

      {/* 懸停時顯示的詳細資訊卡 */}
      <div className="overlay-content">
        {/* 資訊卡外框：套用漸層邊框效果 */}
        <div className="p-[2px] rounded-2xl" style={gradientStyle}>
          {/* 資訊卡內容區域：包含頭像、姓名、ID 和其他資訊 */}
          <div className="bg-[var(--background-color)] rounded-[inherit] flex flex-col gap-2 p-4">
            {/* 頭像和姓名 ID 區域 */}
            <div className="flex items-center gap-4">
              {/* 頭像區域 */}
              <div
                className="h-12 aspect-square rounded-xl overflow-hidden"
                style={{
                  // 動態邊框顏色：使用項目自訂顏色或預設主要文字顏色
                  border: `2px solid ${
                    item.backgrounds?.[0] || "var(--text-color-primary)"
                  }`,
                }}
              >
                {/* 頭像圖片 */}
                <MyImage
                  className={`w-full h-full object-cover ${
                    imageClassName || ""
                  }`}
                  src={
                    imageSrc ? proxyUrl(imageSrc as string) : `/GameShow.jpg`
                  }
                  fallbackSrc={`/GameShow.jpg`}
                  alt={`${item.label}-${item.info.id}`} // 無障礙替代文字
                  style={{
                    // 動態背景顏色：匹配邊框顏色
                    backgroundColor:
                      item.backgrounds?.[0] || "var(--text-color-primary)",
                    ...imageStyle, // 合併自訂樣式
                  }}
                  {...restImageProps} // 其他圖片屬性
                />
              </div>

              {/* 姓名和 ID 顯示區域 */}
              <div className="flex flex-col whitespace-nowrap leading-tight">
                {/* 姓名顯示 */}
                <h5
                  className="text-lg md:text-xl font-bold"
                  style={{
                    // 動態文字顏色：使用項目自訂顏色或預設主要文字顏色
                    color: item.backgrounds?.[0] || "var(--text-color-primary)",
                  }}
                >
                  {item.info.name}
                </h5>
                {/* ID 顯示區域：包含複製功能 */}
                <div>
                  <CopyButton
                    content={item.info.id} // 要複製的內容
                    className="text-sm md:text-base text-[var(--text-color-muted)]"
                  >
                    @<span>{item.info.id}</span>
                  </CopyButton>
                </div>
              </div>
            </div>
            {/* 額外資訊區域：根據語言動態顯示相關資訊 */}
            {item.info.about && (
              <div>{<item.info.about language={Language.Current} />}</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
