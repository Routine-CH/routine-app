import {
  ActivityIndicator,
  Dimensions,
  StyleProp,
  StyleSheet,
  View,
  ViewStyle,
} from "react-native";
import AppColors from "../../utils/constants/colors";

const windowHeight = Dimensions.get("window").height;
const windowWidth = Dimensions.get("window").width;

type FullscreenLoadingIndicatorProps = {
  style?: StyleProp<ViewStyle>;
};

export const FullscreenLoadingIndicator: React.FC<
  FullscreenLoadingIndicatorProps
> = ({ style }) => {
  return (
    <View style={[styles.container, style]}>
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
    zIndex: 100,
    alignItems: "center",
    justifyContent: "center",
  },
});
