import React from "react";
import { bundledLanguages } from "shiki";

/**
 * extractReactNode 函式
 *
 * 將 React.ReactNode 轉換為字串。
 * @param node - 要轉換的 React.ReactNode
 * @returns 轉換後的字串
 */
export const extractReactNode = (node: React.ReactNode): string => {
  if (typeof node === "string") return node;
  if (typeof node === "number") return node.toString();
  if (Array.isArray(node)) return node.map(extractReactNode).join("");
  if (React.isValidElement<React.HTMLAttributes<HTMLElement>>(node)) {
    return extractReactNode(node.props.children);
  }
  if (typeof node === "object" && node !== null) {
    return React.Children.toArray(node).map(extractReactNode).join("");
  }

  return ""; // 如果 node 是 null 或 undefined，則返回空字串
};



const FALLBACK_LANG = "text";
const normalizeLang = (lang: string): string => {
  const lower = lang.toLowerCase().trim();
  return lower in bundledLanguages ? lower : FALLBACK_LANG;
};
export const parseLangAndCode = (
  children: React.ReactNode,
): {
  lang: string;
  code: string;
} => {
  const child = React.Children.toArray(children)[0];

  if (
    React.isValidElement<{ className?: string; children?: React.ReactNode }>(
      child,
    )
  ) {
    const className = child.props.className ?? "";
    const match = className.match(/language-([\w-]+)/);

    return {
      lang: normalizeLang(match?.[1] ?? FALLBACK_LANG),
      code: extractReactNode(child.props.children),
    };
  }

  return {
    lang: FALLBACK_LANG,
    code: extractReactNode(children),
  };
};
