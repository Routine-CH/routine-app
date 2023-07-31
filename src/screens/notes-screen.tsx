import { NavigationProp, useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import NotesIcon from "../components/card/tools/tools-svg/notes-icon";
import AddButton from "../components/common/buttons/add-button";
import BackButton from "../components/common/buttons/back-button";
import NotesCard from "../components/common/notes/notes-card";
import ScrollViewScreenWrapper from "../components/common/scroll-view-screen-wrapper";
import AppText from "../components/common/typography/app-text";
import { useUserNote } from "../hooks/notes/use-user-note";
import AppColors from "../utils/constants/colors";
import { StatusBarColor } from "../utils/types/enums";
import { AuthenticatedStackParamList, UserNotes } from "../utils/types/types";

const NotesScreen: React.FC = () => {
  const { t } = useTranslation();
  const { userNotes, isLoading } = useUserNote();

  const [isModalVisible, setIsModalVisible] = useState(false);
  const navigation =
    useNavigation<NavigationProp<AuthenticatedStackParamList>>();

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

  return !isLoading && userNotes.length > 0 ? (
    <>
      <ScrollViewScreenWrapper
        backgroundColor={AppColors.blueMuted20}
        statusBarColor={StatusBarColor.dark}
        defaultPadding
      >
        <BackButton />
        <View style={styles.notesContainer}>
          <View style={styles.noteColumn}>
            {leftColumnNotes.map((note) => (
              <NotesCard
                key={note.id}
                title={note.title}
                description={note.description}
                imageUrl={
                  note.images.length > 0 ? note.images[0].imageUrl : undefined
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
                  note.images.length > 0 ? note.images[0].imageUrl : undefined
                }
                onPress={() => navigateToNoteScreen(note)}
              />
            ))}
          </View>
        </View>
      </ScrollViewScreenWrapper>
      <AddButton navigateTo={() => navigateToNewNotesScreen()} />
    </>
  ) : (
    <ScrollViewScreenWrapper
      backgroundColor={AppColors.blueMuted20}
      statusBarColor={StatusBarColor.dark}
      defaultPadding
    >
      <BackButton />
      <View style={styles.noNotescontainer}>
        <NotesIcon width={200} height={200} fill='#296879' />
        <AppText
          fontStyle='heading2'
          colorStyle='black64'
          style={styles.textMargin}
        >
          Du hast noch keine Notizen, erstelle eins :)
        </AppText>
      </View>
    </ScrollViewScreenWrapper>
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
