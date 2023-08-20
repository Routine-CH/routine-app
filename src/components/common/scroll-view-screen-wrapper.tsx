import { StatusBar } from "expo-status-bar";
import React, { ReactNode } from "react";
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ViewStyle,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBarColor } from "../../utils/types/enums";

type ScrollViewScreenWrapperProps = {
  statusBarColor?: StatusBarColor;
  backgroundColor?: string;
  style?: ViewStyle;
  defaultPadding?: boolean;
  children: ReactNode;
};

const windowWidth = Dimensions.get("window").width;

const ScrollViewScreenWrapper: React.FC<ScrollViewScreenWrapperProps> = ({
  statusBarColor,
  backgroundColor,
  style,
  defaultPadding,
  children,
}) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor,
          position: "relative",
        }}
        edges={["top", "right", "left"]}
      >
        <StatusBar style={statusBarColor ? statusBarColor : "auto"} />
        <ScrollView
          showsVerticalScrollIndicator={false}
          style={{
            flex: 1,
            paddingVertical: 10,
            paddingHorizontal: defaultPadding ? windowWidth * 0.05 : 0,
            ...style,
          }}
        >
          {children}
        </ScrollView>
      </SafeAreaView>
    </KeyboardAvoidingView>
  );
};

export default ScrollViewScreenWrapper;
