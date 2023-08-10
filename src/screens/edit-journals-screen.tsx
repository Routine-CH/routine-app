import {
  NavigationProp,
  RouteProp,
  useNavigation,
} from "@react-navigation/native";
import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";

import IconButton from "../components/common/buttons/icon-button";
import SaveButton from "../components/common/buttons/save-button";
import Chip from "../components/common/calendar/chip";
import LabelInputField from "../components/common/input/label-input-field";
import ScrollViewScreenWrapper from "../components/common/scroll-view-screen-wrapper";
import AppText from "../components/common/typography/app-text";
import EmotionModal from "../components/journal/emotion-modal";
import { useJournalData } from "../hooks/journals/use-journal-data";
import { useFormHandling } from "../hooks/journals/use-journal-form-handling";
import { useJournalStore } from "../store/journal-store";
import AppColors from "../utils/constants/colors";
import { StatusBarColor } from "../utils/types/enums";
import { AuthenticatedStackParamList } from "../utils/types/routes/types";

type EditJournalScreenRouteProp = RouteProp<
  AuthenticatedStackParamList,
  "JournalEdit"
>;

type EditJournalProps = {
  route: EditJournalScreenRouteProp;
};

const EditJournalScreen: React.FC<EditJournalProps> = ({ route }) => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigation =
    useNavigation<NavigationProp<AuthenticatedStackParamList>>();
  const { t } = useTranslation();
  const journalId = route.params.id;
  const editable = route.params.editable;
  const { journal } = useJournalData(journalId);
  const { setDataUpdated } = useJournalStore();

  const {
    control,
    handleSubmit,
    selectedMoods,
    handleUpdate,
    onErrors,
    handleDeleteMood,
    setSelectedMoods,
    isEditable,
  } = useFormHandling(journal, navigation, journalId, setDataUpdated);

  const handleModalPress = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return journal ? (
    <ScrollViewScreenWrapper
      backgroundColor='white'
      statusBarColor={StatusBarColor.dark}
      defaultPadding
    >
      <SaveButton
        backButtonStyle={styles.buttonStyle}
        onPress={handleSubmit(
          (data) => handleUpdate({ ...data, journalId }),
          onErrors
        )}
        editable={editable}
        isEditable={!isEditable}
      />
      <View style={styles.contentContainer}>
        <View>
          <AppText
            fontStyle='body'
            colorStyle='black70'
            style={styles.labelStyle}
          >
            {t("journal.title")}
          </AppText>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <LabelInputField
                style={styles.inputStyle}
                multiline={true}
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
        </View>
        <View>
          <AppText
            fontStyle='body'
            colorStyle='black70'
            style={styles.labelStyle}
          >
            {t("journal.mood")}
          </AppText>
          <View style={styles.chipContainer}>
            {selectedMoods.map((selectedMood, index) => (
              <Chip
                key={`${selectedMood.id}-${index}`}
                text={selectedMood.type}
                style={styles.chip}
                onPress={() => handleDeleteMood(selectedMood.id)}
                isEditable={!isEditable}
              />
            ))}
          </View>
          <IconButton
            iconName='add'
            style={styles.iconButtonStyle}
            onPress={handleModalPress}
            isEditable={!isEditable}
          />
        </View>
        <View>
          <AppText
            fontStyle='body'
            colorStyle='black70'
            style={styles.labelStyle}
          >
            {t("journal.mood-description")}
          </AppText>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <LabelInputField
                style={styles.inputStyle}
                multiline={true}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
                isEditable={isEditable}
              />
            )}
            name='moodDescription'
            rules={{ required: "Bitte beschreibe deine Gefühle." }}
          />
        </View>
        <View>
          <AppText
            fontStyle='body'
            colorStyle='black70'
            style={styles.labelStyle}
          >
            {t("journal.activity")}
          </AppText>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <LabelInputField
                style={styles.inputStyle}
                multiline={true}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
                isEditable={isEditable}
              />
            )}
            name='activity'
            rules={{
              required:
                "Bitte beschreibe, was du anders machen hättest können.",
            }}
          />
        </View>
        <View>
          <AppText
            fontStyle='body'
            colorStyle='black70'
            style={styles.labelStyle}
          >
            {t("journal.to-improve")}
          </AppText>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <LabelInputField
                style={styles.inputStyle}
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
        </View>
        <View>
          <AppText
            fontStyle='body'
            colorStyle='black70'
            style={styles.labelStyle}
          >
            {t("journal.thoughts-and-ideas")}
          </AppText>
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <LabelInputField
                style={styles.inputStyle}
                multiline={true}
                onBlur={onBlur}
                onChangeText={(value) => onChange(value)}
                value={value}
                isEditable={isEditable}
              />
            )}
            name='thoughtsAndIdeas'
          />
        </View>
      </View>
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
    </ScrollViewScreenWrapper>
  ) : (
    <></>
  );
};

export default EditJournalScreen;

const styles = StyleSheet.create({
  buttonStyle: {
    backgroundColor: AppColors.blue100,
    color: AppColors.white,
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
  },
  chip: {
    width: "47%",
  },
  iconButtonStyle: {
    width: "100%",
    backgroundColor: AppColors.blue100Muted20,
    marginTop: 15,
    marginBottom: 30,
  },
});
