import React from "react";
import { Image, Pressable, StyleSheet } from "react-native";
import AppColors from "../../utils/constants/colors";
import AppText from "../common/typography/app-text";

interface MoodCardProps {
  title: string;
  type: string;
  onPress: () => void;
  isSelected: boolean;
}

const MoodCard: React.FC<MoodCardProps> = ({
  title,
  type,
  onPress,
  isSelected,
}) => {
  const handlePress = () => {
    onPress();
  };

  const containerStyle = isSelected
    ? [styles.container, styles.isSelected]
    : styles.container;
  const textStyle = isSelected
    ? [styles.text, styles.isSelectedText]
    : styles.text;

  return (
    <Pressable style={containerStyle} onPress={handlePress}>
      {type === "rage" ? (
        <Image
          source={require("../../assets/moods/mood-rage.png")}
          style={styles.image}
        />
      ) : type === "curiosity" ? (
        <Image
          source={require("../../assets/moods/mood-curios.png")}
          style={styles.image}
        />
      ) : type === "excitement" ? (
        <Image
          source={require("../../assets/moods/mood-excitement.png")}
          style={styles.image}
        />
      ) : type === "sadness" ? (
        <Image
          source={require("../../assets/moods/mood-sadness.png")}
          style={styles.image}
        />
      ) : type === "frustration" ? (
        <Image
          source={require("../../assets/moods/mood-frustration.png")}
          style={styles.image}
        />
      ) : type === "fear" ? (
        <Image
          source={require("../../assets/moods/mood-fear.png")}
          style={styles.image}
        />
      ) : type === "anger" ? (
        <Image
          source={require("../../assets/moods/mood-anger.png")}
          style={styles.image}
        />
      ) : type === "pride" ? (
        <Image
          source={require("../../assets/moods/mood-pride.png")}
          style={styles.image}
        />
      ) : type === "joy" ? (
        <Image
          source={require("../../assets/moods/mood-joy.png")}
          style={styles.image}
        />
      ) : type === "calm" ? (
        <Image
          source={require("../../assets/moods/mood-calm.png")}
          style={styles.image}
        />
      ) : (
        <Image
          source={require("../../assets/moods/mood-bored.png")}
          style={styles.image}
        />
      )}
      <AppText fontStyle="bodyMedium" style={textStyle}>
        {title}
      </AppText>
    </Pressable>
  );
};

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
  isSelected: {
    backgroundColor: AppColors.blue200,
    padding: 5,
    borderRadius: 5,
    height: 120,
    width: 120,
  },
  text: {
    color: AppColors.blue100,
  },
  isSelectedText: {
    color: AppColors.white,
  },
});

export default MoodCard;
