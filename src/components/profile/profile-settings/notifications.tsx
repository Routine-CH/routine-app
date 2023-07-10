import { useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import AppColors from "../../../utils/constants/colors";
import AppText from "../../common/typography/app-text";
import IndividualNotifications from "./individual-notifications";

type NotificationsProp = {
  navigateTo: () => void;
};

const Notifications: React.FC<NotificationsProp> = ({ navigateTo }) => {
  const { t } = useTranslation();
  const [isToggled, setIsToggled] = useState(false);

  const handleToggle = () => {
    setIsToggled(!isToggled);
  };

  return (
    <View style={styles.container}>
      <AppText fontStyle="heading3" colorStyle="black70">
        {t("profile.profile-settings.notifications.change-notifications")}
      </AppText>
      <TouchableOpacity
        onPress={handleToggle}
        style={styles.allNotificationsContainer}
      >
        <View style={styles.textContainer}>
          <Icon
            name="notifications-off"
            size={35}
            color={AppColors.blue100}
            style={{ marginRight: 20 }}
          />
          <AppText
            fontStyle="body"
            colorStyle="black70"
            style={{ width: "65%", flexWrap: "wrap" }}
          >
            {t(
              "profile.profile-settings.notifications.activate-all-notifications"
            )}
          </AppText>
        </View>
        <Icon
          name="toggle"
          size={56}
          color={isToggled ? AppColors.blue100 : AppColors.greyMuted}
          style={{
            transform: [{ scaleX: isToggled ? 1 : -1 }],
          }}
        />
      </TouchableOpacity>
      <AppText
        fontStyle="bodyMedium"
        colorStyle="black70"
        style={{ marginBottom: 30 }}
      >
        {t(
          "profile.profile-settings.notifications.notifications-you-will-receive"
        )}
      </AppText>
      <IndividualNotifications
        icon="flag-outline"
        title={t("profile.profile-settings.notifications.reminders-goals")}
        notificationSettings={t("profile.profile-settings.notifications.none")}
        navigateTo={navigateTo}
      />
      <IndividualNotifications
        icon="checkbox-outline"
        title={t("profile.profile-settings.notifications.reminders-todos")}
        notificationSettings={t("profile.profile-settings.notifications.email")}
        navigateTo={navigateTo}
      />
      <IndividualNotifications
        icon="journal-outline"
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
    marginBottom: 60,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textContainer: {
    flexDirection: "row",
  },
});
