import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { DateTime } from "luxon";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import Chip from "../components/calendar/chip";
import CalendarCard from "../components/common/calendar/calendar-card";
import CalendarModal from "../components/common/modals/calendar-modal";
import ScrollViewScreenWrapper from "../components/common/scroll-view-screen-wrapper";
import AppText from "../components/common/typography/app-text";
import { API_BASE_URL } from "../utils/config/config";
import AppColors from "../utils/constants/colors";
import { StatusBarColor } from "../utils/types/enums";
import {
  CalendarData,
  UserGoals,
  UserJournals,
  UserTodo,
} from "../utils/types/types";

const CalendarScreen: React.FC = () => {
  const { t } = useTranslation();
  const now = DateTime.local();
  const startOfWeek = now.startOf("week");
  const endOfWeek = now.endOf("week");
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [calendarData, setCalendarData] = useState<CalendarData>({ data: {} });

  const startOfWeekFormatted = startOfWeek.toLocaleString({
    day: "2-digit",
    month: "long",
  });
  const endOfWeekFormatted = endOfWeek.toLocaleString({
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  const formattedDateRange = `${startOfWeekFormatted} - ${endOfWeekFormatted}`;

  const handleModalPress = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const getCalendar = async () => {
    try {
      const token = await AsyncStorage.getItem("access_token");
      if (token) {
        const response = await axios.get(`${API_BASE_URL}calendar`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCalendarData(response.data);
      }
    } catch (error) {
      console.error("Failed to get calendar information", error);
    }
  };

  useEffect(() => {
    getCalendar();
  }, []);

  return (
    <ScrollViewScreenWrapper
      backgroundColor='white'
      statusBarColor={StatusBarColor.dark}
      defaultPadding
    >
      <View style={styles.chipContainer}>
        <Chip text={t("tool-cards.goals")} />
        <Chip text={t("tool-cards.todos")} />
        <Chip text={t("tool-cards.journals")} />
      </View>
      <TouchableWithoutFeedback onPress={handleModalPress}>
        <AppText fontStyle={"body"} colorStyle='black64' style={styles.margin}>
          {formattedDateRange}
        </AppText>
      </TouchableWithoutFeedback>
      <View style={styles.margin}>
        {calendarData && calendarData.data ? (
          Object.keys(calendarData.data).map((date) => {
            const {
              goals = [],
              todos = [],
              journals = [],
            } = calendarData.data?.[date] || {};

            // Render goals
            const renderedGoals = (goals || []).map((goal: UserGoals) => (
              <CalendarCard
                key={goal.id}
                date={new Date(goal.createdAt)}
                title={goal.title}
                type='Ziel'
                icon={
                  goal.completed === true ? "checkmark-circle" : "close-circle"
                }
                iconStyle={
                  goal.completed === true ? styles.reached : styles.notReached
                }
              />
            ));

            // Render todos
            const renderedTodos = (todos || []).map((todo: UserTodo) => (
              <CalendarCard
                key={todo.id}
                date={new Date(todo.plannedDate)}
                title={todo.title}
                type='Todo'
                icon='close-circle'
                iconStyle={styles.notReached}
              />
            ));

            // Render journals
            const renderedJournals = (journals || []).map(
              (journal: UserJournals) => (
                <CalendarCard
                  key={journal.id}
                  date={new Date(journal.createdAt)}
                  title={journal.title}
                  type='Journal'
                />
              )
            );

            return (
              <React.Fragment key={date}>
                {renderedGoals}
                {renderedTodos}
                {renderedJournals}
              </React.Fragment>
            );
          })
        ) : (
          <AppText>No Data available</AppText>
        )}
      </View>
      <CalendarModal
        isVisible={isModalVisible}
        onClose={closeModal}
        onConfirm={closeModal}
      />
    </ScrollViewScreenWrapper>
  );
};

export default CalendarScreen;

const styles = StyleSheet.create({
  chipContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  margin: {
    marginTop: 30,
  },
  calendarContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    width: "100%",
  },
  reached: {
    color: AppColors.blue100,
  },
  notReached: {
    color: AppColors.red,
  },
});
