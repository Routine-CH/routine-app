import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Dimensions,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import AppColors from "../../utils/constants/colors";
import FlatButton from "../common/buttons/flat-button";

import TimerInputField from "../common/input/timer-input-field";
import AppText from "../common/typography/app-text";

interface TimeModalProps {
  isVisible: boolean;
  onClose: () => void;
  onSave: (newTime: number) => void;
  onChangeTime?: (newTime: number) => void;
}

const windowHeight = Dimensions.get("window").height;

const TimeModal: React.FC<TimeModalProps> = ({
  isVisible,
  onClose,
  onSave,
  onChangeTime,
}) => {
  const [newTime, setNewTime] = useState("25");
  const { t } = useTranslation();

  const handleSave = () => {
    onSave(Number(newTime));
  };

  const handlePomodoroChange = (text: string) => {
    setNewTime(text);
    if (onChangeTime) {
      onChangeTime(Number(text));
    }
  };

  const handleOverlayPress = () => {
    onClose();
  };

  return (
    <Modal visible={isVisible} animationType='slide' transparent>
      <TouchableWithoutFeedback onPress={handleOverlayPress}>
        <View style={styles.overlay}>
          <TouchableWithoutFeedback>
            <View style={styles.modalContainer}>
              <View style={styles.outerContainer}>
                <View style={styles.line} />
                <View style={styles.innerContainer}>
                  <AppText fontStyle='heading4' colorStyle='black70'>
                    {t("timer.change-time")}
                  </AppText>
                  <View style={styles.textContainer}>
                    <TimerInputField
                      type={newTime}
                      onChangeText={handlePomodoroChange}
                      placeholder='Minuten eingeben'
                    />
                  </View>
                </View>
                <FlatButton
                  fontStyle='bodyMedium'
                  colorStyle='white'
                  buttonStyle={styles.saveButton}
                  onPress={handleSave}
                >
                  {t("general.save")}
                </FlatButton>
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

export default TimeModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  modalContainer: {
    backgroundColor: AppColors.white,
    paddingHorizontal: 30,
    height: windowHeight * 0.5,
    borderTopLeftRadius: 13,
    borderTopRightRadius: 13,
    alignItems: "center",
  },
  outerContainer: {
    width: "100%",
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
  innerContainer: {
    width: "100%",
  },
  textContainer: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  saveButton: {
    backgroundColor: AppColors.blue100,
    width: 200,
    alignSelf: "center",
    alignItems: "center",
    borderRadius: 13,
    marginTop: 60,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});
