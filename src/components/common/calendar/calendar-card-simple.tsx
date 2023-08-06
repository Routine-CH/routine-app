import { Dimensions, StyleSheet, TouchableOpacity, View } from "react-native";
import Todo from "../../todos/todo";

import CardContent from "./card-content";
import DateCardSimple from "./date-card-simple";

interface CalendarCardSimpleProps {
  id: string;
  date: number;
  month: string;
  type?: string;
  title: string;
  icon?: string;
  iconStyle?: any;
  journalStyles?: any;
  displayTodoCard?: boolean;
  navigateTo?: () => void;
}

const windowWidth = Dimensions.get("window").width;

const CalendarCardSimple: React.FC<CalendarCardSimpleProps> = ({
  id,
  date,
  month,
  type,
  title,
  icon,
  iconStyle,
  journalStyles,
  displayTodoCard = false,
  navigateTo,
}) => {
  return (
    <TouchableOpacity style={styles.calendarContainer} onPress={navigateTo}>
      <View>
        <DateCardSimple date={date} month={month} />
      </View>
      <View style={{ marginLeft: windowWidth * 0.0093 }}>
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
    </TouchableOpacity>
  );
};

export default CalendarCardSimple;

const styles = StyleSheet.create({
  calendarContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
    justifyContent: "center",
    marginVertical: 5,
  },
});
