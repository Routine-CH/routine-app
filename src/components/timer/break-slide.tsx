import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import AppColors from "../../utils/constants/colors";
import AppText from "../common/typography/app-text";
import Circle from "./circle";

type BreakSlideProps = {
  onStartTimer: () => void;
  onSetDuration: (newTime: number) => void;
};

const BreakSlide: React.FC<BreakSlideProps> = ({
  onStartTimer,
  onSetDuration,
}) => {
  const { t } = useTranslation();
  const isEditable = true;

  const handleDurationChange = (newTime: number) => {
    onSetDuration(newTime);
  };

  return (
    <View style={styles.container}>
      <AppText
        fontStyle='heading3'
        colorStyle='white'
        style={{ textAlign: "center" }}
      >
        {t("timer.take-a-break")}
      </AppText>
      <Circle
        timeRemaining={5 * 60}
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

export default BreakSlide;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
});
