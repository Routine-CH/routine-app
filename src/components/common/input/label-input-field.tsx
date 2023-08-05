import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  TextStyle,
  View,
  ViewStyle,
} from "react-native";
import AppColors from "../../../utils/constants/colors";
import AppFontStyle from "../../../utils/constants/font-style";

type LabelInputFieldProps = {
  placeholder?: any;
  editText?: string;
  style?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
  isEditable?: boolean;
} & TextInputProps;

const LabelInputField: React.FC<LabelInputFieldProps> = ({
  placeholder,
  editText,
  style,
  inputStyle,
  isEditable,
  ...textInputProps
}) => {
  return (
    <View style={[styles.inputContainer, style]}>
      <TextInput
        style={[styles.inputStyle, inputStyle]}
        placeholder={placeholder}
        placeholderTextColor={AppColors.black70}
        editable={isEditable}
        {...textInputProps}
      >
        {editText}
      </TextInput>
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
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  inputStyle: {
    flex: 1,
    borderColor: "transparent",
    fontSize: AppFontStyle.body.fontSize,
    fontFamily: AppFontStyle.body.fontFamily,
    color: AppColors.black70,
  },
});
