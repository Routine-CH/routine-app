import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import AppColors from "../../../utils/constants/colors";

interface ButtonProps {
  iconName: string;
  navigateTo?: () => void;
}

const IconButton: React.FC<ButtonProps> = ({ iconName, navigateTo }) => {
  return (
    <TouchableOpacity style={styles.button} onPress={navigateTo}>
      <View>
        <Icon name={iconName} size={25} color={AppColors.blue100} />
      </View>
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
