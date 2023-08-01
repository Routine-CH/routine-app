import { useNavigation } from "@react-navigation/native";
import { Pressable, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import AppColors from "../../../utils/constants/colors";

const CameraBackButton: React.FC = () => {
  const navigation = useNavigation();

  return (
    <Pressable onPress={() => navigation.goBack()} style={styles.iconContainer}>
      <Icon name='close-outline' size={40} style={styles.iconColor} />
    </Pressable>
  );
};

export default CameraBackButton;

const styles = StyleSheet.create({
  iconContainer: {
    position: "absolute",
    top: 25,
    left: 10,
    borderRadius: 50,
    backgroundColor: "rgba(52, 52, 52, 0.5)",
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  iconColor: {
    color: AppColors.white,
  },
});
