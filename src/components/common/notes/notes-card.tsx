import { Image, StyleSheet, View } from "react-native";
import AppColors from "../../../utils/constants/colors";
import AppText from "../typography/app-text";

interface NotesProps {
  title: string;
  description: string;
  image?: any;
}

const NotesCard: React.FC<NotesProps> = ({ title, description, image }) => {
  const containerStyle = image
    ? styles.notesCardContainerWithImage
    : styles.notesCardContainerWithoutImage;

  return (
    <View style={[containerStyle, styles.notesCardContainer]}>
      <View style={styles.innerContainer}>
        <AppText
          fontStyle="heading4"
          colorStyle="black70"
          numberOfLines={1}
          ellipsizeMode="tail"
          style={{ paddingBottom: 15 }}
        >
          {title}
        </AppText>
        <AppText
          fontStyle="filters"
          colorStyle="black70"
          numberOfLines={3}
          ellipsizeMode="tail"
        >
          {description}
        </AppText>
      </View>
      <Image source={image} style={styles.image} />
    </View>
  );
};

export default NotesCard;

const styles = StyleSheet.create({
  notesCardContainer: {
    width: "100%%",
    marginBottom: 30,
    backgroundColor: AppColors.white,
    borderRadius: 8,
    shadowColor: "#959DA5",
    shadowOffset: { width: 0, height: 9 } as {
      width: number;
      height: number;
    },
    shadowOpacity: 0.35,
    shadowRadius: 11.9,
  },
  innerContainer: {
    margin: 15,
  },
  notesCardContainerWithoutImage: {
    height: 125,
  },
  notesCardContainerWithImage: {
    height: 245,
  },
  image: {
    width: "100%",
    height: 121,
    overflow: "hidden",
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    position: "absolute",
    bottom: 0,
  },
});
