import React from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import AppColors from "../../utils/constants/colors";
import AppFontStyle from "../../utils/constants/font-style";
import AppText from "../common/typography/app-text";

interface levelProps {
  image: any;
  level: string;
  title: string;
  points: string;
  status: boolean;
}

const windowWidth = Dimensions.get("window").width;

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
      <View style={styles.textContainer}>
        <AppText
          colorStyle='black70'
          style={{
            fontSize: windowWidth * 0.043,
            fontFamily: AppFontStyle.filters.fontFamily,
          }}
        >
          {level}
        </AppText>
        <AppText
          colorStyle='black70'
          fontStyle='bodyMedium'
          style={{
            fontSize: windowWidth * 0.05,
            fontFamily: AppFontStyle.bodyMedium.fontFamily,
            marginVertical: 3,
          }}
        >
          {title}
        </AppText>
        <AppText
          colorStyle='black70'
          style={{
            fontSize: windowWidth * 0.043,
            fontFamily: AppFontStyle.filters.fontFamily,
          }}
        >
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
    marginRight: windowWidth * 0.07,
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
  textContainer: {
    height: 90,
    justifyContent: "center",
    width: windowWidth * 0.5,
  },
});
