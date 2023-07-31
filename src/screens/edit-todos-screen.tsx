import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { format, isToday } from "date-fns";
import { de } from "date-fns/locale";
import React, { useState } from "react";
import { Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import SaveButton from "../components/common/buttons/save-button";
import LabelInputField from "../components/common/input/label-input-field";
import SimpleCalendarModal from "../components/common/modals/simple-calendar-modal";
import ScrollViewScreenWrapper from "../components/common/scroll-view-screen-wrapper";
import RoutineToast from "../components/common/toast/routine-toast";
import AppText from "../components/common/typography/app-text";
import { useTodoData } from "../hooks/todos/use-todo-data";
import { useTodoFormHandling } from "../hooks/todos/use-todo-form-handling";
import AppColors from "../utils/constants/colors";
import { Day } from "../utils/types/calendar/types";
import { StatusBarColor } from "../utils/types/enums";
import { AuthenticatedStackParamList } from "../utils/types/types";

type TodosEditScreenRouteProps = RouteProp<
  AuthenticatedStackParamList,
  "TodosEdit"
>;

type TodosEditProps = {
  route: TodosEditScreenRouteProps;
};

const EditTodosScreen: React.FC<TodosEditProps> = ({ route }) => {
  const { t } = useTranslation();
  const [errorMessage, setErrorMessage] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigation =
    useNavigation<BottomTabNavigationProp<AuthenticatedStackParamList>>();
  const id = route.params.id;
  const { todo } = useTodoData(id);

  const onDayPress = (day: Day) => {
    setSelectedDate(new Date(day.dateString));
    setIsModalVisible(false);
  };

  //   const dateSelected = new Date(selectedDate);

  const { control, handleSubmit, handleUpdate, onErrors } = useTodoFormHandling(
    todo,
    navigation,
    id,
    selectedDate
  );

  const handleModalPress = () => {
    setIsModalVisible(true);
  };

  return (
    <ScrollViewScreenWrapper
      backgroundColor="white"
      statusBarColor={StatusBarColor.dark}
      defaultPadding
    >
      <SaveButton
        type={true}
        onPress={handleSubmit(
          (data) => handleUpdate({ ...data, id }),
          onErrors
        )}
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

export default EditTodosScreen;

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
