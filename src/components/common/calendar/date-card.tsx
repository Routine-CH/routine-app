import { DateTime } from "luxon";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import AppColors from "../../../utils/constants/colors";
import AppText from "../typography/app-text";

interface ChipProps {
  date: Date;
  style?: StyleProp<ViewStyle>;
}

const DateCard: React.FC<ChipProps> = ({ date, style }) => {
  const formattedDate = DateTime.fromJSDate(date).toFormat("dd");
  const formattedMonth = DateTime.fromJSDate(date).toFormat("MMMM");

  return (
    <View style={[styles.dateContainer, style]}>
      <AppText fontStyle="calendarDate" style={styles.textStyle}>
        {formattedDate}
      </AppText>
      <AppText fontStyle="body" style={styles.textStyle}>
        {formattedMonth}
      </AppText>
    </View>
  );
};

export default DateCard;

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
