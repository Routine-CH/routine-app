import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import AppColors from "../../utils/constants/colors";
import Circle from "./circle";

const RunningSlide: React.FC<{
  onPauseTimer: () => void;
  onCancelTimer: () => void;
}> = ({ onPauseTimer, onCancelTimer }) => {
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <Icon
        name={"close"}
        size={64}
        color={AppColors.white}
        onPress={onCancelTimer}
      />
      <Circle />
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
    marginTop: 80,
    height: "100%",
    alignItems: "center",
  },
});
