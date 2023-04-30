import { Text, TextProps } from "@ui-kitten/components";
import { TextStyle } from "react-native/types";

interface AppTextProps extends TextProps {
  size?: number;
  weight?: "bold" | "semi-bold" | "regular" | "light";
  color?: string;
}

const AppText: React.FC<AppTextProps> = ({
  size = 18,
  weight = "regular",
  color = "black",
  style,
  ...props
}) => {
  const fontWeights: { [key: string]: TextStyle } = {
    light: { fontFamily: "Ubuntu-Light", fontWeight: "300" },
    regular: { fontFamily: "Ubuntu-Regular", fontWeight: "400" },
    medium: { fontFamily: "Ubuntu-Medium", fontWeight: "500" },
    bold: { fontFamily: "Ubuntu-Bold", fontWeight: "700" },
  };

  const customStyle = {
    fontWeight: fontWeights[weight].fontWeight,
    fontSize: size,
    color: color,
  };

  return <Text {...props} style={[fontWeights[weight], customStyle, style]} />;
};

export default AppText;
