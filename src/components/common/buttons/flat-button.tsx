import { Pressable, StyleProp, ViewStyle } from "react-native";
import AppText, { AppTextProps } from "../typography/app-text";

interface FlatButtonProps extends AppTextProps {
  buttonStyle?: StyleProp<ViewStyle>;
  disabled?: boolean;
  onPress: () => void;
}

const FlatButton: React.FC<FlatButtonProps> = ({
  children,
  fontStyle,
  disabled,
  colorStyle,
  fontSize,
  style,
  buttonStyle,
  onPress,
  ...props
}) => {
  return (
    <Pressable style={buttonStyle} onPress={onPress} disabled={disabled}>
      <AppText
        fontStyle={fontStyle}
        colorStyle={colorStyle}
        fontSize={fontSize}
        style={style}
        {...props}
      >
        {children}
      </AppText>
    </Pressable>
  );
};

export default FlatButton;
