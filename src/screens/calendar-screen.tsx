import { DateTime } from "luxon";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, View } from "react-native";
import Chip from "../components/calendar/chip";
import Calendar from "../components/common/calendar/calendar";
import ScrollViewScreenWrapper from "../components/common/scroll-view-screen-wrapper";
import AppText from "../components/common/typography/app-text";
import AppColors from "../utils/constants/colors";
import { StatusBarColor } from "../utils/types/enums";

const CalendarScreen: React.FC = () => {
  const { t } = useTranslation();

  const now = DateTime.local();
  const startOfWeek = now.startOf("week");
  const endOfWeek = now.endOf("week");

  const startOfWeekFormatted = startOfWeek.toLocaleString({
    day: "2-digit",
    month: "long",
  });
  const endOfWeekFormatted = endOfWeek.toLocaleString({
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const formattedDateRange = `${startOfWeekFormatted} - ${endOfWeekFormatted}`;

  return (
    <ScrollViewScreenWrapper
      backgroundColor='white'
      statusBarColor={StatusBarColor.dark}
      defaultPadding
    >
      <View style={styles.chipContainer}>
        <Chip text={t("tool-cards.goals")} />
        <Chip text={t("tool-cards.todos")} />
        <Chip text={t("tool-cards.journals")} />
      </View>
      {/* IMPLEMENT CALENDAR!! */}
      <Pressable>
        <AppText fontStyle={"body"} colorStyle='black64' style={styles.margin}>
          {formattedDateRange}
        </AppText>
      </Pressable>
      <View style={styles.margin}>
        <Calendar
          date={5}
          month='Juni'
          title='Steuererklärung'
          type='Ziel'
          icon='checkmark-circle'
          iconStyle={styles.reached}
        />
        <Calendar
          date={8}
          month='Juni'
          title='Rechnungen zahlen'
          type='Todo'
          icon='close-circle'
          iconStyle={styles.notReached}
        />
        <Calendar
          date={10}
          month='Juni'
          title='Velo-Ausflug mit Lena'
          type='Ziel'
        />
      </View>
    </ScrollViewScreenWrapper>
  );
};

export default CalendarScreen;

const styles = StyleSheet.create({
  chipContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  margin: {
    marginTop: 30,
  },
  calendarContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
  },
  reached: {
    color: AppColors.blue100,
  },
  notReached: {
    color: AppColors.red,
  },
});
