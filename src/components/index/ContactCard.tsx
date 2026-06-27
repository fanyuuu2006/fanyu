import { ContactItem } from "@/types";
import { cn } from "@/utils/className";
import { OutsideLink } from "fanyucomponents";
import { CopyButton } from "../CopyButton";
import { MyImage } from "../MyImage";

type ContactCardProps = React.HTMLAttributes<HTMLDivElement> & {
  item: ContactItem;
};

export const ContactCard = ({ item, className, ...rest }: ContactCardProps) => {
  const {
    src: imageSrc,
    style: imageStyle,
    className: imageClassName,
    ...restImageProps
  } = item.info.image || {};

  const gradientStyle: React.CSSProperties = {
    // 使用 45 度角漸層，支援自訂顏色或預設主要/次要文字顏色
    background: `linear-gradient(45deg, ${(item.colors?.length
      ? item.colors
      : ["var(--primary)", "var(--secondary)"]
    ).join(",")})`,
    backgroundBlendMode: "overlay", // 混合模式
    backgroundColor: "rgba(0, 0, 0, 0.1)", // 半透明黑色背景
    backdropFilter: "blur(1rem)", // 背景模糊效果
    WebkitBackdropFilter: "blur(1rem)", // Safari 瀏覽器支援
    willChange: "background-color, backdrop-filter", // 最佳化動畫效能
  };

  return (
    <div className={cn(`overlay-wrapper group`, className)} {...rest}>
      {/* 主要連結按鈕：點擊後跳轉到外部連結 */}
      <OutsideLink
        href={item.url} // 連結地址
      >
        <div
          className="p-0.5 rounded-full  font-mono " // 樣式：區塊顯示、內邊距、圓角、無底線
          style={gradientStyle} // 套用漸層樣式
        >
          {/* 內層按鈕內容：圖示 + 標籤文字 */}
          <span className="text-sm sm:text-base md:text-lg font-semibold flex items-center justify-center px-3 py-1.5 gap-2 rounded-[inherit] no-underline bg-(--background) transition-all duration-300 group-hover:bg-transparent">
            <item.icon /> {/* 聯絡方式圖示 */}
            {item.label} {/* 聯絡方式標籤 */}
          </span>
        </div>
      </OutsideLink>

      {/* 懸停時顯示的詳細資訊卡 */}
      <div className="overlay-content">
        {/* 資訊卡外框：套用漸層邊框效果 */}
        <div className="p-0.5 rounded-2xl" style={gradientStyle}>
          {/* 資訊卡內容區域：包含頭像、姓名、ID 和其他資訊 */}
          <div className="bg-(--background) rounded-[inherit] flex flex-col gap-2 p-4">
            {/* 頭像和姓名 ID 區域 */}
            <div className="flex items-end gap-2">
              {/* 頭像區域 */}
              <div
                className="size-10 rounded-xl overflow-hidden"
                style={{
                  // 動態邊框顏色：使用項目自訂顏色或預設主要文字顏色
                  border: `1px solid ${item.colors?.[0] || "var(--primary)"}`,
                }}
              >
                {/* 頭像圖片 */}
                <MyImage
                  className={`w-full h-full object-cover ${
                    imageClassName || ""
                  }`}
                  src={imageSrc || `/images/fanyu.jpg`} // 預設頭像圖片
                  fallbackSrc={`/images/fanyu.jpg`}
                  alt={`${item.label}-${item.info.id}`} // 無障礙替代文字
                  style={{
                    // 動態背景顏色：匹配邊框顏色
                    backgroundColor: item.colors?.[0] || "var(--primary)",
                    ...imageStyle, // 合併自訂樣式
                  }}
                  {...restImageProps} // 其他圖片屬性
                />
              </div>

              {/* 姓名和 ID 顯示區域 */}
              <div className="flex-1 min-w-0 whitespace-nowrap">
                {/* 姓名顯示 */}
                <h5
                  className="text-sm md:text-base font-bold"
                  style={{
                    // 動態文字顏色：使用項目自訂顏色或預設主要文字顏色
                    color: item.colors?.[0] || "var(--primary)",
                  }}
                >
                  {item.info.name}
                </h5>
                {/* ID 顯示區域：包含複製功能 */}
                <div className="flex items-center gap-1">
                  <CopyButton
                    content={item.info.id} // 要複製的內容
                    className="text-xs md:text-sm text-(--muted)"
                  >
                    @<span>{item.info.id}</span>
                  </CopyButton>
                </div>
              </div>
            </div>
            {/* 額外資訊區域：根據語言動態顯示相關資訊 */}
            {item.info.about && <item.info.about />}
          </div>
        </div>
      </div>
    </div>
  );
};
