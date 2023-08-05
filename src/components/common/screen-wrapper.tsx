// src/components/ScreenWrapper.tsx
import { StatusBar } from "expo-status-bar";
import { ReactNode } from "react";
import { Dimensions, LayoutChangeEvent, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBarColor } from "../../utils/types/enums";

type ScreenWrapperProps = {
  statusBarColor?: StatusBarColor;
  backgroundColor?: string;
  style?: ViewStyle;
  defaultPadding?: boolean;
  children: ReactNode;
  onLayout?: (event: LayoutChangeEvent) => void;
};

const windowWidth = Dimensions.get("window").width;

const ScreenWrapper: React.FC<ScreenWrapperProps> = ({
  statusBarColor,
  backgroundColor = "white",
  style,
  defaultPadding,
  children,
  onLayout,
}) => {
  return (
    <>
      <StatusBar style={statusBarColor} />
      <SafeAreaView
        style={[
          {
            flex: 1,
            backgroundColor: backgroundColor,
            paddingHorizontal: defaultPadding ? windowWidth * 0.05 : 0,
            position: "relative",
          },
          style,
        ]}
        onLayout={onLayout}
      >
        {children}
      </SafeAreaView>
    </>
  );
};

export default ScreenWrapper;
