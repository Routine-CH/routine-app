import { Pressable, StyleSheet } from "react-native";
import AppColors from "../../utils/constants/colors";
import AppText from "../common/typography/app-text";

interface ChipProps {
  date: number;
  month: string;
}

const DateCard: React.FC<ChipProps> = ({ date, month }) => {
  return (
    <Pressable style={styles.dateContainer}>
      <AppText fontStyle="calendarDate" style={styles.textStyle}>
        {date}
      </AppText>
      <AppText fontStyle="body" style={styles.textStyle}>
        {month}
      </AppText>
    </Pressable>
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
