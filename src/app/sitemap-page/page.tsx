import { profile } from "@/libs/profile";
import { fetcher } from "@/utils/fetcher";
import { slugify } from "@/utils/url";
import Link from "next/link";

/**
 * 網站地圖頁面
 * 提供人類可讀的網站結構導覽
 */
export default async function Page() {
  const years = await fetcher<string[]>(`${profile.url}/api/album`);
  
  const yearEventMap = await Promise.all(
    years.map(async (year) => {
      const events = await fetcher<string[]>(
        `${profile.url}/api/album/${slugify(year)}`
      );
      return { year, events };
    })
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-8 text-center">網站地圖</h1>
      
      <div className="grid gap-8 md:grid-cols-2">
        {/* 主要頁面 */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-[var(--text-color-primary)]">
            主要頁面
          </h2>
          <ul className="space-y-2">
            <li>
              <Link 
                href="/" 
                className="text-[var(--text-color-secondary)] hover:text-[var(--text-color-primary)] transition-colors"
              >
                首頁 - 個人介紹與作品展示
              </Link>
            </li>
            <li>
              <Link 
                href="/projects" 
                className="text-[var(--text-color-secondary)] hover:text-[var(--text-color-primary)] transition-colors"
              >
                專案作品集 - 開發作品展示
              </Link>
            </li>
            <li>
              <Link 
                href="/album" 
                className="text-[var(--text-color-secondary)] hover:text-[var(--text-color-primary)] transition-colors"
              >
                相簿 - 生活照片與回憶
              </Link>
            </li>
            <li>
              <Link 
                href="/guestbook" 
                className="text-[var(--text-color-secondary)] hover:text-[var(--text-color-primary)] transition-colors"
              >
                留言板 - 分享想法與建議
              </Link>
            </li>
            <li>
              <Link 
                href="/my" 
                className="text-[var(--text-color-secondary)] hover:text-[var(--text-color-primary)] transition-colors"
              >
                個人頁面 - 生日倒計時
              </Link>
            </li>
          </ul>
        </section>

        {/* 相簿年份 */}
        <section>
          <h2 className="text-2xl font-semibold mb-4 text-[var(--text-color-primary)]">
            相簿分類
          </h2>
          <div className="space-y-4">
            {yearEventMap.map(({ year, events }) => (
              <div key={year}>
                <h3 className="text-lg font-medium mb-2 text-[var(--text-color-secondary)]">
                  {year} 年
                </h3>
                <ul className="ml-4 space-y-1">
                  {events.map((event) => (
                    <li key={event}>
                      <Link 
                        href={`/album/${slugify(year)}/${slugify(event)}`}
                        className="text-sm text-[var(--text-color-secondary)] hover:text-[var(--text-color-primary)] transition-colors"
                      >
                        {event}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* 其他連結 */}
      <section className="mt-8 pt-8 border-t border-[var(--border-color)]">
        <h2 className="text-2xl font-semibold mb-4 text-[var(--text-color-primary)]">
          其他連結
        </h2>
        <ul className="space-y-2">
          <li>
            <Link 
              href="/sitemap.xml" 
              className="text-[var(--text-color-secondary)] hover:text-[var(--text-color-primary)] transition-colors"
            >
              XML 網站地圖
            </Link>
          </li>
          <li>
            <Link 
              href="/robots.txt" 
              className="text-[var(--text-color-secondary)] hover:text-[var(--text-color-primary)] transition-colors"
            >
              Robots.txt
            </Link>
          </li>
        </ul>
      </section>
    </div>
  );
} 