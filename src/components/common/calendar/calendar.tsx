import { StyleSheet, View } from "react-native";
import Todo from "../../todos/todo";
import Card from "./card";
import DateCard from "./date-card";

interface DateProps {
  date: number;
  month: string;
  type?: string;
  title: string;
  icon?: string;
  iconStyle?: any;
  journalStyles?: any;
  displayTodoCard?: boolean;
}

const Calendar: React.FC<DateProps> = ({
  date,
  month,
  type,
  title,
  icon,
  iconStyle,
  journalStyles,
  displayTodoCard = false,
}) => {
  return (
    <View style={styles.calendarContainer}>
      <View style={{ flex: 1 }}>
        <DateCard date={date} month={month} />
      </View>
      <View style={{ flex: 3 }}>
        {displayTodoCard && <Todo icon={icon} title={title} />}
        {!displayTodoCard && (
          <Card
            type={type}
            title={title}
            icon={icon}
            iconStyle={iconStyle}
            cardStyle={journalStyles}
          />
        )}
      </View>
    </View>
  );
};

export default Calendar;

const styles = StyleSheet.create({
  calendarContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
  },
});
