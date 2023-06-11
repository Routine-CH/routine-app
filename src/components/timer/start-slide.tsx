import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import AppColors from "../../utils/constants/colors";
import AppText from "../common/typography/app-text";
import Circle from "./circle";

const StartSlide: React.FC<{
  onStartTimer: () => void;
  onSetDuration: (newTime: number) => void;
}> = ({ onStartTimer, onSetDuration }) => {
  const { t } = useTranslation();
  const isEditable = true;

  const handleDurationChange = (newTime: number) => {
    onSetDuration(newTime);
  };

  return (
    <View style={styles.container}>
      <AppText
        fontStyle="heading3"
        colorStyle="white"
        style={{ textAlign: "center" }}
      >
        {t("timer.start-working")}
      </AppText>
      <Circle
        timeRemaining={25 * 60}
        onChangeTime={handleDurationChange}
        isEditable={isEditable}
      />
      <Icon
        name={"play"}
        size={60}
        color={AppColors.white}
        onPress={onStartTimer}
      />
    </View>
  );
};

export default StartSlide;

const styles = StyleSheet.create({
  container: {
    marginTop: 80,
    height: "100%",
    alignItems: "center",
  },
});
