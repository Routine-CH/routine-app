import {
  Image,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import AppColors from "../../utils/constants/colors";
import AppText from "../common/typography/app-text";

interface NotesProps {
  title: string;
  description: string;
  imageUrl?: string;
  onPress?: () => void;
}

const NotesCard: React.FC<NotesProps> = ({
  title,
  description,
  imageUrl,
  onPress,
}) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.notesCardContainer}>
        <View style={styles.notesDescription}>
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
    </TouchableWithoutFeedback>
  );
};

export default NotesCard;

const styles = StyleSheet.create({
  notesCardContainer: {
    width: "100%",
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
    marginBottom: 15,
  },
  notesDescription: {
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  image: {
    width: "100%",
    height: 120,
  },
});
