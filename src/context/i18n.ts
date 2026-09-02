export type Lang = "ar" | "fr" | "en";

export const LANG_COOKIE = "dzphy-lang";
export const LANG_OPTIONS: Lang[] = ["ar", "fr", "en"];

export const LANG_NAMES: Record<Lang, string> = {
  ar: "العربية",
  fr: "Français",
  en: "English",
};

export const dirForLang = (l: Lang): "rtl" | "ltr" => (l === "ar" ? "rtl" : "ltr");
