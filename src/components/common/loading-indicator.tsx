import { ActivityIndicator, StyleSheet, View } from "react-native";
import AppColors from "../../utils/constants/colors";

export const LoadingIndicator = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={AppColors.blue100} size={"large"} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
  },
});
