import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, View } from "react-native";
import NotesIcon from "../components/card/tools/tools-svg/notes-icon";
import AddButton from "../components/common/buttons/add-button";
import BackButton from "../components/common/buttons/back-button";
import NotesCard from "../components/common/notes/notes-card";
import ScrollViewScreenWrapper from "../components/common/scroll-view-screen-wrapper";
import AppText from "../components/common/typography/app-text";
import { API_BASE_URL } from "../utils/config/config";
import AppColors from "../utils/constants/colors";
import { StatusBarColor } from "../utils/types/enums";
import { UserNotes } from "../utils/types/types";

const NotesScreen: React.FC = () => {
  const [userNotes, setUserNotes] = useState<UserNotes[]>([]);
  const { t } = useTranslation();

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
            <NotesIcon width={200} height={200} fill='#296879' />
            <AppText
              fontStyle='heading2'
              colorStyle='black64'
              style={styles.textMargin}
            >
              Du hast noch keine Notizen, erstelle eins :)
            </AppText>
          </View>
        ) : (
          <>
            <Pressable style={styles.margin}>
              <AppText fontStyle='body' colorStyle='black64'>
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
                    image={note.images && require("../assets/misc/waves.jpg")}
                  />
                );
              })}
              <NotesCard
                title='Nicht vergessen!'
                description='Tickets auf Ticketcorner verkaufen und die Tickets per Post an die Käufer schicken.'
                image={require("../assets/misc/waves.jpg")}
              />
              <NotesCard
                title='Nicht vergessen!'
                description='Tickets auf Ticketcorner verkaufen und die Tickets per Post an die Käufer schicken.'
              />
            </View>
          </>
        )}
      </ScrollViewScreenWrapper>

      <AddButton />
    </>
  );
};

export default NotesScreen;

const styles = StyleSheet.create({
  margin: {
    marginVertical: 30,
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
