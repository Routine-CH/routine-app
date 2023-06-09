import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import DateCard from "../components/calendar/date-card";
import BackButton from "../components/common/buttons/back-button";
import ScrollViewScreenWrapper from "../components/common/scroll-view-screen-wrapper";
import AppText from "../components/common/typography/app-text";
import JournalCard from "../components/journal/journals-card";
import TodaysJournal from "../components/journal/todays-journal";
import { API_BASE_URL } from "../utils/config/config";
import AppColors from "../utils/constants/colors";
import { StatusBarColor } from "../utils/types/enums";
import { AllUserJournals, UserJournals } from "../utils/types/types";

const JournalsScreen: React.FC = () => {
  const [todaysJournal, setTodaysJournal] = useState<UserJournals | null>(null);
  const [userJournals, setUserJournals] = useState<AllUserJournals | null>(
    null
  );
  const [isLoadingTodaysJournal, setIsLoadingTodaysJournal] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const { t } = useTranslation();

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
            setTodaysJournal(journalsData[0]);
          } else {
            setTodaysJournal(null);
          }
        }
      } catch (error) {
        console.log("Failed to get user journals", error);
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
        console.log("Failed to get user journals", error);
      } finally {
        setIsLoading(false);
      }
    }
    getUserJournals();
  }, []);

  return (
    <>
      <ScrollViewScreenWrapper
        statusBarColor={StatusBarColor.dark}
        backgroundColor={AppColors.white}
      >
        <View style={styles.buttonContainer}>
          <BackButton />
          <Icon
            name={"ellipsis-vertical"}
            size={26}
            color={AppColors.black64}
          />
        </View>
        <View style={styles.outerContainer}>
          <View style={styles.innerContainer}>
            {isLoadingTodaysJournal ? (
              <AppText>Loading</AppText>
            ) : (
              <TodaysJournal userJournal={todaysJournal} />
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
          <AppText fontStyle="heading3" colorStyle="black64">
            {t("journal.past-entries")}
          </AppText>
          {isLoading ? (
            <AppText>Loading Past Journals</AppText>
          ) : userJournals ? (
            userJournals.map((journal) => {
              return (
                <View style={styles.calendarContainer} key={journal.id}>
                  <DateCard date={10} month={"Juni"} />
                  <JournalCard title={journal.title} />
                </View>
              );
            })
          ) : (
            <AppText>No Past Todos</AppText>
          )}
        </View>
      </ScrollViewScreenWrapper>
    </>
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
});
