import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import IconButton from "../components/common/buttons/icon-button";
import SaveButton from "../components/common/buttons/save-button";
import LabelInputField from "../components/common/input/label-input-field";
import ScrollViewScreenWrapper from "../components/common/scroll-view-screen-wrapper";
import RoutineToast from "../components/common/toast/routine-toast";
import { showToast } from "../components/common/toast/show-toast";
import { createNoteRequest } from "../data/notes/create-request";
import AppColors from "../utils/constants/colors";
import AppFontStyle from "../utils/constants/font-style";
import { StatusBarColor, ToastType } from "../utils/types/enums";
import { IFormNoteInputs } from "../utils/types/types";

const NewNotesScreen = () => {
  const { t } = useTranslation();
  const { control, handleSubmit } = useForm<IFormNoteInputs>();
  const [errorMessage, setErrorMessage] = useState("");

  const handleNewNote = async ({
    title,
    description,
    images = [],
  }: IFormNoteInputs) => {
    console.log("Pressed");
    const response = await createNoteRequest({
      title,
      description,
      images: images.map((image) => ({
        id: image.id,
        imageUrl: image.imageUrl,
      })),
    });
    console.log("Response:", response);
    if (typeof response === "string") {
      setErrorMessage(response);
      showToast(ToastType.error, response);
      setErrorMessage("");
    } else if (response && response.status === 201) {
      showToast(ToastType.success, "Success");
    } else {
      setErrorMessage("Something is wrong");
      showToast(ToastType.error, errorMessage);
      setErrorMessage("");
    }
  };

  const onErrors = (errors: any) => {
    if (errors.title) {
      setErrorMessage(errors.title.message);
    } else if (errors.description) {
      setErrorMessage(errors.description.message);
    }
  };

  useEffect(() => {
    if (errorMessage) {
      showToast(ToastType.error, errorMessage);
      setErrorMessage("");
    }
  }, [errorMessage]);

  return (
    <ScrollViewScreenWrapper
      statusBarColor={StatusBarColor.dark}
      backgroundColor={AppColors.white}
      defaultPadding
    >
      <SaveButton
        backButtonStyle={styles.backButtonStyle}
        onPress={handleSubmit(handleNewNote, onErrors)}
      />
      <View style={styles.contentContainer}>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <LabelInputField
              placeholder={t("journal.title")}
              inputStyle={styles.labelInput}
              multiline
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          )}
          name="title"
          rules={{
            required: "Bitte gib deiner Notiz einen Titel",
            minLength: {
              value: 5,
              message: "Der Titel muss mindestens 5 Zeichen lang sein",
            },
          }}
        />
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <LabelInputField
              placeholder={t("notes.note")}
              inputStyle={styles.labelDescriptionInput}
              multiline
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          )}
          name="description"
          rules={{
            required: "Bitte gib deiner Notiz eine Beschreibung",
            minLength: {
              value: 5,
              message: "Die Beschreibung muss mindestens 5 Zeichen lang sein",
            },
          }}
        />
      </View>
      <View style={styles.iconContainer}>
        <IconButton
          iconName="camera"
          style={[styles.iconStyle, { marginRight: 15 }]}
        />
        <IconButton iconName="images" style={styles.iconStyle} />
      </View>
      <RoutineToast />
    </ScrollViewScreenWrapper>
  );
};

export default NewNotesScreen;
const styles = StyleSheet.create({
  backButtonStyle: {
    backgroundColor: AppColors.blue100,
    color: AppColors.white,
  },
  contentContainer: {
    minHeight: 330,
    marginVertical: 30,
    backgroundColor: AppColors.blueMuted20,
    borderRadius: 10,
    padding: 5,
  },
  labelInput: {
    fontFamily: AppFontStyle.heading3.fontFamily,
    fontSize: AppFontStyle.heading3.fontSize,
  },
  labelDescriptionInput: {
    fontFamily: AppFontStyle.body.fontFamily,
    fontSize: AppFontStyle.body.fontSize,
  },
  iconContainer: {
    flexDirection: "row",
  },
  iconStyle: {
    height: 58,
    width: 58,
  },
});
