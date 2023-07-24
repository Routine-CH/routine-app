import { useNavigation } from "@react-navigation/native";
import { Pressable, StyleProp, StyleSheet, ViewStyle } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import AppColors from "../../../utils/constants/colors";

type BackButtonProps = {
  style?: StyleProp<ViewStyle>;
  type?: boolean;
};

const BackButton: React.FC<BackButtonProps> = ({ style, type }) => {
  const navigation = useNavigation();

  return (
    <Pressable
      style={[styles.container, style]}
      onPress={() => navigation.goBack()}
    >
      <Icon
        name="arrow-back-outline"
        size={26}
        style={type ? styles.lightIcon : styles.defaultIcon}
      />
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
  defaultIcon: {
    color: AppColors.white,
  },
  lightIcon: {
    color: AppColors.blue100,
  },
});
