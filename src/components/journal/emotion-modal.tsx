import React from "react";
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
import MoodContainer from "./mood-container";

interface TimeModalProps {
  isVisible: boolean;
  onClose: () => void;
}

const EmotionModal: React.FC<TimeModalProps> = ({ isVisible, onClose }) => {
  const { t } = useTranslation();

  const handleOverlayPress = () => {
    onClose();
  };

  const handleSave = () => {
    onClose();
  };

  return (
    <Modal visible={isVisible} animationType="slide" transparent>
      <TouchableWithoutFeedback onPress={handleOverlayPress}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContainer}>
              <View style={styles.line} />
              <ScrollView
                style={{ width: "100%" }}
                showsVerticalScrollIndicator={false}
              >
                <MoodContainer />
                <FlatButton
                  fontStyle="bodyMedium"
                  colorStyle="white"
                  buttonStyle={styles.saveButton}
                  onPress={handleSave}
                >
                  {t("general.save")}
                </FlatButton>
              </ScrollView>
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
  },
  modalContainer: {
    backgroundColor: AppColors.white,
    height: 550,
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
    alignItems: "center",
  },
  line: {
    width: 42,
    height: 4,
    borderRadius: 4,
    backgroundColor: AppColors.black20,
    marginTop: 15,
    marginBottom: 60,
  },
  saveButton: {
    backgroundColor: AppColors.blue100,
    width: 200,
    alignSelf: "center",
    alignItems: "center",
    borderRadius: 13,
    marginVertical: 60,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
