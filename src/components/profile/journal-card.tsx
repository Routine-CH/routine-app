import { eachDayOfInterval, endOfWeek, format, startOfWeek } from "date-fns";
import { de } from "date-fns/locale";
import { useTranslation } from "react-i18next";
import { Dimensions, StyleSheet, View } from "react-native";
import AppColors from "../../utils/constants/colors";
import AppFontStyle from "../../utils/constants/font-style";
import { JournalDay } from "../../utils/types/profile/types";
import AppText from "../common/typography/app-text";

type JournalCardProps = {
  journalDays: JournalDay[];
};

const windowWidth = Dimensions.get("window").width;

const JournalCard: React.FC<JournalCardProps> = ({ journalDays }) => {
  const { t } = useTranslation();

  const startDateOfWeek = startOfWeek(new Date(), {
    weekStartsOn: 1,
    locale: de,
  });
  const endDateOfWeek = endOfWeek(new Date(), { weekStartsOn: 1, locale: de });
  const datesOfWeek = eachDayOfInterval({
    start: startDateOfWeek,
    end: endDateOfWeek,
  });

  const formattedDatesOfWeek = datesOfWeek.map((date) =>
    format(date, "yyyy-MM-dd", { locale: de })
  );
  const formattedJournalDays = journalDays.map((day) =>
    format(new Date(day.date), "yyyy-MM-dd", { locale: de })
  );

  const checkIfJournalDay = (date: string) => {
    return formattedJournalDays.includes(date);
  };

  return (
    <View style={styles.outerContainer}>
      {formattedDatesOfWeek.map((date, index) => {
        const isJournalDay = checkIfJournalDay(date);
        return (
          <View
            key={index}
            style={[
              styles.innerContainer,
              isJournalDay
                ? styles.entryAvailableContainer
                : styles.noEntryContainer,
            ]}
          >
            <AppText
              colorStyle={isJournalDay ? "white" : "black64"}
              style={{
                fontSize: windowWidth * 0.045,
                fontFamily: AppFontStyle.body.fontFamily,
              }}
            >
              {t(
                `profile.gamification.${format(
                  datesOfWeek[index],
                  "iii"
                ).toLowerCase()}`
              )}
            </AppText>
          </View>
        );
      })}
    </View>
  );
};

export default JournalCard;
const styles = StyleSheet.create({
  outerContainer: {
    paddingVertical: windowWidth * 0.034,
    width: "100%",
    marginTop: 20,
    marginBottom: 30,
    borderRadius: 13,
    backgroundColor: AppColors.blueMuted40,
    flexDirection: "row",
    justifyContent: "space-evenly",
    alignItems: "center",
  },
  innerContainer: {
    height: windowWidth * 0.11,
    width: windowWidth * 0.11,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  noEntryContainer: {
    backgroundColor: AppColors.white,
  },
  entryAvailableContainer: {
    backgroundColor: AppColors.blue200,
  },
});
