import { useState } from "react";
import { Image, Pressable, StyleSheet } from "react-native";
import AppColors from "../../utils/constants/colors";
import AppText from "../common/typography/app-text";

type moodProps = {
  image: any;
  title: string;
};

const MoodCard: React.FC<moodProps> = ({ image, title }) => {
  const [isActive, setIsActive] = useState(false);

  const handlePress = () => {
    setIsActive(!isActive);
    console.log("Mood pressed" + title);
  };

  const textcolorStyle = isActive
    ? [styles.text, styles.activeText]
    : styles.text;

  return (
    <Pressable
      style={isActive ? [styles.container, styles.active] : styles.container}
      onPress={handlePress}
    >
      <Image source={image} style={styles.image} />
      <AppText fontStyle="bodyMedium" style={textcolorStyle}>
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
    height: 120,
    width: 120,
  },
  image: {
    height: 90,
    width: 90,
  },
  active: {
    backgroundColor: AppColors.blue200,
    padding: 5,
    borderRadius: 5,
    height: 120,
    width: 120,
  },
  text: {
    color: AppColors.blue100,
  },
  activeText: {
    color: AppColors.white,
  },
});
