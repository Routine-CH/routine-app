import AsyncStorage from "@react-native-async-storage/async-storage";
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

type EditJournalProps = {
  route: EditJournalScreenRouteProp;
};

const EditJournalScreen: React.FC<EditJournalProps> = ({ route }) => {
  const { t } = useTranslation();
  const journal = route.params.Journals.params.JournalEdit.journal;

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedMoods, setSelectedMoods] = useState<string[]>([]);
  const [updatedTitle, setUpdatedTitle] = useState(journal?.title || "");
  const [updatedMoodDescription, setUpdatedMoodDescription] = useState(
    journal?.moodDescription || ""
  );
  const [updatedActivity, setUpdatedActivity] = useState(
    journal?.activity || ""
  );
  const [updatedToImprove, setUpdatedToImprove] = useState(
    journal?.toImprove || ""
  );
  //   const [updatedThoughtsAndIdeas, setupdatedThoughtsAndIdeas] = useState(
  //       journal?.thoughtsAndIdeas || ""
  //     );

  const handleModalPress = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  const updateUserJournal = async () => {
    try {
      if (journal !== null) {
        console.log(journal);
        const token = await AsyncStorage.getItem("access_token");
        if (token) {
          console.log("Token existing");

          //     const endpointUrl = `${API_BASE_URL}journals/{journal.id}`;

          const updatedJournalData = {
            title: updatedTitle,
            // mood:
            moodDescription: updatedMoodDescription,
            activity: updatedActivity,
            toImprove: updatedToImprove,
            // thoughtsAndIdeas
          };
          console.log(updatedJournalData);

          //     const response = await axios.put(endpointUrl, updatedJournalData, {
          //       headers: {
          //         Authorization: `Bearer ${token}`,
          //       },
          //     });
          //     console.log("Journal updated successfully", response);
        }
      }
    } catch (error) {
      console.error("Failed to update user journal", error);
    }
  };

  const handleUpdate = () => {
    console.log("Update Content");
    updateUserJournal();
  };

  return journal ? (
    <ScrollViewScreenWrapper
      backgroundColor="white"
      statusBarColor={StatusBarColor.dark}
      defaultPadding
    >
      <SaveButton backButtonStyle={styles.buttonStyle} onPress={handleUpdate} />
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
            editText={updatedTitle}
            onChangeText={setUpdatedTitle}
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
            {selectedMoods.map((mood) => (
              <Chip key={mood} text={mood} style={styles.chip} />
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
          <LabelInputField
            editText={updatedMoodDescription}
            onChangeText={setUpdatedMoodDescription}
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
            editText={updatedActivity}
            onChangeText={setUpdatedActivity}
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
            editText={updatedToImprove}
            onChangeText={setUpdatedToImprove}
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
      <EmotionModal
        isVisible={isModalVisible}
        onClose={closeModal}
        onMoodsSelect={(moods) =>
          setSelectedMoods(moods.map((mood) => mood.title))
        }
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
