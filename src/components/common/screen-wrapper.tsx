// src/components/ScreenWrapper.tsx
import React from "react";
import {
  LayoutChangeEvent,
  Platform,
  SafeAreaView,
  StatusBar,
  ViewStyle,
} from "react-native";

type ScreenWrapperProps = {
  backgroundColor?: string;
  style?: ViewStyle;
  children: React.ReactNode;
  onLayout?: (event: LayoutChangeEvent) => void;
};

const ScreenWrapper: React.FC<ScreenWrapperProps> = ({
  backgroundColor = "white",
  style,
  children,
  onLayout,
}) => {
  const statusBarHeight =
    Platform.OS === "android" ? StatusBar.currentHeight : 0;

  return (
    <SafeAreaView
      style={[{ flex: 1, backgroundColor, paddingTop: statusBarHeight }, style]}
      onLayout={onLayout}
    >
      {children}
    </SafeAreaView>
  );
};

export default ScreenWrapper;
