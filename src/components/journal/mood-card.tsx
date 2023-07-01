import React from "react";
import { Image, Pressable, StyleSheet } from "react-native";
import AppColors from "../../utils/constants/colors";
import AppText from "../common/typography/app-text";

interface MoodCardProps {
  image: any;
  title: string;
  onPress: () => void;
  isSelected: boolean;
}

const MoodCard: React.FC<MoodCardProps> = ({
  image,
  title,
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
      <Image source={image} style={styles.image} />
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
