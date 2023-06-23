import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import Level from "./level";

const LevelsView = () => {
  const { t } = useTranslation();

  const levels = [
    {
      image: require("../../assets/levels/level-1.png"),
      level: t("profile.gamification.level") + " " + 1,
      title: t("profile.gamification.trailblazer"),
      points: 500 + " " + t("profile.gamification.collected-points"),
      status: true,
    },
    {
      image: require("../../assets/levels/level-2.png"),
      level: t("profile.gamification.level") + " " + 2,
      title: t("profile.gamification.voyager"),
      points: 1000 + " " + t("profile.gamification.collected-points"),
      status: true,
    },
    {
      image: require("../../assets/levels/level-3.png"),
      level: t("profile.gamification.level") + " " + 3,
      title: t("profile.gamification.pathfinder"),
      points: 1500 + " " + t("profile.gamification.collected-points"),
      status: false,
    },
    {
      image: require("../../assets/levels/level-4.png"),
      level: t("profile.gamification.level") + " " + 4,
      title: t("profile.gamification.maverick"),
      points: 2000 + " " + t("profile.gamification.collected-points"),
      status: false,
    },
    {
      image: require("../../assets/levels/level-5.png"),
      level: t("profile.gamification.level") + " " + 5,
      title: t("profile.gamification.adventurer"),
      points: 2500 + " " + t("profile.gamification.collected-points"),
      status: false,
    },
    {
      image: require("../../assets/levels/level-6.png"),
      level: t("profile.gamification.level") + " " + 6,
      title: t("profile.gamification.seeker"),
      points: 3000 + " " + t("profile.gamification.collected-points"),
      status: false,
    },
    {
      image: require("../../assets/levels/level-7.png"),
      level: t("profile.gamification.level") + " " + 7,
      title: t("profile.gamification.pioneer"),
      points: 3500 + " " + t("profile.gamification.collected-points"),
      status: false,
    },
    {
      image: require("../../assets/levels/level-8.png"),
      level: t("profile.gamification.level") + " " + 8,
      title: t("profile.gamification.conqueror"),
      points: 4000 + " " + t("profile.gamification.collected-points"),
      status: false,
    },
    {
      image: require("../../assets/levels/level-9.png"),
      level: t("profile.gamification.level") + " " + 9,
      title: t("profile.gamification.titan"),
      points: 4500 + " " + t("profile.gamification.collected-points"),
      status: false,
    },
    {
      image: require("../../assets/levels/level-10.png"),
      level: t("profile.gamification.level") + " " + 10,
      title: t("profile.gamification.zenith"),
      points: 5000 + " " + t("profile.gamification.collected-points"),
      status: false,
    },
  ];

  return (
    <View style={styles.badgesContainer}>
      {levels.map((level) => (
        <Level
          key={level.title}
          image={level.image}
          level={level.level}
          title={level.title}
          points={level.points}
          status={level.status}
        />
      ))}
    </View>
  );
};

export default LevelsView;

const styles = StyleSheet.create({
  badgesContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-evenly",
  },
  image: {
    height: 90,
    width: 90,
  },
  badgeNotYetCollected: {
    opacity: 0.5,
  },
});
