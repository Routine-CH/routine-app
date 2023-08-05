import { NavigationProp, useNavigation } from "@react-navigation/native";
import { format, isToday } from "date-fns";
import { de } from "date-fns/locale";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import SaveButton from "../components/common/buttons/save-button";
import { FullscreenLoadingIndicator } from "../components/common/fullscreen-loading-indicator";
import LabelInputField from "../components/common/input/label-input-field";
import SimpleCalendarModal from "../components/common/modals/simple-calendar-modal";
import ScrollViewScreenWrapper from "../components/common/scroll-view-screen-wrapper";
import RoutineToast from "../components/common/toast/routine-toast";
import { showToast } from "../components/common/toast/show-toast";
import AppText from "../components/common/typography/app-text";
import { createTodoRequest } from "../data/todo/create-request";
import { useTodoStore } from "../store/todos-store";
import AppColors from "../utils/constants/colors";
import { Day } from "../utils/types/calendar/types";
import { StatusBarColor, ToastType } from "../utils/types/enums";
import { AuthenticatedStackParamList } from "../utils/types/routes/types";
import { IFormTodoInputs } from "../utils/types/types";

const NewTodosScreen = () => {
  const { t } = useTranslation();
  const { control, handleSubmit } = useForm<IFormTodoInputs>();
  const [errorMessage, setErrorMessage] = useState("");
  const [creatingTodo, setCreatingTodo] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const { setDataUpdated } = useTodoStore();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigation =
    useNavigation<NavigationProp<AuthenticatedStackParamList>>();
  const [isEditable, setIsEditable] = useState(true);

  const onDayPress = (day: Day) => {
    setSelectedDate(new Date(day.dateString));
    setIsModalVisible(false);
  };

  const handleNewTodo = async ({ title, description }: IFormTodoInputs) => {
    setCreatingTodo(true);
    const plannedDate = new Date(selectedDate);
    const response = await createTodoRequest({
      title,
      description,
      plannedDate,
    });
    if (typeof response === "string") {
      setErrorMessage(response);
      showToast(ToastType.error, response);
      setErrorMessage("");
    } else if (response && response.status === 201) {
      setIsEditable(false);
      showToast(ToastType.success, "Todo gespeichert");
      setDataUpdated(true);
      setTimeout(() => {
        navigation.navigate("Todos");
      }, 2000);
    } else {
      setErrorMessage("Something is wrong");
      showToast(ToastType.error, errorMessage);
      setErrorMessage("");
    }
    setCreatingTodo(false);
  };

  const onErrors = (errors: any) => {
    if (errors.title) {
      setErrorMessage(errors.title.message);
    } else if (errors.description) {
      setErrorMessage(errors.description.message);
    }
  };

  useEffect(() => {
    if (errorMessage) {
      showToast(ToastType.error, errorMessage);
      setErrorMessage("");
    }
  }, [errorMessage]);

  const handleModalPress = () => {
    setIsModalVisible(true);
  };

  return (
    <ScrollViewScreenWrapper
      statusBarColor={StatusBarColor.dark}
      backgroundColor={AppColors.white}
      defaultPadding
    >
      <SaveButton
        backButtonStyle={styles.backButtonStyle}
        onPress={handleSubmit(handleNewTodo, onErrors)}
        isEditable={!isEditable}
      />
      <View style={styles.formContainer}>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <LabelInputField
              placeholder={t("journal.title")}
              style={styles.inputField}
              multiline={true}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              isEditable={isEditable}
            />
          )}
          name='title'
          rules={{
            required: "Bitte gib deinem Todo ein Titel",
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
              placeholder={t("notes.note")}
              /* @ts-ignore: TODO: fix this */
              style={styles.inputField}
              multiline={true}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
              isEditable={isEditable}
            />
          )}
          name='description'
          rules={{
            minLength: {
              value: 5,
              message: "Deine Notizen müssen mindestens 5 Zeichen lang sein",
            },
          }}
        />
        <TouchableOpacity
          onPress={handleModalPress}
          disabled={!isEditable}
          style={styles.iconContainer}
        >
          <Icon name='calendar' size={18} color={AppColors.white} />
          <AppText fontStyle='filters' colorStyle='white'>
            {isToday(selectedDate)
              ? t("todos.today")
              : format(selectedDate, "dd.MM.yy", { locale: de })}
          </AppText>
        </TouchableOpacity>
      </View>
      <RoutineToast />
      <SimpleCalendarModal
        isVisible={isModalVisible}
        selectedDate={selectedDate}
        onDayPress={onDayPress}
      />
      {creatingTodo && (
        <FullscreenLoadingIndicator style={styles.fullscreenLoadingIndicator} />
      )}
    </ScrollViewScreenWrapper>
  );
};

export default NewTodosScreen;

const styles = StyleSheet.create({
  backButtonStyle: {
    backgroundColor: AppColors.blue100,
    color: AppColors.white,
  },
  formContainer: { marginTop: 45 },
  inputField: {
    backgroundColor: AppColors.blueMuted20,
    marginVertical: 15,
  },
  iconContainer: {
    height: 32,
    width: 116,
    padding: 5,
    marginTop: 15,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    backgroundColor: AppColors.blue100,
  },
  fullscreenLoadingIndicator: {
    marginLeft: -20,
  },
});
