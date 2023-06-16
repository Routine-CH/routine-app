import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";

type SkeletonProps = {
  children: React.ReactNode;
  style?: StyleProp<ViewStyle>;
};

const Skeleton: React.FC<SkeletonProps> = ({ children, style }) => {
  return <View style={[styles.container, style]}>{children}</View>;
};

export default Skeleton;

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
});
