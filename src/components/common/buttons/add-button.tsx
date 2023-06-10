import React from "react";
import { Pressable, StyleProp, StyleSheet, ViewStyle } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import AppColors from "../../../utils/constants/colors";

type AddButtonProps = {
  style?: StyleProp<ViewStyle>;
};

const AddButton: React.FC<AddButtonProps> = ({ style }) => {
  return (
    <Pressable style={styles.positioning}>
      <Icon name={"add-circle"} size={57} color={AppColors.blue100} />
    </Pressable>
  );
};

export default AddButton;

const styles = StyleSheet.create({
  positioning: {
    position: "absolute",
    bottom: 20,
    right: 20,
  },
});
