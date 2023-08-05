import { useState } from "react";
import { Control, FieldValues } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import AppColors from "../../utils/constants/colors";
import DropdownButton from "../common/buttons/dropdown-button";
import IconTextButton from "../common/buttons/icon-text-button";
import CreateAndLinkTodoModal from "./create-and-link-todo-modal";

type GoalAddTodoViewProps = {
  control: Control<FieldValues, any>;
  isEditable: boolean;
};

const GoalAddTodoView: React.FC<GoalAddTodoViewProps> = ({
  control,
  isEditable,
}) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleModalPress = () => {
    setIsModalVisible(true);
  };

  const handleSelect = (option: string) => {
    console.log(`Selected: ${option}`);
  };

  return (
    <View style={styles.container}>
      <IconTextButton
        iconName='add-outline'
        size={30}
        title='Neues Todo erstellen'
        style={styles.iconTextButton}
        handleModalPress={handleModalPress}
        isEditable={!isEditable}
        noIcon
      />
      <DropdownButton
        title='Existierendes Todo verknüpfen'
        options={["Option 1", "Option 2", "Option 3"]}
        onSelect={handleSelect}
        hasMarginTop={true}
      />
      <CreateAndLinkTodoModal
        isModalVisible={isModalVisible}
        isEditable={isEditable}
      />
    </View>
  );
};

export default GoalAddTodoView;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 30,
  },
  iconTextButton: {
    backgroundColor: AppColors.blue100Muted20,
    marginVertical: 15,
  },
  inputField: {
    backgroundColor: AppColors.blueMuted20,
    marginVertical: 15,
  },
});
