import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { RouteProp, useNavigation } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import Chip from "../components/calendar/chip";
import IconButton from "../components/common/buttons/icon-button";
import SaveButton from "../components/common/buttons/save-button";
import LabelInputField from "../components/common/input/label-input-field";
import ScrollViewScreenWrapper from "../components/common/scroll-view-screen-wrapper";
import RoutineToast from "../components/common/toast/routine-toast";
import { showToast } from "../components/common/toast/show-toast";
import AppText from "../components/common/typography/app-text";
import EmotionModal from "../components/journal/emotion-modal";
import { updateUserJournalRequest } from "../data/journal/update-request";
import AppColors from "../utils/constants/colors";
import { StatusBarColor, ToastType } from "../utils/types/enums";
import {
  AuthenticatedStackParamList,
  IFormJournalInputs,
  UserJournals,
} from "../utils/types/types";

type EditJournalScreenRouteProp = RouteProp<
  AuthenticatedStackParamList,
  "Home"
> & {
  params: {
    Journals: {
      params: { JournalEdit: { journal: UserJournals | null } };
    };
  };
};

type EditJournalProps = {
  route: EditJournalScreenRouteProp;
};

const EditJournalScreen: React.FC<EditJournalProps> = ({ route }) => {
  const { t } = useTranslation();
  const navigation =
    useNavigation<BottomTabNavigationProp<AuthenticatedStackParamList>>();
  const journal = route.params.Journals.params.JournalEdit.journal;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedMoods, setSelectedMoods] = useState<
    { id: string; type: string }[]
  >(
    journal?.journalMoods.map((journalMood) => ({
      id: journalMood.mood.id,
      type: journalMood.mood.type,
    })) || []
  );

  const [errorMessage, setErrorMessage] = useState("");

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<IFormJournalInputs>({
    defaultValues: {
      title: journal?.title || "",
      moodDescription: journal?.moodDescription || "",
      activity: journal?.activity || "",
      toImprove: journal?.toImprove || "",
      thoughtsAndIdeas: journal?.thoughtsAndIdeas || "",
    },
  });

  useEffect(() => {
    setValue("title", journal?.title || "");
    setValue("moodDescription", journal?.moodDescription || "");
    setValue("activity", journal?.activity || "");
    setValue("toImprove", journal?.toImprove || "");
    setValue("thoughtsAndIdeas", journal?.thoughtsAndIdeas || "");
  }, [journal, setValue]);

  const handleModalPress = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const journalId = journal?.id;

  const handleUpdate = async ({
    journalId,
    title,
    moodDescription,
    activity,
    toImprove,
    thoughtsAndIdeas,
    moods,
  }: IFormJournalInputs) => {
    try {
      const response = await updateUserJournalRequest({
        journalId,
        title,
        moodDescription,
        activity,
        toImprove,
        thoughtsAndIdeas,
        moods: selectedMoods,
      });

      if (typeof response === "string") {
        showToast(ToastType.error, response);
        setErrorMessage("Something went wrong");
      } else if (response && "status" in response && response.status === 200) {
        showToast(ToastType.success, "Journal gespeichert");
        setTimeout(() => {
          navigation.navigate("Home", {
            screen: "Journals",
          });
        }, 2000);
      } else {
        showToast(ToastType.error, "Bitte wähle mindestens eine Gefühl aus.");
      }
    } catch (error) {
      showToast(ToastType.error, errorMessage);
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

  return journal ? (
    <ScrollViewScreenWrapper
      backgroundColor="white"
      statusBarColor={StatusBarColor.dark}
      defaultPadding
    >
      <SaveButton
        backButtonStyle={styles.buttonStyle}
        onPress={handleSubmit(
          (data) => handleUpdate({ ...data, journalId }),
          onErrors
        )}
      />
      <View style={styles.contentContainer}>
        <View>
          <AppText
            fontStyle="body"
            colorStyle="black70"
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
              />
            )}
            name="title"
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
            fontStyle="body"
            colorStyle="black70"
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
                onDelete={() => handleDeleteMood(selectedMood.id)}
              />
            ))}
          </View>

          <IconButton
            iconName="add"
            style={styles.iconButtonStyle}
            navigateTo={handleModalPress}
          />
        </View>
        <View>
          <AppText
            fontStyle="body"
            colorStyle="black70"
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
              />
            )}
            name="moodDescription"
            rules={{ required: "Bitte beschreibe deine Gefühle." }}
          />
        </View>
        <View>
          <AppText
            fontStyle="body"
            colorStyle="black70"
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
              />
            )}
            name="activity"
            rules={{
              required:
                "Bitte beschreibe, was du anders machen hättest können.",
            }}
          />
        </View>
        <View>
          <AppText
            fontStyle="body"
            colorStyle="black70"
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
              />
            )}
            name="toImprove"
            rules={{
              required: "Bitte beschreibe, was du noch verbessern könntest.",
            }}
          />
        </View>
        <View>
          <AppText
            fontStyle="body"
            colorStyle="black70"
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
              />
            )}
            name="thoughtsAndIdeas"
          />
        </View>
      </View>
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
      <RoutineToast />
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
    marginVertical: 60,
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
