import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import MoodCard from "./mood-card";

interface AudioContainerProps {}

const MoodContainer: React.FC<AudioContainerProps> = () => {
  const { t } = useTranslation();

  const moods = [
    {
      image: require("../../assets/moods/mood-anger.png"),
      title: "Wütend",
    },
    {
      image: require("../../assets/moods/mood-calm.png"),
      title: "Ruhig",
    },
    {
      image: require("../../assets/moods/mood-curios.png"),
      title: "Neugierig",
    },
    {
      image: require("../../assets/moods/mood-excitement.png"),
      title: "Aufgeregt",
    },
    {
      image: require("../../assets/moods/mood-fear.png"),
      title: "Ängstlich",
    },
    {
      image: require("../../assets/moods/mood-frustration.png"),
      title: "Traurig",
    },
    {
      image: require("../../assets/moods/mood-joy.png"),
      title: "Glücklich",
    },
    {
      image: require("../../assets/moods/mood-pride.png"),
      title: "Stolz",
    },
    {
      image: require("../../assets/moods/mood-rage.png"),
      title: "Frustration",
    },
    {
      image: require("../../assets/moods/mood-sadness.png"),
      title: "Bedrückt",
    },
    {
      image: require("../../assets/moods/mood-serenity.png"),
      title: "Gelangweilt",
    },
  ];

  return (
    <View style={styles.moodContainer}>
      {moods.map((mood) => (
        <MoodCard key={mood.title} image={mood.image} title={mood.title} />
      ))}
    </View>
  );
};

export default MoodContainer;

const styles = StyleSheet.create({
  moodContainer: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 40,
    paddingHorizontal: 30,
    justifyContent: "center",
  },
});
