import React from "react";
import { useTranslation } from "react-i18next";
import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import AppColors from "../../../utils/constants/colors";
import AppText from "../typography/app-text";

interface ConfirmationModalProps {
  title: string;
  description: string;
  isVisible: boolean;
  onConfirm: () => void;
  onClose: () => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  title,
  description,
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
          <TouchableWithoutFeedback>
            <View style={styles.modalContainer}>
              <View style={styles.line} />
              <View style={styles.textContainer}>
                <AppText
                  fontStyle="bodyMedium"
                  colorStyle="black70"
                  style={{ marginVertical: 30 }}
                >
                  {title}
                </AppText>
                <AppText
                  fontStyle="heading4"
                  colorStyle="black70"
                  style={{ marginBottom: 30 }}
                >
                  {description}
                </AppText>
              </View>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.optionsContainer}
                  onPress={onConfirm}
                >
                  <AppText
                    fontStyle="heading4"
                    colorStyle="red"
                    style={styles.text}
                  >
                    {t("general.delete")}
                  </AppText>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.optionsContainer}
                  onPress={handleOverlayPress}
                >
                  <AppText
                    fontStyle="heading4"
                    colorStyle="black70"
                    style={styles.text}
                  >
                    {t("modals.cancel")}
                  </AppText>
                </TouchableOpacity>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default ConfirmationModal;

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
  },
  line: {
    width: 42,
    height: 4,
    borderRadius: 4,
    backgroundColor: AppColors.black20,
    marginTop: 15,
    marginBottom: 15,
  },
  textContainer: {
    alignItems: "center",
  },
  buttonContainer: {
    alignItems: "center",
    width: "100%",
    marginBottom: 30,
  },
  optionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderTopColor: AppColors.greyMuted,
    borderRightColor: "transparent",
    borderLeftColor: "transparent",
    borderBottomColor: "transparent",
    borderWidth: 1,
    width: "100%",
  },
  text: {
    marginVertical: 20,
  },
});
