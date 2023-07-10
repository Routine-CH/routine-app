import { DateTime, Settings } from "luxon";
import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import AppColors from "../../utils/constants/colors";
import { UserJournals } from "../../utils/types/types";
import AppText from "../common/typography/app-text";

Settings.defaultLocale = "de";

interface JournalProps {
  userJournal: UserJournals | null;
}

const TodaysJournal: React.FC<JournalProps> = ({ userJournal }) => {
  const { t } = useTranslation();
  const today = DateTime.local().toFormat("dd. MMMM yyyy");

  return (
    <View>
      <AppText fontStyle="body" colorStyle="black70">
        {today}
      </AppText>
      <View style={styles.line} />
      <View>
        <AppText
          fontStyle="heading4"
          colorStyle="black70"
          style={{ marginBottom: 30 }}
        >
          {userJournal?.title}
        </AppText>
        <View style={styles.textContainer}>
          <AppText
            fontStyle="bodyMedium"
            colorStyle="black70"
            style={styles.heading}
          >
            {t("journal.mood")}
          </AppText>
          <AppText fontStyle="body" colorStyle="black70">
            {Array.isArray(userJournal?.journalMoods) &&
              userJournal?.journalMoods.map((item: any) => item.mood.type)}
          </AppText>
        </View>
        <View style={styles.textContainer}>
          <AppText
            fontStyle="bodyMedium"
            colorStyle="black70"
            style={styles.heading}
          >
            {t("journal.mood-description")}
          </AppText>
          <AppText fontStyle="body" colorStyle="black70">
            {userJournal?.moodDescription}
          </AppText>
        </View>
        <View style={styles.textContainer}>
          <AppText
            fontStyle="bodyMedium"
            colorStyle="black70"
            style={styles.heading}
          >
            {t("journal.activity")}
          </AppText>
          <AppText fontStyle="body" colorStyle="black70">
            {userJournal?.activity}
          </AppText>
        </View>
        <View style={styles.textContainer}>
          <AppText
            fontStyle="bodyMedium"
            colorStyle="black70"
            style={styles.heading}
          >
            {t("journal.to-improve")}
          </AppText>
          <AppText fontStyle="body" colorStyle="black70">
            {userJournal?.toImprove}
          </AppText>
        </View>
        <View style={styles.textContainer}>
          <AppText
            fontStyle="bodyMedium"
            colorStyle="black70"
            style={styles.heading}
          >
            {t("journal.thoughts-and-ideas")}
          </AppText>
          <AppText fontStyle="body" colorStyle="black70">
            {userJournal?.thoughtsAndIdeas}
          </AppText>
        </View>
      </View>
    </View>
  );
};

export default TodaysJournal;

const styles = StyleSheet.create({
  line: {
    borderWidth: 0.5,
    borderColor: AppColors.black20,
    marginTop: 10,
    marginBottom: 20,
  },
  textContainer: {
    marginBottom: 30,
  },
  heading: {
    marginBottom: 5,
  },
});
