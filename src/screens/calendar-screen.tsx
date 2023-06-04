import { DateTime } from "luxon";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, View } from "react-native";
import Card from "../components/calendar/card";
import Chip from "../components/calendar/chip";
import DateCard from "../components/calendar/date-card";
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
      backgroundColor="white"
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
        <AppText fontStyle={"body"} colorStyle="black64" style={styles.margin}>
          {formattedDateRange}
        </AppText>
      </Pressable>
      <View style={[styles.margin, styles.calendarContainer]}>
        <View style={{ flex: 1 }}>
          <DateCard date={5} month={"Juni"} />
        </View>
        <View style={{ flex: 3 }}>
          <Card
            type={"Ziel"}
            title={"Steuererklärung"}
            icon={"checkmark-circle"}
            style={styles.reached}
          />
          <Card
            type={"Todo"}
            title={"Rechnung zahlen"}
            icon={"close-circle"}
            style={styles.notReached}
          />
          <Card type={"Journal"} title={"Velo-Ausflug mit Lena"} />
        </View>
      </View>
      <View style={[styles.margin, styles.calendarContainer]}>
        <View style={{ flex: 1 }}>
          <DateCard date={8} month={"Juni"} />
        </View>
        <View style={{ flex: 3 }}>
          <Card
            type={"Ziel"}
            title={"Täglich coden"}
            icon={"checkmark-circle"}
            style={styles.reached}
          />
          <Card
            type={"Todo"}
            title={"E-Mail an Laura schreiben"}
            icon={"close-circle"}
            style={styles.notReached}
          />
        </View>
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
