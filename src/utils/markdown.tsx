import { unified } from "unified";
import remarkParse from "remark-parse";
import type { Root, Heading, Text } from "mdast";

/**
 * Markdown 標題結構
 *
 * 用於表示 Markdown 文件中的 heading 資訊。
 *
 * @example
 * {
 *   level: 2,
 *   title: "Installation"
 * }
 */
export interface MarkdownOutlineItem {
  /**
   * 標題層級
   *
   * 對應 Markdown:
   *
   * # H1      -> level: 1
   * ## H2     -> level: 2
   * ### H3    -> level: 3
   */
  level: number;

  /**
   * 標題文字內容
   */
  title: string;
}


/**
 * 取得 Markdown 文件的大綱結構
 *
 * 解析 Markdown AST，提取所有 heading 節點，
 * 並轉換成簡化的大綱資料。
 *
 * @param markdown Markdown 原始文字
 *
 * @returns Markdown 標題列表
 *
 * @example
 * const outline = getOutline(`
 * # Introduction
 *
 * ## Install
 *
 * ## Usage
 * `);
 *
 * // [
 * //   { level: 1, title: "Introduction" },
 * //   { level: 2, title: "Install" },
 * //   { level: 2, title: "Usage" }
 * // ]
 */
export function getOutline(markdown: string): MarkdownOutlineItem[] {
  /**
   * 建立 Markdown Parser
   *
   * unified + remark-parse 會將 Markdown
   * 轉換成 mdast (Markdown Abstract Syntax Tree)
   */
  const tree: Root = unified()
    .use(remarkParse)
    .parse(markdown);


  return tree.children
    /**
     * 篩選 heading 節點
     *
     * RootContent 是聯合型別，
     * 需要透過 type 判斷縮小成 Heading。
     */
    .filter((node): node is Heading => node.type === "heading")

    /**
     * 將 Heading AST 轉換成自訂格式
     */
    .map((node) => ({
      /**
       * heading.depth 對應 Markdown # 數量
       */
      level: node.depth,

      /**
       * Heading.children 可能包含不同 inline node
       *
       * 例如:
       *
       * ## Hello **World**
       *
       * AST:
       * [
       *   { type:"text", value:"Hello " },
       *   { type:"strong", children:[...] }
       * ]
       *
       * 這裡簡化只取文字節點。
       */
      title: node.children
        .filter((child): child is Text => child.type === "text")
        .map((child) => child.value)
        .join(""),
    }));
}