// src/i18next/index.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import de from "../translations/de.json";
import en from "../translations/en.json";

export const resources = {
  de: {
    translation: de,
  },
  en: {
    translation: en,
  },
} as const;

i18n.use(initReactI18next).init({
  compatibilityJSON: "v3",
  lng: "de",
  fallbackLng: "de",
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
  resources,
});

export default i18n;
