import { format } from "date-fns";
import { de } from "date-fns/locale";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import AppColors from "../../utils/constants/colors";
import { UserTodo } from "../../utils/types/types";
import AppText from "../common/typography/app-text";

interface TodoModal {
  todo: UserTodo | null;
  isVisible: boolean;
  onClose: () => void;
}

const TodoModal: React.FC<TodoModal> = ({ todo, isVisible, onClose }) => {
  const { t } = useTranslation();

  const handleOverlayPress = () => {
    onClose();
  };

  const plannedDate = todo?.plannedDate ? new Date(todo.plannedDate) : null;
  const formattedDate = plannedDate
    ? format(plannedDate, "dd. MMMM yyyy", { locale: de })
    : "";

  return todo ? (
    <Modal visible={isVisible} transparent>
      <TouchableWithoutFeedback onPress={handleOverlayPress}>
        <View style={styles.overlay}>
          <View style={styles.modalContainer}>
            <TouchableWithoutFeedback>
              <View>
                <View style={styles.textContainer}>
                  <AppText
                    fontStyle="bodyMedium"
                    colorStyle="black70"
                    style={styles.title}
                  >
                    {t("journal.title")}
                  </AppText>
                  <AppText fontStyle="body" colorStyle="black70">
                    {todo.title}
                  </AppText>
                </View>
                <View style={styles.textContainer}>
                  <AppText
                    fontStyle="bodyMedium"
                    colorStyle="black70"
                    style={styles.title}
                  >
                    {t("tool-cards.notes")}
                  </AppText>
                  <AppText fontStyle="body" colorStyle="black70">
                    {todo.description}
                  </AppText>
                </View>
                <View>
                  <AppText
                    fontStyle="bodyMedium"
                    colorStyle="black70"
                    style={styles.title}
                  >
                    {t("notes.date")}
                  </AppText>
                  <AppText fontStyle="body" colorStyle="black70">
                    {formattedDate}
                  </AppText>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  ) : (
    <></>
  );
};

export default TodoModal;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: `rgba(0, 0, 0, 0.1)`,
    paddingHorizontal: 30,
  },
  modalContainer: {
    backgroundColor: AppColors.white,
    borderRadius: 13,
    paddingHorizontal: 20,
    paddingVertical: 30,
    width: "100%",
  },
  textContainer: {
    marginBottom: 30,
  },
  title: {
    marginBottom: 15,
  },
});
