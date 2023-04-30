import { Text, TextProps } from "@ui-kitten/components";
import { TextStyle } from "react-native/types";

interface AppTextProps extends TextProps {
  size?: number;
  weight?: "bold" | "medium" | "regular" | "light";
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
    light: { fontFamily: "Ubuntu_300Light", fontWeight: "300" },
    lightItalic: { fontFamily: "Ubuntu_300Light_Italic", fontWeight: "300" },
    regular: { fontFamily: "Ubuntu_400Regular", fontWeight: "400" },
    italic: { fontFamily: "Ubuntu_400Regular_Italic", fontWeight: "400" },
    medium: { fontFamily: "Ubuntu_500Medium", fontWeight: "500" },
    mediumItalic: { fontFamily: "Ubuntu_500Medium_Italic", fontWeight: "500" },
    bold: { fontFamily: "Ubuntu_700Bold", fontWeight: "700" },
    boldItalic: { fontFamily: "Ubuntu_700Bold_Italic", fontWeight: "700" },
  };

  const customStyle = {
    fontWeight: fontWeights[weight].fontWeight,
    fontSize: size,
    color: color,
  };

  return <Text {...props} style={[fontWeights[weight], customStyle, style]} />;
};

export default AppText;
