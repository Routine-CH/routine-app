import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import AppColors from "../../../utils/constants/colors";
import AppFontStyle from "../../../utils/constants/font-style";
import AppText from "../../common/typography/app-text";
import IndividualNotifications from "./individual-notifications";

type NotificationsProp = {
  navigateTo: () => void;
  mutedAllNotifications: boolean;
};

const windowWidth = Dimensions.get("window").width;

const Notifications: React.FC<NotificationsProp> = ({
  navigateTo,
  mutedAllNotifications,
}) => {
  const { t } = useTranslation();
  const [isToggled, setIsToggled] = useState(mutedAllNotifications);

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  return (
    <View style={styles.container}>
      <AppText fontStyle='heading3' colorStyle='black70'>
        {t("profile.profile-settings.notifications.change-notifications")}
      </AppText>
      <TouchableOpacity
        onPress={handleToggle}
        style={styles.allNotificationsContainer}
      >
        <View style={styles.textContainer}>
          <Icon
            name='notifications-off'
            size={35}
            color={AppColors.blue100}
            style={{ marginRight: windowWidth * 0.05 }}
          />
          <AppText
            colorStyle='black70'
            style={{
              width: windowWidth * 0.55,
              flexWrap: "wrap",
              fontSize: windowWidth * 0.046,
              fontFamily: AppFontStyle.body.fontFamily,
            }}
          >
            {t(
              "profile.profile-settings.notifications.activate-all-notifications"
            )}
          </AppText>
          <Icon
            name='toggle'
            size={56}
            color={isToggled ? AppColors.blue100 : AppColors.greyMuted}
            style={{
              transform: [{ scaleX: isToggled ? 1 : -1 }],
            }}
          />
        </View>
      </TouchableOpacity>
      <AppText
        colorStyle='black70'
        style={{
          marginBottom: 30,
          fontSize: windowWidth * 0.05,
          fontFamily: AppFontStyle.bodyMedium.fontFamily,
        }}
      >
        {t(
          "profile.profile-settings.notifications.notifications-you-will-receive"
        )}
      </AppText>
      <IndividualNotifications
        icon='flag-outline'
        title={t("profile.profile-settings.notifications.reminders-goals")}
        notificationSettings={t("profile.profile-settings.notifications.none")}
        navigateTo={navigateTo}
      />
      <IndividualNotifications
        icon='checkbox-outline'
        title={t("profile.profile-settings.notifications.reminders-todos")}
        notificationSettings={t("profile.profile-settings.notifications.email")}
        navigateTo={navigateTo}
      />
      <IndividualNotifications
        icon='journal-outline'
        title={t("profile.profile-settings.notifications.reminders-journal")}
        notificationSettings={t(
          "profile.profile-settings.notifications.email_in-app_combo"
        )}
        navigateTo={navigateTo}
      />
    </View>
  );
};

export default Notifications;

const styles = StyleSheet.create({
  container: { marginTop: 60, width: "100%" },
  allNotificationsContainer: {
    width: "100%",
    marginTop: 30,
    marginBottom: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textContainer: {
    flexDirection: "row",
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
