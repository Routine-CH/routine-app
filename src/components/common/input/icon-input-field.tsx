import {
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import AppColors from "../../../utils/constants/colors";
import AppFontStyle from "../../../utils/constants/font-style";

type IconInputFieldProps = {
  iconName: string;
  placeholder: string;
  size: number;
  style?: StyleProp<ViewStyle>;
} & TextInputProps;

const IconInputField: React.FC<IconInputFieldProps> = ({
  iconName,
  placeholder,
  size,
  style,
  ...textInputProps
}) => {
  return (
    <View style={[styles.inputContainer, style]}>
      <Icon
        name={iconName}
        size={size}
        color={AppColors.black60}
        style={{ marginLeft: 18, marginRight: 20 }}
      />
      <TextInput
        style={styles.inputStyle}
        placeholder={placeholder}
        placeholderTextColor={AppColors.black70}
        {...textInputProps}
      />
    </View>
  );
};

export default IconInputField;

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
    paddingVertical: 16,
    fontSize: AppFontStyle.body.fontSize,
    fontFamily: AppFontStyle.body.fontFamily,
    color: AppColors.black70,
    marginRight: 20,
  },
});
