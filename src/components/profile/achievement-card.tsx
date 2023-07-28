import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import AppColors from "../../utils/constants/colors";
import AppText from "../common/typography/app-text";

type AchievementCardProps = {
  exp: number;
  badgesCount: number;
  streakCount: number;
};

const AchievementCard: React.FC<AchievementCardProps> = ({
  exp,
  badgesCount,
  streakCount,
}) => {
  const { t } = useTranslation();
  console.log(streakCount);

  return (
    <View style={styles.achievementContainer}>
      <View style={styles.achievementContent}>
        <AppText
          fontStyle='bodyMedium'
          colorStyle='black64'
          style={{ marginBottom: 5 }}
        >
          {badgesCount}
        </AppText>
        <AppText fontStyle='body' colorStyle='black64'>
          {t("profile.gamification.badges")}
        </AppText>
      </View>
      <View style={styles.verticalLine} />
      <View style={styles.achievementContent}>
        <AppText
          fontStyle='bodyMedium'
          colorStyle='black64'
          style={{ marginBottom: 5 }}
        >
          {exp}
        </AppText>
        <AppText fontStyle='body' colorStyle='black64'>
          {t("profile.gamification.points")}
        </AppText>
      </View>
      <View style={styles.verticalLine} />
      <View style={styles.achievementContent}>
        <AppText
          fontStyle='bodyMedium'
          colorStyle='black64'
          style={{ marginBottom: 5 }}
        >
          2
        </AppText>
        <AppText fontStyle='body' colorStyle='black64'>
          {t("profile.gamification.level")}
        </AppText>
      </View>
    </View>
  );
};

export default AchievementCard;

const styles = StyleSheet.create({
  achievementContainer: {
    marginTop: 60,
    height: 83,
    borderRadius: 13,
    backgroundColor: AppColors.blueMuted40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  achievementContent: {
    alignItems: "center",
    marginHorizontal: 15,
  },
  verticalLine: {
    height: "80%",
    width: 1,
    backgroundColor: AppColors.white,
    marginHorizontal: 15,
  },
});
