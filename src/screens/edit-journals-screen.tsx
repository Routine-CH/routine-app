import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import Chip from "../components/calendar/chip";
import IconButton from "../components/common/buttons/icon-button";
import SaveButton from "../components/common/buttons/save-button";
import LabelInputField from "../components/common/input/label-input-field";
import ScrollViewScreenWrapper from "../components/common/scroll-view-screen-wrapper";
import AppText from "../components/common/typography/app-text";
import AppColors from "../utils/constants/colors";
import { StatusBarColor } from "../utils/types/enums";

const EditJournalScreen = () => {
  const { t } = useTranslation();

  return (
    <ScrollViewScreenWrapper
      backgroundColor="white"
      statusBarColor={StatusBarColor.dark}
      defaultPadding
    >
      <SaveButton backButtonStyle={styles.buttonStyle} />
      <View style={styles.contentContainer}>
        <View>
          <AppText
            fontStyle="body"
            colorStyle="black70"
            style={styles.labelStyle}
          >
            {t("journal.title")}
          </AppText>
          <LabelInputField
            editText="Zu wenig Schlaf & Frustration"
            style={styles.inputStyle}
            multiline={true}
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
            <Chip text="Frustriert" style={styles.chip} />
            <Chip text="Ängstlich" style={styles.chip} />
            <Chip text="Gelangweilt" style={styles.chip} />
            <Chip text="Gelangweilt" style={styles.chip} />
            <Chip text="Gelangweilt" style={styles.chip} />
          </View>
          <IconButton iconName="add" style={styles.iconButtonStyle} />
        </View>
        <View>
          <AppText
            fontStyle="body"
            colorStyle="black70"
            style={styles.labelStyle}
          >
            {t("journal.mood-description")}
          </AppText>
          <LabelInputField
            editText="Ich habe zu wenig geschlafen. Ausserdem fühlte ich mich bei der Arbeit gestört."
            style={styles.inputStyle}
            multiline={true}
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
          <LabelInputField
            editText="Ich habe meditiert und meine Frustration beim Sport rausgelassen."
            style={styles.inputStyle}
            multiline={true}
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
          <LabelInputField
            editText="Ich hätte früher ins Bett gehen sollen."
            style={styles.inputStyle}
            multiline={true}
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
          <LabelInputField
            editText="-"
            style={styles.inputStyle}
            multiline={true}
          />
        </View>
      </View>
    </ScrollViewScreenWrapper>
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
    justifyContent: "center",
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
