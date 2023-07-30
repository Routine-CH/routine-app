import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { RouteProp, useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import SaveButton from "../components/common/buttons/save-button";
import ScrollViewScreenWrapper from "../components/common/scroll-view-screen-wrapper";
import RoutineToast from "../components/common/toast/routine-toast";
import AppText from "../components/common/typography/app-text";
import { useNoteData } from "../hooks/notes/use-note-data";
import { useNoteFormHandling } from "../hooks/notes/use-note-form-handling";
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
  const navigation =
    useNavigation<BottomTabNavigationProp<AuthenticatedStackParamList>>();
  const noteId = route.params.id;
  const [image, setImage] = useState(null);
  const { note, isLoading } = useNoteData(noteId);

  const { control, handleSubmit, handleUpdate, onErrors } = useNoteFormHandling(
    note,
    navigation,
    noteId
  );

  return (
    <ScrollViewScreenWrapper
      backgroundColor="white"
      statusBarColor={StatusBarColor.dark}
      defaultPadding
    >
      <SaveButton
        type={true}
        onPress={handleSubmit(
          (data) => handleUpdate({ ...data, noteId }),
          onErrors
        )}
      />
      <View style={styles.contentContainer}>
        <AppText>Edit Todo</AppText>
      </View>
      <RoutineToast />
    </ScrollViewScreenWrapper>
  );
};

export default EditTodosScreen;

const styles = StyleSheet.create({
  contentContainer: {
    backgroundColor: "pink",
  },
});
