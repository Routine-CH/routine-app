import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import AppText from "../common/typography/app-text";
import AudioCard from "./audio-card";

interface AudioContainerProps {}

const AudioContainer: React.FC<AudioContainerProps> = () => {
  const { t } = useTranslation();

  const audio = [
    {
      image: require("../../assets/misc/waves.jpg"),
      title: "Progressive Muskelrelaxion",
      time: "10 Minuten",
    },
    {
      image: require("../../assets/misc/stones.jpg"),
      title: "Achtsamkeitsmeditation",
      time: "5 Minuten",
    },
    {
      image: require("../../assets/misc/threads.jpg"),
      title: "Visualisierungsmeditation",
      time: "15 Minuten",
    },
  ];

  return (
    <View style={styles.audioContainer}>
      <AppText
        fontStyle="heading3"
        colorStyle="black70"
        style={{ marginBottom: 30 }}
      >
        {t("audio.meditation-exercises")}
      </AppText>
      {audio.map((audio, index) => (
        <AudioCard
          key={index}
          image={audio.image}
          title={audio.title}
          time={audio.time}
        />
      ))}
    </View>
  );
};

export default AudioContainer;

const styles = StyleSheet.create({
  audioContainer: {
    marginTop: 60,
  },
});
