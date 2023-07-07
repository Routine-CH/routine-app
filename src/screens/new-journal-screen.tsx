import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import Chip from "../components/calendar/chip";
import IconTextButton from "../components/common/buttons/icon-text-button";
import SaveButton from "../components/common/buttons/save-button";
import LabelInputField from "../components/common/input/label-input-field";
import ScrollViewScreenWrapper from "../components/common/scroll-view-screen-wrapper";
import EmotionModal from "../components/journal/emotion-modal";
import { createUserJournalRequest } from "../data/journal/create-request";
import AppColors from "../utils/constants/colors";
import { StatusBarColor } from "../utils/types/enums";
import { IFormJournalInputs } from "../utils/types/types";

const NewJournalScreen = () => {
  const { t } = useTranslation();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedMoods, setSelectedMoods] = useState<
    { id: string; type: string }[]
  >([]);

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
    selectedMoods,
  }: IFormJournalInputs) => {
    createUserJournalRequest(
      title,
      moodDescription,
      activity,
      toImprove,
      thoughtsAndIdeas,
      selectedMoods
    );
  };

  const handleDeleteMood = (moodId: string) => {
    setSelectedMoods((prevSelectedMoods) =>
      prevSelectedMoods.filter((selectedMood) => selectedMood.id !== moodId)
    );
  };

  console.log(selectedMoods);

  return (
    <ScrollViewScreenWrapper
      statusBarColor={StatusBarColor.dark}
      backgroundColor={AppColors.white}
      defaultPadding
    >
      <SaveButton
        backButtonStyle={styles.backButtonStyle}
        onPress={() => handleSubmit(handleNewJournal)()}
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
          name="title"
          rules={{ required: "Dieses Feld muss ausgefüllt werden" }}
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
          iconName="add-outline"
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
          name="moodDescription"
          rules={{ required: "Dieses Feld muss ausgefüllt werden" }}
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
          name="activity"
          rules={{ required: "Dieses Feld muss ausgefüllt werden" }}
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
          name="toImprove"
          rules={{ required: "Dieses Feld muss ausgefüllt werden" }}
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
          name="thoughtsAndIdeas"
          rules={{ required: "Dieses Feld muss ausgefüllt werden" }}
        />
        <EmotionModal
          isVisible={isModalVisible}
          onClose={closeModal}
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
