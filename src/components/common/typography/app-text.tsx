import { Text, TextProps } from "react-native";
import AppColors from "../../../utils/constants/colors";
import AppFontStyle from "../../../utils/constants/font-style";

export interface AppTextProps extends TextProps {
  fontStyle?: keyof typeof AppFontStyle;
  colorStyle?: keyof typeof AppColors;
  fontSize?: number;
  children?: React.ReactNode | null;
}

const AppText: React.FC<AppTextProps> = ({
  fontStyle = "bodyRegular",
  colorStyle = "black",
  fontSize,
  style,
  children,
  ...props
}) => {
  const customStyle = {
    ...AppFontStyle[fontStyle],
    color: AppColors[colorStyle],
    fontSize,
  };

  return (
    <Text {...props} style={[customStyle, style]}>
      {children}
    </Text>
  );
};

export default AppText;
