import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import AddButton from "../components/common/buttons/add-button";
import BackButton from "../components/common/buttons/back-button";
import EmptyState from "../components/common/empty-state";
import { LoadingIndicator } from "../components/common/loading-indicator";
import ScrollViewScreenWrapper from "../components/common/scroll-view-screen-wrapper";
import NotesCard from "../components/notes/notes-card";
import { useNotesStore } from "../store/notes-store";
import AppColors from "../utils/constants/colors";
import { StatusBarColor } from "../utils/types/enums";
import { AuthenticatedStackParamList } from "../utils/types/routes/types";
import { UserNotes } from "../utils/types/types";

const NotesScreen: React.FC = () => {
  const { t } = useTranslation();
  const [_, setIsModalVisible] = useState(false);
  const navigation =
    useNavigation<NavigationProp<AuthenticatedStackParamList>>();

  const { userNotes, isLoading, dataUpdated, loadUserNotes } = useNotesStore();

  useEffect(() => {
    loadUserNotes();
  }, [dataUpdated]);

  const navigateToNoteScreen = (note: UserNotes) => {
    if (note) {
      navigation.navigate("SubRoutes", {
        screen: "NoteView",
        params: { id: note.id },
      });
    }
  };

  const navigateToNewNotesScreen = () => {
    setIsModalVisible(false);
    navigation.navigate("SubRoutes", { screen: "NotesNew" });
  };

  const leftColumnNotes = userNotes.filter((_, i) => i % 2 === 0);
  const rightColumnNotes = userNotes.filter((_, i) => i % 2 !== 0);

  return (
    <>
      <ScrollViewScreenWrapper
        backgroundColor={AppColors.blueMuted20}
        statusBarColor={StatusBarColor.dark}
        defaultPadding
      >
        {isLoading ? (
          <LoadingIndicator />
        ) : !isLoading && userNotes.length > 0 ? (
          <>
            <BackButton />
            <View style={styles.notesContainer}>
              <View style={styles.noteColumn}>
                {leftColumnNotes.map((note) => (
                  <NotesCard
                    key={note.id}
                    title={note.title}
                    description={note.description}
                    imageUrl={
                      note.images.length > 0
                        ? note.images[0].imageUrl
                        : undefined
                    }
                    onPress={() => navigateToNoteScreen(note)}
                  />
                ))}
              </View>
              <View style={styles.noteColumn}>
                {rightColumnNotes.map((note) => (
                  <NotesCard
                    key={note.id}
                    title={note.title}
                    description={note.description}
                    imageUrl={
                      note.images.length > 0
                        ? note.images[0].imageUrl
                        : undefined
                    }
                    onPress={() => navigateToNoteScreen(note)}
                  />
                ))}
              </View>
            </View>
          </>
        ) : (
          <EmptyState
            type='notes'
            title={t("notes.no-notes-titles")}
            description={t("notes.no-notes-yet")}
          />
        )}
      </ScrollViewScreenWrapper>
      <AddButton navigateTo={() => navigateToNewNotesScreen()} />
    </>
  );
};

export default NotesScreen;

const styles = StyleSheet.create({
  grivView: { marginTop: 10, marginHorizontal: -15 },
  noNotescontainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100,
  },
  textMargin: {
    marginTop: 20,
  },
  notesContainer: {
    marginTop: 30,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  noteColumn: {
    width: "48%",
  },
});
