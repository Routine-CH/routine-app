import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import AppColors from "../../../utils/constants/colors";

interface CheckBoxProps {
  isChecked: boolean;
  onToggle: (checked: boolean) => void;
}

const CheckBox: React.FC<CheckBoxProps> = ({ isChecked, onToggle }) => {
  const handleToggle = () => {
    onToggle(!isChecked);
  };

  return (
    <TouchableOpacity activeOpacity={1} onPress={handleToggle}>
      <View
        style={[
          styles.checkBox,
          {
            borderColor: AppColors.blue300,
            backgroundColor: AppColors.white,
          },
        ]}
      >
        {isChecked && (
          <Icon
            style={{ position: "relative", bottom: 3, right: 2 }}
            name='checkmark-sharp'
            color={AppColors.blue200}
            size={25}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  checkBox: {
    width: 26,
    height: 26,
    borderWidth: 3,
    borderRadius: 4,
  },
});

export default CheckBox;
