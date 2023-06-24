import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import BackButton from "../components/common/buttons/back-button";
import ScrollViewScreenWrapper from "../components/common/scroll-view-screen-wrapper";
import AppText from "../components/common/typography/app-text";
import AppColors from "../utils/constants/colors";
import { StatusBarColor } from "../utils/types/enums";

const ProfileSettingsScreen: React.FC = () => {
  const { t } = useTranslation();

  return (
    <ScrollViewScreenWrapper
      backgroundColor={AppColors.blueMuted20}
      statusBarColor={StatusBarColor.dark}
      defaultPadding
    >
      <BackButton />
      <View>
        <AppText>Lets change some settings</AppText>
      </View>
    </ScrollViewScreenWrapper>
  );
};

export default ProfileSettingsScreen;

const styles = StyleSheet.create({
  margin: {
    marginVertical: 30,
  },
});
