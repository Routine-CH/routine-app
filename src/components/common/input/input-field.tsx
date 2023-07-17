import { StyleSheet, TextInput } from "react-native";
import AppColors from "../../../utils/constants/colors";
import AppFontStyle from "../../../utils/constants/font-style";

type InputFieldProps = {
  defaultValue?: string;
};

const InputField: React.FC<InputFieldProps> = ({ defaultValue }) => {
  return <TextInput style={styles.container} defaultValue={defaultValue} />;
};

export default InputField;

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.white,
    fontSize: AppFontStyle.body.fontSize,
    fontFamily: AppFontStyle.body.fontFamily,
    color: AppColors.black70,
    borderRadius: 10,
    padding: 15,
  },
});
