import React, { ReactNode } from "react";
import { ScrollView, StyleSheet } from "react-native";

type GoalsScrollViewProps = {
  children: ReactNode;
};

const GoalsScrollView: React.FC<GoalsScrollViewProps> = ({ children }) => {
  return (
    <ScrollView
      horizontal
      style={styles.horizontalScroll}
      showsHorizontalScrollIndicator={false}
    >
      {children}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  horizontalScroll: {
    flexDirection: "row",
    flex: 1,
  },
});

export default GoalsScrollView;
