import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, TouchableOpacity } from "react-native";
import { AuthenticatedStackParamList } from "../../utils/types/types";
import AppText from "../common/typography/app-text";
import AudioCard from "./audio-card";

interface AudioContainerProps {}

const AudioContainer: React.FC<AudioContainerProps> = () => {
  const { t } = useTranslation();
  const navigation =
    useNavigation<BottomTabNavigationProp<AuthenticatedStackParamList>>();

  const audioData = [
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

  const navigateToAudioScreen = (audio: any) => {
    navigation.navigate("Discover", {
      screen: "DiscoverAudio",
      params: {
        DiscoverAudio: audio,
      },
    });
  };

  return (
    <>
      <AppText
        fontStyle="heading3"
        colorStyle="black70"
        style={{ marginBottom: 30, marginTop: 60 }}
      >
        {t("audio.meditation-exercises")}
      </AppText>
      {audioData.map((audio) => (
        <TouchableOpacity
          key={audio.title}
          onPress={() => navigateToAudioScreen(audio)}
        >
          <AudioCard
            image={audio.image}
            title={audio.title}
            time={audio.time}
          />
        </TouchableOpacity>
      ))}
    </>
  );
};

export default AudioContainer;

const styles = StyleSheet.create({
  audioContainer: {
    marginTop: 60,
  },
});
