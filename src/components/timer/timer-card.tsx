import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import AppColors from "../../utils/constants/colors";
import AppText from "../common/typography/app-text";

const TimerCard: React.FC = () => {
  const { t } = useTranslation();
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Icon
          name={"pause-circle"}
          size={50}
          color={AppColors.blue100}
          style={{ marginRight: 5 }}
        />
        <Icon name={"close-circle"} size={50} color={AppColors.red} />
      </View>
      <View style={styles.textContainer}>
        <AppText
          fontStyle="body"
          colorStyle="black70"
          style={{ marginRight: 10 }}
        >
          {t("tool-cards.timer")}
        </AppText>
        <AppText fontStyle="heading1" colorStyle="black70">
          22:35
        </AppText>
      </View>
    </View>
  );
};

export default TimerCard;

const styles = StyleSheet.create({
  container: {
    height: 82,
    padding: 15,
    borderRadius: 13,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: AppColors.blueMuted40,
  },
  iconContainer: {
    flexDirection: "row",
  },
  textContainer: {
    flexDirection: "row",
    alignItems: "baseline",
  },
});
