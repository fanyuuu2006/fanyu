export const slugify = (s: string) =>
  encodeURIComponent(s.replace(/\s+/g, "__FANYU__"));
export const deslugify = (s: string) =>
  decodeURIComponent(s.replace(/__FANYU__/g, " "));
