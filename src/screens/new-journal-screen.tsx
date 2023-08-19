import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import IconTextButton from "../components/common/buttons/icon-text-button";
import SaveButton from "../components/common/buttons/save-button";
import Chip from "../components/common/calendar/chip";
import LabelInputField from "../components/common/input/label-input-field";
import ScrollViewScreenWrapper from "../components/common/scroll-view-screen-wrapper";
import EmotionModal from "../components/journal/emotion-modal";
import { createUserJournalRequest } from "../data/journal/create-request";
import { useGamificationStore } from "../store/gamification-store";
import { useJournalStore } from "../store/journal-store";
import { useToastMessageStore } from "../store/toast-messages-store";
import AppColors from "../utils/constants/colors";
import { StatusBarColor, ToastType } from "../utils/types/enums";
import { AuthenticatedStackParamList } from "../utils/types/routes/types";
import { IFormJournalInputs } from "../utils/types/types";

const NewJournalScreen: React.FC = () => {
  const { t } = useTranslation();
  const navigation =
    useNavigation<NavigationProp<AuthenticatedStackParamList>>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedMoods, setSelectedMoods] = useState<
    { id: string; type: string }[]
  >([]);
  const { setDataUpdated } = useJournalStore();
  const [isEditable, setIsEditable] = useState(true);
  const showToast = useToastMessageStore((state) => state.showToast);
  const { control, handleSubmit } = useForm<IFormJournalInputs>();
  const { startLoading, stopLoading } = useToastMessageStore();

  const handleModalPress = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const handleNewJournal = async ({
    title,
    moodDescription,
    activity,
    toImprove,
    thoughtsAndIdeas,
  }: IFormJournalInputs) => {
    startLoading();
    const response = await createUserJournalRequest({
      title,
      moodDescription,
      activity,
      toImprove,
      thoughtsAndIdeas,
      moods: selectedMoods,
    });
    if (typeof response === "string") {
      showToast(ToastType.error, response);
    } else if (response && response.status === 201) {
      setIsEditable(false);
      showToast(ToastType.success, "Journal gespeichert");
      setDataUpdated(true);
      if (response.data.earnedBadge) {
        useGamificationStore.getState().onOpenGamificationModal({
          title: response.data.earnedBadge.title,
          description: response.data.earnedBadge.description,
          imageUrl: response.data.earnedBadge.imageUrl,
        });
      }
      setTimeout(() => {
        navigation.navigate("Journals");
      }, 2000);
    } else {
      showToast(ToastType.error, "Journal konnte nicht gespeichert werden");
    }
    stopLoading();
  };

  const handleDeleteMood = (moodId: string) => {
    setSelectedMoods((prevSelectedMoods) =>
      prevSelectedMoods.filter((selectedMood) => selectedMood.id !== moodId)
    );
  };

  const onErrors = (errors: any) => {
    if (errors.title) {
      showToast(ToastType.error, errors.title.message);
    } else if (!selectedMoods.length) {
      showToast(ToastType.error, "Bitte wähle mindestens eine Emotion aus");
    } else if (errors.moodDescription) {
      showToast(ToastType.error, errors.moodDescription.message);
    } else if (errors.activity) {
      showToast(ToastType.error, errors.activity.message);
    } else if (errors.toImprove) {
      showToast(ToastType.error, errors.toImprove.message);
    }
  };

  return (
    <ScrollViewScreenWrapper
      statusBarColor={StatusBarColor.dark}
      backgroundColor={AppColors.white}
      defaultPadding
    >
      <SaveButton
        backButtonStyle={styles.backButtonStyle}
        onPress={handleSubmit(handleNewJournal, onErrors)}
        isEditable={!isEditable}
      />
      <View style={styles.contentContainer}>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <LabelInputField
              placeholder={t("journal.title")}
              style={styles.inputField}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              isEditable={isEditable}
            />
          )}
          name='title'
          rules={{
            required: "Bitte gib deinem Journal einen Titel",
            minLength: {
              value: 5,
              message: "Der Titel muss mindestens 5 Zeichen lang sein.",
            },
          }}
        />
        <View style={styles.chipContainer}>
          {selectedMoods.map((mood, index) => (
            <Chip
              key={index}
              text={
                typeof mood === "string" ? mood : t(`emotions.${mood.type}`)
              }
              style={styles.chip}
              onPress={() => {
                if (typeof mood === "object") {
                  handleDeleteMood(mood.id);
                }
              }}
              isEditable={!isEditable}
            />
          ))}
        </View>
        <IconTextButton
          iconName='add-outline'
          size={30}
          title={t("journal.mood")}
          style={styles.iconTextButton}
          handleModalPress={handleModalPress}
          isEditable={!isEditable}
        />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <LabelInputField
              placeholder={t("journal.mood-description")}
              style={styles.inputField}
              numberOfLines={5}
              multiline={true}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              isEditable={isEditable}
            />
          )}
          name='moodDescription'
          rules={{
            required: "Bitte beschreibe deine Gefühle.",
          }}
        />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <LabelInputField
              placeholder={t("journal.activity")}
              style={styles.inputField}
              numberOfLines={5}
              multiline={true}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              isEditable={isEditable}
            />
          )}
          name='activity'
          rules={{
            required: "Bitte beschreibe, was du anders machen hättest können.",
          }}
        />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <LabelInputField
              placeholder={t("journal.to-improve")}
              style={styles.inputField}
              numberOfLines={5}
              multiline={true}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              isEditable={isEditable}
            />
          )}
          name='toImprove'
          rules={{
            required: "Bitte beschreibe, was du noch verbessern könntest.",
          }}
        />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <LabelInputField
              placeholder={t("journal.thoughts-and-ideas")}
              style={styles.inputField}
              numberOfLines={5}
              multiline={true}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              isEditable={isEditable}
            />
          )}
          name='thoughtsAndIdeas'
        />
        <EmotionModal
          isVisible={isModalVisible}
          setIsVisible={setIsModalVisible}
          onClose={closeModal}
          initialSelectedMoods={selectedMoods}
          onMoodsSelect={(moodIds) => {
            const newSelectedMoods = moodIds.filter(
              (moodId) =>
                !selectedMoods.some(
                  (selectedMood) =>
                    typeof selectedMood === "object" &&
                    selectedMood.id === moodId.id
                )
            );
            setSelectedMoods((prevSelectedMoods) => [
              ...prevSelectedMoods,
              ...newSelectedMoods,
            ]);
          }}
        />
      </View>
    </ScrollViewScreenWrapper>
  );
};

export default NewJournalScreen;

const styles = StyleSheet.create({
  backButtonStyle: {
    backgroundColor: AppColors.blue100,
    color: AppColors.white,
  },
  contentContainer: {
    marginTop: 45,
  },
  inputField: {
    backgroundColor: AppColors.blueMuted20,
    marginVertical: 15,
  },
  iconTextButton: {
    backgroundColor: AppColors.blue100Muted20,
    marginVertical: 15,
  },
  chipContainer: {
    width: "100%",
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "flex-start",
    gap: 15,
  },
  chip: {
    width: "47%",
  },
});
