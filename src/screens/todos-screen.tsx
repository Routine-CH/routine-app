import { add, format } from "date-fns";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, View } from "react-native";
import AddButton from "../components/common/buttons/add-button";
import BackButton from "../components/common/buttons/back-button";
import Calendar from "../components/common/calendar/calendar-card";
import EmptyState from "../components/common/empty-state";
import ScrollViewScreenWrapper from "../components/common/scroll-view-screen-wrapper";
import AppText from "../components/common/typography/app-text";
import Todo from "../components/todos/todo";
import { useUserTodos } from "../hooks/todos/use-user-todos";
import AppColors from "../utils/constants/colors";
import { StatusBarColor } from "../utils/types/enums";

const TodosScreen: React.FC = () => {
  const { userTodos, isLoading } = useUserTodos();
  const { t } = useTranslation();

  const now = new Date();
  const next7Days = [];

  for (let i = 0; i < 7; i++) {
    const day = add(now, { days: i });
    next7Days.push(day);
  }

  const formattedStartDate = format(next7Days[0], "d MMMM");
  const formattedEndDate = format(
    next7Days[next7Days.length - 1],
    "d MMMM yyyy"
  );

  const formattedDateRange = `${formattedStartDate} - ${formattedEndDate}`;
  const shouldDisplayTodoCard = true;

  return (
    <>
      <ScrollViewScreenWrapper
        backgroundColor='white'
        statusBarColor={StatusBarColor.dark}
        defaultPadding
      >
        <BackButton />
        <View>
          <AppText
            fontStyle='heading3'
            colorStyle='black64'
            style={{ marginVertical: 30 }}
          >
            {t("todos.today")} {t("profile.gamification.todos")}
          </AppText>
          {isLoading ? (
            // IMPLEMENT LOADING SCREEN
            <AppText>Loading...</AppText>
          ) : userTodos.length > 0 ? (
            userTodos.map((todo, index) => (
              <Todo
                icon='stop-outline'
                key={todo.id}
                title={todo.title}
                //   description={todo.description}
                description='Beispiel Beschreibung'
                style={{ width: 240 }}
              />
            ))
          ) : (
            <EmptyState
              type='todo'
              title={t("todos.no-todos-title")}
              description={t("todos.no-todos")}
              style={{ backgroundColor: AppColors.blueMuted30 }}
            />
          )}
        </View>
        <AppText
          fontStyle='heading3'
          colorStyle='black64'
          style={{ marginTop: 60, marginBottom: 30 }}
        >
          {t("todos.future")} {t("profile.gamification.todos")}
        </AppText>
        {/* IMPLEMENT CALENDAR!! */}
        <Pressable>
          <AppText fontStyle={"body"} colorStyle='black64'>
            {formattedDateRange}
          </AppText>
        </Pressable>
        <View style={[styles.calendarContainer, { marginTop: 30 }]}>
          {isLoading ? (
            // IMPLEMENT LOADING SCREEN
            <AppText>Loading...</AppText>
          ) : userTodos.length > 0 ? (
            userTodos.map((todo) => (
              <Calendar
                date={15}
                month={"Juni"}
                icon='stop-outline'
                title={todo.title}
                key={todo.id}
                displayTodoCard={shouldDisplayTodoCard}
              />
            ))
          ) : (
            <EmptyState
              type='todo'
              title={t("todos.no-todos-title")}
              description={t("todos.no-future-todos")}
              style={{ backgroundColor: AppColors.greenMuted30 }}
            />
          )}
        </View>
      </ScrollViewScreenWrapper>
      <AddButton />
    </>
  );
};

export default TodosScreen;

const styles = StyleSheet.create({
  calendarContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
  },
  dateCard: {
    height: 64,
    width: 64,
    borderRadius: 6,
  },
});
