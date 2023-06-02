import { StatusBar } from "expo-status-bar";
import { ReactNode } from "react";
import { LayoutChangeEvent, ScrollView, ViewStyle } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { StatusBarColor } from "../../utils/types/enums";

type ScrollViewScreenWrapperProps = {
  statusBarColor?: StatusBarColor;
  backgroundColor?: string;
  style?: ViewStyle;
  defaultPadding?: boolean;
  children: ReactNode;
  onLayout?: (event: LayoutChangeEvent) => void;
};

const ScrollViewScreenWrapper: React.FC<ScrollViewScreenWrapperProps> = ({
  statusBarColor,
  backgroundColor,
  style,
  defaultPadding,
  children,
  onLayout,
}) => {
  return (
    <ScrollView>
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
    </ScrollView>
  );
};

export default ScrollViewScreenWrapper;
