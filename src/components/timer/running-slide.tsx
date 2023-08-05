import { StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import AppColors from "../../utils/constants/colors";
import Circle from "./circle";

type RunningSlideProps = {
  onPauseTimer: () => void;
  onCancelTimer: () => void;
  timeRemaining: number;
};

const RunningSlide: React.FC<RunningSlideProps> = ({
  onPauseTimer,
  onCancelTimer,
  timeRemaining,
}) => {
  const isEditable = false;

  return (
    <View style={styles.container}>
      <Icon
        name={"close"}
        size={64}
        color={AppColors.white}
        onPress={onCancelTimer}
      />
      <Circle timeRemaining={timeRemaining} isEditable={isEditable} />
      <Icon
        name={"pause"}
        size={60}
        color={AppColors.white}
        onPress={onPauseTimer}
      />
    </View>
  );
};

export default RunningSlide;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
  },
});
