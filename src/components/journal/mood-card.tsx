import React from "react";
import { useTranslation } from "react-i18next";
import { Dimensions, Image, Pressable, StyleSheet } from "react-native";
import AppColors from "../../utils/constants/colors";
import AppText from "../common/typography/app-text";

interface MoodCardProps {
  title: string;
  type: string;
  onPress: () => void;
  isSelected: boolean;
}

const windowWidth = Dimensions.get("window").width;

const MoodCard: React.FC<MoodCardProps> = ({
  title,
  type,
  onPress,
  isSelected,
}) => {
  const { t } = useTranslation();
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
      <AppText fontStyle='bodyMedium' style={textStyle}>
        {t(`emotions.${title}`)}
      </AppText>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    height: windowWidth * 0.4,
    width: windowWidth * 0.38,
  },
  image: {
    height: windowWidth * 0.3,
    width: windowWidth * 0.3,
  },
  isSelected: {
    backgroundColor: AppColors.blue200,
    borderRadius: 5,
    height: windowWidth * 0.4,
    width: windowWidth * 0.38,
  },
  text: {
    color: AppColors.blue100,
  },
  isSelectedText: {
    color: AppColors.white,
  },
});

export default MoodCard;
