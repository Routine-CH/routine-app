import { useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import BackButton from "../components/common/buttons/back-button";
import ScrollViewScreenWrapper from "../components/common/scroll-view-screen-wrapper";
import AppText from "../components/common/typography/app-text";
import AppColors from "../utils/constants/colors";
import { StatusBarColor } from "../utils/types/enums";

const NotificationsScreen: React.FC = () => {
  const { t } = useTranslation();
  const [isEmailToggled, setIsEmailToggled] = useState(false);
  const [isInAppToggled, setIsInAppToggled] = useState(false);

  const handleEmailToggle = () => {
    setIsEmailToggled(!isEmailToggled);
  };

  const handleInAppToggle = () => {
    setIsInAppToggled(!isInAppToggled);
  };

  return (
    <ScrollViewScreenWrapper
      backgroundColor="white"
      statusBarColor={StatusBarColor.dark}
      defaultPadding
    >
      <BackButton />
      <View style={styles.container}>
        <AppText
          fontStyle="bodyMedium"
          colorStyle="black70"
          style={{ marginBottom: 5 }}
        >
          {t("profile.profile-settings.notifications.reminders-goals")}
        </AppText>
        <AppText fontStyle="body" colorStyle="black70">
          {t("profile.profile-settings.notifications.reminder-goals-text")}
        </AppText>
        <AppText
          fontStyle="bodyMedium"
          colorStyle="black70"
          style={{ marginVertical: 30 }}
        >
          {t(
            "profile.profile-settings.notifications.where-you-will-receive-notificatons"
          )}
        </AppText>
      </View>
      <TouchableOpacity
        onPress={handleEmailToggle}
        style={styles.notificationsContainer}
      >
        <View style={styles.textContainer}>
          <Icon
            name="mail-outline"
            size={35}
            color={AppColors.black70}
            style={{ marginRight: 20 }}
          />
          <AppText fontStyle="body" colorStyle="black70">
            {t("profile.profile-settings.notifications.email")}
          </AppText>
        </View>
        <Icon
          name="toggle"
          size={56}
          color={isEmailToggled ? AppColors.blue100 : AppColors.greyMuted}
          style={{
            transform: [{ scaleX: isEmailToggled ? 1 : -1 }],
          }}
        />
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleInAppToggle}
        style={styles.notificationsContainer}
      >
        <View style={styles.textContainer}>
          <Icon
            name="phone-portrait-outline"
            size={35}
            color={AppColors.black70}
            style={{ marginRight: 20 }}
          />
          <AppText fontStyle="body" colorStyle="black70">
            {t("profile.profile-settings.notifications.in-app")}
          </AppText>
        </View>
        <Icon
          name="toggle"
          size={56}
          color={isInAppToggled ? AppColors.blue100 : AppColors.greyMuted}
          style={{
            transform: [{ scaleX: isInAppToggled ? 1 : -1 }],
          }}
        />
      </TouchableOpacity>
    </ScrollViewScreenWrapper>
  );
};

export default NotificationsScreen;

const styles = StyleSheet.create({
  container: {
    marginTop: 60,
  },
  notificationsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
});
