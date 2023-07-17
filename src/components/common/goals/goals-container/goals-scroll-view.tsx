import React, { ReactNode } from "react";
import { ScrollView, StyleSheet } from "react-native";

type GoalsScrollViewProps = {
  children: ReactNode;
};

const GoalsScrollView: React.FC<GoalsScrollViewProps> = ({ children }) => {
  return (
    <ScrollView horizontal style={styles.horizontalScroll}>
      {children}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  horizontalScroll: {
    flexDirection: "row",
    marginLeft: 15,
    flex: 1,
  },
});

export default GoalsScrollView;
