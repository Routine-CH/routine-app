import React from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet, View } from "react-native";
import AppColors from "../../utils/constants/colors";
import { JournalDay } from "../../utils/types/profile/types";
import AppText from "../common/typography/app-text";
import JournalCard from "./journal-card";
import WeekCard from "./week-card";

type WeekViewProps = {
  journalDays: JournalDay[];
};

const WeekView: React.FC<WeekViewProps> = ({ journalDays }) => {
  const { t } = useTranslation();
  const data1 = [7, 12, 3, 19, 2, 0, 5];
  const data2 = [4, 13, 11, 9, 1, 1, 8];
  const labels = ["Mo", "Di", "Mi", "Do", "Fr", "Sa", "So"];
  const color1 = [AppColors.green200];
  const color2 = [AppColors.blue200];

  return (
    <View style={styles.container}>
      <AppText fontStyle='heading3' colorStyle='black64'>
        {t("profile.gamification.your")} {t("profile.gamification.week")}
      </AppText>
      <ScrollView horizontal>
        <View style={[styles.statisticsContainer]}>
          <AppText fontStyle='heading4' colorStyle='black64'>
            {t("profile.gamification.completed")}{" "}
            {t("profile.gamification.todos")}
          </AppText>
          <View style={styles.card}>
            <WeekCard data={data1} labels={labels} color={color1} />
          </View>
        </View>
        <View style={[styles.statisticsContainer]}>
          <AppText fontStyle='heading4' colorStyle='black64'>
            {t("profile.gamification.reached")}
            {t("profile.gamification.goals")}
          </AppText>
          <View style={styles.card}>
            <WeekCard data={data2} labels={labels} color={color2} />
          </View>
        </View>
      </ScrollView>
      <View style={{ marginTop: 30 }}>
        <AppText fontStyle='heading4' colorStyle='black64'>
          {t("profile.gamification.written")}{" "}
          {t("profile.gamification.journal-entries")}
        </AppText>
        <JournalCard journalDays={journalDays} />
      </View>
    </View>
  );
};

export default WeekView;

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
  },
  statisticsContainer: {
    marginTop: 30,
    marginRight: 10,
  },
  card: {
    marginTop: 20,
    width: 350,
    height: 350,
    backgroundColor: AppColors.blueMuted30,
    borderRadius: 13,
    justifyContent: "center",
    alignItems: "center",
  },
});
