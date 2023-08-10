import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Dimensions,
  Modal,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { useMoods } from "../../hooks/journals/use-moods";
import AppColors from "../../utils/constants/colors";
import FlatButton from "../common/buttons/flat-button";
import MoodCard from "./mood-card";

interface EmotionModalProps {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
  onClose: () => void;
  initialSelectedMoods: {
    id: string;
    type: string;
  }[];
  onMoodsSelect: (selectedMood: { id: string; type: string }[]) => void;
}

const windowWidth = Dimensions.get("window").width;

const EmotionModal: React.FC<EmotionModalProps> = ({
  isVisible,
  setIsVisible,
  onClose,
  initialSelectedMoods,
  onMoodsSelect,
}) => {
  const { t } = useTranslation();
  const { moods } = useMoods();
  const [selectedMoods, setSelectedMoods] = useState<string[]>([]);

  useEffect(() => {
    const initialMoodTypes = initialSelectedMoods.map((mood) => mood.type);
    setSelectedMoods(initialMoodTypes);
  }, [initialSelectedMoods]);

  const handleMoodPress = (mood: string) => {
    if (!selectedMoods.includes(mood)) {
      setSelectedMoods([...selectedMoods, mood]);
    }
  };

  const handleSave = () => {
    const selectedMoodIds = selectedMoods.map((selectedMood) => {
      const mood = moods?.find((mood) => mood.type === selectedMood);
      return { id: mood?.id as string, type: selectedMood };
    });

    onMoodsSelect(selectedMoodIds);
    onClose();
  };

  const handleClickedOnLayout = () => {
    setIsVisible(false);
  };

  const stopPropagation = (event: any) => {
    event.stopPropagation();
  };

  return moods ? (
    <Modal visible={isVisible} transparent>
      <TouchableWithoutFeedback onPress={handleClickedOnLayout}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback onPress={stopPropagation}>
            <View style={styles.modalContainer}>
              <View style={styles.line} />
              <ScrollView
                style={{ width: "100%" }}
                showsVerticalScrollIndicator={false}
              >
                <View style={styles.moodContainer}>
                  {moods.map((mood) => (
                    <MoodCard
                      key={mood.id}
                      type={mood.type}
                      title={mood.type}
                      onPress={() => handleMoodPress(mood.type)}
                      isSelected={selectedMoods.includes(mood.type)}
                    />
                  ))}
                </View>
              </ScrollView>
              <FlatButton
                fontStyle='bodyMedium'
                colorStyle='white'
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
  ) : (
    <></>
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
    flexDirection: "row",
    flexWrap: "wrap",
    gap: windowWidth * 0.05,
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
