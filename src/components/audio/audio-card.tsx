import { Dimensions, Image, StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import AppColors from "../../utils/constants/colors";
import AppFontStyle from "../../utils/constants/font-style";
import AppText from "../common/typography/app-text";

interface AudioProps {
  image: any;
  title: string;
  time: string;
}

const windowWidth = Dimensions.get("window").width;

const AudioCard: React.FC<AudioProps> = ({ image, title, time }) => {
  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <Image source={image} style={styles.image} />
        <View style={styles.bottomContainer}>
          <View>
            <AppText
              colorStyle='blue100'
              style={{
                marginBottom: 5,
                fontSize: windowWidth * 0.047,
                fontFamily: AppFontStyle.bodyMedium.fontFamily,
              }}
            >
              {title}
            </AppText>
            <AppText fontStyle='information' colorStyle='black70'>
              {time}
            </AppText>
          </View>
          <Icon name={"play-circle"} size={35} color={AppColors.blue100} />
        </View>
      </View>
    </View>
  );
};

export default AudioCard;

const styles = StyleSheet.create({
  container: {
    shadowColor: "#959DA5",
    backgroundColor: AppColors.white,
    borderRadius: 10,
    shadowOffset: { width: 0, height: 9 } as {
      width: number;
      height: number;
    },
    shadowOpacity: 0.35,
    shadowRadius: 11.9,
    marginBottom: 30,
    alignItems: "center",
  },
  cardContainer: {
    width: "100%",
    height: 172,
    borderRadius: 10,
    overflow: "hidden",
    backgroundColor: "white",
  },
  image: {
    width: "100%",
    height: 104,
  },
  bottomContainer: {
    marginHorizontal: windowWidth * 0.045,
    height: 68,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
});
