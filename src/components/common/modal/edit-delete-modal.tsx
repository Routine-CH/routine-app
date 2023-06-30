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
import IconButton from "../buttons/icon-button";
import AppText from "../typography/app-text";

interface TimeModalProps {
  isVisible: boolean;
  onClose: () => void;
  navigateTo: () => void;
}

const EditDeleteModal: React.FC<TimeModalProps> = ({
  isVisible,
  onClose,
  navigateTo,
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
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  onPress={navigateTo}
                  style={styles.optionsContainer}
                >
                  <IconButton iconName="pencil" />
                  <AppText
                    fontStyle="heading4"
                    colorStyle="black70"
                    style={{ marginLeft: 55 }}
                  >
                    {t("general.edit")}
                  </AppText>
                </TouchableOpacity>
                <TouchableOpacity style={styles.optionsContainer}>
                  <IconButton iconName="trash" />
                  <AppText
                    fontStyle="heading4"
                    colorStyle="black70"
                    style={{ marginLeft: 55 }}
                  >
                    {t("general.delete")}
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

export default EditDeleteModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: `rgba(0, 0, 0, 0.1)`,
  },
  modalContainer: {
    backgroundColor: AppColors.white,
    height: 230,
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
  buttonContainer: {
    width: "100%",
    paddingLeft: 30,
  },
  optionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
  },
});
