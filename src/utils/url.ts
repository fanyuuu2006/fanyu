export const slugify = (s: string) => encodeURIComponent(s.replace(/\s+/g, "-"));
export const deslugify = (s: string) => decodeURIComponent(s.replace(/-/g, " "));
