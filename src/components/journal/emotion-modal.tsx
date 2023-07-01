import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Modal,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import AppColors from "../../utils/constants/colors";
import FlatButton from "../common/buttons/flat-button";
import { Mood, moods } from "./mood";
import MoodCard from "./mood-card";

interface EmotionModalProps {
  isVisible: boolean;
  onClose: () => void;
  onMoodsSelect: (moods: Mood[]) => void;
}

const EmotionModal: React.FC<EmotionModalProps> = ({
  isVisible,
  onClose,
  onMoodsSelect,
}) => {
  const { t } = useTranslation();

  const handleSave = () => {
    onMoodsSelect(selectedMoods);
    onClose();
  };

  const [selectedMoods, setSelectedMoods] = useState<Mood[]>([]);

  const handleMoodPress = (mood: Mood) => {
    const isSelected = selectedMoods.some(
      (selectedMood) => selectedMood.title === mood.title
    );

    if (isSelected) {
      const updatedMoods = selectedMoods.filter(
        (selectedMood) => selectedMood.title !== mood.title
      );
      setSelectedMoods(updatedMoods);
    } else {
      const updatedMoods = [...selectedMoods, mood];
      setSelectedMoods(updatedMoods);
    }

    console.log(mood);
  };

  return (
    <Modal visible={isVisible} transparent>
      <TouchableWithoutFeedback>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContainer}>
              <View style={styles.line} />
              <ScrollView
                style={{ width: "100%" }}
                showsVerticalScrollIndicator={false}
              >
                <View style={styles.moodContainer}>
                  {moods.map((mood) => (
                    <MoodCard
                      key={mood.title}
                      image={mood.image}
                      title={mood.title}
                      onPress={() => handleMoodPress(mood)}
                      isSelected={selectedMoods.some(
                        (selectedMood) => selectedMood.title === mood.title
                      )}
                    />
                  ))}
                </View>
              </ScrollView>
              <FlatButton
                fontStyle="bodyMedium"
                colorStyle="white"
                buttonStyle={styles.saveButton}
                onPress={handleSave}
              >
                {t("general.save")}
              </FlatButton>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default EmotionModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: `rgba(0, 0, 0, 0.1)`,
  },
  modalContainer: {
    backgroundColor: AppColors.white,
    height: 550,
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
    alignItems: "center",
    paddingBottom: 60,
  },
  line: {
    width: 42,
    height: 4,
    borderRadius: 4,
    backgroundColor: AppColors.black20,
    marginTop: 15,
    marginBottom: 30,
  },
  moodContainer: {
    width: "100%",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 40,
    paddingHorizontal: 30,
    justifyContent: "center",
  },
  saveButton: {
    backgroundColor: AppColors.blue100,
    width: 200,
    alignSelf: "center",
    alignItems: "center",
    borderRadius: 13,
    paddingVertical: 12,
    marginTop: 30,
  },
});
