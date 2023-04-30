// src/i18next/index.ts
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import deTranslation from "../locales/de/de.json";
import enTranslation from "../locales/en/en.json";

const resources = {
  en: {
    translation: enTranslation,
  },
  de: {
    translation: deTranslation,
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "de",
  keySeparator: false,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
