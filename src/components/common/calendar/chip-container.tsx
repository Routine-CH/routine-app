import { Dispatch, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";

import { CalendarDataTypes } from "../../../utils/types/calendar/types";
import Chip from "./chip";

type ChipContainerProps = {
  selectedChip: CalendarDataTypes | undefined;
  setSelectedChip: Dispatch<SetStateAction<CalendarDataTypes | undefined>>;
};

const ChipContainer: React.FC<ChipContainerProps> = ({
  selectedChip,
  setSelectedChip,
}) => {
  const { t } = useTranslation();

  return (
    <View style={styles.chipContainer}>
      <Chip
        text={t("tool-cards.goals")}
        selected={selectedChip === CalendarDataTypes.GOALS}
        onPress={() => {
          if (selectedChip === CalendarDataTypes.GOALS) {
            setSelectedChip(undefined);
          } else {
            setSelectedChip(CalendarDataTypes.GOALS);
          }
        }}
      />
      <Chip
        text={t("tool-cards.todos")}
        selected={selectedChip === CalendarDataTypes.TODOS}
        onPress={() => {
          if (selectedChip === CalendarDataTypes.TODOS) {
            setSelectedChip(undefined);
          } else {
            setSelectedChip(CalendarDataTypes.TODOS);
          }
        }}
      />
      <Chip
        text={t("tool-cards.journals")}
        selected={selectedChip === CalendarDataTypes.JOURNALS}
        onPress={() => {
          if (selectedChip === CalendarDataTypes.JOURNALS) {
            setSelectedChip(undefined);
          } else {
            setSelectedChip(CalendarDataTypes.JOURNALS);
          }
        }}
      />
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
