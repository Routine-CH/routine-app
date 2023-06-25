import { StyleSheet, TextInput } from "react-native";
import AppColors from "../../../utils/constants/colors";

const InputField: React.FC = () => {
  return <TextInput style={styles.container}></TextInput>;
};

export default InputField;

const styles = StyleSheet.create({
  container: {
    backgroundColor: AppColors.white,
    borderRadius: 10,
    padding: 15,
  },
});
