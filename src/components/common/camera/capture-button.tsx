import { Pressable, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import AppColors from "../../../utils/constants/colors";

type CaptureButtonProps = { onPress: () => Promise<void> };

const CaptureButton: React.FC<CaptureButtonProps> = ({ onPress }) => {
  return (
    <Pressable style={styles.iconContainer} onPress={onPress}>
      <Icon name='camera-outline' size={40} style={styles.iconColor} />
    </Pressable>
  );
};

export default CaptureButton;

const styles = StyleSheet.create({
  iconContainer: {
    position: "absolute",
    bottom: 50,
    left: "50%",
    transform: [{ translateX: -25 }],
    borderRadius: 50,
    backgroundColor: "rgba(52, 52, 52, 0.8)",
    width: 65,
    height: 65,
    alignItems: "center",
    justifyContent: "center",
  },
  iconColor: {
    color: AppColors.white,
  },
});
