import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { format, isToday } from "date-fns";
import { de } from "date-fns/locale";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import SaveButton from "../components/common/buttons/save-button";
import LabelInputField from "../components/common/input/label-input-field";
import SimpleCalendarModal from "../components/common/modals/simple-calendar-modal";
import ScrollViewScreenWrapper from "../components/common/scroll-view-screen-wrapper";
import RoutineToast from "../components/common/toast/routine-toast";
import { showToast } from "../components/common/toast/show-toast";
import AppText from "../components/common/typography/app-text";
import { createTodoRequest } from "../data/todo/create-request";
import AppColors from "../utils/constants/colors";
import { Day } from "../utils/types/calendar/types";
import { StatusBarColor, ToastType } from "../utils/types/enums";
import {
  AuthenticatedStackParamList,
  IFormTodoInputs,
} from "../utils/types/types";

const NewTodosScreen = () => {
  const { t } = useTranslation();
  const { control, handleSubmit } = useForm<IFormTodoInputs>();
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigation =
    useNavigation<BottomTabNavigationProp<AuthenticatedStackParamList>>();
  const currentDate = new Date();

  const onDayPress = (day: Day) => {
    console.log("Clicked");
    setSelectedDate(new Date(day.dateString));
    setIsModalVisible(false);
  };

  const handleNewTodo = async ({ title, description }: IFormTodoInputs) => {
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
      showToast(ToastType.success, "Notiz gespeichert");
      setTimeout(() => {
        navigation.navigate("Notes");
      }, 2000);
    } else {
      setErrorMessage("Something is wrong");
      showToast(ToastType.error, errorMessage);
      setErrorMessage("");
    }
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
      />
      <View style={styles.formContainer}>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <LabelInputField
              placeholder={t("journal.title")}
              /* @ts-ignore: TODO: fix this */
              style={styles.inputField}
              multiline={true}
              onBlur={onBlur}
              onChangeText={(value) => onChange(value)}
              value={value}
            />
          )}
          name="title"
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
            />
          )}
          name="description"
          rules={{
            minLength: {
              value: 5,
              message: "Deine Notizen müssen mindestens 5 Zeichen lang sein",
            },
          }}
        />
        <TouchableOpacity
          onPress={handleModalPress}
          style={styles.iconContainer}
        >
          <Icon name="calendar" size={18} color={AppColors.white} />
          <AppText fontStyle="filters" colorStyle="white">
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
});