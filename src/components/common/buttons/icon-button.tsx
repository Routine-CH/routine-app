import React from "react";
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import AppColors from "../../../utils/constants/colors";

interface ButtonProps {
  iconName: string;
  style?: StyleProp<ViewStyle>;
  onPress?: () => void;
}

const IconButton: React.FC<ButtonProps> = ({ iconName, style, onPress }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Icon name={iconName} size={25} color={AppColors.blue100} />
    </TouchableOpacity>
  );
};

export default IconButton;

const styles = StyleSheet.create({
  button: {
    width: 44,
    height: 44,
    borderRadius: 8,
    backgroundColor: AppColors.blueMuted30,
    justifyContent: "center",
    alignItems: "center",
  },
});
