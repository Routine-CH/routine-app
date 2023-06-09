import React from "react";
import { StyleSheet, View } from "react-native";
import AppColors from "../../utils/constants/colors";
import AppText from "../common/typography/app-text";

const Circle = () => {
  return (
    <View style={styles.circle}>
      <AppText fontStyle="heading1" colorStyle="white">
        25:00
      </AppText>
    </View>
  );
};

export default Circle;

const styles = StyleSheet.create({
  circle: {
    width: 250,
    height: 250,
    borderRadius: 125,
    borderWidth: 20,
    marginVertical: 60,
    borderColor: AppColors.white,
    justifyContent: "center",
    alignItems: "center",
  },
});
