import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from "react-native";
import AppColors from "../../../utils/constants/colors";
import AppFontStyle from "../../../utils/constants/font-style";

type LabelInputFieldProps = {
  placeholder: string;
  style?: StyleProp<ViewStyle>;
} & TextInputProps;

const LabelInputField: React.FC<LabelInputFieldProps> = ({
  placeholder,
  style,
  ...textInputProps
}) => {
  return (
    <View style={[styles.inputContainer, style]}>
      <TextInput
        style={styles.inputStyle}
        placeholder={placeholder}
        placeholderTextColor={AppColors.black70}
        {...textInputProps}
      />
    </View>
  );
};

export default LabelInputField;

const styles = StyleSheet.create({
  inputContainer: {
    borderRadius: 10,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  inputStyle: {
    flex: 1,
    borderColor: "transparent",
    padding: 15,
    fontSize: AppFontStyle.body.fontSize,
    fontFamily: AppFontStyle.body.fontFamily,
    color: AppColors.black70,
  },
});
