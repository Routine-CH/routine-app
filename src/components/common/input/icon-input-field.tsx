import {
  StyleProp,
  StyleSheet,
  TextInput,
  View,
  ViewStyle,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

type IconInputFieldProps = {
  iconName: string;
  placeholder: string;
  size: number;
  style?: StyleProp<ViewStyle>;
};

const IconInputField: React.FC<IconInputFieldProps> = ({
  iconName,
  placeholder,
  size,
  style,
}) => {
  return (
    <View style={[styles.inputContainer, style]}>
      <Icon
        name={iconName}
        size={size}
        color='rgba(0, 0, 0, 0.6)'
        style={{ marginLeft: 18, marginRight: 20 }}
      />
      <TextInput
        style={styles.inputStyle}
        placeholder={placeholder}
        placeholderTextColor='rgba(0,0,0,0.7))'
      />
    </View>
  );
};

export default IconInputField;

const styles = StyleSheet.create({
  inputContainer: {
    backgroundColor: "rgba(185, 209, 217, 0.2);",
    borderRadius: 10,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
  },
  inputStyle: {
    flex: 1,
    borderColor: "transparent",
    paddingVertical: 16,
    fontSize: 18,
    fontFamily: "Ubuntu_400Regular",
    color: "rgba(0,0,0,0.7))",
    marginRight: 20,
  },
});
