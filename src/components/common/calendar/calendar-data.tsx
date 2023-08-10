import { Dispatch, SetStateAction } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import AppColors from "../../../utils/constants/colors";
import {
  CalendarDataTypes,
  CalendarItems,
} from "../../../utils/types/calendar/types";
import { UserTodo } from "../../../utils/types/types";
import EmptyState from "../empty-state";
import CalendarCard from "./calendar-card";
import DateCard from "./date-card";

type CalendarDataProps = {
  calendar: CalendarItems[] | null;
  setSelectedTodo?: (todo: UserTodo | null) => void;
  setIsModalVisible?: Dispatch<SetStateAction<boolean>>;
};

const windowWidth = Dimensions.get("window").width;

const CalendarData: React.FC<CalendarDataProps> = ({
  calendar,
  setSelectedTodo,
  setIsModalVisible,
}) => {
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
          <View key={calendarItem.date} style={{ flexDirection: "row" }}>
            <View>
              <DateCard date={new Date(calendarItem.date)} />
            </View>
            <View>
              {items.map((item) => (
                <CalendarCard
                  key={item.id}
                  id={item.id}
                  title={item.title}
                  description={item.description}
                  plannedDate={item.plannedDate}
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
                  style={{ marginBottom: 10 }}
                  journalStyles={{ marginLeft: windowWidth * 0.045 }}
                  setSelectedTodo={setSelectedTodo}
                  setIsModalVisible={setIsModalVisible}
                />
              ))}
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
