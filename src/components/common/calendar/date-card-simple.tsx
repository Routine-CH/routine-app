import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import AppColors from "../../../utils/constants/colors";
import AppText from "../typography/app-text";

interface ChipProps {
  date: number;
  month: string;
  style?: StyleProp<ViewStyle>;
}

const DateCardSimple: React.FC<ChipProps> = ({ date, month, style }) => {
  return (
    <View style={[styles.dateContainer, style]}>
      <AppText fontStyle='calendarDate' style={styles.textStyle}>
        {date}
      </AppText>
      <AppText fontStyle='body' style={styles.textStyle}>
        {month}
      </AppText>
    </View>
  );
};

export default DateCardSimple;

const styles = StyleSheet.create({
  dateContainer: {
    height: 72,
    width: 72,
    borderRadius: 6,
    backgroundColor: AppColors.blue200,
    justifyContent: "center",
    alignItems: "center",
  },
  textStyle: {
    color: AppColors.white,
  },
});
