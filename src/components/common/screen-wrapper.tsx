// src/components/ScreenWrapper.tsx
import { StatusBar } from "expo-status-bar";
import React from "react";
import { LayoutChangeEvent, SafeAreaView, ViewStyle } from "react-native";

export enum StatusBarColor {
  light = "light",
  dark = "dark",
  auto = "auto",
  inverted = "inverted",
}

type ScreenWrapperProps = {
  statusBarColor?: StatusBarColor;
  backgroundColor?: string;
  style?: ViewStyle;
  children: React.ReactNode;
  onLayout?: (event: LayoutChangeEvent) => void;
};

const ScreenWrapper: React.FC<ScreenWrapperProps> = ({
  statusBarColor,
  backgroundColor = "white",
  style,
  children,
  onLayout,
}) => {
  return (
    <>
      <StatusBar style={statusBarColor} />
      <SafeAreaView
        style={[{ flex: 1, backgroundColor }, style]}
        onLayout={onLayout}
      >
        {children}
      </SafeAreaView>
    </>
  );
};

export default ScreenWrapper;
