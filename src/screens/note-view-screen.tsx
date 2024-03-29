import {
  NavigationProp,
  RouteProp,
  useNavigation,
} from "@react-navigation/native";
import { format } from "date-fns";
import { de } from "date-fns/locale";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Image, Pressable, StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import BackButton from "../components/common/buttons/back-button";
import { LoadingIndicator } from "../components/common/loading-indicator";
import EditDeleteModal from "../components/common/modals/edit-delete-modal";
import ScrollViewScreenWrapper from "../components/common/scroll-view-screen-wrapper";
import RoutineToast from "../components/common/toast/routine-toast";

import AppText from "../components/common/typography/app-text";
import { deleteNoteRequest } from "../data/note/delete-request";
import { useNotesStore } from "../store/notes-store";
import { useToastMessageStore } from "../store/toast-messages-store";
import AppColors from "../utils/constants/colors";
import { StatusBarColor, ToastType } from "../utils/types/enums";
import { AuthenticatedStackParamList } from "../utils/types/routes/types";

type NoteViewScreenRouteProps = RouteProp<
  AuthenticatedStackParamList,
  "NoteView"
>;

type NoteViewProps = {
  route: NoteViewScreenRouteProps;
};

const NoteViewScreen: React.FC<NoteViewProps> = ({ route }) => {
  const { t } = useTranslation();
  const noteId = route.params.id;
  const { setDataUpdated, getNoteById, isLoading } = useNotesStore();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const note = getNoteById(noteId);
  const createdAt = note?.createdAt ? new Date(note.createdAt) : null;
  const formattedDate = createdAt
    ? format(createdAt, "dd. MMMM yyyy", { locale: de })
    : "";
  const showToast = useToastMessageStore((state) => state.showToast);
  const { startLoading, stopLoading } = useToastMessageStore();

  const navigation =
    useNavigation<NavigationProp<AuthenticatedStackParamList>>();

  const handleModalPress = () => {
    setIsModalVisible(true);
  };

  const deleteNote = async () => {
    try {
      startLoading();
      setIsModalVisible(false);
      await deleteNoteRequest(note);
      showToast(ToastType.success, "Notiz wurde gelöscht.");
      setDataUpdated(true);
      setTimeout(() => {
        navigation.navigate("SubRoutes", {
          screen: "Notes",
        });
      }, 2000);
    } catch (error) {
      console.error("Failed to delete note", error);
      stopLoading();
    } finally {
      stopLoading();
      setIsModalVisible(false);
    }
  };

  const navigateToNoteEditScreen = () => {
    setIsModalVisible(false);
    if (note) {
      navigation.navigate("SubRoutes", {
        screen: "NoteEdit",
        params: { id: note.id },
      });
    }
  };

  return (
    <ScrollViewScreenWrapper
      statusBarColor={StatusBarColor.dark}
      backgroundColor={AppColors.white}
      defaultPadding
    >
      {isLoading ? (
        <LoadingIndicator />
      ) : (
        <>
          <View style={styles.buttonContainer}>
            <BackButton type={true} style={styles.buttonStyle} />
            <Pressable onPress={handleModalPress}>
              <Icon
                name={"ellipsis-vertical"}
                size={26}
                color={AppColors.black64}
              />
            </Pressable>
          </View>
          <View style={styles.contentContainer}>
            <AppText fontStyle='toast' colorStyle='black70'>
              {formattedDate}
            </AppText>
            <AppText
              fontStyle='heading3'
              colorStyle='black70'
              style={{ marginVertical: 15 }}
            >
              {note?.title}
            </AppText>
            <AppText fontStyle='body' colorStyle='black70'>
              {note?.description}
            </AppText>
          </View>
          <View>
            {note?.images.map((image, index) => (
              <Image
                key={index}
                source={{ uri: image.imageUrl }}
                style={styles.image}
              />
            ))}
          </View>
          <EditDeleteModal
            title={t("modals.are-you-sure")}
            description={t("modals.notes")}
            actionText={t("modals.delete")}
            isVisible={isModalVisible}
            setIsVisible={setIsModalVisible}
            onConfirm={deleteNote}
            navigateTo={() => navigateToNoteEditScreen()}
          />
          <RoutineToast />
        </>
      )}
    </ScrollViewScreenWrapper>
  );
};

export default NoteViewScreen;

const styles = StyleSheet.create({
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonStyle: {
    backgroundColor: AppColors.blueMuted20,
  },
  contentContainer: {
    minHeight: 300,
    marginVertical: 30,
    backgroundColor: AppColors.blueMuted20,
    borderRadius: 10,
    padding: 15,
  },
  image: {
    height: 220,
    width: "100%",
    borderRadius: 10,
    marginBottom: 15,
  },
});
