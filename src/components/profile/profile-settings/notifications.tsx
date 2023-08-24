import { useTranslation } from "react-i18next";
import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import {
  adjustAllNotifications,
  adjustGamificationNotification,
} from "../../../data/notifications/update-request";
import { useUserStore } from "../../../store/user-store";
import AppColors from "../../../utils/constants/colors";
import AppFontStyle from "../../../utils/constants/font-style";
import { AxiosErrorWithData } from "../../../utils/types/types";
import AppText from "../../common/typography/app-text";
import IndividualNotifications from "./individual-notifications";

type NotificationsProp = {
  id: string;
  navigateTo: () => void;
  gamificationNotifications: boolean;
  mutedAllNotifications: boolean;
};

const windowWidth = Dimensions.get("window").width;

const Notifications: React.FC<NotificationsProp> = ({
  id,
  navigateTo,
  gamificationNotifications,
  mutedAllNotifications,
}) => {
  const { t } = useTranslation();

  const { setDataUpdated } = useUserStore();

  const handleAllNotificationToggle = async () => {
    try {
      await adjustAllNotifications(id, !mutedAllNotifications).then(() =>
        setDataUpdated(true)
      );
    } catch (error) {
      const axiosError = error as AxiosErrorWithData;
      console.error(axiosError.response);
    }
  };

  const handleGamificationToggle = async () => {
    try {
      await adjustGamificationNotification(id, !gamificationNotifications).then(
        () => setDataUpdated(true)
      );
    } catch (error) {
      const axiosError = error as AxiosErrorWithData;
      console.error(axiosError.response);
    }
  };

  return (
    <View style={styles.container}>
      <AppText fontStyle='heading3' colorStyle='black70'>
        {t("profile.profile-settings.notifications.change-notifications")}
      </AppText>
      <View style={styles.textContainer}>
        <Icon
          name='notifications-off'
          size={35}
          color={
            mutedAllNotifications ? AppColors.blue100 : AppColors.greyMuted
          }
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
        <TouchableOpacity onPress={handleAllNotificationToggle}>
          <Icon
            name='toggle'
            size={56}
            color={
              mutedAllNotifications ? AppColors.blue100 : AppColors.greyMuted
            }
            style={{
              transform: [{ scaleX: mutedAllNotifications ? 1 : -1 }],
            }}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.gamificationNotificationContainer}>
        <Icon
          name='game-controller'
          size={37}
          color={gamificationNotifications ? AppColors.blue100 : AppColors.grey}
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
            "profile.profile-settings.notifications.gamification-notification"
          )}
        </AppText>
        <TouchableOpacity onPress={handleGamificationToggle}>
          <Icon
            name='toggle'
            size={56}
            color={
              gamificationNotifications
                ? AppColors.blue100
                : AppColors.greyMuted
            }
            style={{
              transform: [{ scaleX: gamificationNotifications ? 1 : -1 }],
            }}
          />
        </TouchableOpacity>
      </View>
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
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  gamificationNotificationContainer: {
    width: "100%",
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
