import { StatusBar } from "expo-status-bar";
import React, { ReactNode } from "react";
import { ScrollView, View, ViewStyle } from "react-native";
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

const ScrollViewScreenWrapper: React.FC<ScrollViewScreenWrapperProps> = ({
  statusBarColor,
  backgroundColor,
  style,
  defaultPadding,
  children,
}) => {
  // get current status bar height of device to add it as a padding in the view
  const statusBarHeight = getStatusBarHeight();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor,
        paddingTop: statusBarHeight,
      }}
    >
      <StatusBar style={statusBarColor ? statusBarColor : "auto"} />
      <ScrollView
        style={{
          flex: 1,
          paddingHorizontal: defaultPadding ? 30 : 0,
          ...style,
        }}
      >
        {/* implement safeareview to respect the safearea without the padding top  */}
        <SafeAreaView edges={["right", "bottom", "left"]}>
          {children}
        </SafeAreaView>
      </ScrollView>
    </View>
  );
};

export default ScrollViewScreenWrapper;
