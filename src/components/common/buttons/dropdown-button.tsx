import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import AppColors from "../../../utils/constants/colors";
import AppText from "../typography/app-text";

interface DropdownButtonProps {
  title: string;
  options: string[];
  onSelect: (option: string) => void;
  hasMarginTop: boolean;
}

const DropdownButton: React.FC<DropdownButtonProps> = ({
  title,
  options,
  onSelect,
  hasMarginTop,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View style={{ marginTop: hasMarginTop ? 15 : 0 }}>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setIsOpen(!isOpen)}
      >
        <AppText fontStyle='body' colorStyle='black70'>
          {title}
        </AppText>
        <Icon
          name='chevron-down-outline'
          size={25}
          color={AppColors.blue100}
          style={styles.iconPlacement}
        />
      </TouchableOpacity>

      {isOpen && (
        <View style={styles.dropdown}>
          {options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={styles.option}
              onPress={() => {
                onSelect(option);
                setIsOpen(false);
              }}
            >
              <Text style={styles.text}>{option}</Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
    padding: 10,
    backgroundColor: AppColors.blue100Muted20,
    paddingVertical: 15,
    paddingHorizontal: 20,
    position: "relative",
  },
  text: {
    fontSize: 16,
  },
  icon: {
    width: 20,
    height: 20,
    marginLeft: 10,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: "#ccc",
  },
  option: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  iconPlacement: {
    position: "absolute",
    right: 15,
  },
});

export default DropdownButton;
