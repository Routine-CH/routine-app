import { useTranslation } from "react-i18next";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import AppColors from "../../../utils/constants/colors";
import AppText from "../../common/typography/app-text";

type IndividualNotificationsProps = {
  icon: string;
  title: string;
  notificationSettings: string;
};

const IndividualNotifications: React.FC<IndividualNotificationsProps> = ({
  icon,
  title,
  notificationSettings,
}) => {
  const { t } = useTranslation();

  return (
    <TouchableOpacity style={styles.container}>
      <View style={styles.allNotificationsContainer}>
        <Icon
          name={icon}
          size={35}
          color={AppColors.blueMuted60}
          style={{ marginRight: 20 }}
        />
        <View style={styles.textContainer}>
          <AppText
            fontStyle="body"
            colorStyle="black70"
            style={{
              width: "100%",
              flexWrap: "wrap",
            }}
          >
            {title}
          </AppText>
          <AppText
            fontStyle="filters"
            colorStyle="black70"
            style={{ width: "60%", flexWrap: "wrap" }}
          >
            {notificationSettings}
          </AppText>
        </View>
      </View>
      <Icon
        name="chevron-forward-outline"
        size={35}
        color={AppColors.blue100}
      />
    </TouchableOpacity>
  );
};

export default IndividualNotifications;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginBottom: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  allNotificationsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  textContainer: {
    flexDirection: "column",
  },
});
