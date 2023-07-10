import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import IconTextButton from "../components/common/buttons/icon-text-button";
import SaveButton from "../components/common/buttons/save-button";
import LabelInputField from "../components/common/input/label-input-field";
import ScrollViewScreenWrapper from "../components/common/scroll-view-screen-wrapper";
import EmotionModal from "../components/journal/emotion-modal";
import AppColors from "../utils/constants/colors";
import { StatusBarColor } from "../utils/types/enums";

const NewJournalScreen = () => {
  const { t } = useTranslation();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleModalPress = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <ScrollViewScreenWrapper
      statusBarColor={StatusBarColor.dark}
      backgroundColor={AppColors.white}
      defaultPadding
    >
      <SaveButton backButtonStyle={styles.backButtonStyle} />
      <View style={styles.contentContainer}>
        <LabelInputField
          placeholder={t("journal.title")}
          style={styles.inputField}
        />
        <IconTextButton
          iconName="add-outline"
          size={30}
          title={t("journal.mood")}
          style={styles.iconTextButton}
          handleModalPress={handleModalPress}
        />
        <LabelInputField
          placeholder={t("journal.mood-description")}
          style={styles.inputField}
          numberOfLines={5}
          multiline={true}
        />
        <LabelInputField
          placeholder={t("journal.activity")}
          style={styles.inputField}
          numberOfLines={5}
          multiline={true}
        />
        <LabelInputField
          placeholder={t("journal.to-improve")}
          style={styles.inputField}
          numberOfLines={5}
          multiline={true}
        />
        <LabelInputField
          placeholder={t("journal.thoughts-and-ideas")}
          style={styles.inputField}
          numberOfLines={5}
          multiline={true}
        />
        <EmotionModal isVisible={isModalVisible} onClose={closeModal} />
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
});
