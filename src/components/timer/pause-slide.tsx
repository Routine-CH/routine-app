import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import AppColors from "../../utils/constants/colors";
import Circle from "./circle";

const PauseSlide: React.FC<{
  onStartTimer: () => void;
  onCancelTimer: () => void;
}> = ({ onStartTimer, onCancelTimer }) => {
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
