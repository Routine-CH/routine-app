import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import {
  TimerSlide,
  usePomodoroTimerStore,
} from "../../store/pomodoro-timer-store";
import AppColors from "../../utils/constants/colors";
import AppText from "../common/typography/app-text";
import Circle from "./circle";

type BreakSlideProps = {
  onStartTimer: () => void;
};

const BreakSlide: React.FC<BreakSlideProps> = ({ onStartTimer }) => {
  const { t } = useTranslation();
  const isEditable = true;

  const timeRemaining = usePomodoroTimerStore(
    (state) => state.timeRemaining[TimerSlide.Break]
  );
  const adjustTime = usePomodoroTimerStore((state) => state.adjustTime);

  const handleDurationChange = (newTime: number) => {
    adjustTime(TimerSlide.Break, newTime);
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
        timeRemaining={timeRemaining}
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
