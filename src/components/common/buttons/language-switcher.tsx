import { Button } from "react-native";
import i18n from "../../../i18n/config";

const LanguageSwitcher: React.FC = () => {
  const switchLanguage = () => {
    const newLanguage = i18n.language === "de" ? "en" : "de";
    i18n.changeLanguage(newLanguage);
  };

  return <Button title='Switch Language' onPress={switchLanguage} />;
};
