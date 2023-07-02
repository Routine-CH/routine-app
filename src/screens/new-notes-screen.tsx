import { useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import IconButton from "../components/common/buttons/icon-button";
import SaveButton from "../components/common/buttons/save-button";
import LabelInputField from "../components/common/input/label-input-field";
import ScrollViewScreenWrapper from "../components/common/scroll-view-screen-wrapper";
import { createNoteRequest } from "../data/notes/create-request";
import AppColors from "../utils/constants/colors";
import AppFontStyle from "../utils/constants/font-style";
import { StatusBarColor } from "../utils/types/enums";

const NewNotesScreen = () => {
  const { t } = useTranslation();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleNewNote = () => {
    console.log("Creating a new Note");
    createNoteRequest(title, description);
  };

  return (
    <ScrollViewScreenWrapper
      statusBarColor={StatusBarColor.dark}
      backgroundColor={AppColors.white}
      defaultPadding
    >
      <SaveButton
        backButtonStyle={styles.backButtonStyle}
        onPress={handleNewNote}
      />
      <View style={styles.contentContainer}>
        <LabelInputField
          placeholder={t("journal.title")}
          inputStyle={styles.labelInput}
          multiline
          value={title}
          onChangeText={setTitle}
        />
        <LabelInputField
          placeholder={t("notes.note")}
          multiline
          value={description}
          onChangeText={setDescription}
        />
      </View>
      <View style={styles.iconContainer}>
        <IconButton
          iconName="camera"
          style={[styles.iconStyle, { marginRight: 15 }]}
        />
        <IconButton iconName="images" style={styles.iconStyle} />
      </View>
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
  iconContainer: {
    flexDirection: "row",
  },
  iconStyle: {
    height: 58,
    width: 58,
  },
});