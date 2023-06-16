import { Image, StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import AppColors from "../../utils/constants/colors";
import BackButton from "../common/buttons/back-button";
import IconButton from "../common/buttons/icon-button";
import AppText from "../common/typography/app-text";

interface AudioProps {
  image: any;
  title: string;
  time: string;
}

const AudioPlayer: React.FC<AudioProps> = ({ image, title, time }) => {
  return (
    <View>
      <View style={styles.buttonContainer}>
        <BackButton />
        <IconButton iconName="information" />
      </View>
      <View style={styles.audioplayer}>
        <Image source={image} style={styles.image} />
        <AppText
          fontStyle="heading3"
          colorStyle="black70"
          style={{ textAlign: "center", marginVertical: 60 }}
        >
          {title}
        </AppText>
        <View style={styles.timeContainer}>
          <View style={styles.horizontalLine} />
          <View>
            <AppText>2:54</AppText>
            <AppText>{time}</AppText>
          </View>
        </View>
        <Icon name={"play-circle"} size={35} color={AppColors.blue100} />
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
});
