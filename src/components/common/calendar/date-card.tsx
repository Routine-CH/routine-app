import { format, getDate } from "date-fns";
import { de } from "date-fns/locale";
import { StyleProp, StyleSheet, View, ViewStyle } from "react-native";
import AppColors from "../../../utils/constants/colors";
import AppText from "../typography/app-text";

interface ChipProps {
  date: Date;
  style?: StyleProp<ViewStyle>;
}

const DateCard: React.FC<ChipProps> = ({ date, style }) => {
  const day = getDate(date);
  const month = format(date, "MMMM", { locale: de });

  return (
    <View style={[styles.dateContainer, style]}>
      <AppText fontStyle='calendarDate' style={styles.textStyle}>
        {day}
      </AppText>
      <AppText fontStyle='body' style={styles.textStyle}>
        {month}
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
