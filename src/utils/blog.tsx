export const estimateReadingTime = (content: string) => {
  const zhChars = (content.match(/[\u4e00-\u9fff]/g) ?? []).length;
  const latinWords = content
    .replace(/[\u4e00-\u9fff]/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  const units = zhChars > latinWords ? zhChars / 500 : latinWords / 220;
  const minutes = Math.max(1, Math.ceil(units));
  return minutes;
};
