import React from "react";
import { Image, StyleSheet, View } from "react-native";
import AppColors from "../../utils/constants/colors";
import AppText from "../common/typography/app-text";

interface levelProps {
  image: any;
  level: string;
  title: string;
  points: string;
  status: boolean;
}

const Level: React.FC<levelProps> = ({
  image,
  level,
  title,
  points,
  status,
}) => {
  const isTrailblazer = title === "Trailblazer";
  return (
    <View style={[styles.container, status ? {} : styles.notYetReached]}>
      <View style={styles.imageContainer}>
        {!isTrailblazer && status && <View style={styles.line} />}
        <Image style={styles.image} source={image} />
      </View>
      <View>
        <AppText colorStyle="black70" fontStyle="filters" style={styles.text}>
          {level}
        </AppText>
        <AppText
          colorStyle="black70"
          fontStyle="bodyMedium"
          style={styles.text}
        >
          {title}
        </AppText>
        <AppText colorStyle="black70" fontStyle="filters" style={styles.text}>
          {points}
        </AppText>
      </View>
    </View>
  );
};

export default Level;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },
  notYetReached: {
    opacity: 0.5,
  },
  imageContainer: {
    alignItems: "center",
    marginRight: 40,
  },
  line: {
    position: "absolute",
    top: -30,
    width: 4,
    zIndex: -1,
    height: 60,
    backgroundColor: AppColors.blue300,
  },
  image: {
    height: 90,
    width: 90,
    zIndex: 3,
    borderColor: AppColors.blue300,
    borderWidth: 5,
    borderRadius: 50,
  },
  text: {
    marginBottom: 5,
  },
});
