import { StyleProp, TextInput, TextStyle, View, ViewStyle } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

type IconInputFieldProps = {
  iconName: string;
  placeholder: string;
  size: number;
  containerStyle?: StyleProp<ViewStyle>;
  inputStyle?: StyleProp<TextStyle>;
};

const IconInputField: React.FC<IconInputFieldProps> = ({
  iconName,
  placeholder,
  size,
  containerStyle,
  inputStyle,
}) => {
  return (
    <View style={containerStyle}>
      <Icon
        name={iconName}
        size={size}
        color='rgba(0, 0, 0, 0.6)'
        style={{ marginLeft: 18, marginRight: 20 }}
      />
      <TextInput
        style={inputStyle}
        placeholder={placeholder}
        placeholderTextColor='rgba(0,0,0,0.7))'
      />
    </View>
  );
};

export default IconInputField;
