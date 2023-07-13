import { Pressable, StyleProp, StyleSheet, ViewStyle } from "react-native";
import AppColors from "../../utils/constants/colors";
import AppText from "../common/typography/app-text";

interface ChipProps {
  text: string;
  style?: StyleProp<ViewStyle>;
  onDelete?: () => void;
}

const Chip: React.FC<ChipProps> = ({ text, style, onDelete }) => {
  return (
    <Pressable style={[styles.chipContainer, style]} onPress={onDelete}>
      <AppText fontStyle="filters" colorStyle="black70">
        {text}
      </AppText>
    </Pressable>
  );
};

export default Chip;

const styles = StyleSheet.create({
  chipContainer: {
    height: 33,
    width: 100,
    borderRadius: 14,
    backgroundColor: AppColors.blueMuted20,
    justifyContent: "center",
    alignItems: "center",
  },
});
