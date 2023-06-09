import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import AppColors from "../../utils/constants/colors";
import AppText from "../common/typography/app-text";
import Circle from "./circle";

const BreakSlide: React.FC<{ onStartTimer: () => void }> = ({
  onStartTimer,
}) => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <AppText
        fontStyle="heading3"
        colorStyle="white"
        style={{ textAlign: "center" }}
      >
        {t("timer.take-a-break")}
      </AppText>
      <Circle />
      <Icon
        name={"play"}
        size={60}
        color={AppColors.white}
        onPress={onStartTimer}
      />
    </View>
  );
};

export default BreakSlide;

const styles = StyleSheet.create({
  container: {
    marginTop: 80,
    height: "100%",
    alignItems: "center",
  },
});
