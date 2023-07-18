import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { endOfWeek, format, startOfWeek } from "date-fns";
import { de } from "date-fns/locale";
import { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import Chip from "../components/calendar/chip";
import CalendarCard from "../components/common/calendar/calendar-card";
import DateCard from "../components/common/calendar/date-card";
import EmptyState from "../components/common/empty-state";
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
  const now = new Date();
  const startOfCurrentWeek = startOfWeek(now, { weekStartsOn: 1 });
  const endOfCurrentWeek = endOfWeek(now, { weekStartsOn: 1 });
  const startOfCurrentWeekFormatted = format(startOfCurrentWeek, "dd MMMM", {
    locale: de,
  });
  const endOfCurrentWeekFormatted = format(endOfCurrentWeek, "dd MMMM yyyy", {
    locale: de,
  });
  const formattedCurrentWeek = `${startOfCurrentWeekFormatted} - ${endOfCurrentWeekFormatted}`;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [calendarData, setCalendarData] = useState<CalendarData>({ data: {} });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [selectedChip, setSelectedChip] = useState("");
  const [filteredContent, setFilteredContent] = useState<any[]>([]);
  const [selectedWeek, setSelectedWeek] = useState<{
    startDate: Date;
    endDate: Date;
  }>({ startDate: startOfCurrentWeek, endDate: endOfCurrentWeek });
  const [formattedDateRange, setFormattedDateRange] =
    useState(formattedCurrentWeek);

  const handleModalPress = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const handleConfirm = (startDate: Date, endDate: Date) => {
    setSelectedWeek({ startDate, endDate });
    const formattedStartDate = format(startDate, "dd MMMM", { locale: de });
    const formattedEndDate = format(endDate, "dd MMMM yyyy", { locale: de });
    const formattedRange = `${formattedStartDate} - ${formattedEndDate}`;
    setFormattedDateRange(formattedRange);
  };

  const filterCalendarData = (startDate: Date, endDate: Date) => {
    const filteredData: CalendarData = { data: {} };

    Object.entries(calendarData.data).forEach(([date, data]) => {
      const currentDate = new Date(date);
      if (currentDate >= startDate && currentDate <= endDate) {
        filteredData.data[date] = data;
      }
    });

    return filteredData;
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
      setLoading(false);
    } catch (error) {
      console.error("Failed to get calendar information", error);
      setError(true);
      setLoading(false);
    }
  };

  useEffect(() => {
    getCalendar();
  }, []);

  const filterContent = (type: string) => {
    setSelectedChip(type);

    if (type === t("tool-cards.goals")) {
      setFilteredContent(
        Object.values(calendarData.data).flatMap((date: any) =>
          date.goals.map((goal: UserGoals) => ({
            ...goal,
            type: t("tool-cards.goals"),
          }))
        )
      );
    } else if (type === t("tool-cards.todos")) {
      setFilteredContent(
        Object.values(calendarData.data).flatMap((date: any) =>
          date.todos.map((todo: UserTodo) => ({
            ...todo,
            type: t("tool-cards.todos"),
          }))
        )
      );
    } else if (type === t("tool-cards.journals")) {
      setFilteredContent(
        Object.values(calendarData.data).flatMap((date: any) =>
          date.journals.map((journal: UserJournals) => ({
            ...journal,
            type: t("tool-cards.journals"),
          }))
        )
      );
    } else {
      setFilteredContent([]);
    }
  };

  const resetFilter = () => {
    setSelectedChip("");
    setFilteredContent([]);
  };

  const renderCalendarData = () => {
    const filteredCalendarData = filterCalendarData(
      selectedWeek.startDate,
      selectedWeek.endDate
    );

    if (
      !filteredCalendarData ||
      Object.keys(filteredCalendarData.data).length === 0
    ) {
      return (
        <EmptyState
          type="calendar"
          title="Keine Daten verfügbar"
          description="Erstelle ein Ziel, ein Todo oder ein Journaleintrag"
          style={{ backgroundColor: AppColors.blueMuted30 }}
        />
      );
    }

    return Object.keys(filteredCalendarData.data).map((date) => {
      const {
        goals = [],
        todos = [],
        journals = [],
      } = filteredCalendarData.data[date];

      const content = [
        ...goals.map((goal: UserGoals) => ({
          id: goal.id,
          title: goal.title,
          completed: goal.completed,
          type: t("tool-cards.goals"),
        })),
        ...todos.map((todo: UserTodo) => ({
          id: todo.id,
          title: todo.title,
          completed: todo.completed,
          type: t("tool-cards.todos"),
        })),
        ...journals.map((journal: UserJournals) => ({
          id: journal.id,
          title: journal.title,
          type: t("tool-cards.journals"),
        })),
      ];

      const itemsToRender = filteredContent.length ? filteredContent : content;

      return (
        <Fragment key={date}>
          <View style={{ flexDirection: "row", gap: 30 }}>
            <View style={{ flexShrink: 1 }}>
              <DateCard date={new Date(date)} />
            </View>
            <View style={{ flexShrink: 1, flexGrow: 1 }}>
              {itemsToRender.map((item: any) => (
                <CalendarCard
                  key={item.id}
                  title={item.title}
                  type={item.type}
                  icon={
                    item.type === t("tool-cards.journals")
                      ? ""
                      : item.completed
                      ? "checkmark-circle"
                      : "close-circle"
                  }
                  iconStyle={
                    item.type === t("tool-cards.journals")
                      ? null
                      : item.completed
                      ? styles.reached
                      : styles.notReached
                  }
                />
              ))}
            </View>
          </View>
        </Fragment>
      );
    });
  };

  return (
    <ScrollViewScreenWrapper
      backgroundColor="white"
      statusBarColor={StatusBarColor.dark}
      defaultPadding
    >
      <View style={styles.chipContainer}>
        <Chip
          text={t("tool-cards.goals")}
          selected={selectedChip === t("tool-cards.goals")}
          onPress={() => {
            if (selectedChip === t("tool-cards.goals")) {
              resetFilter();
            } else {
              filterContent(t("tool-cards.goals"));
            }
          }}
        />
        <Chip
          text={t("tool-cards.todos")}
          selected={selectedChip === t("tool-cards.todos")}
          onPress={() => {
            if (selectedChip === t("tool-cards.todos")) {
              resetFilter();
            } else {
              filterContent(t("tool-cards.todos"));
            }
          }}
        />
        <Chip
          text={t("tool-cards.journals")}
          selected={selectedChip === t("tool-cards.journals")}
          onPress={() => {
            if (selectedChip === t("tool-cards.journals")) {
              resetFilter();
            } else {
              filterContent(t("tool-cards.journals"));
            }
          }}
        />
      </View>
      <TouchableWithoutFeedback onPress={handleModalPress}>
        <AppText fontStyle={"body"} colorStyle="black64" style={styles.margin}>
          {formattedDateRange}
        </AppText>
      </TouchableWithoutFeedback>
      <View style={styles.margin}>
        {loading ? <AppText>Loading...</AppText> : renderCalendarData()}
      </View>
      <CalendarModal
        isVisible={isModalVisible}
        onClose={closeModal}
        onConfirm={handleConfirm}
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
