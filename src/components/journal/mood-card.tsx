import { Image, Pressable, StyleSheet } from "react-native";
import AppText from "../common/typography/app-text";

type moodProps = {
  image: any;
  title: string;
};

const MoodCard: React.FC<moodProps> = ({ image, title }) => {
  const handlePress = () => {
    console.log("Mood pressed" + title);
  };

  return (
    <Pressable style={styles.container} onPress={handlePress}>
      <Image source={image} style={styles.image} />
      <AppText fontStyle="bodyMedium" colorStyle="blue100">
        {title}
      </AppText>
    </Pressable>
  );
};

export default MoodCard;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    height: 90,
    width: 90,
  },
});
