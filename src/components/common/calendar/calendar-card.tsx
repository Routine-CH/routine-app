import { StyleSheet, View } from "react-native";
import Todo from "../../todos/todo";
import CardContent from "./card-content";
import DateCard from "./date-card";

interface DateProps {
  date: Date;
  type?: string;
  title: string;
  icon?: string;
  iconStyle?: any;
  journalStyles?: any;
  displayTodoCard?: boolean;
}

const CalendarCard: React.FC<DateProps> = ({
  date,
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
        <DateCard date={date} />
      </View>
      <View style={{ flex: 3 }}>
        {displayTodoCard && <Todo icon={icon} title={title} />}
        {!displayTodoCard && (
          <CardContent
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

export default CalendarCard;

const styles = StyleSheet.create({
  calendarContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
  },
});
