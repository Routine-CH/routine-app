import { StatusBar } from "expo-status-bar";
import React, { ReactNode } from "react";
import {
  Dimensions,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  View,
  ViewStyle,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getStatusBarHeight } from "react-native-status-bar-height";
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
  // get current status bar height of device to add it as a padding in the view
  const statusBarHeight = Math.max(getStatusBarHeight(), 40);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <View
        style={{
          flex: 1,
          backgroundColor,
          paddingTop: statusBarHeight,
          position: "relative",
        }}
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
          {/* implement safeareview to respect the safearea without the padding top  */}
          <SafeAreaView edges={["right", "left"]}>{children}</SafeAreaView>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
};

export default ScrollViewScreenWrapper;
