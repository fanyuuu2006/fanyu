import { codeToHtml } from "shiki";

export async function highlightCode(
  code: string,
  lang: string,
  theme: string,
): Promise<string> {
  return await codeToHtml(code, {
    lang,
    theme,
  });
}
