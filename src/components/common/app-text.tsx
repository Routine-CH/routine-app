import { Text, TextProps } from "@ui-kitten/components";
import AppColors from "../../utils/constants/colors";
import AppFontStyle from "../../utils/constants/font-style";

interface AppTextProps extends TextProps {
  fontStyle?: keyof typeof AppFontStyle;
  colorStyle?: keyof typeof AppColors;
  fontSize?: number;
}

const AppText: React.FC<AppTextProps> = ({
  fontStyle = "bodyRegular",
  colorStyle = "black",
  fontSize,
  style,
  ...props
}) => {
  const customStyle = {
    ...AppFontStyle[fontStyle],
    color: AppColors[colorStyle],
    fontSize,
  };

  return <Text {...props} style={[customStyle, style]} />;
};

export default AppText;
