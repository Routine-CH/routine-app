import { ActivityIndicator, Dimensions, StyleSheet, View } from "react-native";
import AppColors from "../../utils/constants/colors";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

export const FullscreenLoadingIndicator = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={AppColors.blue100} size={"large"} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    height: windowHeight * 1,
    width: windowWidth * 1,
    marginLeft: -20,
    zIndex: 9999,
    alignItems: "center",
    justifyContent: "center",
  },
});
