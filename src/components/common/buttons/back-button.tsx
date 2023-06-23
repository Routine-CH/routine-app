import { useNavigation } from "@react-navigation/native";
import { Pressable, StyleProp, StyleSheet, ViewStyle } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import AppColors from "../../../utils/constants/colors";

type BackButtonProps = {
  style?: StyleProp<ViewStyle>;
};

const BackButton: React.FC<BackButtonProps> = ({ style }) => {
  const navigation = useNavigation();

  return (
    <Pressable
      style={[styles.container, style]}
      onPress={() => navigation.goBack()}
    >
      <Icon name='arrow-back-outline' size={26} style={[styles.icon, style]} />
    </Pressable>
  );
};

export default BackButton;

const styles = StyleSheet.create({
  container: {
    position: "relative",
    backgroundColor: AppColors.blue100,
    height: 38,
    width: 38,
    borderRadius: 50,
    alignItems: "center",
    justifyContent: "center",
  },
  icon: {
    color: AppColors.white,
  },
});
