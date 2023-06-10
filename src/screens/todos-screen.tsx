import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, View } from "react-native";
import AddButton from "../components/common/buttons/add-button";
import BackButton from "../components/common/buttons/back-button";
import Calendar from "../components/common/calendar/calendar";
import ScrollViewScreenWrapper from "../components/common/scroll-view-screen-wrapper";
import AppText from "../components/common/typography/app-text";
import EmptyState from "../components/todos/empty-state";
import Todo from "../components/todos/todo";
import { API_BASE_URL } from "../utils/config/config";
import AppColors from "../utils/constants/colors";
import { StatusBarColor } from "../utils/types/enums";
import { UserTodo } from "../utils/types/types";

const TodosScreen: React.FC = () => {
  const [userTodos, setUserTodos] = useState<UserTodo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getUserTodos() {
      try {
        const token = await AsyncStorage.getItem("access_token");
        if (token) {
          const response = await axios.get(`${API_BASE_URL}todos`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setUserTodos(response.data.data);
        }
      } catch (error) {
        console.log("Failed to get user todos", error);
      } finally {
        setIsLoading(false);
      }
    }
    getUserTodos();
  }, []);

  const { t } = useTranslation();

  const now = DateTime.local();
  const next7Days = [];

  for (let i = 0; i < 7; i++) {
    const day = now.plus({ days: i });
    next7Days.push(day);
  }

  const formattedStartDate = next7Days[0].toLocaleString({
    day: "numeric",
    month: "long",
  });
  const formattedEndDate = next7Days[next7Days.length - 1].toLocaleString({
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const formattedDateRange = `${formattedStartDate} - ${formattedEndDate}`;
  const shouldDisplayTodoCard = true; // Your condition to determine whether to display the additional card

  return (
    <>
      <ScrollViewScreenWrapper
        backgroundColor="white"
        statusBarColor={StatusBarColor.dark}
        defaultPadding
      >
        <BackButton />
        <View>
          <AppText
            fontStyle="heading3"
            colorStyle="black64"
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
                icon="stop-outline"
                key={todo.id}
                title={todo.title}
                //   description={todo.description}
                description="Beispiel Beschreibung"
                style={{ width: 240 }}
              />
            ))
          ) : (
            <EmptyState
              description={t("todos.no-todos")}
              style={{ backgroundColor: AppColors.blueMuted30 }}
            />
          )}
        </View>
        <AppText
          fontStyle="heading3"
          colorStyle="black64"
          style={{ marginTop: 60, marginBottom: 30 }}
        >
          {t("todos.future")} {t("profile.gamification.todos")}
        </AppText>
        {/* IMPLEMENT CALENDAR!! */}
        <Pressable>
          <AppText fontStyle={"body"} colorStyle="black64">
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
                icon="stop-outline"
                title={todo.title}
                key={todo.id}
                displayTodoCard={shouldDisplayTodoCard}
              />
            ))
          ) : (
            <EmptyState
              description={t("todos.no-future-todos")}
              style={{ backgroundColor: AppColors.greenMuted30 }}
            />
          )}
        </View>
      </ScrollViewScreenWrapper>
      <AddButton style={styles.buttonStyle} />
    </>
  );
};

export default TodosScreen;

const styles = StyleSheet.create({
  buttonStyle: {
    position: "absolute",
    right: 20,
    bottom: 20,
  },
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
