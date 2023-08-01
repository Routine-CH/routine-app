import {
  Dimensions,
  Pressable,
  StyleProp,
  StyleSheet,
  ViewStyle,
} from "react-native";
import AppColors from "../../utils/constants/colors";
import AppText from "../common/typography/app-text";

interface ChipProps {
  text: string;
  style?: StyleProp<ViewStyle>;
  selected?: boolean;
  onPress?: () => void;
}

const windowWidth = Dimensions.get("window").width;

const Chip: React.FC<ChipProps> = ({ text, style, selected, onPress }) => {
  return (
    <Pressable
      style={[
        styles.chipContainer,
        style,
        {
          backgroundColor: selected ? AppColors.blue200 : AppColors.blueMuted20,
        },
      ]}
      onPress={onPress}
    >
      <AppText
        fontStyle={selected ? "filtersSelected" : "filters"}
        colorStyle={selected ? "white" : "black70"}
      >
        {text}
      </AppText>
    </Pressable>
  );
};

export default Chip;

const styles = StyleSheet.create({
  chipContainer: {
    height: 33,
    width: windowWidth * 0.28,
    borderRadius: 14,
    justifyContent: "center",
    alignItems: "center",
  },
});
