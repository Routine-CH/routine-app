import { Calendar } from "@ui-kitten/components";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import AppColors from "../../../utils/constants/colors";

interface ConfirmationModalProps {
  isVisible: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

const CalendarModal: React.FC<ConfirmationModalProps> = ({
  isVisible,
  onConfirm,
  onClose,
}) => {
  const { t } = useTranslation();

  const handleOverlayPress = () => {
    onClose();
  };

  return (
    <Modal visible={isVisible} transparent>
      <TouchableWithoutFeedback onPress={handleOverlayPress}>
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <View style={styles.line} />
            <TouchableWithoutFeedback>
              <Calendar style={styles.calendar} />
            </TouchableWithoutFeedback>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default CalendarModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: `rgba(0, 0, 0, 0.1)`,
  },
  modalContainer: {
    backgroundColor: AppColors.white,
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
    alignItems: "center",
    height: "auto",
  },
  line: {
    width: 42,
    height: 4,
    borderRadius: 4,
    backgroundColor: AppColors.black20,
    marginTop: 15,
  },
  calendar: {
    marginVertical: 30,
  },
});
