import { Pressable, StyleProp, ViewStyle } from "react-native";
import AppText, { AppTextProps } from "../typography/app-text";

interface FlatButtonProps extends AppTextProps {
  buttonStyle?: StyleProp<ViewStyle>;
}

const FlatButton: React.FC<FlatButtonProps> = ({
  children,
  fontStyle,
  colorStyle,
  fontSize,
  style,
  buttonStyle,
  ...props
}) => {
  return (
    <Pressable style={buttonStyle}>
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
