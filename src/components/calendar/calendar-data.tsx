import { StyleSheet, View } from "react-native";
import AppColors from "../../utils/constants/colors";
import {
  CalendarDataTypes,
  CalendarItems,
} from "../../utils/types/calendar/types";
import CalendarCard from "../common/calendar/calendar-card";
import DateCard from "../common/calendar/date-card";
import EmptyState from "../common/empty-state";

type CalendarDataProps = {
  calendar: CalendarItems[] | null;
};

const CalendarData: React.FC<CalendarDataProps> = ({ calendar }) => {
  if (!calendar || calendar.length === 0) {
    return (
      <View
        style={{
          height: "100%",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <EmptyState
          type='calendar'
          title='Keine Einträge in dieser Woche'
          description='Erstelle ein Ziel, ein Todo oder ein Journaleintrag'
          style={{ backgroundColor: AppColors.blueMuted30 }}
        />
      </View>
    );
  }

  return (
    <>
      {calendar.map((calendarItem) => {
        const items = [
          ...calendarItem.data.goals.map((goal) => ({
            type: CalendarDataTypes.GOALS,
            ...goal,
          })),
          ...calendarItem.data.todos.map((todo) => ({
            type: CalendarDataTypes.TODOS,
            ...todo,
          })),
          ...calendarItem.data.journals.map((journal) => ({
            type: CalendarDataTypes.JOURNALS,
            ...journal,
          })),
        ];

        return (
          <View
            key={calendarItem.date}
            style={{ flexDirection: "row", gap: 30 }}
          >
            <View style={{ flexShrink: 1 }}>
              <DateCard date={new Date(calendarItem.date)} />
            </View>
            <View style={{ flexShrink: 1 }}>
              <View style={{ flexShrink: 1, flexGrow: 1 }}>
                {items.map((item) => (
                  <CalendarCard
                    key={item.id}
                    title={item.title}
                    type={item.type}
                    icon={
                      item.type === CalendarDataTypes.JOURNALS
                        ? ""
                        : item.completed
                        ? "checkmark-circle"
                        : "close-circle"
                    }
                    iconStyle={
                      item.type === CalendarDataTypes.JOURNALS
                        ? null
                        : item.completed
                        ? styles.reached
                        : styles.notReached
                    }
                  />
                ))}
              </View>
            </View>
          </View>
        );
      })}
    </>
  );
};

export default CalendarData;

const styles = StyleSheet.create({
  reached: {
    color: AppColors.blue100,
  },
  notReached: {
    color: AppColors.red,
  },
});
