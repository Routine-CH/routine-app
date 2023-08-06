import { Control, Controller, FieldValues } from "react-hook-form";
import { StyleSheet, View } from "react-native";
import AppColors from "../../utils/constants/colors";
import { UserGoals } from "../../utils/types/types";
import LabelInputField from "../common/input/label-input-field";

type GoalDetailViewProps = {
  control: Control<FieldValues, any>;
  isEditable: boolean;
  goal?: UserGoals | undefined;
};

const GoalDetailView: React.FC<GoalDetailViewProps> = ({
  control,
  isEditable,
  goal,
}) => {
  return (
    <View style={styles.container}>
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <LabelInputField
            placeholder='Titel'
            style={styles.inputField}
            onBlur={onBlur}
            onChangeText={(value) => onChange(value)}
            value={value}
            isEditable={isEditable}
          />
        )}
        name='title'
        defaultValue={goal?.title || ""}
        rules={{
          required: "Bitte gib dem Ziel einen Titel",
          minLength: {
            value: 5,
            message: "Der Titel muss mindestens 5 Zeichen lang sein",
          },
        }}
      />
      <Controller
        control={control}
        render={({ field: { onChange, onBlur, value } }) => (
          <LabelInputField
            placeholder='Beschreibe dein Ziel und wieso du es erreichen möchtest'
            style={styles.inputField}
            onBlur={onBlur}
            multiline={true}
            onChangeText={(value) => onChange(value)}
            value={value}
            isEditable={isEditable}
          />
        )}
        name='description'
        defaultValue={goal?.description || ""}
        rules={{
          required: "Bitte beschreibe dein Ziel",
          minLength: {
            value: 5,
            message: "Die Beschreibung muss mindestens 5 Zeichen lang sein",
          },
        }}
      />
    </View>
  );
};

export default GoalDetailView;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    marginVertical: 30,
  },
  inputField: {
    backgroundColor: AppColors.blueMuted20,
    marginVertical: 15,
  },
});
