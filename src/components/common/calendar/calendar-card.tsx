import { StyleSheet, View } from "react-native";
import Todo from "../../todos/todo";
import CardContent from "./card-content";

interface DateProps {
  type?: string;
  title: string;
  icon?: string;
  iconStyle?: any;
  journalStyles?: any;
  displayTodoCard?: boolean;
}

const CalendarCard: React.FC<DateProps> = ({
  type,
  title,
  icon,
  iconStyle,
  journalStyles,
  displayTodoCard = false,
}) => {
  return (
    <View style={styles.calendarContainer}>
      {displayTodoCard && <Todo title={title} />}
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
