import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import Chip from "../components/calendar/chip";
import IconTextButton from "../components/common/buttons/icon-text-button";
import SaveButton from "../components/common/buttons/save-button";
import LabelInputField from "../components/common/input/label-input-field";
import ScrollViewScreenWrapper from "../components/common/scroll-view-screen-wrapper";
import RoutineToast from "../components/common/toast/routine-toast";
import { showToast } from "../components/common/toast/show-toast";
import EmotionModal from "../components/journal/emotion-modal";
import { createUserJournalRequest } from "../data/journal/create-request";
import AppColors from "../utils/constants/colors";
import { StatusBarColor, ToastType } from "../utils/types/enums";
import {
  AuthenticatedStackParamList,
  IFormJournalInputs,
} from "../utils/types/types";

const NewJournalScreen = () => {
  const { t } = useTranslation();
  const navigation =
    useNavigation<BottomTabNavigationProp<AuthenticatedStackParamList>>();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedMoods, setSelectedMoods] = useState<
    { id: string; type: string }[]
  >([]);
  const [errorMessage, setErrorMessage] = useState("");

  const { control, handleSubmit } = useForm<IFormJournalInputs>();

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
    moods,
  }: IFormJournalInputs) => {
    const response = await createUserJournalRequest({
      title,
      moodDescription,
      activity,
      toImprove,
      thoughtsAndIdeas,
      moods: selectedMoods,
    });
    if (typeof response === "string") {
      setErrorMessage(response);
      showToast(ToastType.error, response);
      setErrorMessage("");
    } else if (response && response.status === 201) {
      showToast(ToastType.success, "Journal gespeichert");
      setTimeout(() => {
        navigation.navigate("Journals");
      }, 2000);
    } else {
      setErrorMessage("Something is wrong");
      showToast(ToastType.error, errorMessage);
      setErrorMessage("");
    }
  };

  const onErrors = (errors: any) => {
    if (errors.title) {
      setErrorMessage(errors.title.message);
    } else if (errors.moodDescription) {
      setErrorMessage(errors.moodDescription.message);
    } else if (errors.activity) {
      setErrorMessage(errors.activity.message);
    } else if (errors.toImprove) {
      setErrorMessage(errors.toImprove.message);
    } else if (errors.moods?.length > 0) {
      setErrorMessage("Bitte wähle mindestens eine Emotion aus");
    }
  };

  useEffect(() => {
    if (errorMessage) {
      showToast(ToastType.error, errorMessage);
      setErrorMessage("");
    }
  }, [errorMessage]);

  const handleDeleteMood = (moodId: string) => {
    setSelectedMoods((prevSelectedMoods) =>
      prevSelectedMoods.filter((selectedMood) => selectedMood.id !== moodId)
    );
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
              text={typeof mood === "string" ? mood : mood.type}
              style={styles.chip}
              onDelete={() => {
                if (typeof mood === "object") {
                  handleDeleteMood(mood.id);
                }
              }}
            />
          ))}
        </View>

        <IconTextButton
          iconName='add-outline'
          size={30}
          title={t("journal.mood")}
          style={styles.iconTextButton}
          handleModalPress={handleModalPress}
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
            />
          )}
          name='thoughtsAndIdeas'
        />
        <EmotionModal
          isVisible={isModalVisible}
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
      <RoutineToast />
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
