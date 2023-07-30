import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { SimpleGrid } from "react-native-super-grid";
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
    useNavigation<BottomTabNavigationProp<AuthenticatedStackParamList>>();

  const navigateToNoteScreen = (note: UserNotes) => {
    if (note) {
      navigation.navigate("NoteView", { id: note.id });
    }
  };

  const navigateToNewNotesScreen = () => {
    setIsModalVisible(false);
    navigation.navigate("NotesNew");
  };

  return !isLoading && userNotes.length > 0 ? (
    <>
      <ScrollViewScreenWrapper
        backgroundColor={AppColors.blueMuted20}
        statusBarColor={StatusBarColor.dark}
        defaultPadding
      >
        <BackButton />
        <SimpleGrid
          listKey='userNotes'
          data={userNotes}
          spacing={15}
          style={styles.grivView}
          renderItem={({ item }) => (
            <NotesCard
              key={item.id}
              title={item.title}
              description={item.description}
              imageUrl={
                item.images.length > 0 ? item.images[0].imageUrl : undefined
              }
              onPress={() => navigateToNoteScreen(item)}
            />
          )}
        />
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
  notesContainer: {
    marginTop: 30,
  },
  noNotescontainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 100,
  },
  textMargin: {
    marginTop: 20,
  },
});
