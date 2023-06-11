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

type IconInputFieldProps = {
  onChangeText: any;
  placeholder: string;
  type: string;
  style?: StyleProp<ViewStyle>;
} & TextInputProps;

const TimerInputField: React.FC<IconInputFieldProps> = ({
  onChangeText,
  placeholder,
  type,
  style,
  ...textInputProps
}) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput
        maxLength={2}
        keyboardType="numeric"
        style={styles.inputStyle}
        value={type}
        onChangeText={onChangeText}
        placeholder={placeholder}
        placeholderTextColor={AppColors.black70}
        {...textInputProps}
      />
    </View>
  );
};

export default TimerInputField;

const styles = StyleSheet.create({
  inputContainer: {
    borderRadius: 10,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  inputStyle: {
    textAlign: "center",
    height: 55,
    width: "100%",
    borderRadius: 10,
    backgroundColor: AppColors.blueMuted20,
    fontSize: AppFontStyle.body.fontSize,
    fontFamily: AppFontStyle.body.fontFamily,
    color: AppColors.black70,
  },
});
