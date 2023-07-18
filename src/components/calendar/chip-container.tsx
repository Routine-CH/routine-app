import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import Chip from "./chip";

type ChipContainerProps = {};

const ChipContainer: React.FC<ChipContainerProps> = ({}) => {
  const { t } = useTranslation();

  return (
    <View style={styles.chipContainer}>
      <Chip text={t("tool-cards.goals")} />
      <Chip text={t("tool-cards.goals")} />
      <Chip text={t("tool-cards.goals")} />
    </View>
  );
};

export default ChipContainer;

const styles = StyleSheet.create({
  chipContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
