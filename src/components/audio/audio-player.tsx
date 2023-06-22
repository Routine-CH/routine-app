import { Image, StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import AppColors from "../../utils/constants/colors";
import BackButton from "../common/buttons/back-button";
import IconButton from "../common/buttons/icon-button";
import AppText from "../common/typography/app-text";

interface AudioProps {
  image?: any;
  title?: string;
  time?: string;
}

const AudioPlayer: React.FC<AudioProps> = ({ image, title, time }) => {
  return (
    <View>
      <View style={styles.buttonContainer}>
        <BackButton />
        <IconButton iconName="information" />
      </View>
      <View style={styles.audioplayer}>
        <Image
          source={require("../../assets/misc/waves.jpg") /* image */}
          style={styles.image}
        />
        <AppText
          fontStyle="heading3"
          colorStyle="black70"
          style={{ textAlign: "center", marginVertical: 60 }}
        >
          {/* {title} */} Progressive Muskelrelaxion
        </AppText>
        <View style={styles.timeContainer}>
          <View style={styles.horizontalLine} />
          <View style={styles.time}>
            <AppText fontStyle="body" colorStyle="black70">
              00:00
            </AppText>
            <AppText fontStyle="body" colorStyle="black70">
              10:00
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
              10
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
              10
            </AppText>
          </View>
        </View>
      </View>
    </View>
  );
};

export default AudioPlayer;

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
