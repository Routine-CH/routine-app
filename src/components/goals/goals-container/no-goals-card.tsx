import React from "react";
import { StyleSheet, View } from "react-native";
import { LinearGradient, Rect, Stop, Svg } from "react-native-svg";
import AppColors from "../../../utils/constants/colors";
import WorldIcon from "../../common/icons-svg/world-icon";
import AppText from "../../common/typography/app-text";

const NoGoalsCard: React.FC = () => {
  return (
    <View style={styles.container}>
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
        <AppText fontStyle='body' colorStyle='black64'>
          Whoop! Alles aufgeholt!
        </AppText>
        <AppText fontStyle='bodyMedium' colorStyle='black64'>
          Weiter so!
        </AppText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 120,
    backgroundColor: AppColors.blueMuted40,
    borderRadius: 13,
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
  },
  iconContainer: {
    height: 72,
    width: 72,
    justifyContent: "center",
    alignItems: "center",
  },
  textfields: {
    width: 210,
    marginLeft: 15,
  },
});

export default NoGoalsCard;
