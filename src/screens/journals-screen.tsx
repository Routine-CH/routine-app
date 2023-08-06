import { NavigationProp, useNavigation } from "@react-navigation/native";
import { format, getDate, parseISO } from "date-fns";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Dimensions, Pressable, StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import AddButton from "../components/common/buttons/add-button";
import BackButton from "../components/common/buttons/back-button";
import CalendarCardSimple from "../components/common/calendar/calendar-card-simple";
import EmptyState from "../components/common/empty-state";
import { FullscreenLoadingIndicator } from "../components/common/fullscreen-loading-indicator";
import { LoadingIndicator } from "../components/common/loading-indicator";
import EditDeleteModal from "../components/common/modals/edit-delete-modal";
import ScrollViewScreenWrapper from "../components/common/scroll-view-screen-wrapper";
import RoutineToast from "../components/common/toast/routine-toast";
import { showToast } from "../components/common/toast/show-toast";
import AppText from "../components/common/typography/app-text";
import TodaysJournal from "../components/journal/todays-journal";
import { deleteUserJournalRequest } from "../data/journal/delete-request";
import { useJournalStore } from "../store/journal-store";
import AppColors from "../utils/constants/colors";
import AppFontStyle from "../utils/constants/font-style";
import { StatusBarColor, ToastType } from "../utils/types/enums";
import { AuthenticatedStackParamList } from "../utils/types/routes/types";

const windowWidth = Dimensions.get("window").width;

const JournalsScreen: React.FC = () => {
  const { t } = useTranslation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isDeletingJournal, setIsDeletingJournal] = useState(false);
  const navigation =
    useNavigation<NavigationProp<AuthenticatedStackParamList>>();

  const handleModalPress = () => {
    setIsModalVisible(!isModalVisible);
  };

  const {
    userJournals,
    isLoading,
    loadUserJournals,
    dataUpdated,
    setDataUpdated,
  } = useJournalStore();

  useEffect(() => {
    loadUserJournals();
  }, [dataUpdated]);

  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  const todayJournal = userJournals?.find((journal) => {
    const journalDate = new Date(journal.createdAt);
    journalDate.setHours(0, 0, 0, 0);
    return journalDate.getTime() === currentDate.getTime();
  });

  const pastJournals = userJournals.filter((journal) => {
    const journalDate = new Date(journal.createdAt);
    journalDate.setHours(0, 0, 0, 0);
    return journalDate.getTime() !== currentDate.getTime();
  });

  const deleteJournal = async () => {
    try {
      setIsDeletingJournal(true);
      const response = await deleteUserJournalRequest(todayJournal);
      if (response!.status === 204) {
        setIsModalVisible(false);
        showToast(ToastType.success, "Journal gelöscht");
        setDataUpdated(true);
        setTimeout(() => {
          navigation.navigate("Journals");
        }, 2000);
      } else {
        showToast(ToastType.error, "Journal konnte nicht gelöscht werden");
      }
    } catch (error) {
      setIsModalVisible(false);
      setIsDeletingJournal(false);
      console.error("Failed to delete journal", error);
    } finally {
      setIsDeletingJournal(false);
    }
  };

  const navigateToJournalEditScreen = (journalId?: string) => {
    setIsModalVisible(false);
    if (todayJournal) {
      navigation.navigate("SubRoutes", {
        screen: "JournalEdit",
        params: { id: !journalId ? todayJournal.id : journalId },
      });
    } else {
      navigation.navigate("SubRoutes", {
        screen: "JournalEdit",
        params: { id: journalId, editable: false },
      });
    }
  };

  const navigateToNewJournalScreen = () => {
    setIsModalVisible(false);
    navigation.navigate("SubRoutes", {
      screen: "JournalNew",
    });
  };

  return (
    <>
      <ScrollViewScreenWrapper
        statusBarColor={StatusBarColor.dark}
        backgroundColor={AppColors.white}
      >
        <View style={styles.buttonContainer}>
          <BackButton />
          {todayJournal ? (
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
            {isLoading ? (
              <LoadingIndicator />
            ) : todayJournal ? (
              <TodaysJournal userJournal={todayJournal} />
            ) : (
              <EmptyState
                type='journal'
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
            paddingHorizontal: windowWidth * 0.05,
            paddingBottom: 47.5,
            alignItems: "center",
          }}
        >
          <AppText
            colorStyle='black64'
            style={{
              marginBottom: 25,
              fontSize: windowWidth * 0.07,
              fontFamily: AppFontStyle.heading3.fontFamily,
            }}
          >
            {t("journal.past-entries")}
          </AppText>
          {isLoading ? (
            <LoadingIndicator />
          ) : pastJournals ? (
            pastJournals.slice(0, 7).map((journal) => {
              const parsedDate = parseISO(journal.createdAt.toString());
              const day = getDate(parsedDate);
              const month = format(parsedDate, "MMMM");
              return (
                <CalendarCardSimple
                  key={journal.id}
                  id={journal.id}
                  date={day}
                  month={month}
                  title={journal.title}
                  journalStyles={styles.journal}
                  navigateTo={() => navigateToJournalEditScreen(journal.id)}
                />
              );
            })
          ) : (
            <EmptyState
              type='journal'
              title={t("journal.no-entry-titles")}
              description={t("journal.no-entries-yet")}
              style={{ backgroundColor: AppColors.white }}
            />
          )}
        </View>
        {isDeletingJournal && <FullscreenLoadingIndicator />}
        <EditDeleteModal
          title={t("modals.are-you-sure")}
          description={t("modals.journal")}
          actionText={t("modals.delete")}
          isVisible={isModalVisible}
          setIsVisible={setIsModalVisible}
          onConfirm={deleteJournal}
          navigateTo={() => navigateToJournalEditScreen()}
        />
        <RoutineToast />
      </ScrollViewScreenWrapper>
      {!todayJournal ? (
        <AddButton navigateTo={() => navigateToNewJournalScreen()} />
      ) : null}
    </>
  );
};

export default JournalsScreen;

const styles = StyleSheet.create({
  buttonContainer: {
    paddingHorizontal: windowWidth * 0.05,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 30,
  },
  outerContainer: { backgroundColor: AppColors.blue300 },
  innerContainer: {
    paddingHorizontal: windowWidth * 0.05,
    paddingBottom: 30,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
    backgroundColor: AppColors.white,
  },
  calendarContainer: {
    marginTop: 30,
    flexDirection: "row",
  },
  journal: {
    backgroundColor: AppColors.white,
  },
});
