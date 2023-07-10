import React from "react";
import {
  StyleProp,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import AppColors from "../../../utils/constants/colors";
import AppText from "../typography/app-text";

interface ButtonProps {
  iconName: string;
  size: number;
  title: string;
  handleModalPress?: () => void;
  style?: StyleProp<ViewStyle>;
}

const IconTextButton: React.FC<ButtonProps> = ({
  iconName,
  size,
  title,
  handleModalPress,
  style,
}) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={handleModalPress}>
      <Icon
        name={iconName}
        size={size}
        color={AppColors.blue100}
        style={{ marginLeft: 18, marginRight: 20 }}
      />
      <AppText
        fontStyle="body"
        colorStyle="black70"
        style={{ paddingVertical: 16 }}
      >
        {title}
      </AppText>
    </TouchableOpacity>
  );
};

export default IconTextButton;

const styles = StyleSheet.create({
  button: {
    borderRadius: 10,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
});
