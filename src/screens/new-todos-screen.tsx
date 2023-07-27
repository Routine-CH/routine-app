import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";
import ScrollViewScreenWrapper from "../components/common/scroll-view-screen-wrapper";
import RoutineToast from "../components/common/toast/routine-toast";
import AppText from "../components/common/typography/app-text";
import AppColors from "../utils/constants/colors";
import { StatusBarColor } from "../utils/types/enums";
import {
  AuthenticatedStackParamList,
  IFormNoteInputs,
} from "../utils/types/types";

const NewTodosScreen = () => {
  const { t } = useTranslation();
  const { control, handleSubmit } = useForm<IFormNoteInputs>();
  const [errorMessage, setErrorMessage] = useState("");
  const navigation =
    useNavigation<BottomTabNavigationProp<AuthenticatedStackParamList>>();

  return (
    <ScrollViewScreenWrapper
      statusBarColor={StatusBarColor.dark}
      backgroundColor={AppColors.white}
      defaultPadding
    >
      {/*       <SaveButton
        backButtonStyle={styles.backButtonStyle}
        onPress={handleSubmit(handleNewNote, onErrors)}
      /> */}
      <AppText>Hi</AppText>
      <RoutineToast />
    </ScrollViewScreenWrapper>
  );
};

export default NewTodosScreen;

const styles = StyleSheet.create({
  backButtonStyle: {
    backgroundColor: AppColors.blue100,
    color: AppColors.white,
  },
});
