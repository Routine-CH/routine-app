import React from "react";
import { useTranslation } from "react-i18next";
import { Dimensions, StyleSheet, View } from "react-native";
import AppColors from "../../utils/constants/colors";
import AppFontStyle from "../../utils/constants/font-style";
import AppText from "../common/typography/app-text";

type AchievementCardProps = {
  exp: number;
  badgesCount: number;
  streakCount: number;
};

const windowWidth = Dimensions.get("window").width;

const AchievementCard: React.FC<AchievementCardProps> = ({
  exp,
  badgesCount,
  streakCount,
}) => {
  const { t } = useTranslation();

  return (
    <View style={styles.achievementContainer}>
      <View style={styles.achievementContent}>
        <AppText
          colorStyle='black64'
          style={{
            marginBottom: 5,
            fontFamily: AppFontStyle.bodyMedium.fontFamily,
            fontSize: windowWidth * 0.055,
          }}
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
          colorStyle='black64'
          style={{
            marginBottom: 5,
            fontFamily: AppFontStyle.bodyMedium.fontFamily,
            fontSize: windowWidth * 0.055,
          }}
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
          colorStyle='black64'
          style={{
            marginBottom: 5,
            fontFamily: AppFontStyle.bodyMedium.fontFamily,
            fontSize: windowWidth * 0.055,
          }}
        >
          {streakCount}
        </AppText>
        <AppText fontStyle='body' colorStyle='black64'>
          {t("profile.gamification.streak")}
        </AppText>
      </View>
    </View>
  );
};

export default AchievementCard;

const styles = StyleSheet.create({
  achievementContainer: {
    marginVertical: 30,
    height: 83,
    borderRadius: 13,
    backgroundColor: AppColors.blueMuted40,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  achievementContent: {
    alignItems: "center",
  },
  verticalLine: {
    height: "80%",
    width: 1,
    backgroundColor: AppColors.white,
  },
});
