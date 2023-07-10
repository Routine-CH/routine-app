import React from "react";
import { useTranslation } from "react-i18next";
import {
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import AppColors from "../../utils/constants/colors";
import Chip from "../calendar/chip";
import AppText from "../common/typography/app-text";

interface InformationModalProps {
  audio: any;
  isVisible: boolean;
  onClose: () => void;
}

const InformationModal: React.FC<InformationModalProps> = ({
  audio,
  isVisible,
  onClose,
}) => {
  const { t } = useTranslation();

  console.log(audio);

  return audio ? (
    <Modal visible={isVisible} transparent>
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContainer}>
              <View style={styles.line} />
              <AppText fontStyle="body" colorStyle="black70">
                {audio.informationText}
              </AppText>
              <AppText
                style={{ marginVertical: 30 }}
                fontStyle="bodyMedium"
                colorStyle="black70"
              >
                {t("audio.toolsFor")}
              </AppText>
              <View style={styles.chipContainer}>
                {audio.toolsFor.map((tool: string, index: number) => (
                  <Chip style={styles.chip} text={tool} key={index} />
                ))}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  ) : (
    <></>
  );
};

export default InformationModal;

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
    paddingBottom: 60,
    paddingHorizontal: 30,
  },
  line: {
    width: 42,
    height: 4,
    borderRadius: 4,
    backgroundColor: AppColors.black20,
    marginTop: 15,
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
});
