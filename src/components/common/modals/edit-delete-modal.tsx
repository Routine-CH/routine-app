import React, { useState } from "react";
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
import ConfirmationModal from "./confirmation-modal";

interface EditDeleteModalProps {
  title?: string | null;
  description?: string | null;
  actionText?: string | null;
  isVisible: boolean;
  onConfirm: () => void;
  navigateTo: () => void;
}

const EditDeleteModal: React.FC<EditDeleteModalProps> = ({
  title,
  description,
  actionText,
  isVisible,
  onConfirm,
  navigateTo,
}) => {
  const { t } = useTranslation();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleModalPress = () => {
    setIsModalVisible(true);
  };

  const closeModal = () => {
    setIsModalVisible(false);
  };

  return (
    <Modal visible={isVisible} transparent>
      <TouchableWithoutFeedback>
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
                <TouchableOpacity
                  style={styles.optionsContainer}
                  onPress={handleModalPress}
                >
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
      <ConfirmationModal
        title={title}
        description={description}
        actionText={actionText}
        isVisible={isModalVisible}
        onConfirm={onConfirm}
        onClose={closeModal}
      />
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
  },
  buttonContainer: {
    width: "100%",
    paddingLeft: 30,
    marginVertical: 20,
  },
  optionsContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginVertical: 15,
  },
});
