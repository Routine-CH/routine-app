import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import AppColors from "../../utils/constants/colors";
import Circle from "./circle";

interface PauseSlideProps {
  onStartTimer: () => void;
  onCancelTimer: () => void;
  timeRemaining: number;
}

const PauseSlide: React.FC<PauseSlideProps> = ({
  onStartTimer,
  onCancelTimer,
  timeRemaining,
}) => {
  const { t } = useTranslation();
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
        name={"play"}
        size={60}
        color={AppColors.white}
        onPress={onStartTimer}
      />
    </View>
  );
};

export default PauseSlide;

const styles = StyleSheet.create({
  container: {
    marginTop: 80,
    height: "100%",
    alignItems: "center",
  },
});
