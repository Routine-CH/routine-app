import { Image, StyleSheet, View } from "react-native";
import AppColors from "../../../utils/constants/colors";
import AppText from "../typography/app-text";

interface NotesProps {
  title: string;
  description: string;
  imageUrl?: string;
}

const NotesCard: React.FC<NotesProps> = ({ title, description, imageUrl }) => {
  return (
    <View style={styles.notesCardContainer}>
      <View
        style={[styles.innerContainer, { marginBottom: imageUrl ? 30 : 15 }]}
      >
        <AppText
          fontStyle='heading4'
          colorStyle='black70'
          numberOfLines={1}
          ellipsizeMode='tail'
          style={{ paddingBottom: 15 }}
        >
          {title}
        </AppText>
        <AppText
          fontStyle='filters'
          colorStyle='black70'
          numberOfLines={3}
          ellipsizeMode='tail'
          style={{ lineHeight: 25 }}
        >
          {description}
        </AppText>
      </View>
      {imageUrl && <Image source={{ uri: imageUrl }} style={styles.image} />}
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
    overflow: "hidden",
  },
  innerContainer: {
    flex: 1,
    marginHorizontal: 10,
    marginTop: 15,
  },
  image: {
    width: "100%",
    height: 121,
  },
});
