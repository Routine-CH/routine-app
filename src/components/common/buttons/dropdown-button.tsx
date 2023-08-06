import React, { useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import AppColors from "../../../utils/constants/colors";
import { UserTodo } from "../../../utils/types/types";
import AppText from "../typography/app-text";

interface DropdownButtonProps {
  title: string;
  onSelect: (option: string) => void;
  allTodos: UserTodo[];
  hasMarginTop: boolean;
}

const DropdownButton: React.FC<DropdownButtonProps> = ({
  title,
  onSelect,
  allTodos,
  hasMarginTop,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <View
      style={{
        marginTop: hasMarginTop ? 15 : 0,
        position: "relative",
      }}
    >
      <Pressable style={styles.button} onPress={() => setIsOpen(!isOpen)}>
        <AppText fontStyle='body' colorStyle='black70'>
          {title}
        </AppText>
        <Icon
          name='chevron-down-outline'
          size={25}
          color={AppColors.blue100}
          style={styles.iconPlacement}
        />
      </Pressable>
      {isOpen && (
        <ScrollView
          style={styles.dropdown}
          showsVerticalScrollIndicator={false}
        >
          {allTodos.map((option, index) => (
            <Pressable
              key={index}
              style={styles.option}
              onPress={() => {
                onSelect(option.id);
                setIsOpen(false);
              }}
            >
              <AppText fontStyle='body' colorStyle='black70'>
                {option.title}
              </AppText>
            </Pressable>
          ))}
        </ScrollView>
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
    marginTop: 5,
    borderRadius: 10,
    width: "100%",
    maxHeight: 200,
    backgroundColor: AppColors.blue300,
  },
  option: {
    padding: 15,
  },
  iconPlacement: {
    position: "absolute",
    right: 15,
  },
});

export default DropdownButton;
