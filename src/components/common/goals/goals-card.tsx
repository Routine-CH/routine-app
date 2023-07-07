import React from "react";
import { StyleSheet, View } from "react-native";
import Svg, { LinearGradient, Rect, Stop } from "react-native-svg";
import AppColors from "../../../utils/constants/colors";
import AppText from "../typography/app-text";
import WorldIcon from "./icons-svg/world-icon";
interface GoalProps {
  //   image: any;
  title: string;
  description: string;
  displayHorizontalScroll?: boolean;
}

const GoalsCard: React.FC<GoalProps> = ({
  /*  image,  */ title,
  description,
}) => {
  return (
    <View style={[styles.container]}>
      <View style={styles.card}>
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
            fontStyle='heading4'
            colorStyle='black64'
            style={{ marginBottom: 10 }}
          >
            {title}
          </AppText>
          <AppText fontStyle='body' colorStyle='black64'>
            {description}
          </AppText>
        </View>
      </View>
    </View>
  );
};

export default GoalsCard;

const styles = StyleSheet.create({
  container: { alignItems: "center", flex: 1, marginRight: 15 },
  card: {
    width: "100%",
    height: 120,
    backgroundColor: AppColors.blueMuted40,
    borderRadius: 13,
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
  },
  textfields: {
    width: 210,
    marginLeft: 15,
  },
  iconContainer: {
    height: 72,
    width: 72,
    justifyContent: "center",
    alignItems: "center",
  },
});
