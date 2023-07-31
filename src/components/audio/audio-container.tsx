import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import { useTranslation } from "react-i18next";
import { TouchableOpacity } from "react-native";
import { AuthenticatedStackParamList } from "../../utils/types/types";
import AppText from "../common/typography/app-text";
import AudioCard from "./audio-card";

interface AudioContainerProps {}

const AudioContainer: React.FC<AudioContainerProps> = () => {
  const { t } = useTranslation();
  const navigation =
    useNavigation<NavigationProp<AuthenticatedStackParamList>>();

  const audioData = [
    {
      image: require("../../assets/misc/waves.jpg"),
      title: t("audio.pmr"),
      time: t("audio.10") + " " + t("audio.minutes"),
      minutes: t("audio.10-00"),
      informationText: t("audio.pmr-text"),
      toolsFor: [t("audio.anxiety"), t("audio.insomnia")],
    },
    {
      image: require("../../assets/misc/stones.jpg"),
      title: t("audio.mindfulness"),
      time: t("audio.5") + " " + t("audio.minutes"),
      minutes: t("audio.05-00"),
      informationText: t("audio.mindfullness-text"),
      toolsFor: [
        t("audio.anxiety"),
        t("audio.stress"),
        t("audio.concentration"),
      ],
    },
    {
      image: require("../../assets/misc/threads.jpg"),
      title: t("audio.visualisation"),
      time: t("audio.15") + " " + t("audio.minutes"),
      minutes: t("audio.15-00"),
      informationText: t("audio.visualisation-text"),
      toolsFor: [
        t("audio.stress"),
        t("audio.motivation"),
        t("audio.confidence"),
      ],
    },
  ];

  const navigateToAudioScreen = (audio: any) => {
    navigation.navigate("SubRoutes", {
      screen: "Audio",
      params: {
        DiscoverAudio: audio,
      },
    });
  };

  return (
    <>
      <AppText
        fontStyle='heading3'
        colorStyle='black70'
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
