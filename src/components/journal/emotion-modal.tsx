import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Modal,
  ScrollView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { API_BASE_URL } from "../../utils/config/config";
import AppColors from "../../utils/constants/colors";
import FlatButton from "../common/buttons/flat-button";
import MoodCard from "./mood-card";

interface EmotionModalProps {
  isVisible: boolean;
  onClose: () => void;
  initialSelectedMoods: {
    id: string;
    type: string;
  }[];
  onMoodsSelect: (selectedMood: { id: string; type: string }[]) => void;
}

const EmotionModal: React.FC<EmotionModalProps> = ({
  isVisible,
  onClose,
  initialSelectedMoods,
  onMoodsSelect,
}) => {
  const { t } = useTranslation();
  const [moods, setMoods] = useState<[{ id: string; type: string }]>();
  const [selectedMoods, setSelectedMoods] = useState<string[]>([]);

  useEffect(() => {
    async function getJournalMoods() {
      try {
        const token = await AsyncStorage.getItem("access_token");
        if (token) {
          const response = await axios.get(`${API_BASE_URL}journals/moods`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setMoods(response.data.data);
        }
      } catch (error) {
        console.error("Failed to get user notes", error);
      }
    }

    getJournalMoods();
  }, []);

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

  return moods ? (
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
