import { RouteProp } from "@react-navigation/native";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Image, Pressable, StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import InformationModal from "../components/audio/information-modal";
import BackButton from "../components/common/buttons/back-button";
import IconButton from "../components/common/buttons/icon-button";
import ScrollViewScreenWrapper from "../components/common/scroll-view-screen-wrapper";
import AppText from "../components/common/typography/app-text";
import AppColors from "../utils/constants/colors";
import { StatusBarColor } from "../utils/types/enums";
import { AudioParams, AuthenticatedStackParamList } from "../utils/types/types";

type AudioScreenRouteProp = RouteProp<AuthenticatedStackParamList, "Discover">;

type AudioProps = {
  route?: AudioScreenRouteProp & {
    params?: {
      DiscoverAudio?: AudioParams | null;
    };
  };
};

const AudioScreen: React.FC<AudioProps> = ({ route }) => {
  const { t } = useTranslation();
  const audio = route?.params.DiscoverAudio;
  console.log(audio);
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleModalPress = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return audio ? (
    <ScrollViewScreenWrapper
      backgroundColor="white"
      statusBarColor={StatusBarColor.dark}
      defaultPadding
    >
      <View>
        <View style={styles.buttonContainer}>
          <BackButton />
          <Pressable onPress={handleModalPress}>
            <IconButton iconName="information" />
          </Pressable>
        </View>
        <View style={styles.audioplayer}>
          <Image source={audio.image} style={styles.image} />
          <AppText
            fontStyle="audioPlayer"
            colorStyle="black70"
            style={{ textAlign: "center", marginVertical: 60 }}
          >
            {audio.title}
          </AppText>
          <View style={styles.timeContainer}>
            <View style={styles.horizontalLine} />
            <View style={styles.time}>
              <AppText fontStyle="body" colorStyle="black70">
                00:00
              </AppText>
              <AppText fontStyle="body" colorStyle="black70">
                {audio.minutes}
              </AppText>
            </View>
          </View>
          <View style={styles.iconContainer}>
            <View style={styles.seekIcon}>
              <Icon
                name={"return-up-forward-outline"}
                size={50}
                color={AppColors.blue100}
                style={{
                  transform: [{ rotateY: "180deg" }],
                }}
              />
              <AppText
                fontStyle="bodyBold"
                colorStyle="blue100"
                style={{ position: "absolute", top: 35 }}
              >
                {t("audio.10")}
              </AppText>
            </View>
            <Icon name={"play-circle"} size={95} color={AppColors.blue100} />
            <View style={styles.seekIcon}>
              <Icon
                name={"return-up-forward-outline"}
                size={50}
                color={AppColors.blue100}
              />
              <AppText
                fontStyle="bodyBold"
                colorStyle="blue100"
                style={{ position: "absolute", top: 35 }}
              >
                {t("audio.10")}
              </AppText>
            </View>
          </View>
        </View>
      </View>
      <InformationModal
        isVisible={isModalVisible}
        onClose={closeModal}
        audio={audio}
      />
    </ScrollViewScreenWrapper>
  ) : (
    <></>
  );
};

export default AudioScreen;

const styles = StyleSheet.create({
  buttonContainer: { flexDirection: "row", justifyContent: "space-between" },
  cardContainer: {
    width: 330,
    height: 172,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "white",
  },
  image: {
    width: 270,
    height: 270,
    borderRadius: 20,
  },
  audioplayer: {
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },
  timeContainer: {
    width: "100%",
    flexDirection: "column",
  },
  horizontalLine: {
    width: "100%",
    height: 7,
    backgroundColor: AppColors.blueMuted60,
    borderRadius: 100,
    marginBottom: 15,
  },
  time: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 15,
    marginBottom: 30,
  },
  iconContainer: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  seekIcon: {
    alignItems: "center",
  },
});
