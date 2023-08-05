import { Controller, useForm } from "react-hook-form";
import {
  Dimensions,
  Modal,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { Calendar } from "react-native-calendars";
import AppColors from "../../utils/constants/colors";
import LabelInputField from "../common/input/label-input-field";
import AppText from "../common/typography/app-text";

type CreateAndLinkTodoModalProps = {
  isEditable: boolean;
  isModalVisible: boolean;
};

const windowWidth = Dimensions.get("window").width;

const CreateAndLinkTodoModal: React.FC<CreateAndLinkTodoModalProps> = ({
  isEditable,
  isModalVisible,
}) => {
  const { control, handleSubmit } = useForm();

  return (
    <Modal visible={isModalVisible}>
      <View style={styles.overlay}>
        <TouchableWithoutFeedback>
          <View style={styles.modalContainer}>
            <View style={styles.line} />
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <LabelInputField
                  placeholder='Titel'
                  style={styles.inputField}
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                  isEditable={isEditable}
                />
              )}
              name='todo-title'
              rules={{
                required: "Bitte gib dem Ziel einen Titel",
                minLength: {
                  value: 5,
                  message: "Der Titel muss mindestens 5 Zeichen lang sein",
                },
              }}
            />
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <LabelInputField
                  placeholder='Notizen'
                  style={styles.inputField}
                  onBlur={onBlur}
                  onChangeText={(value) => onChange(value)}
                  value={value}
                  isEditable={isEditable}
                />
              )}
              name='todo-notes'
              rules={{
                required: "Bitte gib dem Ziel einen Titel",
                minLength: {
                  value: 5,
                  message: "Der Titel muss mindestens 5 Zeichen lang sein",
                },
              }}
            />
            <Calendar
              style={styles.calendar}
              firstDay={1}
              monthFormat='MMMM yyyy'
              enableSwipeMonths={true}
              allowSelectionOutOfRange={false}
              theme={{
                textSectionTitleColor: AppColors.black70,
                textSectionTitleDisabledColor: AppColors.black70,
                selectedDayBackgroundColor: AppColors.blue100Muted20,
                selectedDayTextColor: AppColors.black70,
                todayTextColor: AppColors.black70,
                dayTextColor: AppColors.black70,
                textDisabledColor: AppColors.grey,
                dotColor: AppColors.blue100Muted20,
                selectedDotColor: AppColors.blue100Muted20,
                arrowColor: AppColors.blue100,
                disabledArrowColor: AppColors.blue300,
              }}
            />
            <TouchableWithoutFeedback>
              <View style={styles.addButton}>
                <AppText
                  colorStyle='white'
                  fontStyle='body'
                  style={{ textTransform: "uppercase" }}
                >
                  Hinzufügen
                </AppText>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </Modal>
  );
};

export default CreateAndLinkTodoModal;

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
    paddingBottom: 30,
    paddingHorizontal: windowWidth * 0.05,
  },
  line: {
    width: 42,
    height: 4,
    borderRadius: 4,
    backgroundColor: AppColors.black20,
    marginTop: 15,
    marginBottom: 20,
  },
  inputField: {
    backgroundColor: AppColors.blueMuted20,
    marginVertical: 15,
  },
  calendar: {
    marginVertical: 30,
    width: windowWidth * 0.9,
    height: 320,
  },
  addButton: {
    backgroundColor: AppColors.blue100,
    borderRadius: 13,
    paddingVertical: 15,
    paddingHorizontal: 25,
    marginBottom: 15,
  },
});
