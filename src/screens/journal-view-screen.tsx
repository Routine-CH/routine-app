import {
  NavigationProp,
  RouteProp,
  useNavigation,
} from "@react-navigation/core";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Dimensions, Pressable, StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import BackButton from "../components/common/buttons/back-button";
import Chip from "../components/common/calendar/chip";
import LabelInputField from "../components/common/input/label-input-field";
import { LoadingIndicator } from "../components/common/loading-indicator";
import EditDeleteModal from "../components/common/modals/edit-delete-modal";
import ScrollViewScreenWrapper from "../components/common/scroll-view-screen-wrapper";
import AppText from "../components/common/typography/app-text";
import { deleteUserJournalRequest } from "../data/journal/delete-request";
import { useJournalData } from "../hooks/journals/use-journal-data";
import { useCalendarStore } from "../store/calendar-store";
import { useJournalStore } from "../store/journal-store";
import { useToastMessageStore } from "../store/toast-messages-store";
import AppColors from "../utils/constants/colors";
import { StatusBarColor, ToastType } from "../utils/types/enums";
import { AuthenticatedStackParamList } from "../utils/types/routes/types";
import { UserJournals } from "../utils/types/types";

type JournalScreenRouteProps = RouteProp<
  AuthenticatedStackParamList,
  "JournalView"
>;

type JournalViewProps = {
  route: JournalScreenRouteProps;
};

const windowWidth = Dimensions.get("window").width;

const JournalViewScreen: React.FC<JournalViewProps> = ({ route }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigation =
    useNavigation<NavigationProp<AuthenticatedStackParamList>>();
  const journalId = route.params.id;
  const { journal } = useJournalData(journalId);
  const showToast = useToastMessageStore((state) => state.showToast);
  const { startLoading, stopLoading } = useToastMessageStore();
  const { t } = useTranslation();
  const { setCalendarDataUpdated } = useCalendarStore();

  const { loadUserJournals, dataUpdated, setDataUpdated } = useJournalStore();

  const handleModalPress = () => {
    setIsModalVisible(!isModalVisible);
  };

  useEffect(() => {
    loadUserJournals();
  }, [dataUpdated]);

  const deleteJournal = async (journal: UserJournals) => {
    try {
      startLoading();
      const response = await deleteUserJournalRequest(journal);
      if (response!.status === 204) {
        setIsModalVisible(false);
        showToast(ToastType.success, "Journal gelöscht");
        setDataUpdated(true);
        setCalendarDataUpdated(true);
        setTimeout(() => {
          navigation.goBack();
        }, 2000);
      } else {
        showToast(ToastType.error, "Journal konnte nicht gelöscht werden");
      }
    } catch (error) {
      setIsModalVisible(false);
      stopLoading();
      console.error("Failed to delete journal", error);
    } finally {
      stopLoading();
    }
  };

  const navigateToJournalEditScreen = (journalId: string) => {
    setIsModalVisible(false);
    navigation.navigate("SubRoutes", {
      screen: "JournalEdit",
      params: { id: journalId },
    });
  };

  return journal ? (
    <ScrollViewScreenWrapper
      backgroundColor='white'
      statusBarColor={StatusBarColor.dark}
      defaultPadding
    >
      <View style={styles.buttonContainer}>
        <BackButton />
        <Pressable onPress={handleModalPress}>
          <Icon
            name={"ellipsis-vertical"}
            size={26}
            color={AppColors.black64}
          />
        </Pressable>
      </View>
      <View style={styles.contentContainer}>
        <AppText
          fontStyle='body'
          colorStyle='black70'
          style={styles.labelStyle}
        >
          {t("journal.title")}
        </AppText>
        <LabelInputField
          style={styles.inputStyle}
          multiline={true}
          value={journal?.title}
          isEditable={false}
        />
        <AppText
          fontStyle='body'
          colorStyle='black70'
          style={styles.labelStyle}
        >
          {t("journal.mood-past")}
        </AppText>
        <View style={styles.chipContainer}>
          {journal.journalMoods.map((mood) => (
            <Chip
              key={mood.mood.id}
              text={t(`emotions.${mood.mood.type}`)}
              style={styles.chip}
              isEditable={false}
            />
          ))}
        </View>
        <AppText
          fontStyle='body'
          colorStyle='black70'
          style={styles.labelStyle}
        >
          {t("journal.mood-description-past")}
        </AppText>
        <LabelInputField
          style={styles.inputStyle}
          multiline={true}
          value={journal.moodDescription}
          isEditable={false}
        />
        <AppText
          fontStyle='body'
          colorStyle='black70'
          style={styles.labelStyle}
        >
          {t("journal.activity-past")}
        </AppText>
        <LabelInputField
          style={styles.inputStyle}
          multiline={true}
          value={journal.activity}
          isEditable={false}
        />
        <AppText
          fontStyle='body'
          colorStyle='black70'
          style={styles.labelStyle}
        >
          {t("journal.to-improve")}
        </AppText>
        <LabelInputField
          style={styles.inputStyle}
          multiline={true}
          value={journal.toImprove}
          isEditable={false}
        />
        {journal.thoughtsAndIdeas && (
          <>
            <AppText
              fontStyle='body'
              colorStyle='black70'
              style={styles.labelStyle}
            >
              {t("journal.thoughts-and-ideas")}
            </AppText>
            <LabelInputField
              style={styles.inputStyle}
              multiline={true}
              value={journal.thoughtsAndIdeas}
              isEditable={false}
            />
          </>
        )}
      </View>
      <EditDeleteModal
        title={t("modals.are-you-sure")}
        description={t("modals.journal")}
        actionText={t("modals.delete")}
        isVisible={isModalVisible}
        setIsVisible={setIsModalVisible}
        onConfirm={() => deleteJournal(journal)}
        navigateTo={() => navigateToJournalEditScreen(journal.id)}
      />
    </ScrollViewScreenWrapper>
  ) : (
    <LoadingIndicator />
  );
};

export default JournalViewScreen;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  contentContainer: {
    marginVertical: 30,
  },
  labelStyle: {
    marginBottom: 15,
  },
  inputStyle: {
    backgroundColor: AppColors.blueMuted20,
    marginBottom: 30,
  },
  chipContainer: {
    width: "100%",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 15,
    marginBottom: 30,
  },
  chip: {
    width: "47%",
  },
});
