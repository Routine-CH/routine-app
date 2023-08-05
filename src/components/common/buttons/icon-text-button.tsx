import React from "react";
import {
  Dimensions,
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
  isEditable?: boolean;
}

const windowWidth = Dimensions.get("window").width;

const IconTextButton: React.FC<ButtonProps> = ({
  iconName,
  size,
  title,
  handleModalPress,
  style,
  isEditable,
}) => {
  return (
    <TouchableOpacity
      style={[styles.button, style]}
      onPress={handleModalPress}
      disabled={isEditable}
    >
      <Icon
        name={iconName}
        size={size}
        color={AppColors.blue100}
        style={{
          marginLeft: windowWidth * 0.05,
          marginRight: windowWidth * 0.03,
        }}
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
