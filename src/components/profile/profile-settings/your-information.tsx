import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import AppText from "../../common/typography/app-text";

const ProfileSettingsScreen: React.FC = () => {
  const { t } = useTranslation();

  return (
    <View>
      <AppText></AppText>
    </View>
  );
};

export default ProfileSettingsScreen;

const styles = StyleSheet.create({});
