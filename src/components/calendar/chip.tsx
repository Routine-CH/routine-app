import { Pressable, StyleSheet } from "react-native";
import AppColors from "../../utils/constants/colors";
import AppText from "../common/typography/app-text";

interface ChipProps {
  text: string;
}

const Chip: React.FC<ChipProps> = ({ text }) => {
  return (
    <Pressable style={styles.chipContainer}>
      <AppText fontStyle="filters" colorStyle="black64">
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
