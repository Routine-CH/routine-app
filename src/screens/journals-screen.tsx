import AsyncStorage from "@react-native-async-storage/async-storage";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import AddButton from "../components/common/buttons/add-button";
import BackButton from "../components/common/buttons/back-button";
import Calendar from "../components/common/calendar/calendar";
import EditDeleteModal from "../components/common/modals/edit-delete-modal";
import ScrollViewScreenWrapper from "../components/common/scroll-view-screen-wrapper";
import AppText from "../components/common/typography/app-text";
import TodaysJournal from "../components/journal/todays-journal";
import EmptyState from "../components/todos/empty-state";
import { API_BASE_URL } from "../utils/config/config";
import AppColors from "../utils/constants/colors";
import { StatusBarColor } from "../utils/types/enums";
import {
  AllUserJournals,
  AuthenticatedStackParamList,
  UserJournals,
} from "../utils/types/types";

const JournalsScreen: React.FC = () => {
  const { t } = useTranslation();
  const [todaysJournal, setTodaysJournal] = useState<UserJournals | null>(null);
  const [userJournals, setUserJournals] = useState<AllUserJournals | null>(
    null
  );
  const [isLoadingTodaysJournal, setIsLoadingTodaysJournal] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigation =
    useNavigation<BottomTabNavigationProp<AuthenticatedStackParamList>>();

  const handleModalPress = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    async function getTodaysJournals() {
      try {
        const token = await AsyncStorage.getItem("access_token");
        if (token) {
          const currentDate = DateTime.local().toISODate();

          const response = await axios.get(
            `${API_BASE_URL}journals?date=${currentDate}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const journalsData = response.data.data;
          if (journalsData.length > 0) {
            const journalId = journalsData[0].id;
            const journalIdResponse = await axios.get(
              `${API_BASE_URL}journals/${journalId}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            const fullJournal = journalIdResponse.data.data;
            setTodaysJournal(fullJournal);
          } else {
            setTodaysJournal(null);
          }
        }
      } catch (error) {
        console.error("Failed to get user journals", error);
      } finally {
        setIsLoadingTodaysJournal(false);
      }
    }
    getTodaysJournals();
  }, []);

  useEffect(() => {
    async function getUserJournals() {
      try {
        const token = await AsyncStorage.getItem("access_token");
        if (token) {
          const response = await axios.get(`${API_BASE_URL}journals`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          const journalsData = response.data.data;
          if (journalsData.length > 0) {
            setUserJournals(journalsData);
          } else {
            setUserJournals(null);
          }
        }
      } catch (error) {
        console.error("Failed to get user journals", error);
      } finally {
        setIsLoading(false);
      }
    }
    getUserJournals();
  }, []);

  const navigateToJournalEditScreen = () => {
    setIsModalVisible(false);
    navigation.navigate("Home", {
      screen: "JournalEdit",
      params: {
        Journals: {
          params: {
            JournalEdit: {
              journal: todaysJournal || null,
            },
          },
        },
      },
    });
  };

  const navigateToNewJournalScreen = () => {
    setIsModalVisible(false);
    navigation.navigate("Home", {
      screen: "JournalNew",
    });
  };

  return (
    <ScrollViewScreenWrapper
      statusBarColor={StatusBarColor.dark}
      backgroundColor={AppColors.white}
    >
      <View style={styles.buttonContainer}>
        <BackButton />
        {todaysJournal ? (
          <Pressable onPress={handleModalPress}>
            <Icon
              name={"ellipsis-vertical"}
              size={26}
              color={AppColors.black64}
            />
          </Pressable>
        ) : null}
      </View>
      <View style={styles.outerContainer}>
        <View style={styles.innerContainer}>
          {isLoadingTodaysJournal ? (
            <AppText>Loading...</AppText>
          ) : todaysJournal ? (
            <TodaysJournal userJournal={todaysJournal} />
          ) : (
            <EmptyState
              type="journal"
              title={t("journal.no-entry-title")}
              description={t("journal.no-entry-yet")}
              style={{ backgroundColor: AppColors.blueMuted30 }}
            />
          )}
        </View>
      </View>
      <View
        style={{
          backgroundColor: AppColors.blue300,
          paddingTop: 30,
          paddingHorizontal: 30,
          paddingBottom: 30,
        }}
      >
        <AppText
          fontStyle="heading3"
          colorStyle="black64"
          style={{ marginBottom: 30 }}
        >
          {t("journal.past-entries")}
        </AppText>
        {isLoading ? (
          <AppText>Loading Past Journals</AppText>
        ) : userJournals ? (
          userJournals.map((journal) => {
            return (
              <Calendar
                date={5}
                month="Juni"
                title="Lorem"
                key={journal.id}
                journalStyles={styles.journal}
              />
            );
          })
        ) : (
          <EmptyState
            type="journal"
            title={t("journal.no-entry-titles")}
            description={t("journal.no-entries-yet")}
            style={{ backgroundColor: AppColors.white }}
          />
        )}
      </View>
      {!todaysJournal ? (
        <AddButton navigateTo={() => navigateToNewJournalScreen()} />
      ) : null}
      <EditDeleteModal
        isVisible={isModalVisible}
        onClose={closeModal}
        navigateTo={() => navigateToJournalEditScreen()}
      />
    </ScrollViewScreenWrapper>
  );
};

export default JournalsScreen;

const styles = StyleSheet.create({
  buttonContainer: {
    paddingHorizontal: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  outerContainer: { backgroundColor: AppColors.blue300 },
  innerContainer: {
    paddingHorizontal: 30,
    paddingBottom: 30,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: "white",
  },
  calendarContainer: {
    marginTop: 30,
    flexDirection: "row",
  },
  journal: {
    backgroundColor: AppColors.white,
  },
});
