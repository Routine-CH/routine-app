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
  >([]);
  const [errorMessage, setErrorMessage] = useState("");

  const { control, handleSubmit, setValue, watch } =
    useForm<IFormJournalInputs>({
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
    journal,
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
        journal,
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
        console.log("not everything is filled out 1");
      } else if (response && response.status === 200) {
        navigation.navigate("Home", {
          screen: "Journals",
        });
        showToast(ToastType.success, "Success");
      } else {
        showToast(ToastType.error, "Failed to update journal");
        setErrorMessage("Something went wrong");
        console.log("not everything is filled out 2");
      }
    } catch (error) {
      showToast(ToastType.error, "An error occurred");
      console.log(error);
    }
  };

  const handleDeleteMood = (moodId: string) => {
    setSelectedMoods((prevSelectedMoods) => [
      ...prevSelectedMoods.map((moodId) => ({
        id: moodId.id,
        type: moodId.type,
      })),
    ]);
  };

  //   const mergedMoods = [
  //     ...selectedMoods,
  //     ...(journal?.journalMoods || []).filter(
  //       (journalMood) =>
  //         !selectedMoods.some(
  //           (selectedMood) => selectedMood.type === journalMood.type
  //         )
  //     ),
  //   ];

  return journal ? (
    <ScrollViewScreenWrapper
      backgroundColor="white"
      statusBarColor={StatusBarColor.dark}
      defaultPadding
    >
      <SaveButton
        backButtonStyle={styles.buttonStyle}
        onPress={() =>
          handleSubmit((data) => handleUpdate({ ...data, journalId }))()
        }
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
            rules={{ required: "Dieses Feld muss ausgefüllt werden" }}
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
            {Array.isArray(journal.journalMoods) &&
              journal.journalMoods.map((journalMood) => {
                console.log(journalMood.mood.type);

                const isSelected = selectedMoods.some(
                  (selectedMood) => selectedMood.id === journalMood.id
                );

                if (!isSelected) {
                  return (
                    <Chip
                      key={`${journalMood.mood.type}-${journalMood.id}`}
                      text={journalMood.mood.type}
                      style={styles.chip}
                      onDelete={() => handleDeleteMood(journalMood.id)}
                    />
                  );
                }

                return null;
              })}

            {selectedMoods.map((selectedMood) => (
              <Chip
                key={selectedMood.id}
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
            rules={{ required: "Dieses Feld muss ausgefüllt werden" }}
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
            rules={{ required: "Dieses Feld muss ausgefüllt werden" }}
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
            rules={{ required: "Dieses Feld muss ausgefüllt werden" }}
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
