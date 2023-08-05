import React from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import Svg, { LinearGradient, Rect, Stop } from "react-native-svg";
import AppColors from "../../../utils/constants/colors";
import AppFontStyle from "../../../utils/constants/font-style";
import AppText from "../typography/app-text";
import WorldIcon from "./icons-svg/world-icon";

interface GoalProps {
  title: string;
  description: string;
  displayHorizontalScroll?: boolean;
}

const windowWidth = Dimensions.get("window").width;

const GoalsCard: React.FC<GoalProps> = ({
  title,
  description,
  displayHorizontalScroll = false,
}) => {
  return (
    <View
      style={[
        styles.container,
        { marginRight: displayHorizontalScroll ? 15 : 0 },
      ]}
    >
      <View
        style={[
          styles.card,
          {
            width: displayHorizontalScroll
              ? windowWidth * 0.84
              : windowWidth * 0.9,
            marginBottom: displayHorizontalScroll ? 0 : windowWidth * 0.06,
          },
        ]}
      >
        <Svg width='72' height='72'>
          <LinearGradient id='gradient' x1='0%' y1='0%' x2='0%' y2='100%'>
            <Stop offset='0%' stopColor='rgba(41, 104, 121, 1)' />
            <Stop offset='100%' stopColor='rgba(111, 153, 165, 1)' />
          </LinearGradient>
          <Rect
            x='0'
            y='0'
            width='72'
            height='72'
            rx='10'
            fill='url(#gradient)'
          />
          <View style={styles.iconContainer}>
            <WorldIcon />
          </View>
        </Svg>
        <View style={styles.textfields}>
          <AppText
            colorStyle='black64'
            style={{
              fontFamily: AppFontStyle.bodyMedium.fontFamily,
              fontSize: AppFontStyle.heading4.fontSize,
            }}
            numberOfLines={1}
            ellipsizeMode='tail'
          >
            {title}
          </AppText>
          <AppText
            colorStyle='black64'
            style={{
              marginTop: 5,
              fontFamily: AppFontStyle.body.fontFamily,
              fontSize: AppFontStyle.body.fontSize,
            }}
            numberOfLines={2}
            ellipsizeMode='tail'
          >
            {description}
          </AppText>
        </View>
      </View>
    </View>
  );
};

export default GoalsCard;

const styles = StyleSheet.create({
  container: { alignItems: "center", flex: 1 },
  card: {
    backgroundColor: AppColors.blueMuted40,
    borderRadius: 13,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: windowWidth * 0.03,
    paddingVertical: windowWidth * 0.04,
  },
  textfields: {
    marginLeft: 15,
    height: 72,
    width: windowWidth * 0.49,
  },
  iconContainer: {
    height: 72,
    width: 72,
    justifyContent: "center",
    alignItems: "center",
  },
});
