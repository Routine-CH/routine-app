// src/components/ScreenWrapper.tsx
import { StatusBar } from "expo-status-bar";
import { ReactNode } from "react";
import { LayoutChangeEvent, ViewStyle } from "react-native";
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
            backgroundColor,
            paddingHorizontal: defaultPadding ? 30 : 0,
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
