import 'react-i18next';
import de from '../translations/de.json';

// react-i18next versions higher than 11.11.0
declare module 'react-i18next' {
  interface CustomTypeOptions {
    resources: { translation: typeof de };
  }
}
