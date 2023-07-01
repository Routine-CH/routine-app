import { RouteProp } from "@react-navigation/native";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import Chip from "../components/calendar/chip";
import IconButton from "../components/common/buttons/icon-button";
import SaveButton from "../components/common/buttons/save-button";
import LabelInputField from "../components/common/input/label-input-field";
import ScrollViewScreenWrapper from "../components/common/scroll-view-screen-wrapper";
import AppText from "../components/common/typography/app-text";
import EmotionModal from "../components/journal/emotion-modal";
import AppColors from "../utils/constants/colors";
import { StatusBarColor } from "../utils/types/enums";
import {
  AuthenticatedStackParamList,
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

type EditJournalScreenProps = {
  route: EditJournalScreenRouteProp;
};

const EditJournalScreen: React.FC<EditJournalScreenProps> = ({ route }) => {
  const { t } = useTranslation();

  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleModalPress = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const journal = route.params.Journals.params.JournalEdit.journal;

  return journal ? (
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
            editText={journal.title}
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
          <LabelInputField
            editText={journal.moodDescription}
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
            editText={journal.activity}
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
            editText={journal.toImprove}
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
      <EmotionModal isVisible={isModalVisible} onClose={closeModal} />
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
