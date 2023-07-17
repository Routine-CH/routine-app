import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import AddButton from "../components/common/buttons/add-button";
import BackButton from "../components/common/buttons/back-button";
import Calendar from "../components/common/calendar/calendar";
import EditDeleteModal from "../components/common/modals/edit-delete-modal";
import ScrollViewScreenWrapper from "../components/common/scroll-view-screen-wrapper";
import RoutineToast from "../components/common/toast/routine-toast";
import { showToast } from "../components/common/toast/show-toast";
import AppText from "../components/common/typography/app-text";
import TodaysJournal from "../components/journal/todays-journal";
import EmptyState from "../components/todos/empty-state";
import { deleteUserJournalRequest } from "../data/journal/delete-request";
import { useUserJournal } from "../hooks/journals/use-user-journal";
import AppColors from "../utils/constants/colors";
import { StatusBarColor, ToastType } from "../utils/types/enums";
import { AuthenticatedStackParamList } from "../utils/types/types";

const JournalsScreen: React.FC = () => {
  const { t } = useTranslation();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigation =
    useNavigation<BottomTabNavigationProp<AuthenticatedStackParamList>>();

  const handleModalPress = () => {
    setIsModalVisible(!isModalVisible);
  };

  const { todaysJournal, userJournals, isLoading, isLoadingTodaysJournal } =
    useUserJournal();

  const deleteJournal = () => {
    deleteUserJournalRequest(todaysJournal);
    setIsModalVisible(false);
    showToast(ToastType.success, "Journal gelöscht");
    setTimeout(() => {
      navigation.navigate("Discover", {
        screen: "Journals",
      });
    }, 2000);
  };

  const navigateToJournalEditScreen = () => {
    setIsModalVisible(false);
    if (todaysJournal) {
      navigation.navigate("JournalEdit", { id: todaysJournal.id });
    }
  };

  const navigateToNewJournalScreen = () => {
    setIsModalVisible(false);
    navigation.navigate("JournalNew");
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
          paddingHorizontal: 30,
          paddingBottom: 30,
        }}
      >
        <AppText
          fontStyle='heading3'
          colorStyle='black64'
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
                month='Juni'
                title='Lorem'
                key={journal.id}
                journalStyles={styles.journal}
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
      {!todaysJournal ? (
        <AddButton navigateTo={() => navigateToNewJournalScreen()} />
      ) : null}
      <EditDeleteModal
        isVisible={isModalVisible}
        onConfirm={deleteJournal}
        navigateTo={() => navigateToJournalEditScreen()}
      />
      <RoutineToast />
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
