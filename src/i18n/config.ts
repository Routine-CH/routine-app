import i18n from "i18next";

import RNLanguageDetector from "@os-team/i18next-react-native-language-detector";
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

i18n
  .use(RNLanguageDetector)
  .use(initReactI18next)
  .init({
    compatibilityJSON: "v3",
    fallbackLng: "de",
    supportedLngs: ["de", "en"],
    interpolation: {
      escapeValue: false,
    },
    resources,
  });

export default i18n;
