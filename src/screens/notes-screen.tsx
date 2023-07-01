import AsyncStorage from "@react-native-async-storage/async-storage";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, View } from "react-native";
import AddButton from "../components/common/buttons/add-button";
import BackButton from "../components/common/buttons/back-button";
import NotesCard from "../components/common/notes/notes-card";
import ScrollViewScreenWrapper from "../components/common/scroll-view-screen-wrapper";
import AppText from "../components/common/typography/app-text";
import EmptyState from "../components/todos/empty-state";
import { API_BASE_URL } from "../utils/config/config";
import AppColors from "../utils/constants/colors";
import { StatusBarColor } from "../utils/types/enums";
import { AuthenticatedStackParamList, UserNotes } from "../utils/types/types";

const NotesScreen: React.FC = () => {
  const { t } = useTranslation();
  const [userNotes, setUserNotes] = useState<UserNotes[]>([]);
  const navigation =
    useNavigation<BottomTabNavigationProp<AuthenticatedStackParamList>>();

  useEffect(() => {
    async function getUserNotes() {
      try {
        const token = await AsyncStorage.getItem("access_token");
        if (token) {
          const response = await axios.get(`${API_BASE_URL}notes`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          setUserNotes(response.data.data);
        }
      } catch (error) {
        console.error("Failed to get user notes", error);
      }
    }

    getUserNotes();
  }, []);

  const navigateToNewNoteScreen = () => {
    navigation.navigate("Home", {
      screen: "NotesNew",
    });
  };

  return (
    <>
      <ScrollViewScreenWrapper
        backgroundColor={AppColors.blueMuted20}
        statusBarColor={StatusBarColor.dark}
        defaultPadding
      >
        <BackButton />
        {userNotes.length === 0 ? (
          <View style={styles.noNotescontainer}>
            <EmptyState
              title={t("notes.no-notes")}
              description={t("notes.you-dont-have-any-notes")}
              type="notes"
              style={styles.emptyState}
            />
          </View>
        ) : (
          <>
            <Pressable style={styles.margin}>
              <AppText fontStyle="body" colorStyle="black64">
                {t("notes.date")} {t("notes.filter")}
              </AppText>
            </Pressable>
            <View>
              {userNotes.map((note) => {
                return (
                  <NotesCard
                    key={note.id}
                    title={note.title}
                    description={note.description}
                    imageUrl={
                      note.images.length > 0
                        ? note.images[0].imageUrl
                        : undefined
                    }
                  />
                );
              })}
            </View>
          </>
        )}
      </ScrollViewScreenWrapper>
      <AddButton navigateTo={() => navigateToNewNoteScreen()} />
    </>
  );
};

export default NotesScreen;

const styles = StyleSheet.create({
  margin: {
    marginVertical: 30,
  },
  emptyState: {
    backgroundColor: AppColors.white,
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
